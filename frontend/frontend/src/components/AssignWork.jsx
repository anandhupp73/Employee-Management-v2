import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
    ArrowLeft,
    CheckCircle,
    User,
    Briefcase,
    AlertCircle,
    ClipboardCheck
} from "lucide-react";

export default function AssignWork() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        employee: "",
        work: "",
    });

    useEffect(() => {
        const fetchNeededData = async () => {
            try {
                const [empRes, workRes] = await Promise.all([
                    api.get("/employees/"),
                    api.get("/works/")
                ]);
                setEmployees(empRes.data);
                setWorks(workRes.data);
            } catch (err) {
                console.error("Failed to fetch selection data", err);
                setError("Could not load employees or works list.");
            }
        };
        fetchNeededData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await api.post("/assigned/", {
                employee: Number(form.employee),
                work: Number(form.work),
            });

            localStorage.setItem("currentTab", "assigned");
            navigate("/dashboard");
        } catch (err) {
            console.error("Submission error:", err.response?.data);
            setError("Invalid employee or work selection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center">
            {/* Back Button Link */}
            <div className="w-full max-w-2xl mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-medium cursor-pointer transition-colors"
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </button>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Assign Work</h1>
                        <p className="text-gray-500">Connect an employee to a specific task or project.</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 animate-shake">
                        <AlertCircle size={20} />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Employee Selection */}
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />

                        <select
                            required
                            className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-gray-700 font-medium hover:bg-white"
                            value={form.employee}
                            onChange={(e) => setForm({ ...form, employee: e.target.value })}
                        >
                            <option value="" className="text-gray-400">-- Choose Staff Member --</option>
                            {employees.map(emp => (
                                <option key={emp.emp_id} value={emp.emp_id} className="text-gray-900 py-2">
                                    {emp.emp_name} {emp.department ? `(${emp.department})` : ''}
                                </option>
                            ))}
                        </select>

                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Work Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Work / Project</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-3 text-gray-400" size={18} />
                            <select
                                required
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none transition-all"
                                value={form.work}
                                onChange={(e) => setForm({ ...form, work: e.target.value })}
                            >
                                <option value="">-- Choose Work to Assign --</option>
                                {works.map(w => (
                                    <option key={w.work_id} value={w.work_id}>
                                        {w.work_name} {w.lead ? `(Lead: ${w.lead.lead_name})` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
                            }`}
                    >
                        {loading ? "Processing..." : (
                            <>
                                <ClipboardCheck size={20} />
                                Assign Work
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}