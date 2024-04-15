//when service is clicked, makita ang doctors with their schedules
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import React from "react";

interface workSchedule {
  id: number;
  timeFrom: string;
  timeTo: string;
}

interface Personnel {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  role: string;
  email: string;
  workSchedule: workSchedule[];
  createdAt: string;
  updatedAt: string;
}

interface Service {
  id: number;
  serviceName: string;
  personnel: Personnel[];
}

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [queue, setQueue] = useState<any>();

  useEffect(() => {
    const fetchQueueData = async () => {
      if (id) {
        try {
          const personnelResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/queue/patient/${id}`
          );

          if (!personnelResponse.ok) {
            throw new Error("Failed to fetch personnel");
          }

          const personnelData = await personnelResponse.json();

          setQueue(personnelData);
        } catch (error) {
          console.error("Error fetching service data:", error);
        }
      }
    };

    fetchQueueData();
  }, [id]);

  console.log(queue);

  return (
    <div>
      <p>QUEUE</p>
    </div>
  );
}
