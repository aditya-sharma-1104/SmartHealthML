import { useState, useEffect } from 'react';
import { Play, FileText, ExternalLink, Phone, ShieldCheck } from 'lucide-react';

const articles = [
    {
        id: 1,
        title: 'Preventing Dengue: Top 5 Measures',
        category: 'Prevention',
        summary: 'Eliminate standing water and use mosquito repellents to keep your home safe.',
        date: 'Oct 12, 2024'
    },
    {
        id: 2,
        title: 'Water Safety Guidelines',
        category: 'Hygiene',
        summary: 'Boil water before drinking and regularly clean storage tanks to prevent cholera.',
        date: 'Sep 28, 2024'
    },
    {
        id: 3,
        title: 'Symptoms of Malaria',
        category: 'Disease Info',
        summary: 'High fever, shaking chills, and profuse sweating are key signs. Seek medical help immediately.',
        date: 'Aug 15, 2024'
    }
];

export default function AwarenessPortal() {
    const [tips, setTips] = useState<string[]>([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/hygiene-tips")
            .then(res => res.json())
            .then(data => setTips(data))
            .catch(err => console.error("Error fetching tips:", err));
    }, []);

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-4">Community Health Knowledge Hub</h1>
                    <p className="max-w-xl text-blue-100 text-lg">Access vital information, prevention guidelines, and health resources to keep your family and community safe.</p>
                    <div className="mt-6 flex space-x-4">
                        <button className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-full hover:bg-blue-50 transition-colors shadow">
                            Browse Articles
                        </button>
                        <button className="bg-blue-500 bg-opacity-30 border border-blue-400 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-500 hover:bg-opacity-50 transition-colors">
                            Emergency Contacts
                        </button>
                    </div>
                </div>
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10"></div>
                <div className="absolute bottom-0 right-20 -mb-20 w-48 h-48 rounded-full bg-white opacity-10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Latest Articles */}
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                        Latest Health Articles
                    </h2>
                    <div className="grid gap-6">
                        {articles.map(article => (
                            <div key={article.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded">
                                        {article.category}
                                    </span>
                                    <span className="text-xs text-gray-400">{article.date}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{article.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{article.summary}</p>
                                <a href="#" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                                    Read more <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar - Videos & Quick Help */}
                <div className="space-y-8">
                    {/* Featured Video */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                            <Play className="w-4 h-4 mr-2 text-red-500" />
                            Featured Video
                        </h3>
                        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center relative group cursor-pointer overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=60" alt="Video Thumbnail" className="object-cover w-full h-40 opacity-90 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <Play className="w-5 h-5 text-red-600 fill-current ml-1" />
                                </div>
                            </div>
                        </div>
                        <p className="mt-3 text-sm font-medium text-gray-800">How to sanitize your water tank correctly.</p>
                    </div>

                    {/* Hygiene Tips */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                            <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                            Live Hygiene Tips
                        </h3>
                        {tips.length > 0 ? (
                            <ul className="space-y-3">
                                {tips.map((tip, index) => (
                                    <li key={index} className="text-sm text-gray-600 flex items-start">
                                        <span className="text-green-500 mr-2">•</span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-400 italic">Fetching the latest tips...</p>
                        )}
                    </div>

                    {/* Emergency Contacts */}
                    <div className="bg-red-50 p-5 rounded-xl border border-red-100">
                        <h3 className="font-bold text-red-800 mb-3 flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            Emergency Helplines
                        </h3>
                        <ul className="space-y-2">
                            <li className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Ambulance</span>
                                <span className="font-bold text-gray-900 font-mono">108</span>
                            </li>
                            <li className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Health Hotline</span>
                                <span className="font-bold text-gray-900 font-mono">104</span>
                            </li>
                            <li className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Chief Medical Officer</span>
                                <span className="font-bold text-gray-900 font-mono">022-243567</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
