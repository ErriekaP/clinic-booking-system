'use client';

import { SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PatientDetails from './view/[id]/page';
import BackNavbar from '@/components/backNavbar/backNavbar';
import Image from 'next/image';

export default function Page() {
  const router = useRouter();

  interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    patientType: string;
    createdAt: string;
    updatedAt: string;
  }

  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleClick = (patient: Patient) => {
    setSelectedPatient(patient);
    router.push(`/patients/view/${patient.id}`);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/patients`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []); // Fetch patients on component mount

  // Function to handle search query change
  const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  // Filter patients based on search query
  const filteredPatients = patients.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (isoDate: string | number | Date) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(); // Adjust the format as needed
  };

  return (
    <div>
      <BackNavbar />

      <div className='flex flex-col h-screen items-center'>
        <div className='block relative max-w-sm'>
          <span className='h-full absolute inset-y-0 left-0 flex items-center pl-2'>
            <svg viewBox='0 0 24 24' className='h-4 w-4 fill-current text-gray-500'>
              <path d='M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z'></path>
            </svg>
          </span>
          <input
            placeholder='Search'
            className='appearance-none rounded-md border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className='flex flex-col flex-grow'>
          <div className='flex-grow'>
            <div className='shadow rounded-lg'>
              <table className='table-fixed bg-white leading-normal mt-8'>
                <thead>
                  <tr>
                    <th className='p-0 sm:p-4 border-b-2 border-gray-200 bg-gray-100 text-center text-s font-bold uppercase '>ID</th>
                    <th className='p-0 sm:p-4 border-b-2 border-gray-200 bg-gray-100 text-center text-s font-bold uppercase '>Name</th>
                    <th className='p-0 sm:p-4 border-b-2 border-gray-200 bg-gray-100 text-center text-s font-bold uppercase'>Patient Type</th>
                    <th className='p-0 sm:p-4 border-b-2 border-gray-200 bg-gray-100 text-center text-s font-bold uppercase'>Created At</th>
                    <th className='p-0 sm:p-4 border-b-2 border-gray-200 bg-gray-100 text-center text-s font-bold uppercase '>Updated At</th>
                  </tr>
                </thead>
                {filteredPatients.map((patient) => (
                  <tbody>
                    <tr key={patient.id} onClick={() => handleClick(patient)} className='hover:bg-[#ADD8E6] hover:cursor-pointer'>
                      <td className='p-0 sm:p-4 border-b border-gray-200 text-sm'>
                        <p className='text-gray-900'>{patient.id}</p>
                      </td>
                      <td className='p-0 sm:p-4 border-b border-gray-200 text-sm'>
                        <p className='text-gray-900'>
                          {patient.lastName}, {patient.firstName} {patient.middleName}
                        </p>
                      </td>
                      <td className='p-0 sm:p-4 border-b border-gray-200 text-sm'>
                        <p className='text-gray-900'> {patient.patientType}</p>
                      </td>
                      <td className='p-0 sm:p-4 border-b border-gray-200 text-sm'>
                        <p className='text-gray-900'>{formatDate(patient.createdAt)}</p>
                      </td>
                      <td className='p-0 sm:p-4 border-b border-gray-200 text-sm'>
                        <p className='text-gray-900'>{formatDate(patient.updatedAt)}</p>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
