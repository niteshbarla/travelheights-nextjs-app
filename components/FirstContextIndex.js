import React from "react";
import { Globe, MapPin, Users, Award } from "lucide-react";

const ContextSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose Global Horizons Travel
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Global Reach */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Globe className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-xl font-semibold mb-3">Global Exploration</h3>
            <p className="text-gray-600">
              Discover destinations across 6 continents, with carefully curated
              experiences.
            </p>
          </div>

          {/* Personalized Trips */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <MapPin className="mx-auto mb-4 text-green-600" size={48} />
            <h3 className="text-xl font-semibold mb-3">Tailored Journeys</h3>
            <p className="text-gray-600">
              Custom itineraries designed to match your unique travel
              preferences.
            </p>
          </div>

          {/* Expert Guides */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Users className="mx-auto mb-4 text-purple-600" size={48} />
            <h3 className="text-xl font-semibold mb-3">Expert Guides</h3>
            <p className="text-gray-600">
              Local experts with deep knowledge of destinations and hidden gems.
            </p>
          </div>

          {/* Quality Guarantee */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Award className="mx-auto mb-4 text-yellow-600" size={48} />
            <h3 className="text-xl font-semibold mb-3">Quality Assured</h3>
            <p className="text-gray-600">
              Commitment to exceptional service and unforgettable travel
              experiences.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We transform travel from a simple trip into a transformative
            journey, connecting you with the world's most remarkable
            destinations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContextSection;
