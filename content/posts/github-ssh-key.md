---
date: 2026-09-12T23:11:45+08:00
draft: false
title: Simple usage of ssh keys
categories:
tags:
  - github
  - ssh
description:
math: false
---
Check existing keys:
```bash
ls ~/.ssh 
```
If no, generate a new key pair using ed25519 encryption:
```bash
ssh-keygen -t ed25519 # default use user@hostname
```
Get the public key:
```bash
cat ~/.ssh/id_ed25519.pub
```
You can give this public key to cluster manager or set it on [GitHub](https://github.com/settings/keys) to let this machine access the cluster or clone private repo via ssh.

For example, in `~/.ssh/config`, we point the identity file to our private key path to access the remote machine (which stores our public key).
```
Host remote1
	HostName 192.168.0.1
	User me
	IdentityFile ~/.ssh/id_ed25519 # private key
```