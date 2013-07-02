/*
 * grunt-wait
 * https://github.com/Bartvds/grunt-wait
 *
 * Copyright (c) 2013 Bart van der Schoor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	grunt.registerMultiTask('wait', 'Stop and wait.', function () {
		var options = this.options({
			delay: 0,
			before: null,
			after: null
		});
		var timerId = 0;
		var setTicker = function(delay, call){
			clearTimeout(timerId);
			timerId = setTimeout(call, delay);
		};

		var startTime = Date.now();
		var done = this.async();
		var callback = function () {
			clearTimeout(timerId);
			if(options.after) {
				var value = options.after.call(null, options);
				if (value === true) {
					grunt.log.writeln('Wait another %dms', options.delay);
					setTicker(options.delay, callback);
					return;
				} else if (typeof value === 'number') {
					grunt.log.writeln('Wait another %dms', value);
					setTicker(value, callback);
					return;
				}
				else if (typeof value === 'string' || typeof value === 'object') {
					grunt.log.warn(value);
					done(1);
					return;
				}
			}
			grunt.log.ok('Done waiting after %dms', (Date.now() - startTime));
			done();
		};

		if (options.before) {
			var value = options.before.call(null, options);
			if (value === true) {
				callback();
				return;
			} else if (value === false) {
				grunt.log.writeln('Done waiting before starting');
				done();
				return;
			} else if (typeof value === 'number') {
				grunt.log.writeln('Start waiting %dms', value);
				setTicker(value, callback);
				return;
			}
			else if (typeof value === 'string') {
				grunt.log.fail(value);
				return;
			}
		}
		grunt.log.writeln('Start waiting %dms', options.delay);
		setTicker(options.delay, callback);
	});
};
