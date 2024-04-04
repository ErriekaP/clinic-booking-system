"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    // Fetch appointments data from an API
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/patients/appointments/${id}`
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

  const handleClick = () => {
    router.push(`/appointments/schedule`);
  };
  console.log(appointments);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your appointments here!</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Appointment ID</th>
              <th className="px-4 py-2">Service ID</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b">
                <td className="px-4 py-2">{appointment.id}</td>
                <td className="px-4 py-2">{appointment.serviceID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex mt-8 justify-end">
        <button
          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-base font-medium bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => handleClick()}
        >
          Schedule Appointments
        </button>
      </div>
    </div>
  );
};

export default Page;
