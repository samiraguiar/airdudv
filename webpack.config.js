var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
    entry: {
        app: './app/app.js',
        vendor: ['angular', 'angular-css', 'jquery', 'bootstrap', '@uirouter/angularjs', 'admin-lte'],
    },
    output : {
        path     : __dirname,
        filename : 'app.dist.js'
    },
    module : {
        loaders: [{
                test   : /.js$/,
                loader : 'babel-loader'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    devServer: {
        historyApiFallback: {
            index: 'index.html'
        }
    }
};