"use client";
import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import Input from "@/components/form/Input";
import API from "@/app/utils/axios";

const CheckOutSection = ({ title = "", description = "", product = [""] }) => {
  const [checked, setChecked] = useState(false);
  const [productPartTitle, setProductPartTitle] = useState("");
  const [checkoutData, setCheckoutData] = useState({
    title: "",
    sizes: [],
    colors: [],
    shippingCosts: [],
    footer: "",
  });
  const [loading, setLoading] = useState(true);

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

        <div className={"mt-4 grid  lg:grid-cols-2 gap-4"}>
          {product.map((item, index) => (
            <div
              key={index}
              className={
                "p-2 border border-Line/50 rounded-md overflow-hidden flex gap-3"
              }
            >
              <label className="cursor-pointer select-none shrink-0">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  className="peer hidden"
                />
                <div
                  className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center 
                                    transition-colors duration-200
                                    ${
                                      checked
                                        ? "bg-primary border-primary"
                                        : "bg-white border-gray-400"
                                    }
                                    peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary`}
                >
                  {checked && (
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
                  src={"/images/product.png"}
                  alt={"/images/product.png"}
                  className="w-full h-full  object-cover"
                />
              </div>

              <div className={"flex-1"}>
                <h5 className={"text-Text-100 md:text-lg font-medium"}>
                  প্রিমিয়াম কোয়ালিটির বোরকাটি পাচ্ছেন এখন ৪৭% ডিসকাউন্ট।
                  প্রিমিয়াম কোয়ালিটির কাপড় এবং অরজিনাল
                </h5>

                <div
                  className={
                    "md:flex gap-6 items-center md:mt-5 mt-1 space-y-2"
                  }
                >
                  <h3 className={"text-xl text-Text-100 font-medium mt-1"}>
                    $400.54{" "}
                    <span className={"text-Text-75 ms-4 line-through text-lg"}>
                      $400.54
                    </span>
                  </h3>
                  <div
                    className={
                      "flex gap-4 items-center border border-Line rounded-md  w-fit text-lg font-medium"
                    }
                  >
                    <button className={"px-3  py-2 border-e border-Line "}>
                      <IoMdRemove />
                    </button>
                    01
                    <button className={"px-3  py-2 border-s border-Line "}>
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
                    value={size}
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
                    value={color}
                    className="form-radio text-primary focus:ring-primary "
                  />
                  <span className=" text-Text-100 font-semibold">{color}</span>
                </div>
              ))}
            </div>

            <div className={"mt-6  space-y-4"}>
              <Input LabelName={"আপনার নামঃ"} Placeholder={"তোমার নাম"} />
              <Input
                LabelName={"সম্পুর্ন ঠিকানাঃ"}
                Placeholder={"বাসার নং, রোড নং, থানা, জেলা"}
              />

              <Input LabelName={"ফোন নাম্বারঃ"} Placeholder={"01722924089"} />
            </div>

            <h3 className={"font-semibold text-Text-100 mt-6"}>Shipping</h3>

            <div className="mt-2 space-y-2">
              {checkoutData.shippingCosts.map((shippingCost, index) => (
                <div key={index} className={"flex  gap-3"}>
                  <input
                    type="radio"
                    name={shippingCost}
                    value={shippingCost}
                    className="form-radio text-primary focus:ring-primary "
                  />
                  <span className=" text-Text-100 font-semibold">
                    {shippingCost}
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

            {product.map((item, index) => (
              <div key={index} className={"flex gap-3 md:items-center mb-2"}>
                <div className={"h-16 w-16 shrink-0"}>
                  <img
                    src={"/images/product.png"}
                    alt={"/images/product.png"}
                    className="w-full h-full  object-cover rounded"
                  />
                </div>

                <div className={"md:flex gap-3"}>
                  <h5 className={"text-Text-100 text-sm md:text-base flex-1"}>
                    {
                      "প্রিমিয়াম কোয়ালিটির বোরকাটি পাচ্ছেন এখন ৪৭% ডিসকাউন্ট। প্রিমিয়াম কোয়ালিটির কাপড় এবং অরজিনাল"
                    }
                  </h5>
                  <h5 className={"text-Text-100 font-medium shrink-0"}>
                    1 x 12500
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
                <h5 className={"text-Text-100"}>{"9,560৳"}</h5>
              </div>
              <div className={"flex justify-between items-center p-2"}>
                <h5 className={"text-Text-100"}>Payable</h5>
                <h5 className={"text-Text-100"}>{"9,560৳"}</h5>
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

            <button className="lg:p-3 p-2 bg-primary w-full rounded mt-6 text-white font-semibold cursor-pointer">
              অর্ডার করুন 9,690৳
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
