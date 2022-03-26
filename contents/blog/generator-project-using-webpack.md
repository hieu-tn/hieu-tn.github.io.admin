---
templateKey: post
title: Generator project using webpack
date: 2019-09-14T02:47:03.182Z
excerpt: >-
  It is tired and boring with doing the same stuff when a new project kickoffs
  such as build template structure, set up configuration. Moreover, it
---
It is tired and boring with doing the same stuff when a new project kickoffs such as build template structure, set up configuration. Moreover, it probably waste time when you do repeat the same work on every new project. For now, you can throw those minutes away with [Yeoman](http://yeoman.io), an open source client-side scaffolding tool for web applications.

Yeoman runs as a command-line interface written for Node.js and combines several functions into one place, such as generating a starter template, managing dependencies, running unit tests, providing a local development server, and optimizing production code for deployment. A [demo](https://github.com/hieu-tn/generator-webpack) generator was released on github shows you how to work with this awesome tool with a simple and clean approach. It is able to generate a simple web template which contains an index.html file, a style directory written by SCSS, a script directory written by ES6, and assets folder. It also holds a webpack config file, which act like a compiler compiles SCSS and ES6 to CSS and Javascript.
