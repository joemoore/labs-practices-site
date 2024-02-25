---
title: "Pivotal Workstation Setup Scripts"
linkTitle: "Pivotal Workstation Setup"
---

Pivotal Workstation Setup is a tool that automates the process of setting up a new Mac OS X software development machine using simple [Bash](https://www.gnu.org/software/bash/) scripting. It heavily relies on [homebrew](https://brew.sh/).

## Installing

Find this tool on GitHub at https://github.com/pivotal/workstation-setup

## Goals

The primary goal of this project is to give people a simple script they can run to make their Mac OS X machine prepared and standardized for working on software development projects, especially those common at Pivotal/Tanzu Labs.

## Anti-goals

This project does not aim to do everything. Some examples:

- We don't install everything that your project needs. These scripts should only install generally useful things, and prefer running quickly over being complete.
- We avoid setting up and maintaining overly-custom configurations. When there is already a tool that will get us something in a conventional manner, such as [Oh My Zsh](https://ohmyz.sh/), we prefer to use it instead of doing things ourselves.

## Why did we do it this way?

- A bash script is easy for users to edit locally on-the-fly for small temporary tweaks
- Everything is in one repository
- The project name is informative
- It is easy to fork and customize
- It has limited requirements: `git` and `bash` available on macOS by default

This tool is [currently maintained by Joe Moore](https://github.com/pivotal/workstation-setup/issues/295).
