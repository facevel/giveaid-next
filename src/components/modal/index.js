import {useEffect, useRef, useState} from 'react';
import { RiCloseLine } from "react-icons/ri";

import {motion, AnimatePresence} from "framer-motion";

function Modal(props) {

    const modalRef = useRef(null);

    const handleClick = () => {
        props.setModalState(!props.setModalState);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                props.setModalState(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    //close modal on escape key press
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                props.setModalState(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return (
        <>
            <AnimatePresence>
            {
                props.modalState &&
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="fixed bottom-0 left-0 w-full h-[calc(100vh-5rem)] bg-gray-900 bg-opacity-60 backdrop-blur z-20">
                    <div className="relative flex items-center justify-center h-full mx-auto px-5">
                        {/*content*/}
                        <div
                            className={"h-auto"}
                            id={"modalContainer"}
                            ref={modalRef}
                        >

                        <motion.div
                            initial={{scale: .5}}
                            animate={{scale: 1}}
                            exit={{scale: .5}}
                            className="relative rounded-lg bg-white
                            max-h-[calc(100vh-10rem)]
                            max-w-lg dark:bg-gray-800 px-5 py-6
                            overflow-y-scroll
                            scrollbar scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent scrollbar-thumb-rounded-full
                            "
                        >
                            {/*header*/}
                            <button
                                className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none absolute right-1 top-1"
                                onClick={() => {
                                    props.setModalState(false);
                                }}
                            >
                            <span
                                title="close"
                                className="bg-transparent text-gray-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                <RiCloseLine/>
                            </span>
                            </button>
                            <div className="flex items-start justify-center border-solid rounded-t">
                                <h3 className="text-2xl font-semibold">
                                    {props.title}
                                </h3>
                            </div>
                            {/*body*/}
                            <div className="relative py-1 flex-auto">
                                {props.children}
                            </div>
                        </motion.div>
                </div>
                    </div>
                </motion.div>
            }
            </AnimatePresence>
        </>
    );
}

export default Modal;