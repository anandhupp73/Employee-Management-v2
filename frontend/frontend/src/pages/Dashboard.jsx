import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import {
    Users, Briefcase, CheckCircle, UserRound, Plus,
    LogOut, Menu, X as CloseIcon
} from 'lucide-react';

import Employees from '../components/Employees';
import Works from '../components/Works';
import AssignedWorks from '../components/AssignedWorks';
import Leads from '../components/Leads';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState(
        localStorage.getItem('currentTab') || location.state?.activeTab || 'employees'
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [data, setData] = useState({ employees: [], leads: [], works: [], assigned: [] });

    useEffect(() => {
        localStorage.setItem('currentTab', activeTab);
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            const endpoints = {
                employees: '/employees/',
                leads: '/leads/',
                works: '/works/',
                assigned: '/assigned/'
            };
            const res = await api.get(endpoints[activeTab]);

            console.log(`Data for ${activeTab}:`, res.data);

            setData(prev => ({
                ...prev,
                [activeTab]: res.data.results || res.data
            }));
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const renderActiveComponent = () => {
        switch (activeTab) {
            case 'employees':
                return <Employees data={data.employees} onRefresh={fetchData} />;
            case 'works':
                return <Works data={data.works} onRefresh={fetchData} />;
            case 'assigned':
                return <AssignedWorks data={data.assigned} onRefresh={fetchData} />;
            case 'leads':
                return <Leads data={data.leads} onRefresh={fetchData} />;
            default:
                return <Employees data={data.employees} onRefresh={fetchData} />;
        }
    };

    return (
        <div className="h-screen bg-gray-50 flex flex-col font-sans text-gray-900 overflow-hidden">

            <header className="h-16 flex-none flex items-center justify-between px-4 md:px-8 bg-white border-b border-gray-200 z-30 shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={toggleSidebar} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        {isSidebarOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
                    </button>
                    <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
                        <Briefcase size={20} />
                    </div>
                    <h2 className="text-lg font-bold tracking-tight">StaffPortal</h2>
                </div>

                <button onClick={() => { localStorage.clear(); navigate('/'); }} className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg font-semibold text-sm hover:bg-red-100 transition-colors">
                    <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
                </button>
            </header>

            <div className="flex flex-1 overflow-hidden relative">

                {/* --- MOBILE OVERLAY --- */}
                {isSidebarOpen && (
                    <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={toggleSidebar}></div>
                )}


                <aside className={`
                    fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-4 transform transition-transform duration-300 ease-in-out z-50
                    md:relative md:translate-x-0 md:z-20
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>

                    <div className="flex items-center gap-3 mb-8 md:hidden">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                            <Briefcase size={18} />
                        </div>
                        <h2 className="text-base font-bold">StaffPortal</h2>
                    </div>

                    <div className="flex flex-col gap-2">
                        <SidebarItem icon={<Users size={20} />} label="Employees" active={activeTab === 'employees'} onClick={() => { setActiveTab('employees'); setIsSidebarOpen(false); }} />
                        <SidebarItem icon={<Briefcase size={20} />} label="Works" active={activeTab === 'works'} onClick={() => { setActiveTab('works'); setIsSidebarOpen(false); }} />
                        <SidebarItem icon={<CheckCircle size={20} />} label="Assigned" active={activeTab === 'assigned'} onClick={() => { setActiveTab('assigned'); setIsSidebarOpen(false); }} />
                        <SidebarItem icon={<UserRound size={20} />} label="Team Leads" active={activeTab === 'leads'} onClick={() => { setActiveTab('leads'); setIsSidebarOpen(false); }} />
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full bg-gray-50">
                    <div className="max-w-7xl mx-auto pb-20">

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-extrabold capitalize text-gray-900">
                                    {activeTab === 'assigned' ? 'Assigned Works' : activeTab}
                                </h1>
                                <p className="text-gray-500 text-sm">Overview of {activeTab} records.</p>
                            </div>

                            <button
                                onClick={() => {
                                    const routes = { employees: '/add-employee', leads: '/add-lead', works: '/add-work', assigned: '/assign-work' };
                                    console.log("Current Tab:", activeTab);
                                    console.log("Navigating to:", routes[activeTab]);
                                    navigate(routes[activeTab]);
                                }}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:bg-indigo-700 transition-all"
                            >
                                <Plus size={20} />
                                {activeTab === 'employees' && "Add Employee"}
                                {activeTab === 'leads' && "Add Lead"}
                                {activeTab === 'works' && "Add Work"}
                                {activeTab === 'assigned' && "Assign Work"}
                            </button>
                        </div>

                        {renderActiveComponent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-500 hover:bg-gray-100 hover:text-indigo-600 font-medium'}`}>
        {icon} <span className="font-bold">{label}</span>
    </button>
);

export default Dashboard;