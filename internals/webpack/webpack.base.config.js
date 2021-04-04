const path = require('path')
const webpack = require('webpack')

module.exports = options => ({
  mode: options.mode,
  plugins: options.plugins,
  //entry: path.resolve(__dirname, 'app', 'app.js'),
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
    },
    options.output,
  ),
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: [/node_modules/, /googlecloud/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults" 
              }],
              '@babel/preset-react'
            ],
            "plugins": [
                [
                  "@babel/plugin-proposal-class-properties"
                ]
            ]
          }
        }]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader" 
        }, {
          loader: "sass-loader"
        }]
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      /*{
        test: /\.html$/,
        use: 'html-loader',
      },*/
    ]
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ]),
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  devtool: options.devtool,
  target: 'web',
  devServer: options.devServer
})