const path = require('path');

module.exports = {
  siteMetadata: {
    title: `Alexander Greff`,
    description: `Alexander Greff is a software/web developer from Toronto, Canada currently completing his HBsc in computer science at the University of Toronto: Scarborough`,
    siteUrl: "https://alexgreff.com"
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    `gatsby-plugin-sharp`,
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alexander Greff`,
        short_name: `Alexander Greff is a software/web developer from Toronto, Canada currently completing his HBsc in computer science at the University of Toronto: Scarborough`,
        start_url: `/`,
        background_color: `#232323`,
        theme_color: `#00C2FF`,
        display: `standalone`,
        icon: 'src/images/favicon.png'
      },
    },
    'gatsby-plugin-offline',
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
        data: `@import "./src/styles/global.scss";`,
        webpackImporter: false,
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
