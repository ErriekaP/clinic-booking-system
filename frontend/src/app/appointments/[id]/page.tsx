"use client";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Appointment {
  id: string;
  details: string;
  startTime: string;
  endTime: string;
  status: string;
  reasonforCancellation: string;
  service: ServiceInfo;
  personnel: PersonnelInfo;
}

interface ServiceInfo {
  serviceName: string;
  description: string;
}

interface PersonnelInfo {
  firstName: string;
  lastName: string;
}

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch appointment");
        }
        const data = await response.json();
        setAppointment(data); // Assuming the fetched data matches Appointment interface
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleClick = (appointment: Appointment) => {
    console.log("Clicked appointment:", appointment);
    // Implement any necessary action upon appointment click
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

  return (
    <div className="flex flex-col h-screen items-center">
      {/* Appointment details section */}
      <div className="max-w-4xl my-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Appointment Details
        </h1>

        {/* Display cancellation reason if the appointment is cancelled */}
        {appointment &&
          (appointment.status === "CANCELLEDBYSTUDENT" ||
            appointment.status === "CANCELLEDBYDOCTOR") && (
            <div className=" bg-gray-100 p-4 rounded-lg flex justify-center">
              <div className="mt-4 text-center  text-black font-bold">
                <h2 className="">Reason for Cancellation:</h2>
                <p className="mb-5"> {appointment.reasonforCancellation}</p>
              </div>
            </div>
          )}

        {appointment &&
          (appointment.status === "PENDING" ||
            appointment.status === "SCHEDULED" ||
            appointment.status === "COMPLETE") && (
            <div className=" bg-gray-100 p-4 rounded-lg flex justify-center">
              <div className="flex flex-col items-center">
                <p className="text-md text-black font-bold mr-2">
                  {formatDate(appointment.startTime)}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-md text-black font-bold">
                  {formatTime(appointment.startTime)} -{" "}
                  {formatTime(appointment.endTime)}
                </p>
              </div>
            </div>
          )}
      </div>
      {/* Appointment table section */}
      <div className="flex flex-col flex-grow w-full max-w-4xl">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="table-fixed bg-white min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                    Appointment ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                    Service Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                    Description
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                    Doctor
                  </th>

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointment ? (
                  <tr
                    key={appointment.id}
                    onClick={() => handleClick(appointment)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                      {appointment.id}
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                      {appointment.service.serviceName}
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm  text-justify	">
                      {appointment.service.description}
                    </td>
                    <td className="py-4 px-6">
                      {appointment.personnel &&
                      appointment.personnel.firstName !== null
                        ? `${appointment.personnel.firstName} ${appointment.personnel.lastName}`
                        : "null"}
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                      {appointment.status}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                      No appointment details available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional information based on appointment status */}
        {appointment && appointment.status === "SCHEDULED" && (
          <div className="mt-4 text-center text-sm text-white font-bold">
            Please arrive 10-15 minutes before your scheduled appointment time.
            If you have any questions or need to reschedule, kindly contact our
            clinic at least 24 hours in advance.
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
