// import { useUserContext } from "../../src/firebase/authContext";

const GoogleButton = ({}) => {
    // const { loginWithGoogle, loggingIn, error, user, getAuthToken, logout } = useUserContext();
    // const [accountMerger, setAccountMerger] = useState({ showing: false, email: "" });
    // const [loading, setLoading] = useState(false);
    //
    // const mergeAccounts = () => {
    //   if (accountMerger.email && user) {
    //     setLoading(true);
    //     return new Promise(async (resolve, reject) => {
    //       const options = {
    //         method: "PATCH",
    //         headers: {
    //           "Content-Type": "application/json",
    //           bearer: await getAuthToken()
    //         }
    //       };
    //       console.log(options);
    //       fetch(`/api/v1/user?uid=${user.uid}&new_email=${accountMerger.email}`, options)
    //         .then((response) => response.json())
    //         .then((response) => {
    //           console.log(response);
    //           resolve(response);
    //         })
    //         .catch((err) => {
    //           reject(err);
    //         }).finally(() => {
    //         setLoading(false);
    //       });
    //     });
    //   }
    // };
    //
    // const discardEventHandler = () => {
    //   setAccountMerger({ showing: false, email: "" });
    //   loginWithGoogle();
    // };
    // const mergeEventsHandler = () => {
    //   mergeAccounts().then((response) => {
    //     console.log({ response });
    //     setLoading(true);
    //     logout();
    //
    //     toast.success("Account successfully merged. Please login to your original account.");
    //   }).catch((err) => {
    //     console.log({ err });
    //     toast.error("Failed to merge accounts");
    //   }).finally(() => {
    //     setLoading(false);
    //     setAccountMerger({ showing: false, email: "" });
    //   });
    // };
    //
    // useEffect(() => {
    //   if (error !== "") {
    //     toast.info(`Error: ${error}`);
    //     if (error.includes("Email already in use")) {
    //       const email = error.split("__")[1];
    //       toast(`Got the email as ${email}`);
    //       setAccountMerger({ showing: true, email: email });
    //     } else {
    //       toast.error(error);
    //     }
    //   }
    // }, [error]);

    let loggingIn = false
    return (
        <>
            <div className="w-full">
                <div className="flex flex-col gap-5 justify-center">
                    <button
                        className="flex w-full transform items-center justify-center rounded-lg border text-gray-600 transition-colors duration-300 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        onClick={() => {
                            alert("Not implemented yet")
                        }}
                    >
                        <div className="px-4 py-2">
                            <svg className="h-6 w-6" viewBox="0 0 40 40">
                                <path
                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                    fill="#FFC107"
                                />
                                <path
                                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                    fill="#FF3D00"
                                />
                                <path
                                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                    fill="#4CAF50"
                                />
                                <path
                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                    fill="#1976D2"
                                />
                            </svg>
                        </div>

                        <span className="w-full px-1 py-3 text-center font-bold">
            Continue with Google
          </span>

                        {loggingIn ? (
                                <svg
                                    className=" mr-4 h-6 w-6 animate-spin text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) :
                            <div className={"w-6 h-6 px-4 py-2"}></div>
                        }
                    </button>
                </div>
            </div>

        </>
    );
};

export default GoogleButton;