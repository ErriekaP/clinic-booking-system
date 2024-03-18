//user selects a service, selects a date, then it shows the doctor's schedule with 30min interval (if 2 doctors have the same 30 mins interval just display one), then the user chooses a schedule, then it shows the doctor.

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;

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

  interface workSchedule {
    id: number;
    timeFrom: string;
    timeTo: string;
  }

  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    id ? Number(id) : null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/services`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleScheduleClick = (schedule: workSchedule, doctor: Personnel) => {
    if (selectedDate) {
      const selectedTime = schedule.timeFrom.split("T")[1];
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const url = `/appointments/schedule/date?date=${formattedDate}&time=${selectedTime}&doctorId=${doctor.id}`;
      router.push(url);
    }
  };

  useEffect(() => {
    const fetchServiceData = async () => {
      if (selectedServiceId) {
        try {
          const personnelResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/${selectedServiceId}/personnel`
          );

          if (!personnelResponse.ok) {
            throw new Error("Failed to fetch personnel");
          }

          const personnelData = await personnelResponse.json();

          setServices((prevServices) =>
            prevServices.map((service) =>
              service.id === selectedServiceId
                ? { ...service, personnel: personnelData.personnel }
                : service
            )
          );
        } catch (error) {
          console.error("Error fetching service data:", error);
        }
      }
    };

    fetchServiceData();
  }, [selectedServiceId]);

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
    <div className="flex flex-row">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex-grow">
          <DateCalendar value={selectedDate} onChange={handleDateChange} />
        </div>
      </LocalizationProvider>

      {selectedDate && (
        <div className="flex-grow">
          <div className="schedules-list">
            <h2>Schedules for selected date:</h2>
            {services.map(
              (service) =>
                service.id === selectedServiceId && (
                  <div key={service.id}>
                    <h3>{service.serviceName}</h3>
                    {service.personnel &&
                      service.personnel.map((doctor) => (
                        <div key={doctor.id}>
                          {/* <h4>Schedules for {doctor.firstName}</h4> */}
                          <ul>
                            {doctor.workSchedule.map((schedule) => (
                              <li
                                key={schedule.id}
                                onClick={() =>
                                  handleScheduleClick(schedule, doctor)
                                }
                                className="cursor-pointer text-blue-500"
                              >
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
                      ))}
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
