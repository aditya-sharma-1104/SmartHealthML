import { UploadCloud, CheckCircle } from 'lucide-react';

export default function ClinicDashboard() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Clinic Staff Portal</h1>
                <p className="text-gray-600 mt-1">Manage patient data and view recent lab reports.</p>
            </div>

            <div className="bg-white p-8 rounded-xl text-center border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer group">
                <div className="rounded-full bg-blue-50 p-4 inline-flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <UploadCloud className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">Upload Patient Data (CSV)</h3>
                <p className="mt-1 text-sm text-gray-500">Drag and drop or click to upload bulk patient records.</p>
                <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow">
                    Select File
                </button>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900">Recent Lab Reports</h2>
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Report ID</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#LAB-{1000 + i}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Patient {i}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-02-{14 - i}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 items-center">
                                            <CheckCircle className="w-3 h-3 mr-1" /> Completed
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
