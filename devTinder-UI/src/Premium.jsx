import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./utils/constants.js";

const plans = [
  {
    name: "Bronze",
    duration: "1 Month",
    price: "₹199",
    features: ["Unlimited Likes", "View Profiles", "Basic Support", "Unlimited Chats"],
    badge: "Starter",
    color: "from-amber-700 to-amber-500",
  },
  {
    name: "Silver",
    duration: "2 Months",
    price: "₹349",
    features: ["Unlimited Likes", "View Profiles", "Profile Boost", "Unlimited Chats", "SuperLikes"],
    badge: "Most Popular",
    color: "from-gray-400 to-gray-200",
    highlight: true,
  },
  {
    name: "Gold",
    duration: "3 Months",
    price: "₹499",
    features: ["Unlimited Likes", "View Profiles", "See Who Liked You", "Unlimited Chats", "SuperLikes"],
    badge: "Best Value",
    color: "from-yellow-400 to-yellow-300",
  },
];

const Premium = () => {
  const navigate = useNavigate();
  const [isPremium, setIsPremium] = useState(false);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔍 Check premium status
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/profile`, {
          withCredentials: true,
        });

        setIsPremium(res.data.isPremium);
        setPlan(res.data.membershipPlan);
      } catch (err) {
        console.error("Profile fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handlePayment = async (plan) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/payment/create`,
        { plan },
        { withCredentials: true }
      );

      navigate(res.data.url);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // ✅ ALREADY PREMIUM UI
  if (isPremium) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-6">
        <div className="bg-slate-800 p-10 rounded-2xl shadow-xl text-center max-w-md">
          <h1 className="text-3xl font-bold text-green-400 mb-3">
            🎉 You’re Already Premium
          </h1>
          <p className="text-gray-300 mb-4">
            You already have an active <span className="font-semibold">{plan}</span> membership.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-3 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // 💳 SHOW PLANS
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Upgrade to <span className="text-indigo-400">Premium</span>
        </h1>
        <p className="text-gray-400 mb-14">
          Unlock exclusive features and get more visibility 🚀
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 bg-slate-800 shadow-xl border 
              ${plan.highlight ? "border-indigo-500 scale-105" : "border-slate-700"}`}
            >
              {plan.badge && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 px-4 py-1 rounded-full text-sm font-semibold">
                  {plan.badge}
                </span>
              )}

              <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
              <p className="text-gray-400 mb-4">{plan.duration}</p>
              <p className="text-4xl font-extrabold mb-6">{plan.price}</p>

              <ul className="space-y-3 mb-8 text-gray-300">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-green-400">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePayment(plan.name)}
                className={`w-full py-3 rounded-xl font-semibold text-black bg-gradient-to-r ${plan.color}`}
              >
                Upgrade Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Premium;
