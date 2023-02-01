import React, {useState} from "react";
import {Steps} from "antd";

function FormFlow({props}) {
    const [current, setCurrent] = useState(0);
    const steps = [
        {
            title: 'Location',

        },
        {
            title: 'Time',
        },
        {
            title: 'Details',
        },
    ]
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div className={"container mx-auto flex flex-col justify-center items-center mt-4"}>
            <Steps
                size="small"
                current={0}
            />
        </div>
    )
}

export default FormFlow;