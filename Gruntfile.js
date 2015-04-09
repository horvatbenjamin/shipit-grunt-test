var pkg = require('./package.json');

module.exports = function (grunt) {

  /**
   * Initialize config.
   */

  grunt.initConfig({
    shipit: {
      options: {
        // Project will be build in this directory.
        workspace: '/tmp/hello-world-workspace',

        // Project will be deployed in this directory.
        deployTo: '/tmp/grunt-deploy',

        // Repository url.
        repositoryUrl: pkg.repository.url,

        // This files will not be transfered.
        ignores: ['.git'],

        // Number of release to keep (for rollback).
        keepReleases: 3,
	shallowClone: true,

      npm: {
	remote: false,
	installFlags: ['--production'],
      },


      },

    // Staging environment.
      staging: {
        servers: ['mad.itk.ppke.hu']
      }
    }
  });

  /**
   * Load shipit task.
   */

  grunt.loadNpmTasks('grunt-shipit');
  grunt.loadNpmTasks('shipit-deploy');
  grunt.loadNpmTasks('shipit-npm');

   /**
   * Start project on the remote server.
   */

  grunt.registerTask('start', function () {
    var done = this.async();
    var current = grunt.config('shipit.options.deployTo') + '/current';
    grunt.shipit.remote('cd ' + current + ' && npm start',done);
  });

   /**
   * Run start task after deployment.
   */

  grunt.shipit.on('published', function () {
    grunt.task.run(['start']);
  });

    /**
    * Stop currently running process
    */

  grunt.registerTask('stop', function () {
    var done = this.async();
    var current = grunt.config('shipit.options.deployTo') + '/current';
    grunt.shipit.remote('cd ' + current + ' && node_modules/pm2/bin/pm2 stop \\$(cat ./REVISION)',done);
    grunt.shipit.remote('cd ' + current + ' && node_modules/pm2/bin/pm2 delete \\$(cat ./REVISION)',done);
  });
  grunt.shipit.on('updated', function() {
    grunt.task.run(['stop']);
  });

};