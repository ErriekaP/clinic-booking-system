//when service is clicked, makita ang doctors with their schedules
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

interface Service {
  id: number;
  serviceName: string;
  currentQueueNumber: number;
}

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/${id}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch service");
          }

          const data = await response.json();

          setService(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching service data:", error);
        }
      }
    };

    fetchServiceData();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <p>{service?.currentQueueNumber}</p>
      </div>
      <div>
        {" "}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          type="submit"
        >
          Pause
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          type="submit"
        >
          Resume
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Next
        </button>
      </div>
    </div>
  );
}
