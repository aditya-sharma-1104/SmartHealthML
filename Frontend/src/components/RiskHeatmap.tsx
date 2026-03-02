import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import API from '../services/api';

// Fix for default marker icon in React Leaflet
const DefaultIcon = new Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Comprehensive coordinates for Indian States & Territories (Sync with HeatmapView)
export const stateCoordinates: Record<string, [number, number]> = {
    "Andhra Pradesh": [15.9129, 79.7400],
    "Arunachal Pradesh": [28.2180, 94.7278],
    "Assam": [26.2006, 92.9376],
    "Bihar": [25.0961, 85.3131],
    "Chhattisgarh": [21.2787, 81.8661],
    "Goa": [15.2993, 74.1240],
    "Gujarat": [22.2587, 71.1924],
    "Haryana": [29.0588, 76.0856],
    "Himachal Pradesh": [31.1048, 77.1734],
    "Jharkhand": [23.6102, 85.2799],
    "Karnataka": [15.3173, 75.7139],
    "Kerala": [10.8505, 76.2711],
    "Madhya Pradesh": [22.9734, 78.6569],
    "Maharashtra": [19.7515, 75.7139],
    "Manipur": [24.6637, 93.9063],
    "Meghalaya": [25.4670, 91.3662],
    "Mizoram": [23.1645, 92.9376],
    "Nagaland": [26.1584, 94.5624],
    "Odisha": [20.9517, 85.0985],
    "Punjab": [31.1471, 75.3412],
    "Rajasthan": [27.0238, 74.2179],
    "Sikkim": [27.5330, 88.5122],
    "Tamil Nadu": [11.1271, 78.6569],
    "Telangana": [18.1124, 79.0193],
    "Tripura": [23.9408, 91.9882],
    "Uttar Pradesh": [26.8467, 80.9462],
    "Uttarakhand": [30.0668, 79.0193],
    "West Bengal": [22.9868, 87.8550],
    "Delhi": [28.7041, 77.1025],
    "Jammu and Kashmir": [33.7782, 76.5762],
    "Ladakh": [34.1526, 77.5771],
    "Unknown": [20.5937, 78.9629]
};

interface RiskHeatmapProps {
    height?: string;
    zoom?: number;
    focusLocation?: [number, number] | null;
    dataOverride?: any[] | null;
}

// Helper component to handle map flying/panning
function MapUpdater({ center, zoom }: { center: [number, number] | null, zoom: number }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom, { duration: 1.5 });
        }
    }, [center, map, zoom]);
    return null;
}

export default function RiskHeatmap({ height = '400px', zoom = 5, focusLocation = null, dataOverride = null }: RiskHeatmapProps) {
    const [fetchedPredictions, setFetchedPredictions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const predictions = dataOverride || fetchedPredictions;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get('/api/heatmap-data');
                setFetchedPredictions(response.data);
            } catch (error) {
                console.error('Error fetching heatmap data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 60000); // 1 minute auto-refresh
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative rounded-xl overflow-hidden border border-gray-100 shadow-sm" style={{ height }}>
            <MapContainer
                center={[20.5937, 78.9629]}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <MapUpdater center={focusLocation} zoom={focusLocation ? 6 : zoom} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {predictions.map((item, index) => {
                    const coords: [number, number] = (item.latitude !== null && item.longitude !== null && item.latitude !== undefined && item.longitude !== undefined)
                        ? [item.latitude, item.longitude]
                        : (stateCoordinates[item.state] || stateCoordinates["Unknown"]);

                    const color = item.risk_level === "HIGH" ? "red" :
                        item.risk_level === "MODERATE" ? "orange" :
                            "green";

                    return (
                        <CircleMarker
                            key={`circle-${index}`}
                            center={coords}
                            radius={12}
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
                                    <p className="text-sm font-semibold">Intensity: {(item.probability * 100).toFixed(1)}%</p>
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

            {loading && predictions.length === 0 && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-[400]">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                        <p className="text-xs font-bold text-blue-900 italic">Syncing risk zones...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
