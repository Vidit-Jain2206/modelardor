import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../context/ContextAPI";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import SliderButton from "./SliderButton";
import { BsHandbagFill } from "react-icons/bs";
import Footer from "./Footer";

function ProductDetails() {
  const { imageGallery, setBasket } = useContext(Context);
  const [qty, setQty] = useState(0);
  const { code } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [index, setindex] = useState(0);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = () => {
    fetchDataFromApi(
      `products/detail?lang=en&country=in&productcode=${code}`
    ).then((res) => {
      setProductDetails(res.product);
    });
  };
  const handleLeftArrow = useCallback(() => {
    setindex((index) => {
      return index - 1;
    });
  }, []);

  const handleRightArrow = useCallback(() => {
    setindex((index) => {
      return index + 1;
    });
  }, []);
  const handleLeftArrowQty = useCallback(() => {
    if (qty - 1 < 0) return 0;
    setQty(qty - 1);
  }, [qty]);
  const handleRightArrowQty = useCallback(() => {
    setQty(qty + 1);
  }, [qty]);
  const handleSliderBar = useCallback((id) => {
    setindex(id);
  }, []);

  const addItemtoBag = useCallback(
    () => {
      setBasket((basket) => {
        return [
          ...basket,
          {
            pic: imageGallery[0]?.url,
            name: productDetails?.name,
            price: productDetails?.whitePrice?.price,
            qty: qty,
            code: code,
          },
        ];
      });
    },
    [
      code,
      imageGallery,
      productDetails?.name,
      productDetails?.whitePrice?.price,
      qty,
      setBasket,
    ],
    []
  );
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-[3rem] mb-[3rem]">
        {/* imageGallery */}
        <div className="flex flex-col w-[80%] lg:ml-[1rem]">
          <div className="flex flex-row items-center">
            {/* left arrow key */}
            <div className="">
              {index !== 0 && (
                <BsArrowLeft
                  className={"text-lg md:text-xl xl:text-2xl pointer"}
                  onClick={handleLeftArrow()}
                ></BsArrowLeft>
              )}
            </div>

            {/* img */}
            <img
              src={imageGallery[index]?.url}
              alt=""
              className="h-[500px] md:h-[650px]  ml-[1rem]min-w-[80%] rounded-full"
            />

            {/* right arrow key */}
            <div>
              {index !== imageGallery.length - 1 && (
                <BsArrowRight
                  className="text-lg md:text-xl xl:text-2xl pointer"
                  onClick={handleRightArrow}
                ></BsArrowRight>
              )}
            </div>
          </div>
          {/* Slider */}
          <div className="flex flex-row h-[50px] justify-center items-center w-full xl:w-[65%]">
            {imageGallery.map((Element, id) => {
              return (
                <SliderButton
                  key={id}
                  className={id === index ? " bg-[#ff0000]" : ""}
                  action={() => {
                    handleSliderBar(id);
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* details */}

        <div className="flex flex-col max-h-[800px]  mt-[4rem] font-[serif]">
          <h1 className="font-semibold text-xl ml-[1rem] lg:ml-[0rem]">
            {productDetails?.name}
          </h1>
          <p className="mt-[2rem] ml-[1rem] lg:ml-[0rem] text-xl md:text-3xl">
            Rs. {productDetails?.whitePrice?.price}
          </p>
          <div className="flex flex-row items-center justify-start mt-[1rem]">
            <span className="ml-[1rem] lg:ml-[0rem] text-xl">Qty:</span>
            <span className="ml-[2rem] flex flex-row w-[100px] h-[35px]  justify-center items-center">
              <div className="w-[33px] h-full flex items-center justify-center border-black border-[1px]">
                <BsArrowLeft
                  className={"text-base md:text-lg xl:text-xl"}
                  onClick={handleLeftArrowQty}
                ></BsArrowLeft>
              </div>
              <div className="w-[33px] text-base md:text-lg xl:text-xl border-t-[1px] border-b-[1px] border-black h-full flex items-center justify-center">
                {qty}
              </div>
              <div className="w-[33px] h-full flex items-center justify-center border-black border-[1px]">
                <BsArrowRight
                  className="text-base md:text-lg xl:text-xl"
                  onClick={handleRightArrowQty}
                ></BsArrowRight>
              </div>
            </span>
          </div>
          <button
            onClick={addItemtoBag()}
            className=" ml-[1rem] max-w-[250px] lg:ml-[0rem] flex flex-row justify-center  border-[1px] border-[#44DBBD] items-center px-5 py-1 w-2/3 lg:w-[40%] bg-[#44DBBD] mt-[1rem]  hover:bg-white transition-colors duration-300"
          >
            <BsHandbagFill className="mr-[6px]" />
            Add To Bag
          </button>

          {/* product description */}
          <div className="mt-[5rem]">
            <h2 className="text-xl font-semibold ml-[1rem] lg:ml-[0rem]">
              Product Details
            </h2>
            <p className="mt-[1rem] text-lg max-w-[400px] ml-[1rem] lg:ml-[0rem]">
              {productDetails?.description}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
