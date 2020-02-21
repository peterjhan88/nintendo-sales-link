require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  db.query('select product_id, name, price, image, short_description from products')
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = req.params.productId;
  if (productId.match(/\D/) || parseInt(productId, 10) < 1) {
    next(new ClientError(`productId=${productId} is not positive integer`, 400));
  }
  const sql = 'select * from products where product_id=$1';
  db.query(sql, [parseInt(productId, 10)])
    .then(result => {
      result.rows.length === 0
        ? next(new ClientError(`Product with productId=${productId} not found`, 404))
        : res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  const sessionCartId = req.session.cart_id;
  if (sessionCartId) {
    const joinSql = `
        select  c.cart_item_id,
                c.price,
                p.product_id,
                p.image,
                p.name,
                p.short_description
        from cart_items as c
        join products as p using (product_id)
        where c.cart_id = $1
      `;
    db.query(joinSql, [sessionCartId])
      .then(joinedTableResult => {
        res.status(200).json(joinedTableResult.rows);
      })
      .catch(err => next(err));
  } else {
    res.status(200).json([]);
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = req.body.productId;
  if (productId.toString().match(/\D/) || productId < 1) {
    next(new ClientError(`productId=${productId} is not positive integer`, 400));
  }

  const productsSql = 'select price from products where product_id=$1';
  db.query(productsSql, [productId])
    .then(productsResult => {
      if (productsResult.rows.length === 0) {
        throw new ClientError(`Product with productId=${productId} not found`, 400);
      }
      if (req.session.cart_id) {
        const existingCart = {
          cart_id: req.session.cart_id,
          price: productsResult.rows[0].price
        };
        return existingCart;
      }
      const cartsSql = `
        insert into "carts" ("cart_id", "created_at")
        values (default, default)
        returning "cart_id"
      `;
      return (
        db.query(cartsSql)
          .then(cartSqlResult => {
            const cartIdAndPrice = {
              cart_id: cartSqlResult.rows[0].cart_id,
              price: productsResult.rows[0].price
            };
            return cartIdAndPrice;
          })
      );
    })
    .then(cartIdAndPrice => {
      req.session.cart_id = cartIdAndPrice.cart_id;
      const cartItemsSql = `
      insert into "cart_items" ("cart_id", "product_id", "price")
      values ($1, $2, $3)
      returning "cart_item_id"
      `;
      return (
        db.query(cartItemsSql, [cartIdAndPrice.cart_id, productId, cartIdAndPrice.price])
      );
    })
    .then(cartItemsResult => {
      const joinSql = `
        select  c.cart_item_id,
                c.price,
                p.product_id,
                p.image,
                p.name,
                p.short_description
        from cart_items as c
        join products as p using (product_id)
        where c.cart_item_id = $1
      `;
      return (
        db.query(joinSql, [cartItemsResult.rows[0].cart_item_id])
          .then(joinedTableResult => {
            res.status(201).json(joinedTableResult.rows[0]);
          })
      );
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  const cartId = req.session.cart_id;
  if (!cartId) {
    throw new ClientError('Session does not have cart ID', 400);
  }
  const reqBody = req.body;
  const missingColumns = missingFields(reqBody);
  if (missingColumns) {
    throw new ClientError(`Must have ${missingColumns} fields`, 400);
  }

  const ordersSql = `
    insert into orders (order_id, cart_id, name, credit_card, shipping_address, created_at)
    values (default, $1, $2, $3, $4, default)
    returning *
  `;
  db.query(ordersSql, [cartId, reqBody.name, reqBody.creditCard, reqBody.shippingAddress])
    .then(result => {
      delete req.session.cart_id;
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.delete('/api/cartItems/:cartItemId', (req, res, next) => {
  const cartId = req.session.cart_id;
  if (!cartId) {
    throw new ClientError('Session does not have cart ID', 400);
  }

  const cartItemId = req.params.cartItemId;
  if (cartItemId.match(/\D/) || parseInt(cartItemId, 10) < 1) {
    throw new ClientError(`productId=${cartItemId} is not positive integer`, 400);
  }

  const cartItemsSql = `
    delete from cart_items
    where cart_item_id=$1
    returning cart_item_id
  `;
  db.query(cartItemsSql, [cartItemId])
    .then(result => {
      if (result.rows.length === 0) {
        throw new ClientError(`Cart Item with cartItemId=${cartItemId} not found`, 400);
      }
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

app.delete('/api/cartItem/removeEntirely/:productId', (req, res, next) => {
  const cartId = req.session.cart_id;
  if (!cartId) {
    throw new ClientError('Session does not have cart ID', 400);
  }

  const productId = req.params.productId;
  if (productId.match(/\D/) || parseInt(productId, 10) < 1) {
    throw new ClientError(`productId=${productId} is not positive integer`, 400);
  }

  const cartItemsSql = `
    delete from cart_items
    where cart_id=$1 and product_id=$2
    returning *
  `;
  db.query(cartItemsSql, [cartId, productId])
    .then(result => {
      if (result.rows.length === 0) {
        throw new ClientError('Either product id and/or cart id is not valid', 400);
      }
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});

function missingFields(reqBody) {
  const requiredFields = ['creditCard', 'shippingAddress', 'name'];
  var missing = [];
  const reqBodyKeys = Object.keys(reqBody);
  for (var index = 0; index < requiredFields.length; index++) {
    const requiredField = requiredFields[index];
    if (!reqBodyKeys.includes(requiredField)) {
      missing.push(requiredField);
    }
  }
  return missing.length === 0 ? null : missing.join(' ');
}
