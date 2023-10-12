import React from 'react';

import { useMantineTheme, Breadcrumbs, Anchor } from '@mantine/core';
import { useLocation } from '@reach/router';

export const BreadcrumbsComponent = (): JSX.Element => {
  const theme = useMantineTheme();
  // const location = useLocation();

  // const items = React.useMemo(
  //   () => location.pathname.split("/").filter((s) => s.length > 0),
  //   [location.pathname]
  // );

  // const anchors = React.useMemo(() => {
  //   return items.map((item, index) => (
  //     <Anchor
  //       href={items.splice(0, index).join("/")}
  //       key={index}
  //       color={index !== items.length - 1 ? "gray.6" : theme.colors.gold[0]}
  //       sx={{
  //         fontWeight: index !== items.length - 1 ? "normal" : "bold",
  //         ":hover": {
  //           textDecoration: "none",
  //         },
  //       }}
  //     >
  //       {item}
  //     </Anchor>
  //   ));
  // }, [items]);

  return (
    <>
      <Breadcrumbs
        sx={{
          fontSize: '0.875em',
          color: theme.colors.gold[0],
        }}
      >
        Official Timbers Website | Timbers SC
        {/* {anchors.length > 0 && anchors}
        {anchors.length === 0 && "Official Timbers Website | Timbers SC"} */}
      </Breadcrumbs>
    </>
  );
};
