const { createFilePath } = require("gatsby-source-filesystem");
const path = require("path");

const PROJECTS_COLLECTION = "projects";
const EXPERIENCE_COLLECTION = "experience";
const ABOUT_COLLECTION = "about";

// Collections to slug
const SLUG_COLLECTIONS = [PROJECTS_COLLECTION];

// References: 
// - https://www.gatsbyjs.com/docs/mdx/programmatically-creating-pages/
// - https://chipcullen.com/making-multiple-content-types-in-gatsby/
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const parent = getNode(node.parent);
    const collection = parent.sourceInstanceName;

    // Create collection field
    createNodeField({
      node, // The MDX node
      name: "collection",
      value: collection,
    });

    console.log("> collection:", collection); // TODO: remove

    // Only add the slug if called for
    if (SLUG_COLLECTIONS.includes(collection)) {
      // Construct the slug
      const slugBase = createFilePath({ node, getNode });
      const slug = `${collection}${slugBase}`;

      console.log("- slug:", slug); // TODO: remove
      
      // Create slug field
      createNodeField({
        node, // The MDX node
        name: "slug",
        value: slug,
      });
    }
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Query all the project mdx files
  const result = await graphql(`
    query {
      allMdx(filter: {fields: {collection: {eq: "${PROJECTS_COLLECTION}"}}}) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Create project pages
  const posts = result.data.allMdx.edges;
  posts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      // Wrap the MDX content in the Project layout
      component: path.resolve(`./src/layouts/ProjectLayout.tsx`),
      context: { id: node.id },
    })
  });
};

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
