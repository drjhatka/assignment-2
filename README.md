# BikeAPI Lounge

## Overview

Welcome to BikeAPI Lounge. Built with  Express.js  and Mongoose, this API server provides you with fake BikeAPI data and Order data for API testing purposes. The server provides product (Bikes) data as well as Order data. BikeAPI Lounge provides a number of useful API calls to retrieve and modify data for api testing. Following are the links to the original JSON Data Files.

[Bike Data Json File](https://github.com/drjhatka/assignment-2/blob/main/products.json)

[Order Data Json File](https://github.com/drjhatka/assignment-2/blob/main/orders.json)

## API description

### <p align=center><ins>[Live Server Link](https://assignmentvercel-one.vercel.app)</ins></p>

The following API calls are available from the server

### Get Bikes By Category, Brand or Name

This API call provides You with a collection of bikes   based on category and brand and a single collection if the search query is name parameter.

#### Retrieve By Name  

```http

https://assignmentvercel-one.vercel.app/api/products?searchTerm=CityCycle


```

#### Retrieves bikes based on category

```http
https://assignmentvercel-one.vercel.app/api/products?searchTerm=Mountain

```

#### Retrieves a bike based on name

```http
https://assignmentvercel-one.vercel.app/api/products?searchTerm=Speedster X1
```

### Get a single bike

This API call requires The ID of the product as parameter and returns a single bike data .

```http
https://assignmentvercel-one.vercel.app/api/products/673fec437bd216ac4e1b8085
```

### Create a bike

This API call creates a bike in the database. This is a post request so the request document is required . If the document body is empty this API call returns an error message and the created document if the post operation was successful.

```http
https://assignmentvercel-one.vercel.app/api/products
```

#### POST BODY

```json
{
  "bike":
    {
      "name": "Freshly Created Bike",
      "brand": "TrailBlaze",
      "price": 1400,
      "category": "Mountain",
      "description": "High-performance mountain bike built for extreme trails.",
      "quantity": 20,
      "inStock": true,
      "createdAt": "2024-11-22T02:28:19.541+00:00",
      "updatedAt": "2024-11-22T02:28:19.541+00:00"
    }
}

```

### Update a Bike's properties

This API call updates the data in the specified product. It takes the modified document or the updated document and modifies the field values of the document in the DB. If the prescribed document format is not provided the API returns an error message

```http
https://assignmentvercel-one.vercel.app/api/products/673fec437bd216ac4e1b8085
```

#### Request Body

```json
{
    "name":"Changed Bike Again"
}
```

### Delete a bike

This API call deletes a specified product in the database. It returns a Delete confirmation in the form of success and error message.

```http
https://assignmentvercel-one.vercel.app/api/products/674011efe649fa028c41ff44

```

### Create an order

This API call Create an order with the specified product ID.  It requires a Jason object Which represents the modified field values.This call Creates an order data in the database order collection  table With a related product ID from the product table along with the number of quantity the total price. It returns an error message If the object provided is not valid.

```http
https://assignmentvercel-one.vercel.app/api/orders
```

 Request Body

```json
{
        "email":"abc@test.com",
        "productId":"673fec437bd216ac4e1b807e",
        "quantity":2,
        "totalPrice":2598
}
```

## Predefined POSTMAN Requests for your convenience

BikeAPI lounge is Pleased to provide you with all the predefined API calls in postman requests   so that you don't have to manually enter The URL in the browser in order to test the server. the postman requests are organized into several  collections. the public link for the POSTMAN Workspace is provided below.

<p align=center>[Predefined API Requests from POSTMAN](https://www.postman.com/bishawjit12/requests)</p>

## Data Sanitization

We implemented powerful Zod validation library to sanitize the post and get data, query and perimeters. If the POST data and GET query and parameter data format is correct, the server returns a success message and  the original data is preserved otherwise an error message is transmitted respectively. Bad data is no good.

## Middleware as the request Guard on alert

A number of middleware were implemented in the server to ensure data cleaning during the life cycle of a post request. For example, If there are no data available for the order or bike creation Request the middleware will not allow the post request to go through the next stage and will immediately return a response stating that a request body is required.

## The Last Mile

We are very eager to expand our server With more API calls in the near future along with standardizing our code base According to the industry conventions. With enough care and nurture our server will expand its functionalities in the near future and eventually bloom into a full fledged API testing platform.
