const path = require('path');
const webpack = require('webpack');
const os = require('os')
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Settings
 */

let localhostUrl = 'localhost'
if (process.argv.some(arg => arg === '0.0.0.0')) { // localhost over wifi
  Object.values(os.networkInterfaces()).forEach(interface => {
    const ip = interface.find(eth => /^192/.test(eth.address));
    if (ip) {
      localhostUrl = ip.address;
    }
  })
}

let ariadneApiPath;
let ariadnePublicPath;
let ariadneAssetPath = '/static/assets';

module.exports = env => {
  config = {
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: '[name].[fullhash].js',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              'css': 'vue-style-loader!css-loader',
            },
            reactivityTransform: true,
          }
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
            experimentalWatchApi: true,
          }
        },
        {
          test: /\.(png|jpg|gif|svg|ttf|woff|woff2|eot)$/,
          type: 'asset/resource',
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: env.development ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_DEVTOOLS__: false,
        'process.env.ARGV': JSON.stringify(argvStr),
        'process.env.apiUrl': JSON.stringify(ariadneApiPath),
        'process.env.ARIADNE_PUBLIC_PATH': JSON.stringify(ariadnePublicPath),
        'process.env.ARIADNE_ASSET_PATH': JSON.stringify(ariadneAssetPath),
      }),

      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),

      new MiniCssExtractPlugin({
        filename: "style.[fullhash].css"
      }),

      new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
        minify: !env.development ? {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true
        } : false
      }),

      // Copy static content from static folder to dist
      new CopyWebpackPlugin({
        patterns: [
            { from: 'static', to: 'static' },
        ]
      }),

      require('@vue-macros/reactivity-transform/webpack')()
    ],
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'vue$': 'vue/dist/vue.esm-browser' + (env.production ? '.prod' : '') + '.js'
      }
    },
    performance: {
      hints: false
    },
    target: 'web'
  }


  console.log('ENV: ', env);
  /**
   * Development config
   */
  if (env.development) {
    console.log('ARIADNE Portal - Building with development config...');

    process.env.NODE_ENV = 'development';

    ariadneApiPath = `http://${ localhostUrl }:8080/api`;

    config.mode = 'development';
    config.devtool = 'source-map';

    config.devServer = {
      static: [path.join(__dirname, 'dist'), path.join(__dirname, 'static')],
      client: {
        overlay: false
      },
      historyApiFallback: true,
      host: 'localhost',
      port: 8081 // SND - If you need to run on port 80 you must run as root - (sudo npm run dev)
    };
  }

  /**
   * Public STAGING config
   */
  else if (env.staging) {
    console.log('ARIADNE Portal - Building with public STAGING config...');

    process.env.NODE_ENV = 'staging';
    // Use HOSTNAME environment variable for staging host, fallback to 'localhost' if not set
    ariadneApiPath = `http://${process.env.HOSTNAME || 'localhost'}/data-catalogue-api/api`;

    // SND - DEMO environment only
    //config.output.publicPath = '/ariadneplus/html/';
    //ariadneApiPath = 'https://demo.snd.gu.se/ariadneplus/html/api';
    //ariadneAssetPath = '/ariadneplus/html/static/assets';

    // ads24staging0
    config.output.publicPath = '/data-catalogue/';
    ariadneAssetPath = '/data-catalogue/static/assets';

    config.mode = 'development';
    config.devtool = false;
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({}),
        new CssMinimizerPlugin(),
      ],
    };
  }

  /**
   * Public DEV config
   */
  else if (env.dev) {
    console.log('ARIADNE Portal - Building with public DEV config...');

    process.env.NODE_ENV = 'staging';
    ariadneApiPath = 'https://ariadne-portal-dev.d4science.org/api';

    config.mode = 'development';
    config.devtool = false;
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({}),
        new CssMinimizerPlugin(),
      ],
    };
  }

  /**
   * Public LOCAL config
   */
  else if (env.local) {
    console.log('ARIADNE Portal - Building with public LOCAL config...');

    process.env.NODE_ENV = 'staging';
    ariadneApiPath = 'http://localhost:8080/api';

    config.mode = 'development';
    config.devtool = false;
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({}),
        new CssMinimizerPlugin(),
      ],
    };
  }

  /**
   * Public PRODUCTION config
   */
  else if (env.production) {
    console.log('ARIADNE Portal - Building with public PROD config...');

    process.env.NODE_ENV = 'production';

    ariadneApiPath = 'https://portal.ariadne-infrastructure.eu/api';

    config.mode = 'production';
    config.devtool = false;
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({}),
        new CssMinimizerPlugin(),
      ],
    };
  }

  ariadneAssetPath = env.ariadneAssetPath ? env.ariadneAssetPath : ariadneAssetPath;
  ariadnePublicPath = config.output.publicPath;

  console.log('Building with public path: ' + ariadnePublicPath);
  console.log('Building with asset path: ' + ariadneAssetPath);
  console.log('Building with API path: ' + ariadneApiPath);

  const argvStr = process.argv.includes('--no-purge') ? '--no-purge' : '';

  // InjectPlugin block removed in favor of DefinePlugin for modern, maintainable config injection.
  // All variables are now available as process.env.* in client code via DefinePlugin.

  return config;
}
