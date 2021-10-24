import { Heading } from "@chakra-ui/react";
import { ReactElement } from "react";
import Head from "next/head";
import { Text, Link } from "@chakra-ui/react";

import {
  Bar,
  BarChart,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import styles from "../styles/Stats.module.css";
import { GetStaticPaths } from "next";

interface Props {
  data: any;
  type: string;
}
const colors = [
  "#03a9f4",
  "#3f51b5",
  "#673ab7",
  "#9c27b0",
  "#e91e63",
  "#f44336",
];
function Stats({ type, data }: Props): ReactElement {
  return (
    <>
      <Head>
        <title>{type}: webstats</title>
        <meta name="description" content={`Check statistics for ${type} for top websites `} />
      </Head>
      <div className="p-4 mt-5">
        <Heading>{type.toUpperCase()}</Heading>
        <hr className="mb-8" />
        <div className={styles.container}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={600} height={300} data={data}>
              <XAxis dataKey="Name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="Total" barSize={30} fill="#8884d8">
                {data.map((entry: any, index: any) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Text>
          * Data for top 10,000 most visited pages is provided by{" "}
          <Link href="http://downloads.majestic.com/majestic_million.csv">
            Majestic million
          </Link>{" "}
        </Text>
      </div>
    </>
  );
}

export const getStaticProps = async ({ params }: any) => {
  const { type } = params;
  const data = await fetch(`http://localhost:3000/api/stats/${type}`).then(
    (res) => res.json()
  );
  return { props: { type, data } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      { params: { type: "compression" } },
      { params: { type: "protocol" } },
      { params: { type: "ip_version" } },
      { params: { type: "ssg" } },
      { params: { type: "images" } },
    ],
  };
};

export default Stats;
