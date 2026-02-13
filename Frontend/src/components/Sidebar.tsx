import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    Bell,
    Activity,
    ClipboardPlus,
    Map,
    Droplet,
    ShieldAlert,
    BookOpen
} from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) return null;

    const getNavItems = () => {
        switch (user.role) {
            case 'admin':
                return [
                    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
                    { name: 'User Management', path: '/admin/users', icon: Users },
                    { name: 'System Logs', path: '/admin/logs', icon: FileText },
                    { name: 'Alert Config', path: '/admin/alerts', icon: ShieldAlert },
                    { name: 'Settings', path: '/admin/settings', icon: Settings },
                ];
            case 'health_officer':
                return [
                    { name: 'Dashboard', path: '/officer', icon: LayoutDashboard },
                    { name: 'Epidemic Alerts', path: '/officer/alerts', icon: Bell },
                    { name: 'AI Predictions', path: '/officer/predictions', icon: Activity },
                    { name: 'Heatmaps', path: '/officer/maps', icon: Map },
                    { name: 'Reports', path: '/officer/reports', icon: FileText },
                ];
            case 'asha_worker':
                return [
                    { name: 'Dashboard', path: '/worker', icon: LayoutDashboard },
                    { name: 'Report Case', path: '/worker/report-case', icon: ClipboardPlus },
                    { name: 'Water Quality', path: '/worker/water-quality', icon: Droplet },
                    { name: 'My Submissions', path: '/worker/history', icon: FileText },
                ];
            case 'clinic_staff':
                return [
                    { name: 'Dashboard', path: '/clinic', icon: LayoutDashboard },
                    { name: 'Upload Data', path: '/clinic/upload', icon: ClipboardPlus },
                    { name: 'Lab Reports', path: '/clinic/reports', icon: FileText },
                ];
            case 'public':
                return [
                    { name: 'Awareness', path: '/public', icon: BookOpen },
                    { name: 'Hygiene Tips', path: '/public/tips', icon: Activity },
                    { name: 'Nearby Centers', path: '/public/centers', icon: Map },
                ];
            default:
                return [];
        }
    };

    const navItems = getNavItems();

    return (
        <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 pt-16 z-10 transition-all duration-300 shadow-sm">
            <div className="flex flex-col flex-1 overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={clsx(
                                    isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                    'group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200'
                                )}
                            >
                                <Icon
                                    className={clsx(
                                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500',
                                        'mr-3 flex-shrink-0 h-5 w-5'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Footer or extra details */}
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex items-center">
                    <div className="ml-3">
                        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                            v1.0.0
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
