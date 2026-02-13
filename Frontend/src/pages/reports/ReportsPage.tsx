import { useState, useEffect } from 'react';
import { FileBarChart, PieChart, TrendingUp, Download } from 'lucide-react';
import { PieChart as ReChartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import API from "../../services/api";

export default function ReportsPage() {
    const [summary, setSummary] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await API.get('/report-summary');
                setSummary(response.data);
            } catch (error) {
                console.error('Error fetching summary:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
        const interval = setInterval(fetchSummary, 30000); // 30s auto-refresh
        return () => clearInterval(interval);
    }, []);

    const pieData = summary ? [
        { name: 'High Risk', value: summary.high_risk, color: '#ef4444' },
        { name: 'Moderate Risk', value: summary.moderate_risk, color: '#f97316' },
        { name: 'Low Risk', value: summary.low_risk, color: '#22c55e' }
    ].filter(item => item.value > 0) : [];

    // Mock trend data for demonstration (normally would come from another API)
    const trendData = [
        { month: 'Jan', cases: 20 },
        { month: 'Feb', cases: 35 },
        { month: 'Mar', cases: 15 },
        { month: 'Apr', cases: 45 },
        { month: 'May', cases: 60 },
        { month: 'Jun', cases: 30 },
    ];

    if (loading) return <div className="p-8 text-center">Loading Surveillance Reports...</div>;

    return (
        <div className="space-y-8 p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Health Surveillance Reports</h1>
                    <p className="text-gray-500">Consolidated analytics from AI-driven outbreak predictions.</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Predictions</p>
                        <p className="text-2xl font-bold">{summary?.total_predictions || 0}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center space-x-4">
                    <div className="p-3 bg-red-50 rounded-lg text-red-600">
                        <FileBarChart className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">High Risk Events</p>
                        <p className="text-2xl font-bold">{summary?.high_risk || 0}</p>
                    </div>
                </div>
                {/* Add more metrics as needed */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Risk Distribution Pie Chart */}
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <PieChart className="w-5 h-5 mr-2 text-orange-500" />
                        Risk Level Distribution
                    </h2>
                    <div className="h-80">
                        {pieData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <ReChartsPie>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </ReChartsPie>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400 italic">
                                Insufficient data for distribution analysis.
                            </div>
                        )}
                    </div>
                </div>

                {/* Training Trend (Mock) */}
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                        Monthly Outbreak Patterns
                    </h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="cases" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
