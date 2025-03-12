import StaticOfferButton from "./StaticOfferButton"; // Static button

const CustomPackage = () => {
  return (
    <div className="mt-6 p-6 bg-blue-100 rounded-2xl shadow-md border border-blue-200 max-w-md mx-auto">
      <h3 className="font-semibold text-xl text-center text-blue-900">
        Create Your Own Customised Package
      </h3>
      <p className="text-gray-700 text-center mt-2">
        Plan your trip to Bhutan with our expert team.
      </p>
      <div className="flex justify-center mt-4">
        <StaticOfferButton
          className="bg-red-600 hover:bg-red-700"
          onClick={() => console.log("Offer Clicked")}
          label="Get Offer"
        />
      </div>
    </div>
  );
};

export default CustomPackage;
