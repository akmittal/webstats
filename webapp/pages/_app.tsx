import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider, Grid, Box } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Drawer from "../components/Drawer";
import { css } from "@emotion/react";
import 'tailwindcss/tailwind.css'

const queryClient = new QueryClient();
const sec = css`
  @media (max-width: 480px) {
    grid-template-columns: 0 1fr;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <div className="App">
          <QueryClientProvider client={queryClient}>
            <Grid templateColumns="15% 1fr" gap={1} css={sec}>
              <Drawer />
              <Box h="100vh" className="overflow-x-auto">
                <Component {...pageProps} />
              </Box>
            </Grid>
          </QueryClientProvider>
        </div>
      </ChakraProvider>
    </React.StrictMode>
  );
}
export default MyApp;
