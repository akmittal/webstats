import { Heading, Text, Link } from '@chakra-ui/react';
import React, { ReactElement, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Head from "next/head";


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


interface Props {}
const state = {
  defaultColDef: {
    floatingFilter: true,

    editable: false,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  },
  suppressRowClickSelection: true,
  groupSelectsChildren: true,
  debug: true,
  rowSelection: 'multiple',
  rowGroupPanelShow: 'always',
  pivotPanelShow: 'always',
  enableRangeSelection: true,

  pagination: true,

  columnDefs: [
    {
      headerName: 'Rank',
      field: 'site.rank',
      sortable: true,
      sort: 'asc',
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: 'Domain',
      field: 'site.domain',
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Compression',
      field: 'compression',
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Protocol',
      field: 'protocol',
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Images',
      field: 'images',
      cellRenderer: function (params: any): HTMLElement | string {
        // check the data exists, to avoid error
       
        if (params.data) {
          // data exists, so we can access it
          const res = params.data.images.reduce((prev: any, curr: any) => {
            if (curr.type in prev) {
              prev[curr.type]++;
            } else {
              prev[curr.type] = 1;
            }
            return prev;
          }, {});
          const ul = document.createElement('ul');
          for (const key in res) {
            const span = document.createElement('span');
            span.innerHTML = `${key}: ${res[key]}, `;
            ul.appendChild(span);
          }
          return ul;
        }
        // when we return null, the grid will display a blank cell
        return '';
      },
    },
    {
      headerName: 'IPVersion',
      field: 'ip_version',
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'SSG',
      field: 'ssg',
      sortable: true,
      filter: 'agTextColumnFilter',
    },
  ],
  rowData: [],
};

export default function Home({}: Props): ReactElement {
  const [data, setData] = useState(state);
  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(res => {
        setData({ ...data, rowData: res });
      });
  }, []);

  return (
    <>
    <Head>
      <title>Webstats</title>
      <meta name="description" content="Check statistics for compression, IP version, Tech stack for top websites " />
    </Head>
      <Heading className="mt-6 p-2">Home</Heading>
      <hr className="pb-4" />
      <div
        className="ag-theme-alpine"
        style={{
          height: '500px',
         width:'90%',
         margin:'auto',
        }}
      >
        <AgGridReact
          columnDefs={data.columnDefs}
          defaultColDef={data.defaultColDef}
          suppressRowClickSelection={true}
          groupSelectsChildren={true}
          debug={true}
          rowSelection={data.rowSelection}
          rowGroupPanelShow={data.rowGroupPanelShow}
          pivotPanelShow={data.pivotPanelShow}
          enableRangeSelection={true}
          pagination={true}
          rowData={data.rowData}
        ></AgGridReact>
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
