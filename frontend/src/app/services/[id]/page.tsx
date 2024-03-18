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

  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (id) {
        try {
          const personnelResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/${id}/personnel`
          );

          if (!personnelResponse.ok) {
            throw new Error("Failed to fetch personnel");
          }

          const personnelData = await personnelResponse.json();

          setService({
            id: personnelData.id,
            serviceName: personnelData.serviceName,
            personnel: personnelData.personnel,
          });
          console.log(personnelData);
        } catch (error) {
          console.error("Error fetching service data:", error);
        }
      }
    };

    fetchServiceData();
  }, [id]);

  const convertTo12HourFormat = (time: string) => {
    // Create a Date object from the input time string
    const date = new Date(time);

    // Get the hours and minutes
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Convert the hours to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Determine whether it's AM or PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Format the time
    const formattedTime = `${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return formattedTime;
  };

  // Function to generate 30-minute interval times
  const generateIntervalTimesFormatted = (timeFrom: string, timeTo: string) => {
    const intervalTimes: string[] = [];
    let currentTime = new Date(timeFrom).getTime();
    const endTime = new Date(timeTo).getTime();

    // Generate interval times in 30-minute increments
    while (currentTime < endTime) {
      const timeStart = new Date(currentTime);
      const timeEnd = new Date(currentTime + 30 * 60 * 1000);

      // Format the interval time in 12-hour format
      const formattedTimeStart = convertTo12HourFormat(timeStart.toISOString());
      const formattedTimeEnd = convertTo12HourFormat(timeEnd.toISOString());

      // Push the formatted interval time to the array
      intervalTimes.push(`${formattedTimeStart} - ${formattedTimeEnd}`);

      // Update the current time to the end of the current interval
      currentTime = timeEnd.getTime();
    }

    return intervalTimes;
  };

  return (
    <div>
      {service ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Personnel in {service.serviceName}
          </h1>

          <div className="grid grid-cols-3 gap-4">
            {service.personnel.map((person) => (
              <div
                key={person.id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold">
                    {person.firstName} {person.lastName}
                  </h2>
                  <p className="text-gray-600">{person.role}</p>
                  <p className="text-gray-600">Available Time:</p>
                  <ul>
                    {person.workSchedule.map((schedule) => (
                      <li key={schedule.id}>
                        {/* {convertTo12HourFormat(schedule.timeFrom)} -{" "}
                        {convertTo12HourFormat(schedule.timeTo)} */}
                        {/* Generate and display formatted interval times */}
                        <br />
                        {generateIntervalTimesFormatted(
                          schedule.timeFrom,
                          schedule.timeTo
                        ).map((interval, index) => (
                          <React.Fragment key={index}>
                            {interval}
                            <br />
                          </React.Fragment>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
