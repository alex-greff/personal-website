const path = require('path');

module.exports = {
  siteMetadata: {
    title: `Alexander Greff`,
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    `gatsby-plugin-sharp`,
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        plugins: [`gatsby-remark-images`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('sass'),
        data: `@import "${__dirname}/src/styles/global.scss";`,
      }
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        "@": path.join(__dirname, 'src')
      }
    },
    // Load base layout
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/BaseLayout.tsx`),
      },
    },
    // Files
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "projects",
        path: "./content/projects"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "experience",
        path: "./content/experience"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "about",
        path: "./content/about.mdx"
      }
    },
  ],
};
