import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { 
    ArrowLeft, 
    Phone, 
    DollarSign, 
    Building, 
    User, 
    Pencil, 
    Trash2, 
    AlertCircle,
    ShieldCheck
} from 'lucide-react';

const EmployeeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await api.get(`/employees/${id}/`);
                setEmployee(res.data);
            } catch (err) {
                setError("Employee not found or server error.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await api.delete(`/employees/${id}/`);
                navigate('/dashboard', { state: { activeTab: 'employees' } });
            } catch (err) {
                alert("Failed to delete employee.");
            }
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen text-indigo-600 font-bold">Loading Profile...</div>;
    
    if (error) return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <AlertCircle size={48} className="text-red-500" />
            <p className="text-gray-600 font-medium">{error}</p>
            <button onClick={() => navigate(-1)} className="text-indigo-600 font-bold">Go Back</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center">
            {/* Top Navigation */}
            <div className="w-full max-w-3xl mb-8">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-medium transition-colors"
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </button>
            </div>

            {/* Profile Card */}
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                {/* Header Background Decoration */}
                <div className="h-32 bg-linear-to-r from-indigo-600 to-violet-600"></div>

                <div className="px-6 md:px-12 pb-12">
                    <div className="relative -mt-16 mb-6 flex flex-col md:flex-row md:items-end gap-6">
                        {/* Profile Photo */}
                        <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-lg overflow-hidden bg-white">
                            {employee.profile_photo ? (
                                <img 
                                    src={employee.profile_photo} 
                                    alt={employee.emp_name} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-indigo-50 flex items-center justify-center text-indigo-300">
                                    <User size={48} />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 pb-2">
                            <h1 className="text-3xl font-extrabold text-gray-900">{employee.emp_name}</h1>
                            <p className="text-indigo-600 font-semibold flex items-center gap-1">
                                <ShieldCheck size={16} /> Verified Staff Member
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mb-2">
                            <button 
                                onClick={() => navigate(`/update-employee/${id}`)}
                                className="p-3 bg-gray-50 text-gray-600 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-gray-100"
                                title="Edit Profile"
                            >
                                <Pencil size={20} />
                            </button>
                            <button 
                                onClick={handleDelete}
                                className="p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all border border-red-100"
                                title="Delete Employee"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>

                    <hr className="border-gray-100 mb-8" />

                    {/* Employee Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <DetailItem 
                            icon={<Phone className="text-blue-500" />} 
                            label="Phone Number" 
                            value={employee.emp_mob} 
                        />
                        <DetailItem 
                            icon={<DollarSign className="text-green-500" />} 
                            label="Monthly Salary" 
                            value={`₹${employee.emp_salary}`} 
                        />
                        <DetailItem 
                            icon={<Building className="text-orange-500" />} 
                            label="Department" 
                            value={employee.department || "Not Assigned"} 
                        />
                        <DetailItem 
                            icon={<User className="text-purple-500" />} 
                            label="Reporting To" 
                            value={employee.lead?.lead_name || "No Team Lead"} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-component for clean detail rows
const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
        <div className="p-3 bg-white rounded-xl shadow-sm">
            {React.cloneElement(icon, { size: 20 })}
        </div>
        <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
            <p className="text-gray-900 font-bold text-lg">{value}</p>
        </div>
    </div>
);

export default EmployeeDetail;