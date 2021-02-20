/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { Heading } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { Bar, BarChart, Legend, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';

interface Props {
  type: string;
}
const colors = [
  '#03a9f4',
  '#3f51b5',
  '#673ab7',
  '#9c27b0',
  '#e91e63',
  '#f44336',
];
function Stats({ type }: Props): ReactElement {
  const { isLoading, error, data } = useQuery(['stats', type], () =>
    fetch(`/api/stats/${type}`).then(res => res.json())
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {error?.message}</div>;

  return (
    <div className="p-4 mt-5">
      <Heading>{type.toUpperCase()}</Heading>
      <hr className="mb-8" />
      <div css={css`
      width:100%; height:60vh;`}>
      <ResponsiveContainer width="100%" height="100%">
      <BarChart  width={600} height={300} data={data} >
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
    </div>
  );
}

export default Stats;
