module.exports = (grunt => {
    grunt.initConfig({
        pkg: grunt.file.readJSON(`package.json`),
        watch: {
            scripts: {
                files: [`**/*.js`, `!**/node-modules/**`, `**/*.css`, `**/*.html`],
                tasks: [`build-dev`],
                options: { spawn: false }
            }
        },
        concurrent: {
            dev: [
                `nodemon:dev`,
                `watch:scripts`
            ],
            options: { logConcurrentOutput: true }
        },
        nodemon: {
            dev: {
                script: `index.js`,
                options: {
                    args: [`dev`],
                    nodeArgs: [`--inspect`]
                }
            }
        },
        clean: {
            logs: [`logs/`]
        }
    });

    grunt.registerTask(`build-dev`, [`clean:logs`]);
    grunt.registerTask(`build-dist`, [`clean:logs`]);
    grunt.registerTask(`dev`, [`concurrent:dev`]);

    grunt.loadNpmTasks(`grunt-contrib-clean`);
    grunt.loadNpmTasks(`grunt-contrib-watch`);
    grunt.loadNpmTasks(`grunt-contrib-nodemon`);
    grunt.loadNpmTasks(`grunt-concurrent`);
});
