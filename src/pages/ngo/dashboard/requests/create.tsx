import React, {useState} from "react";
import {NgoPageLayout} from "layouts";
import {addDoc, collection, getDocs, query, Timestamp, where} from "firebase/firestore";
import {db} from "@/firebase";
import {message} from "antd";
import {nanoid} from "nanoid";
import {useUserContext} from "@/firebase/authContext";
import {geohashForLocation} from "geofire-common";

interface requestForm {
    requestId: string;
    title: string;
    requestDate: Timestamp | string;
    fulfillmentMaxDate: Timestamp | string;
    requestedUnits: number;
    fulfilledUnits: number;
    requestedItem:
        | "Clothing"
        | "Electronics"
        | "Toys"
        | "Books"
        | "Food"
        | "Medical";
    priority: number;
    ngoId: string;
    location: {
        latitude: number;
        longitude: number;
        geohash: string;
        address: string;
    };
}

/*
 * Clothing - Cloths, Shoes, Socks, Undergarments, etc
 * Electronics - Mobiles, Laptops, Tablets, etc
 * Toys - Toys, Games, etc
 * Books - Books, Stationary, etc
 * Food - Food, Groceries, etc
 * Medical - Medical Supplies, etc
 * */

function App() {

    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {getNgoId, getNgoLocation} = useUserContext();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const ngo_id = await getNgoId();
            //check is user have already submitted a request for the same item
            const q = query(collection(db, "requests"), where("ngo_id", "==", ngo_id), where("requestedItem", "==", e.target.requestedItem.value));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => doc.data());
            if (querySnapshot.size > 0 && data[0].fulfilledUnits < data[0].requestedUnits) {
                message.error("You have already submitted a request for this item");
                setLoading(false);
                return; //stop execution
            }


            //convert form data to json
            const formData = new FormData(e.target);
            // @ts-ignore
            const requestData: requestForm = Object.fromEntries(formData.entries());
            requestData.fulfilledUnits = 0;
            //convert requestedUnits to number
            requestData.requestedUnits = parseInt(requestData.requestedUnits.toString());
            //change requestDate and fulfillmentMaxDate to firebase timestamp
            // @ts-ignore
            requestData.requestDate = Timestamp.fromDate(new Date(requestData.requestDate));
            requestData.requestId = nanoid(10);
            requestData.fulfillmentMaxDate = Timestamp.fromDate(
                // @ts-ignore
                new Date(requestData.fulfillmentMaxDate)
            );
            const location = await getNgoLocation();
            console.log({location});
            location.geohash = geohashForLocation([
                location.lat,
                location.lng,
            ]);
            console.log({ngo_id});

            console.log({
                ...requestData,
                ngo_id,
                location,
            });
            const docRef = await addDoc(collection(db, "requests"), {
                ...requestData,
                ngo_id,
                location,
            });
            console.log("Document written with ID: ", docRef.id);
            setIsSubmitted(true);
        } catch (error) {
            console.log({error});
            // @ts-ignore
            message.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

// const handleSubmit = (e: any) => {
//   e.preventDefault();
//   //convert form data to json
//   const formData = new FormData(e.target);
//   // @ts-ignore
//   const data: requestForm = Object.fromEntries(formData.entries());
//   data.location = NGORegisteredLocation;
//   data.fulfilled = false;
//   console.log(data);
// };

    return (
        <div className={"grid grid-cols-12 gap-2"}>
            <div
                className={
                    "relative col-span-12 flex h-52 w-full items-center justify-center overflow-hidden rounded-xl border-2 border border-green-600 bg-green-50"
                }
            >
                <img
                    src={"/banner-ngo.jpg"}
                    alt={"ngo-banner"}
                    className={"absolute w-full grayscale opacity-50  h-full object-cover"}
                />
                <div className={"absolute top-0 left-0 w-full p-5 shadow-inner shadow-lg"}>
          <span className={"text-green text-3xl font-bold"}>
            Empowering communities,
            <br/>
            inspiring change:
          </span>
                    <br/>
                    <span className={"text-green text-3xl font-bold"}>
            Let&apos;s make a difference together.
          </span>
                    <img src={"/giveaid-logo-green.svg"} alt={"giveaid"} className={"h-10 mt-2"}/>
                </div>
            </div>

            <div
                className={
                    "col-span-12 rounded-lg border-2 border border-gray-200 p-5"
                }
            >
                {
                    isSubmitted ? (
                            <div className={"flex flex-col gap-1 items-center justify-center"}>
                                <div className={'h-40 flex items-center justify-center'}>
                                    <img src={"/success.svg"} alt={"success"} className={"h-20"}/>
                                </div>
                                <span className={"text-2xl font-bold text-green-600"}>
              Request submitted successfully
            </span>
                                <span className={"text-lg text-gray-500"}>
              Your request has been submitted successfully.
            </span>

                            </div>
                        )
                        :
                        (
                            <form onSubmit={handleSubmit} className={"grid grid-cols-8 gap-x-5 gap-y-2"}>
                                <div className="col-span-8 flex flex-col">
                                    <label
                                        htmlFor="title"
                                        className=" text-lg font-medium text-gray-900 dark:text-white"
                                    >
                                        Title of the request
                                    </label>
                                    <input
                                        placeholder="Event/Drive Name or Donation Name"
                                        type="text"
                                        id="title"
                                        name="title"
                                        required={true}
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-lg text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                                    />
                                </div>
                                <div className="col-span-4 flex flex-col">
                                    <label
                                        htmlFor="requestDate"
                                        className=" text-lg font-medium text-gray-900 dark:text-white"
                                    >
                                        Request Date
                                    </label>
                                    <input
                                        type="date"
                                        id="requestDate"
                                        defaultValue={new Date().toISOString().split("T")[0]}
                                        name="requestDate"
                                        required={true}
                                        className={
                                            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-lg text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                                        }
                                    />
                                </div>
                                <div className="col-span-4 flex flex-col">
                                    <label
                                        htmlFor="fulfillmentMaxDate"
                                        className=" text-lg font-medium text-gray-900 dark:text-white"
                                    >
                                        Fulfillment Max Date
                                    </label>
                                    <input
                                        type="date"
                                        id="fulfillmentMaxDate"
                                        name="fulfillmentMaxDate"
                                        required={true}
                                        className={
                                            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-lg text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                                        }
                                    />
                                </div>
                                <div className="col-span-4 flex flex-col">
                                    <label
                                        htmlFor="requestedUnits"
                                        className=" text-lg font-medium text-gray-900 dark:text-white"
                                    >
                                        Requested Units
                                    </label>
                                    <input
                                        type="number"
                                        id="requestedUnits"
                                        name="requestedUnits"
                                        max={200}
                                        required={true}
                                        className={
                                            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-lg text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                                        }
                                    />
                                </div>
                                <div className="col-span-4 flex flex-col">
                                    <label
                                        htmlFor="requestedItem"
                                        className=" text-lg font-medium text-gray-900 dark:text-white"
                                    >
                                        Requested Item
                                    </label>
                                    <select
                                        id="requestedItem"
                                        name="requestedItem"
                                        required={true}
                                        className={
                                            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-lg text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                                        }
                                    >
                                        <option value="Clothing">Clothing</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Toys">Toys</option>
                                        <option value="Books">Books</option>
                                        <option value="Food">Food</option>
                                        <option value="Medical">Medical</option>
                                    </select>
                                </div>
                                <div className="col-span-4 flex flex-col">
                                    <label
                                        htmlFor="priority"
                                        className=" text-lg font-medium text-gray-900 dark:text-white"
                                    >
                                        Priority
                                    </label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        required={true}
                                        className={
                                            "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-lg text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                                        }
                                    >
                                        <option value="10">Low</option>
                                        <option value="50">Medium</option>
                                        <option value="100">High</option>
                                    </select>
                                </div>
                                <div className="col-span-4 flex flex-col justify-end">
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-green-500 py-3 px-4 font-bold text-white hover:bg-green-600"
                                    >
                                        {loading ? "Adding Request..." : "Submit"}
                                    </button>
                                </div>
                            </form>
                        )
                }
            </div>

            <div className={"col-span-8"}>

            </div>
        </div>
    );
}

App.pageLayout = NgoPageLayout;
export default App;
