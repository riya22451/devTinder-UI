import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./utils/constants.js";
const plans = [
  {
    name: "Bronze",
    duration: "1 Month",
    price: "₹199",
    features: [
      "Unlimited Likes",
      "View Profiles",
      "Basic Support",
      "Unlimited Chats"
    ],
    badge: "Starter",
    color: "from-amber-700 to-amber-500",
  },
  {
    name: "Silver",
    duration: "2 Months",
    price: "₹349",
    features: [
      "Unlimited Likes",
      "View Profiles",
      "Profile Boost",
      "Unlimited Chats",
      "SuperLikes"
    ],
    badge: "Most Popular",
    color: "from-gray-400 to-gray-200",
    highlight: true,
  },
  {
    name: "Gold",
    duration: "3 Months",
    price: "₹499",
    features: [
      "Unlimited Likes",
      "View Profiles",
      "See Who Liked You",
      "Unlimited Chats",
      "SuperLikes"
    ],
    badge: "Best Value",
    color: "from-yellow-400 to-yellow-300",
  },
];



const Premium = () => {
    const navigate=useNavigate()
    const handlePayment = async (plan) => {
  try {
    const res = await axios.post(API_BASE_URL+"api/payment/create", {
      plan
    },{withCredentials:true});

    const data = await res.data;
console.log(data)
    // 🔑 THIS is what Stripe create API gives us (via backend)
    
  navigate(data.url)
  } catch (err) {
    console.log("Payment error full:", error)
  console.log("Message:", error?.message)
  console.log("Response:", error?.response)
  }
};
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
                className={`w-full py-3 rounded-xl font-semibold text-black bg-gradient-to-r ${plan.color} hover:opacity-90 transition`}
                onClick={() => handlePayment(plan.name)}
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
