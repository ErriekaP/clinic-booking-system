"use client";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import "./styles.css";
import {
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Inset,
  Strong,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import { SetStateAction, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCardClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsOpen(true);
  };

  const handleView = (patient: Patient) => {
    router.push(`/patients/view/${patient.id}`);
    console.log("Viewing patient:", patient);
  };

  const handleEdit = (patient: Patient) => {
    router.push(`/patients/update/${patient.id}`);
    console.log("Editing patient:", patient);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/patients`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []); // Fetch patients on component mount

  // Function to handle search query change
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
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
    <>
      <div className="block relative">
        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-current text-gray-500"
          >
            <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
          </svg>
        </span>
        <input
          placeholder="Search"
          className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex flex-col">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto flex-grow">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="table-fixed bg-white min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-s font-bold uppercase ">
                    ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-s font-bold uppercase ">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-s font-bold uppercase">
                    Patient Type
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-s font-bold uppercase">
                    Created At
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-s font-bold uppercase ">
                    Updated At
                  </th>
                </tr>
              </thead>
              {filteredPatients.map((patient) => (
                <div key={patient.id}>
                  <tbody>
                    <tr
                      onClick={() => handleCardClick(patient)}
                      className="hover:border-4"
                    >
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src="https://www.addu.edu.ph/wp-content/uploads/2020/08/UniversitySeal480px.png"
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {patient.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {" "}
                          {patient.lastName}, {patient.firstName}{" "}
                          {patient.middleName}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {" "}
                          {patient.patientType}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {formatDate(patient.createdAt)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {formatDate(patient.updatedAt)}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </div>
              ))}
            </table>
          </div>
        </div>
      </div>

      {/* DialogBox  */}
      {isOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Background overlay */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          {/* Modal content */}
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {/* Modal header and body */}
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Deactivate account
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All
                          of your data will be permanently removed. This action
                          cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Modal footer */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleClose} // Close the modal on Cancel button click
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <Dialog.Root open={isOpen}>
        {" "}
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            {`${selectedPatient?.firstName}'s`} profile
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Do you want to View or Make changes to{" "}
            {`${selectedPatient?.firstName}'s`} profile?
          </Dialog.Description>

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button
                className="Button"
                onClick={() => selectedPatient && handleView(selectedPatient)}
              >
                View
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className="Button"
                onClick={() => selectedPatient && handleEdit(selectedPatient)}
              >
                Edit
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="IconButton"
              aria-label="Close"
              onClick={handleClose}
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root> */}
    </>
  );
}
