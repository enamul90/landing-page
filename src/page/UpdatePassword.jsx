"use client";
import React, { useState } from "react";
import PasswordInput from "@/components/form/PasswordInput";
import Button from "@/components/button/Button";
import API from "@/app/utils/axios";
import { toast } from "react-hot-toast";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // input change handle
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit handle
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    try {
      const res = await API.post("/user/updatepassword", formData);

      if (res.data.status === 200) {
        toast.success(res.data.message);
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-full p-2 lg:p-5">
      <div className="p-5 bg-Shave rounded-md">
        <h3 className="text-xl font-medium text-center uppercase mb-2">
          Update Password
        </h3>
        <form onSubmit={handleSubmit}>
          <PasswordInput
            label="Old Password"
            name="oldPassword"
            placeHolder="Type Here"
            value={formData.oldPassword}
            onChange={handleChange}
          />

          <PasswordInput
            label="New Password"
            name="newPassword"
            placeHolder="Type Here"
            value={formData.newPassword}
            onChange={handleChange}
          />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            placeHolder="Type Here"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <div className="text-end">
            <Button type="submit">Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;