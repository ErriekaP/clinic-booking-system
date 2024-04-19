"use client";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
//appointments under his number
const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const [appointments, setAppointments] = useState<any[]>([]);
  const [nullAppointments, setNullAppointments] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Fetch appointments data from an API
    const fetchNullPatientAppointments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/personnel/appointments/nullPatient/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setNullAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchNullPatientAppointments();
  }, []);

  const handleClickAppointment = () => {
    router.push(`/personnel/doctor/appointments/schedule`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // Implement search functionality (if needed)
  };

  const filteredNullAppointments = nullAppointments.filter((appointment) =>
    appointment.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="block relative max-w-sm mb-4">
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
          className="appearance-none rounded-md border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex flex-col flex-grow w-full max-w-4xl">
        <div className="overflow-x-auto mt-8">
          {/* Display the cancelled appointments (no patient) table */}
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="table-fixed bg-white min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                    Appointment ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                    Service
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                    Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                    Time
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredNullAppointments.map(
                  (appointment) =>
                    !appointment.patient && (
                      <tr
                        key={appointment.id}
                        //onClick={() => handleClick(appointment)}
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                          {appointment.id}
                        </td>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                          {appointment.service.serviceName}
                        </td>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                          {formatDate(appointment.startTime)}
                        </td>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                          {`${formatTime(appointment.startTime)} - ${formatTime(
                            appointment.endTime
                          )}`}
                        </td>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                          {appointment.status}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-base font-medium bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => handleClickAppointment()}
          >
            Remove Schedule
          </button>
        </div>
      </div>
    </div>
  );
};
export default Page;
