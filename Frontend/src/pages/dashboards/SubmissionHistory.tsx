import { useState, useEffect } from 'react';
import { History, FileText, Calendar, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';

export default function SubmissionHistory() {
    const { user } = useAuth();
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;
            try {
                const [casesRes, waterRes] = await Promise.all([
                    API.get(`/api/cases/my-submissions/${user.id}`),
                    API.get(`/api/water/my-submissions/${user.id}`)
                ]);

                // Add a type flag to distinguish them in the UI and combine
                const cases = casesRes.data.map((c: any) => ({ ...c, reportType: 'case' }));
                const water = waterRes.data.map((w: any) => ({ ...w, reportType: 'water' }));

                const combined = [...cases, ...water].sort((a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );

                setHistory(combined);
            } catch (error) {
                console.error("Failed to fetch submission history", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [user]);

    if (loading) return <div className="p-8 text-center">Loading History...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <History className="w-6 h-6 mr-2 text-indigo-600" />
                        My Submission History
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Review all your reported cases and their current status.</p>
                </div>
                <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100">
                    <span className="text-indigo-700 font-bold text-lg">{history.length}</span>
                    <span className="text-indigo-600 text-xs ml-2 font-medium">Total Reports</span>
                </div>
            </div>

            {history.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No reports found</h3>
                    <p className="text-gray-500 mt-1">You haven't submitted any disease reports yet.</p>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-xl border border-gray-200">
                    <ul className="divide-y divide-gray-200">
                        {history.map((record) => (
                            <li key={record.id} className="hover:bg-gray-50 transition-colors">
                                <div className="px-6 py-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <div className="flex items-center space-x-2">
                                                <p className="text-sm font-bold text-indigo-600 truncate">
                                                    {record.reportType === 'case' ? (record.disease_type || 'Disease Report') : 'Water Quality Report'}
                                                </p>
                                                {record.reportType === 'case' ? (
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${record.severity === 'high' ? 'bg-red-100 text-red-700' :
                                                        record.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {record.severity}
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-100 text-cyan-700">
                                                        pH: {record.ph}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-lg font-semibold text-gray-900 mt-1">
                                                {record.reportType === 'case' ? `${record.patient_name}, ${record.age}y` : `Source: ${record.source}`}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${record.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {record.status === 'resolved' ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                                                {record.status}
                                            </span>
                                            <div className="mt-2 flex items-center text-xs text-gray-500">
                                                <Calendar className="flex-shrink-0 mr-1.5 h-3.5 w-3.5" />
                                                {new Date(record.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                            {record.reportType === 'case' ? record.village : record.location}
                                        </div>
                                        <div className="text-sm text-gray-600 truncate">
                                            {record.reportType === 'case' ? (
                                                <><span className="font-semibold text-gray-700">Symptoms:</span> {record.symptoms}</>
                                            ) : (
                                                <><span className="font-semibold text-gray-700">Turbidity:</span> {record.turbidity} NTU</>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
