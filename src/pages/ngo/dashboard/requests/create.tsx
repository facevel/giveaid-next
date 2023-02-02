import React from "react";
import {useForm} from "react-hook-form";
import {NgoPageLayout} from "layouts";

const App = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm();
    //@ts-ignore
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className={"mx-auto py-8 px-6 max-w-md rounded-lg bg-white border border-gray-200"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col"}>
                <input className={"border border-gray-200 rounded-lg px-2 py-1 mt-6"}
                       placeholder={"Item"} {...register("itemRequired", {required: true})} />
                {errors.exampleRequired && <p className={"text-sm text-red-900"}>This field is required</p>}
                <input className={"border border-gray-200 rounded-lg px-2 py-1 mt-6"}
                       placeholder={"Description"} {...register("descriptionRequired", {required: true})} />
                {errors.exampleRequired && <p className={"text-sm text-red-900"}>This field is required</p>}

                <div className={"grid grid-cols-7"}>
                    <input className={"col-span-5 border border-gray-200 rounded-l-lg rounded-r-none rounded-lg px-2 py-1 mt-6"}
                           placeholder={"Quantity"} {...register("Quantity", {required: true})} />
                <select className={"col-span-2 border-gray-200 rounded-r-lg rounded-l-none rounded-lg pl-2 py-1 mt-6"} {...register("gender")}>
                    <option value="female">Units</option>
                    <option value="male">Kg</option>
                    <option value="other">g</option>
                    <option value="other">g</option>
                </select>
                </div>
                    <input
                        className={"bg-green-600 rounded-lg w-fit mt-6 mx-auto px-2 py-1 text-white cursor-pointer hover:bg-green-500"}
                        type="submit"/>
            </form>
        </div>
    );
}

App.pageLayout = NgoPageLayout
export default App;
