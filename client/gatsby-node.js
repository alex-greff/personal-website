const { createFilePath } = require("gatsby-source-filesystem");
const path = require("path");

const PROJECTS_COLLECTION = "projects";

// References: 
// - https://www.gatsbyjs.com/docs/mdx/programmatically-creating-pages/
// - https://chipcullen.com/making-multiple-content-types-in-gatsby/
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const slugBase = createFilePath({ node, getNode });

    const parent = getNode(node.parent);
    const collection = parent.sourceInstanceName;

    // Construct the slug
    const slug = `${collection}${slugBase}`;
    
    // Create slug field
    createNodeField({
      node, // The MDX node
      name: "slug",
      value: slug,
    });

    // Create collection field
    createNodeField({
      node, // The MDX node
      name: "collection",
      value: collection,
    });
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
      component: path.resolve(`./src/layouts/Project.tsx`),
      context: { id: node.id },
    })
  });
};