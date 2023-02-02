import React, { useEffect } from "react";
import {FormFlow, GoogleButton, Modal} from "components";
import { useUserContext } from "src/firebase/authContext";

export const LandingFormView = () => {
    const [modalOpen, setModalOpen] = React.useState(false)
    const { user } = useUserContext();

    useEffect(() => {
        if (user) {
            setModalOpen(false)
        }
    }, [user])

    return (
        <div className={"container mx-auto flex flex-col justify-center items-center "}>

            <Modal title={"Let's Start Donating"} setModalState={setModalOpen} modalState={modalOpen}>
                <div className="py-3 flex flex-col gap-5 items-center justify-center">
                    <p className="max-w-full text-center text-md">
                        Keep our site spam-free by logging in
                    </p>
                    <GoogleButton/>
                    <p className="max-w-sm text-center text-sm">
                        By creating an account, you agree to Giveaid's <a href="/terms-of-service"
                                                                                className="text-blue-500 hover:underline font-semibold">Terms
                        of Service</a>, <a href="/privacy-policy"
                                           className="text-blue-500 hover:underline font-semibold">Privacy
                        Policy</a> and <a href="/acceptable-use"
                                          className="text-blue-500 hover:underline font-semibold">Acceptable
                        Use Policy</a>.
                    </p>
                </div>
            </Modal>

            <section className="bg-white dark:bg-gray-900 min-h-screen">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <a href="#"
                       className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                       role="alert">
                        <span className="text-xs bg-green-600 rounded-full text-white px-4 py-1.5 mr-3">New</span>
                        <span className="text-sm font-medium">Realtime tracking of donations</span>
                        <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clip-rule="evenodd"></path>
                        </svg>
                    </a>
                    <p className="md:mb-4 text-4xl mb-2 font-extrabold leading-loose tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Donate
                        Locally,</p>

                    <div
                        className={"flex flex-col lg:flex-row -space-y-2 lg:space-y-0 mb-5 justify-center items-center"}>
                        <p className="text-4xl font-extrabold leading-loose tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Make
                            a difference</p> &nbsp; &nbsp;
                        <strong
                            className={"text-4xl font-extrabold leading-loose tracking-tight leading-none md:text-5xl lg:text-6xl text-green-600"}>Globally</strong>
                    </div>
                    <p className={"max-w-lg mx-auto  lg:text-lg"}>Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                        Asperiores eius eum facilis odit qui
                        quia! Consequuntur ratione recusandae saepe sint.</p>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"></p>
                    <div
                        className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <button onClick={() => setModalOpen(true)}
                                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900">
                            Get Started
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clip-rule="evenodd"></path>
                            </svg>
                        </button>
                        <a href="#"
                           className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                            </svg>
                            Watch video
                        </a>
                    </div>
                </div>
                <div>
                    <img className={"px-5 mx-auto"} src="/illus.svg" alt=""/>
                </div>
            </section>
            <div className={"mx-5 text-center lg:text-start"}>
                <hr className="border-gray-200 my-8 dark:border-gray-700 "/>
                <div className={"flex flex-col space-y-3 mx-2"}>
                    <p className={"font-bold text-3xl text-gray-700 lg:text-4xl"}>How does it work <span
                        className={"text-green-500"}>?</span></p>
                    <p className={"lg:text-lg"}>Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                        Accusantium aliquid at autem
                        consequuntur culpa cumque deleniti deserunt eligendi et expedita fugiat fugit harum hic
                        in ipsam labore laborum magnam mollitia nam natus, odit officia pariatur placeat quae
                        quisquam ratione recusandae rem repudiandae rerum velit, veniam veritatis vero
                        voluptatum! Nemo, obcaecati.</p>
                </div>
            </div>

            <div className={"mx-5 text-center lg:text-start"}>
                <hr className="border-gray-200  my-8  dark:border-gray-700 "/>
                <div className={"flex flex-col space-y-3 mx-2"}>
                    <p className={"font-bold text-3xl text-gray-700 lg:text-4xl"}>How does it work <span
                        className={"text-green-500"}>?</span></p>
                    <p className={" lg:text-lg"}>Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                        Accusantium aliquid at autem
                        consequuntur culpa cumque deleniti deserunt eligendi et expedita fugiat fugit harum hic
                        in ipsam labore laborum magnam mollitia nam natus, odit officia pariatur placeat quae
                        quisquam ratione recusandae rem repudiandae rerum velit, veniam veritatis vero
                        voluptatum! Nemo, obcaecati.</p>
                </div>
            </div>

            <div className={"mx-5 text-center lg:text-start"}>
                <hr className="border-gray-200  my-8  dark:border-gray-700 "/>
                <div className={"flex flex-col space-y-3 mx-2"}>
                    <p className={"font-bold text-3xl text-gray-700 lg:text-4xl"}>How does it work <span
                        className={"text-green-500"}>?</span></p>
                    <p className={" lg:text-lg"}>Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                        Accusantium aliquid at autem
                        consequuntur culpa cumque deleniti deserunt eligendi et expedita fugiat fugit harum hic
                        in ipsam labore laborum magnam mollitia nam natus, odit officia pariatur placeat quae
                        quisquam ratione recusandae rem repudiandae rerum velit, veniam veritatis vero
                        voluptatum! Nemo, obcaecati.</p>
                </div>
            </div>


            {/*              <div className="w-full lg:w-fit mx-auto">*/}
            {/*                  <div className="flex flex-col gap-5 justify-center">*/}
            {/*                      <button*/}
            {/*                          className="flex w-full transform items-center justify-center rounded-lg border text-gray-600 transition-colors duration-300 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"*/}
            {/*                          onClick={() => {*/}
            {/*                              alert("sfs")*/}
            {/*                          }}*/}
            {/*                      >*/}
            {/*                          <div className="px-4 py-2">*/}
            {/*                              <svg className="h-6 w-6" viewBox="0 0 40 40">*/}
            {/*                                  <path*/}
            {/*                                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"*/}
            {/*                                      fill="#FFC107"*/}
            {/*                                  />*/}
            {/*                                  <path*/}
            {/*                                      d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"*/}
            {/*                                      fill="#FF3D00"*/}
            {/*                                  />*/}
            {/*                                  <path*/}
            {/*                                      d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"*/}
            {/*                                      fill="#4CAF50"*/}
            {/*                                  />*/}
            {/*                                  <path*/}
            {/*                                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"*/}
            {/*                                      fill="#1976D2"*/}
            {/*                                  />*/}
            {/*                              </svg>*/}
            {/*                          </div>*/}

            {/*                          <span className="w-full px-1 py-3 text-center font-bold">*/}
            {/*  Continue with Google*/}
            {/*</span>*/}

            {/*                          {loggingIn ? (*/}
            {/*                                  <svg*/}
            {/*                                      className=" mr-4 h-6 w-6 animate-spin text-gray-400"*/}
            {/*                                      xmlns="http://www.w3.org/2000/svg"*/}
            {/*                                      fill="none"*/}
            {/*                                      viewBox="0 0 24 24"*/}
            {/*                                  >*/}
            {/*                                      <circle*/}
            {/*                                          className="opacity-25"*/}
            {/*                                          cx="12"*/}
            {/*                                          cy="12"*/}
            {/*                                          r="10"*/}
            {/*                                          stroke="currentColor"*/}
            {/*                                          strokeWidth="4"*/}
            {/*                                      ></circle>*/}
            {/*                                      <path*/}
            {/*                                          className="opacity-75"*/}
            {/*                                          fill="currentColor"*/}
            {/*                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"*/}
            {/*                                      ></path>*/}
            {/*                                  </svg>*/}
            {/*                              ) :*/}
            {/*                              <div className={"w-6 h-6 px-4 py-2"}></div>*/}
            {/*                          }*/}
            {/*                      </button>*/}
            {/*                  </div>*/}
            {/*              </div>*/}
            {/*</div>*/}
            {/*<div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">*/}
            {/*    <form className={"mt-7"} onSubmit={(e) => {*/}
            {/*        e.preventDefault();*/}
            {/*    }*/}
            {/*    }>*/}
            {/*        <div className="mb-6">*/}
            {/*            <div*/}
            {/*                className="after:block after:bg-transparent after:border-r-2 after:border-dashed after:border-black after:w-[1px] after:h-10 after:mx-auto after:my-5">*/}
            {/*                <label htmlFor="text"*/}
            {/*                       className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Pickup*/}
            {/*                    Location</label>*/}
            {/*                <div className={"flex space-x-6 text-gray-500 justify-center items-center"}>*/}
            {/*                    <input type="email" id="email"*/}
            {/*                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
            {/*                           placeholder="Dwarka, New Delhi"/>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <label htmlFor="text"*/}
            {/*                   className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Items to*/}
            {/*                Donate*/}
            {/*            </label>*/}
            {/*            <div className={"flex space-x-6 text-gray-500 justify-center items-center"}>*/}
            {/*                <select id="email"*/}
            {/*                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
            {/*                        placeholder="name@flowbite.com">*/}
            {/*                    <option value="1">Food</option>*/}
            {/*                    <option value="2">Clothes</option>*/}
            {/*                    <option value="3">Books</option>*/}
            {/*                    <option value="4">Furniture</option>*/}
            {/*                    <option value="5">Other</option>*/}
            {/*                </select>*/}
            {/*            </div>*/}
            {/*            <button onClick={() => {*/}
            {/*                toast.success("Thank you for reaching out to us. We will get back to you soon.")*/}
            {/*            }}*/}
            {/*                    className="inline-flex my-5 justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900">*/}
            {/*                Proceed to Donate*/}
            {/*                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"*/}
            {/*                     xmlns="http://www.w3.org/2000/svg">*/}
            {/*                    <path fill-rule="evenodd"*/}
            {/*                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"*/}
            {/*                          clip-rule="evenodd"></path>*/}
            {/*                </svg>*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </form>*/}
            {/*</div>*/}

        </div>
    )
}