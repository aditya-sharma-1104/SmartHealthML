import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import API from "../../services/api";


export default function WaterQualityForm() {
    const [formData, setFormData] = useState({
        sourceId: '',
        location: '',
        phLevel: 7.0,
        turbidity: 5,
        contaminationNoted: false,
        notes: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await API.post("/water/report", {
                source: formData.sourceId,
                location: formData.location,
                ph: formData.phLevel,
                turbidity: formData.turbidity
            });

            setLoading(false);
            alert('Water quality data recorded successfully!');

            // Reset form
            setFormData({
                sourceId: '',
                location: '',
                phLevel: 7.0,
                turbidity: 5,
                contaminationNoted: false,
                notes: ''
            });

        } catch (error) {
            setLoading(false);
            alert('Failed to submit water quality data');
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Record Water Quality Data</h1>

            <div className="bg-white shadow sm:rounded-lg overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Source Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Source ID / Name</label>
                            <input
                                type="text"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                value={formData.sourceId}
                                onChange={(e) => setFormData({ ...formData, sourceId: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="border-t border-gray-100 pt-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 flex justify-between">
                                pH Level
                                <span className="text-cyan-600 font-bold">{formData.phLevel}</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="14"
                                step="0.1"
                                value={formData.phLevel}
                                onChange={(e) => setFormData({ ...formData, phLevel: parseFloat(e.target.value) })}
                                className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>Acidic (0)</span>
                                <span>Neutral (7)</span>
                                <span>Alkaline (14)</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 flex justify-between">
                                Turbidity (NTU)
                                <span className="text-cyan-600 font-bold">{formData.turbidity}</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={formData.turbidity}
                                onChange={(e) => setFormData({ ...formData, turbidity: parseInt(e.target.value) })}
                                className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                id="contamination"
                                type="checkbox"
                                checked={formData.contaminationNoted}
                                onChange={(e) => setFormData({ ...formData, contaminationNoted: e.target.checked })}
                                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                            />
                            <label htmlFor="contamination" className="ml-2 block text-sm text-gray-900 font-medium">
                                Visible Contamination (Discoloration/Odor)
                            </label>
                        </div>

                        {formData.contaminationNoted && (
                            <div className="bg-red-50 p-4 rounded-md flex items-start">
                                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                                <p className="text-sm text-red-700">
                                    High risk detected. System will automatically flag this source for Health Officer review immediately upon submission.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        >
                            {loading ? 'Recording...' : 'Save Data'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
