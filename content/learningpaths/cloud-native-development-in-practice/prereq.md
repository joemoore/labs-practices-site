---
title: Prerequisites
weight: 4
layout: single
team:
  - Pivotal/Tanzu Labs
---

Before you start,
you need to decide how you will use this learning path:

1.  You want to review the contents,
    but not do the labs.
    If this is the case,
    proceed to the
    [Introduction](../intro/).

1.  You want to do the labs

If you want to do the labs,
it will be up to you to set up or acquire environments in which to
run the labs.

This section lists the prerequisites and caveats.

## Practitioner

While this learning path is designed at basic to intermediate level,
it requires you to implement solutions with a minimum level of
prescribed instructions.

If you choose to do the labs,
the following knowledge is required:

- Java Development
- Bash shell navigation
- Navigating a Java IDE
- Ability to search the web to find technical answers

If you are coming from Windows and are PowerShell literate,
you will likely be able to navigate the Bash shell commands,
or translate to PowerShell if you choose to run the labs on Windows
PowerShell rather than Bash.

If you have no experience with terminals or Java,
you will struggle to get through the labs.

## _Tanzu Application Service_ (_Tanzu Application Service_) foundation

For the best experience, you will need a
_Tanzu Application Service_ (TAS) foundation where you will deploy your
applications.

If you work for an organization that runs _Tanzu Application Service_
foundations,
reach out to the Platform Operations Teams that maintain them to get
access to a foundation used for development or training use only.

The following are requirements you can communicate to your operations
team:

Bare Minimum:

- Java build pack that supports Java version 11
- _Tanzu Application Service_ _user_.
- A dedicated _space_,
  where the _user_ has _space developer_ role for that _space_,
  with ability to push, scale and delete applications,
  as well as ability to reserve, map, unmap, and delete routes within
  that _space_.

Desired:

- MySQL Tile (MySQL Service broker) for the labs including and after
  the [Backing Services and Database Migrations lab](../database-migrations/).
  If the service broker is not available,
  inquire about how your organization's platforms consume databases.
  You may be able to use
  [User Provided Services](https://docs.cloudfoundry.org/devguide/services/user-provided.html)
  method instead.
- SSH tunneling enabled for the _Configure a Spring Boot App_ and
  _Database Migrations_ labs
- Container-to-container networking enabled - for the
  _Service Discovery_ lab.

## Without _Tanzu Application Service_ Foundation Access

If you do not have access to a _Tanzu Application Service_ foundation
you will not be able to follow the instructions in the labs to deploy
your applications to a cloud environment.
As a result, you will not get the most benefit out of this learning
path.

You can, however, still perform many of the development operations in
the labs in your local environment.
This will give you some experience of good cloud-native development
practices, such as testing for microservices.
However, some labs will be impossible to complete without a
_Tanzu Application Service_ foundation and others may be hard to
understand without experience of such an environment.

## Development Workstation

Following are the tools you need to run the labs:

- Git command line client:
  If you are using GUI clients,
  beware the lab instructions will use the command line.

- Bash shell:
  MacOS or Linux preferred,
  but Windows Subsystem for Linux (WSL) should work OK too.

- A Java Interactive Development Environment (IDE):
  IntelliJ is preferred, but Eclipse and Visual Studio Code with
  Java and Spring extensions should work fine too.

- Java Development Kit version 11

- Docker:
  Will be used to run a load injector,
  and may also be used to run MySQL on your local workstation.

- MySQL Server 8+:
  You can run MySQL locally,
  but running via Docker will likely be a more convenient installation.
  Note that MariaDB 10+ is an acceptable alternative to MySQL 8+, and
  the lab instructions should work equally well with MariaDB.

- _Tanzu Application Service_ command line client `cf` cli

- Flyway command line
