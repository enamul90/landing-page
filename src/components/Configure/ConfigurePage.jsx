"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/form/Input";
import Button from "@/components/button/Button";
import { sectionsData } from "@/data/mainData";
import SecondarySection from "@/components/Configure/SecondarySection";
import CreateSectionModal from "@/modal/CreateSectionModal";
import toast from "react-hot-toast";
import API from "@/app/utils/axios";

const ConfigurePage = () => {
  const [sections, setSections] = useState([]);
  const [majorsection, setMajorsection] = useState({
    pageTitle: "",
    sliderTitle: "",
    videoTitle: "",
    videoUrl: "",
    productTitle: "",
    reviewTitle: "",
  });
  const [loading, setLoading] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  const fetchSections = async () => {
    try {
      const res = await API.get("/configurepage/secondarysection");
      setSections(res.data);
    } catch (err) {
      console.error("Error fetching sections", err);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleChange = (key, value) => {
    setMajorsection({ ...majorsection, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await API.post("/configurepage/majorsection", majorsection);
      console.log(res.data);
      toast.success("Card Section saved successfully!");
      setMajorsection({
        pageTitle: "",
        sliderTitle: "",
        videoTitle: "",
        videoUrl: "",
        productTitle: "",
        reviewTitle: "",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Error saving card section!");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (newSection) => {
    setSections((prev) => [...prev, newSection]);
  };

  const handleDelete = (id) => {
    setSections((prev) => prev.filter((sec) => sec._id !== id));
  };

  const handleUpdate = (updatedSection) => {
    setSections((prev) =>
      prev.map((sec) => (sec._id === updatedSection._id ? updatedSection : sec))
    );
    setEditingSection(null); // modal বন্ধ
  };

  return (
    <div className={"px-3 mt-5"}>
      <h2 className={"text-lg text-Text-100 font-medium mb-3 uppercase"}>
        Configure Page
      </h2>

      <div className={"p-4 bg-white rounded-md border border-Line mb-4"}>
        <h3 className={"text-xl text-Text-100 mb-3 font-semibold"}>
          Major Section{" "}
        </h3>

        <form>
          <Input
            LabelName={"Page Title Section"}
            Placeholder={"Type Here"}
            value={majorsection.pageTitle}
            onChange={(val) => handleChange("pageTitle", val)}
          />

          <Input
            LabelName={"Slider Section Title"}
            Placeholder={"Type here"}
            value={majorsection.sliderTitle}
            onChange={(val) => handleChange("sliderTitle", val)}
          />

          <div className={"md:flex gap-5"}>
            <Input
              LabelName={"Video Section Title"}
              Placeholder={"Type here"}
              value={majorsection.videoTitle}
              onChange={(val) => handleChange("videoTitle", val)}
            />

            <Input
              LabelName={"Video Url"}
              Placeholder={"Only YouTube Video URL"}
              value={majorsection.videoUrl}
              onChange={(val) => handleChange("videoUrl", val)}
            />
          </div>

          <Input
            LabelName={"Product Section Title"}
            Placeholder={"Type here"}
            value={majorsection.productTitle}
            onChange={(val) => handleChange("productTitle", val)}
          />
          <Input
            LabelName={"Review Section Title"}
            Placeholder={"Type here"}
            value={majorsection.reviewTitle}
            onChange={(val) => handleChange("reviewTitle", val)}
          />

          <div className={"text-end"}>
            <Button
              children={loading ? "Saving..." : "Update"}
              onClick={handleSubmit}
              disabled={loading}
            />
          </div>
        </form>
      </div>

      <div className={"flex items-center justify-between mt-10  mb-4"}>
        <h2 className={"text-lg text-Text-100 font-medium uppercase"}>
          Secondary Section
        </h2>
        <CreateSectionModal onSave={handleSave} />
        {editingSection && (
          <CreateSectionModal
            editData={editingSection}
            onSave={handleUpdate}
            onClose={() => setEditingSection(null)}
          />
        )}
      </div>

      <div>
        {sections.map((section) => (
          <SecondarySection
            key={section._id}
            section={section}
            onDelete={handleDelete}
            onEdit={(section) => setEditingSection(section)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConfigurePage;
