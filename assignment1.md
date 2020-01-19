[go to main page](README.md) <br>
# Product Variable Growth

## Introduction

Server architecture for taking data driven business decisions

----
## Project Modules
1. Load Balancer
2. Web Server
3. MongoDB
4. Elastic Search
5. Redis
6. Message Queue
8. Scheduled Reports
7. Kibana and Analytics Dashboard

----
## Documentation

----
#### System Architecture
![Data Driven Business Decisions](assignment1.png)

#### Project Assumptions and Explanation
- Business Team has access to Analytics Dashboard.
- Business Team needs to take decisions based on Past Data.
- Elastic search is used with MongoDB.
- MongoDB is used for persistent storage and Elastic Search is used for doing complex search queries based on data content.
- MongoDB as persistent storage will provide constraints, correctness and robustness of data and we will keep pushing data to Elastic Search on add / update of particular data. 
- We will focus on business decision for delivery module. Where delivery team will pick the product from the warehouse and Assemble the product at the customer apartment.
- Team has only 1 warehouse from which products taken and delivered to customers.

----
#### Models

- Product Model
    ```
    {
        productId: String
        name: String
        category: String
    }
    ```

- User Model
    ```
    {
        userId: String
        name: String
        category: String
        address: [ String ]
    }
    ```

- Order Model
    ```
    {
        orderId: String
        productIds: [ String ]
        userId: String
        address: String
    }
    ```

- Delivery Model
    ```
    {
        deliveryId: String
        orderId: String
        assembly: // Assembly details for each product
        [
            {
                productId: String
                cost: Number,
                startTime: String, // start time of assembly
                endTime: String, // end time of assembly
                headCount: Number // Total persons who assembled the product
                city: String,
                distance: Number // Distance from warehouse to customer address
            },
            ...
        ]
    }
    ```

----
#### Business Decisions

1. Reports:
    - If a business team wants to boost performance in a specific city. They can schedule daily, weekly, monthly reports to gain insights about different aspects of delivery. Examples: Total orders delivered in a specific city etc.

2. Analytics Dashboard:
    -  Using Analytics dashboard to make complex queries which are dependent on different models.
    - Example: Find total sales of a product in a specific city.
    - Example: Find average man power required and total time taken to assemble a product in a specific city.


##### Future Scopes and Architecture

- Real time delivery monitoring using continuous predictive analysis on live system through streaming pipelines to gain real time insights on the current delivery status.<br> ( Example: Total man power utilized and total man power available for remaining task)

- Using ML models we can predict the exact man power and assembly time required for a product. This will help in saving money spent on fuel as well as managing man power and increase the availabilty of resources for delivery other products.