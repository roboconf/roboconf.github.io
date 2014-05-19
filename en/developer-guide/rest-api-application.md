---
title: "The Application REST API"
layout: page
id: "dg.snapshot.rest-api-application"
menus: [ "developers", "developer-guide" ]
---

This API is used to update the instances of a given application.  

## GET /app/{name}/all-children

List the whole graph of a given application (all instances of VMs and apps).

**Query Parameters:**

- name: the name of the application (as a path parameter).

**Request Headers:**

- Accept: application/json

**Response Headers:**

- Content-Type: application/json

**Response Text Object:**

Array of instances (VMs or apps) : [ inst1, ..., instN ]

An instance is an object with the following properties:

- name: the instance name
- path: the instance path (with | used as a peth separator)
- status: the instance status (NOT\_DEPLOYED, DEPLOYING, DEPLOYED\_STOPPED, STARTING, DEPLOYED\_STARTED, PROBLEM)
- component: an object that provides information about the deployed component, including its name, alias, and installer flavor (eg. puppet or bash).

Example:

[
{"name":"Mongo primary","path":"|Mongo primary","status":"NOT_DEPLOYED",
 "component":{"name":"VmMongo","alias":"Mongo VM","installer":"iaas"}},
{"name":"Mongo primary node","path":"|Mongo primary|Mongo primary node","status":"NOT_DEPLOYED",
 "component":{"name":"MongoReplicasetMember","alias":"A MongoDB node part of a replica-set","installer":"puppet"}}
]


**Status Codes:**

- 200 OK

**Request:**

    GET /app/mongo-replicaset-openstack HTTP/1.1
    Host: localhost:9998
    Accept: application/json

**Response:**

    HTTP/1.1 200 OK
    Content-Type: application/json
    Transfer-Encoding: chunked
        
    8f
    [{"name":"Mongo primary","path":"|Mongo primary","status":"NOT_DEPLOYED","component":{"name":"VmMongo","alias":"Mongo VM","installer":"iaas"}},
    d2
    {"name":"Mongo primary node","path":"|Mongo primary|Mongo primary node","status":"NOT_DEPLOYED","component":{"name":"MongoReplicasetMember","alias":"A MongoDB node part of a replica-set","installer":"puppet"}}]
    0

## POST /app/{name}/deploy/instance/{instanceName}

Deploy an instance.

**Query Parameters:**

- name: the application name (as a path parameter).
- instanceName: the name of the instance to deploy (as a path parameter).

**Request Headers:**

- Content-type: application/json

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

    POST /applications/mongo-replicaset-openstack/shutdown
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

    POST /applications/mongo-replicaset-openstack/delete
    Host: localhost:9998

**Response:**

    HTTP/1.1 200 OK
    
