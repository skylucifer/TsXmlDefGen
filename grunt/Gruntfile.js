
module.exports = function (grunt) {

    var package = require('./package.json');

    grunt.initConfig({
        typescript: {
            main: {
                src: ["../src/Main.ts"],
                dest: "../build/XMLDefGen.js"
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    
    grunt.registerTask('ts', ['typescript']);
}