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

  "preview-button": {
    config: {
      contentTypes: [
        {
          uid: "api::article.article",
          draft: {
            url: "http://localhost:3000/api/preview",
            query: {
              type: "post",
              slug: "{slug}",
            },
            published: {
              url: "http://localhost:3000/{lang}/blog/{cat}/{slug}",
            },
          },
        },
      ],
    },
  },
});
