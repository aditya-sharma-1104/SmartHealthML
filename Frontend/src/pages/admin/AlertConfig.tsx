import { useState } from 'react';
import { ShieldAlert, Save, AlertTriangle, Settings, BellRing } from 'lucide-react';

export default function AlertConfig() {
    const [configs, setConfigs] = useState([
        { id: 1, type: 'Cholera', threshold: 0.85, autoNotify: true, severity: 'CRITICAL' },
        { id: 2, type: 'Dengue', threshold: 0.75, autoNotify: true, severity: 'HIGH' },
        { id: 3, type: 'Malaria', threshold: 0.65, autoNotify: false, severity: 'MODERATE' },
        { id: 4, type: 'Typhoid', threshold: 0.80, autoNotify: true, severity: 'HIGH' },
    ]);

    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        // Mock save action
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-5xl space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <ShieldAlert className="w-6 h-6 mr-2 text-red-600" />
                        Alert Configurations
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage threshold levels and automated notification rules for epidemic predictions.</p>
                </div>
                <button
                    onClick={handleSave}
                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${saved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    <Save className="w-4 h-4 mr-2" />
                    {saved ? 'Saved!' : 'Save Configs'}
                </button>
            </div>

            <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disease / Threat</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default Severity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Threshold</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auto-Notify Workers</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {configs.map((config, idx) => (
                            <tr key={config.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 border border-gray-300 rounded-md px-3 py-1.5 bg-gray-50 flex items-center w-32">
                                        <AlertTriangle className="w-4 h-4 mr-2 text-gray-500" />
                                        {config.type}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                                            config.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {config.severity}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="range"
                                            min="0.1" max="0.99" step="0.01"
                                            value={config.threshold}
                                            onChange={(e) => {
                                                const newConfigs = [...configs];
                                                newConfigs[idx].threshold = parseFloat(e.target.value);
                                                setConfigs(newConfigs);
                                            }}
                                            className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-700 w-12 font-mono">{(config.threshold * 100).toFixed(0)}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => {
                                            const newConfigs = [...configs];
                                            newConfigs[idx].autoNotify = !newConfigs[idx].autoNotify;
                                            setConfigs(newConfigs);
                                        }}
                                        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${config.autoNotify ? 'bg-indigo-600' : 'bg-gray-200'}`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${config.autoNotify ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition-colors">
                                        <Settings className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex items-start">
                <BellRing className="w-5 h-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-indigo-900">How Thresholds Work</h4>
                    <p className="text-sm text-indigo-700 mt-1">When the AI Engine predicts an outbreak probability greater than or equal to the defined threshold, the system automatically generates a High Risk Alert and notifies regional Health Officers if "Auto-Notify Workers" is enabled.</p>
                </div>
            </div>
        </div>
    );
}
