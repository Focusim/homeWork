const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    //context: path.resolve(__dirname, 'src'), указывает стартовый путь
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.less$/,
                use: [
                {
                   loader: MiniCssExtractPlugin.loader,
                   options: {},
                },
            'css-loader',
            'less-loader'
            ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                {
                   loader: MiniCssExtractPlugin.loader,
                   options: {},
                },
            'css-loader',
            'sass-loader'
            ]
            },
        ]
    }
}