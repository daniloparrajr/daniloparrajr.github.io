const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'app'),
    entry: path.resolve(__dirname, '_assets/js/index.js'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'assets/js')
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            use: 'babel-loader'
        }, ]
    },
};