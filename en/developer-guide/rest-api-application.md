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

**Response JSON Object:**

Array of instances (VMs or apps) : [ inst1, ..., instN ]

An instance is an object with the following properties:

- name: the instance name
- path: the instance path (with / used as a path separator)
- status: the instance status (NOT\_DEPLOYED, DEPLOYING, DEPLOYED\_STOPPED, STARTING, DEPLOYED\_STARTED, PROBLEM)
- component: an object that provides information about the deployed component, including its name, alias, and installer flavor (eg. puppet or bash).

Example:

[
{"name":"Mongo primary","path":"/Mongo primary","status":"NOT_DEPLOYED",
 "component":{"name":"VmMongo","alias":"Mongo VM","installer":"iaas"}},
{"name":"Mongo primary node","path":"/Mongo primary/Mongo primary node","status":"NOT_DEPLOYED",
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
    [{"name":"Mongo primary","path":"/Mongo primary","status":"NOT_DEPLOYED","component":{"name":"VmMongo","alias":"Mongo VM","installer":"iaas"}},
    {"name":"Mongo primary node","path":"/Mongo primary/Mongo primary node","status":"NOT_DEPLOYED","component":{"name":"MongoReplicasetMember","alias":"A MongoDB node part of a replica-set","installer":"puppet"}}]

## POST /app/{name}/deploy

Deploy an instance.

**Query Parameters:**

- name: the application name (as a path parameter).

**Request Headers:**

- Content-type: application/json

**Request JSON Objet:**

- instance-path: the instance path (using / as separator).
- apply-to-children: apply to subtree, or only to base node ("true" or "false", default "false").

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

    POST /app/mongo-replicaset/deploy HTTP/1.1
    Host: localhost:9998
    {
      "instance-path": "/Mongo/primary",
      "apply-to-children": "true"
    }

**Response:**

    HTTP/1.1 200 OK
    
## POST /app/{name}/start

Start a deployed instance.

**Query Parameters:**

- name: the application name (as a path parameter).

**Request Headers:**

- Content-type: application/json

**Request JSON Objet:**

- instance-path: the instance path (using / as separator).
- apply-to-children: apply to subtree, or only to base node ("true" or "false", default "false").

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

    POST /app/mongo-replicaset/start HTTP/1.1
    Host: localhost:9998
    {
      "instance-path": "/Mongo/primary/Mongo primary node",
      "apply-to-children": "true"
    }

**Response:**

    HTTP/1.1 200 OK

## POST /app/{name}/stop

Stop a running instance.

**Query Parameters:**

- name: the application name (as a path parameter).

**Request Headers:**

- Content-type: application/json

**Request JSON Objet:**

- instance-path: the instance path (using / as separator).

**Response Headers:**

**Response JSON Object:**

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
    {
      "instance-path": "/Mongo/primary/Mongo primary node"
    }

**Response:**

    HTTP/1.1 200 OK

## POST /app/{name}/undeploy

Undeploy a deployed instance. The instance should be stopped: if not, a stop will be forced before undeploying.

**Query Parameters:**

- name: the application name (as a path parameter).

**Request Headers:**

- Content-type: application/json

**Request JSON Objet:**

- instance-path: the instance path (using / as separator).

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

    POST /app/mongo-replicaset/undeploy HTTP/1.1
    Host: localhost:9998
    {
      "instance-path": "/Mongo/primary/Mongo primary node"
    }

**Response:**

    HTTP/1.1 200 OK
