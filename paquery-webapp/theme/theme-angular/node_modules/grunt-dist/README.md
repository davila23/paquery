# grunt-dist

> Bulk generate `js`,` min.js` and `min.map`.

![screenshot](screenshot.png)


## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dist --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dist');
```

## The "dist" task

### Overview
In your project's Gruntfile, add a section named `dist` to the data object passed into `grunt.initConfig()`.

```js
module.exports = function(grunt) {
  grunt.initConfig({
      dist: {
          default_options: {
              files: {
                  "dist":['dist/JSLite.js']
              }
          }
      }
  });
  // npm install --save-dev load-grunt-tasks
  require('load-grunt-tasks')(grunt); 
}
```

### Usage Examples

#### Default Options
In this example

```js
grunt.initConfig({
  dist: {
    options: {},
    files: {
      'dist': ['src/testing.txt', 'src/123.js', 'dist/JSLite.js'],
    },
  },
});
```


## Contributing


## Release History
_(Nothing yet)_
