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
});
