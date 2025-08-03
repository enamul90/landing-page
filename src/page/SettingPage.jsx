'use client';

import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import ImageUpload from "@/components/form/ImageUpload";
import SocialMediaInput from "@/components/form/SocialMediaInput";
import Button from "@/components/button/Button";


export default function SettingPage() {

    return (
        <div className="lg:p-5 p-2 bg-gray-100 min-h-screen">

            <div className={"w-full max-w-[700px] mx-auto  p-5 bg-white rounded-md"}>

                <h2 className=" text-xl text-center font-semibold uppercase text-Text-100 pb-2">Company Settings</h2>

                <ImageUpload />

                <Input
                    LabelName={"Page Name"}
                    Placeholder={"Enter Page Name"}
                />
                <Input
                    LabelName={"Copyright Text"}
                    Placeholder={"Type here"}
                />
                <TextArea
                    LabelName={"Description"}
                    Placeholder={"Enter Page Description"}
                />

                <div className={"grid md:grid-cols-2 md:gap-7"}>
                    <Input
                        LabelName={"Mobile Number"}
                        Placeholder={"Enter Mobile Number"}
                    />
                    <Input
                        LabelName={"Whatsapp Number"}
                        Placeholder={"Enter Whatsapp Number"}
                    />
                </div>


                <SocialMediaInput />

                <div className={"mt-8 text-end"}>
                    <Button />
                </div>
            </div>


        </div>
    );
}