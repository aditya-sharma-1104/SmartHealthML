import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { UploadCloud, CheckCircle, Loader2, FileText, AlertCircle, Download } from 'lucide-react';
import API from '../../services/api';

interface LabReport {
    id: number;
    report_id: string;
    patient_id: string;
    test_name: string;
    result: string;
    status: string;
    date: string;
}

export default function ClinicDashboard() {
    const location = useLocation();
    const [reports, setReports] = useState<LabReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isUploadView = location.pathname.includes('/clinic/upload');
    const isReportsView = location.pathname.includes('/clinic/reports');
    const isDashboardView = !isUploadView && !isReportsView;

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await API.get('/api/clinic/reports');
            setReports(res.data);
        } catch (err) {
            console.error("Failed to fetch reports", err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            await API.post('/api/clinic/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage({ type: 'success', text: 'Patient data uploaded successfully!' });
            fetchReports(); // Refresh reports if any were included (though currently it's just patients)
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (err: any) {
            setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to upload CSV.' });
        } finally {
            setUploading(false);
        }
    };

    const downloadTemplate = () => {
        const csvContent = "data:text/csv;charset=utf-8,patient_id,name,age,gender,contact,address\nP001,John Doe,45,Male,9876543210,123 Main St";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "patient_template.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isUploadView ? 'Upload Patient Data' : isReportsView ? 'Lab Reports' : 'Clinic Staff Portal'}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {isUploadView ? 'Upload bulk patient records via CSV.' : isReportsView ? 'Manage and track recent patient lab reports.' : 'Manage patient data and view recent lab reports.'}
                    </p>
                </div>
                {isUploadView && (
                    <button
                        onClick={downloadTemplate}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download Template
                    </button>
                )}
            </div>

            {/* Upload Section */}
            {(isDashboardView || isUploadView) && (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`bg-white p-8 rounded-xl text-center border-2 border-dashed transition-all cursor-pointer group ${uploading ? 'opacity-50 cursor-not-allowed border-gray-300' : 'border-gray-300 hover:border-blue-500'
                        }`}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".csv"
                        onChange={handleFileUpload}
                        disabled={uploading}
                    />
                    <div className="rounded-full bg-blue-50 p-4 inline-flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        {uploading ? (
                            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                        ) : (
                            <UploadCloud className="h-10 w-10 text-blue-500" />
                        )}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-gray-900">
                        {uploading ? 'Uploading Data...' : 'Upload Patient Data (CSV)'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Drag and drop or click to upload bulk patient records.</p>
                    <button
                        disabled={uploading}
                        className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center mx-auto gap-2"
                    >
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                        Select CSV File
                    </button>

                    {message && (
                        <div className={`mt-4 p-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium animate-bounce-subtle ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                            }`}>
                            {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            {message.text}
                        </div>
                    )}
                </div>
            )}

            {/* Lab Reports Table */}
            {(isDashboardView || isReportsView) && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">Recent Lab Reports</h2>
                        <button onClick={fetchReports} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Refresh</button>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        {loading ? (
                            <div className="p-12 text-center flex flex-col items-center gap-3">
                                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                <p className="text-gray-500">Loading reports...</p>
                            </div>
                        ) : reports.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Report ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Test</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {reports.map((report) => (
                                        <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{report.report_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.patient_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.test_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full items-center gap-1 ${report.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {report.status === 'Completed' && <CheckCircle className="w-3 h-3" />}
                                                    {report.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-12 text-center flex flex-col items-center gap-4">
                                <div className="p-4 bg-gray-50 rounded-full">
                                    <FileText className="w-8 h-8 text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="text-gray-900 font-semibold">No lab reports found</h3>
                                    <p className="text-gray-500 text-sm mt-1">Upload patient data or wait for synced records.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
