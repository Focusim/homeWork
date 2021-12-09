const fs = require("fs");
const path = require('path');
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

function generateHtmlPlugins(templateDir) {

  let result = [];

  helper(templateDir);

  function helper(templateDir, nameFolder = '') {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    templateFiles.map(item => {
      const parts = item.split(".");
      const name = parts[0];
      if (parts[1]) {
        const extension = parts[1];
        result.push(new HtmlWebpackPlugin({
          filename: `${nameFolder}${name}.html`,
          template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
          alwaysWriteToDisk: true,
          minify: false,
          inject: false
        }));
      } else {
        helper(`${templateDir}/${name}`, `${nameFolder}${name}/`);
      }
    });
  }

  return result;
}

const htmlPlugins = generateHtmlPlugins("./src/");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true
  },
  entry: ['./src/js/index.js', './src/scss/style.scss'],
  devtool: "source-map",
  mode: "production",
  cache: false,
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: './js/bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: './src/img',
    //     to: './img',
    //   }, ],
    // }),
    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: './src/fonts',
    //     to: './fonts',
    //   }, ],
    // }),
    new MiniCssExtractPlugin({
      filename: './css/main.css',
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', {
            interlaced: true
          }],
          ['jpegtran', {
            progressive: true
          }],
          ['optipng', {
            optimizationLevel: 5
          }],
          [
            'svgo',
            {
              plugins: [{
                removeViewBox: false,
              }, ],
            },
          ],
        ],
      },
    }),
  ].concat(htmlPlugins),
  module: {
    rules: [{
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            context: '/img',
            publicPath: (url, resourcePath, context) => {
              return `${context}/${url}`;
            },
            outputPath: (url, resourcePath, context) => {
              return `${context}/${url}`;
            },
          },
        }, ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            context: '/fonts',
            publicPath: (url, resourcePath, context) => {
              return `${context}/${url}`;
            },
            outputPath: (url, resourcePath, context) => {
              return `${context}/${url}`;
            },
          },
        }, ],
      },
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "targets": {
                    "ie": "11"
                  }
                }
              ]
            ]
          }
        }
      },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // importLoaders: 1,
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
        ],
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, "src/html/includes"),
        use: ["raw-loader"]
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin()
    ]
  },
};
