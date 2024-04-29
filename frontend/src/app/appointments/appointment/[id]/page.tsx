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
  patient: PatientInfo;
}

interface ServiceInfo {
  serviceName: string;
  description: string;
}

interface PersonnelInfo {
  firstName: string;
  lastName: string;
}

interface PatientInfo {
  id: number;
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
  const handleClick = (appointment: Appointment) => {
    if (
      appointment.status !== "COMPLETE" &&
      appointment.status !== "CANCELLEDBYSTUDENT" &&
      appointment.status !== "CANCELLEDBYDOCTOR"
    ) {
      router.push(`/appointments/update/${appointment.id}`);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center">
      {/* Appointment details section */}
      <div className="max-w-4xl my-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Appointment Details
        </h1>

        {appointment && (
          <div className=" bg-gray-100 p-4 rounded-lg flex justify-center">
            <div className="flex flex-col items-center mr-2">
              <p className="text-md text-black font-bold">
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
      <div className="flex w-full max-w-4xl items-center flex-col">
        <div className="justify-between items-center row-2  ">
          {/* {appointment &&
            appointment.status !== "COMPLETE" &&
            appointment.status !== "CANCELLEDBYSTUDENT" &&
            appointment.status !== "CANCELLEDBYDOCTOR" && (
              <div className="right-0">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleClick(appointment)}
                >
                  Update
                </button>
              </div>
            )} */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="table-fixed bg-white min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      Appointment ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      School ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      Patient Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      Service Name
                    </th>

                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      Doctor
                    </th>
                    {appointment &&
                      (appointment.status === "CANCELLEDBYDOCTOR" ||
                        appointment.status === "CANCELLEDBYSTUDENT" ||
                        appointment.status === "REQUESTTOCANCELBYSTUDENT" ||
                        appointment.status === "REQUESTTOCANCELBYDOCTOR") && (
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                          Reason for Cancellation
                        </th>
                      )}
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
                      className={`hover:cursor-pointer
                      }`}
                    >
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {appointment.id}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {appointment.patient.id}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {appointment.patient.firstName}{" "}
                        {appointment.patient.lastName}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {appointment.service.serviceName}
                      </td>

                      <td className="py-4 px-6">
                        {appointment.personnel &&
                        appointment.personnel.firstName !== null
                          ? `${appointment.personnel.firstName} ${appointment.personnel.lastName}`
                          : "null"}
                      </td>
                      {appointment &&
                        (appointment.status === "CANCELLEDBYDOCTOR" ||
                          appointment.status === "CANCELLEDBYSTUDENT" ||
                          appointment.status === "REQUESTTOCANCELBYSTUDENT" ||
                          appointment.status === "REQUESTTOCANCELBYDOCTOR") && (
                          <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                            {appointment.reasonforCancellation}
                          </td>
                        )}
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
        </div>
      </div>
    </div>
  );
};

export default Page;
