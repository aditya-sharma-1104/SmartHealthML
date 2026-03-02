import { useState, useEffect } from 'react';
import { ShieldCheck, ExternalLink, ChevronRight } from 'lucide-react';
import API from '../../services/api';

// --- Illustrations ---
const HandWashingIllustration = () => (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-40 object-contain">
        <rect width="200" height="160" fill="#EFF6FF" rx="12" />
        <rect x="80" y="20" width="40" height="10" rx="5" fill="#3B82F6" />
        <rect x="95" y="30" width="10" height="25" rx="4" fill="#3B82F6" />
        <ellipse cx="100" cy="62" rx="4" ry="7" fill="#93C5FD" opacity="0.8" />
        <path d="M55 100 Q65 80 80 95 L90 105 Q75 115 60 110 Z" fill="#FBBF24" />
        <path d="M145 100 Q135 80 120 95 L110 105 Q125 115 140 110 Z" fill="#FBBF24" />
        <circle cx="100" cy="100" r="10" fill="#BFDBFE" opacity="0.8" stroke="#60A5FA" strokeWidth="1.5" />
        <rect x="70" y="135" width="60" height="18" rx="9" fill="#3B82F6" />
        <text x="100" y="148" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">20 SECONDS</text>
    </svg>
);

const RespiratoryIllustration = () => (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-40 object-contain">
        <rect width="200" height="160" fill="#F0FDF4" rx="12" />
        <circle cx="100" cy="70" r="28" fill="#FBBF24" />
        <path d="M125 100 Q150 85 145 65 Q143 58 138 62 Q142 80 120 93 Z" fill="#22C55E" opacity="0.7" />
        <text x="143" y="67" textAnchor="middle" fill="#1D4ED8" fontSize="16">🛡️</text>
        <circle cx="55" cy="50" r="12" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
        <text x="55" y="55" textAnchor="middle" fill="#EF4444" fontSize="10">🦠</text>
    </svg>
);

const SurfaceIllustration = () => (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-40 object-contain">
        <rect width="200" height="160" fill="#FFF7ED" rx="12" />
        <rect x="120" y="50" width="30" height="60" rx="8" fill="#3B82F6" />
        <ellipse cx="60" cy="112" rx="35" ry="10" fill="#FBBF24" opacity="0.8" />
        <text x="155" y="100" textAnchor="middle" fill="#F59E0B" fontSize="14">✨</text>
    </svg>
);

// --- Data ---
const STATIC_TIPS = [
    {
        category: 'Hand Hygiene',
        title: 'The 20-Second Scrub',
        description: 'Washing hands with soap and water for at least 20 seconds removes 99% of harmful germs.',
        color: { bg: 'from-blue-50 to-blue-100', badge: 'bg-blue-500', border: 'border-blue-200', text: 'text-blue-700', btnBg: 'bg-blue-500 hover:bg-blue-600' },
        Illustration: HandWashingIllustration,
        link: 'https://www.who.int/gpsc/5may/Hand_Hygiene_Why_How_and_When_Brochure.pdf',
    },
    {
        category: 'Respiratory Etiquette',
        title: 'The Elbow Shield',
        description: 'Always sneeze or cough into the crook of your elbow, not your hands.',
        color: { bg: 'from-green-50 to-green-100', badge: 'bg-green-500', border: 'border-green-200', text: 'text-green-700', btnBg: 'bg-green-500 hover:bg-green-600' },
        Illustration: RespiratoryIllustration,
        link: 'https://www.cdc.gov/hygiene/about/respiratory-etiquette.html',
    },
    {
        category: 'Surface Disinfection',
        title: 'The Daily Wipe',
        description: 'High-touch surfaces like doorknobs and phones should be disinfected daily.',
        color: { bg: 'from-orange-50 to-orange-100', badge: 'bg-orange-500', border: 'border-orange-200', text: 'text-orange-700', btnBg: 'bg-orange-500 hover:bg-orange-600' },
        Illustration: SurfaceIllustration,
        link: 'https://www.cdc.gov/covid/prevention/cleaning.html',
    },
];

export default function HygieneTipsPage() {
    const [liveTips, setLiveTips] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLiveTips = async () => {
            try {
                const response = await API.get('/api/public/hygiene-tips');
                setLiveTips(response.data);
            } catch (err) {
                console.error("Failed to fetch live tips", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLiveTips();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Stay Healthy, Stay Protected</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Simple, science-backed habits to keep you and your community safe from infectious diseases.
                </p>
            </div>

            {/* Main Tips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {STATIC_TIPS.map((tip) => (
                    <div key={tip.title} className={`bg-gradient-to-b ${tip.color.bg} rounded-3xl border-2 ${tip.color.border} p-6 shadow-sm hover:shadow-xl transition-all duration-300 group`}>
                        <div className="mb-6 transform group-hover:scale-105 transition-transform">
                            <tip.Illustration />
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${tip.color.text} bg-white/50 px-3 py-1 rounded-full`}>
                            {tip.category}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-2">{tip.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">{tip.description}</p>
                        <a
                            href={tip.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center text-sm font-bold ${tip.color.text} hover:underline`}
                        >
                            Read Full Guide <ExternalLink className="w-4 h-4 ml-1.5" />
                        </a>
                    </div>
                ))}
            </div>

            {/* Live Tips Sidebar style section */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-indigo-600 p-8 text-white flex flex-col justify-center">
                    <ShieldCheck className="w-12 h-12 mb-4 text-indigo-300" />
                    <h2 className="text-2xl font-bold">Daily Health Pulse</h2>
                    <p className="mt-2 text-indigo-100 italic">"Live updates and essential precautions from local health authorities."</p>
                </div>
                <div className="lg:col-span-2 p-8">
                    {loading ? (
                        <div className="flex items-center space-x-3 text-gray-400">
                            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent animate-spin rounded-full" />
                            <span>Updating live tips...</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {liveTips.map((tip, idx) => (
                                <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                    <ChevronRight className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 font-medium text-sm leading-snug">{tip}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
