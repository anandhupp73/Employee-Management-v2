import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; 
import { ArrowLeft, UserCheck, Mail, Phone, Save } from "lucide-react";

export default function AddLead() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    lead_name: "",
    email: "",
    phone: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/leads/", form);
      alert("Team Lead added successfully!");
      navigate("/dashboard", { state: { activeTab: 'leads' } }); 
    } catch (err) {
      console.error(err);
      alert("Error adding Lead. Make sure the email is unique.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full max-w-xl mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors font-medium cursor-pointer"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
            <UserCheck size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add Team Lead</h1>
            <p className="text-gray-500">Create a manager to assign employees to.</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Lead Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Lead Name</label>
            <div className="relative">
              <UserCheck className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                required
                type="text"
                placeholder="e.g. Robert Fox"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                onChange={(e) => setForm({ ...form, lead_name: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="robert@company.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="+1 234 567 890"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button 
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                loading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
              }`}
            >
              <Save size={20} />
              {loading ? "Saving..." : "Create Team Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}