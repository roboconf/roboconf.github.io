---
title: "Tutorial - Apache Storm"
layout: page
cat: "ug-snapshot"
id: "tutorial-apache-storm"
menus: [ "users", "user-guide" ]
---

## Introduction

Apache Storm allows to run "topologies" (graphs of computation) on a "storm cluster".

A storm cluster is made of several nodes, including:
- A master node, called "Nimbus".
- Slave nodes, called "supervisor nodes" or "workers" (in fact, workers, that do the real computation, are running on supervisor nodes).
- Coordination nodes, based on Apache Zookeeper.

<img src="/resources/img/tutorial-storm-cluster.png" alt="Apache storm" class="gs" />

A storm topology (the graph of computation) is a kind of real-time computation "stream". Data tuples are exchanged between computation units, calles "spouts" and "bolts". Spouts are unbounded sources of tuples (they provide data), and bolts issue tuple transformations (they perform calculations).

<img src="/resources/img/tutorial-storm-topology.png" alt="Apache storm" class="gs" />
