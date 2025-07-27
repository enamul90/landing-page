import React from 'react';
import PasswordInput from "@/components/form/PasswordInput";
import Button from "@/components/button/Button";

const UpdatePassword = () => {
    return (
        <div  className="  w-full max-w-2xl mx-auto p-2">
            <div className={" p-5 bg-Shave rounded-md"}>
                <h3 className={'text-xl font-medium text-center uppercase mb-2'}>Update Password</h3>
                <form>
                    <PasswordInput
                        label={"Old Password"}
                        name="Old Password"
                        value={"123456"}
                    />

                    <PasswordInput
                        label={"New Password"}
                        name="New Password"
                        value={"123456"}
                    />

                    <PasswordInput
                        label={"Confirm Password"}
                        name="Confirm Password"
                        value={"123456"}
                    />


                    <Button type={"submit"}   />
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;