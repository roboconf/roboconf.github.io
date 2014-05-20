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

    GET /app/mongo-replicaset/all-children HTTP/1.1
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

## POST /app/{name}/deploy/instance/{instancePath}

Deploy an instance.

**Query Parameters:**

- name: the application name (as a path parameter).
- instancePath: the path to the instance to deploy (as a path parameter).
- applyToAllChildren: true | false (optional, default false).

**Request Headers:**

- Content-type: application/json

**Response Headers:**

**Response Text Object:**

N/A

**Status Codes:**

- 200 OK.
- 202 Accepted - Bulk invocation scheduled for processing.
- 404 Not found - Instance not found.
- 403 Forbidden - Unauthorized action.
- 400 Bad request - Invalid action or malformed request.

**Request:**

    POST /app/mongo-replicaset/deploy/instance/%7CMongo%20primary HTTP/1.1
    Host: localhost:9998

**Response:**

    HTTP/1.1 200 OK
    
## POST /app/{name}/start/instance/{instancePath}

Start a deployed instance.

**Query Parameters:**

- name: the application name (as a path parameter).
- instancePath: the path to the instance to start (as a path parameter).
- applyToAllChildren: true | false (optional, default false).

**Request Headers:**

- Content-type: application/json

**Response Headers:**

**Response Text Object:**

N/A

**Status Codes:**

- 200 OK.
- 202 Accepted - Bulk invocation scheduled for processing.
- 404 Not found - Instance not found.
- 403 Forbidden - Unauthorized action.
- 400 Bad request - Invalid action or malformed request.

**Request:**

    POST /app/mongo-replicaset/start/instance/%7CMongo%20primary%7CMongo%20primary%20node HTTP/1.1
    Host: localhost:9998

**Response:**

    HTTP/1.1 200 OK

## POST /app/{name}/stop/instance/{instancePath}

Stop a running instance.

**Query Parameters:**

- name: the application name (as a path parameter).
- instancePath: the path to the instance to stop (as a path parameter).
- applyToAllChildren: true | false (ignored: all children are stopped).

**Request Headers:**

- Content-type: application/json

**Response Headers:**

**Response Text Object:**

N/A

**Status Codes:**

- 200 OK.
- 202 Accepted - Bulk invocation scheduled for processing.
- 404 Not found - Instance not found.
- 403 Forbidden - Unauthorized action.
- 400 Bad request - Invalid action or malformed request.

**Request:**

    POST /app/mongo-replicaset/stop/instance/%7CMongo%20primary%7CMongo%20primary%20node HTTP/1.1
    Host: localhost:9998

**Response:**

    HTTP/1.1 200 OK

## POST /app/{name}/undeploy/instance/{instancePath}

Undeploy a deployed instance. The instance should be stopped: if not, a stop will be forced before undeploying.

**Query Parameters:**

- name: the application name (as a path parameter).
- instancePath: the path to the instance to undeploy (as a path parameter).
- applyToAllChildren: true | false (ignored: all children are undeployed).

**Request Headers:**

- Content-type: application/json

**Response Headers:**

**Response Text Object:**

N/A

**Status Codes:**

- 200 OK.
- 202 Accepted - Bulk invocation scheduled for processing.
- 404 Not found - Instance not found.
- 403 Forbidden - Unauthorized action.
- 400 Bad request - Invalid action or malformed request.

**Request:**

    POST /app/mongo-replicaset/start/instance/%7CMongo%20primary%7CMongo%20primary%20node HTTP/1.1
    Host: localhost:9998

**Response:**

    HTTP/1.1 200 OK
