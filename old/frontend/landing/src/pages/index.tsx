import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Box } from "@mantine/core";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          maxHeight: "750px",
        }}
      >
        <Box
          sx={{
            maxWidth: "100vw",
            overflowX: "hidden",
            maxHeight: "750px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflowY: "hidden",
          }}
        >
          <StaticImage
            alt="Stock photo"
            src="../images/gallery/pexels-stanley-morales-3148452.jpg"
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // mixBlendMode: "difference",
          }}
        >
          MIDDLE
        </Box>
      </Box>
    </Box>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <title>Official Timbers Website | Timbers SC</title>
);
