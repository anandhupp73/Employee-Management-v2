import React from 'react';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';
import api from '../api/axios';

const AssignedWorks = ({ data, onRefresh }) => {

    const markCompleted = async (id) => {
        try {
            await api.patch(`/assigned/${id}/complete/`);
            onRefresh();
        } catch (err) {
            console.error('Mark completed error:', err);
        }
    };

    const deleteAssigned = async (id) => {
        if (!window.confirm('Delete this assignment?')) return;

        try {
            await api.delete(`/assigned/${id}/delete/`);
            onRefresh();
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto sm:overflow-visible">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Employee</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Task Assigned</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {data.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-gray-800">
                                {item.employee_name}
                            </td>

                            <td className="px-6 py-4 text-sm text-indigo-600 font-medium">
                                {item.work_name}
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-6">

                                    {/* STATUS */}
                                    {item.is_completed ? (
                                        <div className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                                            <CheckCircle size={18} />
                                            <span className="hidden sm:inline">Completed</span>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => markCompleted(item.id)}
                                            className="flex items-center gap-1 text-red-600 font-semibold text-sm cursor-pointer hover:text-red-700"
                                        >
                                            <XCircle size={18} />
                                            <span className="hidden sm:inline">Mark as Completed</span>
                                        </div>
                                    )}

                                    {/* DELETE */}
                                    <div
                                        onClick={() => deleteAssigned(item.id)}
                                        className="flex items-center gap-1 text-red-400 font-semibold text-sm cursor-pointer hover:text-red-600"
                                    >
                                        <Trash2 size={18} />
                                        <span className="hidden sm:inline">Delete</span>
                                    </div>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssignedWorks;
