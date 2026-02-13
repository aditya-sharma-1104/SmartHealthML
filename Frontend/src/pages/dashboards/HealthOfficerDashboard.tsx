import { AlertTriangle, MapPin, Activity, Thermometer } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const predictionData = [
    { name: 'Week 1', risk: 20 },
    { name: 'Week 2', risk: 35 },
    { name: 'Week 3', risk: 50 },
    { name: 'Week 4', risk: 65 },
    { name: 'Week 5', risk: 45 },
];

export default function OfficerDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Health Officer Overview</h1>
                <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    High Alert: Dengue Outbreak in Zone 4
                </span>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="bg-white overflow-hidden shadow rounded-lg p-5 flex items-center">
                    <div className="p-3 bg-red-100 rounded-full">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Critical Alerts</p>
                        <p className="text-2xl font-semibold text-gray-900">3</p>
                    </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg p-5 flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-full">
                        <Activity className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Predicted Outbreaks</p>
                        <p className="text-2xl font-semibold text-gray-900">12% Risk</p>
                    </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg p-5 flex items-center">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <Thermometer className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Active Cases</p>
                        <p className="text-2xl font-semibold text-gray-900">45</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Map Placeholder */}
                <div className="bg-white shadow rounded-lg p-6 min-h-[400px]">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                        Live Risk Heatmap
                    </h3>
                    <div className="bg-gray-100 w-full h-80 rounded flex items-center justify-center border-2 border-dashed border-gray-300">
                        <p className="text-gray-500">Interactive Map Component Loading...</p>
                    </div>
                </div>

                {/* Disease Trend Chart */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Disease Risk Trend (Next 4 Weeks)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={predictionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="risk" stroke="#EF4444" fill="#FEE2E2" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
