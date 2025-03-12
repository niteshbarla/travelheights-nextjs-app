"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!recaptchaToken) {
      setErrorMessage("Please complete the reCAPTCHA verification.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage("Error sending message. Please try again.");
    } finally {
      setLoading(false);
      setRecaptchaToken(null); // Reset reCAPTCHA
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

        {/* Contact Form and Map Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Send Us a Message
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              {/* Google reCAPTCHA */}
              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={(token) => setRecaptchaToken(token)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
              {successMessage && (
                <p className="text-green-600 text-sm mt-2">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
              )}
            </form>
          </div>

          {/* Google Map Section */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Our Location
            </h2>
            <div className="w-full overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
