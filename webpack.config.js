module.exports = {
    // ...existing configuration...
    module: {
      rules: [
        // ...existing rules...
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'), // Use Dart Sass
              },
            },
          ],
        },
        // ...existing rules...
      ],
    },
    // ...existing configuration...
  };