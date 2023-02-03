import * as React from "react";
import { NgoPageLayout } from "layouts";
import { Card } from "antd";
import { RiTruckFill } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";
import format from "date-fns/format";
import { useState } from "react";

const { Meta } = Card;

const DeliveryPartnerLogo = ({ name }: { name: string }) => {
  return (
    <div>
      {name === "NA" ? (
        <h1 className={"text-xs font-bold"}>Deliver Partner Not Assigned</h1>
      ) : (
        <img
          src={"/deliveryPartners/" + name + ".png"}
          alt={name}
          className={"user-select-none h-fit w-20"}
        />
      )}
    </div>
  );
};

const DonationTrackingSampleData = [
  {
    title: "Clothing Donation",
    deliveryPartner: "DHL",
    eta: "2023-02-03T10:00:00.000Z",
    shipment: "DHL1234",
    status: "In Transit",
    locationFrom: "Sector18,Noida",
    locationTo: "Main Center",
  },
  {
    title: "Book Donation",
    deliveryPartner: "Bluedart",
    eta: "2023-02-04T15:00:00.000Z",
    shipment: "BD1234",
    status: "Delivered",
    locationFrom: "Sector101,Noida",
    locationTo: "Main Center",
  },
  {
    title: "Food Donation",
    deliveryPartner: "Delhivery",
    eta: "2023-02-05T12:00:00.000Z",
    shipment: "DL1234",
    status: "Out for Delivery",
    locationFrom: "Sector52,Noida",
    locationTo: "New Branch",
  },
  {
    title: "Toy Donation",
    deliveryPartner: "Porter",
    eta: "2023-02-06T11:00:00.000Z",
    shipment: "PR1234",
    status: "In Transit",
    locationFrom: "Sector08,Noida",
    locationTo: "Main Center",
  },
  {
    title: "Clothing Donation",
    deliveryPartner: "DHL",
    eta: "2023-02-07T09:00:00.000Z",
    shipment: "DHL5678",
    status: "Delivered",
    locationFrom: "Noida",
    locationTo: "New Branch",
  },
  {
    title: "Book Donation",
    deliveryPartner: "Bluedart",
    eta: "2023-02-08T14:00:00.000Z",
    shipment: "BD5678",
    status: "Out for Delivery",
    locationFrom: "Noida",
    locationTo: "Main Center",
  },
  {
    title: "Food Donation",
    deliveryPartner: "Delhivery",
    eta: "2023-02-09T13:00:00.000Z",
    shipment: "DL5678",
    status: "In Transit",
    locationFrom: "Noida",
    locationTo: "New Branch",
  },
  {
    title: "Toy Donation",
    deliveryPartner: "Porter",
    eta: "2023-02-10T10:00:00.000Z",
    shipment: "PR5678",
    status: "Delivered",
    locationFrom: "Noida",
    locationTo: "Main Center",
  },
];


const DonationTracking = () => {

  const [ selectedDonation, setSelectedDonation ] = useState<any>(null);

  return (
    <>
      <div className={"grid h-[calc(100vh-6rem)] grid-cols-12 gap-2"}>
        <div className={"col-span-4 bg-gray-100 p-2 flex flex-col gap-2 scrollbar "}>
          {DonationTrackingSampleData.map((item, index) => {
            return (
              <div
                className={`rounded-xl bg-white px-2 py-3 shadow-sm border-2 ${item.shipment == selectedDonation ? 'border-green-600' : 'border-transparent hover:border-green-400'} transition-all duration-300 ease-in-out active:scale-95 cursor-pointer`}
                key={index}
                onClick={() => setSelectedDonation(item.shipment)}
              >
                <div className={"grid grid-rows-3 gap-0.5"}>
                  <div
                    className={
                      "row-span-1 flex h-full w-full flex-row items-center justify-between"
                    }
                  >
                    <span className={"text-xl font-bold line-clamp-1"}>
                      {item.title}
                    </span>
                    <span className={"text-sm font-normal text-gray-400"}>
                      {item.shipment}
                    </span>
                  </div>
                  <div
                    className={
                      "row-span-1 flex h-full w-full flex-row items-center justify-between"
                    }
                  >
                    <div
                      className={
                        "flex flex-row gap-1 text-sm font-medium text-gray-600"
                      }
                    >
                      <span>ETA</span>
                      <span>
                        {format(new Date(item.eta), "dd MMM yyyy, h a")}
                      </span>
                    </div>

                    <DeliveryPartnerLogo name={item.deliveryPartner} />
                  </div>
                  <div
                    className={
                      "row-span-1 flex h-full w-full flex-row items-center justify-between"
                    }
                  >
                    <span className={"flex flex-row items-center gap-1"}>
                      <RiTruckFill size={20} />
                      <span className={"ml-1 text-sm"}>{item.status}</span>
                    </span>
                    <div className={"flex flex-row items-center"}>
                      <span
                        className={
                          "rounded-sm bg-gray-200 p-1 text-xs font-normal text-gray-600"
                        }
                      >
                        {item.locationFrom}
                      </span>
                      <IoIosArrowRoundForward
                        size={30}
                        className={"mx-2 inline-block"}
                      />
                      <span
                        className={
                          "rounded-sm bg-gray-200 p-1 text-xs font-normal text-gray-600"
                        }
                      >
                        {item.locationTo}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={"col-span-8 bg-blue-300"}></div>
      </div>
    </>
  );
};

DonationTracking.pageLayout = NgoPageLayout;

export default DonationTracking;
