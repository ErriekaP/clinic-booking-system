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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/${id}`
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

  return (
    <div>
      <h1>Your appointments here!</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>{appointment.id}</li>
        ))}
      </ul>
      <div className="flex mt-20 justify-end">
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
