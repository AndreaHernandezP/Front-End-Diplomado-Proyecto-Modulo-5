const path = require('path'); 
const WorkBox = require('workbox-webpack-plugin');

module.exports = { 
    entry: './src/index.js', 
    output: {
        filename: 'bundle.js', 
        path: path.resolve(__dirname,'dist'), 
    },
    module: {
        rules:[
            {
                test: /\.css$/i,    
                use: ['style-loader', 'css-loader'], 
            },
            {
                test: /\.(png|JPG)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader:'svg-url-loader',
                    }
                ],
            },
            {
                test: /\.?js$/,
                exclude: /node_modules/, //No toque esta carpeta
                use:{
                    loader: "babel-loader", //También se puede poner en corchetes
                    options:{
                        presets:['@babel/preset-env','@babel/preset-react']
                    }
                }
            },
            {
                test: /\.?js$/,
                exclude: /node_modules/, //No toque esta carpeta
                use:{
                    loader: "babel-loader", //También se puede poner en corchetes
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
        ],
    },
    plugins: [
        new WorkBox.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ]
};