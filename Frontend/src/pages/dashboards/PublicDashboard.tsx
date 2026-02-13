import { Flag, ShieldCheck, PhoneCall } from 'lucide-react';

export default function PublicDashboard() {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl shadow-lg overflow-hidden">
                <div className="px-6 py-12 sm:px-12 text-center text-white">
                    <h1 className="text-3xl font-extrabold sm:text-4xl">Community Health & Awareness</h1>
                    <p className="mt-4 text-lg">Stay informed about local health risks and prevention guidelines.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Alerts Section */}
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                        <Flag className="w-6 h-6 mr-2 text-yellow-500" />
                        Local Health Alerts
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-yellow-50 p-4 rounded-md">
                            <p className="font-semibold text-yellow-800">Seasonal Flu Warning</p>
                            <p className="text-sm text-yellow-700 mt-1">Cases rising in Sector 4. Please wear masks in crowded areas.</p>
                        </div>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-400">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                        <ShieldCheck className="w-6 h-6 mr-2 text-blue-500" />
                        Prevention Tips
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Boil drinking water during monsoon season.</li>
                        <li>Use mosquito nets to prevent Dengue.</li>
                        <li>Wash hands frequent with soap.</li>
                    </ul>
                </div>
            </div>

            <div className="bg-indigo-50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-indigo-900 flex items-center">
                        <PhoneCall className="w-5 h-5 mr-2" />
                        Emergency Helpline
                    </h3>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                        <a
                            href="tel:108"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow text-center"
                        >
                            Call 108
                        </a>
                        <a
                            href="sms:108"
                            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow text-center"
                        >
                            Send SMS
                        </a>
                        <button
                            onClick={() => {
                                navigator.geolocation.getCurrentPosition((position) => {
                                    const { latitude, longitude } = position.coords;
                                    window.open(`https://www.google.com/maps/search/hospitals/@${latitude},${longitude},15z`, '_blank');
                                }, () => {
                                    window.open(`https://www.google.com/maps/search/hospitals/`, '_blank');
                                });
                            }}
                            className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition shadow text-center"
                        >
                            Find Hospitals
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
