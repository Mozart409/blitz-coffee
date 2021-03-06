const { sessionMiddleware, simpleRolesIsAuthorized } = require("blitz")

const withPlugins = require("next-compose-plugins")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
const { StatsWriterPlugin } = require("webpack-stats-plugin")
const { RelativeCiAgentWebpackPlugin } = require("@relative-ci/agent")

module.exports = withPlugins([
  [withBundleAnalyzer],
  {
    middleware: [
      sessionMiddleware({
        isAuthorized: simpleRolesIsAuthorized,
      }),
    ],

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      // Important: return the modified config

      if (!dev && !isServer) {
        config.plugins.push(
          new RelativeCiAgentWebpackPlugin({
            stats: { excludeAssets: [/stats.json/] },
          })
        )
      }

      config.resolve.alias = {
        ...config.resolve.alias,
        "react-dom$": "react-dom/profiling",
        "scheduler/tracing": "scheduler/tracing-profiling",
      }

      config.plugins.push(
        new StatsWriterPlugin({
          filename: "stats.json",
          stats: {
            context: "./", // optional, will improve readability of the paths
            assets: true,
            entrypoints: true,
            chunks: true,
            modules: true,
          },
        })
      )

      return config
    },
  },
])
