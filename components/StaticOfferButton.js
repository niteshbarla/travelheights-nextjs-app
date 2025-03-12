import { useState } from "react";
import PopupForm from "./PopupForm";

const StaticOfferButton = ({ label = "Get Offer", className = "" }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsPopupVisible(true)}
        className={`text-white px-5 py-3 rounded-full shadow-lg transition duration-300 ${className}`}
      >
        {label}
      </button>

      {/* Popup Form */}
      <PopupForm isVisible={isPopupVisible} setIsVisible={setIsPopupVisible} />
    </>
  );
};

export default StaticOfferButton;
