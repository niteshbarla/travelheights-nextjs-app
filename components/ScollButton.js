import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const ScrollButton = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const form = document.querySelector("form");

    const handleScroll = () => {
      if (!form) return;

      // Check if we're at the top
      setIsAtTop(form.scrollTop === 0);

      // Check if we're at the bottom
      const isBottom =
        Math.abs(form.scrollHeight - form.clientHeight - form.scrollTop) < 1;
      setIsAtBottom(isBottom);
    };

    if (form) {
      form.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      if (form) {
        form.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollTo = (direction) => {
    const form = document.querySelector("form");
    if (!form) return;

    const scrollOptions = {
      behavior: "smooth",
      top: direction === "top" ? 0 : form.scrollHeight,
    };

    form.scrollTo(scrollOptions);
  };

  return (
    <div className="bottom-4 right-4 gap-0">
      {!isAtTop && (
        <button
          onClick={() => scrollTo("top")}
          className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition duration-200"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
      {!isAtBottom && (
        <button
          onClick={() => scrollTo("bottom")}
          className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition duration-200"
          aria-label="Scroll to bottom"
        >
          <ChevronDown size={24} />
        </button>
      )}
    </div>
  );
};

export default ScrollButton;
