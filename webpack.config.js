// filepath: /c:/Users/guxeg/techforge/webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    filename: 'bundle.[contenthash].js', // Output bundle file with content hash for caching
    path: path.resolve(__dirname, 'dist'), // Output directory
    publicPath: '/', // Public URL of the output directory when referenced in a browser
  },
  mode: 'development', // Set the mode to development or production
  devtool: 'inline-source-map', // Enable source maps for easier debugging
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Serve content from the dist directory
    compress: true, // Enable gzip compression
    port: 9000, // Port to run the development server
    historyApiFallback: true, // Enable support for HTML5 history API
    open: true, // Open the browser after server had been started
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel loader for transpiling JavaScript
        },
      },
      {
        test: /\.scss$/, // Apply this rule to .scss files
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files
          'css-loader', // Translates CSS into CommonJS
          'postcss-loader', // Process CSS with PostCSS
          {
            loader: 'sass-loader', // Compiles Sass to CSS
            options: {
              implementation: require('sass'), // Use Dart Sass
              sassOptions: {
                silenceDeprecations: ['legacy-js-api'],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Apply this rule to image files
        type: 'asset/resource', // Use asset/resource module type for images
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Apply this rule to font files
        type: 'asset/resource', // Use asset/resource module type for fonts
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the output directory before each build
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use a template HTML file
      filename: 'index.html', // Output filename
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // Output CSS file with content hash for caching
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
  },
};