import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Briefcase, AlignLeft, Users, ArrowLeft, Save, Loader2 } from "lucide-react";

export default function UpdateWork() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    work_name: "",
    description: "",
    lead: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both the work details and the list of leads
        const [workRes, leadsRes] = await Promise.all([
          api.get(`/works/${id}/`),
          api.get("/leads/"),
        ]);

        setForm({
          work_name: workRes.data.work_name,
          description: workRes.data.description || "",
          lead: workRes.data.lead ? workRes.data.lead.lead_id : "",
        });
        setLeads(leadsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/works/${id}/`, form);
      navigate("/dashboard"); // Redirect to dashboard or work list
    } catch (err) {
      alert("Failed to update work details.");
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
    <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-indigo-600 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" /> Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Briefcase size={24} />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Update Project/Work</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Work Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Work Title</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  required
                  type="text"
                  value={form.work_name}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  onChange={(e) => setForm({ ...form, work_name: e.target.value })}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-4 text-slate-400" size={18} />
                <textarea
                  rows="4"
                  value={form.description}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>

            {/* Lead Selection */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Assign to Lead</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select
                  value={form.lead}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                  onChange={(e) => setForm({ ...form, lead: e.target.value })}
                >
                  <option value="">-- Select Lead --</option>
                  {leads.map((lead) => (
                    <option key={lead.lead_id} value={lead.lead_id}>
                      {lead.lead_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
              >
                {saving ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Save size={20} />
                    Update Work Details
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}