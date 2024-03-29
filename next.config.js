const withSass = require('@zeit/next-sass');

module.exports = withSass({
  distDir: '../../.next',
  publicRuntimeConfig: {
    staticFolder: '/src/client/static',
  },
  sassLoaderOptions: {}
});
