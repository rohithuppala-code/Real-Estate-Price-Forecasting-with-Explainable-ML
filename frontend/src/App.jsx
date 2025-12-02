import { useEffect, useState, useRef } from "react";
import { Home, TrendingUp, DollarSign, ArrowRight, Sparkles, Building2, Key } from "lucide-react";

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [metadata, setMetadata] = useState({});
  const [form, setForm] = useState({
    SquareFeet: "",
    Bedrooms: "",
    Bathrooms: "",
    YearBuilt: "",
    LotSize: "",
    Neighborhood: "",
    HouseStyle: "",
    Exterior: "",
    KitchenQuality: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load dropdown metadata from backend
  useEffect(() => {
    fetch("http://localhost:8000/metadata")
      .then(res => res.json())
      .then(data => setMetadata(data))
      .catch(err => console.error("Error loading metadata:", err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const clean = {
        ...form,
        SquareFeet: Number(form.SquareFeet),
        Bedrooms: Number(form.Bedrooms),
        Bathrooms: Number(form.Bathrooms),
        YearBuilt: Number(form.YearBuilt),
        LotSize: Number(form.LotSize)
      };

      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clean)
      });

      const data = await res.json();
      setPrediction(data.predicted_price);
    } catch (err) {
      console.error("Error predicting price:", err);
    } finally {
      setLoading(false);
    }
  };

  if (showLanding) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 opacity-90"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Houses Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 animate-float">
            <Home size={40} className="text-white/20" />
          </div>
          <div className="absolute top-40 right-20 animate-float-delayed">
            <Building2 size={50} className="text-white/15" />
          </div>
          <div className="absolute bottom-32 left-1/4 animate-float">
            <Key size={35} className="text-white/20" />
          </div>
          <div className="absolute bottom-20 right-1/3 animate-float-delayed">
            <Home size={45} className="text-white/15" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo/Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-full border-4 border-white/20">
                  <Home size={80} className="text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-7xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl tracking-tight">
              Real-Estate Price
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                Forecasting with Explainable ML
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light">
              Unlock the True Value of Your Estate Instantly
            </p>
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
              Powered by advanced AI and machine learning algorithms to give you accurate, 
              instant property valuations
            </p>

            {/* CTA Button */}
            <button
              onClick={() => setShowLanding(false)}
              className="group relative inline-flex items-center gap-3 px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full overflow-hidden shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="animate-spin-slow" size={24} />
                Get Started
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-3xl mx-auto">
              {[
                { icon: "🎯", title: "Accurate", desc: "ML-Powered Analysis" },
                { icon: "⚡", title: "Instant", desc: "Real-Time Results" },
                { icon: "🔒", title: "Secure", desc: "Data Protected" }
              ].map((feature, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-1">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-30px); }
          }
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          .animate-spin-slow {
            animation: spin 3s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-purple-600/80 via-blue-600/80 to-indigo-700/80 backdrop-blur-xl text-white py-12 px-4 shadow-2xl border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Home size={40} className="text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black">Real-Estate Price Forecasting</h1>
          </div>
          <p className="text-center text-xl text-purple-100">with Explainable ML</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-white/20">
          {/* Form Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Numeric Inputs */}
            {[
              { name: "SquareFeet", label: "Square Feet", icon: "📏", color: "purple" },
              { name: "Bedrooms", label: "Bedrooms", icon: "🛏️", color: "blue" },
              { name: "Bathrooms", label: "Bathrooms", icon: "🚿", color: "pink" },
              { name: "YearBuilt", label: "Year Built", icon: "📅", color: "indigo" },
              { name: "LotSize", label: "Lot Size", icon: "🏞️", color: "purple" },
              { name: "Neighborhood", label: "Neighborhood", icon: "🏘️", color: "blue", type: "select" },
              { name: "HouseStyle", label: "House Style", icon: "🏠", color: "pink", type: "select" },
              { name: "Exterior", label: "Exterior", icon: "🎨", color: "indigo", type: "select" },
              { name: "KitchenQuality", label: "Kitchen Quality", icon: "👨‍🍳", color: "purple", type: "select" }
            ].map((field) => (
              <div key={field.name} className="group">
                <label className="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-2xl">{field.icon}</span>
                  {field.label}
                </label>
                {field.type === "select" && (field.name === "Neighborhood" || field.name === "Exterior") ? (
                  <Dropdown
                    name={field.name}
                    value={form[field.name]}
                    options={Array.isArray(metadata[field.name]) ? metadata[field.name] : Object.values(metadata[field.name] || {})}
                    onChange={handleChange}
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 transition-all outline-none text-gray-800 font-medium shadow-lg"
                  >
                    <option value="">Select...</option>
                    {(Array.isArray(metadata[field.name]) ? metadata[field.name] : Object.values(metadata[field.name] || {}))?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 transition-all outline-none text-gray-800 font-medium shadow-lg"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Predict Button */}
          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white font-black py-6 px-8 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white"></div>
                Calculating Your Estate Value...
              </>
            ) : (
              <>
                <TrendingUp size={28} />
                Predict Estate Value Now
                <Sparkles size={28} />
              </>
            )}
          </button>

          {/* Prediction Result */}
          {prediction && (
            <div className="mt-8 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-3xl p-10 shadow-2xl animate-slideIn border-4 border-white/30">
              <div className="flex items-center justify-center gap-3 mb-4">
                <DollarSign size={40} className="text-white animate-bounce" />
                <h2 className="text-3xl font-black text-white">Estimated Property Value</h2>
              </div>
              <p className="text-7xl font-black text-center text-white mt-4 drop-shadow-lg">
                ${prediction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-center text-white/90 mt-4 text-lg font-medium">
                ✨ Based on advanced AI analysis of your property details
              </p>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {[
            { icon: "🎯", title: "Accurate", desc: "ML-Powered", color: "from-purple-500 to-purple-700" },
            { icon: "⚡", title: "Instant", desc: "Real-Time", color: "from-blue-500 to-blue-700" },
            { icon: "🔒", title: "Secure", desc: "Protected", color: "from-pink-500 to-pink-700" },
            { icon: "💎", title: "Premium", desc: "Quality Data", color: "from-indigo-500 to-indigo-700" }
          ].map((card, i) => (
            <div key={i} className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 shadow-xl text-center hover:scale-105 transition-transform border-2 border-white/20`}>
              <div className="text-5xl mb-3">{card.icon}</div>
              <h3 className="font-black text-white text-xl mb-1">{card.title}</h3>
              <p className="text-white/90 font-medium">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default App

function Dropdown({ name, value, options = [], onChange, placeholder = "Select..." }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange({ target: { name, value: val } });
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-4 py-4 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 transition-all outline-none text-gray-800 font-medium shadow-lg flex items-center justify-between"
      >
        <span>{value || placeholder}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full mt-2 max-h-60 overflow-auto bg-white rounded-xl shadow-2xl ring-1 ring-black/5 z-50">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-gray-500">No options</div>
          ) : (
            options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className="w-full text-left px-4 py-2 hover:bg-purple-50 focus:bg-purple-100 text-gray-800"
              >
                {opt}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}