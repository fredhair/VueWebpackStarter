const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: {
        inline: true,
        hot: true,
        stats: 'minimal',
        contentBase: __dirname,
        overlay: true
    },
    // This is where all the loaders config goes:
    module: {
        rules: [
            // Transpile JS
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // Load Vue Components
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // Loading SCSS
            {
                // Check for .sass, .css, .scss files
                test: /\.(sa|sc|c)ss$/,
                // loaders are chained here
                // loaders are applied from last to first within use array
                // e.g. sass-loader then postcss-loader then css-loader
                use: [
                    {
                        //After all css has been transformed we bundle it all
                        //into a single file
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        //resolves url() and @imports within css
                        loader: 'css-loader'
                    },
                    {
                        //apply auto fixes and minification
                        //config file postcss.config.js
                        loader: 'postcss-loader'
                    },
                    {
                        //transform sass to css
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            },
            //Load files
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        //Image loader
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images'
                        }
                    }
                ]
            },
            {
                // Apply rule for fonts files
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        // Using file-loader too
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
        new VueLoaderPlugin()
    ]
}

