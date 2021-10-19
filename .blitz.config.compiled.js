// blitz.config.js
var {sessionMiddleware, simpleRolesIsAuthorized} = require("blitz");
var withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});
module.exports = {
  middleware: [
    sessionMiddleware({
      isAuthorized: simpleRolesIsAuthorized
    })
  ]
};
