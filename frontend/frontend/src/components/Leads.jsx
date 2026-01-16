import React from 'react';
import { Mail, Phone, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Leads = ({ data, onRefresh }) => {

    const handleDelete = async (leadId) => {
        if (window.confirm("Are you sure you want to delete this Team Lead?")) {
            try {
                await api.delete(`/leads/${leadId}/`);
                alert("Lead deleted successfully");
                if (onRefresh) onRefresh();
            } catch (err) {
                console.error("Delete error:", err.response?.data);
                alert("Failed to delete. This lead might be assigned to active work.");
            }
        }
    };

    const navigate = useNavigate()

    return(

    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Lead Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Contact Info</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
            {data.map((item, i) => (
                <tr key={item.lead_id || i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-800">{item.lead_name}</td>
                    <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 flex flex-col gap-1">
                            {item.email && <span className="flex items-center gap-1"><Mail size={12} /> {item.email}</span>}
                            {item.phone && <span className="flex items-center gap-1"><Phone size={12} /> {item.phone}</span>}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex justify-center gap-4">
                            <Edit size={18} onClick={()=> navigate(`/update-lead/${item.lead_id}`)} className="text-blue-500 cursor-pointer hover:scale-110 transition-transform" />
                            <Trash2 
                                size={18} 
                                className="text-red-400 cursor-pointer hover:text-red-600 hover:scale-110 transition-all" 
                                onClick={() => handleDelete(item.lead_id)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
    </div>
    );

}

export default Leads;