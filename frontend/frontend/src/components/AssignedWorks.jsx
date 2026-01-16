import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const AssignedWorks = ({ data }) => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Employee</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Task Assigned</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {data.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-800">{item.employee?.emp_name}</td>
                        <td className="px-6 py-4 text-sm text-indigo-600 font-medium">{item.work?.work_name}</td>
                        <td className="px-6 py-4">
                            <div className="flex justify-center gap-4">
                                <Edit size={18} className="text-blue-500 cursor-pointer" />
                                <Trash2 size={18} className="text-red-400 cursor-pointer" />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default AssignedWorks;