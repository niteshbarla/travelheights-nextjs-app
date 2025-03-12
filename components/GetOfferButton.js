const GetOfferButton = ({ setIsVisible }) => {
  return (
    <button
      onClick={() => setIsVisible(true)}
      className="fixed bottom-6 right-6 bg-red-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
    >
      Get Offer
    </button>
  );
};

export default GetOfferButton;
