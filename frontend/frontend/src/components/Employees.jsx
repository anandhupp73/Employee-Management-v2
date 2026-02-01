import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';

const Employees = ({ data }) => {
    const navigate = useNavigate(); 

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {data.map(emp => (
                <div 
                    key={emp.emp_id} 
                    onClick={() => navigate(`/employee-detail/${emp.emp_id}`)}
                    className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all cursor-pointer group"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center
                         text-indigo-600 font-bold border border-indigo-100 group-hover:bg-indigo-600
                          group-hover:text-white transition-colors">
                            {emp.profile_photo ? (
                                <img 
                                    src={emp.profile_photo} 
                                    alt="" 
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                emp.emp_name.charAt(0)
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <h3 className="font-bold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
                                {emp.emp_name}
                            </h3>
                            <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">
                                {emp.department || "No Department"}
                            </p>
                        </div>
                    </div>

                    <div className="text-xs space-y-2 text-gray-500 border-t pt-4">
                        
                        <div className="flex justify-between items-center">
                            <span>Contact:</span>
                            <span className="text-gray-900 font-semibold flex items-center gap-1">
                                <Phone size={10} /> {emp.emp_mob}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Employees;