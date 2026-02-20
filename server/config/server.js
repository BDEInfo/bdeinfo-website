module.exports = ({ env }) => ({
  host: env('HOST'),
  port: env.int('PORT'),
  url: env('PUBLIC_URL', 'https://strapi.bdeinfo.org'),
  app: {
      keys: env.array('APP_KEYS')
  }
});
