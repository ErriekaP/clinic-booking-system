"use client";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import BackNavbar from "@/components/backNavbar/backNavbar";

interface Appointment {
  id: number;
  startTime: string;
  endTime: string;
  service: Service;
  personnel: Personnel;
  patient: Patient;
  description: string;
  status: string;
}

interface Service {
  id: number;
  serviceName: string;
  description: string;
  status: string;
}
interface Personnel {
  id: number;
  firstName: string;
  lastName: string;
}
interface Patient {
  id: number;
  firstName: string;
  lastName: string;
}

export default function Page() {
  const router = useRouter();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/pending`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.service.serviceName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.patient.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.patient.lastName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.personnel.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.personnel.lastName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.startTime.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClick = (appointment: Appointment) => {
    router.push(`/appointments/update/${appointment.id}`);
  };

  const formatTime = (timeString: string) => {
    const hours = parseInt(timeString.slice(11, 13), 10);
    const minutes = timeString.slice(14, 16);
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours > 12 ? hours - 12 : hours;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const formatDate = (dateString: string) => {
    const dayjsObject = dayjs(dateString);
    const isoDateString = dayjsObject.format("MMMM D, YYYY	");
    return isoDateString;
  };

  // Render the appointments in the table
  return (
    <div>
      <BackNavbar />
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <span className="absolute ml-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current text-gray-500"
            >
              <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
            </svg>
          </span>
          <input
            placeholder="Search"
            className="appearance-none rounded-md border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex-grow mt-8">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-100 text-gray-800 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Appointment ID</th>
                <th className="py-3 px-6 text-left">Student ID</th>
                <th className="py-3 px-6 text-left">Student Name</th>
                <th className="py-3 px-6 text-left">Service Name</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Schedule</th>
                <th className="py-3 px-6 text-left">Doctor</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredAppointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleClick(appointment)}
                >
                  <td className="py-4 px-6">{appointment.id}</td>
                  <td className="py-4 px-6">{appointment.patient.id}</td>
                  <td className="py-4 px-6">
                    {appointment.patient.firstName}{" "}
                    {appointment.patient.lastName}
                  </td>
                  <td className="py-4 px-6">
                    {appointment.service.serviceName}
                  </td>
                  <td className="py-4 px-6">
                    {" "}
                    {formatDate(appointment.startTime)}
                  </td>
                  <td className="py-4 px-6">
                    {" "}
                    {formatTime(appointment.startTime)} -{" "}
                    {formatTime(appointment.endTime)}
                  </td>

                  <td className="py-4 px-6">
                    {appointment.personnel &&
                    appointment.personnel.firstName !== null
                      ? `${appointment.personnel.firstName} ${appointment.personnel.lastName}`
                      : "null"}
                  </td>
                  <td className="py-4 px-6">{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
