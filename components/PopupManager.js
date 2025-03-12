import { useState, useEffect } from "react";
import GetOfferButton from "./GetOfferButton"; // Floating button
import PopupForm from "./PopupForm";

const PopupManager = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Show the popup after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupVisible(true);
    }, 1000); // 1 second

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating Get Offer Button */}
      <GetOfferButton setIsVisible={setIsPopupVisible} />

      {/* Popup Form */}
      <PopupForm isVisible={isPopupVisible} setIsVisible={setIsPopupVisible} />
    </>
  );
};

export default PopupManager;
