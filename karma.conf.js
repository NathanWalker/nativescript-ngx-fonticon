module.exports = function (config) {
  var _config = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/zone.js/dist/zone-microtask.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/es6-module-loader/dist/es6-module-loader.js',
      'node_modules/traceur/bin/traceur-runtime.js', // Required by PhantomJS2, otherwise it shouts ReferenceError: Can't find variable: require
      'node_modules/traceur/bin/traceur.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/reflect-metadata/Reflect.js',
      
      { pattern: 'node_modules/angular2/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/tns-core-modules/**/*.js', included: false, watched: false },
      { pattern: 'src/app/**/*.js', included: false, watched: true },
      { pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false }, // PhantomJS2 (and possibly others) might require it
      
      'test-main.js'
    ],

    // list of files to exclude
    exclude: [
      'node_modules/angular2/**/*spec.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/(*spec).ts': ['typescript'],
      'src/**/!(*spec).js': ['coverage']
    },
    
    typescriptPreprocessor: {
      // options passed to the typescript compiler
      options: {
        sourceMap: false, // (optional) Generates corresponding .map file.
        target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
        module: 'commonjs', // (optional) Specify module code generation: 'commonjs' or 'amd'
        noResolve: true, // (optional) Skip resolution and preprocessing.
        removeComments: true, // (optional) Do not emit comments to output.
        concatenateOutput: false // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false.
      },
      // extra typing definitions to pass to the compiler (globs allowed)
      typings: [
        'typings/browser.d.ts',
        'node_modules/tns-core-modules/tns-core-modules.d.ts'
      ],
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.ts$/, '.js');
      }
    },

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json', subdir: '.', file: 'coverage-final.json' },
        { type: 'html' }
      ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'], // you can also use Chrome

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  };

  config.set(_config);

};
