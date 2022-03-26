---
templateKey: post
title: Express + Mongoose + Pug
date: 2019-09-14T02:47:42.512Z
excerpt: >-
  Express is a lightweight Node.js web application framework to help organize
  your web application into a MVC architecture. Express basically helps
---
[Express](https://expressjs.com/) is a lightweight Node.js web application framework to help organize your web application into a MVC architecture. Express basically helps you manage everything, from routes, to handling requests and views. Because it is a part of Node.js, yes, Javascript is a key programming language for everything. JavaScript was limited to client-side scripting, thanks to transformation script into a cross-over language of Node, it is capable of writing software that's portable between the front and back ends. However, it needs to meet the requirements of JavaScript V8 Engine where Node is simply a library that was written for.

A [demo](https://github.com/hieu-tn/express-mongoose-pug) is created on github, which you can clone and play around.

The structure is
```
controllers/        # Controller files
|
|- index.js         # "/" function handler and use include other path function handler
|- book.js          # Component book function handler
|
middlewares/        # Middleware files
|
|- index.js
|
models/             # Model files, which related to DB
|
|- book.js          # Book model
|
public/             # Public path
|
|- main.js          # Javascript file
|- main.scss        # SASS file
|
views/              # Template files
|
.env-cmdrc          # ENV config file
app.js              # app runs here
...
```

## References
[express](https://expressjs.com),
[babel](https://babeljs.io),
[env-cmd](https://github.com/toddbluhm/env-cmd),
[cross-env](https://github.com/kentcdodds/cross-env),
[eslint](https://eslint.org),
[nodemon](https://github.com/remy/nodemon),
[pug](https://pugjs.org),
[body-parser](https://github.com/expressjs/body-parser),
[cookie-parser](https://github.com/expressjs/cookie-parser),
[express-session](https://github.com/expressjs/session),
[mongoose](http://mongoosejs.com),
[morgan](https://github.com/expressjs/morgan),
[multer](https://github.com/expressjs/multer),
[node-sass-middleware](https://github.com/sass/node-sass-middleware)
