(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app',
    'symbol-observable':          'js/lib/symbol-observable',
    'rxjs':                       'js/lib/rxjs',
    'angular2-in-memory-web-api': 'js/lib/angular2-in-memory-web-api',
    '@angular':                   'js/lib/@angular',
    'moment':                     'js/lib/moment.min.js',
    'angular2-jwt':				  'js/lib/angular2-jwt',
    'dragula':					  'js/lib/dragula',
    'ng2-dragula':				  'js/lib/ng2-dragula',
    'crossvent':				  'js/lib/crossvent/dist/crossvent.min.js',
    'contra':			 		  'js/lib/contra',
    'ticky': 					  'js/lib/ticky/ticky-browser.js',
    'atoa': 					  'js/lib/atoa/atoa.js',
    'ng2-bs3-modal': 			  'js/lib/ng2-bs3-modal',
    'ng2-dnd':					  'js/lib/ng2-dnd',
    'ng2-tooltip':				  'js/lib/ng2-tooltip',
    'ng2-translate':			  'js/lib/ng2-translate'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'symbol-observable':          { main: 'index.js', defaultExtension: 'js'},
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'angular2-jwt':				  { main: 'angular2-jwt.js', defaultExtension: 'js' },
    'ng2-dragula':				  { main: 'ng2-dragula.js', defaultExtension: 'js' },
    'dragula':				  	  { main: 'dragula.js', defaultExtension: 'js' },
    'contra': 			  		  { main: 'contra.js', defaultExtension: 'js' },
    'ng2-bs3-modal': 			  { main: 'ng2-bs3-modal.js', defaultExtension: 'js' },
    'ng2-dnd': 			 		  { main: 'ng2-dnd.js', defaultExtension: 'js' },
    'ng2-tooltip':				  { main: 'index.js', defaultExtension: 'js' },
    'ng2-translate':			  { main: 'ng2-translate.js', defaultExtension: 'js' }
  };
  
  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/testing',
    '@angular/upgrade',
    '@angular/router-deprecated'
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  };

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);
