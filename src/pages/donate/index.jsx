import React, {useCallback, useEffect, useRef, useState} from "react";
import {GoogleMap, MarkerF, useJsApiLoader} from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
import {Modal, Stepper, useConfetti} from "../../components";
import {Button, Card, message, Skeleton} from "antd";
import {RiHome5Fill, RiMapPin3Fill, RiPencilRulerFill} from "react-icons/ri";
import {MdChair, MdToys} from "react-icons/md";
import {IoShirt} from "react-icons/io5";
import {ImSpoonKnife} from "react-icons/im";
import {GiConverseShoe, GiForkKnifeSpoon} from "react-icons/gi";
import {BsLaptop} from "react-icons/bs";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import TextArea from "antd/lib/input/TextArea";
import {db} from "../../firebase";
import {addDoc, collection, doc, where} from "firebase/firestore";
import {distanceBetween, geohashQueryBounds} from "geofire-common";
import {endAt, getDocs, increment, orderBy, query, startAt, updateDoc} from "@firebase/firestore";
import {FaBook, FaBriefcaseMedical} from "react-icons/fa";
import {FiTrendingUp} from "react-icons/fi";
import {HiComputerDesktop} from "react-icons/hi2";
import {TabsLayout} from "../../layouts";
import {DonationTrackingSampleData} from "../ngo/dashboard/donations/track";
import {nanoid} from "nanoid";

const NEXT_PUBLIC_GOOGLE_MAP_KEY = "AIzaSyCgYjkne3uY7GrA0TcAGIGqof4tmCYkr9I";

const LocationStep = ({donationData, setDonationData}) => {
    /* Navigator */

    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(pos) {
        let crd = pos.coords;

        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    }

    // if (navigator.geolocation) {
    //     message.success("GeoLocation is Available!");
    //
    //     navigator.permissions
    //         .query({name: "geolocation"})
    //         .then(function (result) {
    //             if (result.state === "granted") {
    //                 console.log(result.state);
    //                 navigator.geolocation.getCurrentPosition(success);
    //             } else if (result.state === "prompt") {
    //                 console.log(result.state);
    //             } else if (result.state === "denied") {
    //                 message.info("Please enable location services to continue");
    //             }
    //             result.onchange = function () {
    //                 console.log(result.state);
    //             };
    //         });
    // } else {
    //     message.error("Sorry Not available!");
    // }

    /*
     *sjkf*/

    const center = {
        lat: 21.7679,
        lng: 78.8718,
    };
    const latlngAddressRef = useRef(null);
    const [location, setLocation] = useState(null);
    const antInputRef = useRef(null);

    const {isLoaded} = useJsApiLoader({
        id: "google-map-script",
        libraries: ["places"],
        googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAP_KEY,
    });

    const [map, setMap] = useState(null);

    useEffect(() => {
        if (location) {
            getAddressFromLatLng(location.lat, location.lng);
        }
        console.log("location", location);
        return () => {
        };
    }, [location]);

    // @ts-ignore
    const onLoad = useCallback((map) => setMap(map), []);
    // @ts-ignore
    const onUnmount = useCallback((map) => setMap(null), []);

    const containerStyle = {
        height: "400px",
    };
    const position = {
        lat: 37.772,
        lng: -122.214,
    };
    const onMarkerDragEnd = (coord, index) => {
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        console.log("lat, lng: ", lat, lng);
        setLocation({lat, lng});
    };

    const getAddressFromLatLng = (lat, lng) => {
        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${NEXT_PUBLIC_GOOGLE_MAP_KEY}`
        )
            .then((r) => r.json())
            .then((data) => {
                if (data.results) {
                    console.log(data.results[0].formatted_address);
                    setDonationData({
                        ...donationData,
                        location: {
                            lat: location.lat,
                            lng: location.lng,
                            address: data.results[0].formatted_address,
                        },
                    });
                    if (antInputRef.current) {
                        // @ts-ignore
                        console.log({sd: antInputRef.current});
                        latlngAddressRef.current.innerText =
                            data.results[0].formatted_address;
                        antInputRef.current.value = data.results[0].formatted_address;
                    }
                }
            });
    };
    const [loading, setLoading] = useState(false);

    const getCurrentLocation = () => {
        setLoading(true);
        if ("geolocation" in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({coords}) => {
                const {latitude, longitude} = coords;
                setLocation({
                    lat: latitude,
                    lng: longitude,
                });
                setLoading(false);
            });
        } else {
            message.error("Geolocation is not supported on the browser.");
            setLoading(false);
        }
    };
    return (
        <div>
            <div className={""}>
                {!location && (
                    <div className="flex flex-col items-center justify-center">
                        <label
                            htmlFor="address"
                            className="mx-auto  mb-2 block w-full text-center text-sm font-medium text-gray-600 dark:text-white"
                        >
                            Your Address
                        </label>
                        <Autocomplete
                            className={
                                "dark:shadow-sm-light mx-auto block w-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                            }
                            style={{width: "250px"}}
                            ref={antInputRef}
                            apiKey={NEXT_PUBLIC_GOOGLE_MAP_KEY}
                            onPlaceSelected={(place) => {
                                console.log(place);
                                if (place) {
                                    let latitude = place.geometry.location.lat();
                                    let longitude = place.geometry.location.lng();
                                    setLocation({lat: latitude, lng: longitude});
                                    console.log({latitude, longitude});
                                }
                                if (antInputRef.current) {
                                    // @ts-ignore
                                    console.log({sd: antInputRef.current});
                                    antInputRef.current.value = place?.formatted_address;
                                }
                            }}
                            options={{
                                types: ["geocode", "establishment"],
                            }}
                            placeholder={"Building name, Block #, Area..."}
                        />
                        <div>
                            <div
                                className={
                                    "my-6 flex items-center justify-center space-x-3 text-gray-400"
                                }
                            >
                                <p>----- or -----</p>
                            </div>

                            <button
                                onClick={() => {
                                    getCurrentLocation();
                                }}
                                className="inline-flex items-center justify-center rounded-lg bg-green-600 py-3 px-5 text-center text-base font-medium text-white focus:ring-4 focus:ring-green-300 hover:bg-green-800 dark:focus:ring-green-900"
                            >
                                Get Current Location
                                {loading ? (
                                    <div className={"flex items-center justify-center"}>
                                        <svg
                                            aria-hidden="true"
                                            className="mr-2 ml-3 inline h-4 w-4  animate-spin fill-green-500 text-gray-200 dark:text-gray-600"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                    </div>
                                ) : (
                                    <RiMapPin3Fill className={"ml-2"}/>
                                )}
                            </button>
                        </div>
                    </div>
                )}
                {isLoaded && location && (
                    <div className={"mx-auto flex h-96 max-w-xl flex-col rounded-lg"}>
                        <p
                            ref={latlngAddressRef}
                            className={"mb-4 px-4 text-center text-sm text-gray-500"}
                        >
                            Loading...
                        </p>
                        <p
                            onClick={() => setLocation(null)}
                            className={
                                "mb-4 cursor-pointer px-4 text-center text-sm text-red-500 underline"
                            }
                        >
                            Retry
                        </p>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={location ? location : center}
                            zoom={15}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            <MarkerF
                                draggable={true}
                                onDragEnd={onMarkerDragEnd}
                                onLoad={onLoad}
                                position={location ? location : center}
                            />
                        </GoogleMap>
                        <p
                            onClick={() => setLocation(null)}
                            className={
                                "mt-4 -mb-4 cursor-pointer px-4 text-center text-sm text-gray-500 underline"
                            }
                        >
                            Drag the marker to set the location.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const data = [
    {
        title: "Clothing for Children",
        requestDate: "2023-02-03T00:00:00.000Z",
        fulfillmentMaxDate: "2023-03-03T00:00:00.000Z",
        location: {
            latitude: 28.5355,
            longitude: 77.391,
            geohash: "r3gx2r2g05n5",
            address: "Noida, India",
        },
        requestedUnits: 100,
        requestedItem: "Clothing",
        priority: 1,
        fulfilled: false,
    },
    {
        title: "Electronics for Schools",
        requestDate: "2022-12-15T00:00:00.000Z",
        fulfillmentMaxDate: "2023-01-15T00:00:00.000Z",
        location: {
            latitude: 28.5355,
            longitude: 77.391,
            geohash: "r3gx2r2g05n5",
            address: "Noida, India",
        },
        requestedUnits: 50,
        requestedItem: "Electronics",
        priority: 2,
        fulfilled: true,
    },
    {
        title: "Toys for Children",
        requestDate: "2022-11-01T00:00:00.000Z",
        fulfillmentMaxDate: "2022-12-01T00:00:00.000Z",
        location: {
            latitude: 28.5355,
            longitude: 77.391,
            geohash: "r3gx2r2g05n5",
            address: "Noida, India",
        },
        requestedUnits: 200,
        requestedItem: "Toys",
        priority: 3,
        fulfilled: true,
    },
    {
        title: "Books for Libraries",
        requestDate: "2022-10-10T00:00:00.000Z",
        fulfillmentMaxDate: "2022-11-10T00:00:00.000Z",
        location: {
            latitude: 28.5355,
            longitude: 77.391,
            geohash: "r3gx2r2g05n5",
            address: "Noida, India",
        },
        requestedUnits: 300,
        requestedItem: "Books",
        priority: 4,
        fulfilled: false,
    },
    {
        title: "Food for the Homeless",
        requestDate: "2022-09-01T00:00:00.000Z",
        fulfillmentMaxDate: "2022-10-01T00:00:00.000Z",
        location: {
            latitude: 28.5355,
            longitude: 77.391,
            geohash: "r3gx2r2g05n5",
            address: "Noida, India",
        },
        requestedUnits: 300,
        requestedItem: "Books",
        priority: 4,
        fulfilled: false,
    },
];
const SelectionStep = ({
                           setFormSubmitted,
                           setDonationData,
                           donationData,
                           lat,
                           lng,
                           range,
                       }) => {
    const getIcon = (category) => {
        switch (category) {
            case "Clothing":
                return <IoShirt className={"text-2xl"}/>;
            case "Electronics":
                return <HiComputerDesktop className={"text-2xl"}/>;
            case "Toys":
                return <MdToys className={"text-2xl"}/>;
            case "Books":
                return <FaBook className={"text-2xl"}/>;
            case "Food":
                return <GiForkKnifeSpoon className={"text-2xl"}/>;
            case "Medical":
                return <FaBriefcaseMedical className={"text-2xl"}/>;
            default:
                return <IoShirt className={"text-2xl"}/>;
        }
    };
    const [loading, setLoading] = useState([]);
    const [requests, setRequests] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryRequests, setCategoryRequests] = useState({
        Clothing: 0,
        Electronics: 0,
        Toys: 0,
        Books: 0,
        Food: 0,
        Medical: 0,
    });
    const [sortedCategoryRequests, setSortedCategoryRequests] = useState({
        Clothing: 0,
        Electronics: 0,
        Toys: 0,
        Books: 0,
        Food: 0,
        Medical: 0,
    });

    const [requestIds, setRequestIds] = useState([]);
    useEffect(() => {
        console.log({categoryRequests});
        let sortArray = [];

        for (let i in categoryRequests) {
            sortArray.push({key: i, value: categoryRequests[i]});
        }
        sortArray.sort(function (a, b) {
            return a.value - b.value;
        });

        sortArray = sortArray.reverse();
        let newList = {};
        for (let i in sortArray) {
            newList[sortArray[i].key] = sortArray[i].value;
        }

        console.log({newList});
        setSortedCategoryRequests(newList);
    }, [categoryRequests]);

    useEffect(() => {
        getNgoRequestDataWithInRange({lat, lng, range}).then(() => {
            console.log({requests});
        });
    }, []);
    useEffect(() => {
        console.log({selectedCategory});
        setDonationData({...donationData, category: selectedCategory});
    }, [selectedCategory]);

    useEffect(() => {
        console.log({requestIds});
        setDonationData({...donationData, request_ids: requestIds});
    }, [requestIds]);

    const getNgoRequestDataWithInRange = async ({lat, lng, range}) => {
        // Find cities within 50km of London
        setLoading(true);
        console.log({lat, lng, range});
        const center = [lat, lng];
        const radiusInM = range * 1000;

        const bounds = geohashQueryBounds(center, radiusInM);
        const promises = [];
        for (const b of bounds) {
            console.log({b});
            const q = query(
                collection(db, "requests"),
                orderBy("location.geohash"),
                startAt(b[0]),
                endAt(b[1])
            );
            const querySnapshot = getDocs(q);
            promises.push(querySnapshot);
        }

        console.log({promises: promises.length});

        Promise.all(promises)
            .then((snapshots) => {
                const matchingDocs = [];

                for (const snap of snapshots) {
                    for (const doc of snap.docs) {
                        const lat = doc.get("location.lat");
                        const lng = doc.get("location.lng");

                        // We have to filter out a few false positives due to GeoHash
                        // accuracy, but most will match
                        const distanceInKm = distanceBetween([lat, lng], center);
                        const distanceInM = distanceInKm * 1000;
                        if (distanceInM <= radiusInM) {
                            matchingDocs.push(doc);
                        }
                    }
                }

                return matchingDocs;
            })
            .then((matchingDocs) => {
                matchingDocs.map((doc) => {
                    let data = doc.data();
                    console.log({data});
                    setRequestIds((prev) => {
                        return [...prev, data.requestId];
                    });
                    setCategoryRequests((prev) => {
                        return {
                            ...prev,
                            [data.requestedItem]:
                            prev[data.requestedItem] +
                            data.requestedUnits -
                            data.fulfilledUnits,
                        };
                    });
                });
                setLoading(false);
            });
    };

    return (
        <div className={"mx-auto mt-5 grid grid-cols-1 gap-y-4 px-5"}>
            {loading ? (
                <div className={"flex items-center justify-center"}>
                    <svg
                        aria-hidden="true"
                        className="mr-2 inline h-8 w-8 animate-spin fill-green-500 text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                </div>
            ) : (
                Object.keys(sortedCategoryRequests).map((key, index) => {
                    return (
                        <div key={index}>
                            {categoryRequests[key] > 0 && (
                                <div
                                    onClick={() => {
                                        console.log(key);
                                        setSelectedCategory(key);
                                    }}
                                    className={`mx-auto w-fit transform cursor-pointer rounded-md border px-3 py-3 transition duration-200 ease-in-out hover:bg-gray-200 active:scale-95 ${
                                        key === selectedCategory ? " border-green-600" : ""
                                    }`}
                                >
                                    <div className={"flex items-center justify-center space-x-6"}>
                                        <div>{getIcon(key)}</div>
                                        <div>
                                            <h3 className={"font-semibold text-gray-700"}>{key}</h3>
                                            <p
                                                className={"text-gray-460 text-sm"}
                                            >{`${categoryRequests[key]} requests received from NGOs.`}</p>
                                            {index === 0 && (
                                                <div
                                                    className={
                                                        "mt-3 flex items-center justify-start space-x-2"
                                                    }
                                                >
                                                    <FiTrendingUp
                                                        color={"green"}
                                                        className={"line-current text-green-600"}
                                                    />
                                                    <p
                                                        className={"text-sm tracking-tight text-green-600"}
                                                    >
                                                        Most needed category.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};
const PlaceOrderStep = ({
                            setFormSubmitted,
                            setDonationData,
                            donationData,
                        }) => {
        const [loading, setLoading] = useState(false);

        function randomInt(min, range) {
            return Math.floor(Math.random() * (range + 1) + min);
        }

        const handleSubmit = async (event) => {
            setLoading(true);
            const fData = new FormData(event.currentTarget);
            event.preventDefault();
            let data = {};
            for (let [key, value] of fData.entries()) {
                console.log(key, value);
                data[key] = value;
            }

            try {
                const dataWithTime = {
                    ...data,
                    time: Math.floor(new Date().getTime() / 1000),
                    status: "uploaded",
                    order_id: Math.floor(new Date().getTime() / 1000),
                    pickup_time: selectedDate,
                };
                const entireData = {...donationData, final_details: dataWithTime};
                setDonationData(entireData);
                console.log({entireData});
                const docRef = await addDoc(collection(db, "orders"), {...entireData});
                setTimeout(async () => {
                    let data = DonationTrackingSampleData[randomInt(0, 3)];
                    data.locationFrom = entireData.location.address;
                    data.location = {
                        latitude: entireData.location.lat,
                        longitude: entireData.location.lng,
                    };
                    data.status = "Pickup Scheduled";
                    data.shipment = `#${nanoid(8)}`;
                    const shippingPartnerArray = ["dhl", "delhivery", "porter", "bluedart"];
                    data.deliveryPartner = shippingPartnerArray[randomInt(0, 4)].toLowerCase();
                    console.log({data});
                    await addDoc(collection(db, "tracking"), {...data});
                    console.log(entireData.category)
                    const q = query(
                        collection(db, "requests"),
                        where("ngo_id", "==", "k5ofUn6HZD"),
                        where("requestedItem", "==", entireData.category),
                    );
                    getDocs(q).then(async (querySnapshot) => {
                            if (querySnapshot.empty) {
                                console.log("No matching documents.");
                            } else {
                                const data = querySnapshot.docs[0].data()
                                const ref = querySnapshot.docs[0].ref
                                console.log({data});
                                let increaCount = entireData.pickup_items.find(item => item.title === entireData.category);
                                console.log("increaCount", increaCount.count);
                                await updateDoc(ref, {
                                    fulfilledUnits: increment(increaCount.count),
                                });
                            }
                        }
                    )
                }, 2000, entireData);
                console.log("Document written with ID: ", docRef.id);
                setFormSubmitted(true);
            } catch
                (error) {
                console.log({error});
                message.error(error?.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        const date_time = [
            {date: "4rd February, 2023", time: ["09:30 PM", "10:00 PM", "11:00 PM"]},
            {date: "5rd February, 2023", time: ["09:30 AM", "10:00 AM", "11:00 AM"]},
            {date: "6rd February, 2023", time: ["09:30 AM", "10:00 AM", "11:00 AM"]},
        ];

        const [selectedDate, setSelectedDate] = useState(null);

        const SlotChip = ({time, onClick, key, highlighted}) => {
            return (
                <div
                    key={key}
                    onClick={() => {
                        onClick();
                    }}
                    className={`flex w-fit cursor-pointer items-center justify-center rounded-md border border border-2 border-gray-300 px-3 py-2 text-sm ${
                        highlighted ? "border-green-600 " : ""
                    }`}
                >
                    <p>{time}</p>
                </div>
            );
        };

        useEffect(() => {
            console.log(selectedDate);
        }, [selectedDate]);

        return (
            <div className={"mx-4 flex flex-col justify-center"}>
                <div className={"flex flex-col space-y-4 text-start"}>
                    <h1
                        className={"my-4 text-base font-bold text-gray-700 dark:text-white"}
                    >
                        1. Choose your Pickup Slot
                    </h1>
                    {date_time.map((date, index) => {
                        return (
                            <div key={index}>
                                <p className={"mb-2 text-sm text-gray-400"}>- {date.date}</p>
                                {
                                    <div className={"flex space-x-2"}>
                                        {date.time.map((time, index) => {
                                            return (
                                                <SlotChip
                                                    highlighted={
                                                        selectedDate &&
                                                        selectedDate === `${date.date},${time}`
                                                    }
                                                    onClick={() => {
                                                        setSelectedDate(`${date.date},${time}`);
                                                    }}
                                                    key={index}
                                                    time={time}
                                                />
                                            );
                                        })}
                                    </div>
                                }
                            </div>
                        );
                    })}
                </div>
                <div className={"mt-6 flex flex-col space-y-4 text-start"}>
                    <h1
                        className={"my-4 text-base font-bold text-gray-700 dark:text-white"}
                    >
                        2. Notes for the pickup person
                    </h1>
                    <div>
                        <TextArea
                            placeholder={"Any special notes for the pickup...?"}
                            rows={4}
                        />
                    </div>
                </div>
                <div>
                    <section className="bg-white dark:bg-gray-900">
                        <div className={"mt-6 flex flex-col space-y-4 text-start"}>
                            <h1
                                className={
                                    "my-4 text-base font-bold text-gray-700 dark:text-white"
                                }
                            >
                                2. Notes for the pickup person
                            </h1>
                        </div>
                        <div className="mx-auto max-w-2xl pb-8 pt-4 lg:py-16">
                            <form action="#" onSubmit={handleSubmit}>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-600 focus:ring-green-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                                            placeholder="Type product name"
                                            required=""
                                        />
                                    </div>
                                    <div className={"flex space-x-4"}>
                                        <div className="w-full">
                                            <label
                                                htmlFor="email"
                                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-600 focus:ring-green-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                                                placeholder="Email"
                                                required=""
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label
                                                htmlFor="pincode"
                                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Pincode
                                            </label>
                                            <input
                                                type="text"
                                                pattern="\d*"
                                                minLength={"6"}
                                                name="pincode"
                                                id="pincode"
                                                maxLength={6}
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-600 focus:ring-green-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                                                placeholder="Pincode"
                                                required=""
                                            />
                                        </div>
                                    </div>
                                    <div className={"flex space-x-4"}>
                                        <div className="w-full">
                                            <label
                                                htmlFor="flat_no"
                                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Flat/ Door No.
                                            </label>
                                            <input
                                                type="text"
                                                name="flat_no"
                                                id="flat_no"
                                                minLength={1}
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-600 focus:ring-green-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                                                placeholder="Flat/ Door no."
                                                required=""
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label
                                                htmlFor="flat_no"
                                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                minLength={1}
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-600 focus:ring-green-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                                                placeholder="City"
                                                required=""
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="address"
                                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            minLength={1}
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-600 focus:ring-green-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                                            placeholder="Address"
                                            required=""
                                        />
                                    </div>
                                    <div className="mb-4 flex items-center">
                                        <input
                                            checked
                                            id="terms"
                                            type="checkbox"
                                            value=""
                                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-green-600 dark:focus:ring-offset-gray-800"
                                        />
                                        <label
                                            htmlFor="checkbox-1"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            I agree to the{" "}
                                            <a
                                                href="#"
                                                className="text-green-600 hover:underline dark:text-green-500"
                                            >
                                                terms and conditions
                                            </a>
                                            .
                                        </label>
                                    </div>
                                </div>
                                <Button loading={loading} htmlType="submit">
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
;

const PickupStep = ({max, donationData, setDonationData}) => {
    const [items, setItems] = useState([
        {
            title: "Clothing",
            icon: (
                <IoShirt size={20} className={"flex items-center justify-center"}/>
            ),
            description: "You can add the number of clothes you want to donate",
            count: 0,
        },
        {
            title: "Medical",
            icon: (
                <FaBriefcaseMedical
                    size={20}
                    className={"flex items-center justify-center"}
                />
            ),
            description: "You can add the number of supplies you want to donate",
            count: 0,
        },
        {
            title: "Books",
            icon: <FaBook size={20} className={"flex items-center justify-center"}/>,
            description: "You can add the number of books you want to donate",
            count: 0,
        },
        {
            title: "Toys",
            icon: <MdToys size={20} className={"flex items-center justify-center"}/>,
            description: "You can add the number of toys you want to donate",
            count: 0,
        },
        {
            title: "Electronics",
            icon: (
                <HiComputerDesktop
                    size={20}
                    className={"flex items-center justify-center"}
                />
            ),
            description: "You can add the number of devices you want to donate",
            count: 0,
        },
        {
            title: "Food",
            icon: (
                <GiForkKnifeSpoon
                    size={20}
                    className={"flex items-center justify-center"}
                />
            ),
            description: "Have something else you want to donate? Add it here.",
            count: 0,
        },
    ]);
    useEffect(() => {
        setDonationData({
            ...donationData,
            pickup_items: items.map((item) => {
                return {
                    title: item.title,
                    count: item.count,
                };
            }),
        });
        console.log("items", items);
        console.log("total", getTotalSelectedItems());
    }, [items]);

    const getTotalSelectedItems = () => {
        return items.reduce((acc, item) => {
            return acc + item.count;
        }, 0);
    };
    const selectedCategories = donationData.category;
    return (
        <div className={"p-4"}>
            <div>
                <h3 className={"mx-auto mb-5 text-center font-semibold"}>
                    {`${getTotalSelectedItems()} / ${max} `}
                    <span className={"block font-normal"}>selected</span>
                </h3>
                <div className={"grid grid-cols-1 space-y-3 p-4"}>
                    {items.map((item, index) => {
                        return (
                            <div key={index}>
                                {selectedCategories.includes(item.title) && (
                                    <Card
                                        key={index}
                                        className={"mx-auto"}
                                        actions={[
                                            <MinusOutlined
                                                onClick={() => {
                                                    if (getTotalSelectedItems() > 0) {
                                                        message.success("Removed from bag!");
                                                        setItems(
                                                            items.map((item, i) => {
                                                                if (i === index) {
                                                                    return {...item, count: item.count - 1};
                                                                }
                                                                return item;
                                                            })
                                                        );
                                                    } else {
                                                        message.error("You can't remove more items!");
                                                    }
                                                }}
                                                key="plus"
                                            />,
                                            <PlusOutlined
                                                onClick={() => {
                                                    if (getTotalSelectedItems() < max) {
                                                        setItems(
                                                            items.map((item, i) => {
                                                                if (i === index) {
                                                                    return {...item, count: item.count + 1};
                                                                }
                                                                return item;
                                                            })
                                                        );
                                                    } else {
                                                        message.error("You can't add more items!");
                                                    }
                                                }}
                                                key="minus"
                                            />,
                                        ]}
                                    >
                                        <Skeleton loading={false} avatar active>
                                            <Meta
                                                avatar={item.icon}
                                                title={item.title}
                                                description={item.description}
                                            />
                                        </Skeleton>
                                    </Card>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const DetailsStep = ({
                         setSelectedPickUpType,
                         donationData,
                         setDonationData,
                     }) => {
    const [selectedCategory, setSelectedCategory] = useState("light");

    useEffect(() => {
        setSelectedPickUpType(selectedCategory);
        setDonationData({...donationData, pickup_type: selectedCategory});
    }, [selectedCategory]);

    return (
        <div className={"flex flex-col space-y-3 py-6"}>
            <div
                onClick={() => {
                    if (selectedCategory !== "light") setSelectedCategory("light");
                    else setSelectedCategory(null);
                }}
                className={"flex flex-col items-center justify-center px-4"}
            >
                <div
                    className={`flex w-full transform cursor-pointer items-center justify-between rounded-md border px-6 py-5 transition duration-200 ease-in-out hover:bg-gray-100 active:scale-95 ${
                        selectedCategory === "light"
                            ? "border border-2 border-green-600"
                            : ""
                    }`}
                >
                    <div>
                        <h2 className={"font-semibold text-gray-800"}>
                            Light pickup (2 wheeler)
                        </h2>
                        <div
                            className={"mt-3 flex flex-col space-y-2 text-sm text-gray-500"}
                        >
                            <div>
                                <p className={"font-medium text-gray-800"}>Accepted Items:</p>
                                <ul className={"flex list-inside list-disc space-x-4"}>
                                    <li>Upto 22 clothes (10 Kg)</li>
                                    <li>Same day pickup</li>
                                </ul>
                            </div>

                            <div className={""}>
                                <p className={"font-medium  text-gray-800"}>Features:</p>
                                <div className={"mt-2 flex space-x-3 text-lg text-gray-700"}>
                                    <ImSpoonKnife className={""}/>
                                    <IoShirt className={""}/>
                                    <RiPencilRulerFill className={""}/>
                                    <GiConverseShoe className={""}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                onClick={() => {
                    if (selectedCategory !== "heavy") setSelectedCategory("heavy");
                    else setSelectedCategory(null);
                }}
                className={"flex flex-col items-center justify-center px-4"}
            >
                <div
                    className={`flex w-full transform cursor-pointer items-center justify-between rounded-md border px-6 py-5 transition duration-200 ease-in-out hover:bg-gray-100 active:scale-95 ${
                        selectedCategory === "heavy"
                            ? "border border-2 border-green-600"
                            : ""
                    }`}
                >
                    <div>
                        <h2 className={"font-semibold text-gray-800"}>
                            Heavy pickup (4 wheeler)
                        </h2>
                        <div
                            className={"mt-3 flex flex-col space-y-2 text-sm text-gray-500"}
                        >
                            <div>
                                <p className={"font-medium text-gray-800"}>Accepted Items:</p>
                                <ul className={"list-inside list-disc"}>
                                    <li>Upto 45 clothes (20 Kg)</li>
                                    <li>Includes heavy items like appliances, furniture etc.</li>
                                    <li>Takes 3-5 days</li>
                                </ul>
                            </div>

                            <div className={""}>
                                <p className={"font-medium  text-gray-800"}>Features:</p>
                                <div className={"mt-2 flex space-x-3 text-lg text-gray-700"}>
                                    <ImSpoonKnife className={""}/>
                                    <RiHome5Fill className={""}/>
                                    <BsLaptop className={""}/>
                                    <MdToys className={""}/>
                                    <MdChair className={""}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                onClick={() => {
                    if (selectedCategory !== "self") setSelectedCategory("self");
                    else setSelectedCategory(null);
                }}
                className={"flex flex-col items-center justify-center px-4"}
            >
                <div
                    className={`flex w-full transform cursor-pointer items-center justify-between rounded-md border px-6 py-5 transition duration-200 ease-in-out hover:bg-gray-100 active:scale-95 ${
                        selectedCategory === "self"
                            ? "border border-2 border-green-600"
                            : ""
                    }`}
                >
                    <div>
                        <h2 className={"font-semibold text-gray-800"}>Self Drop</h2>
                        <div
                            className={"mt-3 flex flex-col space-y-2 text-sm text-gray-500"}
                        >
                            <div>
                                <p className={"font-medium text-gray-800"}>Accepted Items:</p>
                                <ul className={"list-inside list-disc"}>
                                    <li>You can drop whatever you want.</li>
                                    <li>Limited to 40 items to avoid wastage.</li>
                                </ul>
                            </div>

                            {/*<div className={""}>*/}
                            {/*    <p className={"font-medium  text-gray-800"}>Features:</p>*/}
                            {/*    <div className={"flex space-x-3 text-gray-700 mt-2 text-lg"}>*/}
                            {/*        **/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function prettyRound(num, decimals) {
    return parseFloat(num.toFixed(decimals));
}

const Donate = () => {
    //
    // let goodData = []
    // data.map((item, index) => {
    //     item.location.latitude = prettyRound(item.location.latitude + (Math.random() * 0.01), 6)
    //     item.location.longitude = prettyRound(item.location.longitude + (Math.random() * 0.01), 6)
    //     item.location.geohash = geohashForLocation([item.location.latitude, item.location.longitude])
    //     goodData.push(item)
    // })
    // console.log({goodData})
    //
    // goodData.map((item, index) => {
    //     addDoc(collection(db, "requests"), item).then(() => {
    //         console.log(`Document successfully written! ${index}`);
    //     }).catch(e => {
    //         console.log(e)
    //     })
    // })
    //

    const steps = ["Location", "Selection", "Details", "Pickup", "Done"];
    const [current, setCurrent] = useState(0);
    const [stepsDone, setStepsDone] = useState([]);

    useEffect(() => {
        console.log("current", current);
    }, [current]);

    const next = () => {
        setStepsDone([...stepsDone, current]);
        setCurrent(current + 1);
    };

    const form = {
        location: {
            lat: 0,
            lng: 0,
            address: "",
        },
        details: {},
    };

    const [donateData, setDonateData] = useState({
        location: {
            address: "",
            lat: 0,
            lng: 0,
        },
        pickup_type: "",
        pickup_items: {},
        final_details: {},
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const prev = () => {
        setStepsDone(stepsDone.filter((step) => step !== current));
        setCurrent(current - 1);
    };

    const {confetti} = useConfetti();
    let arr = [];

    const mapToArray = () => {
        return new Promise((resolve, reject) => {
            try {
                const orderDetails = donateData;
                const requestIds = orderDetails.request_ids;
                const category = orderDetails.category;

                let itemsDonated = donateData.pickup_items.filter(
                    (obj) => obj.title === category
                )[0].count;
                console.log({itemsDonated});
                let uid = "";

                console.log({collection});
                console.log({orderDetails});
                console.log({requestIds});
                console.log({category});
                console.log({orderDetails});
                requestIds.map(async (requestId) => {
                    console.log({requestId});

                    const q = query(
                        collection(db, "requests"),
                        where("requestId", "==", requestId)
                    );

                    const qs = await getDocs(q);
                    if (qs.empty) {
                        console.log("No matching documents. ahan");
                        reject("No matching documents. ahan");
                    } else {
                        let d = qs.docs[0].data();
                        console.log("Loda", d);
                        qs.forEach((doc) => {
                            console.log(doc.id, " => ", doc.data());
                            const requestData = doc.data();
                            const ngoId = requestData.ngo_id;
                            const q = query(
                                collection(db, "users"),
                                where("ngo_id", "==", ngoId)
                            );
                            console.log({ngoId});
                            getDocs(q).then((querySnapshot) => {
                                if (querySnapshot.empty) {
                                    console.log("No matching documents. lol");
                                    reject("No matching documents. lol");
                                } else {
                                    console.log("Document data NGO:");
                                    querySnapshot.forEach((docu) => {
                                        console.log(docu.id, " => ", docu.data());
                                        const ngoData = docu.data();
                                        const lastUpdatedCategories = ngoData.lastUpdatedCategories;
                                        uid = ngoData.uid;
                                        let obj = {};
                                        obj[uid] = {...lastUpdatedCategories, docId: doc.id};

                                        console.log({obj});
                                        arr.push(obj);
                                        resolve();
                                    });
                                }
                            });
                        });
                    }
                });
            } catch (err) {
                console.log(err);
            }
        });
    };

    const processRequest = async () => {
        try {
            await mapToArray();
            console.log("accccccaaa");
            arr = arr.slice().sort((a, b) => {
                return a.data[category] - b.data[category];
            });
            console.log("wr", arr);
            const orderDetails = donateData;
            const category = orderDetails.category;

            console.log({orderDetails, category, donateData});
            let itemsDonated = donateData.pickup_items.filter(
                (obj) => obj.title === category
            )[0].count;
            console.log({itemsDonated});
            for (let i = 0; i < itemsDonated; i++) {
                let obj = arr[i];
                console.log("dw", obj);
                let uid = obj[0][i];
                console.log({uid});
                let uidData = obj[uid];
                const docId = uidData.docId;
                delete uidData.docId;
                const ngoRef = doc(db, "users", uid);
                const requestRef = doc(db, "requests", docId);
                uidData[category] = uidData[category] + 1;
                await updateDoc(ngoRef, {lastUpdatedCategories: data});
                await updateDoc(requestRef, {
                    fulfilledUnits: increment(1),
                });
                message.success("Request processed successfully");
                console.log("Request processed successfully");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const [finalModalVisible, setFinalModalVisible] = useState(false);
    useEffect(() => {
        console.log("Donation data", donateData);
        if (formSubmitted) {
            //  processRequest();
            confetti.start();
            setTimeout(() => {
                setFinalModalVisible(true);
                setTimeout(() => {
                    setFinalModalVisible(false);
                }, 3000);
            }, 2000);
            setStepsDone([...stepsDone, current]);
        }
    }, [formSubmitted, donateData]);

    const [selectedPickUpType, setSelectedPickUpType] = useState(null);

    return (
        <div
            className={
                "container my-10 flex flex-col items-center justify-center px-3 md:mx-auto"
            }
        >
            <div className={"mx-auto w-full"}>
                <Stepper steps={steps} currentStep={current} stepsDone={stepsDone}/>
            </div>
            <div
                className={
                    "bg-gray-10 mx-3 mt-8 w-full rounded-md  border border-dashed  border-gray-300"
                }
            >
                {current === 0 && !formSubmitted && (
                    <div>
                        <h2 className="pt-4 text-center text-lg font-semibold text-gray-600">
                            Your location helps us reach you
                        </h2>
                        <p className={"-mb-6 px-4 text-center text-sm text-gray-500"}>
                            Automatic detect requires location access.
                        </p>
                        <div className={"pt-10 pb-20"}>
                            {current === 0 && (
                                <LocationStep
                                    donationData={donateData}
                                    setDonationData={setDonateData}
                                />
                            )}
                        </div>
                    </div>
                )}
                {current === 1 && !formSubmitted && (
                    <div>
                        <h2 className="pt-4 text-center text-lg font-semibold text-gray-600">
                            NGOs that are in need
                        </h2>
                        <div className={"pt-10 pb-20"}>
                            {current === 1 && (
                                <SelectionStep
                                    donationData={donateData}
                                    setDonationData={setDonateData}
                                    setSelectedPickUpType={setSelectedPickUpType}
                                    // lat={donateData.location.lat} lng={donateData.location.lng}
                                    lat={28.53584}
                                    lng={77.395995}
                                    range={100}
                                />
                            )}
                        </div>
                    </div>
                )}
                {current === 2 && !formSubmitted && (
                    <div>
                        <h2 className="pt-4 text-center text-lg font-semibold text-gray-600">
                            How does the pickup look like?
                        </h2>
                        <p className={"-mb-6 px-4 text-center text-sm text-gray-500"}>
                            Choosing a larger than necessary shipping size will result in slower deliveries.
                        </p>
                        <div className={"pt-10 pb-20"}>
                            {current === 2 && (
                                <DetailsStep
                                    donationData={donateData}
                                    setDonationData={setDonateData}
                                    setSelectedPickUpType={setSelectedPickUpType}
                                />
                            )}
                        </div>
                    </div>
                )}

                {current === 3 && !formSubmitted && (
                    <div>
                        <h2 className="pt-4 text-center text-lg font-semibold text-gray-600">
                            Add the details of your pickup
                        </h2>
                        <p className={"-mb-6 px-4 text-center text-sm text-gray-500"}>
                            Donations are currently limited to 40 pieces due to high supply.
                        </p>
                        <div className={"pt-10 pb-20"}>
                            {current === 3 && (
                                <PickupStep
                                    donationData={donateData}
                                    setDonationData={setDonateData}
                                    max={selectedPickUpType === "light" ? 20 : 40}
                                />
                            )}
                        </div>
                    </div>
                )}
                {current === 4 && !formSubmitted && (
                    <div>
                        <h2 className="pt-4 text-center text-lg font-semibold text-gray-600">
                            Schedule the Pickup
                        </h2>
                        <p className={"-mb-6 px-4 text-center text-sm text-gray-500"}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
                            architecto fuga voluptates! A asperiores consequuntur culpa cumque
                            excepturi iusto voluptas?
                        </p>
                        <div className={"pt-10 pb-20"}>
                            {current === 4 && (
                                <PlaceOrderStep
                                    donationData={donateData}
                                    setDonationData={setDonateData}
                                    setFormSubmitted={setFormSubmitted}
                                />
                            )}
                        </div>
                    </div>
                )}

                {formSubmitted && (
                    <div>
                        <img src={'success.svg'} alt={'success'} className={'w-20 mx-auto py-10'}/>
                        <h2 className="pt-4 text-center text-lg font-semibold text-gray-600">
                            Pickup Scheduled Successfully
                        </h2>
                        <p className={"-mb-6 px-4 text-center text-sm text-gray-500"}>
                            Set a reminder so you don&apos;t miss your pickup!
                        </p>
                        <div className={"pt-10 pb-20"}>
                            {current === 5 && (
                                <div
                                    className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 lg:mb-16">
                                    <button
                                        onClick={() => {
                                            console.log("Router");
                                        }}
                                        className="mx-4 inline-flex items-center justify-center rounded-lg bg-green-600 py-3
                            px-5 text-center text-base font-medium text-white focus:ring-4
                            focus:ring-green-300 hover:bg-green-800 dark:focus:ring-green-900"
                                    >
                                        See Pickups
                                        <svg
                                            className="ml-2 -mr-1 h-5 w-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {finalModalVisible && (
                <Modal
                    title={"We are processing your request"}
                    setModalState={setFinalModalVisible}
                    modalState={finalModalVisible}
                >
                    <div
                        className={
                            "flex flex-col items-center justify-center  space-y-8 text-center"
                        }
                    >
                        <svg
                            aria-hidden="true"
                            className="mr-2 mt-5 inline h-8 w-8 animate-spin fill-green-600 text-gray-200 dark:text-gray-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <div>
                            <h1 className={"text-sm font-medium text-gray-700"}>
                                Our systems are ingesting and processing your request. Please be
                                patient...
                            </h1>
                        </div>
                    </div>
                </Modal>
            )}
            <div className={"my-5 flex w-full justify-start"}>
                {current > 0 && !formSubmitted && (
                    <Button
                        type={"dashed"}
                        style={{margin: "0 8px"}}
                        onClick={() => prev()}
                    >
                        Previous
                    </Button>
                )}
                {current === steps.length && (
                    <Button onClick={() => message.success("Processing complete!")}>
                        Done
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button loading={false} onClick={() => next()}>
                        Next
                    </Button>
                )}
            </div>
        </div>
    );
};

Donate.pageLayout = TabsLayout;
export default Donate;
