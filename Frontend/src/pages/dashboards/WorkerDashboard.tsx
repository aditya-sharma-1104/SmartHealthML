import { ClipboardPlus, Droplet, FileText, History } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActionCard = ({ title, description, icon: Icon, to, color }: any) => (
    <Link to={to} className="block group">
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200 h-full">
            <div className="p-6">
                <div className={`inline-flex p-3 rounded-lg ${color} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-500">{description}</p>
            </div>
        </div>
    </Link>
);

export default function WorkerDashboard() {
    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 pb-5">
                <h1 className="text-2xl font-semibold text-gray-900">ASHA Worker Portal</h1>
                <p className="mt-2 max-w-4xl text-sm text-gray-500">Select an action below to report data or view your history.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <QuickActionCard
                    title="Report New Case"
                    description="Submit a new improved disease case report for a patient."
                    icon={ClipboardPlus}
                    to="/worker/report-case"
                    color="bg-blue-500"
                />
                <QuickActionCard
                    title="Water Quality Check"
                    description="Log pH, turbidity, and contamination levels for local sources."
                    icon={Droplet}
                    to="/worker/water-quality"
                    color="bg-cyan-500"
                />
                <QuickActionCard
                    title="View My Reports"
                    description="Access history of your submitted reports and their status."
                    icon={History}
                    to="/worker/history"
                    color="bg-indigo-500"
                />
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Submissions</h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {[1, 2, 3].map((item) => (
                            <li key={item}>
                                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-blue-600 truncate">Symptom Report: High Fever</p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Submitted
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
                                                <FileText className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                Village ID: #12
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            <p>Closed on Jan {item + 10}, 2024</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
