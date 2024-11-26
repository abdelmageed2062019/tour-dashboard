import React, { useEffect } from "react";
import { Pencil, Trash2, Plus, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link
import { fetchToursAsync, deleteTourAsync } from "../app/tours/toursSlice";

export default function Tours() {
  const dispatch = useDispatch();
  const { tours } = useSelector((state) => state.tours);

  useEffect(() => {
    dispatch(fetchToursAsync());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTourAsync(id));
      dispatch(fetchToursAsync());
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  if (tours.length === 0) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tours Management</h2>
          <Link
            to="/add-tour"
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Tour
          </Link>
        </div>
        <p className="text-gray-600">No tours found.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tours Management</h2>
        <Link
          to="/add-tour"
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Tour
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform "
          >
            {tour.media && tour.media.length > 0 && (
              <video
                controls
                className="w-full h-48 object-cover"
                src={tour.media[0].url}
                alt={tour.title}
              />
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{tour.title}</h3>
                {tour.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{tour.rating}</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-4">{tour.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  {tour.duration}
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {tour.type}
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                  {tour.availability}
                </span>
                {/* <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                  Pickup: {tour.pickupLocation}
                </span> */}
              </div>
              {/* {tour.languages && tour.languages.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700">
                    Languages:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {tour.languages.map((lang, index) => (
                      <li key={index}>{lang}</li>
                    ))}
                  </ul>
                </div>
              )} */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700">City:</p>
                <span className="text-sm text-gray-600">{tour.city}</span>
              </div>
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700">Prices:</p>
                <div className="text-sm text-gray-600">
                  <div className="mb-1">
                    <strong>Private Tour with Lunch:</strong>
                    <ul className="list-disc list-inside">
                      <li>
                        Single: ${tour.prices.privateTourWithLunch.single}
                      </li>
                      <li>
                        Two People: $
                        {tour.prices.privateTourWithLunch.twoPeople}
                      </li>
                      <li>
                        3 to 5 People: $
                        {tour.prices.privateTourWithLunch.threeToFive}
                      </li>
                      <li>
                        Above Six: ${tour.prices.privateTourWithLunch.aboveSix}
                      </li>
                      <li>
                        Child (6 to 11): $
                        {tour.prices.privateTourWithLunch.childSixToEleven}
                      </li>
                      <li>
                        Child (Under 6): $
                        {tour.prices.privateTourWithLunch.childUnderSix}
                      </li>
                    </ul>
                  </div>
                  <div className="mb-1">
                    <strong>Private Tour without Lunch:</strong>
                    <ul className="list-disc list-inside">
                      <li>
                        Single: ${tour.prices.privateTourWithoutLunch.single}
                      </li>
                      <li>
                        Two People: $
                        {tour.prices.privateTourWithoutLunch.twoPeople}
                      </li>
                      <li>
                        3 to 5 People: $
                        {tour.prices.privateTourWithoutLunch.threeToFive}
                      </li>
                      <li>
                        Above Six: $
                        {tour.prices.privateTourWithoutLunch.aboveSix}
                      </li>
                      <li>
                        Child (6 to 11): $
                        {tour.prices.privateTourWithoutLunch.childSixToEleven}
                      </li>
                      <li>
                        Child (Under 6): $
                        {tour.prices.privateTourWithoutLunch.childUnderSix}
                      </li>
                    </ul>
                  </div>
                  <div className="mb-1">
                    <strong>Private Tour Guide:</strong>
                    <ul className="list-disc list-inside">
                      <li>Single: ${tour.prices.privateTourGuide.single}</li>
                      <li>
                        Two People: ${tour.prices.privateTourGuide.twoPeople}
                      </li>
                      <li>
                        3 to 5 People: $
                        {tour.prices.privateTourGuide.threeToFive}
                      </li>
                      <li>
                        Above Six: ${tour.prices.privateTourGuide.aboveSix}
                      </li>
                      <li>
                        Child (6 to 11): $
                        {tour.prices.privateTourGuide.childSixToEleven}
                      </li>
                      <li>
                        Child (Under 6): $
                        {tour.prices.privateTourGuide.childUnderSix}
                      </li>
                    </ul>
                  </div>
                  <div className="mb-1">
                    <strong>Private Car with Driver:</strong>
                    <ul className="list-disc list-inside">
                      <li>
                        Single: ${tour.prices.privateCarWithDriver.single}
                      </li>
                      <li>
                        Two People: $
                        {tour.prices.privateCarWithDriver.twoPeople}
                      </li>
                      <li>
                        3 to 5 People: $
                        {tour.prices.privateCarWithDriver.threeToFive}
                      </li>
                      <li>
                        Above Six: ${tour.prices.privateCarWithDriver.aboveSix}
                      </li>
                      <li>
                        Child (6 to 11): $
                        {tour.prices.privateCarWithDriver.childSixToEleven}
                      </li>
                      <li>
                        Child (Under 6): $
                        {tour.prices.privateCarWithDriver.childUnderSix}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-emerald-600">
                  ${tour.price || "N/A"}
                </span>
                <div className="flex gap-2">
                  <Link
                    to={`/update-tour/${tour._id}`} // Link to Update Tour page
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(tour._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
