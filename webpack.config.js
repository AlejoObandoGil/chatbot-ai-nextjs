const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/chatbot.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'chatbot.bundle.js',
        library: 'Chatbot',
        libraryTarget: 'window'
    },
    // devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
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
            'process.env.NEXT_PUBLIC_BACKEND_URL': JSON.stringify('https://chatbot-ai-nextjs-production.up.railway.app'),
            // 'process.env.NEXT_PUBLIC_BACKEND_URL': JSON.stringify(process.env.NEXT_PUBLIC_BACKEND_URL)
        })
    ]
};
