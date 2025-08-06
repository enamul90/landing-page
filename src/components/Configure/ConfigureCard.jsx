import React from 'react';
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import Button from "@/components/button/Button";
import MultipleInput from "@/components/form/MultipleInput";

const ConfigureCard = () => {


    return (
        <div className={'px-3 mt-5'}>
            <h2 className={"text-lg text-Text-100 font-medium mb-3 uppercase"}>Configure Card</h2>
            <div className={'p-4 bg-white rounded-md border border-Line mb-4'}>

                <h3 className={"text-xl text-Text-100 mb-3 font-semibold"}>Section Title & Card Part </h3>


                <form>
                    <Input
                        LabelName={"Section  Title"}
                        Placeholder = {'Type Section  Title'}
                    />
                    <TextArea
                        LabelName={"Section Description"}
                        Placeholder = {'Type Section Description'}
                    />

                    <Input
                        LabelName={"Product Part Title"}
                        Placeholder = {'Type Product Part  Title'}
                    />

                    <div className={'text-end'}>
                        <Button children={"Update"} />
                    </div>

                </form>
            </div>

            <div className={'p-4 bg-white rounded-md border border-Line mb-4'}>

                <h3 className={"text-xl text-Text-100 mb-3 font-semibold"}>Checkout Part</h3>

                <form>
                    <Input
                        LabelName={"Checkout Section Title"}
                        Placeholder = {'Type Checkout Section Title'}
                    />

                    <MultipleInput
                        data={"Product Size"}
                    />

                    <MultipleInput
                        data={"Product Color"}
                    />

                    <MultipleInput
                        data={"Shipping Cost"}
                    />

                    <TextArea
                        LabelName={"Checkout Section Footer"}
                        Placeholder = {'Type Checkout Section Footer Text'}
                    />


                    <div className={'text-end'}>
                        <Button children={"Update"} />
                    </div>

                </form>
            </div>

        </div>
    );
};

export default ConfigureCard;