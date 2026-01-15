import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddEmployee from './AddEmployee';
import { 
  Users, 
  Briefcase, 
  CheckCircle, 
  UserRound, 
  Search, 
  Plus, 
  LogOut, 
  Edit, 
  Trash2 
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* --- Header --- */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
            <Briefcase size={24} />
          </div>
          <h2 className="text-xl font-bold tracking-tight">StaffPortal</h2>
        </div>

        <div className="flex-1 max-w-md mx-12 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search employees or tasks..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-all border border-red-100">
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* --- Sidebar --- */}
        <aside className="w-64 bg-white border-r border-gray-200 p-4 hidden md:flex flex-col gap-2">
          <SidebarItem 
            icon={<Users size={20} />} 
            label="Employees" 
            active={activeTab === 'employees'} 
            onClick={() => setActiveTab('employees')} 
          />
          <SidebarItem 
            icon={<Briefcase size={20} />} 
            label="Works" 
            active={activeTab === 'works'} 
            onClick={() => setActiveTab('works')} 
          />
          <SidebarItem 
            icon={<CheckCircle size={20} />} 
            label="Assigned" 
            active={activeTab === 'assigned'} 
            onClick={() => setActiveTab('assigned')} 
          />
          <SidebarItem 
            icon={<UserRound size={20} />} 
            label="Team Leads" 
            active={activeTab === 'leads'} 
            onClick={() => setActiveTab('leads')} 
          />
        </aside>

        {/* --- Content Area --- */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          
          {activeTab === 'employees' && (
            <section>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-extrabold">Employees</h1>
                  <p className="text-gray-500 mt-1">Manage your team members and roles.</p>
                </div>
                <button onClick={ ()=> navigate('/add-employee')} className="flex items-center cursor-pointer gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 shadow-md transition-all font-medium">
                  <Plus size={20} /> Add Employee
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3].map(id => (
                  <div key={id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                        <Users size={28} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">Employee #{id}</h3>
                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full uppercase">Active</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex justify-between"><span>Mobile:</span> <span className="text-gray-900">+91 9876543210</span></p>
                      <p className="flex justify-between"><span>Team Lead:</span> <span className="font-medium text-indigo-600">Robert Fox</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'works' && (
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold">Available Projects</h2>
                <button className="text-indigo-600 font-semibold flex items-center gap-1">
                  <Plus size={18} /> New Work
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                    <tr>
                      <th className="px-8 py-4 font-semibold">Project ID</th>
                      <th className="px-8 py-4 font-semibold">Title</th>
                      <th className="px-8 py-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-indigo-50/30 transition-colors">
                      <td className="px-8 py-4 font-mono text-sm text-indigo-600">#PRJ-404</td>
                      <td className="px-8 py-4 font-medium text-gray-800">Cloud Infrastructure Setup</td>
                      <td className="px-8 py-4 flex gap-4">
                        <button className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                        <button className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

/* --- Sidebar Component --- */
const SidebarItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-indigo-600 text-white shadow-indigo-200 shadow-lg' 
        : 'text-gray-500 hover:bg-gray-100 hover:text-indigo-600'
    }`}
  >
    {icon}
    <span className="font-bold">{label}</span>
  </button>
);

export default Dashboard;