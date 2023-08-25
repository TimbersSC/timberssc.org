import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Official Timbers Website | Timbers SC`,
    siteUrl: `https://www.timberssc.org`,
    description:
      "Welcome to the official Timbers SC website. Explore the site, discover the latest Spurs news & matches and check out our new stadium.",
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  // "gatsby-plugin-google-gtag"
  plugins: [
    "gatsby-plugin-mantine",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/logo/timbers_sc.logo.black.png",
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
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
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Noto Sans`,
            file: `https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap`,
          },
        ],
      },
    },
  ],
};

export default config;
