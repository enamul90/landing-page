"use client";
import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import Input from "@/components/form/Input";
import API from "@/app/utils/axios";
import toast from "react-hot-toast";

const CheckOutSection = ({ title = "", description = "", product = [""], }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [productPartTitle, setProductPartTitle] = useState("");
  const [checkoutData, setCheckoutData] = useState({
    title: "",
    sizes: [],
    colors: [],
    shippingCosts: [],
    footer: "",
  });
  const [loading, setLoading] = useState(true);
  const [orderloading, setOrderloading] = useState(false);

  // ✅ new states
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    size: "",
    color: "",
    shippingCost: "",
  });
  console.log("Form Data:", formData);
  // Initialize products with quantity
  useEffect(() => {
    const initialProducts = product.map((p) => ({
      ...p,
      quantity: 1,
      checked: false,
    }));
    setCartProducts(initialProducts);
  }, [product]);

  useEffect(() => {
    const fetchCardSection = async () => {
      try {
        const res = await API.get("/cardsection");
        if (res.data && res.data.length > 0) {
          const latestInfo = res.data[res.data.length - 1];
          setProductPartTitle(latestInfo.productPartTitle);
        }
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCheckout = async () => {
      try {
        const res = await API.get("/checkoutpart");
        if (res.data && res.data.length > 0) {
          const latestCheckout = res.data[res.data.length - 1];
          setCheckoutData({
            title: latestCheckout.title || "",
            sizes: latestCheckout.sizes || [],
            colors: latestCheckout.colors || [],
            shippingCosts: latestCheckout.shippingCosts || [],
            footer: latestCheckout.footer || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch checkout data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckout();
    fetchCardSection();
  }, []);

  // Quantity handler
  const handleQuantityChange = (index, delta) => {
    setCartProducts((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Checkbox handler
  const handleCheckboxChange = (index) => {
    setCartProducts((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // ✅ handle input change
  const handleChange = (key, value) => {
    if (key === "shippingCost") {
      setFormData({ ...formData, [key]: Number(value) });
    } else {
      setFormData({ ...formData, [key]: value.toString() });
    }
  };

  // ✅ handle submit
  const handleSubmit = async () => {
    setOrderloading(true)
    const selectedProducts = cartProducts.filter((p) => p.checked);

    if (!formData.name || !formData.phone || !formData.address) {
      toast("সব তথ্য পূরণ করুন");
      return;
    }

    if (selectedProducts.length === 0) {
      toast("কমপক্ষে একটি product select করুন");
      return;
    }

    try {
      const payload = {
        ...formData,
        products: selectedProducts,
        totalAmount:
          selectedProducts.reduce(
            (acc, item) => acc + item.sellPrice * item.quantity,
            0
          ) + (formData.shippingCost || 0),
        status: "new",
      };

      const res = await API.post("/orders", payload);
      console.log(res)
      if (res.status === 201 || res.status === 200) {
        toast.success("অর্ডার সফলভাবে হয়েছে ✅");
        setFormData({
          name: "",
          address: "",
          phone: "",
          size: "",
          color: "",
          shippingCost: "",
        });
        setCartProducts((prev) => prev.map((p) => ({ ...p, checked: false })));
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("অর্ডার ব্যর্থ হয়েছে ❌");
    } finally {
      setOrderloading(false)
    }
  };

  return (
    <>
      <div className={"reviewSection lg:p-3 p-2 lg:mt-20 md:mt-16 mt-8"}>
        <h2
          className={
            "lg:text-2xl md:text-xl text-lg text-white font-medium text-center"
          }
        >
          {title}
        </h2>
      </div>

      <p
        className={
          "lg:text-lg text-base text-primary font-semibold text-center "
        }
      >
        {description}
      </p>

      <div className={"mt-5 p-3 border border-Line rounded-md"}>
        <h5 className={"text-Text-100 md:text-lg font-medium "}>
          {loading ? "Loading...." : productPartTitle}
        </h5>

        <div id={"allcard"} className={"mt-4 grid  lg:grid-cols-2 gap-4"}>
          {cartProducts.map((item, index) => (
            <div
              key={index}
              className={
                "p-2 border border-Line/50 rounded-md overflow-hidden flex gap-3"
              }
            >
              <label className="cursor-pointer select-none shrink-0">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(index)}
                  className="peer hidden"
                />
                <div
                  className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center 
              transition-colors duration-200
              ${
                item.checked
                  ? "bg-primary border-primary"
                  : "bg-white border-gray-400"
              }
              peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary`}
                >
                  {item.checked && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </label>
              <div className={"h-32 w-20 shrink-0"}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full  object-cover"
                />
              </div>

              <div className={"flex-1"}>
                <h5 className={"text-Text-100 md:text-lg font-medium"}>
                  {item.name}
                </h5>

                <div
                  className={
                    "md:flex gap-6 items-center md:mt-5 mt-1 space-y-2"
                  }
                >
                  <h3 className={"text-xl text-Text-100 font-medium mt-1"}>
                    ${item.sellPrice}{" "}
                    <span className={"text-Text-75 ms-4 line-through text-lg"}>
                      ${item.price}
                    </span>
                  </h3>
                  <div
                    className={
                      "flex gap-4 items-center border border-Line rounded-md  w-fit text-lg font-medium"
                    }
                  >
                    <button
                      onClick={() => handleQuantityChange(index, -1)}
                      className={"px-3  py-2 border-e border-Line "}
                    >
                      <IoMdRemove />
                    </button>
                    {item.quantity.toString().padStart(2, "0")}
                    <button
                      onClick={() => handleQuantityChange(index, 1)}
                      className={"px-3  py-2 border-s border-Line "}
                    >
                      <IoMdAdd />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h5 className={"text-Text-100 md:text-lg font-medium pt-6 pb-5 "}>
          {loading ? "Loading..." : checkoutData.title}
        </h5>

        <div id={"card"} className={"grid lg:grid-cols-2 gap-6 pb-5"}>
          <div>
            <h3 className={"font-semibold text-Text-100"}>সাইজ সিলেক্ট করুন</h3>

            <div className="mt-2 space-y-2">
              {checkoutData.sizes.map((size) => (
                <div className={"flex  gap-3"}>
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={formData.size === size}
                    onChange={() => handleChange("size", size)}
                    className="form-radio text-primary focus:ring-primary "
                  />
                  <span className=" text-Text-100 font-semibold">{size}</span>
                </div>
              ))}
            </div>

            <h3 className={"font-semibold text-Text-100 mt-5"}>
              কালার সিলেক্ট করুন
            </h3>

            <div className="mt-2 space-y-2">
              {checkoutData.colors.map((color) => (
                <div className={"flex  gap-3"}>
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={formData.color === color}
                    onChange={(e) => handleChange("color", e.target.value)}
                    className="form-radio text-primary focus:ring-primary "
                  />
                  <span className=" text-Text-100 font-semibold">{color}</span>
                </div>
              ))}
            </div>

            <div className={"mt-6  space-y-4"}>
              <Input
                LabelName={"আপনার নামঃ"}
                Placeholder={"তোমার নাম"}
                name="name"
                value={formData.name}
                onChange={(val) => handleChange("name", val)}
              />
              <Input
                LabelName={"সম্পুর্ন ঠিকানাঃ"}
                Placeholder={"বাসার নং, রোড নং, থানা, জেলা"}
                name="address"
                value={formData.address}
                onChange={(val) => handleChange("address", val)}
              />

              <Input
                LabelName={"ফোন নাম্বারঃ"}
                Placeholder={"01xxxxxxxxxxxx"}
                name="phone"
                value={formData.phone}
                onChange={(val) => handleChange("phone", val)}
              />
            </div>

            <h3 className={"font-semibold text-Text-100 mt-6"}>Shipping</h3>

            <div className="mt-2 space-y-2">
              {checkoutData.shippingCosts.map((shipping, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input
                    type="radio"
                    name="shippingCost"
                    value={shipping.cost}
                    checked={formData.shippingCost === shipping.cost}
                    onChange={() => handleChange("shippingCost", shipping.cost)}
                    className="form-radio text-primary focus:ring-primary"
                  />
                  <span className="text-Text-100 font-semibold">
                    {shipping.location} - {shipping.cost}TK
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className={"text-xl font-medium text-Text-100"}>Your order</h4>
            <div className={"flex justify-between items-center my-2"}>
              <h5 className={"font-medium text-lg text-Text-100"}>Product</h5>
              <h5 className={"font-medium text-Text-100"}>Subtotal</h5>
            </div>

            {cartProducts
              .filter((item) => item.checked)
              .map((item, index) => (
                <div key={index} className={"flex gap-3 md:items-center mb-2"}>
                  <div className={"h-16 w-16 shrink-0"}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full  object-cover rounded"
                    />
                  </div>

                  <div className={"md:flex gap-3"}>
                    <h5 className={"text-Text-100 text-sm md:text-base flex-1"}>
                      {item.name}
                    </h5>
                    <h5 className={"text-Text-100 font-medium shrink-0"}>
                      {item.quantity} x {item.sellPrice}
                    </h5>
                  </div>
                </div>
              ))}

            <div className={"mt-4  border border-primary/50 rounded "}>
              <div
                className={
                  "flex justify-between items-center p-2 border-b border-secondary/50  "
                }
              >
                <h5 className={"text-Text-100"}>Subtotal </h5>
                <h5 className={"text-Text-100"}>
                  {" "}
                  {cartProducts
                    .filter((p) => p.checked)
                    .reduce(
                      (acc, item) => acc + item.sellPrice * item.quantity,
                      0
                    )}
                  TK
                </h5>
              </div>
              <div className={"flex justify-between items-center p-2"}>
                <h5 className={"text-Text-100"}>Payable</h5>
                <h5 className={"text-Text-100"}>
                  {" "}
                  {cartProducts
                    .filter((p) => p.checked)
                    .reduce(
                      (acc, item) => acc + item.sellPrice * item.quantity,
                      0
                    ) + (formData.shippingCost || 0)}
                  TK
                </h5>
              </div>
            </div>

            <div className={"p-3 mt-4 border border-Line rounded"}>
              <h5 className={"text-Text-100"}>ক্যাশঅন ডেলিভারি</h5>

              <h4
                className={"text-sm p-2  mt-3 rounded text-Text-100 bg-sky-50"}
              >
                পণ্য হাতে পেয়ে ডেলিভারি ম্যানকে পেমেন্ট করতে পারবেন।
              </h4>
            </div>

            <button
              onClick={handleSubmit}
              className="lg:p-3 p-2 bg-primary w-full rounded mt-6 text-white font-semibold cursor-pointer"
            >
              {orderloading ? "loading..." : "অর্ডার করুন"}
              {cartProducts
                .filter((p) => p.checked)
                .reduce(
                  (acc, item) => acc + item.sellPrice * item.quantity,
                  0
                ) + (formData.shippingCost || 0)}
              TK
            </button>
          </div>
        </div>

        <p
          className={
            "col-span-2 text-sm md:text-base text-center my-6 text-Text-100"
          }
        >
          {loading ? "Loading..." : checkoutData.footer}
        </p>
      </div>
    </>
  );
};

export default CheckOutSection;
