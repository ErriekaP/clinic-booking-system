"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PatientData {
  medicalHistory: any;
  familyPhysician: any;
  emergencyContact: any;
  address: any;
  schoolID: string;
  firstName: string;
  lastName: string;
  middleName: string;
  course: string;
  department: string;
  section: string;
  contactNumber: string;
  dateOfBirth: string;
}

const PatientDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  useEffect(() => {
    const getPatientData = async (id: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/patients/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }
        const data: PatientData = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    getPatientData(params.id);
  }, [params.id]);

  if (!patientData) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    router.push(`/patients/update/${params.id}`);
  };

  return (
    <main className="relative pt-16">
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
        onClick={() => handleEditClick()}
      >
        Update
      </button>
      <table className="table-fixed w-full border-collapse border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              School ID
            </th>
            <th className="w-1/4 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Name
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Course
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Department
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Section
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
              {patientData.schoolID}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.lastName}, {patientData.firstName}{" "}
              {patientData.middleName}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.course}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.department}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.section}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.contactNumber}
            </td>
            <td className="px-4 py-2">{patientData.dateOfBirth}</td>
          </tr>
        </tbody>
      </table>

      <table className="table-fixed w-full border-collapse border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Address
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.address.houseNo}, {patientData.address.street},{" "}
              {patientData.address.barangay}, {patientData.address.subdivision},{" "}
              {patientData.address.province}, {patientData.address.zipCode},{" "}
              {patientData.address.city}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table-fixed w-full border-collapse border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Name
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Contact Number
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Relation
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Health Insurance Company
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Emergency Hospital
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.emergencyContact.lastName},{" "}
              {patientData.emergencyContact.firstName}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.emergencyContact.contactNumber}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.emergencyContact.relation}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.emergencyContact.healthInsuranceCompany}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.emergencyContact.emergencyHospital}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table-fixed w-full border-collapse border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Name
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Contact Number
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.familyPhysician.lastName},{" "}
              {patientData.familyPhysician.firstName}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.familyPhysician.contactNumber}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table-fixed w-full border-collapse border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Family History
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Childhood Diseases
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Medical Condition
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Hospitalization String
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Medication
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Allergies
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Vaccines
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Psychosocial History
            </th>
            <th className="w-1/7 px-4 py-2 text-lg font-semibold text-gray-800 uppercase border-r border-gray-300">
              Sexual History
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.medicalHistory.famHistory}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.medicalHistory.childhoodDiseases}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.medicalHistory.medicalCondition}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.medicalHistory.hospitalization}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.medicalHistory.medication}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.medicalHistory.allergies}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.medicalHistory.vaccines}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.medicalHistory.psychosocialHistory}
            </td>
            <td className="px-4 py-2 border-r border-gray-300">
              {patientData.medicalHistory.sexualHistory}
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default PatientDetails;
