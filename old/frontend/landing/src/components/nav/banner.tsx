import React from "react";

import { Box } from "@mantine/core";

export const BannerComponent = (props: any): JSX.Element => {
  return (
    <Box
      sx={(theme) => ({
        backgroundImage: theme.fn.gradient(), // backgroundColor: theme.colors.dark[6],
        textAlign: "center",
        padding: theme.spacing.sm,
        color: theme.white,
      })}
    >
      🎉 BANNER
    </Box>
  );
};
