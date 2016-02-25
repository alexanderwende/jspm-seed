
module.exports = {
    options: {
        minify: true,
        mangle: true,
        sourceMaps: true,
        lowResSourceMaps: true,
        globalDefs: { DEBUG: false }
    },
    bundles: [
        {
            src: ['libs'],
            dest: 'libs',
            options: {
                sourceMaps: false
            }
        },
        {
            src: ['app'],
            dest: 'app',
            exclude: ['libs']
        }
    ]
};
