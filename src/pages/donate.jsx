import React, {useCallback, useEffect, useRef, useState} from "react";
import {GoogleMap, MarkerF, useJsApiLoader} from '@react-google-maps/api';
import Autocomplete from "react-google-autocomplete";
import {Stepper, useConfetti} from "../components";
import {Button, Card, message, Skeleton} from "antd";
import {RiBook2Fill, RiHome5Fill, RiMapPin3Fill, RiPencilRulerFill} from "react-icons/ri";
import {MdChair, MdToys,} from "react-icons/md";
import {IoShirt,} from "react-icons/io5";
import {ImSpoonKnife,} from "react-icons/im";
import {GiConverseShoe,} from "react-icons/gi";
import {BsLaptop,} from "react-icons/bs";
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import Meta from "antd/lib/card/Meta";
import TextArea from "antd/lib/input/TextArea";
import {db} from "../firebase";
import {addDoc, collection} from "firebase/firestore";


const NEXT_PUBLIC_GOOGLE_MAP_KEY = "AIzaSyCgYjkne3uY7GrA0TcAGIGqof4tmCYkr9I"
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
        lat: 21.7679, lng: 78.8718
    };
    const latlngAddressRef = useRef(null);
    const [location, setLocation] = useState(null)
    const antInputRef = useRef(null);

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script', libraries: ["places"], googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAP_KEY
    })

    const [map, setMap] = useState(null);

    useEffect(() => {
        if (location) {
            getAddressFromLatLng(location.lat, location.lng)
        }
        console.log("location", location)
        return () => {
        };
    }, [location]);

    // @ts-ignore
    const onLoad = useCallback((map) => setMap(map), []);
    // @ts-ignore
    const onUnmount = useCallback((map) => setMap(null), []);

    const containerStyle = {
        height: '400px'
    }
    const position = {
        lat: 37.772, lng: -122.214
    }
    const onMarkerDragEnd = (coord, index) => {
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        console.log('lat, lng: ', lat, lng)
        setLocation({lat, lng})
    };

    const getAddressFromLatLng = (lat, lng) => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${NEXT_PUBLIC_GOOGLE_MAP_KEY}`).then(r => r.json()).then((data) => {
            if (data.results) {
                console.log(data.results[0].formatted_address)
                setDonationData({
                    ...donationData, location: {
                        lat: location.lat,
                        lng: location.lng,
                        address: data.results[0].formatted_address
                    }
                })
                if (antInputRef.current) { // @ts-ignore
                    console.log({sd: antInputRef.current})
                    latlngAddressRef.current.innerText = data.results[0].formatted_address
                    antInputRef.current.value = (data.results[0].formatted_address);
                }
            }
        })
    }

    const getCurrentLocation = () => {
        if ('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({coords}) => {
                const {latitude, longitude} = coords;
                setLocation({
                    lat: latitude, lng: longitude
                })
            })
        } else {
            message.error("Geolocation is not supported on the browser.")
        }
    }
    return (<div>
        <div className={""}>
            {!location && (<div className="flex flex-col justify-center items-center">
                <label htmlFor="address"
                       className="block  mx-auto w-full text-center mb-2 text-sm font-medium text-gray-600 dark:text-white">Your
                    Address</label>
                <Autocomplete
                    className={"shadow-sm mx-auto w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light placeholder-gray-300"}
                    style={{width: "250px"}}
                    ref={antInputRef}
                    apiKey={NEXT_PUBLIC_GOOGLE_MAP_KEY}
                    onPlaceSelected={(place) => {
                        console.log(place)
                        if (place) {
                            let latitude = place.geometry.location.lat();
                            let longitude = place.geometry.location.lng();
                            setLocation({lat: latitude, lng: longitude})
                            console.log({latitude, longitude})
                        }
                        if (antInputRef.current) { // @ts-ignore
                            console.log({sd: antInputRef.current})
                            antInputRef.current.value = (place?.formatted_address);
                        }

                    }}
                    options={{
                        types: ["geocode", "establishment"],
                    }}
                    placeholder={"Building name, Block #, Area..."}

                />
                <div>
                    <div className={"flex justify-center items-center space-x-3 my-6 text-gray-400"}>
                        <p>----- or -----</p>
                    </div>

                    <button onClick={() => {
                        getCurrentLocation()
                    }
                    }
                            className="inline-flex items-center justify-center rounded-lg bg-green-600 py-3 px-5 text-center text-base font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
                    >
                        Get Current Location
                        <RiMapPin3Fill className={"ml-2"}/>
                    </button>
                </div>
            </div>)}
            {(isLoaded && location) && (<div className={"max-w-xl h-96 mx-auto rounded-lg flex flex-col"}>
                <p ref={latlngAddressRef} className={"text-center text-sm text-gray-500 px-4 mb-4"}>Loading...</p>
                <p onClick={() => setLocation(null)}
                   className={"text-center text-sm text-red-500 underline cursor-pointer px-4 mb-4"}>Retry</p>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={location ? location : center}
                    zoom={15}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    <MarkerF
                        draggable={true}
                        onDra
                        onDragEnd={onMarkerDragEnd}
                        onLoad={onLoad}
                        position={location ? location : center}
                    />
                </GoogleMap>
                <p onClick={() => setLocation(null)}
                   className={"text-center text-sm text-gray-500 underline cursor-pointer px-4 mt-4 -mb-4"}>Drag the
                    marker to set the location.</p>
            </div>)}
        </div>
    </div>)
}

const PlaceOrderStep = ({setFormSubmitted, setDonationData, donationData}) => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        setLoading(true)
        const fData = new FormData(event.currentTarget);
        event.preventDefault();
        let data = {};
        for (let [key, value] of fData.entries()) {
            console.log(key, value);
            data[key] = value
        }
        try {
            const dataWithTime = {
                ...data, time: Math.floor((new Date().getTime()) / 1000), status: "uploaded",
                order_id: Math.floor((new Date().getTime()) / 1000), pickup_time: selectedDate
            }
            const entireData = {...donationData, final_details: dataWithTime}
            setDonationData(entireData)
            console.log({...entireData})
            const docRef = await addDoc(collection(db, "orders"), {...entireData})
            console.log("Document written with ID: ", docRef.id);
            setFormSubmitted(true)
        } catch (error) {
            console.log({error})
            message.error(error?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    };


    const date_time = [
        {"date": "3rd February, 2023", "time": ["10:30 PM", "11:30 PM", "12:30 PM"]},
        {"date": "4rd February, 2023", "time": ["10:30 PM", "11:30 PM", "12:30 PM"]},
        {"date": "5rd February, 2023", "time": ["10:30 PM", "11:30 PM", "12:30 PM"]}
    ]

    const [selectedDate, setSelectedDate] = useState(null)

    const SlotChip = ({time, onClick, key, highlighted}) => {
        return (
            <div key={key} onClick={() => {
                onClick()
            }}
                 className={`flex justify-center cursor-pointer px-3 py-2 items-center rounded-md text-sm border w-fit border border-2 border-gray-300 ${highlighted ? 'border-green-600 ' : ''}`}>
                <p>{time}</p>
            </div>
        )
    }


    useEffect(() => {
        console.log(selectedDate)
    }, [selectedDate]);


    return (
        <div className={"flex flex-col justify-center mx-4"}>
            <div className={"text-start flex flex-col space-y-4"}>
                <h1 className={"text-base my-4 font-bold text-gray-700 dark:text-white"}>1. Choose your Pickup
                    Slot</h1>
                {date_time.map((date, index) => {
                    return (
                        <div key={index}>
                            <p className={"text-sm mb-2 text-gray-400"}>- {date.date}</p>
                            {
                                <div className={"flex space-x-2"}>{
                                    date.time.map((time, index) => {
                                        return (
                                            <SlotChip
                                                highlighted={selectedDate && selectedDate === `${date.date},${time}`}
                                                onClick={
                                                    () => {
                                                        setSelectedDate(`${date.date},${time}`)
                                                    }
                                                } key={index} time={time}/>
                                        )
                                    })
                                }
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
            <div className={"text-start flex flex-col space-y-4 mt-6"}>
                <h1 className={"text-base my-4 font-bold text-gray-700 dark:text-white"}>2. Notes for the pickup
                    person</h1>
                <div>
                    <TextArea placeholder={"Any special notes for the pickup...?"} rows={4}/>
                </div>
            </div>
            <div>
                <section className="bg-white dark:bg-gray-900">
                    <div className={"text-start flex flex-col space-y-4 mt-6"}>
                        <h1 className={"text-base my-4 font-bold text-gray-700 dark:text-white"}>2. Notes for the
                            pickup
                            person</h1>
                    </div>
                    <div className="pb-8 pt-4 mx-auto max-w-2xl lg:py-16">
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="sm:col-span-2">
                                    <label htmlFor="name"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" name="name" id="name"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                           placeholder="Type product name" required=""/>
                                </div>
                                <div className={"flex space-x-4"}>
                                    <div className="w-full">
                                        <label htmlFor="email"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="text" name="email" id="email"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                               placeholder="Email" required=""/>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="pincode"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pincode</label>
                                        <input type="text" pattern="\d*" minLength={"6"} name="pincode" id="pincode"
                                               maxLength={6}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                               placeholder="Pincode" required=""/>
                                    </div>
                                </div>
                                <div className={"flex space-x-4"}>
                                    <div className="w-full">
                                        <label htmlFor="flat_no"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Flat/
                                            Door No.</label>
                                        <input type="text" name="flat_no" id="flat_no" minLength={1}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                               placeholder="Flat/ Door no." required=""/>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="flat_no"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                        <input type="text" name="city" id="city" minLength={1}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                               placeholder="City" required=""/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="address"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <input type="text" name="address" id="address" minLength={1}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                                           placeholder="Address" required=""/>
                                </div>
                                <div className="flex items-center mb-4">
                                    <input checked id="terms" type="checkbox" value=""
                                           className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="checkbox-1"
                                           className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I
                                        agree to the <a href="#"
                                                        className="text-green-600 hover:underline dark:text-green-500">terms
                                            and conditions</a>.</label>
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
    )
}

const PickupStep = ({max, donationData, setDonationData}) => {

    const [items, setItems] = useState([
        {
            title: "Clothes",
            icon: <IoShirt size={20} className={"flex justify-center items-center"}/>,
            description: "You can add the number of clothes you want to donate",
            count: 0
        }, {
            title: "Shoes",
            icon: <GiConverseShoe size={20} className={"flex justify-center items-center"}/>,
            description: "You can add the number of shoes you want to donate",
            count: 0
        }, {
            title: "Books",
            icon: <RiBook2Fill size={20} className={"flex justify-center items-center"}/>,
            description: "You can add the number of books you want to donate",
            count: 0
        }, {
            title: "Toys",
            icon: <MdToys size={20} className={"flex justify-center items-center"}/>,
            description: "You can add the number of toys you want to donate",
            count: 0
        }, {
            title: "Electronics",
            icon: <BsLaptop size={20} className={"flex justify-center items-center"}/>,
            description: "You can add the number of devices you want to donate",
            count: 0
        },
        {
            title: "Other",
            icon: <IoShirt size={20} className={"flex justify-center items-center"}/>,
            description: "Have something else you want to donate? Add it here.",
            count: 0
        }
    ])
    useEffect(() => {
        setDonationData({
            ...donationData, pickup_items: items.map(item => {
                return {
                    title: item.title,
                    count: item.count
                }
            })
        })
        console.log("items", items)
        console.log("total", getTotalSelectedItems())
    }, [items]);

    const getTotalSelectedItems = () => {
        return items.reduce((acc, item) => {
            return acc + item.count
        }, 0)
    }

    return (
        <div className={"p-4"}>
            <div>
                <h3 className={"mx-auto text-center mb-5 font-semibold"}>{`${getTotalSelectedItems()} / ${max} `}<span
                    className={"font-normal block"}>selected</span></h3>
                <div className={"grid grid-cols-1 p-4 space-y-3"}>
                    {items.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Card key={index}
                                  className={"mx-auto"}
                                  actions={[
                                      <MinusOutlined onClick={() => {
                                          if (getTotalSelectedItems() > 0) {
                                              message.success("Removed from bag!")
                                              setItems(items.map((item, i) => {
                                                  if (i === index) {
                                                      return {...item, count: item.count - 1}
                                                  }
                                                  return item
                                              }))
                                          } else {
                                              message.error("You can't remove more items!")
                                          }
                                      }} key="plus"/>,
                                      <PlusOutlined onClick={() => {
                                          if (getTotalSelectedItems() < max) {
                                              message.success("Added to bag!")
                                              setItems(items.map((item, i) => {
                                                  if (i === index) {
                                                      return {...item, count: item.count + 1}
                                                  }
                                                  return item
                                              }))
                                          } else {
                                              message.error("You can't add more items!")
                                          }
                                      }} key="minus"/>,
                                  ]}>
                                <Skeleton loading={false} avatar active>
                                    <Meta
                                        avatar={item.icon}
                                        title={item.title}
                                        description={item.description}
                                    />
                                </Skeleton>
                            </Card>)
                    })}

                </div>

            </div>
        </div>
    )
}


const DetailsStep = ({setSelectedPickUpType, donationData, setDonationData}) => {

    const [selectedCategory, setSelectedCategory] = useState("light")

    useEffect(() => {
        setSelectedPickUpType(selectedCategory)
        setDonationData({...donationData, pickup_type: selectedCategory})
    }, [selectedCategory])


    return (<div className={"flex flex-col space-y-3 py-6"}>
        <div onClick={() => {
            if (selectedCategory !== "light") setSelectedCategory("light")
            else setSelectedCategory(null)

        }} className={"flex flex-col justify-center items-center px-4"}>
            <div
                className={`hover:bg-gray-100 cursor-pointer transition transform duration-200 ease-in-out active:scale-95 rounded-md w-full px-6 py-5 flex items-center justify-between border ${selectedCategory === "light" ? 'border border-green-600 border-2' : ''}`}>
                <div>
                    <h2 className={"font-semibold text-gray-800"}>Light pickup (2 wheeler)</h2>
                    <div className={"text-sm mt-3 text-gray-500 flex flex-col space-y-2"}>
                        <div>
                            <p className={"font-medium text-gray-800"}>Accepted Items:</p>
                            <ul className={"list-disc list-inside flex space-x-4"}>
                                <li>Upto 22 clothes (10 Kg)</li>
                                <li>Same day pickup</li>
                            </ul>
                        </div>

                        <div className={""}>
                            <p className={"font-medium  text-gray-800"}>Features:</p>
                            <div className={"flex space-x-3 text-gray-700 mt-2 text-lg"}>
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
        <div onClick={() => {
            if (selectedCategory !== "heavy") setSelectedCategory("heavy")
            else setSelectedCategory(null)

        }} className={"flex flex-col justify-center items-center px-4"}>
            <div
                className={`hover:bg-gray-100 cursor-pointer transition transform duration-200 ease-in-out active:scale-95 rounded-md w-full px-6 py-5 flex items-center justify-between border ${selectedCategory === "heavy" ? 'border border-green-600 border-2' : ''}`}>
                <div>
                    <h2 className={"font-semibold text-gray-800"}>Heavy pickup (4 wheeler)</h2>
                    <div className={"text-sm mt-3 text-gray-500 flex flex-col space-y-2"}>
                        <div>
                            <p className={"font-medium text-gray-800"}>Accepted Items:</p>
                            <ul className={"list-disc list-inside"}>
                                <li>Upto 45 clothes (20 Kg)</li>
                                <li>Includes heavy items like appliances, furniture etc.</li>
                                <li>Takes 3-5 days</li>
                            </ul>
                        </div>

                        <div className={""}>
                            <p className={"font-medium  text-gray-800"}>Features:</p>
                            <div className={"flex space-x-3 text-gray-700 mt-2 text-lg"}>
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

        <div onClick={() => {
            if (selectedCategory !== "self") setSelectedCategory("self")
            else setSelectedCategory(null)
        }} className={"flex flex-col justify-center items-center px-4"}>
            <div
                className={`hover:bg-gray-100 cursor-pointer transition transform duration-200 ease-in-out active:scale-95 rounded-md w-full px-6 py-5 flex items-center justify-between border ${selectedCategory === "self" ? 'border border-green-600 border-2' : ''}`}>
                <div>
                    <h2 className={"font-semibold text-gray-800"}>Self Drop</h2>
                    <div className={"text-sm mt-3 text-gray-500 flex flex-col space-y-2"}>
                        <div>
                            <p className={"font-medium text-gray-800"}>Accepted Items:</p>
                            <ul className={"list-disc list-inside"}>
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
    </div>)
}

const Donate = () => {


    const steps = ["Location", "Details", "Pickup", "Place Order"]
    const [current, setCurrent] = useState(0);
    const [stepsDone, setStepsDone] = useState([])

    useEffect(() => {
        console.log("current", current)
    }, [current]);

    const next = () => {
        setStepsDone([...stepsDone, current])
        setCurrent(current + 1);
    };

    const form = {
        location: {
            lat: 0, lng: 0, address: ""
        }, details: {}

    }


    const [donateData, setDonateData] = useState({
        location: {
            address: "",
            lat: 0,
            lng: 0
        },
        pickup_type: "",
        pickup_items: {},
        final_details: {}
    })


    const [formSubmitted, setFormSubmitted] = useState(false)
    const prev = () => {
        setStepsDone(stepsDone.filter((step) => step !== current))
        setCurrent(current - 1);
    };

    const {confetti} = useConfetti();

    useEffect(() => {
        console.log("Donation data", donateData)
        if (formSubmitted) {
            confetti.start()
            setStepsDone([...stepsDone, current])
        }
    }, [formSubmitted, donateData]);


    const [selectedPickUpType, setSelectedPickUpType] = useState(null)


    return (<div className={"container md:mx-auto my-10 flex flex-col items-center justify-center px-3"}>
        <div className={"mx-auto w-full"}>
            <Stepper steps={steps}
                     currentStep={current} stepsDone={stepsDone}/>
        </div>
        <div className={"rounded-md border border-gray-300 border-dashed bg-gray-10  mx-3 mt-8  w-full"}>
            {(current === 0 && !formSubmitted) && (<div>
                <h2 className="text-center text-lg font-semibold text-gray-600 pt-4">Your location helps us reach
                    you</h2>
                <p className={"text-center text-gray-500 text-sm px-4 -mb-6"
                }>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto fuga voluptates! A
                    asperiores consequuntur culpa cumque excepturi iusto voluptas?</p>
                <div className={"pt-10 pb-20"}>
                    {current === 0 && (<LocationStep donationData={donateData} setDonationData={setDonateData}/>)}
                </div>
            </div>)}
            {(current === 1 && !formSubmitted) && (<div>
                <h2 className="text-center text-lg font-semibold text-gray-600 pt-4">How does the pickup look
                    like?</h2>
                <p className={"text-center text-gray-500 text-sm px-4 -mb-6"
                }>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto fuga voluptates! A
                    asperiores consequuntur culpa cumque excepturi iusto voluptas?</p>
                <div className={"pt-10 pb-20"}>
                    {current === 1 && (<DetailsStep donationData={donateData} setDonationData={setDonateData}
                                                    setSelectedPickUpType={setSelectedPickUpType}/>)}
                </div>
            </div>)}
            {(current === 2 && !formSubmitted) && (<div>
                <h2 className="text-center text-lg font-semibold text-gray-600 pt-4">Add the details of your
                    pickup</h2>
                <p className={"text-center text-gray-500 text-sm px-4 -mb-6"
                }>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto fuga voluptates! A
                    asperiores consequuntur culpa cumque excepturi iusto voluptas?</p>
                <div className={"pt-10 pb-20"}>
                    {current === 2 && (<PickupStep donationData={donateData} setDonationData={setDonateData}
                                                   max={selectedPickUpType === 'light' ? 20 : 40}/>)}
                </div>
            </div>)}
            {(current === 3 && !formSubmitted) && (<div>
                <h2 className="text-center text-lg font-semibold text-gray-600 pt-4">Schedule the Pickup</h2>
                <p className={"text-center text-gray-500 text-sm px-4 -mb-6"
                }>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto fuga voluptates! A
                    asperiores consequuntur culpa cumque excepturi iusto voluptas?</p>
                <div className={"pt-10 pb-20"}>
                    {current === 3 && (<PlaceOrderStep donationData={donateData} setDonationData={setDonateData}
                                                       setFormSubmitted={setFormSubmitted}/>)}
                </div>
            </div>)}

            {formSubmitted && (<div>
                <h2 className="text-center text-lg font-semibold text-gray-600 pt-4">Pickup Scheduled
                    Successfully</h2>
                <p className={"text-center text-gray-500 text-sm px-4 -mb-6"
                }>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto fuga voluptates! A
                    asperiores consequuntur culpa cumque excepturi iusto voluptas?</p>
                <div className={"pt-10 pb-20"}>
                    {current === 3 && (
                        <div
                            className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 lg:mb-16">
                            <button
                                onClick={() => {
                                    console.log("Router")
                                }
                                }
                                className="inline-flex items-center justify-center rounded-lg bg-green-600 py-3 px-5
                            text-center text-base font-medium text-white hover:bg-green-800 focus:ring-4
                            focus:ring-green-300 dark:focus:ring-green-900 mx-4"
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
            </div>)}
        </div>
        <div className={"flex justify-start w-full my-5"}>

            {(current > 0 && !formSubmitted) && (
                <Button type={"dashed"} style={{margin: '0 8px'}} onClick={() => prev()}>
                    Previous
                </Button>)}
            {current === steps.length && (<Button onClick={() => message.success('Processing complete!')}>
                Done
            </Button>)}
            {current < steps.length - 1 && (<Button loading={false} onClick={() => next()}>
                Next
            </Button>)}
        </div>
    </div>)
}
export default Donate