import { Flag, Phone, ExternalLink } from 'lucide-react';

// --- SVG Illustrations ---

const HandWashingIllustration = () => (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-40 object-contain">
        <rect width="200" height="160" fill="#EFF6FF" rx="12" />
        {/* Faucet */}
        <rect x="80" y="20" width="40" height="10" rx="5" fill="#3B82F6" />
        <rect x="95" y="30" width="10" height="25" rx="4" fill="#3B82F6" />
        {/* Water drops */}
        <ellipse cx="100" cy="62" rx="4" ry="7" fill="#93C5FD" opacity="0.8" />
        <ellipse cx="93" cy="70" rx="3" ry="5" fill="#BFDBFE" opacity="0.7" />
        <ellipse cx="107" cy="70" rx="3" ry="5" fill="#BFDBFE" opacity="0.7" />
        {/* Left hand */}
        <path d="M55 100 Q65 80 80 95 L90 105 Q75 115 60 110 Z" fill="#FBBF24" />
        <rect x="76" y="82" width="8" height="25" rx="4" fill="#FBBF24" />
        <rect x="86" y="78" width="8" height="28" rx="4" fill="#FBBF24" />
        <rect x="66" y="86" width="8" height="22" rx="4" fill="#FBBF24" />
        {/* Right hand */}
        <path d="M145 100 Q135 80 120 95 L110 105 Q125 115 140 110 Z" fill="#FBBF24" />
        <rect x="116" y="82" width="8" height="25" rx="4" fill="#FBBF24" />
        <rect x="106" y="78" width="8" height="28" rx="4" fill="#FBBF24" />
        <rect x="126" y="86" width="8" height="22" rx="4" fill="#FBBF24" />
        {/* Soap bubbles */}
        <circle cx="88" cy="95" r="8" fill="#DBEAFE" opacity="0.9" stroke="#93C5FD" strokeWidth="1.5" />
        <circle cx="112" cy="92" r="6" fill="#DBEAFE" opacity="0.9" stroke="#93C5FD" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="10" fill="#BFDBFE" opacity="0.8" stroke="#60A5FA" strokeWidth="1.5" />
        {/* Timer text */}
        <rect x="70" y="135" width="60" height="18" rx="9" fill="#3B82F6" />
        <text x="100" y="148" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">20 SECONDS</text>
    </svg>
);

const RespiratoryIllustration = () => (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-40 object-contain">
        <rect width="200" height="160" fill="#F0FDF4" rx="12" />
        {/* Person body */}
        <ellipse cx="100" cy="135" rx="35" ry="20" fill="#22C55E" opacity="0.3" />
        <rect x="75" y="90" width="50" height="50" rx="10" fill="#22C55E" opacity="0.6" />
        {/* Head */}
        <circle cx="100" cy="70" r="28" fill="#FBBF24" />
        {/* Face eyes */}
        <circle cx="90" cy="65" r="4" fill="white" />
        <circle cx="110" cy="65" r="4" fill="white" />
        <circle cx="91" cy="66" r="2" fill="#1E40AF" />
        <circle cx="111" cy="66" r="2" fill="#1E40AF" />
        {/* Right arm raised to elbow */}
        <path d="M125 100 Q150 85 145 65 Q143 58 138 62 Q142 80 120 93 Z" fill="#22C55E" opacity="0.7" />
        {/* Elbow area with shield icon */}
        <circle cx="143" cy="62" r="15" fill="#3B82F6" opacity="0.2" />
        <text x="143" y="67" textAnchor="middle" fill="#1D4ED8" fontSize="16">🛡️</text>
        {/* Germ particles - crossed out */}
        <circle cx="55" cy="50" r="12" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
        <text x="55" y="55" textAnchor="middle" fill="#EF4444" fontSize="10">🦠</text>
        <line x1="45" y1="40" x2="65" y2="60" stroke="#EF4444" strokeWidth="2.5" />
        <line x1="65" y1="40" x2="45" y2="60" stroke="#EF4444" strokeWidth="2.5" />
    </svg>
);

const SurfaceDisinfectionIllustration = () => (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-40 object-contain">
        <rect width="200" height="160" fill="#FFF7ED" rx="12" />
        {/* Table surface */}
        <rect x="20" y="115" width="160" height="12" rx="6" fill="#D97706" opacity="0.5" />
        {/* Spray bottle */}
        <rect x="120" y="50" width="30" height="60" rx="8" fill="#3B82F6" />
        <rect x="130" y="40" width="15" height="15" rx="4" fill="#1D4ED8" />
        <path d="M135 40 L125 25 L120 28" stroke="#1D4ED8" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="118" cy="29" r="4" fill="#1D4ED8" />
        {/* Spray particles */}
        <circle cx="105" cy="60" r="4" fill="#BAE6FD" opacity="0.9" />
        <circle cx="95" cy="72" r="5" fill="#93C5FD" opacity="0.8" />
        <circle cx="108" cy="78" r="3" fill="#BAE6FD" opacity="0.7" />
        <circle cx="85" cy="65" r="4" fill="#7DD3FC" opacity="0.8" />
        {/* Wipe / cloth */}
        <ellipse cx="60" cy="112" rx="35" ry="10" fill="#FBBF24" opacity="0.8" />
        <ellipse cx="60" cy="112" rx="28" ry="7" fill="#FCD34D" />
        {/* Arm/hand doing the wiping */}
        <path d="M25 100 Q45 95 60 108 L65 115 Q50 122 30 115 Z" fill="#FBBF24" />
        {/* Shine/clean marks */}
        <text x="155" y="100" textAnchor="middle" fill="#F59E0B" fontSize="14">✨</text>
        <text x="40" y="95" textAnchor="middle" fill="#F59E0B" fontSize="10">✨</text>
    </svg>
);

const FoodSafetyIllustration = () => (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-40 object-contain">
        <rect width="200" height="160" fill="#F0FDF4" rx="12" />
        {/* Plate */}
        <ellipse cx="100" cy="120" rx="60" ry="15" fill="#E5E7EB" />
        <ellipse cx="100" cy="118" rx="55" ry="12" fill="white" stroke="#D1D5DB" strokeWidth="1" />
        {/* Vegetables - broccoli */}
        <circle cx="75" cy="95" r="18" fill="#22C55E" opacity="0.8" />
        <circle cx="70" cy="88" r="10" fill="#16A34A" opacity="0.9" />
        <circle cx="82" cy="86" r="10" fill="#16A34A" opacity="0.9" />
        <rect x="72" y="100" width="6" height="18" rx="3" fill="#15803D" />
        {/* Carrot */}
        <path d="M110 115 L125 80 L130 82 L115 117 Z" fill="#F97316" />
        <path d="M123 80 L128 77 L130 82 Z" fill="#22C55E" />
        <path d="M127 79 L132 76 L133 81 Z" fill="#22C55E" />
        {/* Water droplets showing washing */}
        <ellipse cx="155" cy="50" rx="15" ry="35" fill="#BAE6FD" opacity="0.6" rx-fix="12" />
        <path d="M155 20 Q170 35 155 55 Q140 35 155 20 Z" fill="#3B82F6" opacity="0.8" />
        <text x="155" y="80" textAnchor="middle" fill="#1D4ED8" fontSize="9" fontWeight="bold">WASH</text>
        {/* Checkmark */}
        <circle cx="40" cy="50" r="18" fill="#22C55E" opacity="0.2" />
        <path d="M31 50 L38 57 L50 43" stroke="#16A34A" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PersonalGroomingIllustration = () => (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-40 object-contain">
        <rect width="200" height="160" fill="#EFF6FF" rx="12" />
        {/* Mirror */}
        <rect x="60" y="15" width="80" height="100" rx="12" fill="white" stroke="#93C5FD" strokeWidth="3" />
        <rect x="63" y="18" width="74" height="94" rx="10" fill="#DBEAFE" opacity="0.5" />
        {/* Person reflection in mirror */}
        <circle cx="100" cy="55" r="22" fill="#FBBF24" />
        <circle cx="93" cy="50" r="3" fill="#1E3A8A" />
        <circle cx="107" cy="50" r="3" fill="#1E3A8A" />
        <path d="M93 63 Q100 70 107 63" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Hair */}
        <path d="M78 45 Q80 28 100 26 Q120 28 122 45 Q115 32 100 30 Q85 32 78 45 Z" fill="#92400E" />
        {/* Toothbrush */}
        <rect x="115" y="100" width="8" height="40" rx="4" fill="#3B82F6" />
        <rect x="113" y="100" width="12" height="15" rx="3" fill="#60A5FA" />
        {/* Toothpaste star */}
        <circle cx="145" cy="95" r="15" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="145" y="100" textAnchor="middle" fill="#1D4ED8" fontSize="10">🦷</text>
        {/* Comb */}
        <rect x="30" y="85" width="25" height="8" rx="4" fill="#6366F1" />
        {[33, 38, 43, 48].map((x, i) => (
            <rect key={i} x={x} y="93" width="3" height="12" rx="1.5" fill="#6366F1" />
        ))}
        {/* sparkles */}
        <text x="35" y="70" textAnchor="middle" fill="#F59E0B" fontSize="12">✨</text>
        <text x="165" y="55" textAnchor="middle" fill="#F59E0B" fontSize="10">✨</text>
    </svg>
);

// --- Tip Data ---
const hygieneTimps = [
    {
        category: 'Hand Hygiene',
        title: 'The 20-Second Scrub',
        description: 'Washing hands with soap and water for at least 20 seconds removes 99% of harmful germs. It is the single most effective way to prevent the spread of infections and disease.',
        color: { bg: 'from-blue-50 to-blue-100', badge: 'bg-blue-500', border: 'border-blue-200', text: 'text-blue-700', btnBg: 'bg-blue-500 hover:bg-blue-600' },
        Illustration: HandWashingIllustration,
        link: 'https://www.who.int/gpsc/5may/Hand_Hygiene_Why_How_and_When_Brochure.pdf',
    },
    {
        category: 'Respiratory Etiquette',
        title: 'The Elbow Shield',
        description: 'Always sneeze or cough into the crook of your elbow, not your hands. This simple habit prevents respiratory germs from transferring to surfaces and other people you touch.',
        color: { bg: 'from-green-50 to-green-100', badge: 'bg-green-500', border: 'border-green-200', text: 'text-green-700', btnBg: 'bg-green-500 hover:bg-green-600' },
        Illustration: RespiratoryIllustration,
        link: 'https://www.cdc.gov/hygiene/about/respiratory-etiquette.html',
    },
    {
        category: 'Surface Disinfection',
        title: 'The 60-Second Wipe-Down',
        description: 'High-touch surfaces like doorknobs, phones, and keyboard should be disinfected daily with an appropriate cleaning agent. Letting the disinfectant sit for 60 seconds greatly increases effectiveness.',
        color: { bg: 'from-orange-50 to-orange-100', badge: 'bg-orange-500', border: 'border-orange-200', text: 'text-orange-700', btnBg: 'bg-orange-500 hover:bg-orange-600' },
        Illustration: SurfaceDisinfectionIllustration,
        link: 'https://www.cdc.gov/covid/prevention/cleaning.html',
    },
    {
        category: 'Food Safety',
        title: 'Clean Before You Eat',
        description: 'Always wash raw fruits and vegetables under clean running water before consuming them, even if you plan to peel them. Germs on the outside of produce can be transferred to the inside when cutting.',
        color: { bg: 'from-emerald-50 to-emerald-100', badge: 'bg-emerald-500', border: 'border-emerald-200', text: 'text-emerald-700', btnBg: 'bg-emerald-500 hover:bg-emerald-600' },
        Illustration: FoodSafetyIllustration,
        link: 'https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-produce-safely',
    },
    {
        category: 'Personal Grooming',
        title: 'The Daily Habit Rule',
        description: 'Regular personal grooming — including daily teeth brushing, hair combing, and clean clothing — prevents bacterial buildup and protects your skin. It also reduces the chance of transmitting infections to others.',
        color: { bg: 'from-indigo-50 to-indigo-100', badge: 'bg-indigo-500', border: 'border-indigo-200', text: 'text-indigo-700', btnBg: 'bg-indigo-500 hover:bg-indigo-600' },
        Illustration: PersonalGroomingIllustration,
        link: 'https://www.cdc.gov/hygiene/about/personal-hygiene.html',
    },
];

export default function PublicDashboard() {
    return (
        <div className="space-y-10">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl shadow-lg overflow-hidden">
                <div className="px-6 py-12 sm:px-12 text-center text-white">
                    <h1 className="text-3xl font-extrabold sm:text-4xl">Community Health &amp; Awareness</h1>
                    <p className="mt-4 text-lg opacity-90">Stay informed about local health risks and prevention guidelines.</p>
                </div>
            </div>

            {/* Alerts + Emergency in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Alerts Section */}
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                        <Flag className="w-6 h-6 mr-2 text-yellow-500" />
                        Local Health Alerts
                    </h2>
                    <div className="space-y-3">
                        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                            <p className="font-semibold text-yellow-800">Seasonal Flu Warning</p>
                            <p className="text-sm text-yellow-700 mt-1">Cases rising in Sector 4. Please wear masks in crowded areas.</p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-md border border-red-200">
                            <p className="font-semibold text-red-800">Water Quality Advisory</p>
                            <p className="text-sm text-red-700 mt-1">Boil drinking water in districts 7 & 8 until further notice.</p>
                        </div>
                    </div>
                </div>

                {/* Emergency Helpline */}
                <div className="bg-indigo-50 rounded-lg shadow p-6 flex flex-col justify-between border border-indigo-100">
                    <h3 className="text-lg font-bold text-indigo-900 flex items-center mb-4">
                        <Phone className="w-5 h-5 mr-2" />
                        Emergency Helpline
                    </h3>
                    <div className="flex flex-col space-y-3">
                        <a href="tel:108" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow text-center">
                            📞 Call 108 – Ambulance
                        </a>
                        <a href="sms:108" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow text-center">
                            💬 Send SMS Alert
                        </a>
                        <button
                            onClick={() => {
                                navigator.geolocation.getCurrentPosition(
                                    (pos) => window.open(`https://www.google.com/maps/search/hospitals/@${pos.coords.latitude},${pos.coords.longitude},15z`, '_blank'),
                                    () => window.open('https://www.google.com/maps/search/hospitals/', '_blank')
                                );
                            }}
                            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition shadow text-center"
                        >
                            🗺️ Find Nearest Hospital
                        </button>
                    </div>
                </div>
            </div>

            {/* Hygiene Tips Section */}
            <div>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">🧼 Essential Hygiene Tips</h2>
                    <p className="text-gray-500 mt-1 text-sm">Follow these daily habits to protect yourself and your community from disease.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                    {hygieneTimps.map((tip) => (
                        <div
                            key={tip.title}
                            className={`bg-gradient-to-b ${tip.color.bg} rounded-2xl border ${tip.color.border} shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group`}
                        >
                            {/* Illustration */}
                            <div className="p-3 pt-4">
                                <tip.Illustration />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1 p-4 pt-2">
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${tip.color.text} mb-1`}>
                                    {tip.category}
                                </span>
                                <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{tip.title}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed flex-1">{tip.description}</p>

                                {/* Read More */}
                                <a
                                    href={tip.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`mt-4 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white ${tip.color.btnBg} px-4 py-2 rounded-lg transition-colors`}
                                >
                                    Read More <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
