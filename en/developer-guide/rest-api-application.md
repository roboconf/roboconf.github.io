---
title: "The Application REST API"
layout: page
id: "dg.snapshot.rest-api-application"
menus: [ "developers", "developer-guide" ]
---

This API is used to update the instances of a given application.  

<br />

## <span class="glyphicon glyphicon-hand-right"></span> GET /app/{name}/children

To list instances under a given one.

**Query Parameters:**

- name: the name of the application.
- instance-path: the path of the parent instance (null to get root instances). URL parameter.
- all-children: true to get all the children, false to only get the direct children. URL parameter.

**Request Headers:**

- none

**Response Headers:**

- Content-Type: application/json

**Response JSON Object:**

Array of instances: [ inst1, ..., instN ]  
An instance is an object with the following properties:

- name: the instance name.
- path: the instance path (with / used as a path separator).
- status: the instance status (NOT\_DEPLOYED, DEPLOYING, DEPLOYED\_STOPPED, STARTING, DEPLOYED\_STARTED, PROBLEM).
- component: an object that provides information about the deployed component, including its name and installer (e.g. puppet or bash).
- channels: the channel names.
- data: custom data fields maintained by the instance (e.g. the IP address).

Example:

```json
[
{"name":"Mongo primary","path":"/Mongo primary","status":"NOT_DEPLOYED",
 "component":{"name":"VmMongo","installer":"iaas"}},
{"name":"Mongo primary node","path":"/Mongo primary/Mongo primary node","status":"NOT_DEPLOYED",
 "component":{"name":"MongoReplicasetMember","installer":"puppet"}}
]
```

**Status Codes:**

- 200 OK.
- 404 Not found - The application was not found.

**Request:**

```http
GET /app/mongo-replicaset/children?all-children=false HTTP/1.1
Host: localhost:9998
```

**Response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json

[{"name":"Mongo primary","path":"/Mongo primary","status":"NOT_DEPLOYED","component":{"name":"VmMongo","installer":"iaas"}},
    {"name":"Mongo primary node","path":"/Mongo primary/Mongo primary node","status":"NOT_DEPLOYED","component":{"name":"MongoReplicasetMember","installer":"puppet"}}]
```

<br />

## <span class="glyphicon glyphicon-hand-right"></span> POST /app/{name}/change-state

To change the state of a given instance.  
In fact, this operation only request the DM to send a notification to the right agent. The response
acknowledges the fact that the notification was sent. The agent will undertake the proper actions to
update the instance state (including ignoring the request if it does not make sense).

**Query Parameters:**

- name: the application name (as a path parameter).
- new-state: the new state (NOT_DEPLOYED, DEPLOYED_STOPPED, DEPLOYED_STARTED). URL parameter.
- instance-path: the path of the instance whose state must be changed. URL parameter.

**Request Headers:**

- none

**Response Headers:**

- none

**Response Text Object:**

- none

**Status Codes:**

- 200 OK.
- 404 Not found - The application or the instance was not found.
- 403 Forbidden - Invalid state or permission issue.

**Request:**

```http
POST /app/mongo-replicaset/change-state?instance-path=/Mongo/primary&new-state=DEPLOYED_STARTED HTTP/1.1
Host: localhost:9998
```

**Response:**

```http
HTTP/1.1 200 OK
```

<br />

## <span class="glyphicon glyphicon-hand-right"></span> POST /app/{name}/deploy-all

To deploy and start an instance and all its children in a single invocation.

**Query Parameters:**

- name: the application name (as a path parameter).
- instance-path: the path of the instance to start. Null to match all the root instances. URL parameter.

**Request Headers:**

- none

**Response Headers:**

- none

**Response Text Object:**

- none

**Status Codes:**

- 200 OK.
- 404 Not found - The application was not found.
- 403 Forbidden - Invalid configuration of the infrastructure, or permission issue.

**Request:**

To deploy and start the _primary_ instance and all its children.

```http
POST /app/mongo-replicaset/deploy-all?instance-path=/Mongo/primary HTTP/1.1
Host: localhost:9998
```

To deploy all the instances of the application.

```http
POST /app/mongo-replicaset/deploy-all HTTP/1.1
Host: localhost:9998
```

**Response:**

```http
HTTP/1.1 200 OK
```

<br />

## <span class="glyphicon glyphicon-hand-right"></span> POST /app/{name}/stop-all

To stop an instance and all its children in a single invocation.

**Query Parameters:**

- name: the application name (as a path parameter).
- instance-path: the path of the instance to stop. Null to match all the root instances. URL parameter.

**Request Headers:**

- none

**Response Headers:**

- none

**Response Text Object:**

- none

**Status Codes:**

- 200 OK.
- 404 Not found - The application was not found.
- 403 Forbidden - Permission issue.

**Request:**

To stop the _primary_ instance and all its children.

```http
POST /app/mongo-replicaset/stop-all?instance-path=/Mongo/primary HTTP/1.1
Host: localhost:9998
```

To stop all the instances of the application.

```http
POST /app/mongo-replicaset/stop-all HTTP/1.1
Host: localhost:9998
```

**Response:**

```http
HTTP/1.1 200 OK
```

<br />

## <span class="glyphicon glyphicon-hand-right"></span> POST /app/{name}/undeploy-all

To stop and undeploy an instance and all its children in a single invocation.

**Query Parameters:**

- name: the application name (as a path parameter).
- instance-path: the path of the instance to stop and undeploy. Null to match all the root instances. URL parameter.

**Request Headers:**

- none

**Response Headers:**

- none

**Response Text Object:**

- none

**Status Codes:**

- 200 OK.
- 404 Not found - The application was not found.
- 403 Forbidden - Invalid configuration of the infrastructure, or permission issue.

**Request:**

To stop and undeploy the _primary_ instance and all its children.

```http
POST /app/mongo-replicaset/stop-all?instance-path=/Mongo/primary HTTP/1.1
Host: localhost:9998
```

To stop and undeploy all the instances of the application.  
This will result in simply terminating the machines.

```http
POST /app/mongo-replicaset/stop-all HTTP/1.1
Host: localhost:9998
```

**Response:**

```http
HTTP/1.1 200 OK
```

<br />

## <span class="glyphicon glyphicon-hand-right"></span> GET /app/{name}/possibilities

To list all the components that can be deployed on a given instance.

**Query Parameters:**

- name: the name of the application.
- instance-path: the path of the instance. URL parameter.

**Request Headers:**

- none

**Response Headers:**

- Content-Type: application/json

**Response JSON Object:**

Array of components: [ comp1, ..., compN ]  
A component is an object with the following properties:

- name: the component name.
- installer: the installer name.

Example:

```json
[{"name":"Mongo primary","installer":"bash"},{"name":"Mongo secondary","installer":"puppet"}]
```

**Status Codes:**

- 200 OK.
- 404 Not found - The application or the instance was not found.

**Request:**

```http
GET /app/mongo-replicaset/possibilities?instance-path=/vm HTTP/1.1
Host: localhost:9998
```

**Response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json

[{"name":"Mongo primary","installer":"bash"},{"name":"Mongo secondary","installer":"puppet"}]
```

<br />

## <span class="glyphicon glyphicon-hand-right"></span> GET /app/{name}/components

To list all the components available in this application.

**Query Parameters:**

- name: the name of the application..

**Request Headers:**

- none

**Response Headers:**

- Content-Type: application/json

**Response JSON Object:**

Array of components: [ comp1, ..., compN ]  
A component is an object with the following properties:

- name: the component name.
- installer: the installer name.

Example:

```json
[{"name":"Mongo primary","installer":"bash"},{"name":"Mongo secondary","installer":"puppet"}]
```

**Status Codes:**

- 200 OK.
- 404 Not found - The application was not found.

**Request:**

```http
GET /app/mongo-replicaset/components HTTP/1.1
Host: localhost:9998
```

**Response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json

[{"name":"vm","installer":"target"},{"name":"Mongo primary","installer":"bash"},{"name":"Mongo secondary","installer":"puppet"}]
```

<br />

## <span class="glyphicon glyphicon-hand-right"></span> GET /app/{name}/component/{componentName}

To find instances where a given component could be instantiated.

**Query Parameters:**

- name: the name of the application.
- componentName: the name of a component of the application.

**Request Headers:**

- none

**Response Headers:**

- Content-Type: application/json

**Response JSON Object:**

Array of instances: [ inst1, ..., instN ]  
An instance is an object with the following properties:

- name: the instance name.
- path: the instance path (with / used as a path separator).
- status: the instance status (NOT\_DEPLOYED, DEPLOYING, DEPLOYED\_STOPPED, STARTING, DEPLOYED\_STARTED, PROBLEM).
- component: an object that provides information about the deployed component, including its name and installer (e.g. puppet or bash).
- channels: the channel names.
- data: custom data fields maintained by the instance (e.g. the IP address).

Example:

```json
[
{"name":"Mongo primary","path":"/Mongo primary","status":"NOT_DEPLOYED",
 "component":{"name":"VmMongo","installer":"iaas"}},
{"name":"Mongo primary node","path":"/Mongo primary/Mongo primary node","status":"NOT_DEPLOYED",
 "component":{"name":"MongoReplicasetMember","installer":"puppet"}}
]
```

**Status Codes:**

- 200 OK.
- 404 Not found - The application or the component was not found.

**Request:**

```http
GET /app/mongo-replicaset/component/MongoReplicasetMember HTTP/1.1
Host: localhost:9998
```

**Response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json

[{"name":"Mongo primary","path":"/Mongo primary","status":"NOT_DEPLOYED","component":{"name":"VmMongo","installer":"iaas"}}]
```

<br />

## <span class="glyphicon glyphicon-hand-right"></span> DELETE /app/{name}/instances

To delete an instance from the model.

**Query Parameters:**

- name: the application name (as a path parameter).
- instance-path: the path of the instance to delete. URL parameter.

**Request Headers:**

- none

**Response Headers:**

- none

**Response Text Object:**

- none

**Status Codes:**

- 200 OK.
- 404 Not found - The application or the instance was not found.
- 403 Forbidden - Permission issue.
- 406 Not acceptable - Error with the file system.

**Request:**

```http
DELETE /app/mongo-replicaset/instances?instance-path=/Mongo/primary HTTP/1.1
Host: localhost:9998
```

**Response:**

```http
HTTP/1.1 200 OK
```

<br />

## <span class="glyphicon glyphicon-hand-right"></span> POST /app/{name}/instances

To add a new instance in the model.

**Query Parameters:**

- name: the application name (as a path parameter).
- instance-path: the path of the parent instance (where to insert). Null to insert a root instance. URL parameter.

**Request Headers:**

- Content-type: application/json

**Request JSON Objet:**

- instance: the instance object.

**Response Headers:**

- none

**Response Text Object:**

- none

**Status Codes:**

- 200 OK.
- 404 Not found - The application or the instance's component was not found.
- 403 Forbidden - Permission issue.
- 406 Not acceptable - The instance cannot be inserted (not compliant with the graph).

**Request:**

```http
POST /app/mongo-replicaset/instances?instance-path=/Mongo-vm HTTP/1.1
Host: localhost:9998
{
	"name":"Mongo primary","component":{"name":"ReplicaSetMember"}
}
```

**Response:**

```http
HTTP/1.1 200 OK
```
