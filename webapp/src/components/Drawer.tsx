/** @jsx jsx */
import { Box } from '@chakra-ui/react';
import { css, jsx } from '@emotion/react';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const links = [
  { path: '/', label: 'Home' },
  { path: '/compression', label: 'Compression' },
  { path: '/protocol', label: 'Protocol' },
  { path: '/ip_version', label: 'IP Version' },
  { path: '/ssg', label: 'Generator' },
  { path: '/images', label: 'Compression' },
];

const drawer = css`
z-index:99;
  position: relative;
  min-width:200px;
  transition: 0.3s transform;
  will-change: transform;   
  @media (max-width: 480px) {
    width:0px !important;
    transform: translateX(-100%);
   
  }
`;
const hamburger = css`
  background-color: #3182ce;
  right: -40px;
  width: 40px;
  transition: 0.2s display;
  @media (max-width: 480px) {
    display: block;
  }
`;

const logo = css`
width: 100%;
display:flex;
justify-content:center;
&>img{
  width: 200px;
  filter: brightness(0.5);
}
`;
export default function Drawer({}: Props): ReactElement {
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <Box h="100vh" bg="blue.500" css={drawer} className={`${showDrawer &&  'show-drawer'}`}>
      <button onClick={() => setShowDrawer(!showDrawer)}
        className={`hamburger p-2 text-white  absolute flex items-center content-center justify-center hidden`}
        css={hamburger}
      >
        ☰
      </button>
      <div css={logo}><img src="logo_transparent.png"></img></div>
      <nav className="flex">
        <ul className="flex flex-col text-white w-full m-2">
          {links.map(link => (
            <li className="p-2 uppercase text-lg hover:to-blue-700 w-full">
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </Box>
  );
}
