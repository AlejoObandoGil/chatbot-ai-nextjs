const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/bundle/chatbot.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'chatbot.bundle.js',
        library: 'Chatbot',
        libraryTarget: 'window'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        configFile: path.resolve(__dirname, './src/bundle/babel.config.js')
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.ts', '.jsx', '.js', '.css']
    },
    plugins: [
        new Dotenv(),
        new webpack.DefinePlugin({
            'process.env.NEXT_PUBLIC_BACKEND_URL': JSON.stringify('https://chatbot-ai-api-production.up.railway.app'),
            // 'process.env.NEXT_PUBLIC_BACKEND_URL': JSON.stringify('http://localhost:8007')
        })
    ]
};
