import React, { useState } from 'react'
import SetTitle from '../../../Shared/SetTtitle/SetTitle'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import { useFieldArray, useForm } from 'react-hook-form';
import ScrollToTop from '../../../../components/ScrollToTop/ScrollToTop';
import { MdDelete } from 'react-icons/md';
import { CiSquarePlus } from 'react-icons/ci';
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { SwalErrorShow, getUnits } from '../../../../assets/scripts/Utility';
const AddRecipe = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()
    const { dishID } = useParams();
    const { register, handleSubmit, formState: { errors }, setValue, getValues, resetField, control } = useForm({
        defaultValues: {
            active: true,
        },
    });

    const { fields: optionFields, append: optionAppend, remove: optionRemove, } = useFieldArray({
        control,
        name: 'ingredients',
    });
    const { branchID, res_id } = useRestauarantAndBranch();
    const units = getUnits();
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['dish-receipe-data-kasjfoiu438u', branchID, res_id,dishID],
        cacheTime:0,
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/restaurant/${res_id}/branch/${branchID}/get-dishes/${dishID}`);

            // const data = {
            //     dish: "Mexican Chao",
            //     ingredients: [
            //         {
            //             itemName: "Mexican Thai Noodle",
            //             unit: 4
            //         }
            //     ]
            // }
            // setValue("ingredients", data.ingredients)
            // setValue("dish", data.title)
            return res.data
            // return res.data
        }
    })
    const onSubmit = async (data) => {
        console.log(data);

        axiosSecure.post(`/admin/restaurant/${res_id}/branch/${branchID}/add-new-dishes/${dishID}`, data)
            .then(res => {
                toast.success('Dish Added Successfully')
                resetField("ingredients")
                resetField("dish")
                navigate('/dish-list')
            })
            .catch(err => SwalErrorShow(err))


    };
    if (isLoading) {
        return <LoadingPage />
    }
    if (error) {
        return <ErrorPage />
    }
    return (
        <section className='max-w-7xl mx-auto py-8'>
            <ScrollToTop />
            <SectionTitle h1="Add Recipe" />
            <SetTitle title="Add Recipe" />
            <form onSubmit={handleSubmit(onSubmit)} className='mx-auto max-w-xl px-6 py-5 mt-3 border border-gray-300 overflow-hidden bg-white rounded-md shadow-dashboard'>

                <div className="w-full  ">
                    <div className=" h-full">
                        {/* category  */}
                        <div className="flex flex-wrap pb-3 m-3 border-1 rounded">
                            <div className="w-full  p-3">
                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Title</p>
                                <input defaultValue={data?.title} className="disabled:cursor-not-allowed w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="ie: Rice Bowl"
                                    {...register("dish", {
                                        required: "*Dish  is Required",
                                    })} readOnly />
                                {errors.dish?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.dish?.message}</p>)}

                            </div>
                        </div>
                    </div>
                </div>



                <div className='w-full h-full p-3 select-none'>
                    {/* --------------------------------------------------------------------------
          ------------------OPTIONS-----------------------------------------------------
          ------------------------------------------------------------------------------ */}
                    <div className="flex flex-wrap pb-3 m-3 border-1 rounded p-2">
                        <div className="p-4 h-full w-full overflow-hidden bg-white shadow-dashboard">
                            <p className="mb-1.5 text-[18px] font-semibold text-gray-900 text-coolGray-800" data-config-id="auto-txt-21-3">Ingredients</p>
                            <small>Add item and units to the ingredients</small>
                            {optionFields.map((branch, index) => (
                                <div key={index} className="flex flex-wrap items-center p-4 my-1 mb-3 border rounded relative">

                                    {/* */}
                                    <div className="w-full md:w-1/2 p-1">

                                        <input
                                            {...register(`ingredients[${index}].itemName`, { required: 'Item Name is required' })}
                                            className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                                            type="text"
                                            placeholder="item name"
                                        />
                                        {errors.ingredients && errors.ingredients[index]?.itemName && (
                                            <p className='m-0 p-0 pl-1 text-sm text-red-500 text-[9px]' role="alert">
                                                {errors.ingredients[index].itemName.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-full md:w-1/2 p-3">
                                        <select
                                            label="Select Unit Type"
                                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5"

                                            defaultValue=""
                                            {...register(`ingredients[${index}].unitType`, {
                                                required: "*Unit Type is Required",
                                            })}
                                        >
                                            <option value="" disabled>
                                                Select Unit Type
                                            </option>

                                            {units.map((item, _idx) => (
                                                <option key={_idx} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.unitType?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.unitType?.message}</p>)}
                                    </div>
                                    <div className="w-full md:w-1/2 p-1">

                                        <input
                                            {...register(`ingredients[${index}].unit`, { required: 'Unit is reequired' })}
                                            className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                                            type="number"
                                            placeholder="unit"
                                        />
                                        {errors.ingredients && errors.ingredients[index]?.unit && (
                                            <p className='m-0 p-0 pl-1 text-sm text-red-500 text-[9px]' role="alert">
                                                {errors.ingredients[index].unit.message}
                                            </p>
                                        )}
                                    </div>





                                    {/* Remove  Button */}
                                    <div className='w-full flex flex-wrap justify-end items-center gap-2'>
                                        <button
                                            type="button"
                                            onClick={() => optionRemove(index)}
                                            className="flex-shrink-0 px-2 py-2 bg-slate-200 hover:bg-slate-300 font-medium text-sm text-white border border-slate-400 rounded-md shadow-button"
                                        >
                                            <MdDelete className='text-red-300' />
                                        </button>

                                    </div>

                                </div>
                            ))}

                            {/* add option  */}
                            <div className='w-full flex flex-wrap justify-start items-center gap-2'>
                                <button
                                    type="button"
                                    onClick={() => optionAppend({})}
                                    className="flex   font-medium text-sm  rounded-md shadow-button "
                                >
                                    <CiSquarePlus className='text-green-400 text-5xl' title='Add New' />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* -------------------------------------------------------------------------------------------- */}
                    <div className=' flex flex-wrap justify-center items-end gap-3 p-1'>
                        {/* save button  */}

                        <button type='submit' className="flex flex-wrap justify-center w-full max-w-96  px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button">
                            <p data-config-id="auto-txt-22-3">Create</p>
                        </button>


                    </div>
                </div>

            </form>
        </section>
    )
}

export default AddRecipe;