// webpack.config.js
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {

    entry: {
        app: [
            'webpack-hot-middleware/client',
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            './src/index.js',
        ],
        vendor: [
            'react',
            'react-dom',
        ]
    },

    output: {
        // Dumps the build into /dist
        path: resolve(__dirname, 'dist/'),
        filename: '[name].js',
        publicPath: '/',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'client',
            'node_modules',
        ],
    },

    module: {



        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
              },
            {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,

            loader: "babel-loader",

            // query: {
            //     presets: ['@babel/preset-env']
            // }
        },
        {
            test: /\.html$/,
            use: [
                {
                    loader: "html-loader"
                }
            ]
        }

        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
    ]
};