import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios"; // Your axios instance
import { User, Phone, DollarSign, Building, Users, Camera, ArrowLeft, Save, Loader2 } from "lucide-react";

// The base URL where your Django server is running
const BASE_URL = "http://127.0.0.1:8000"; 

export default function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [form, setForm] = useState({
    emp_name: "",
    emp_mob: "",
    emp_salary: "",
    department: "",
    lead: "",
    profile_photo: null, // This stores the actual File object for upload
  });

  const [existingPhotoUrl, setExistingPhotoUrl] = useState(""); // URL from Backend
  const [localPreview, setLocalPreview] = useState(null);       // Local blob for new selection

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, leadsRes] = await Promise.all([
          api.get(`/employees/${id}/`),
          api.get("/leads/"),
        ]);
        
        const data = empRes.data;
        setForm({
          emp_name: data.emp_name,
          emp_mob: data.emp_mob,
          emp_salary: data.emp_salary,
          department: data.department,
          lead: data.lead ? data.lead.lead_id : "",
          profile_photo: null, 
        });

        // Handle the photo URL logic
        if (data.profile_photo) {
          // If the API returns a relative path like /media/..., prepend the BASE_URL
          const fullUrl = data.profile_photo.startsWith("http") 
            ? data.profile_photo 
            : `${BASE_URL}${data.profile_photo}`;
          setExistingPhotoUrl(fullUrl);
        }

        setLeads(leadsRes.data);
      } catch (err) {
        console.error("Error fetching employee:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, profile_photo: file });
      setLocalPreview(URL.createObjectURL(file)); // Create temporary preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData();
    formData.append("emp_name", form.emp_name);
    formData.append("emp_mob", form.emp_mob);
    formData.append("emp_salary", form.emp_salary);
    formData.append("department", form.department);
    formData.append("lead", form.lead);
    
    // Only append photo if a new one was selected
    if (form.profile_photo) {
      formData.append("profile_photo", form.profile_photo);
    }

    try {
      await api.put(`/employees/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/employees");
    } catch (err) {
      alert("Error updating employee. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
          <ArrowLeft size={18} className="mr-1" /> Back to List
        </button>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Photo Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
              <div className="relative group w-40 h-40">
                <div className="w-full h-full bg-slate-100 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {localPreview ? (
                    <img src={localPreview} className="w-full h-full object-cover" alt="New Preview" />
                  ) : existingPhotoUrl ? (
                    <img src={existingPhotoUrl} className="w-full h-full object-cover" alt="Current Profile" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <User size={60} />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-1 right-1 p-3 bg-indigo-600 text-white rounded-full shadow-xl cursor-pointer hover:scale-110 transition-transform">
                  <Camera size={20} />
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
              </div>
              <h3 className="mt-4 font-bold text-slate-800">Profile Picture</h3>
              <p className="text-xs text-slate-400">Click camera to change</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Employee Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3 text-slate-400" size={18} />
                  <input type="text" required value={form.emp_name} onChange={(e) => setForm({...form, emp_name: e.target.value})} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Mobile</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3 text-slate-400" size={18} />
                  <input type="text" required value={form.emp_mob} onChange={(e) => setForm({...form, emp_mob: e.target.value})} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Salary</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-3 text-slate-400" size={18} />
                  <input type="number" required value={form.emp_salary} onChange={(e) => setForm({...form, emp_salary: e.target.value})} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">Department</label>
                <div className="relative">
                  <Building className="absolute left-4 top-3 text-slate-400" size={18} />
                  <input type="text" required value={form.department} onChange={(e) => setForm({...form, department: e.target.value})} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none" />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-600">Assigned Lead</label>
                <div className="relative">
                  <Users className="absolute left-4 top-3 text-slate-400" size={18} />
                  <select value={form.lead} onChange={(e) => setForm({...form, lead: e.target.value})} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 outline-none appearance-none">
                    <option value="">Select Lead</option>
                    {leads.map(l => <option key={l.lead_id} value={l.lead_id}>{l.lead_name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <button disabled={saving} type="submit" className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Update Employee Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}