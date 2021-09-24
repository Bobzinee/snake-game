const path = require('path'); 
module.exports = { 
    mode: 'development', 
    entry: './src/main.ts', 
    devtool: 'inline-source-map', 
    devServer: { 
        static: './' 
      }, 
    module: { 
        rules: [ 
            { 
                test: /\.ts$/, 
                use: 'ts-loader', 
                include: [path.resolve(__dirname, 'src')] 
            }, 
            { 
                test: /\.(scss|css)$/, 
                use: ['style-loader', 'css-loader', 'sass-loader'], 
              }, 
        ], 
    }, 
    resolve: { 
        extensions: ['.ts', '.js'] 
    }, 
    output: { 
        filename: 'bundle.js', 
        path: path.resolve(__dirname, 'dist') 
    }, 
};