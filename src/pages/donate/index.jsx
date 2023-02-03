// @flow
import * as React from 'react';
import geofire from 'geofire-common';
import {db} from "@/firebase";
import {collection, endAt, getDocs, orderBy, query, startAt} from "@firebase/firestore";
import {GoogleMap, MarkerF, useJsApiLoader} from "@react-google-maps/api";
import {message} from "antd";
import Autocomplete from "react-google-autocomplete";
import {RiMapPin3Fill} from "react-icons/ri";


const data = {}

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
                    center={center}
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
                <p onClick={() => setLocation(null)}
                   className={"text-center text-sm text-gray-500 underline cursor-pointer px-4 mt-4 -mb-4"}>Drag the
                    marker to set the location.</p>
            </div>)}
        </div>
    </div>)
}

export function Index() {


        return (
            <div>

            </div>
        );
    }