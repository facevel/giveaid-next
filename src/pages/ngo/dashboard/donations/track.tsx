import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {NgoPageLayout} from "layouts";
import {Card} from "antd";
import {IoIosArrowRoundForward} from "react-icons/io";
import {parseISO, format} from "date-fns";
import {GoogleMap, MarkerF, useJsApiLoader} from "@react-google-maps/api";
import {array} from "yup";

const {Meta} = Card;
const NEXT_PUBLIC_GOOGLE_MAP_KEY = "AIzaSyCgYjkne3uY7GrA0TcAGIGqof4tmCYkr9I"

const DeliveryPartnerLogo = ({name}: { name: string }) => {
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
        deliveryPartner: "dhl",
        eta: "2023-02-03T10:00:00.000Z",
        shipment: "DHL1234",
        location: {latitude: 28.5691, longitude: 77.3423},
        status: "In Transit",
        locationFrom: "Sector18,Noida",
        locationTo: "Main Center",
    },
    {
        title: "Book Donation",
        deliveryPartner: "bluedart",
        eta: "2023-02-04T15:00:00.000Z",
        shipment: "BD1234",
        location: {latitude: 28.5529, longitude: 77.2587},
        status: "Delivered",
        locationFrom: "Sector101,Noida",
        locationTo: "Main Center",
    },
    {
        title: "Food Donation",
        deliveryPartner: "delhivery",
        eta: "2023-02-05T12:00:00.000Z",
        shipment: "DL1234",
        location: {latitude: 28.5242, longitude: 77.1854},
        status: "Out for Delivery",
        locationFrom: "Sector52,Noida",
        locationTo: "New Branch",
    },
    {
        title: "Toy Donation",
        deliveryPartner: "porter",
        eta: "2023-02-06T11:00:00.000Z",
        shipment: "PR1234",
        location: {latitude: 28.6126, longitude: 77.2293},
        status: "In Transit",
        locationFrom: "Sector08,Noida",
        locationTo: "Main Center",
    },
    {
        title: "Clothing Donation",
        deliveryPartner: "dhl",
        eta: "2023-02-07T09:00:00.000Z",
        shipment: "DHL5678",
        location: {latitude: 28.6140, longitude: 77.2867},
        status: "Delivered",
        locationFrom: "Noida",
        locationTo: "New Branch",
    },
    {
        title: "Book Donation",
        deliveryPartner: "bluedart",
        eta: "2023-02-08T14:00:00.000Z",
        shipment: "BD5678",
        location: {latitude: 28.5933, longitude: 77.2496},
        status: "Out for Delivery",
        locationFrom: "Noida",
        locationTo: "Main Center",
    },
    {
        title: "Food Donation",
        deliveryPartner: "delhivery",
        eta: "2023-02-09T13:00:00.000Z",
        shipment: "DL5678",
        status: "In Transit",
        location: {latitude: 28.5384, longitude: 77.2692},
        locationFrom: "Noida",
        locationTo: "New Branch",
    },
    {
        title: "Toy Donation",
        deliveryPartner: "porter",
        eta: "2023-02-10T10:00:00.000Z",
        shipment: "PR5678",
        location: {latitude: 28.5714, longitude: 77.3298},
        status: "Delivered",
        locationFrom: "Noida",
        locationTo: "Main Center",
    },
];

const findCenterPoint = (points:[{latitude:number,longitude:number}]) => {
    let latSum = 0;
    let lngSum = 0;
    let numPoints = points.length;

    for (let i = 0; i < numPoints; i++) {
        latSum += points[i].latitude;
        lngSum += points[i].longitude;
    }

    return { lat: latSum / numPoints, lng: lngSum / numPoints };
}

const DonationTracking = () => {


        // @ts-ignore
        const onLoad = useCallback((map) => setMap(map), []);
        // @ts-ignore
        const onUnmount = useCallback((map) => setMap(null), []);

        // @ts-ignore
        const center = findCenterPoint(DonationTrackingSampleData.map((item) => item.location));
        const [location, setLocation] = useState<any>(center);


        const {isLoaded} = useJsApiLoader({
            id: 'google-map-script', libraries: ["places"], googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAP_KEY
        })

        const [map, setMap] = useState(null);
        const getCoordinates = (obj: { latitude: number, longitude: number }) => {
            return {lat: obj.latitude, lng: obj.longitude}
        }
        const containerStyle = {
            height: '100%'
        }
        const [selectedDonation, setSelectedDonation] = useState<any>(null);

        const [zoom, setZoom] = useState(12);
        useEffect(() => {
            console.log(selectedDonation);
            if (selectedDonation !== null) {
                setZoom(18)
                setLocation(
                    {
                        lat: DonationTrackingSampleData.find(
                            (item) => item.shipment == selectedDonation
                        )?.location.latitude,
                        lng: DonationTrackingSampleData.find(
                            (item) => item.shipment == selectedDonation
                        )?.location.longitude
                    }
                )
            }
        }, [selectedDonation]);

        return <>
            <div className={"grid h-[calc(100vh-6rem)] grid-cols-12 gap-2"}>
                <div
                    className={"col-span-5 bg-gray-100 p-2 flex flex-col gap-2 h-[calc(100vh-6rem)] overflow-y-scroll scrollbar"}>
                    {DonationTrackingSampleData.map((item, index) => {
                        return <div
                            className={`rounded-xl bg-white px-4 py-3 shadow-sm border-2 ${item.shipment == selectedDonation ? 'border-green-600' : 'border-transparent hover:border-green-400'} transition-all duration-300 ease-in-out active:scale-95 cursor-pointer`}
                            key={index}
                            onClick={() => setSelectedDonation(item.shipment)}
                        >
                            <div className={"grid grid-rows-3 gap-0.5"}>
                                <div
                                    className={
                                        "row-span-1 flex h-full w-full flex-row items-center justify-between"
                                    }
                                >
                <span className={"text-lg font-semibold  line-clamp-1"}>
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
                                        <span className={"text-gray-500"}>ETA:</span>
                                        <span>
                    {
                        format(parseISO((item.eta)), "dd MMM yyyy, h a")}
                  </span>
                                    </div>

                                    <DeliveryPartnerLogo name={item.deliveryPartner}/>
                                </div>
                                <div
                                    className={
                                        "row-span-1 flex h-full w-full flex-row items-center justify-between"
                                    }
                                >
                <span className={"flex flex-row items-center -ml-1 gap-1"}>
                  {/*<RiTruckFill size={20}/>*/}
                  <span className={"ml-1 text-sm"}>{item.status}</span>
                </span>
                                    <div className={"flex flex-row items-center"}>
                  <span
                      className={
                          "rounded-md bg-gray-100 p-1 text-xs font-normal text-gray-600"
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
                                                "rounded-md bg-gray-100 p-1 text-xs font-normal text-gray-600"
                                            }
                                        >
                    {item.locationTo}
                  </span>
                                    </div>
                                </div>
                            </div>
                        </div>;
                    })}
                </div>
                <div className={"col-span-7 bg-blue-300 h-[calc(100vh-6rem)] "}>
                    {
                        isLoaded &&
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={location}
                            zoom={zoom}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            {DonationTrackingSampleData.map((item, index) => {
                                return (
                                    <MarkerF key={index}
                                             draggable={false}
                                             position={getCoordinates(item.location)}
                                    />
                                )
                            })}
                        </GoogleMap>
                    }
                </div>
            </div>
        </>
    }
;

DonationTracking.pageLayout = NgoPageLayout;

export default DonationTracking;
