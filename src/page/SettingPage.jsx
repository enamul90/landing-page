"use client";

import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import ImageUpload from "@/components/form/ImageUpload";
import SocialMediaInput from "@/components/form/SocialMediaInput";
import Button from "@/components/button/Button";
import API from "@/app/utils/axios";
import { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await API.get("/companyinfo");
        if (res.data && res.data.length > 0) {
          const company = res.data[0];
          setFormData({
            logo: company.logo || "",
            pageName: company.pageName || "",
            copyRight: company.copyRight || "",
            description: company.description || "",
            mobileNumber: company.mobileNumber || "",
            whatsappNumber: company.whatsappNumber || "",
            socialLink: company.socialLink || [],
          });
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
        toast.error("Error fetching data!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    setButtonLoading(true);
    try {
      const res = await API.post("/companyinfo", formData);
      console.log(res.data);
      toast.success("Saved successfully!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Error saving data!");
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div className="lg:p-5 p-2 bg-gray-100 min-h-screen">
      <div className="w-full p-5 bg-white rounded-md">
        <h2 className="text-xl text-center font-semibold uppercase text-Text-100 pb-2">
          Company Settings
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <>
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
              <Button onClick={handleSubmit}>
                {buttonLoading
                  ? "Saving..."
                  : formData.pageName
                  ? "Update"
                  : "Submit"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
