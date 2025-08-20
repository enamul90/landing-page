"use client";

import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import ImageUpload from "@/components/form/ImageUpload";
import SocialMediaInput from "@/components/form/SocialMediaInput";
import Button from "@/components/button/Button";
import API from "@/app/utils/axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SettingPage() {
  const [formData, setFormData] = useState({
    logo: "",
    pageName: "",
    copyRight: "",
    description: "",
    mobileNumber: "",
    whatsappNumber: "",
    socialLink: [],
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {

    try {
      const res = await API.post("/companyinfo", formData);
      console.log(res.data);
      toast.success("Saved successfully!");
      setFormData({
        logo: "",
        pageName: "",
        copyRight: "",
        description: "",
        mobileNumber: "",
        whatsappNumber: "",
        socialLink: [],
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Error saving data!");
    }
  };

  return (
    <div className="lg:p-5 p-2 bg-gray-100 min-h-screen">
      <div className="w-full p-5 bg-white rounded-md">
        <h2 className="text-xl text-center font-semibold uppercase text-Text-100 pb-2">
          Company Settings
        </h2>

        <ImageUpload
          value={formData.logo}
          onChange={(val) => handleChange("logo", val)}
        />

        <Input
          LabelName="Page Name"
          Placeholder="Enter Page Name"
          value={formData.pageName}
          onChange={(val) => handleChange("pageName", val)}
        />
        <Input
          LabelName="Copyright Text"
          Placeholder="Type here"
          value={formData.copyRight}
          onChange={(val) => handleChange("copyRight", val)}
        />
        <TextArea
          LabelName="Description"
          Placeholder="Enter Page Description"
          value={formData.description}
          onChange={(val) => handleChange("description", val)}
        />

        <div className="grid md:grid-cols-2 md:gap-7">
          <Input
            LabelName="Mobile Number"
            Placeholder="Enter Mobile Number"
            value={formData.mobileNumber}
            onChange={(val) => handleChange("mobileNumber", val)}
          />
          <Input
            LabelName="Whatsapp Number"
            Placeholder="Enter Whatsapp Number"
            value={formData.whatsappNumber}
            onChange={(val) => handleChange("whatsappNumber", val)}
          />
        </div>

        <SocialMediaInput
          value={formData.socialLink}
          onChange={(val) => handleChange("socialLink", val)}
        />

        <div className="mt-8 text-end">
          <Button onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}