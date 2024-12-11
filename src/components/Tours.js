import React, { useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Title
            </th>
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              City
            </th>
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Price
            </th>
            <th className="text-left px-6 py-4 font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour, index) => (
            <tr
              key={tour._id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-6 py-4">
                <Link
                  to={`/tours/${tour._id}`}
                  className="text-indigo-600 hover:underline"
                >
                  {tour.title}
                </Link>
              </td>
              <td className="px-6 py-4">{tour.city || "N/A"}</td>
              <td className="px-6 py-4 text-emerald-600 font-semibold">
                ${tour.viewPrice || "N/A"}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/update-tour/${tour._id}`}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
