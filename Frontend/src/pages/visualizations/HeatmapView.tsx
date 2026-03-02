import 'leaflet/dist/leaflet.css';

import RiskHeatmap from '../../components/RiskHeatmap';

export default function HeatmapView() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800">Geographic Risk Visualization</h1>
                <div className="flex space-x-4 text-sm font-medium">
                    <span className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded-full mr-2 shadow-sm"></div> High</span>
                    <span className="flex items-center"><div className="w-3 h-3 bg-orange-500 rounded-full mr-2 shadow-sm"></div> Moderate</span>
                    <span className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-2 shadow-sm"></div> Low</span>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
                <RiskHeatmap height="600px" zoom={5} />
                <div className="mt-4 flex items-center justify-center text-xs text-gray-400 font-medium tracking-wide">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    7-DAY ROLLING SURVEILLANCE DATA SHOWN
                </div>
            </div>
        </div>
    );
}
