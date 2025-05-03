import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa"

import CourseBuilderForm from './CourseBuilder/CourseBuilderFrom.jsx'
import CourseInformationForm from './CouresInformation/CourseInformationForm.jsx'
import PublishCourse from './PublishCourse/Index.jsx'
const RenderSteps = () => {
    const step = useSelector((state) => (state.course && state.course.step) || 1);
    const { course = {}, editCourse = false } = useSelector((state) => state.course || {});

    const steps = [ 
        {id: 1, title: "Course Information"},
        {id: 2, title: "Course Builder"},
        {id: 3, title: "Publish"}
    ];

    return (
        <>
            <div className="relative mb-2 flex w-full justify-center">
                {steps.map((item) => (
                    <div key={item.id} className="flex flex-col items-center">
                        {/* Step Circle */}
                        <button
                            className={`cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] 
                            ${step === item.id ? ' border-yellow-50 bg-yellow-900 text-yellow-50' 
                            : ' border-gray-700 bg-gray-800 text-gray-300'} 
                            ${step > item.id ? ' bg-yellow-50' :'text-yellow-50'}`}
                        >
                            {step > item.id ? (
                                <FaCheck className='font-bold text-gray-900'/>
                            ) : 
                            (item.id)}
                        </button>
                        {/* Dotted Line */}
                        {item.id !== steps.length && (
                            <div
                                className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 
                                ${step > item.id ? "border-yellow-50" : "border-gray-500"}`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Steps Titles */}
            <div className="relative mb-16 flex w-full select-none justify-between">
                {steps.map((item) => (
                    <div key={item.id} className="flex min-w-[130px] flex-col items-center gap-y-2">
                        <p className={`text-sm ${step >= item.id ? "text-gray-50" : "text-gray-500"}`}>
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>

            {/* Render specific component based on current step */}
            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishCourse />}
        </>
    )
}

export default RenderSteps;
