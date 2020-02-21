# Nintendo Sales Link
Initially started as Wicked Sales. Will be re-themed soon. A full-stack e-commerce application for Nintendo Switch and Legend of Zelda

## Technologies Used

- React.js
- Webpack 4
- Bootstrap 4
- Node.js
- PostgreSQL
- HTML5
- CSS3
- AWS EC2

## Live Demo

See it in [Live](https://nintendo-sales-link.peterjhan.com)!

## Features

- User can view list of all products
- User can view details of all products
- User can add products to their cart
- User can get to the checkout page
- User can enter their purchase information
- Input validation will prevent user mistakes

## Preview

![Nintendo Sales-Link Demo](demo.gif)

## Development

#### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- PostgreSQL 10 or higher

#### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/Learning-Fuze/nintendo-sales-link
    cd nintendo-sales-link
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Start PostgreSQL and Import the example database to PostgreSQL.

    ```shell
    sudo service postgresql start
    npm run db:import
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
