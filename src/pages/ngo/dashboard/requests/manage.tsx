import React from 'react';
import { NgoPageLayout } from "layouts";
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  title: string;
  createdAt: string;
  region: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Request Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'region',
  },
  {
    title: 'Priority Level',
    key: 'priority',
    dataIndex: 'priority',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Manage</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    title: 'Clothing for Orphanage',
    createdAt: '22 Feb 2022',
    region: 'Mumbai',
    tags: ['clothing', 'orphanage']
  },
  {
    key: '2',
    title: 'Books for Rural School',
    createdAt: '25 Feb 2022',
    region: 'Delhi',
    tags: ['books', 'education']
  },
  {
    key: '3',
    title: 'Food for Hunger Relief',
    createdAt: '01 Mar 2022',
    region: 'Bangalore',
    tags: ['food', 'hunger']
  },
  {
    key: '4',
    title: 'Blankets for Homeless Shelters',
    createdAt: '05 Mar 2022',
    region: 'Hyderabad',
    tags: ['blankets', 'homeless']
  },
  {
    key: '5',
    title: 'Clothing for Slums Program',
    createdAt: '10 Mar 2022',
    region: 'Chennai',
    tags: ['clothing', 'women']
  },
  {
    key: '6',
    title: 'School Supplies for Rural Students',
    createdAt: '15 Mar 2022',
    region: 'Ahmedabad',
    tags: ['school supplies', 'education']
  },
  {
    key: '7',
    title: 'Medical Supplies for Rural Health Center',
    createdAt: '20 Mar 2022',
    region: 'Pune',
    tags: ['medical supplies', 'health']
  },
  {
    key: '8',
    title: 'Books for Rural Library',
    createdAt: '25 Mar 2022',
    region: 'Jaipur',
    tags: ['books', 'library']
  },
  {
    key: '9',
    title: 'Food for Disaster Relief',
    createdAt: '30 Mar 2022',
    region: 'Lucknow',
    tags: ['food', 'disaster']
  },
  {
    key: '10',
    title: 'Blankets for Winter Relief',
    createdAt: '05 Apr 2022',
    region: 'Kolkata',
    tags: ['blankets', 'winter']
  }
];


const RequestsHistory = () => {

  return (
    <div className={'w-full'}>
      <div className={'my-6'}>
      <h1 className={'text-3xl '}>Requests History</h1>

      </div>

      <Table
        columns={columns}
        dataSource={data}
        className={'w-full'}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15']}}
      />
    </div>
  );
};

RequestsHistory.pageLayout = NgoPageLayout;

export default RequestsHistory;