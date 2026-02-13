import { useState } from 'react';
import API from "../../services/api";

interface FormData {
    patientName: string;
    age: string;
    gender: string;
    village: string;
    symptoms: string[];
    severity: string;
    notes: string;
}

export default function CaseReportingForm() {
    const [formData, setFormData] = useState<FormData>({
        patientName: '',
        age: '',
        gender: 'male',
        village: '',
        symptoms: [],
        severity: 'mild',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const symptomOptions = ['Fever', 'Cough', 'Diarrhea', 'Vomiting', 'Rash', 'Fatigue', 'Breathing Difficulty'];

    const handleSymptomChange = (symptom: string) => {
        setFormData(prev => ({
            ...prev,
            symptoms: prev.symptoms.includes(symptom)
                ? prev.symptoms.filter(s => s !== symptom)
                : [...prev.symptoms, symptom]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            await API.post("/cases/report", {
                patient_name: formData.patientName,
                age: formData.age,
                village: formData.village,
                symptoms: formData.symptoms.join(", "),
                severity: formData.severity
            });

            setSuccess(true);
            setLoading(false);

            // Reset form
            setFormData({
                patientName: '',
                age: '',
                gender: 'male',
                village: '',
                symptoms: [],
                severity: 'mild',
                notes: ''
            });

        } catch (error) {
            setLoading(false);
            alert("Failed to submit report");
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Report New Health Case</h1>

            {success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> Case report submitted successfully.</span>
                </div>
            )}

            <div className="bg-white shadow sm:rounded-lg overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                        {/* Patient Name */}
                        <div className="sm:col-span-3">
                            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient Name</label>
                            <input
                                type="text"
                                name="patientName"
                                id="patientName"
                                required
                                value={formData.patientName}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* Age */}
                        <div className="sm:col-span-3">
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="number"
                                name="age"
                                id="age"
                                required
                                value={formData.age}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* Gender */}
                        <div className="sm:col-span-3">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Village */}
                        <div className="sm:col-span-3">
                            <label htmlFor="village" className="block text-sm font-medium text-gray-700">Village / Locality</label>
                            <input
                                type="text"
                                name="village"
                                id="village"
                                required
                                value={formData.village}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        {/* Symptoms Logic */}
                        <div className="sm:col-span-6">
                            <span className="block text-sm font-medium text-gray-700 mb-2">Symptoms (Select all that apply)</span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {symptomOptions.map((symptom) => (
                                    <label key={symptom} className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.symptoms.includes(symptom)}
                                            onChange={() => handleSymptomChange(symptom)}
                                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">{symptom}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Severity */}
                        <div className="sm:col-span-6">
                            <label htmlFor="severity" className="block text-sm font-medium text-gray-700">Condition Severity</label>
                            <div className="mt-2 flex items-center space-x-4">
                                {['mild', 'moderate', 'critical'].map((sev) => (
                                    <label key={sev} className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="severity"
                                            value={sev}
                                            checked={formData.severity === sev}
                                            onChange={handleChange}
                                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-700 capitalize">{sev}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="sm:col-span-6">
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
                            <textarea
                                id="notes"
                                name="notes"
                                rows={3}
                                value={formData.notes}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            ></textarea>
                        </div>
                    </div>

                    <div className="pt-5 border-t border-gray-200 flex justify-end">
                        <button
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {loading ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
