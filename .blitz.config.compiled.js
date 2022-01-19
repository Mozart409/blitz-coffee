// blitz.config.js
var {sessionMiddleware, simpleRolesIsAuthorized} = require("blitz");
var withPlugins = require("next-compose-plugins");
var withTM = require("next-transpile-modules")(["frappe-charts"]);
var withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});
var {StatsWriterPlugin} = require("webpack-stats-plugin");
var {RelativeCiAgentWebpackPlugin} = require("@relative-ci/agent");
module.exports = withPlugins([
  [withTM],
  [withBundleAnalyzer],
  {
    middleware: [
      sessionMiddleware({
        isAuthorized: simpleRolesIsAuthorized
      })
    ],
    webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
      if (!dev && !isServer) {
        config.plugins.push(new RelativeCiAgentWebpackPlugin({
          stats: {excludeAssets: [/stats.json/]}
        }));
      }
      config.resolve.alias = {
        ...config.resolve.alias,
        "react-dom$": "react-dom/profiling",
        "scheduler/tracing": "scheduler/tracing-profiling"
      };
      config.plugins.push(new StatsWriterPlugin({
        filename: "stats.json",
        stats: {
          context: "./",
          assets: true,
          entrypoints: true,
          chunks: true,
          modules: true
        }
      }));
      return config;
    }
  }
]);
