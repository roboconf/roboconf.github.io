---
title: "The Debug REST API"
layout: page
id: "dg.snapshot.rest-api-debug"
menus: [ "developers", "developer-guide" ]
---

This API is used to debug and diagnostic Roboconf.

<br />

## <span class="glyphicon glyphicon-hand-right"></span> POST /debug/test-target

Uploads a **target.properties** file and creates a fake application to test
deployment on a given target or infrastructure.

**Query Parameters:**

- file: a **target.properties** file.

**Request Headers:**

- Content-type: multipart/form-data

**Response Headers:**

- none

**Response Text Object:**

- none

**Status Codes:**

- 200 OK.
- 403 Forbidden - Any file-system related error (e.g. read-only access).
- 409 Conflict - A user application called "" already exists.

**Request:**

```http
POST /debug/test-target HTTP/1.1
Host: localhost:9998
```

**Response:**

```http
HTTP/1.1 200 OK
```
