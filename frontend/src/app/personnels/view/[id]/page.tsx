"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Personnel {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  role: string;
  specialty: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
}

const PersonnelDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [personnelData, setPersonnelData] = useState<Personnel | null>(null);

  const handleEditClick = (personnel: Personnel) => {
    setPersonnelData(personnel);
    router.push(`/personnels/update/${personnel.id}`);
  };

  useEffect(() => {
    const getPatientData = async (id: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/personnel/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch personnel data");
        }
        const data: Personnel = await response.json();
        setPersonnelData(data);
      } catch (error) {
        console.error("Error fetching personnel data:", error);
      }
    };

    getPatientData(params.id);
  }, [params.id]);

  if (!personnelData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="relative pt-16">
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
        onClick={() => handleEditClick(personnelData)}
      >
        Update
      </button>
      <table className="table-fixed w-full border-collapse border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              ID
            </th>
            <th className="w-1/4 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Name
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Role
            </th>
            {personnelData.role === "DOCTOR" && (
              <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
                Specialty
              </th>
            )}
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Email
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Gender
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Contact No.
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase">
              Date of Birth
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2 border-r border-gray-300">
              {personnelData.id}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {personnelData.lastName}, {personnelData.firstName}{" "}
              {personnelData.middleName}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {personnelData.role}
            </td>
            {personnelData.role === "DOCTOR" && (
              <td className="px-4 py-2 border-r border-gray-300">
                {personnelData.specialty}
              </td>
            )}
            <td className="px-4 py-2 border-r border-gray-300">
              {personnelData.email}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {personnelData.gender}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {personnelData.phoneNumber}
            </td>
            <td className="px-4 py-2">{personnelData.dateOfBirth}</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default PersonnelDetails;
