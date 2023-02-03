import React from "react";
import {Formik, useFormik} from 'formik';
import {NgoPageLayout} from "layouts";
import * as Yup from 'yup';


function App() {

    const formik = useFormik({

        initialValues: {
            requestTitle: '',
            requestDescript: '',
            startDate: '',
            endDate: ''
        },

        validationSchema: Yup.object({
            requestTitle: Yup.string().max(20, 'Must be 20 character or less.').required('Required.'),
            requestDescript: Yup.string().required()

        }),

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },

    });

    return (<div className={"max-w-md mx-auto px-6 py-6 mt-6 rounded-lg border border-gray-200 bg-white"}>
            <form className={"mx-auto grid grid-cols-2 gap-2 items-center justify-between"}
                  onSubmit={formik.handleSubmit}>
                <label className={"justify-self-end"} htmlFor={"requestTitle"}>Request Title</label>
                <div>
                <input
                    className={"rounded-lg border-gray-300"}
                    id={"requestTitle"}
                    name={"requestTitle"}
                    type={"text"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.requestTitle}
                />
                {formik.touched.requestTitle && formik.errors.requestTitle ? (

                    <div className={"text-xs font-light text-red-600"}>{formik.errors.requestTitle}</div>

                ) : null}
                </div>

                <label className={"justify-self-end"} htmlFor={"requestDescript"}>Request Description</label>
                <div>
                <input
                    className={"rounded-lg border-gray-300"}

                    id={"requestDescript"}
                    name={"requestDescript"}
                    type={"text"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.requestDescript}
                />
                    {formik.touched.requestTitle && formik.errors.requestTitle ? (

                        <div className={"text-xs font-light text-red-600"}>{formik.errors.requestTitle}</div>

                    ) : null}
                </div>

                <label className={"justify-self-end"} htmlFor={"startDate"}>Earliest Receiving Date</label>
                <div>
                <input
                    className={"rounded-lg border-gray-300"}
                    id={"startDate"}
                    name={"startDate"}
                    type={"date"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.startDate}
                />
                    {formik.touched.endDate && formik.errors.endDate ? (

                        <div className={"text-xs font-light text-red-600"}>{formik.errors.endDate}</div>

                    ) : null}
                </div>

                <label className={"justify-self-end"} htmlFor={"endDate"}>Latest Receiving Date</label>
                <div>
                <input
                    className={"rounded-lg border-gray-300"}
                    id={"endDate"}
                    name={"endDate"}
                    type={"date"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.endDate}
                />
                    {formik.touched.endDate && formik.errors.endDate ? (

                        <div className={"text-xs font-light text-red-600"}>{formik.errors.endDate}</div>

                    ) : null}
                </div>
            </form>
    </div>)
}


App.pageLayout = NgoPageLayout
export default App;
