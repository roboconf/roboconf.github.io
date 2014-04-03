---
title: "The Init REST API"
layout: page
id: "dg.snapshot.rest-api-init"
menus: [ "developers", "developer-guide" ]
---

This API is used to send commands to the Deployment Manager.  


## GET /init

Get the initialization's state of the DM.

**Query Parameters:**

- none

**Request Headers:**

- Accept: text/plain

**Response Headers:**

- Content-Type: text/plain

**Response Text Object:**

*true* or *false*

**Status Codes:**

- 200 OK

**Request:**

    GET /init
    Accept: text/plain
    Host: localhost:9998

**Response:**

    HTTP/1.1 200 OK
    [
      true
    ]


## POST /init

Post the IP address of the message server to the DM.

**Query Parameters:**

- amqp-ip: the IP address of the message server

**Request Headers:**

- Accept: text/plain

**Response Headers:**

- Content-Type: text/plain

**Response Text Object:**

**true** or **false**

**Status Codes:**

- 200 OK - The DM now uses the given IP address to contact the messaging server.
- 403 Forbidden - A message server is already in use at another location.

**Request:**

    POST /init
    Accept: text/plain
    Host: localhost:9998
    
    127.0.0.1

**Response:**

    HTTP/1.1 200 OK
