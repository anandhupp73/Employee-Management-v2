import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Works = ({ data, onRefresh }) => {
    const navigate = useNavigate();

    const handleDelete = async (workId) => {
        if (!window.confirm("Are you sure you want to delete this work?")) return;

        try {
            await api.delete(`/works/${workId}/`);
            if (onRefresh) onRefresh();
        } catch (err) {
            console.error("Delete error:", err.response?.data);
            alert("Failed to delete. This work might be assigned to an employee.");
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto sm:overflow-visible">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Work Title</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Lead Responsible</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data && data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.work_id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-800">{item.work_name}</div>
                                    <div className="text-xs text-gray-400 line-clamp-1">{item.description}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {/* Using lead_name since department isn't in your Works model */}
                                    {item.lead?.lead_name || 'Unassigned'}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-4">
                                        <Edit
                                            size={18}
                                            className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
                                            onClick={() => navigate(`/update-work/${item.work_id}`)}
                                        />
                                        <Trash2
                                            size={18}
                                            className="text-red-400 cursor-pointer hover:text-red-600 hover:scale-110 transition-all"
                                            onClick={() => handleDelete(item.work_id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-10 text-center text-gray-400 italic">
                                No work records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Works;