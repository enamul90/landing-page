import React from 'react';
import Input from "@/components/form/Input";
import Button from "@/components/button/Button";
import {sectionsData} from "@/data/mainData";
import SecondarySection from "@/components/Configure/SecondarySection";
import CreateSectionModal from "@/modal/CreateSectionModal";


const ConfigurePage = () => {
    const handleSave = (sectionData) => {
        console.log("Saved section:", sectionData);
    };


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

            <div className={"flex items-center justify-between mt-10  mb-4"}>
                <h2 className={"text-lg text-Text-100 font-medium uppercase"}>Secondary Section</h2>
                <CreateSectionModal onSave={handleSave} />
            </div>


            <div>
                {
                    sectionsData.map((section, index) => (
                        <SecondarySection section={section} key={index} />
                    ))
                }
            </div>


        </div>
    );
};

export default ConfigurePage;