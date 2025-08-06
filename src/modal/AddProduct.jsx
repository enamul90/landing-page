import React from 'react';
import {IoClose} from "react-icons/io5";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import ImageUpload from "@/components/form/ImageUpload";
import ProductImage from "@/components/form/ProductImage";
import MultiImageUpload from "@/components/form/MultiImageUpload";
import SwitchToggle from "@/components/button/SwitchToggle";
import {MdClose} from "react-icons/md";

const AddProduct = ({Close}) => {
    return (
        <div className={"h-dvh w-full bg-black/80 fixed top-0 left-0 z-50 flex items-center justify-center "}>
            <div
                className={"w-full max-w-7xl max-h-[80%] bg-white rounded-md p-4 pt-0   overflow-y-auto "}
            >


                <div className={"py-2 flex items-center justify-between sticky top-0 bg-white pt-5 z-50"}>
                    <h3 className={"text-lg font-medium text-Text-100 uppercase"}>Add new product</h3>

                    <button onClick={()=>Close(false)} className={" p-2  text-white bg-primary rounded-lg cursor-pointer"}>
                        <MdClose />
                    </button>
                </div>

                <div className={"mt-2 grid md:grid-cols-7 gap-6"}>
                    <div className={"md:col-span-5 space-y-2"}>
                        <Input LabelName={"Product Name"} Placeholder={"Type here"} />
                        <div className={"md:flex gap-3 w-full"}>
                            <Input LabelName={"Product Size"} Placeholder={"10, 20, 30, 52, 60"} />
                            <Input LabelName={"Product  Color"} Placeholder={"Black, Red,"} />
                        </div>
                        <div className={"md:flex gap-3 w-full"}>
                            <Input LabelName={"Available Stock"} Placeholder={"Type here"} />
                            <Input LabelName={"Brand Name"} Placeholder={"Type here"} />
                        </div>
                        <div className={"md:flex gap-3 w-full"}>
                            <Input LabelName={"Price"} Placeholder={"Type here"} />
                            <Input LabelName={"Sell Price"} Placeholder={"Type here"} />
                        </div>

                        <TextArea LabelName={"Description"} Placeholder={"Type here"} />

                        <div>
                            <SwitchToggle label={"Do you want to show the landing page?"} />
                        </div>

                    </div>
                    <div className={"md:col-span-2"}>
                        <ProductImage />
                        <MultiImageUpload />

                    </div>
                </div>

                <div className={"mt-5 space-x-4 text-center py-3 "}>
                    <button className={" py-2 px-3 text-secondary border border-secondary rounded-lg cursor-pointer"}>Save Products</button>
                    <button className={" py-2 px-3 text-white bg-secondary rounded-lg cursor-pointer"}>Publish Products</button>
                </div>

            </div>
        </div>
    );
};

export default AddProduct;