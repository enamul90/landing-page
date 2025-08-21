import React, { useState } from "react";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import Button from "@/components/button/Button";
import MultipleInput from "@/components/form/MultipleInput";
import API from "@/app/utils/axios";
import toast from "react-hot-toast";

const ConfigureCard = () => {
  // ------------------ Section Card ------------------
  const [cardSection, setCardSection] = useState({
    title: "",
    description: "",
    productPartTitle: "",
  });
  const [cardLoading, setCardLoading] = useState(false);

  const handleCardChange = (key, value) => {
    setCardSection({ ...cardSection, [key]: value });
  };

  const handleCardSubmit = async () => {
    setCardLoading(true);
    try {
      const res = await API.post("/cardsection", cardSection);
      console.log(res.data);
      toast.success("Card Section saved successfully!");
      setCardSection({
        title: "",
        description: "",
        productPartTitle: "",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Error saving card section!");
    } finally {
      setCardLoading(false);
    }
  };

  // ------------------ Checkout Part ------------------
  const [checkout, setCheckout] = useState({
    title: "",
    sizes: [],
    colors: [],
    shippingCosts: [],
    footer: "",
  });
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckoutChange = (key, value) => {
    setCheckout({ ...checkout, [key]: value });
  };

  const handleCheckoutSubmit = async () => {
    setCheckoutLoading(true);
    try {
      const res = await API.post("/checkoutpart", checkout);
      console.log(res.data);
      toast.success("Checkout Part saved successfully!");
      setCheckout({
        title: "",
        sizes: [],
        colors: [],
        shippingCosts: [],
        footer: "",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Error saving checkout part!");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className={"px-3 mt-5"}>
      <h2 className={"text-lg text-Text-100 font-medium mb-3 uppercase"}>
        Configure Card
      </h2>

      {/* Section Card */}
      <div className={"p-4 bg-white rounded-md border border-Line mb-4"}>
        <h3 className={"text-xl text-Text-100 mb-3 font-semibold"}>
          Section Title & Card Part
        </h3>

        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            LabelName={"Section Title"}
            Placeholder={"Type Section Title"}
            value={cardSection.title}
            onChange={(val) => handleCardChange("title", val)}
          />
          <TextArea
            LabelName={"Section Description"}
            Placeholder={"Type Section Description"}
            value={cardSection.description}
            onChange={(val) => handleCardChange("description", val)}
          />

          <Input
            LabelName={"Product Part Title"}
            Placeholder={"Type Product Part Title"}
            value={cardSection.productPartTitle}
            onChange={(val) => handleCardChange("productPartTitle", val)}
          />

          <div className={"text-end"}>
            <Button
              children={cardLoading ? "Saving..." : "Update"}
              onClick={handleCardSubmit}
              disabled={cardLoading}
            />
          </div>
        </form>
      </div>

      {/* Checkout Part */}
      <div className={"p-4 bg-white rounded-md border border-Line mb-4"}>
        <h3 className={"text-xl text-Text-100 mb-3 font-semibold"}>
          Checkout Part
        </h3>

        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            LabelName={"Checkout Section Title"}
            Placeholder={"Type Checkout Section Title"}
            value={checkout.title}
            onChange={(val) => handleCheckoutChange("title", val)}
          />

          <MultipleInput
            data={"Product Size"}
            value={checkout.sizes}
            onChange={(val) => handleCheckoutChange("sizes", val)}
          />

          <MultipleInput
            data={"Product Color"}
            value={checkout.colors}
            onChange={(val) => handleCheckoutChange("colors", val)}
          />

          <MultipleInput
            data={"Shipping Cost"}
            value={checkout.shippingCosts}
            onChange={(val) => handleCheckoutChange("shippingCosts", val)}
          />

          <TextArea
            LabelName={"Checkout Section Footer"}
            Placeholder={"Type Checkout Section Footer Text"}
            value={checkout.footer}
            onChange={(val) => handleCheckoutChange("footer", val)}
          />

          <div className={"text-end"}>
            <Button
              children={checkoutLoading ? "Saving..." : "Update"}
              onClick={handleCheckoutSubmit}
              disabled={checkoutLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigureCard;