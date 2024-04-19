"use client";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments`
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
      appointment.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClick = (appointment: Appointment) => {
    router.push(`/admin/appointments/${appointment.id}`);
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
    <div className="flex flex-col items-center">
      <div className="flex items-center mt-8">
        <input
          placeholder="Search"
          className="appearance-none rounded-md border border-gray-400 block py-2 px-4 mr-2 w-64"
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
                  {appointment.patient.firstName} {appointment.patient.lastName}
                </td>
                <td className="py-4 px-6">{appointment.service.serviceName}</td>
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
                  <td className="py-4 px-6">
                    {appointment.personnel &&
                    appointment.personnel.firstName !== null
                      ? `${appointment.personnel.firstName} ${appointment.personnel.lastName}`
                      : "null"}
                  </td>
                </td>
                <td className="py-4 px-6">{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
