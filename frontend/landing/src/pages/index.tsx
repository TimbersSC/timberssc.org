import * as React from 'react'

import type { HeadFC, PageProps } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import { Box, Overlay, useMantineTheme } from '@mantine/core'

const IndexPage: React.FC<PageProps> = () => {
  const theme = useMantineTheme()

  return (
    <Box
      sx={{
        paddingBottom: '63px',
        marginBottom: '3em',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          maxHeight: '750px',
        }}
      >
        <Box
          sx={{
            maxWidth: '100vw',
            overflowX: 'hidden',
            maxHeight: '750px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflowY: 'hidden',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <StaticImage
            alt="Stock photo"
            src="../images/gallery/pexels-stanley-morales-3148452.jpg"
          />
          <Overlay
            gradient="linear-gradient(145deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 100%)"
            opacity={0.85}
          />
        </Box>

        {/* Featured news */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            // mixBlendMode: "difference",
            color: 'white',
            zIndex: 2,
            maxWidth: '812px',
            width: '100%',
            textAlign: 'right',
          }}
        >
          MIDDLE
        </Box>

        {/* Other news, 3 more? */}
        <Box
          sx={{
            position: 'absolute',
            maxWidth: '812px',
            width: '100%',
            height: '126px',
            background: 'white',
            top: '100%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            boxShadow: theme.shadows.lg,
            border: `1px solid ${theme.colors.gold[0]}`,
            borderRadius: '0.25em',
          }}
        ></Box>
      </Box>
    </Box>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <title>Official Timbers Website | Timbers SC</title>
)
