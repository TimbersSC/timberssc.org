import React from "react";

import { useMantineTheme, Footer } from "@mantine/core";

function addInset(s: string): string {
  let n = s.split("),").map((o) => `inset ${o}`);
  return n.join("),");
}

export const FooterComponent = (props: any): JSX.Element => {
  const theme = useMantineTheme();

  return (
    <Footer
      height={{ base: 60 }}
      p="xs"
      sx={{
        boxShadow: addInset(theme.shadows.sm),
      }}
    >
      Footer
    </Footer>
  );
};
