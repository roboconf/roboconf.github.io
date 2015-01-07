---
title: "The Management REST API"
layout: page
id: "dg.snapshot.rest-api-management"
menus: [ "developers", "developer-guide" ]
---

This API is used to load, query or delete applications.

<br />

## <span class="glyphicon glyphicon-hand-right"></span> GET /applications

To list deployed applications.

**Query Parameters:**

- none

**Request Headers:**

- Accept: application/json

**Response Headers:**

- Content-Type: application/json

**Response Text Object:**

Array of applications: [ app1, ..., appN ]  
An application is an object with the following properties:

- name: the application name.
- desc: a human-readable description.
- qualifier: additional information field (e.g. version, category...).
- namespace: the application's name space.

Example:

```json
[{"name":"mongo-replicaset","desc":"A mongo replica set install on IaaS VMs","qualifier":"1.0","namespace":"net.roboconf"}]
```

**Status Codes:**

- 200 OK

**Request:**

```http
GET /applications HTTP/1.1
Host: localhost:9998
Accept: application/json
```

**Response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json
Transfer-Encoding: chunked

5a
[{"name":"mongo-replicaset","desc":"A sample application","qualifier":"sample","namespace":"net.roboconf"}]
0
```

<br />

## <span class="glyphicon glyphicon-hand-right"></span> POST /applications

To upload and deploy an application.

**Query Parameters:**

- file: the roboconf deployment archive (ZIP file).

**Request Headers:**

- Content-type: multipart/form-data

**Response Headers:**

- none

**Response Text Object:**

- none

**Status Codes:**

- 200 OK.
- 403 Forbidden - The application already exists.
- 406 Not acceptable - Invalid application.
- 401 Unauthorized - Any file-system related error (e.g. read-only access).

**Request:**

```http
POST /applications HTTP/1.1
Host: localhost:9998
```

**Response:**

```http
HTTP/1.1 200 OK
```

<br />

## <span class="glyphicon glyphicon-hand-right"></span> POST /applications/local

To deploy an application already available on the local file system (e.g. FTP upload).  
Depending on the size of the application, FTP upload may be more suitable than a simple HTTP upload.

**Query Parameters:**

- local-file-path: the path to a locally deployed (unzipped) Roboconf application (a directory path).

**Request Headers:**

- Content-type: text/plain

**Response Headers:**

- none

**Response Text Object:**

- none

**Status Codes:**

- 200 OK.
- 403 Forbidden - Application already exists, or DM malfunction (eg. not initialized).
- 406 Not acceptable - Invalid application.
- 401 Unauthorized - Any file-system related error (eg. read-only access).

**Request:**

```http
POST /applications/local?local-file-path=/path/to/the/application HTTP/1.1
Host: localhost:9998
```

**Response:**

```http
HTTP/1.1 200 OK
```

<br />

## <span class="glyphicon glyphicon-hand-right"></span> POST /applications/{name}/shutdown

To shut down an application.  
Shutdown means removing everything Roboconf deployed or created for this application.
This operation does not delete the application from the model. It only destroys runtime resources.

**Query Parameters:**

- name: the name of the application to shut down (as a path parameter).

**Request Headers:**

- none

**Response Headers:**

- none

**Response Text Object:**

- none

**Status Codes:**

- 200 OK.
- 202 Accepted - Bulk invocation scheduled for processing.
- 404 Not found - Application does not exist.

**Request:**

```http
POST /applications/mongo-replicaset/shutdown HTTP/1.1
Host: localhost:9998
```

**Response:**

```http
HTTP/1.1 200 OK
```

<br />

## <span class="glyphicon glyphicon-hand-right"></span> DELETE /applications/{name}/delete

To delete an application.  
An application can only be deleted if all its resources were stopped and undeployed first.
Said differently, an application must be shutdown before being deleted.

**Query Parameters:**

- name: the name of the application to delete (as a path parameter).

**Request Headers:**

- none

**Response Headers:**

- none

**Response Text Object:**

- none

**Status Codes:**

- 200 OK.
- 403 Forbidden - Unauthorized action, or DM failure (eg. not initialized).

**Request:**

```http
DELETE /applications/mongo-replicaset/delete HTTP/1.1
Host: localhost:9998
```

**Response:**

```http
HTTP/1.1 200 OK
```
