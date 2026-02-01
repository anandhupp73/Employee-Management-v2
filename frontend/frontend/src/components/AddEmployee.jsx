import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; 
import { addEmployee } from "../api/employees";
import { ArrowLeft, UserPlus, Phone, DollarSign, User, Building, Image as ImageIcon, Briefcase } from "lucide-react";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    emp_name: "",
    emp_mob: "",
    emp_salary: "",
    department: "",
    profile_photo: null,
  });


  const handleFileChange = (e) => {
    setForm({ ...form, profile_photo: e.target.files[0] });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("emp_name", form.emp_name);
    formData.append("emp_mob", form.emp_mob);
    formData.append("emp_salary", form.emp_salary);
    formData.append("department", form.department);
    if (form.profile_photo) formData.append("profile_photo", form.profile_photo);

    try {
      await api.post("/employees/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Employee added successfully!");
      navigate("/dashboard",{ state: { activeTab: 'employees' } });
    } catch (err) {
      console.error(err);
      alert("Error adding employee. Check if lead is selected correctly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl mb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-medium cursor-pointer">
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
            <UserPlus size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
            <p className="text-gray-500">Complete the profile for the new staff member.</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input required placeholder="John Doe" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setForm({ ...form, emp_name: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mobile */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                <input required type="tel" placeholder="+91 98765..." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  onChange={(e) => setForm({ ...form, emp_mob: e.target.value })} />
              </div>
            </div>
            {/* Salary */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Salary</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                <input required type="number" placeholder="25000" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  onChange={(e) => setForm({ ...form, emp_salary: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 text-gray-400" size={18} />
                <input placeholder="e.g. Sales" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  onChange={(e) => setForm({ ...form, department: e.target.value })} />
              </div>
            </div>
            
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Photo</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="text-gray-400 mb-2" size={24} />
                  <p className="text-sm text-gray-500">{form.profile_photo ? form.profile_photo.name : "Click to upload image"}</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          <button disabled={loading} className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
            {loading ? "Processing..." : "Register Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}