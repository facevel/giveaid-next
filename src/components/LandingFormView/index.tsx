import React from "react";

export const LandingFormView = () => {
  return (
    <div
      className={"container mx-auto flex flex-col items-center justify-center"}
    >
      <section className="bg-white dark:bg-gray-900">
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
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <p className="text-4xl font-extrabold leading-loose leading-none tracking-tight text-gray-900 dark:text-white md:mb-4 md:text-5xl lg:text-6xl">
            Donate Locally,
          </p>

          <p className="text-4xl font-extrabold leading-loose leading-none tracking-tight text-gray-900 dark:text-white md:mb-4 md:text-5xl lg:text-6xl">
            Make a difference{" "}
            <strong className={"text-green-600"}>Globally</strong>
          </p>
          <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48"></p>
          <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 lg:mb-16">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-green-700 py-3 px-5 text-center text-base font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
            >
              Learn more
              <svg
                className="ml-2 -mr-1 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 py-3 px-5 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <svg
                className="mr-2 -ml-1 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
              Watch video
            </a>
          </div>
          <div className="mx-auto px-4 text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <form className={"mt-7"}>
              <div className="mb-6">
                <div className="after:mx-auto after:my-5 after:block after:h-10 after:w-[1px] after:bg-transparent after:border-r-2 after:border-dashed after:border-black">
                  <label
                    htmlFor="text"
                    className="mb-2 block text-sm font-medium text-gray-500 dark:text-white"
                  >
                    Pickup Location
                  </label>
                  <div
                    className={
                      "flex items-center justify-center space-x-6 text-gray-500"
                    }
                  >
                    <input
                      type="text"
                      id="location"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Dwarka, New Delhi"
                      required
                    />
                  </div>
                </div>

                <label
                  htmlFor="text"
                  className="mb-2 block text-sm font-medium text-gray-500 dark:text-white"
                >
                  Items to Donate
                </label>
                <div
                  className={
                    "flex items-center justify-center space-x-6 text-gray-500"
                  }
                >
                  <select
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="name@flowbite.com"
                    required
                  >
                    <option value="1">Food</option>
                    <option value="2">Clothes</option>
                    <option value="3">Books</option>
                    <option value="4">Furniture</option>
                    <option value="5">Other</option>
                  </select>
                </div>
                <a
                  href="#"
                  className="my-5 inline-flex items-center justify-center rounded-lg bg-green-700 py-3 px-5 text-center text-base font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
                >
                  Proceed to Donate
                  <svg
                    className="ml-2 -mr-1 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
