/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';

import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import { Box, Grid } from '@chakra-ui/react';
import Drawer from './components/Drawer';
import Routes from './Routes';

const queryClient = new QueryClient();
const sec = css`
@media(max-width:480px){
  grid-template-columns: 0 1fr;
}
`;

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Grid templateColumns="15% 1fr" gap={1} css={sec}>
            <Drawer />
            <Box h="100vh" className="overflow-x-auto">
              <Routes />
            </Box>
          </Grid>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
