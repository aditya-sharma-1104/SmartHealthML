import { useState, useEffect } from 'react';
import { AlertTriangle, Info, CheckCircle, Search, Send, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import API from "../../services/api";

export default function AlertsPanel() {
    const { user } = useAuth();
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await API.get('/api/alerts/');
                setAlerts(response.data);
            } catch (error) {
                console.error('Error fetching alerts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 30000); // 30s auto-refresh
        return () => clearInterval(interval);
    }, []);

    const getTypeStyles = (severity: string) => {
        switch (severity.toLowerCase()) {
            case 'high': return 'bg-red-50 border-l-4 border-red-500 text-red-700';
            case 'medium': return 'bg-orange-50 border-l-4 border-orange-500 text-orange-700';
            case 'low': return 'bg-blue-50 border-l-4 border-blue-500 text-blue-700';
            default: return 'bg-gray-50 border-l-4 border-gray-500';
        }
    };

    const getIcon = (severity: string) => {
        switch (severity.toLowerCase()) {
            case 'high': return <AlertTriangle className="h-5 w-5 text-red-500" />;
            case 'medium': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
            case 'low': return <Info className="h-5 w-5 text-blue-500" />;
            default: return <Info className="h-5 w-5 text-gray-500" />;
        }
    };

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString();
    };

    const filteredAlerts = alerts.filter(alert => {
        if (filter === 'all') return true;
        if (filter === 'critical') return alert.severity === 'high';
        if (filter === 'warning') return alert.severity === 'medium';
        if (filter === 'info') return alert.severity === 'low';
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Alerts & Notifications</h1>
                    <p className="text-sm text-gray-500">Real-time health warnings and system notifications.</p>
                </div>

                {user?.role === 'admin' && (
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <Send className="w-4 h-4 mr-2" />
                        Trigger Manual Alert
                    </button>
                )}
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search alerts..." />
                </div>

                <div className="flex space-x-2">
                    {['all', 'critical', 'warning', 'info'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${filter === f
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Syncing with surveillance node...</p>
                    </div>
                ) : filteredAlerts.length > 0 ? (
                    filteredAlerts.map((alert, idx) => (
                        <div key={idx} className={`${getTypeStyles(alert.severity)} p-4 rounded-md shadow-sm transition-all hover:shadow-md`}>
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    {getIcon(alert.severity)}
                                </div>
                                <div className="ml-3 w-full">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-sm font-bold uppercase tracking-wider">{alert.severity} RISK ALERT: {alert.title}</h3>
                                        <span className="text-[10px] text-opacity-70 font-mono flex items-center">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {formatTime(alert.created_at)}
                                        </span>
                                    </div>
                                    <div className="mt-1 text-sm">
                                        <p>{alert.description}</p>
                                    </div>
                                    <div className="mt-2 text-[10px] font-bold uppercase tracking-widest opacity-70 flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        Surveillance Status: ACTIVE
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                        <CheckCircle className="mx-auto h-12 w-12 text-gray-300" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No active alerts</h3>
                        <p className="mt-1 text-sm text-gray-500">System surveillance active. No critical threats detected in the matching criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

