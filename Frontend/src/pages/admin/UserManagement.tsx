import { useState } from 'react';
import { Edit2, Trash2, Shield, Search, Plus, X, UserPlus, Check } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────
type UserRole = 'admin' | 'health_officer' | 'asha_worker' | 'clinic_staff';
type UserStatus = 'Active' | 'Inactive';

interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
}

// ─── Seed Data ──────────────────────────────────────────────────────────────
const initialUsers: User[] = [
    { id: 1, name: 'Dr. Sarah Connor', email: 'sarah.c@health.gov', role: 'health_officer', status: 'Active' },
    { id: 2, name: 'John Doe', email: 'john.d@asha.org', role: 'asha_worker', status: 'Active' },
    { id: 3, name: 'Clinic Lab Team', email: 'lab@clinic.com', role: 'clinic_staff', status: 'Inactive' },
    { id: 4, name: 'Super Admin', email: 'admin@system.com', role: 'admin', status: 'Active' },
    { id: 5, name: 'Riya Sharma', email: 'riya.s@health.gov', role: 'health_officer', status: 'Active' },
    { id: 6, name: 'Mohan Verma', email: 'mohan.v@asha.org', role: 'asha_worker', status: 'Inactive' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const ROLE_STYLES: Record<UserRole, string> = {
    admin: 'bg-purple-100 text-purple-800 border border-purple-200',
    health_officer: 'bg-blue-100   text-blue-800   border border-blue-200',
    asha_worker: 'bg-green-100  text-green-800  border border-green-200',
    clinic_staff: 'bg-slate-100  text-slate-700  border border-slate-200',
};
const ROLE_LABELS: Record<UserRole, string> = {
    admin: 'Admin',
    health_officer: 'Officer',
    asha_worker: 'Worker',
    clinic_staff: 'Staff',
};
const AVATAR_COLORS: Record<UserRole, string> = {
    admin: 'bg-purple-500',
    health_officer: 'bg-blue-500',
    asha_worker: 'bg-green-500',
    clinic_staff: 'bg-slate-500',
};

const EMPTY_FORM = { name: '', email: '', role: 'asha_worker' as UserRole, status: 'Active' as UserStatus };

// ─── Component ───────────────────────────────────────────────────────────────
export default function UserManagement() {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saved, setSaved] = useState(false);

    // ── Search filter ──────────────────────────────────────────────────────────
    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ── Open modal: Add mode ───────────────────────────────────────────────────
    const openAdd = () => {
        setEditingId(null);
        setForm(EMPTY_FORM);
        setSaved(false);
        setShowModal(true);
    };

    // ── Open modal: Edit mode ──────────────────────────────────────────────────
    const openEdit = (user: User) => {
        setEditingId(user.id);
        setForm({ name: user.name, email: user.email, role: user.role, status: user.status });
        setSaved(false);
        setShowModal(true);
    };

    // ── Close modal ────────────────────────────────────────────────────────────
    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setForm(EMPTY_FORM);
    };

    // ── Save (Add or Update) ───────────────────────────────────────────────────
    const handleSave = () => {
        if (!form.name.trim() || !form.email.trim()) return;

        if (editingId !== null) {
            // Update existing
            setUsers(prev => prev.map(u => u.id === editingId ? { ...u, ...form } : u));
        } else {
            // Add new
            const newUser: User = { id: Date.now(), ...form };
            setUsers(prev => [...prev, newUser]);
        }
        setSaved(true);
        setTimeout(closeModal, 700);
    };

    // ── Delete with confirmation ───────────────────────────────────────────────
    const handleDelete = (id: number, name: string) => {
        if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            setUsers(prev => prev.filter(u => u.id !== id));
        }
    };

    // ── Toggle status inline ───────────────────────────────────────────────────
    const toggleStatus = (id: number) => {
        setUsers(prev => prev.map(u =>
            u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
        ));
    };

    // ─── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Shield className="w-6 h-6 mr-2 text-indigo-600" />
                        User Management
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">{users.length} total users in the system</p>
                </div>
                <button
                    onClick={openAdd}
                    className="inline-flex items-center px-4 py-2 rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New User
                </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {(Object.keys(ROLE_LABELS) as UserRole[]).map(role => (
                    <div key={role} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${ROLE_STYLES[role]}`}>{ROLE_LABELS[role]}</span>
                        <span className="text-xl font-bold text-gray-800">{users.filter(u => u.role === role).length}</span>
                    </div>
                ))}
            </div>

            {/* Table Card */}
            <div className="bg-white shadow border border-gray-200 sm:rounded-xl overflow-hidden">
                {/* Search Bar */}
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                    <div className="relative w-full max-w-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="user-search"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Search users by name or email..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <span className="ml-4 text-xs text-gray-400 hidden sm:block">{filteredUsers.length} result{filteredUsers.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors duration-150">
                                    {/* User cell */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`flex-shrink-0 h-10 w-10 rounded-full ${AVATAR_COLORS[user.role]} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                                                <div className="text-xs text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Role badge */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full ${ROLE_STYLES[user.role]}`}>
                                            {ROLE_LABELS[user.role]}
                                        </span>
                                    </td>

                                    {/* Status toggle */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => toggleStatus(user.id)}
                                            title="Click to toggle status"
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border transition-colors ${user.status === 'Active'
                                                    ? 'bg-green-50 text-green-800 border-green-200 hover:bg-green-100'
                                                    : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                                                }`}
                                        >
                                            <span className={`w-2 h-2 rounded-full mr-1.5 ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                            {user.status}
                                        </button>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button
                                            onClick={() => openEdit(user)}
                                            title="Edit user"
                                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-colors mr-2"
                                        >
                                            <Edit2 className="w-3.5 h-3.5 mr-1" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id, user.name)}
                                            title="Delete user"
                                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty state */}
                {filteredUsers.length === 0 && (
                    <div className="p-16 text-center">
                        <Search className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No users found matching "{searchTerm}"</p>
                        <p className="text-xs text-gray-400 mt-1">Try a different name or email.</p>
                    </div>
                )}
            </div>

            {/* ─── Add / Edit Modal ─────────────────────────────────────────────── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
                        onClick={closeModal}
                    />

                    {/* Modal box */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-indigo-50">
                            <h2 className="text-lg font-bold text-indigo-900 flex items-center">
                                <UserPlus className="w-5 h-5 mr-2" />
                                {editingId !== null ? 'Edit User' : 'Add New User'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="px-6 py-5 space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    id="modal-name"
                                    className="block w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                                    placeholder="e.g. Dr. Anita Sharma"
                                    value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="modal-email"
                                    className="block w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                                    placeholder="e.g. anita@health.gov"
                                    value={form.email}
                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                                <select
                                    id="modal-role"
                                    className="block w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={form.role}
                                    onChange={e => setForm(f => ({ ...f, role: e.target.value as UserRole }))}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="health_officer">Health Officer</option>
                                    <option value="asha_worker">ASHA Worker</option>
                                    <option value="clinic_staff">Clinic Staff</option>
                                </select>

                                {/* Role preview badge */}
                                <div className="mt-2 flex items-center space-x-2">
                                    <span className="text-xs text-gray-400">Preview:</span>
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${ROLE_STYLES[form.role]}`}>
                                        {ROLE_LABELS[form.role]}
                                    </span>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                                <div className="flex gap-3">
                                    {(['Active', 'Inactive'] as UserStatus[]).map(s => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setForm(f => ({ ...f, status: s }))}
                                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border-2 transition-all ${form.status === s
                                                    ? s === 'Active'
                                                        ? 'bg-green-500 text-white border-green-500 shadow-md'
                                                        : 'bg-red-500 text-white border-red-500 shadow-md'
                                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal footer */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!form.name.trim() || !form.email.trim()}
                                className={`inline-flex items-center px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all shadow-sm ${saved
                                        ? 'bg-green-500'
                                        : 'bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed'
                                    }`}
                            >
                                {saved
                                    ? <><Check className="w-4 h-4 mr-1" /> Saved!</>
                                    : editingId !== null ? 'Save Changes' : 'Add User'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
