module.exports = ({ env }) => ({
  seo: {
    enabled: true,
  },
  menus: {
    config: {
      layouts: {
        menuItem: {
          "column heading": [
            {
              input: {
                label: "Title",
                name: "title",
                type: "text",
                required: true,
              },
            },
          ],
        },
      },
    },
  },
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "bart.sakowski@strapi.io",
        defaultReplyTo: "bart.sakowski@strapi.io",
      },
    },
  },
});
