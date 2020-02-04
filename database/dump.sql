--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_fk0;
ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_fk1;
ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_fk0;
ALTER TABLE ONLY public.products DROP CONSTRAINT products_pk;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pk;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pk;
ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_pk;
ALTER TABLE public.products ALTER COLUMN product_id DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN order_id DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN cart_id DROP DEFAULT;
ALTER TABLE public.cart_items ALTER COLUMN cart_item_id DROP DEFAULT;
DROP SEQUENCE public.products_product_id_seq;
DROP TABLE public.products;
DROP SEQUENCE public.orders_order_id_seq;
DROP TABLE public.orders;
DROP SEQUENCE public.carts_cart_id_seq;
DROP TABLE public.carts;
DROP SEQUENCE public.cart_items_cart_item_id_seq;
DROP TABLE public.cart_items;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart_items (
    cart_item_id integer NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cart_items_cart_item_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cart_items_cart_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cart_items_cart_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cart_items_cart_item_id_seq OWNED BY public.cart_items.cart_item_id;


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    cart_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.carts_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.carts_cart_id_seq OWNED BY public.carts.cart_id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    cart_id integer NOT NULL,
    name text NOT NULL,
    credit_card text NOT NULL,
    shipping_address text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    short_description text NOT NULL,
    long_description text NOT NULL
);


--
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;


--
-- Name: cart_items cart_item_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN cart_item_id SET DEFAULT nextval('public.cart_items_cart_item_id_seq'::regclass);


--
-- Name: carts cart_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN cart_id SET DEFAULT nextval('public.carts_cart_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cart_items (cart_item_id, cart_id, product_id, price) FROM stdin;

\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts (cart_id, created_at) FROM stdin;

\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (order_id, cart_id, name, credit_card, shipping_address, created_at) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (product_id, name, price, image, short_description, long_description) FROM stdin;
1	Nintendo Switch Skin	1999	/images/switch-zelda-skin.jpg	Officially licensed by Nintendo, these are precision fit skin!	Officially Licensed Skin and Screen Protector Bundle by Controller Gear are a great way to customize, protect and enhance your Nintendo Switch system. For the ultimate Nintendo fan, skin your Nintendo Switch today to celebrate your favorite video games. Controller Gear Officially Licensed by Nintendo skins are made in the USA from Premium 3M materials independently tested and approved! These precision fit skins are easy to apply and can be removed with no sticky residue, so you don't have to choose just One design!.\nBuyers: EU and Worldwide Duties and Fees are not Included to Retail Price and Shipping Cost. Duties and Fees are Buyers Responsibilities. \nAuthentic, Officially Licensed by Nintendo, Made for Nintendo Switch\nPeel. Press. Play\nScratch Resistant, Easy on - Easy Off, Leaves No Residue, Precision Fit\nDoesn't Interfere with Buttons or Sensors, superior 3M Skin Material independently tested and approved\nMade in the USA
2	The Legend of Zelda: Link's Awakening, Nintendo Switch	5095	/images/zelda-awakening.jpeg	One of most popular classic Zelda series back in 3D Switch!	Link has washed ashore on a mysterious island with strange and colorful inhabitants.\nTo escape the island, Link must collect magical instruments across the land and awaken the Wind Fish. \nExplore a reimagined Koholint Island that's been faithfully rebuilt in a brand-new art style that will entice fans and newcomers alike. \nBattle enemies as you conquer numerous dungeons and uncover the hidden secrets of the island. \nEncounter Super Mario enemies like Goombas, Piranha Plants, and more, and interact with unique locals who help Link on his adventure. \nAs you clear dungeons throughout the main story, earn dungeon rooms (Chambers), then arrange them into custom layouts in the all-new Chamber Dungeon. \nPlace your dungeon entrance, Nightmare room, and everything in between as you try to fulfill objectives and play through a new dungeon.\nTap compatible amiibo figures to earn more Chambers and find additional Chambers throughout the game in updated mini-games, such as the river rapids, trendy game, and fishing.
3	The Legend of Zelda: Breath of the Wild	5999	/images/zelda-botw.jpg	Explore the wilds of Hyrule any way you like—anytime, anywhere! 	An action-adventure game developed and published by Nintendo, released for the Nintendo Switch and Wii U consoles on March 3, 2017. Breath of the Wild is set at the end of the Zelda timeline; the player controls Link, who awakens from a hundred-year slumber to defeat Calamity Ganon before it can destroy the kingdom of Hyrule.\n\nSimilar to the original Legend of Zelda (1986), players are given little instruction and can explore the open world freely. Tasks include collecting multipurpose items to aid in objectives or solving puzzles and side quests for rewards. The world is unstructured and designed to reward experimentation, and the story can be completed in a nonlinear fashion.\n\nDevelopment of Breath of the Wild lasted five years. Wanting to reinvent the series, Nintendo introduced elements such as a detailed physics engine, high-definition visuals, and voice acting. Monolith Soft, known for their work in the open-world Xenoblade Chronicles series, assisted in designing landscapes and topography. The game was planned for release in 2015 as a Wii U exclusive, but was delayed twice due to problems with the physics engine. Breath of the Wild was a launch game for the Switch and the final game published by Nintendo for the Wii U. Two downloadable content packs were released later in 2017.\n\nBreath of the Wild received acclaim for its open-ended gameplay and attention to detail, and has been cited as one of the greatest video games of all time. Critics called it a landmark in open-world design, despite minor criticism for its technical performance at launch. It won numerous awards, including several game of the year honors. By 2019, Breath of the Wild had sold over 17.84 million copies worldwide, making it the bestselling Zelda game. A sequel was announced at E3 2019.
4	The Legend of Zelda: Cadence of Hyrule	2184	/images/zelda-cadence-of-hyrule.jpg	Do you rhythm game? Do you like Zelda? Why not try both!	Cadence of Hyrule: Crypt of the NecroDancer Feat. \nThe Legend of Zelda[a] is a roguelike rhythm game developed by Brace Yourself Games and published by Nintendo. \nThe game is a crossover of Crypt of the NecroDancer with The Legend of Zelda, combining the rhythm-based movement \nand fighting mechanics with elements reminiscent of earlier games in the Zelda franchise.\nThe game released for the Nintendo Switch on June 13, 2019.
5	Hyrule Warriors Definitive Edition	4497	/images/zelda-hyrule-warriors.jpg	Beloved Hyrule Warrior from Wii U in Switch!	A new, ultimate version of the exhilarating action game set in the Zelda universe will include every map and mission, \nplus all 29 playable characters from both the Wii U and Nintendo 3DS versions of the game, along with all of the previous paid downloadable content. \nPlay as Link, Zelda, Midna, Skull Kid and dozens more in action-packed battles at home or on the go. \nAdditionally, the game includes new outfits for Link and Zelda based on the Legend of Zelda: Breath of the Wild game.
6	Screen Protector - Zelda	3412	/images/screen-protector-zelda.jpg	PDP Collector's Edition Skins and Screen Protector for Nintendo Switch - Zelda Edition	Officially licensed by Nintendo\nMatte skins for Switch console and dock\nSimple mess-free removal\nIncludes 2 rubber thumb caps\nZelda: Breath of the Wild inspired design\nWARNING: This product can expose you to chemicals including DEHP, which is known to the State of California to cause cancer and birth defects or other reproductive harm.  For more information go to www.P65Warnings.ca.gov.
7	Console Skin - Zelda!	2499	/images/console-skin-zelda.jpg	Zelda: Breath of the Wild Edition Controller for Nintendo Switch - Black	Get a handle on Hyrule and take on new adventures as Link with this The Legend of Zelda: Breath of the Wild wired controller for Nintendo Switch. \nIt's officially licensed and features Link poised for battle, while soft touch grips keep it safely in hand as you solve the Shrines of Trials. \nAn 10 ft. removable USB cable provides plenty of room for movement with this The Legend of Zelda: Breath of the Wild wired controller.
8	Custom Joy-Con Skin - Zelda	18995	/images/console-skin-customized-zelda-luxury.jpg	Customized your Joy-Con with the game you liekt he most!	This set of Nintendo Switch Joy-Con controllers features a custom painted The Legend of Zelda: Breath of the Wild theme. Comes with matching colored wrist straps.\n\nAll controllers are brand new and are taken apart only to customize.\n\nWe do full customization work, just ask!
\.


--
-- Name: cart_items_cart_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cart_items_cart_item_id_seq', 1, false);


--
-- Name: carts_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.carts_cart_id_seq', 1, false);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 1, false);


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_product_id_seq', 1, false);


--
-- Name: cart_items cart_items_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pk PRIMARY KEY (cart_item_id);


--
-- Name: carts carts_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pk PRIMARY KEY (cart_id);


--
-- Name: orders orders_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pk PRIMARY KEY (order_id);


--
-- Name: products products_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pk PRIMARY KEY (product_id);


--
-- Name: cart_items cart_items_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_fk0 FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id);


--
-- Name: cart_items cart_items_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_fk1 FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: orders orders_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_fk0 FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

