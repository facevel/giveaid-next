import React, { useEffect } from "react";
import { GoogleButton, Modal } from "components";
import { useUserContext } from "src/firebase/authContext";
import { useRouter } from "next/router";

export const LandingFormView = () => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const { user } = useUserContext();

    const router = useRouter();
    useEffect(() => {
        if (user) {
            router.push("/donate");
            setModalOpen(false);
        }
    }, [user]);

    return (
      <div
        className={"container mx-auto flex flex-col items-center justify-center "}
      >
          {modalOpen && (
            <Modal
              title={"Let's Start Donating"}
              setModalState={setModalOpen}
              modalState={modalOpen}
            >
                <div className="flex flex-col items-center justify-center gap-5 py-3">
                    <p className="text-md max-w-full text-center">
                        Keep our site spam-free by logging in
                    </p>
                    <GoogleButton />
                    <p className="max-w-sm text-center text-sm">
                        By creating an account, you agree to Giveaid&apos;s{" "}
                        <a
                          href="/terms-of-service"
                          className="font-semibold text-blue-500 hover:underline"
                        >
                            Terms of Service
                        </a>
                        ,{" "}
                        <a
                          href="/privacy-policy"
                          className="font-semibold text-blue-500 hover:underline"
                        >
                            Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a
                          href="/acceptable-use"
                          className="font-semibold text-blue-500 hover:underline"
                        >
                            Acceptable Use Policy
                        </a>
                        .
                    </p>
                </div>
            </Modal>
          )}
          <section className="min-h-screen bg-white dark:bg-gray-900">
              <div className="mx-auto max-w-screen-xl py-8 px-4 text-center lg:py-16 lg:px-12">
                  <a
                    href="#"
                    className="mb-7 inline-flex items-center justify-between rounded-full bg-gray-100 py-1 px-1 pr-4 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    role="alert"
                  >
            <span className="mr-3 rounded-full bg-green-600 px-4 py-1.5 text-xs text-white">
              New
            </span>
                      <span className="text-sm font-medium">
              Realtime tracking of donations
            </span>
                      <svg
                        className="ml-2 h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          ></path>
                      </svg>
                  </a>
                  <p
                    className="mb-2 text-4xl font-extrabold leading-loose leading-none tracking-tight text-gray-900 dark:text-white md:mb-4 md:text-5xl lg:text-6xl">
                      Donate Locally,
                  </p>

                  <div
                    className={
                        "mb-5 flex flex-col items-center justify-center -space-y-2 lg:flex-row lg:space-y-0"
                    }
                  >
                      <p
                        className="text-4xl font-extrabold leading-loose leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                          Make a difference
                      </p>{" "}
                      &nbsp; &nbsp;
                      <strong
                        className={
                            "text-4xl font-extrabold leading-loose leading-none tracking-tight text-green-600 md:text-5xl lg:text-6xl"
                        }
                      >
                          Globally
                      </strong>
                  </div>
                  <p className={"mx-auto max-w-lg  lg:text-lg"}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
                      eius eum facilis odit qui quia! Consequuntur ratione recusandae
                      saepe sint.
                  </p>
                  <p
                    className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48"></p>
                  <div
                    className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 lg:mb-16">
                      <button
                        onClick={() => {
                            setModalOpen(true);
                        }}
                        className="inline-flex items-center justify-center rounded-lg bg-green-600 py-3 px-5 text-center text-base font-medium text-white focus:ring-4 focus:ring-green-300 hover:bg-green-800 dark:focus:ring-green-900"
                      >
                          Get Started
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
                      <a
                        href="#"
                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 py-3 px-5 text-center text-base font-medium text-gray-900 focus:ring-4 focus:ring-gray-100 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-700"
                      >
                          <svg
                            className="mr-2 -ml-1 h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                              <path
                                d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                          </svg>
                          Watch video
                      </a>
                  </div>
              </div>
              <div>
                  <img className={"mx-auto px-5"} src="/illus.svg" alt="" />
              </div>
          </section>
          <div className={"mx-5 text-center lg:text-start"}>
              <hr className="my-8 border-gray-200 dark:border-gray-700 " />
              <div className={"mx-2 flex flex-col space-y-3"}>
                  <p className={"text-3xl font-bold text-gray-700 lg:text-4xl"}>
                      How does it work <span className={"text-green-500"}>?</span>
                  </p>
                  <p className={"lg:text-lg"}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Accusantium aliquid at autem consequuntur culpa cumque deleniti
                      deserunt eligendi et expedita fugiat fugit harum hic in ipsam labore
                      laborum magnam mollitia nam natus, odit officia pariatur placeat
                      quae quisquam ratione recusandae rem repudiandae rerum velit, veniam
                      veritatis vero voluptatum! Nemo, obcaecati.
                  </p>
              </div>
          </div>

          <div className={"mx-5 text-center lg:text-start"}>
              <hr className="my-8  border-gray-200  dark:border-gray-700 " />
              <div className={"mx-2 flex flex-col space-y-3"}>
                  <p className={"text-3xl font-bold text-gray-700 lg:text-4xl"}>
                      How does it work <span className={"text-green-500"}>?</span>
                  </p>
                  <p className={" lg:text-lg"}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Accusantium aliquid at autem consequuntur culpa cumque deleniti
                      deserunt eligendi et expedita fugiat fugit harum hic in ipsam labore
                      laborum magnam mollitia nam natus, odit officia pariatur placeat
                      quae quisquam ratione recusandae rem repudiandae rerum velit, veniam
                      veritatis vero voluptatum! Nemo, obcaecati.
                  </p>
              </div>
          </div>

          <div className={"mx-5 text-center lg:text-start"}>
              <hr className="my-8  border-gray-200  dark:border-gray-700 " />
              <div className={"mx-2 flex flex-col space-y-3"}>
                  <p className={"text-3xl font-bold text-gray-700 lg:text-4xl"}>
                      How does it work <span className={"text-green-500"}>?</span>
                  </p>
                  <p className={" lg:text-lg"}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Accusantium aliquid at autem consequuntur culpa cumque deleniti
                      deserunt eligendi et expedita fugiat fugit harum hic in ipsam labore
                      laborum magnam mollitia nam natus, odit officia pariatur placeat
                      quae quisquam ratione recusandae rem repudiandae rerum velit, veniam
                      veritatis vero voluptatum! Nemo, obcaecati.
                  </p>
              </div>
          </div>
      </div>
    );
};