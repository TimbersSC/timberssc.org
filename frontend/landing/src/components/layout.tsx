import React from "react";

import { MantineProvider, AppShell, Box } from "@mantine/core";

import "../styles/app.scss";

import { NavigationComponent } from "./nav";
import { FooterComponent } from "./footer";

export default function Layout({ children }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        // Override any other properties from default theme
        fontFamily: "Noto Sans, sans serif",
        // spacing: { xs: '1rem', sm: '1.2rem', md: '1.8rem', lg: '2.2rem', xl: '2.8rem' },
        defaultGradient: { from: "#315235", to: "#cb9c66", deg: 20 },
        colors: {
          gold: ["#cb9c66"],
          evergreen: ["#315235"],
        },
      }}
    >
      <AppShell
        fixed={false}
        // padding="md"
        header={<NavigationComponent />}
        footer={<FooterComponent />}
        padding={"none"}
      >
        <Box>{children}</Box>
      </AppShell>
    </MantineProvider>
  );
}
