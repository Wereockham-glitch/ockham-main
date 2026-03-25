const shouldAnalyzeBundles = process.env.ANALYZE === true;

const nextConfig = {
  reactStrictMode: false,
   images: {
       domains: ["ockham.cloud"],
   },
   webpack(config, { isServer }) {
    // audio support
    config.module.rules.push({
      test: /\.(ogg|mp3|mp4|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
      
    })

   
    return config
  }

}


module.exports = nextConfig
