# Product Rating Service Module

## Introduction

Server for Product rating service which has API's to capture the ratings from the customer and get the average ratings of the product.

----
## Requirements

This project requires the following:

* Node.js ( lts/dubnium -> v10.16.3 )
* Redis ( v5.0.7 )
* MongoDB Community Server ( v4.2.2 )

----
## Installation

- Install Node.js v10.16.3
- Install Redis v5.0.7
- Install MongoDB Community Server v4.2.2
- `mongod --auth --dbpath=/path/to/db` <br>( Starts primary demon process for MongoDB system with authentication enabled)
- `npm install` <br> ( Install project dependencies )
- `node scripts/stock.js` <br> (To insert dummy values in database )
- `npm run start` <br> ( Start project )

----
## Configuration

MongoDB setup

- Create an user with admin access to any database
    ```
    use admin

    db.createUser(
    {
        user: "casaone-admin",
        pwd: "dark-knight",
        roles: [
            { role: "userAdminAnyDatabase", db: "admin" }
        ] 
    })
    ```

- Verify the authentication of user
    ```
    db.auth('casaone-admin', 'dark-knight')
    ```

- Create an user with read write and admin access to casaone database
    ```
    use admin

    db.createUser(
    { 
        user: "casaone",
        pwd: "dark-knight",
        roles: [
            { role: "readWrite", db: "casaone"},
            { role: "readWrite", db: "casaone-test"},
            { role: "dbAdmin", db: "casaone"},
            { role: "dbAdmin", db: "casaone-test"}
        ]
    })
    ```

## Documentation

----
#### System Architecture
![alt text](https://raw.githubusercontent.com/itskp/product-rating-service/master/assignment2.png)
#### Project Assumptions and Explanation
- Existing users has rented all the available products.
- No Authentication for users.
- Ratings value can be: [0, 5]
- The category of products is `furniture` by default.
- The category of users  is `customer` by default. <br> ( users can be admin, managers, staff, customer)
- ProductId should be unique and a string having length between 3 to 10
- userId should be unique and a string having length between 3 to 10

Approximate read to write ratio for a rating service would be `100:1` <br>
It's a `Read Heavy System` <br>
Type of database store: `CP` <br>
Database choice: `NoSQL` ( MongoDB ) <br>
Throughput: `50k Request per second` <br>
As the system is read heavy we'll be using caching aggressively.  <br>
Caching strategy: We'll be using scheduler to update the cache at a specific interval. This ensures that the system is eventual consistent.

----
#### Models

- Product Model
    ```
    const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        productId: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            default: 'furniture'
        }
    }, {
        versionKey: false,
        timestamps: true
    })
    ```

- User Model
    ```
    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            default: 'customer'
        }
    }, {
        versionKey: false,
        timestamps: true
    })
    ```

- Rating Model
    ```
    const ratingSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        productId: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 0
        }
    }, {
        versionKey: false,
        timestamps: true
    })
    ```

----
#### API

- Add Product
    - URL: `{{host}}:{{port}}/products`
    - Method: `POST`
    - Request Body: 
        ```
        {
            productId: "string",
            productName: "string"
        }
        ```
- Get Ratings
    - URL: `{{host}}:{{port}}/products`
    - Method: `GET`
    - Request Params: 
        ```
        {
            productId: "string"
        }
        ```

- Add Ratings
    - URL: `{{host}}:{{port}}/products/ratings`
    - Method: `POST`
    - Request Body: 
        ```
        {
            productId: "string",
            userId: "string",
            productName: "string"
        }
        ```

- Add Customer
    - URL: `{{host}}:{{port}}/users`
    - Method: `POST`
    - Request Body: 
        ```
        {
            userId: "string",
            name: "string"
        }
        ```

----