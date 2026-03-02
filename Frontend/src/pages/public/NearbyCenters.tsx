import { useState, useEffect } from 'react';
import { MapPin, Phone, Globe, Navigation, Clock, Star, Search } from 'lucide-react';

interface HealthCenter {
    id: number;
    name: string;
    type: 'Hospital' | 'Clinic' | 'ASHA Center';
    address: string;
    distance: string;
    phone: string;
    hours: string;
    rating: number;
}

const MOCK_CENTERS: HealthCenter[] = [
    {
        id: 1,
        name: 'City General Hospital',
        type: 'Hospital',
        address: 'Sector 12, Main Road',
        distance: '1.2 km',
        phone: '+91 22-243567',
        hours: 'Open 24/7',
        rating: 4.8
    },
    {
        id: 2,
        name: 'Community Wellness Clinic',
        type: 'Clinic',
        address: 'Harbor Heights, Block B',
        distance: '2.5 km',
        phone: '+91 22-987654',
        hours: '08:00 AM - 08:00 PM',
        rating: 4.5
    },
    {
        id: 3,
        name: 'ASHA Support Center - East',
        type: 'ASHA Center',
        address: 'Village Chowk, Near Post Office',
        distance: '0.8 km',
        phone: '+91 104',
        hours: '09:00 AM - 05:00 PM',
        rating: 4.9
    }
];

export default function NearbyCenters() {
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setUserLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
            });
        }
    }, []);

    const openMaps = (address: string) => {
        const query = userLocation
            ? `https://www.google.com/maps/search/${encodeURIComponent(address)}/@${userLocation.lat},${userLocation.lng},15z`
            : `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
        window.open(query, '_blank');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            {/* Hero & Search */}
            <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-3xl p-8 text-white shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Find Healthcare Near You</h1>
                <p className="text-teal-50 opacity-90 mb-8 max-w-xl">
                    Search for hospitals, local clinics, and ASHA support centers in your immediate vicinity.
                </p>

                <div className="relative max-w-2xl">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-600 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search by name, type, or area..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 shadow-xl focus:ring-4 focus:ring-teal-400 focus:outline-none transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Centers List */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-red-500" />
                        Available Facilities
                    </h2>

                    <div className="grid gap-4">
                        {MOCK_CENTERS.map(center => (
                            <div key={center.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6">
                                <div className="bg-gray-50 rounded-xl w-full sm:w-32 h-32 flex items-center justify-center flex-shrink-0">
                                    <Globe className="w-10 h-10 text-gray-300" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${center.type === 'Hospital' ? 'bg-red-50 text-red-700' :
                                                    center.type === 'Clinic' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                                                }`}>
                                                {center.type}
                                            </span>
                                            <h3 className="text-lg font-bold text-gray-900 mt-1">{center.name}</h3>
                                        </div>
                                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-current mr-1" />
                                            <span className="text-xs font-bold text-gray-700">{center.rating}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500 flex items-center">
                                        <MapPin className="w-3.5 h-3.5 mr-1.5" /> {center.address} • <span className="font-semibold text-teal-600 ml-1">{center.distance} away</span>
                                    </p>

                                    <div className="flex flex-wrap gap-4 pt-2">
                                        <div className="flex items-center text-xs text-gray-600">
                                            <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> {center.hours}
                                        </div>
                                        <div className="flex items-center text-xs text-gray-600">
                                            <Phone className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> {center.phone}
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-4">
                                        <button
                                            onClick={() => openMaps(center.address)}
                                            className="flex-1 bg-teal-600 text-white rounded-xl py-2 text-sm font-bold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Navigation className="w-4 h-4" /> Get Directions
                                        </button>
                                        <a
                                            href={`tel:${center.phone}`}
                                            className="px-4 bg-gray-100 text-gray-700 rounded-xl py-2 text-sm font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
                                        >
                                            <Phone className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar info */}
                <div className="space-y-6">
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                        <h3 className="text-red-900 font-bold mb-4 flex items-center">
                            <span className="bg-red-500 text-white p-1 rounded-md mr-2">🚨</span>
                            Emergency Actions
                        </h3>
                        <p className="text-sm text-red-700 mb-6 italic">If this is a life-threatening emergency, call 108 immediately.</p>

                        <div className="space-y-3">
                            <button className="w-full bg-white border border-red-200 text-red-700 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-red-50 transition-colors">
                                Share Live Location
                            </button>
                            <button className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-red-700 transition-colors">
                                Request Ambulance
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h4 className="font-bold text-gray-900 mb-3 text-sm">Center Verification</h4>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">
                            All listed centers are verified by the Ministry of Health. Please report any discrepancies using the help feature.
                        </p>
                        <button className="text-xs font-bold text-teal-600 hover:underline">Support & Feedback</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
