import { useEffect } from "react";
import { Users, Map, TrendingUp, DollarSign } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersAsync } from "../app/users/userSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: users.length,
      change: "+12%",
      color: "bg-blue-500",
    },
    {
      icon: Map,
      label: "Active Tours",
      value: "45",
      change: "+5%",
      color: "bg-emerald-500",
    },
    {
      icon: TrendingUp,
      label: "Bookings",
      value: "892",
      change: "+18%",
      color: "bg-purple-500",
    },
    {
      icon: DollarSign,
      label: "Revenue",
      value: "$125,400",
      change: "+22%",
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    stat.change.startsWith("+")
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
              >
                <img
                  src={`https://source.unsplash.com/featured/100x100?tour,travel&sig=${i}`}
                  alt="Tour"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">Swiss Alps Adventure</h4>
                  <p className="text-sm text-gray-500">Booked by John Doe</p>
                </div>
                <span className="text-emerald-600 font-medium">$1,299</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Popular Tours</h3>
          <div className="space-y-4">
            {[4, 5, 6].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
              >
                <img
                  src={`https://source.unsplash.com/featured/100x100?landscape,nature&sig=${i}`}
                  alt="Tour"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">Iceland Northern Lights</h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      ★★★★★ • 24 reviews
                    </span>
                  </div>
                </div>
                <span className="text-emerald-600 font-medium">$2,499</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
