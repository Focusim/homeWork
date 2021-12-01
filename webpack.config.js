const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function(env, argv) {
    const mode = (argv.mode === 'production');

    return {
        mode: argv.mode,
        devtool: mode ? '' : 'inline-source-map',
        entry: {
            //main: path.resolve(__dirname, './src/index.js'),
            'template': [
                './src/index.js',
                './src/styles/main.scss'
            ],
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: './js/[name].js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'webpack Boilerplate',
                template: path.resolve(__dirname, './src/template.php'), // шаблон
                filename: 'template.php', // название выходного файла
            }),
        ],
        module: {
            rules: [
                // JavaScript
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                // изображения
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: 'asset/resource',
                },
                // шрифты и SVG
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: 'asset/inline',
                },
                // CSS, PostCSS, Sass
                {
                    test: /\.(scss|css)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
            ],
        }
    }
}

