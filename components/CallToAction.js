import React, { useState } from "react";
import { Send, MapPin } from "lucide-react";
import StaticOfferButton from "./StaticOfferButton"; // Static button

const CallToAction = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic email validation
    if (email && email.includes("@")) {
      alert("Thank you! We'll send exclusive travel offers soon.");
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Start Your Next Adventure Today
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-center">
          Get personalized travel recommendations and exclusive offers directly
          to your inbox.
        </p>

        <div className="flex justify-center mt-4">
          <StaticOfferButton
            className="bg-green-600 hover:bg-green-700 w-44"
            onClick={() => console.log("Offer Clicked")}
            label="Get Offer"
          />
        </div>

        <div className="flex justify-center items-center mt-8 space-x-4">
          <MapPin className="text-green-300" />
          <p>Explore. Dream. Discover.</p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
