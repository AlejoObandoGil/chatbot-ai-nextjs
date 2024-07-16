const path = require('path')
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/chatbot.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'chatbot.bundle.js',
        library: 'Chatbot',
        libraryTarget: 'window',
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: [".ts", ".jsx", ".js", ".css"],
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NEXT_PUBLIC_BACKEND_URL': JSON.stringify('http://localhost:8007'),
        }),
    ],
}
