"use client";

import AddressHover from "@/components/patienthovercard/AddressHover";
import EmergencyContactHover from "@/components/patienthovercard/EmergencyContactHover";
import FamilyPhysicianHover from "@/components/patienthovercard/FamilyPhysicianHover";
import MedicalHistoryHover from "@/components/patienthovercard/MedicalHistoryHover";
import { Box, Card, Inset, Separator, Strong, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PatientData {
  id: string;
  medicalHistory: any;
  familyPhysician: any;
  emergencyContact: any;
  address: any;
  schoolID: string;
  firstName: string;
  lastName: string;
  middleName: string;
  cluster: string;
  course: string;
  department: string;
  section: string;
  contactNumber: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  email: string;
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

  const handleAppointmentClick = (patientID: string) => {
    router.push(`/admin/appointments/patient/student/${patientID}`);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-row justify-center items-center space-x-4">
          <div className="flex flex-col flex-wrap justify-start space-y-3">
            <div className="flex flex-col">
              {/* span #1 */}
              <div className="flex flex-col items-center justify-center bg-white p-5 rounded-md">
                <p>{patientData.schoolID}</p>
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p className="text-center">
                  {patientData.firstName} {patientData.middleName}{" "}
                  {patientData.lastName}
                </p>
                <p> {patientData.course}</p>
                <Separator my="3" size="4" />
                <div className="flex space-x-2 items-center">
                  <p> {patientData.section}</p>
                  <Separator
                    orientation="vertical"
                    className="h-4 border-gray-400"
                  />
                  <p> {patientData.cluster}</p>
                  <Separator orientation="vertical" />
                  <p> {patientData.department}</p>
                </div>
              </div>
            </div>

            {/* span #3 */}
            <div className="">
              <div className=" bg-white p-5 rounded-md">
                <div className="flex flex-row items-center space-x-1">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 2.5C4 2.22386 4.22386 2 4.5 2H10.5C10.7761 2 11 2.22386 11 2.5V12.5C11 12.7761 10.7761 13 10.5 13H4.5C4.22386 13 4 12.7761 4 12.5V2.5ZM4.5 1C3.67157 1 3 1.67157 3 2.5V12.5C3 13.3284 3.67157 14 4.5 14H10.5C11.3284 14 12 13.3284 12 12.5V2.5C12 1.67157 11.3284 1 10.5 1H4.5ZM6 11.65C5.8067 11.65 5.65 11.8067 5.65 12C5.65 12.1933 5.8067 12.35 6 12.35H9C9.1933 12.35 9.35 12.1933 9.35 12C9.35 11.8067 9.1933 11.65 9 11.65H6Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-slate-500 text-sm ">Contact Number:</p>
                </div>
                <p className="mb-1"> {patientData.contactNumber}</p>

                <div className="flex flex-row items-center space-x-1">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-slate-500 text-sm ">Email Address:</p>
                </div>
                <p className="mb-1"> {patientData.email}</p>

                <div className="flex flex-row items-center space-x-1">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-slate-500 text-sm ">Date of Birth:</p>
                </div>
                <p className="mb-1"> {patientData.dateOfBirth}</p>

                <div className="flex flex-row items-center space-x-1">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82708 7.49972C1.82708 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82708 10.6327 1.82708 7.49972ZM5.03747 9.21395C4.87949 8.98746 4.56782 8.93193 4.34133 9.08991C4.11484 9.24789 4.05931 9.55956 4.21729 9.78605C4.93926 10.8211 6.14033 11.5 7.50004 11.5C8.85974 11.5 10.0608 10.8211 10.7828 9.78605C10.9408 9.55956 10.8852 9.24789 10.6587 9.08991C10.4323 8.93193 10.1206 8.98746 9.9626 9.21395C9.41963 9.99238 8.51907 10.5 7.50004 10.5C6.481 10.5 5.58044 9.99238 5.03747 9.21395ZM5.37503 6.84998C5.85828 6.84998 6.25003 6.45815 6.25003 5.97498C6.25003 5.4918 5.85828 5.09998 5.37503 5.09998C4.89179 5.09998 4.50003 5.4918 4.50003 5.97498C4.50003 6.45815 4.89179 6.84998 5.37503 6.84998ZM10.5 5.97498C10.5 6.45815 10.1083 6.84998 9.62503 6.84998C9.14179 6.84998 8.75003 6.45815 8.75003 5.97498C8.75003 5.4918 9.14179 5.09998 9.62503 5.09998C10.1083 5.09998 10.5 5.4918 10.5 5.97498Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-slate-500 text-sm">Gender:</p>
                </div>
                <p className="mb-1"> {patientData.gender}</p>
                <div className="flex flex-row items-center space-x-1">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.89346 2.35248C3.49195 2.35248 2.35248 3.49359 2.35248 4.90532C2.35248 6.38164 3.20954 7.9168 4.37255 9.33522C5.39396 10.581 6.59464 11.6702 7.50002 12.4778C8.4054 11.6702 9.60608 10.581 10.6275 9.33522C11.7905 7.9168 12.6476 6.38164 12.6476 4.90532C12.6476 3.49359 11.5081 2.35248 10.1066 2.35248C9.27059 2.35248 8.81894 2.64323 8.5397 2.95843C8.27877 3.25295 8.14623 3.58566 8.02501 3.88993C8.00391 3.9429 7.98315 3.99501 7.96211 4.04591C7.88482 4.23294 7.7024 4.35494 7.50002 4.35494C7.29765 4.35494 7.11523 4.23295 7.03793 4.04592C7.01689 3.99501 6.99612 3.94289 6.97502 3.8899C6.8538 3.58564 6.72126 3.25294 6.46034 2.95843C6.18109 2.64323 5.72945 2.35248 4.89346 2.35248ZM1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.0084 1.35248 6.73504 1.76049 7.20884 2.2953C7.32062 2.42147 7.41686 2.55382 7.50002 2.68545C7.58318 2.55382 7.67941 2.42147 7.79119 2.2953C8.265 1.76049 8.99164 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-slate-500 text-sm">Blood Type:</p>
                </div>
                <p className="mb-1"> {patientData.bloodType}</p>
              </div>
            </div>
          </div>
          {/* span #2 */}

          <div className="flex flex-col justify-center bg-white p-5 rounded-md space-y-1">
            <div className="flex justify-end mb-5 ">
              <button
                className=" bg-blue-500 text-white px-4 py-2 rounded shadow "
                onClick={() => handleEditClick()}
              >
                Update Profile
              </button>
            </div>
            <div>
              <table className="text-center bg-white min-w-full leading-normal ">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-s font-bold uppercase ">
                      Address
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-s font-bold uppercase ">
                      Emergency Contact
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-s font-bold uppercase ">
                      Family Physician
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-centertext-s font-bold uppercase ">
                      Medical History
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 h-20">
                    <td className="px-4 py-2">
                      <AddressHover
                        city={patientData.address.city}
                        province={patientData.address.province}
                        houseNo={patientData.address.houseNo}
                        street={patientData.address.street}
                        barangay={patientData.address.barangay}
                        subdivision={patientData.address.subdivision}
                        zipCode={patientData.address.zipCode}
                      />{" "}
                    </td>
                    <td className="px-4 py-2">
                      <EmergencyContactHover
                        lastName={patientData.emergencyContact.lastName}
                        firstName={patientData.emergencyContact.firstName}
                        contactNumber={
                          patientData.emergencyContact.contactNumber
                        }
                        relation={patientData.emergencyContact.relation}
                        healthInsuranceCompany={
                          patientData.emergencyContact.healthInsuranceCompany
                        }
                        emergencyHospital={
                          patientData.emergencyContact.emergencyHospital
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      {" "}
                      <FamilyPhysicianHover
                        lastName={patientData.familyPhysician.lastName}
                        firstName={patientData.familyPhysician.firstName}
                        contactNumber={
                          patientData.familyPhysician.contactNumber
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <MedicalHistoryHover
                        famHistory={patientData.medicalHistory.famHistory}
                        childhoodDiseases={
                          patientData.medicalHistory.childhoodDiseases
                        }
                        medicalCondition={
                          patientData.medicalHistory.medicalCondition
                        }
                        hospitalization={
                          patientData.medicalHistory.hospitalization
                        }
                        medication={patientData.medicalHistory.medication}
                        allergies={patientData.medicalHistory.allergies}
                        vaccines={patientData.medicalHistory.vaccines}
                        psychosocialHistory={
                          patientData.medicalHistory.psychosocialHistory
                        }
                        sexualHistory={patientData.medicalHistory.sexualHistory}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className=" min-w-full">
              <table className="text-center bg-white min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-s font-bold uppercase ">
                      Appointments
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 h-20">
                    <td
                      className="px-4 py-2 hover:bg-gray-200 hover:p-2"
                      onClick={() => handleAppointmentClick(patientData.id)}
                    >
                      <div className="flex flex-col items-center">
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.49998 0.849976C7.22383 0.849976 6.99998 1.07383 6.99998 1.34998V3.52234C6.99998 3.79848 7.22383 4.02234 7.49998 4.02234C7.77612 4.02234 7.99998 3.79848 7.99998 3.52234V1.8718C10.8862 2.12488 13.15 4.54806 13.15 7.49998C13.15 10.6204 10.6204 13.15 7.49998 13.15C4.37957 13.15 1.84998 10.6204 1.84998 7.49998C1.84998 6.10612 2.35407 4.83128 3.19049 3.8459C3.36919 3.63538 3.34339 3.31985 3.13286 3.14115C2.92234 2.96245 2.60681 2.98825 2.42811 3.19877C1.44405 4.35808 0.849976 5.86029 0.849976 7.49998C0.849976 11.1727 3.82728 14.15 7.49998 14.15C11.1727 14.15 14.15 11.1727 14.15 7.49998C14.15 3.82728 11.1727 0.849976 7.49998 0.849976ZM6.74049 8.08072L4.22363 4.57237C4.15231 4.47295 4.16346 4.33652 4.24998 4.25C4.33649 4.16348 4.47293 4.15233 4.57234 4.22365L8.08069 6.74051C8.56227 7.08599 8.61906 7.78091 8.19998 8.2C7.78089 8.61909 7.08597 8.56229 6.74049 8.08072Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <p>Appointments</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className=" min-w-full">
              <table className="text-center bg-white min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-s font-bold uppercase ">
                      Doctor's Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 h-20">
                    <td className="px-4 py-2 hover:bg-gray-200 hover:p-2	">
                      <div className="flex flex-col items-center">
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.877197 7.49984C0.877197 3.84216 3.84234 0.877014 7.50003 0.877014C11.1577 0.877014 14.1229 3.84216 14.1229 7.49984C14.1229 11.1575 11.1577 14.1227 7.50003 14.1227C3.84234 14.1227 0.877197 11.1575 0.877197 7.49984ZM7.50003 1.82701C4.36702 1.82701 1.8272 4.36683 1.8272 7.49984C1.8272 10.6328 4.36702 13.1727 7.50003 13.1727C10.633 13.1727 13.1729 10.6328 13.1729 7.49984C13.1729 4.36683 10.633 1.82701 7.50003 1.82701ZM7.12457 9.00001C7.06994 9.12735 6.33165 11.9592 6.33165 11.9592C6.26018 12.226 5.98601 12.3843 5.71928 12.3128C5.45255 12.2413 5.29425 11.9672 5.36573 11.7004C5.36573 11.7004 6.24661 8.87268 6.24661 8.27007V6.80099L4.28763 6.27608C4.0209 6.20461 3.86261 5.93045 3.93408 5.66371C4.00555 5.39698 4.27972 5.23869 4.54645 5.31016C4.54645 5.31016 6.20042 5.87268 6.84579 5.87268H8.15505C8.80042 5.87268 10.4534 5.31042 10.4534 5.31042C10.7202 5.23895 10.9943 5.39724 11.0658 5.66397C11.1373 5.93071 10.979 6.20487 10.7122 6.27635L8.74661 6.80303V8.27007C8.74661 8.87268 9.62663 11.6971 9.62663 11.6971C9.6981 11.9639 9.5398 12.238 9.27307 12.3095C9.00634 12.381 8.73217 12.2227 8.6607 11.956C8.6607 11.956 7.91994 9.12735 7.86866 9.00001C7.81994 8.87268 7.65006 8.87268 7.65006 8.87268H7.34317C7.34317 8.87268 7.16994 8.87268 7.12457 9.00001ZM7.50043 5.12007C8.12175 5.12007 8.62543 4.61639 8.62543 3.99507C8.62543 3.37375 8.12175 2.87007 7.50043 2.87007C6.87911 2.87007 6.37543 3.37375 6.37543 3.99507C6.37543 4.61639 6.87911 5.12007 7.50043 5.12007Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <button>yes</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex ">
        <div className="bg-white rounded-md">
          <table className="text-center  min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-s font-bold uppercase ">
                  School ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-s font-bold uppercase  ">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-s font-bold uppercase ">
                  Course
                </th>

                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-s font-bold uppercase ">
                  Section
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-s font-bold uppercase ">
                  Cluster
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-s font-bold uppercase ">
                  Department
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-s font-bold uppercase ">
                  Contact Number
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-s font-bold uppercase ">
                  Date of Birth
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-s font-bold uppercase ">
                  Gender
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-s font-bold uppercase ">
                  Blood Type
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 ">
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  {patientData.schoolID}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  {patientData.lastName}, {patientData.firstName}{" "}
                  {patientData.middleName}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {patientData.course}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {patientData.section}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {patientData.cluster}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {patientData.department}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {patientData.contactNumber}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {patientData.dateOfBirth}
                </td>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {patientData.gender}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {patientData.bloodType}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col space-y-4 items-center justify-center ">
        <div>
          <table className="text-center bg-white min-w-full leading-normal ">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-s font-bold uppercase ">
                  Address
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-s font-bold uppercase ">
                  Emergency Contact
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-s font-bold uppercase ">
                  Family Physician
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-centertext-s font-bold uppercase ">
                  Medical History
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 h-20">
                <td className="px-4 py-2">
                  <AddressHover
                    city={patientData.address.city}
                    province={patientData.address.province}
                    houseNo={patientData.address.houseNo}
                    street={patientData.address.street}
                    barangay={patientData.address.barangay}
                    subdivision={patientData.address.subdivision}
                    zipCode={patientData.address.zipCode}
                  />{" "}
                </td>
                <td className="px-4 py-2">
                  <EmergencyContactHover
                    lastName={patientData.emergencyContact.lastName}
                    firstName={patientData.emergencyContact.firstName}
                    contactNumber={patientData.emergencyContact.contactNumber}
                    relation={patientData.emergencyContact.relation}
                    healthInsuranceCompany={
                      patientData.emergencyContact.healthInsuranceCompany
                    }
                    emergencyHospital={
                      patientData.emergencyContact.emergencyHospital
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  {" "}
                  <FamilyPhysicianHover
                    lastName={patientData.familyPhysician.lastName}
                    firstName={patientData.familyPhysician.firstName}
                    contactNumber={patientData.familyPhysician.contactNumber}
                  />
                </td>
                <td className="px-4 py-2">
                  <MedicalHistoryHover
                    famHistory={patientData.medicalHistory.famHistory}
                    childhoodDiseases={
                      patientData.medicalHistory.childhoodDiseases
                    }
                    medicalCondition={
                      patientData.medicalHistory.medicalCondition
                    }
                    hospitalization={patientData.medicalHistory.hospitalization}
                    medication={patientData.medicalHistory.medication}
                    allergies={patientData.medicalHistory.allergies}
                    vaccines={patientData.medicalHistory.vaccines}
                    psychosocialHistory={
                      patientData.medicalHistory.psychosocialHistory
                    }
                    sexualHistory={patientData.medicalHistory.sexualHistory}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button
            className=" bg-blue-500 text-white px-4 py-2 rounded shadow"
            onClick={() => handleEditClick()}
          >
            Update
          </button>
        </div>
      </div> */}
    </>
  );
};

export default PatientDetails;
