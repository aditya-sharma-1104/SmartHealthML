import { useState, useEffect } from 'react';
import { FileText, Terminal, Download, Search } from 'lucide-react';
import API from '../../services/api';

export default function SystemLogs() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const response = await API.get('/api/logs/', {
                params: { type: filter }
            });
            setLogs(response.data);
        } catch (err) {
            console.error('Error fetching logs:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        // Poll for new logs every 30 seconds
        const interval = setInterval(fetchLogs, 30000);
        return () => clearInterval(interval);
    }, [filter]);

    const getTypeColor = (type: string) => {
        switch (type.toUpperCase()) {
            case 'ERROR': return 'text-red-500 bg-red-900/20 border-red-900/50';
            case 'WARNING': return 'text-yellow-500 bg-yellow-900/20 border-yellow-900/50';
            case 'INFO': return 'text-blue-500 bg-blue-900/20 border-blue-900/50';
            default: return 'text-gray-500 bg-gray-900/20 border-gray-900/50';
        }
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <FileText className="w-6 h-6 mr-2 text-gray-700" />
                        System Logs Viewer
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Monitor backend events, errors, and system activity records.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
                <div className="relative w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Filter by message or module..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={fetchLogs}
                        disabled={loading}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                    >
                        {loading ? 'Refreshing...' : 'Refresh Now'}
                    </button>
                    <div className="flex space-x-2">
                        {['all', 'error', 'warning', 'info'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${filter === f
                                    ? 'bg-gray-800 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-800 flex flex-col min-h-[500px]">
                <div className="bg-gray-800 px-4 py-2 flex items-center border-b border-gray-700 text-gray-400 text-xs font-mono">
                    <Terminal className="w-4 h-4 mr-2 text-gray-400" />
                    server_logs.db
                </div>

                <div className="p-4 overflow-y-auto flex-1 font-mono text-sm space-y-1">
                    {loading && logs.length === 0 ? (
                        <div className="text-gray-500 animate-pulse">Loading system events...</div>
                    ) : (
                        logs.filter(log =>
                            log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.module.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length === 0 ? (
                            <div className="text-gray-600 italic">No logs found matching your criteria.</div>
                        ) : (
                            logs
                                .filter(log =>
                                    log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    log.module.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((log) => (
                                    <div key={log.id} className="flex hover:bg-gray-800 p-1 rounded transition-colors break-words group">
                                        <span className="text-gray-500 w-48 flex-shrink-0">[{new Date(log.timestamp).toLocaleString()}]</span>
                                        <span className={`w-20 font-bold mx-2 inline-flex items-center ${getTypeColor(log.type).split(' ')[0]}`}>
                                            {log.type.padEnd(7)}
                                        </span>
                                        <span className="text-purple-400 w-32 flex-shrink-0">[{log.module}]</span>
                                        <span className="text-gray-300 flex-1 pl-4 group-hover:text-white transition-colors">{log.message}</span>
                                    </div>
                                ))
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
