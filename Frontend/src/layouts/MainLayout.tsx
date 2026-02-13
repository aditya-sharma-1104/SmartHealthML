import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

interface MainLayoutProps {
    children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const { user } = useAuth();

    if (!user) return <>{children}</>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Sidebar />

            <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300">
                <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 mt-16">
                    {children}
                </main>
            </div>
        </div>
    );
}
