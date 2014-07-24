# grunt-ddescribe-iit [![Build Status](https://secure.travis-ci.org/btford/grunt-ddescribe-iit.png?branch=master)](http://travis-ci.org/btford/grunt-ddescribe-iit)

Grunt plugin for preventing you from accidentally comitting a ddescribe or iit into your project.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ddescribe-iit --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ddescribe-iit');
```

## ddescribe-iit task
_Run this task with the `grunt ddescribe-iit` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Example

```js
"ddescribe-iit": {
  files: [
    'test/**/*.js',
    '!test/ngScenario/DescribeSpec.js' // ignore this guy
  ]
}
```

You may also want to configure specific tasks with exceptions for certain statements.
For instance, in dev you may want to allow 'xit' and 'xdescribe' statements.

### Example

```js
"ddescribe-iit": {
  dist: {
    files: [
        'test/**/*.js',
        '!test/ngScenario/DescribeSpec.js' // ignore this guy
    ]
  },
  dev: {
    files: [
      'test/**/*.js',
      '!test/ngScenario/DescribeSpec.js' // ignore this guy
    ],
    options: {
      exceptions: ['xit', 'xdescribe']
    }
  }
}
```


## Running the Tests
Run `grunt test`.

## License
BSD