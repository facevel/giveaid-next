import React, { useEffect, useState } from "react";
import { NgoPageLayout } from "layouts";
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { db } from "@/firebase";
import { getDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import { format, parseISO } from "date-fns";

interface DataType {
  key: string;
  title: string;
  requestDate: string;
  fulfillmentMaxDate: string;
  requestedUnits : number;
  requestedItem: string;
  fulfilled: boolean;
  priority: number;
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
    dataIndex: 'requestDate',
    key: 'requestDate',
  },
  {
    title: 'Last Date',
    dataIndex: 'fulfillmentMaxDate',
    key: 'fulfillmentMaxDate',
  },
  {
    title: 'Priority Level',
    key: 'priority',
    dataIndex: 'priority',
    render: (_, { priority }) => (
      <>
        {
          priority > 50 &&
          <Tag color="red">
            High
          </Tag>
        }
        {
          priority == 50 &&
          <Tag color="orange">
            Medium
          </Tag>
        }
        {
          priority < 50 &&
          <Tag color="green">
            Low
          </Tag>
        }
      </>
    ),
  },
  {
    title: 'Requested Units',
    key: 'requestedUnits',
    dataIndex: 'requestedUnits',
  },
  {
    title: 'Fulfilled',
    key: 'fulfilledUnits',
    dataIndex: 'fulfilledUnits',
  },
];



const RequestsHistory = () => {
  const [requestData, setRequestData] = useState<DataType[]>([]);

  const getData = () => {
    return new Promise(async (resolve, reject) => {
      const collectionRef = collection(db, "requests");
      const q = query(collectionRef, where("ngoId", "==", "testNgoId"));
      const docSnap = await getDocs(q);
      resolve(docSnap.docs.map((doc) => doc.data()));
    });
  };
  //get data from firestore and set to data
  useEffect(() => {
    //get data from firestore and set to data
    getData().then((data: any) => {
      console.log(data);
      data.map((items: any, index: any) => {
        // console.log(items.fulfillmentMaxDate.seconds);

        setRequestData((prevData) => [
          ...prevData,
          {
            key: index.toString(),
            title: items.title,
            requestDate: format(
              new Date(items.requestDate.seconds*1000),
              "dd MMM yyyy, h a"
            ),
            fulfillmentMaxDate: format(
              new Date(items.fulfillmentMaxDate.seconds*1000),
              "dd MMM yyyy, h a"
            ),
            requestedUnits: items.requestedUnits,
            requestedItem: items.requestedItem,
            fulfilled: items.fulfilled,
            priority: items.priority,
            fulfilledUnits: items.fulfilledUnits,
          },
        ]);
      });
    });
  }, []);

  return (
    <div className={"w-full"}>
      <div className={"my-6"}>
        <h1 className={"text-3xl "}>Requests History</h1>
      </div>

      <Table
        columns={columns}
        dataSource={requestData}
        className={"w-full"}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15"],
        }}
      />
    </div>
  );
};

RequestsHistory.pageLayout = NgoPageLayout;

export default RequestsHistory;