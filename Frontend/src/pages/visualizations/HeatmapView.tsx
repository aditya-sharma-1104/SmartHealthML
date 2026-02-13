import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import API from "../../services/api";

// Fix for default marker icon in React Leaflet
const DefaultIcon = new Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Optimized coordinates for major states (User provided list)
const stateCoordinates: Record<string, [number, number]> = {
    "Assam": [26.2006, 92.9376],
    "Delhi": [28.7041, 77.1025],
    "Maharashtra": [19.7515, 75.7139],
    "Tamil Nadu": [11.1271, 78.6569],
    "Odisha": [20.9517, 85.0985],
    "Kerala": [10.8505, 76.2711],
    "Jharkhand": [23.6102, 85.2799],
    "Gujarat": [22.2587, 71.1924],
    "Uttar Pradesh": [26.8467, 80.9462],
    "Chhattisgarh": [21.2787, 81.8661],
    "Unknown": [20.5937, 78.9629]
};

export default function HeatmapView() {
    const [predictions, setPredictions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get('/heatmap-data');
                setPredictions(response.data);
            } catch (error) {
                console.error('Error fetching heatmap data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 30000); // 30s auto-refresh
        return () => clearInterval(interval);
    }, []);

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
                <div className="h-[600px] w-full rounded-xl overflow-hidden relative z-0 border border-gray-200">
                    <MapContainer
                        center={[20.5937, 78.9629]}
                        zoom={5}
                        scrollWheelZoom={true}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {predictions.map((item, index) => {
                            const coords = stateCoordinates[item.state] || stateCoordinates["Unknown"];

                            const color = item.risk_level === "HIGH" ? "red" :
                                item.risk_level === "MODERATE" ? "orange" :
                                    "green";

                            return (
                                <CircleMarker
                                    key={`circle-${index}`}
                                    center={coords}
                                    radius={15}
                                    pathOptions={{
                                        color: color,
                                        fillColor: color,
                                        fillOpacity: 0.6,
                                        weight: 2
                                    }}
                                >
                                    <Popup>
                                        <div className="p-2 text-center min-w-[120px]">
                                            <h3 className="font-bold text-gray-900 mb-1">{item.state}</h3>
                                            <div className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 inline-block ${color === 'red' ? 'bg-red-100 text-red-700' :
                                                color === 'orange' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-green-100 text-green-700'
                                                }`}>
                                                {item.risk_level} RISK
                                            </div>
                                            <p className="text-sm font-semibold">Intensity: {(item.probability * 100).toFixed(2)}%</p>
                                        </div>
                                    </Popup>
                                </CircleMarker>
                            );
                        })}

                        {predictions.map((item, index) => {
                            const coords = stateCoordinates[item.state] || stateCoordinates["Unknown"];
                            return (
                                <Marker
                                    key={`marker-${index}`}
                                    position={coords}
                                    icon={DefaultIcon}
                                >
                                    <Popup>{item.state}</Popup>
                                </Marker>
                            );
                        })}

                    </MapContainer>
                    {loading && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p className="text-lg font-bold text-blue-900">Synchronizing Heatmap...</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-4 flex items-center justify-center text-xs text-gray-400 font-medium tracking-wide">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    7-DAY ROLLING SURVEILLANCE DATA SHOWN
                </div>
            </div>
        </div>
    );
}
