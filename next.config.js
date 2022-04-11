module.exports = {
  reactStrictMode: true,

  images: {
    domains: ["github.com"],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    });
    return config;
  },
};
