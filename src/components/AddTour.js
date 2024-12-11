import React, { useState } from "react";
import { createTourAsync } from "../app/tours/toursSlice";
import { useDispatch } from "react-redux";

const AddTour = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    type: "",
    availability: "Available",
    pickUpAndDropOff: "", // New field
    details: "", // New field
    fullDay: "", // New field
    viewPrice: "", // New field
    note: "", // New field
    languages: [],
    city: "",
    media: [], // Array of media objects
    prices: {
      privateTourWithLunch: {
        single: 0,
        twoPeople: 0,
        threeToFive: 0,
        aboveSix: 0,
        childSixToEleven: 0,
        childUnderSix: 0,
      },
      privateTourWithoutLunch: {
        single: 0,
        twoPeople: 0,
        threeToFive: 0,
        aboveSix: 0,
        childSixToEleven: 0,
        childUnderSix: 0,
      },
      privateTourGuide: {
        single: 0,
        twoPeople: 0,
        threeToFive: 0,
        aboveSix: 0,
        childSixToEleven: 0,
        childUnderSix: 0,
      },
      privateCarWithDriver: {
        single: 0,
        twoPeople: 0,
        threeToFive: 0,
        aboveSix: 0,
        childSixToEleven: 0,
        childUnderSix: 0,
      },
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is for prices
    if (name.startsWith("prices.")) {
      const [category, subCategory] = name.split(".").slice(1);
      setFormData((prev) => ({
        ...prev,
        prices: {
          ...prev.prices,
          [category]: {
            ...prev.prices[category],
            [subCategory]: Number(value), // Convert to number
          },
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayInputChange = (e, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      media: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const data = new FormData();
    // Append all form fields to FormData
    for (const key in formData) {
      if (key === "media") {
        formData.media.forEach((file) => {
          data.append("media", file); // Append each file
        });
      } else if (typeof formData[key] === "object") {
        data.append(key, JSON.stringify(formData[key])); // Convert objects to JSON strings
      } else {
        data.append(key, formData[key]);
      }
    }
    console.log(formData);
    // Dispatch the action to create the tour
    await dispatch(createTourAsync(data));
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-lg font-semibold mb-4">Add New Tour</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Availability
            </label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="availability"
                  value="Available"
                  checked={formData.availability === "Available"}
                  onChange={handleInputChange}
                />
                Available
              </label>
              <label>
                <input
                  type="radio"
                  name="availability"
                  value="Not Available"
                  checked={formData.availability === "Not Available"}
                  onChange={handleInputChange}
                />
                Not Available
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pickup and Drop Off
            </label>
            <input
              type="text"
              name="pickUpAndDropOff"
              value={formData.pickUpAndDropOff}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Details
            </label>
            <input
              type="text"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Day
            </label>
            <input
              type="text"
              name="fullDay"
              value={formData.fullDay}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              View Price
            </label>
            <input
              type="text"
              name="viewPrice"
              value={formData.viewPrice}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Languages
            </label>
            <input
              type="text"
              name="languages"
              value={formData.languages.join(", ")}
              onChange={(e) => handleArrayInputChange(e, "languages")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Enter languages separated by commas"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Media
            </label>
            <input
              type="file"
              name="media"
              onChange={handleFileChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              multiple
            />
          </div>
        </div>
        <div>
          <label className="block text-lg mb-4 font-medium text-gray-700">
            Prices
          </label>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(formData.prices).map((category) =>
              Object.keys(formData.prices[category]).map((subCategory) => (
                <div key={`${category}-${subCategory}`}>
                  <label className="block text-sm font-medium text-gray-700">
                    {`${category.replace(
                      /([A-Z])/g,
                      " $1"
                    )} - ${subCategory.replace(/([A-Z])/g, " $1")}`}
                  </label>
                  <input
                    type="number"
                    name={`prices.${category}.${subCategory}`}
                    value={formData.prices[category][subCategory]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Add Tour
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTour;
