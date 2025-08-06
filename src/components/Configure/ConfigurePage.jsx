import React from 'react';
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import Button from "@/components/button/Button";

const ConfigurePage = () => {
    return (
        <div  className={'px-3 mt-5'}>
            <h2 className={"text-lg text-Text-100 font-medium mb-3 uppercase"}>Configure Page</h2>

            <div className={'p-4 bg-white rounded-md border border-Line mb-4'}>

                <h3 className={"text-xl text-Text-100 mb-3 font-semibold"}>Major Section </h3>

                <form>
                    <Input
                        LabelName={"Page Title Section"}
                        Placeholder = {'Type Here'}
                    />


                    <Input
                        LabelName={"Slider Section Title"}
                        Placeholder = {'Type here'}
                    />

                    <div className={"md:flex gap-5"}>
                        <Input
                            LabelName={"Video Section Title"}
                            Placeholder = {'Type here'}
                        />

                        <Input
                            LabelName={"Video Url"}
                            Placeholder = {'Only YouTube Video URL'}
                        />
                    </div>

                    <Input
                        LabelName={"Product Section Title"}
                        Placeholder = {'Type here'}
                    />
                    <Input
                        LabelName={"Review Section Title"}
                        Placeholder = {'Type here'}
                    />


                    <div className={'text-end'}>
                        <Button children={"Update"} />
                    </div>

                </form>
            </div>

            <div className={"flex items-center justify-between mt-10"}>
                <h2 className={"text-lg text-Text-100 font-medium mb-3 uppercase"}>Secondary Section</h2>
                <button className={"text-sm font-medium text-white bg-black px-3 py-2 rounded-md cursor-pointer"} >
                    Add New Section
                </button>
            </div>


        </div>
    );
};

export default ConfigurePage;