import { useState, useEffect } from 'react';
import { Users, AlertTriangle, Activity, Database } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API from '../../services/api';

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
            <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                    <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                        <dd>
                            <div className="text-lg font-medium text-gray-900">{value}</div>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
                <span className={`font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
                <span className="text-gray-500"> from last month</span>
            </div>
        </div>
    </div>
);

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await API.get('/api/stats/admin');
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="flex items-center justify-center h-full p-20">Loading Dashboard...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Users"
                    value={stats?.totalUsers || "0"}
                    icon={Users}
                    color="bg-blue-500"
                    trend={12}
                />
                <StatCard
                    title="Active Alerts"
                    value={stats?.activeAlerts || "0"}
                    icon={AlertTriangle}
                    color="bg-red-500"
                    trend={-5}
                />
                <StatCard
                    title="Reports Filed"
                    value={stats?.totalCases || "0"}
                    icon={Database}
                    color="bg-indigo-500"
                    trend={23}
                />
                <StatCard
                    title="System Health"
                    value={stats?.systemHealth || "N/A"}
                    icon={Activity}
                    color="bg-green-500"
                    trend={1}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Chart Section */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">System Activity</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats?.chartData || []}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="cases" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Actions / Logs */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent System Logs</h3>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <li key={item} className="px-6 py-4">
                                <div className="flex space-x-3">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium">User Activity</h3>
                                            <p className="text-sm text-gray-500">{item * 5} min ago</p>
                                        </div>
                                        <p className="text-sm text-gray-500">System check completed for District {item}.</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
