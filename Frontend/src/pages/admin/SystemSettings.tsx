import { useState } from 'react';
import { Settings, Shield, Bell, Database, Save, Globe, Lock } from 'lucide-react';

export default function SystemSettings() {
    const [settings, setSettings] = useState({
        systemName: 'SmartHealth ML',
        maintenanceMode: false,
        allowRegistration: true,
        notifyOnOutbreak: true,
        dataRetention: '365',
        region: 'District A, North Zone'
    });

    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Settings className="w-6 h-6 mr-2 text-indigo-600" />
                    System Settings
                </h1>
                <p className="text-sm text-gray-500 mt-1">Configure global application parameters and security policies.</p>
            </div>

            <div className="bg-white shadow border border-gray-200 rounded-2xl overflow-hidden">
                <div className="p-6 space-y-6">
                    {/* General Settings */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center border-b pb-2">
                            <Globe className="w-4 h-4 mr-2 text-blue-500" />
                            General Configuration
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">System Display Name</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    value={settings.systemName}
                                    onChange={e => setSettings({ ...settings, systemName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Operational Region</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    value={settings.region}
                                    onChange={e => setSettings({ ...settings, region: e.target.value })}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Feature Toggles */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center border-b pb-2">
                            <Shield className="w-4 h-4 mr-2 text-green-500" />
                            Security & Access
                        </h3>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-bold text-gray-900">Public Registration</p>
                                <p className="text-xs text-gray-500">Allow new users to sign up from the login page.</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, allowRegistration: !settings.allowRegistration })}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${settings.allowRegistration ? 'bg-indigo-600' : 'bg-gray-300'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${settings.allowRegistration ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-bold text-red-600 flex items-center">
                                    <Lock className="w-3 h-3 mr-1" /> Maintenance Mode
                                </p>
                                <p className="text-xs text-gray-500">Redirect all traffic to a maintenance page (Admin only access).</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${settings.maintenanceMode ? 'bg-red-500' : 'bg-gray-300'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </section>

                    {/* Alerts & Notifications */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center border-b pb-2">
                            <Bell className="w-4 h-4 mr-2 text-orange-500" />
                            Notifications
                        </h3>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-700">Auto-Alert on Predicted Outbreak</p>
                            <input
                                type="checkbox"
                                checked={settings.notifyOnOutbreak}
                                onChange={e => setSettings({ ...settings, notifyOnOutbreak: e.target.checked })}
                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                            />
                        </div>
                    </section>

                    {/* Data Retention */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center border-b pb-2">
                            <Database className="w-4 h-4 mr-2 text-purple-500" />
                            Data Management
                        </h3>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Archival Period (Days)</label>
                            <select
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                                value={settings.dataRetention}
                                onChange={e => setSettings({ ...settings, dataRetention: e.target.value })}
                            >
                                <option value="90">90 Days</option>
                                <option value="180">180 Days</option>
                                <option value="365">1 Year</option>
                                <option value="730">2 Years</option>
                            </select>
                        </div>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={handleSave}
                        className={`inline-flex items-center px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all shadow-md ${saved ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {saved ? 'Settings Saved!' : 'Save All Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
