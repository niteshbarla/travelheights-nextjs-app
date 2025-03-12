import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react"; // Import useState for managing the success modal
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA
import ScollButton from "./ScollButton";
// import "@/styles/home.module.style.css";

const PopupForm = ({ isVisible, setIsVisible }) => {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // State for success modal
  const [recaptchaToken, setRecaptchaToken] = useState(""); // State to store reCAPTCHA token

  // Close the popup
  const handleClose = () => {
    setIsVisible(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate reCAPTCHA token
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    // Extract form data
    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      destination: formData.get("destination"),
      travelDate: formData.get("travelDate"),
      duration: formData.get("duration"),
      travelers: {
        adults: formData.get("adults"),
        minors: formData.get("minors"),
        below5: formData.get("below5"),
      },
      hotelType: formData.get("hotelType"),
      message: formData.get("message"),
      recaptchaToken, // Include reCAPTCHA token in the form data
    };

    try {
      const response = await fetch("/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Form Submitted Successfully! We will get back to you soon."); // Alert message
        setIsVisible(false); // Close the form popup
      } else {
        throw new Error(result.message || "Failed to submit form");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Render nothing if the popup is not visible
  if (!isVisible) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center w-full justify-center bg-gray-800 bg-opacity-50 p-4 z-999"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative"
              style={{
                backgroundImage: "url('/bg-image-form-pop2.jpg')", // Replace with your image URL
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.15, // This creates the faded effect
              }}
            >
              <div className="items-center border-b pb-2">
                <h2 className="text-2xl text-center font-bold mb-4 text-gray-900 underline">
                  Get Quote for Free
                </h2>
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                  &times;
                </button>
                <form
                  onSubmit={handleSubmit}
                  className="max-h-96 overflow-y-auto scroll-smooth"
                >
                  {/* Form */}
                  <div className="space-y-4">
                    {/* Destination */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900">
                        Destination
                      </label>
                      <select
                        name="destination"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      >
                        <option value="">Select Destination</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Darjeeling">Darjeeling</option>
                        <option value="Ladakh">Bhutan</option>
                        <option value="Kerala">Meghalaya</option>
                        <option value="Kerala">Arunachal Pradesh</option>
                        <option value="Kerala">Dooars</option>
                      </select>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      />
                    </div>

                    {/* Travel Date */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900">
                        Travel Date
                      </label>
                      <input
                        type="date"
                        name="travelDate"
                        min={new Date().toISOString().split("T")[0]} // Set min to today's date
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      />
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900">
                        Total Duration (Nights)
                      </label>
                      <input
                        type="number"
                        name="duration"
                        min="1"
                        placeholder="Enter number of nights"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      />
                    </div>

                    {/* Number of Travelers */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900">
                        Number of Travellers
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          type="number"
                          name="adults"
                          min="1"
                          placeholder="Adults"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        />
                        <input
                          type="number"
                          name="minors"
                          min="0"
                          placeholder="Minors (5-18 yrs)"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        />
                        <input
                          type="number"
                          name="below5"
                          min="0"
                          placeholder="Below 5 yrs"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        />
                      </div>
                    </div>

                    {/* Hotel Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900">
                        Preferred Hotel Type
                      </label>
                      <select
                        name="hotelType"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      >
                        {[1, 2, 3, 4, 5, 6, 7].map((star) => (
                          <option key={star} value={`${star}-star`}>
                            {star} Star
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900">
                        Additional Message
                      </label>
                      <textarea
                        name="message"
                        placeholder="Enter any special requests or details"
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      ></textarea>
                    </div>

                    {/* reCAPTCHA */}
                    <div>
                      <ReCAPTCHA
                        sitekey="6Lc63tUqAAAAALzzwuA1bMNL369mgvHNWIBy9skG" // Your reCAPTCHA site key
                        onChange={(token) => setRecaptchaToken(token)} // Set the token when the user completes the challenge
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                    >
                      Submit Inquiry
                    </button>
                  </div>
                </form>
                {/* Scroll Button */}
                <ScollButton />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccessModalVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4 z-999"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Form Submitted Successfully!
              </h2>
              <p className="text-gray-700 mb-4">
                Thank you for your inquiry. We will get back to you soon.
              </p>
              <button
                onClick={() => setIsSuccessModalVisible(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PopupForm;
