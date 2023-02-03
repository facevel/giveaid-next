import React, { useEffect, useState } from "react";
import { NgoPageLayout } from "layouts";
import {Dropdown, Space, Table, Tag} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { db } from "@/firebase";
import {collection, query, where, getDocs, orderBy} from "firebase/firestore";
import { format, parseISO } from "date-fns";
import { useUserContext } from "@/firebase/authContext";


interface RequestDataType {
  key: string;
  title: string;
  requestDate: string;
  fulfillmentMaxDate: string;
  requestedUnits : number;
  fulfilledUnits : number;
  requestedItem: string;
  priority: number;
}


const columns: ColumnsType<RequestDataType> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    render: (text) => <h1 className={'font-regular'}>{text}</h1>,
  },
  {
    title: 'Category',
    dataIndex: 'requestedItem',
    key: 'requestedItem',
    ellipsis: true,
    sorter: (a, b) => a.requestedItem.length - b.requestedItem.length,
    render: (text) => <span className={'font-bold'}>{text}</span>,
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
    sorter: (a, b) => a.requestedUnits - b.requestedUnits,
  },
  {
    title: 'Fulfilled',
    key: 'fulfilledUnits',
    dataIndex: 'fulfilledUnits',
    sorter: (a, b) => a.fulfilledUnits - b.fulfilledUnits,
  },
];



const RequestsHistory = () => {
  const { getNgoId } = useUserContext();
  const [requestData, setRequestData] = useState<RequestDataType[]>([]);

  const getData = () => {
    return new Promise(async (resolve, reject) => {
      const ngo_id = await getNgoId();
      console.log(ngo_id)
      const collectionRef = collection(db, "requests");
      const q = query(collectionRef, where("ngo_id", "==", ngo_id),orderBy("requestDate", "asc"));
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
              "dd MMM yyyy"
            ),
            fulfillmentMaxDate: format(
              new Date(items.fulfillmentMaxDate.seconds*1000),
              "dd MMM yyyy"
            ),
            requestedUnits: items.requestedUnits,
            requestedItem: items.requestedItem,
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
        // @ts-ignore
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