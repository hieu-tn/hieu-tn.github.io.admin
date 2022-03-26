---
templateKey: post
title: Automate Gulp
date: 2019-02-01T02:46:10.379Z
excerpt: >-
  Gulp is a command line task runner, which works on Node environment. It runs
  custom defined tasks rapidly. In web development workflow, gulp's purpose
---
Gulp is a command line task runner, which works on Node environment. It runs custom defined tasks rapidly. In web development workflow, gulp's purpose is compiling \[and bundling block of codes] source code to whatever we want.

Who should use this gulp? If you want a quick and easy setup, gulp should be the first choice in the list. A [demo](https://github.com/Fabius-devaholic/automate-gulp) is created on github, which you can clone and play around.

## What we set up?

In this project, a `gulpfile` is set up for following jobs:

* Compiles SCSS to CSS
* Transpile ES6 to Javascript
* Copy static files
* Create a dev server
* Create a watch task runner

## Set up Gulp

* We start with creating a package.json


```
yarn init
```

* Install gulp and dependencies (this gulpfile is written by ES6, and it needs babel to transpile source code to javascript)


```
yarn add --dev gulp babel-core babel-preset-env
```

* Create .babelrc & gulpfile.babel.js


```
touch .babelrc gulpfile.babel.js
```

* Create a simple task

```javascript{numberLines: true}
'use strict'

import gulp from 'gulp'
import gutil from 'gulp-util'

gulp.task('log', () => {
  gutil.log('=== log task ===')
})
```

## Folder Structure

You can operate whatever structure that fits your style. However, you need to understand how it works before making any adjustment for your project.

Here is an example of folder structure:

```
dist/                         # Built files
src/
|
|- assets/                    # Asset files
|
|   |- giphy.gif
|
|- scripts/
|
|   |- components             # component scripts
|       |- functions.js    
|   |- main.js                # Main Javascript file
|
|- styles/
|
|   |– base/
|       |– base.scss          # General style rules
|   |- main.scss              # Main SCSS file  
```

Based on above structure, we have this variable `config` in `gulpfile.babel.js`

```javascript
/* Set up directories */
const config = {
  paths: {
    src: {
      assets: './src/assets',
      styles: './src/styles',
      scripts: './src/scripts',
      vendors: './src/vendors'
    },
    dist: {
      assets: './dist/assets',
      styles: './dist/styles',
      scripts: './dist/scripts',
      vendors: './dist/vendors'
    }
  }
}
```

## Main tasks

### Compiling SCSS to CSS

It is _`styles`_ task in gulpfile.babel.js. We use _`gulp-sourcemaps`_ and _`gulp-sass`_ to translate.

```javascript
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'

gulp.task('styles', () => {
  gutil.log('running styles task')
  
  return gulp.src(config.paths.src.styles + '/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .on('error', gutil.log)
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(config.paths.dist.styles))
})
```

### Transpiling ES6 to Javascript

To compile ES6 to original Javascript, it is _`scripts`_ task in gulpfile.babel.js.
We use `rollup-stream`, `vinyl-source-stream`, `vinyl-buffer`, `gulp-sourcemaps` and `gulp-babel`.
To minify endpoint file, we use `gulp-uglify`.

```javascript
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import rollup from 'rollup-stream'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'

gulp.task('scripts', () => {
  gutil.log('running scripts task')
  
  return rollup({
    input: config.paths.src.scripts + '/main.js',
    format: 'es'
  })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(config.paths.dist.scripts))
})
```

### Copying static files

It is easy when copying files.

```javascript
gulp.task('assets', () => {
  return gulp.src(config.paths.src.assets + '/**/*')
    .pipe(gulp.dest(config.paths.dist.assets))
})
```

### LiveReload

It is painful when running build task after changing. Therefore, a dev server is spun up by using _`gulp-connect`_ and watching file changes.

```javascript
import connect from 'gulp-connect'

let config = {
  ...
  localServer: {
    host: '0.0.0.0',
    port: 3000,
    name: 'Automate Gulp'
  }
}
...
gulp.task('styles', () => {
  ...
  .pipe(connect.reload())
})

gulp.task('scripts', () => {
  ...
  .pipe(connect.reload())
})
...
gulp.task('connect', () => {
  connect.server({
    host: config.localServer.host,
    port: config.localServer.port,
    name: config.localServer.name,
    livereload: true
  })
  connect.serverClose()
})
```

## Formatter

It is recommended that you should write your code following a convention. We have some gulp plugins that allow we apply our rules to source files. We use `gulp-stylelint` for style files and `gulp-eslint` for scripts file. The rules are defined in `stylelint.config.js` and `.eslintrc.js`.

We add these following lines to `gulpfile.babel.js`.

```javascript
import gulpStylelint from 'gulp-stylelint'
import postcss from 'gulp-postcss'
import eslint from 'gulp-eslint'

gulp.task('styles', () => {
  ...
  .pipe(gulpStylelint())
  ...
  .pipe(postcss())
  ...
})

gulp.task('scripts', () => {
  ...
  .pipe(eslint())
  ...
})
```

## References

[gulp](https://gulpjs.com/),
[babel](https://babeljs.io/),
[gulp-sass](https://github.com/dlmanning/gulp-sass),
[gulp-sourcemaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps),
[rollup-stream](https://github.com/Permutatrix/rollup-stream),
[vinyl-source-stream](https://github.com/hughsk/vinyl-source-stream),
[vinyl-buffer](https://github.com/hughsk/vinyl-buffer),
[gulp-uglify](https://github.com/terinjokes/gulp-uglify),
[gulp-connect](https://github.com/AveVlad/gulp-connect)
[postcss](http://postcss.org/),
[eslint](https://eslint.org/)
