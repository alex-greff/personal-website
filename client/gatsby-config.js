const path = require('path');

module.exports = {
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
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
    }
  ],
};
