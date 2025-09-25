import './App.css';
import React, { useState, useEffect, useMemo } from 'react';

// Define global constants for styling
const STATUS_COLORS = {
    'Open': 'bg-green-200 text-green-800 border-green-500',
    'In-Progress': 'bg-yellow-200 text-yellow-800 border-yellow-500',
    'LOW PRIORITY': 'text-blue-500',
    'MEDIUM PRIORITY': 'text-orange-500',
    'HIGH PRIORITY': 'text-red-600',
};

function App() { 
    
    const [tickets, setTickets] = useState([]); 
    const [inProgressTasks, setInProgressTasks] = useState([]); 
    const [resolvedTasks, setResolvedTasks] = useState([]); 
    
    
    const inProgressCount = inProgressTasks.length;
    const resolvedCount = resolvedTasks.length;

    
    useEffect(() => {
        fetch('/cards.json') 
            .then(res => res.json())
            .then(data => {
                setTickets(data); 
                setInProgressTasks([]); 
                setResolvedTasks([]); 
            })
            .catch(error => console.error("Error fetching tickets:", error));
    }, []); 
    const handleCardClick = (ticket) => {
        const isInProgress = inProgressTasks.some(task => task.id === ticket.id);
        const isResolved = resolvedTasks.some(task => task.id === ticket.id);
        
        if (isInProgress || isResolved) {
            alert(`Ticket #${ticket.id} is already being worked on or resolved.`);
            return;
        }

        alert(`Ticket #${ticket.id} (${ticket.title}) added to Task Status.`);
        //  Add to In-Progress sidebar
        setInProgressTasks(prevTasks => [...prevTasks, ticket]);
        
        //  Remove from the Customer Tickets list
        setTickets(prevTickets => prevTickets.filter(t => t.id !== ticket.id));
    };

    const handleCompleteTask = (taskToComplete) => {
        alert(`Task: ${taskToComplete.title} marked as Complete!`);
        
        // 1. Remove from Task Status (decreases In-Progress count)
        setInProgressTasks(prevTasks => prevTasks.filter(task => task.id !== taskToComplete.id));
        
        // 2. Add to Resolved List (increases Resolved count)
        setResolvedTasks(prevTasks => [{ id: taskToComplete.id, title: taskToComplete.title }, ...prevTasks]);
    };

    return (
        <>
            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white">
                <div className="text-2xl font-semibold text-[#120B48]">
                    <span className="font-bold">CS</span> — <span className="font-semibold">Ticket System</span>
                </div>
                <div className="flex items-center space-x-8">
                    <a href="#" className="text-sm hover:text-purple-600 transition">Home</a>
                    <a href="#" className="text-sm hover:text-purple-600 transition">FAQ</a>
                    <a href="#" className="text-sm hover:text-purple-600 transition">Changelog</a>
                    <a href="#" className="text-sm hover:text-purple-600 transition">Blog</a>
                    <a href="#" className="text-sm hover:text-purple-600 transition">Download</a>
                    <a href="#" className="text-sm hover:text-purple-600 transition">Contact</a>
                    <button className="bg-gradient-to-r from-purple-700 to-purple-500 hover:text-black text-white px-4 py-2 rounded-md text-sm font-semibold shadow hover:opacity-90 transition" >
                        <span className="button">＋</span> New Ticket</button>
                </div>
            </nav>

            {/* Banner Cards */}
            <div className="w-full px-6 md:px-12 py-10 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-6 w-full">
                    {/* In-Progress Card */}
                    <div className="flex-1 h-60 rounded-xl bg-gradient-to-r from-purple-700 to-purple-400 text-white p-8 shadow-md flex flex-col justify-center items-center">
                        <p className="text-lg font-medium">In-Progress</p>
                        <p className="text-4xl font-bold mt-2">{inProgressCount}</p> 
                    </div>

                    {/* Resolved Card */}
                    <div className="flex-1 rounded-xl bg-gradient-to-r from-green-300 to-green-600 text-white p-8 shadow-md flex flex-col justify-center items-center">
                        <p className="text-lg font-medium">Resolved</p>
                        <p className="text-4xl font-bold mt-2">{resolvedCount}</p>
                    </div>
                </div>
            </div>

            {/* Main Section */}
            <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* TICKET GRID SECTION (Left - W-3/4) */}
                    <div className="w-full lg:w-3/4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Customer Tickets</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            {tickets.map((ticket) => (
                                <div 
                                    key={ticket.id}
                                    className={`bg-white p-4 rounded-lg shadow-md border-t-4 ${STATUS_COLORS[ticket.status].split(' ').pop()} cursor-pointer hover:shadow-lg transition duration-200`}
                                    onClick={() => handleCardClick(ticket)} 
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{ticket.title}</h3>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${ticket.status === 'Open' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                            {ticket.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{ticket.description}</p>
                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                        <div className="flex items-center space-x-2">
                                            <span className={`font-bold ${STATUS_COLORS[ticket.priority]}`}>
                                                {ticket.priority}
                                            </span>
                                            <span>| #{ticket.id}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span>{ticket.customer}</span>
                                            <span>| {ticket.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* TASK STATUS SIDEBAR (Right - W-1/4) */}
                    <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-xl sticky top-6 self-start">
                        
                        {/* Task Status Section */}
                        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Task Status</h2>
                        <div id="task-status-list" className="space-y-4">
                            {inProgressTasks.length === 0 ? (
                                <p className="text-gray-500 italic">No tasks in progress.</p>
                            ) : (
                                inProgressTasks.map(task => (
                                    <div key={`ip-${task.id}`} className="border p-3 rounded-lg bg-gray-50">
                                        <p className="font-medium text-gray-900 mb-2">{task.title}</p>
                                        <button 
                                            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150"
                                            onClick={() => handleCompleteTask(task)}
                                        >
                                            Complete
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <hr className="my-6" />

                        {/* Resolved Task Section */}
                        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Resolved Task</h2>
                        <div id="resolved-task-list" className="space-y-3">
                            {resolvedTasks.length === 0 ? (
                                <p className="text-gray-500 italic">No resolved tasks yet.</p>
                            ) : (
                                resolvedTasks.map(task => (
                                    <div key={`res-${task.id}`} className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                                        <p className="font-medium text-indigo-800">{task.title}</p>
                                        <div className="mt-2 w-full py-1 px-3 text-center bg-indigo-600 text-white text-sm font-medium rounded-md">Complete</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* footer section */}
           <footer className="bg-black text-white pt-16">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1fr] gap-x-10 gap-y-12 border-b border-gray-700 pb-10">
            
            {/* 1. Logo & Description (Wider Column) */}
            <div className="col-span-2 md:col-span-2 lg:col-span-1">
                <h3 className="text-2xl font-bold mb-4">CS — Ticket System</h3>
                <p className="text-sm text-gray-400 leading-relaxed pr-8">
                    This is a simple customer ticket service webpage. We try to solve your e-ticket related issues and get you available tickets as soon as possible.
                </p>
            </div>

            {/* 2. Company Links */}
            <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-3 text-sm">
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Mission</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Sales</a></li>
                </ul>
            </div>

            {/* 3. Services Links */}
            <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-3 text-sm">
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Products & Services</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Customer Stories</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Download Apps</a></li>
                </ul>
            </div>

            {/* 4. Information Links */}
            <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-4">Information</h4>
                <ul className="space-y-3 text-sm">
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Join Us</a></li>
                </ul>
            </div>
            
            {/* 5. Social Links */}
            <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-4">Social Links</h4>
                <ul className="space-y-3 text-sm">
                    {/* Placeholder for social icons */}
                    <li className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                        <span className="w-4">X</span> <span>@CS — Ticket System</span>
                    </li>
                    <li className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                        <span className="w-4">in</span> <span>@CS — Ticket System</span>
                    </li>
                    <li className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                        <span className="w-4">f</span> <span>@CS — Ticket System</span>
                    </li>
                    <li className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                        <span className="w-4">@</span> <span>support@cst.com</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* Copyright Section */}
        <div className="py-6 text-center text-sm text-gray-500">
            © 2025 CS — Ticket System. All rights reserved.
        </div>
    </div>
</footer>
        </>
    );
}

export default App;