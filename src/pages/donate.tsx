import {Button, message, Steps} from "antd";
import {useCallback, useState} from "react";
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';

const LocationStep = () => {
    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const center = {
        lat: -3.745,
        lng: -38.523
    };

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ""
    })

    const [map, setMap] = useState(null)

    // @ts-ignore
    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        //map.fitBounds(bounds);

        setMap(map)
    }, [])
    // @ts-ignore
    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const position = {
        lat: 37.772,
        lng: -122.214
    }
    return (
        isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <Marker
                    onLoad={onLoad}
                    position={position}
                />
            </GoogleMap>
        ) : <></>
    )
}

const Donate = () => {
    const [current, setCurrent] = useState(0);
    const steps = [
        {
            title: 'Location',

        },
        {
            title: 'Donation Details',
        },
        {
            title: 'Schedule Pickup',
        },
        {
            title: 'Verification',
        },
        {
            title: "Place Order"
        }

    ]
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({key: item.title, title: item.title}));
    return (
        <div className={"container mx-auto my-10 flex flex-col items-center justify-center"}>
            <div className={"container mx-auto flex flex-col justify-center items-center mt-4"}>
                <Steps
                    items={items}
                    size="small"
                    current={0}
                />
            </div>
            <div className={"rounded-md bg-gray-100 p-6 my-8 w-full"}>
                {current === 0 && <LocationStep/>}
            </div>
            <div className={"flex justify-start w-full my-8"}>
                {current < steps.length - 1 && (
                    <Button onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button type={"dashed"} style={{margin: '0 8px'}} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    )
}
export default Donate