import {useCallback, useEffect, useRef, useState} from "react";
import {GoogleMap, MarkerF, useJsApiLoader} from '@react-google-maps/api';
import Autocomplete from "react-google-autocomplete";
import {Stepper} from "../components";
import {Button, Card, message, Skeleton} from "antd";
import {RiBook2Fill, RiHome5Fill, RiPencilRulerFill} from "react-icons/ri";
import {MdChair, MdToys,} from "react-icons/md";
import {IoShirt,} from "react-icons/io5";
import {ImSpoonKnife,} from "react-icons/im";
import {GiConverseShoe,} from "react-icons/gi";
import {BsLaptop,} from "react-icons/bs";
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import Meta from "antd/lib/card/Meta";
import TextArea from "antd/lib/input/TextArea";


const NEXT_PUBLIC_GOOGLE_MAP_KEY = "AIzaSyCgYjkne3uY7GrA0TcAGIGqof4tmCYkr9I"
const LocationStep = () => {
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
                if (antInputRef.current) { // @ts-ignore
                    console.log({sd: antInputRef.current})
                    latlngAddressRef.current.innerText = data.results[0].formatted_address
                    antInputRef.current.value = (data.results[0].formatted_address);
                }
            }
        })
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

const PlaceOrderStep = () => {

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
                <h1 className={"text-base my-4 font-bold text-gray-700 dark:text-white"}>1. Choose your Pickup Slot</h1>
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
                <h1 className={"text-base my-4 font-bold text-gray-700 dark:text-white"}>2. Notes for the pickup person</h1>
                <div>
                    <TextArea placeholder={"Any special notes for the pickup...?"} rows={4} />
                </div>
            </div>
        </div>
    )
}

const PickupStep = ({max}) => {

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


const DetailsStep = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);
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
                                <li>You can drop whatever you want</li>
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

    const prev = () => {
        setStepsDone(stepsDone.filter((step) => step !== current))
        setCurrent(current - 1);
    };

    return (<div className={"container md:mx-auto my-10 flex flex-col items-center justify-center px-3"}>
        <div className={"mx-auto w-full"}>
            <Stepper steps={steps}
                     currentStep={current} stepsDone={stepsDone}/>
        </div>
        <div className={"rounded-md border border-gray-300 border-dashed bg-gray-10  mx-3 mt-8  w-full"}>
            {current === 0 && (<div>
                <h2 className="text-center text-lg font-semibold text-gray-600 pt-4">Your location helps us reach
                    you</h2>
                <p className={"text-center text-gray-500 text-sm px-4 -mb-6"
                }>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto fuga voluptates! A
                    asperiores consequuntur culpa cumque excepturi iusto voluptas?</p>
                <div className={"pt-10 pb-20"}>
                    {current === 0 && (<LocationStep/>)}
                </div>
            </div>)}
            {current === 1 && (<div>
                <h2 className="text-center text-lg font-semibold text-gray-600 pt-4">How does the pickup look like?</h2>
                <p className={"text-center text-gray-500 text-sm px-4 -mb-6"
                }>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto fuga voluptates! A
                    asperiores consequuntur culpa cumque excepturi iusto voluptas?</p>
                <div className={"pt-10 pb-20"}>
                    {current === 1 && (<DetailsStep/>)}
                </div>
            </div>)}
            {current === 2 && (<div>
                <h2 className="text-center text-lg font-semibold text-gray-600 pt-4">Add the details of your pickup</h2>
                <p className={"text-center text-gray-500 text-sm px-4 -mb-6"
                }>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto fuga voluptates! A
                    asperiores consequuntur culpa cumque excepturi iusto voluptas?</p>
                <div className={"pt-10 pb-20"}>
                    {current === 2 && (<PickupStep max={5}/>)}
                </div>
            </div>)}
            {current === 3 && (<div>
                <h2 className="text-center text-lg font-semibold text-gray-600 pt-4">Schedule the Pickup</h2>
                <p className={"text-center text-gray-500 text-sm px-4 -mb-6"
                }>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto fuga voluptates! A
                    asperiores consequuntur culpa cumque excepturi iusto voluptas?</p>
                <div className={"pt-10 pb-20"}>
                    {current === 3 && (<PlaceOrderStep/>)}
                </div>
            </div>)}
        </div>
        <div className={"flex justify-start w-full my-5"}>


            {current > 0 && (<Button type={"dashed"} style={{margin: '0 8px'}} onClick={() => prev()}>
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