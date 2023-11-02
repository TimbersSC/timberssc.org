/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/static",
  publicPath: "/static/",
  serverBuildDirectory: "server/build",
  devServerPort: 8002,
  serverDependenciesToBundle: [
    /^rehype.*/,
    /^remark.*/,
    /^unified.*/,
    /^unist.*/,
    /^hast.*/,
    /^bail.*/,
    /^trough.*/,
    /^mdast.*/,
    /^micromark.*/,
    /^decode.*/,
    /^character.*/,
    /^property.*/,
    /^space.*/,
    /^comma.*/,
    /^marked$/,
    /^vfile.*/,
    /^react-markdown.*/,
  ],
};
