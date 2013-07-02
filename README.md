# grunt-wait

[![Build Status](https://secure.travis-ci.org/Bartvds/grunt-wait.png?branch=master)](http://travis-ci.org/Bartvds/grunt-wait) [![Dependency Status](https://gemnasium.com/Bartvds/grunt-wait.png)](https://gemnasium.com/Bartvds/grunt-wait) [![NPM version](https://badge.fury.io/js/grunt-wait.png)](http://badge.fury.io/js/grunt-wait)

> Delay the grunt build chain with callbacks

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wait --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-wait');
```

## The "wait" task

### Overview
In your project's Gruntfile, add a section named `wait` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	wait: {
		options: {
			delay: 500
		},
		pause: {      
			options: {
				before : function(options) {
					console.log('pausing %dms', options.delay);
				},
				after : function() {
					console.log('pause end');
				}
			}
		},
		random: {      
			options: {
				delay: 10,
				after : function() {
					console.log('gamble');
					return Math.random() < 0.05 ? false : true;
				}
			}
		}
	}
})
```

### Options

#### options.delay
Type: `number`
Default value: `0`

Wait duration in milliseconds.

#### options.before
Type: `function(options)`
Default value: null

Called before timer starts, with the options object as parameter. 

* Return nothing (or `undefined`) to start the delay.
* Return `true` to skip delay and proceed to `after()` and/or next grunt task. 
* Return `false` to skip delay and proceed to the next grunt task without calling `after()`. 
* Return a `string` to use as warning and fail grunt.

#### options.after
Type: `function(options)`
Default value: null

Called after timer ends, with the options object as parameter. 

* Return nothing (or `undefined`) proceed to next grunt task.
* Return a `number` to use as next delay and wait another round.
* Return `true` to wait another round.
* Return `false` to fail grunt.
* Return a `string` to use as warning and fail grunt.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
