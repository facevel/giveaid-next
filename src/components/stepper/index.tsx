const Check = () => {
    return (
        <svg aria-hidden="true" className="w-4 h-4 mr-2 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20"
             xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
        </svg>
    )
}

function Stepper({steps, currentStep, stepsDone}: {
    steps: string[], currentStep: number, stepsDone: number[]
}) {
    return (
        <ol className="flex items-center justify-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
            <li className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 ${currentStep === 0 ? 'text-green-600 dark:text-green-500' : ''}`}>
        <span
            className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
            {stepsDone.includes(0) ? <Check/> : <span className="mr-2">{currentStep + 1}</span>}
            {steps[0]}
        </span>
            </li>
            {steps.map((step, index) => {
                if (index === 0 || index === steps.length - 1) return null;
                return (
                    <li key={index}
                        className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
        <span
            className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500 ${currentStep === index ? 'text-green-600 dark:text-green-500' : ''}`}>
            {stepsDone.includes(index) ? <Check/> : <span className="mr-2">{index+1}</span>}
            {step}
        </span>
                    </li>
                )
            })}
            <li className={`flex items-center ${currentStep === steps.length - 1 ? 'text-green-600 dark:text-green-500' : ''}`}>
                {stepsDone.includes(steps.length - 1) ? <Check/> : <span className="mr-2">{steps.length}</span>}
                {steps[steps.length-1]}
            </li>
        </ol>

    )
}

export default Stepper