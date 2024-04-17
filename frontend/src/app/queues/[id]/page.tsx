//when service is clicked, makita ang doctors with their schedules
"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

interface Service {
  id: number;
  serviceName: string;
  currentQueueNumber: number;
}

interface Queue {
  id: number;
  queueID: number;
}

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [service, setService] = useState<Service | null>(null);
  const [queues, setQueues] = useState<Queue[]>([]);
  const [queue, setQueue] = useState<Queue | null>(null);
  const [next, setNext] = useState<any>();

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
  }, []);

  const fetchQueueData = useCallback(async () => {
    if (service?.id) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/queue/ongoing`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch queue");
        }

        const data = await response.json();

        setQueues(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching queue data:", error);
      }
    }
  }, [service?.id]);

  useEffect(() => {
    fetchQueueData();
  }, [fetchQueueData]);

  const handlePause = async (serviceId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/pause/${serviceId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to pause service");
      }
      alert("Queue on Pause");

      console.log("Service paused successfully");
    } catch (error) {
      console.error("Error pausing service:", error);
    }
  };

  const handleResume = async (serviceId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/resume/${serviceId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to resume service");
      }

      alert("Queue on Resume");

      // Optionally update state or handle response
      console.log("Service resumed successfully");
    } catch (error) {
      console.error("Error resume service:", error);
    }
  };

  const handleNext = async (serviceId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/queue/next/${serviceId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to next service");
      }
      fetchQueueData();

      const responseData = await response.json();

      console.log(responseData);

      if (responseData.success == false) {
        alert("Queue on Pause");
      }

      // Optionally update state or handle response
      console.log("Service next successfully");
    } catch (error) {
      console.error("Error next service:", error);
    }
  };

  const handleFinish = async (queueId: number) => {
    //should be queueID
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/queue/finish/${queueId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to finish service");
      }

      fetchQueueData();

      console.log("Service finish successfully");
    } catch (error) {
      console.error("Error finish service:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {queues.map((queue) => (
        <div className=" flex flex-col text-black items-center bg-white m-5 p-5">
          <p className="">Current Queue Number:</p>
          <p className="text-6xl font-bold">{queue?.queueID}</p>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
              type="submit"
              onClick={() => handleFinish(queue.id)}
            >
              Finish
            </button>
          </div>
        </div>
      ))}
      {service ? (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="submit"
            onClick={() => handlePause(service?.id)}
          >
            Pause
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="submit"
            onClick={() => handleResume(service?.id)}
          >
            Resume
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="submit"
            onClick={() => handleNext(service?.id)}
          >
            Next
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
