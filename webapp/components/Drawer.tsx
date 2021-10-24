import { Box } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import React, { ReactElement, useState } from "react";
import Link from "next/link";
import styles from "../styles/drawer.module.css";
import Image from "next/image";

const links = [
  { path: "/", label: "Home" },
  { path: "/compression", label: "Compression" },
  { path: "/protocol", label: "Protocol" },
  { path: "/ip_version", label: "IP Version" },
  { path: "/ssg", label: "Generator" },
  { path: "/images", label: "Compression" },
];

export default function Drawer(): ReactElement {
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <Box
      display="flex"
      flexDirection="column"
      h="100vh"
      justifyContent="space-between"
      bg="blue.500"
      className={`${styles.drawer} ${showDrawer && "show-drawer"}`}
    >
      <div>
        <button
          onClick={() => setShowDrawer(!showDrawer)}
          className={`${styles.hamburger} hamburger p-2 text-white  absolute flex items-center content-center justify-center hidden`}
        >
          ☰
        </button>
        <div className={styles.logo}>
          <Image
            src="/logo_transparent.png"
            width="500"
            height="500"
            alt="logo"
          ></Image>
        </div>
        <nav className="flex">
          <ul className="flex flex-col text-white w-full m-2">
            {links.map((link) => (
              <li
                key={link.label}
                className="p-2 uppercase text-lg hover:to-blue-700 w-full"
              >
                <Link href={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Box justifyContent="center" display="flex" p="2">
        <a
          href="https://github.com/akmittal/webstats"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillGithub size="30px" />
        </a>
      </Box>
    </Box>
  );
}
