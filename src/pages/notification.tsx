// @flow
import * as React from "react";
import {useState} from "react";
import {TabsLayout} from "@/layouts";

const messages = [{
    "title": "Donation Received",
    "message": "Thank you for your generosity."
}, {
    "title": "Payment Confirmed",
    "message": "Your donations has been successfully processed."
}, {
    "title": "Making an Impact",
    "message": "We've received your donations! It's on its way to making a difference."
}, {
    "title": "Appreciation",
    "message": "Thanks for your donations! We appreciate your support."
}, {
    "title": "Tracking Impact",
    "message": "Your donations has been added to the impact tracker. See the difference you're making!"
}, {
    "title": "Thank You!",
    "message": "We're grateful for your donations and the difference it will make."
}, {
    "title": "Confirmation",
    "message": "Your donations has been confirmed. Thank you for your contribution."
}, {
    "title": "Support Received",
    "message": "Your donations will go a long way in supporting our cause. Thank you!"
}, {
    "title": "Making a Difference",
    "message": "With your donations, we're one step closer to creating a better world."
}, {
    "title": "Impact Acknowledged",
    "message": "Your donations has been acknowledged and will be put to good use. Thank you!"
}]


const Notification = () => {
    const [message, setMessages] = useState(messages);
    return (
        <div>
            <div className={"p-10 flex flex-col gap-5 "}>
                {
                    message.map((obj, index) => {
                        return (
                            <div id="toast-message-cta" key={index}
                                 className="w-full p-4 text-gray-500 bg-gray-50 rounded-md shadow dark:bg-gray-800
                                dark:text-gray-400"
                                 role="alert">
                                <div className="flex">
                                    <img className="w-8 h-8 rounded-full border"
                                         src="https://api.dicebear.com/5.x/personas/svg?seed=Lily"
                                         alt="Jese Leos image"/>
                                    <div className="ml-3 text-sm font-normal">
                                    <span
                                        className="mb-1 text-base font-semibold text-gray-700 dark:text-white">{obj.title}</span>
                                        <div className="mb-2 text-sm font-normal">{obj.message}
                                        </div>
                                        <a href="#"
                                           className="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-green-600 rounded-md hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">Reply</a>
                                    </div>
                                    <button type="button"
                                            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                                            data-dismiss-target="#toast-message-cta" aria-label="Close">
                                        <span className="sr-only">Close</span>
                                        <svg onClick={() => {
                                            //@ts-ignore
                                            setMessages((pre) => {
                                                pre.filter((item, i) => i !== index)
                                            })
                                        }
                                        } aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                             viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

Notification.pageLayout = TabsLayout;

export default Notification;