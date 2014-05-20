---
title: "The Management REST API"
layout: page
id: "dg.snapshot.rest-api-management"
menus: [ "developers", "developer-guide" ]
---

This API is used to load, query or delete applications.

## GET /applications

List deployed applications.

**Query Parameters:**

- none

**Request Headers:**

- Accept: application/json

**Response Headers:**

- Content-Type: application/json

**Response Text Object:**

Array of applications : [ app1, ..., appN ]

An application is an object with the following properties:

- name: the application name
- desc: a human-readable description
- qualifier: additional information field (eg. version, category...)

Example:

[{"name":"mongo-replicaset","desc":"A mongo replica set install on IaaS VMs","qualifier":"1.0"}]


**Status Codes:**

- 200 OK

**Request:**

    GET /applications HTTP/1.1
    Host: localhost:9998
    Accept: application/json

**Response:**

    HTTP/1.1 200 OK
    Content-Type: application/json
    Transfer-Encoding: chunked
        
    5a
    [{"name":"mongo-replicaset","desc":"A sample application","qualifier":"sample"}]
    0

## POST /applications

Deploy an application.

**Query Parameters:**

- file: the roboconf deployment archive (zip file).

**Request Headers:**

- Content-type: multipart/form-data

**Response Headers:**

**Response Text Object:**

N/A

**Status Codes:**

- 200 OK.
- 403 Forbidden - Application already exists, or DM malfunction (eg. not initialized).
- 406 Not acceptable - Invalid application.
- 401 Unauthorized - Any file-system related error (eg. read-only access).

**Request:**

    POST /applications
    Host: localhost:9998

**Response:**

    HTTP/1.1 200 OK
    
## POST /applications/local

Deploy an application already available on the local filesystem (eg. FTP upload).

**Query Parameters:**

- localFilePath: the path to a locally deployed (unzipped) Roboconf application (a directory path).

**Request Headers:**

- Content-type: text/plain

**Response Headers:**

**Response Text Object:**

N/A

**Status Codes:**

- 200 OK.
- 403 Forbidden - Application already exists, or DM malfunction (eg. not initialized).
- 406 Not acceptable - Invalid application.
- 401 Unauthorized - Any file-system related error (eg. read-only access).

**Request:**

    POST /applications/local
    Host: localhost:9998

**Response:**

    HTTP/1.1 200 OK
    
## POST /applications/{name}/shutdown

Shut down an application.

**Query Parameters:**

- name: the name of the application to shut down (as a path parameter).

**Request Headers:**

**Response Headers:**

**Response Text Object:**

N/A

**Status Codes:**

- 200 OK.
- 202 Accepted - Bulk invocation scheduled for processing.
- 404 Not found - Application does not exist.

**Request:**

    POST /applications/mongo-replicaset/shutdown
    Host: localhost:9998

**Response:**

    HTTP/1.1 200 OK
    
## POST /applications/{name}/delete

Delete an application.

**Query Parameters:**

- name: the name of the application to delete (as a path parameter).

**Request Headers:**

**Response Headers:**

**Response Text Object:**

N/A

**Status Codes:**

- 200 OK.
- 403 Forbidden - Unauthorized action, or DM failure (eg. not initialized).

**Request:**

    POST /applications/mongo-replicaset/delete
    Host: localhost:9998

**Response:**

    HTTP/1.1 200 OK
