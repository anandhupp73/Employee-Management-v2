import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Briefcase, ArrowLeft, Save, AlertCircle, FileText } from 'lucide-react';

const AddWork = () => {
    const navigate = useNavigate();
    const [leads, setLeads] = useState([]);
    const [formData, setFormData] = useState({
        work_name: '',
        description: '',
        lead: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const res = await api.get('/leads/');
                setLeads(res.data);
            } catch (err) {
                console.error("Error fetching leads:", err);
            }
        };
        fetchLeads();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanedData = {
        ...formData,
        lead: formData.lead === "" ? null : formData.lead
    };

    try {
        await api.post('/works/', cleanedData);
        navigate('/dashboard', { state: { activeTab: 'works' } });
    } catch (err) {
        console.error("Django Error Details:", err.response?.data);
        
        const serverError = err.response?.data;
        if (serverError && typeof serverError === 'object') {
            const firstKey = Object.keys(serverError)[0];
            setError(`${firstKey}: ${serverError[firstKey][0]}`);
        } else {
            setError('Failed to add work. Please check your connection.');
        }
        setLoading(false);
    }
};

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center">
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
                        <Briefcase size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Create New Work</h1>
                        <p className="text-gray-500">Define a new project or task for the team.</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 animate-shake">
                        <AlertCircle size={20} />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Work Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Work Name</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="text"
                                required
                                placeholder="e.g. Website Redesign"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                value={formData.work_name}
                                onChange={(e) => setFormData({ ...formData, work_name: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Assign Lead */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Assign Team Lead</label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                            <select
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
                                value={formData.lead}
                                onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                            >
                                <option value="">Select a Lead</option>
                                {leads.map(lead => (
                                    <option key={lead.lead_id} value={lead.lead_id}>
                                        {lead.lead_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea
                            rows="4"
                            placeholder="Details about this work..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
                            }`}
                    >
                        {loading ? "Processing..." : (
                            <>
                                <Save size={20} />
                                Save Work
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddWork;