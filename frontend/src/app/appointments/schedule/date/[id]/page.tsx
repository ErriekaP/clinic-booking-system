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

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    id ? Number(id) : null
  );
  const [selectedDoctor, setSelectedDoctor] = useState<Personnel | null>(null);

  const [clickedInterval, setClickedInterval] = useState<string | null>(null);
  const [clickedDoctors, setClickedDoctors] = useState<Personnel[] | null>(
    null
  );

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

  const handleSetAppointment = () => {
    if (selectedDate && selectedDoctor) {
      // Ensure selectedDoctor is not null
      const url = `/appointments/schedule/confirmation?date=${
        selectedDate.toISOString().split("T")[0]
      }&time=${selectedDate.toISOString().split("T")[1]}&doctorId=${
        selectedDoctor.id
      }`;
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

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleIntervalClick = (
    interval: string,
    doctors: Personnel[] | null
  ) => {
    setClickedInterval(interval);
    setClickedDoctors(doctors);
  };
  const handleDoctorClick = (doctor: Personnel) => {
    console.log(doctor);
    setSelectedDoctor(doctor);
  };

  const displayUniqueIntervals = (service: Service) => {
    const uniqueIntervals: string[] = [];

    // Generate unique intervals for each doctor
    service.personnel.forEach(({ workSchedule }) => {
      workSchedule.forEach(({ timeFrom, timeTo }) => {
        const intervals = generateIntervalTimesFormatted(timeFrom, timeTo);
        intervals.forEach((interval) => {
          if (!uniqueIntervals.includes(interval)) {
            uniqueIntervals.push(interval);
          }
        });
      });
    });

    return (
      <ul>
        {uniqueIntervals.map((interval, index) => (
          <li
            key={index}
            className={` ${
              clickedInterval === interval ? "bg-gray-500" : ""
            }  bg-gray-200 rounded-md my-2 py-2 px-4 hover:bg-gray-400 cursor-pointer  text-black`}
            onClick={() =>
              handleIntervalClick(
                interval,
                service.personnel.filter(({ workSchedule }) =>
                  workSchedule.some((schedule) =>
                    generateIntervalTimesFormatted(
                      schedule.timeFrom,
                      schedule.timeTo
                    ).includes(interval)
                  )
                ) || null
              )
            }
          >
            {interval}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-row justify-center items-start">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="bg-white p-4">
          <DateCalendar value={selectedDate} onChange={handleDateChange} />
        </div>
      </LocalizationProvider>

      {selectedDate && (
        <div className="flex ml-8">
          <div className="schedules-list w-25 mx-10">
            <h2 className="text-lg font-semibold text-white ">
              Schedules for selected date:
            </h2>
            {services.map(
              (service) =>
                service.id === selectedServiceId && (
                  <div key={service.id}>
                    <h3 className="text-lg font-semibold  text-white">
                      {service.serviceName}
                    </h3>
                    {/* Calculate unique intervals once for each service */}
                    {displayUniqueIntervals(service)}
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {/* Display clicked doctors on the side */}

      {clickedInterval && clickedDoctors && (
        <div className="w-1/4 px-4">
          <h3 className="text-lg font-semibold text-white">
            Doctors Available:
          </h3>
          <ul>
            {clickedDoctors.map((doctor) => (
              <div
                className={`bg-gray-200 rounded-md my-2 py-2 px-4 hover:bg-gray-400 cursor-pointer text-black ${
                  selectedDoctor === doctor ? "bg-gray-500" : ""
                }`}
                key={doctor.id}
                onClick={() => handleDoctorClick(doctor)}
              >
                <li>
                  {doctor.firstName} {doctor.lastName}
                </li>
              </div>
            ))}
          </ul>

          <div>
            <button
              className="my-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
              onClick={handleSetAppointment}
              disabled={!selectedDoctor}
            >
              Set Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;
