const webpackConfig = require(`./webpack.config.js`);

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
            ]
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

    grunt.loadNpmTasks(`grunt-contrib-clean`);
});