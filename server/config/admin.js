module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    sessions: {
      maxRefreshTokenLifespan: env.int('ADMIN_MAX_REFRESH_TOKEN_LIFESPAN', 30 * 24 * 60 * 60),
      maxSessionLifespan: env.int('ADMIN_MAX_SESSION_LIFESPAN', 7 * 24 * 60 * 60),
    }
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
});
