import { useState } from 'react';
import { Activity, Wind, Droplet, Thermometer, MapPin, AlertTriangle, ChevronRight, ShieldCheck } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import API from "../../services/api";

export default function PredictionPage() {
    const [formData, setFormData] = useState({
        location: 'Maharashtra',
        temperature: '30',
        humidity: '65',
        rainfall: '100',
        ph: '7.0',
        bod: '2.0',
        nitrate: '1.0'
    });

    const [prediction, setPrediction] = useState<null | {
        score: number;
        riskLevel: string;
        likelihood: number;
        message: string;
        confidence: string;
        factors: string[];
        alert: boolean;
    }>(null);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await API.post("/predict", {
                state: formData.location,
                month: new Date().getMonth() + 1,
                rainfall: parseFloat(formData.rainfall) || 0,
                temp: parseFloat(formData.temperature),
                ph: parseFloat(formData.ph) || 7.0,
                bod: parseFloat(formData.bod) || 0,
                nitrate: parseFloat(formData.nitrate) || 0
            });

            const { risk_level, probability, confidence, factors, alert } = response.data;

            // Map backend HIGH/MODERATE/LOW to frontend High/Medium/Low
            const riskMap: Record<string, string> = {
                'HIGH': 'High',
                'MODERATE': 'Medium',
                'LOW': 'Low'
            };

            setPrediction({
                score: Math.round(probability * 100),
                riskLevel: riskMap[risk_level] || 'Low',
                likelihood: Math.round(probability * 100),
                message: `The AI model has detected a ${risk_level} risk of outbreak.`,
                confidence: confidence || 'MODERATE',
                factors: factors || ['Environmental Factors'],
                alert: alert || false
            });
            setLoading(false);

        } catch (error) {
            setLoading(false);
            alert('Failed to get prediction from server');
            console.error('Prediction error:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getScoreColor = (score: number) => {
        if (score < 40) return '#22c55e';
        if (score < 70) return '#eab308';
        return '#ef4444';
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">AI Disease Outbreak Prediction</h1>
                <p className="mt-2 text-gray-600">Professional Health Surveillance & Risk Assessment System</p>
            </div>

            {prediction?.alert && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 animate-pulse rounded-r-xl">
                    <div className="flex items-center">
                        <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                        <div>
                            <p className="text-sm text-red-700 font-bold uppercase tracking-wider">Critical Outbreak Alert Triggered</p>
                            <p className="text-sm text-red-600">Predictive analysis suggests high transmission potential. Escalating to surveillance teams.</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Form */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 border border-gray-100 h-fit">
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-blue-600" />
                        Surveillance Parameters
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">State / Region</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                </div>
                                <input type="text" name="location" required className="pl-10 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border transition-shadow focus:shadow-md" placeholder="e.g. Maharashtra" value={formData.location} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Temp (°C)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Thermometer className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input type="number" name="temperature" required className="pl-10 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border transition-shadow focus:shadow-md" placeholder="30" value={formData.temperature} onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Humidity (%)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Wind className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input type="number" name="humidity" required className="pl-10 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border transition-shadow focus:shadow-md" placeholder="65" value={formData.humidity} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Rainfall (mm)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Droplet className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input type="number" name="rainfall" className="pl-10 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border transition-shadow focus:shadow-md" placeholder="120" value={formData.rainfall} onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">pH Level</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Droplet className="h-4 w-4 text-gray-400 text-blue-300" />
                                    </div>
                                    <input type="number" step="0.1" name="ph" className="pl-10 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border transition-shadow focus:shadow-md" placeholder="7.0" value={formData.ph} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">BOD (mg/L)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input type="number" step="0.1" name="bod" className="block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border transition-shadow focus:shadow-md" placeholder="2.0" value={formData.bod} onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nitrate (mg/L)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input type="number" step="0.1" name="nitrate" className="block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border transition-shadow focus:shadow-md" placeholder="1.0" value={formData.nitrate} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all hover:shadow-lg">
                            {loading ? 'Performing Analysis...' : 'Generate Risk Report'}
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-2 space-y-8">
                    {prediction ? (
                        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-8">
                                <div className="text-center md:text-left space-y-4">
                                    <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                                        <h2 className="text-2xl font-bold text-gray-900">Risk Assessment</h2>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${prediction.confidence === 'VERY HIGH' ? 'bg-green-100 text-green-700 border border-green-200' :
                                            prediction.confidence === 'HIGH' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                                'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                            }`}>
                                            <ShieldCheck className="w-3 h-3" />
                                            Confidence: {prediction.confidence}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${prediction.riskLevel === 'High' ? 'bg-red-100 text-red-700 border border-red-200' :
                                            prediction.riskLevel === 'Medium' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                                                'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                            }`}>
                                            Status: {prediction.riskLevel} Risk
                                        </span>
                                    </div>
                                    <p className="text-gray-600 italic">"{prediction.message}"</p>

                                    <div className="space-y-3">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary Contributing Factors</p>
                                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                            {prediction.factors.map((factor, idx) => (
                                                <span key={idx} className="bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center shadow-sm hover:bg-white transition-colors">
                                                    <ChevronRight className="w-3 h-3 mr-1 text-blue-500" />
                                                    {factor}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="relative w-48 h-48 group">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={20} data={[{ name: 'score', value: prediction.score, fill: getScoreColor(prediction.score) }]} startAngle={90} endAngle={450}>
                                            <RadialBar background dataKey="value" cornerRadius={10} />
                                        </RadialBarChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-4xl font-bold group-hover:scale-110 transition-transform" style={{ color: getScoreColor(prediction.score) }}>{prediction.score}%</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Intensity</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Public Health Advisory</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2 text-sm text-gray-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                                            <span>Initiate heightened vector surveillance in {formData.location}.</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-gray-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                                            <span>Activate community awareness programs for local transmission.</span>
                                        </li>
                                        {prediction.riskLevel === 'High' && (
                                            <li className="flex items-start gap-2 text-sm font-bold text-red-600">
                                                <AlertTriangle className="w-4 h-4 mt-0.5" />
                                                <span>Deploy Rapid Response (RRT) units to critical sectors.</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col justify-center">
                                    <p className="text-[10px] text-gray-400 mb-2">AUTO-GENERATED SURVEILLANCE DATA</p>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
                                            <p className="text-xs text-gray-500">Assessment Timestamp</p>
                                        </div>
                                        <div className="h-10 w-px bg-gray-200"></div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">S-00{Math.floor(Math.random() * 999)}</p>
                                            <p className="text-xs text-gray-500">Report Reference</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 h-full flex flex-col items-center justify-center p-12 text-center group">
                            <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                <Activity className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Historical Trend Analysis</h3>
                            <p className="mt-1 text-gray-500 max-w-sm">Execute professional analysis to generate real-time risk assessments and historical logging.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
