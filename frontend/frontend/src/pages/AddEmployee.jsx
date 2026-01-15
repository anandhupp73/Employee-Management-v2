import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../api/employees";
import { ArrowLeft, UserPlus, Phone, DollarSign, User } from "lucide-react";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    emp_name: "",
    emp_mob: "",
    emp_salary: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    addEmployee(form)
      .then(() => {
        alert("Employee added successfully!");
        navigate("/dashboard"); // Redirect back to dashboard after success
      })
      .catch((err) => alert("Error adding employee"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center">
      {/* Header Area */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors font-medium cursor-pointer"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
            <UserPlus size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
            <p className="text-gray-500">Fill in the details to register a new staff member.</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                required
                placeholder="e.g. John Doe"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                onChange={(e) => setForm({ ...form, emp_name: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mobile Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  required
                  type="tel"
                  placeholder="+91 98765..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  onChange={(e) => setForm({ ...form, emp_mob: e.target.value })}
                />
              </div>
            </div>

            {/* Salary Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Salary</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  required
                  type="number"
                  placeholder="e.g. 25000"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  onChange={(e) => setForm({ ...form, emp_salary: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 hover:shadow-indigo-200'
              }`}
            >
              {loading ? "Processing..." : "Register Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}