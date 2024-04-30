//user selects a service, selects a date, then it shows the doctor's schedule with 30min interval (if 2 doctors have the same 30 mins interval just display one), then the user chooses a schedule, then it shows the doctor.

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import dayjs, { Dayjs } from "dayjs";
import BackNavbar from "@/components/backNavbar/backNavbar";

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

  interface Interval {
    startTime: string;
    endTime: string;
  }

  const [services, setServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    id ? Number(id) : null
  );
  const [selectedDoctor, setSelectedDoctor] = useState<Personnel>();
  const [clickedInterval, setClickedInterval] = useState<Interval>();
  const [clickedDoctors, setClickedDoctors] = useState<Personnel[] | null>(
    null
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [userPersonnel, setPersonnel] = useState<Personnel>();
  const [url, setUrl] = useState<string | null>(null);

  const supabase = createClientComponentClient();
  const [intervals, setIntervals] = useState<Interval[]>([]);

  const dayjsObject = dayjs(selectedDate);
  const isoDateString = dayjsObject.format("YYYY-MM-DD");

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/schedule/intervals?serviceIds=${selectedServiceId}&date=${isoDateString}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch intervals");
        }

        const data = await response.json();

        const uniqueIntervals = Array.from(
          new Set(
            intervals.map(
              (interval) => `${interval.startTime}-${interval.endTime}`
            )
          )
        ).map((combinedTime) => {
          const [startTime, endTime] = combinedTime.split("-");
          return { startTime, endTime };
        });

        console.log(uniqueIntervals);

        setIntervals(data);
      } catch (error) {
        console.error("Error fetching intervals:", error);
      }
    };

    fetchScheduleData();
  }, [selectedServiceId, selectedDate]);

  //get user

  useEffect(() => {
    const fetchPatientId = async () => {
      try {
        const { data: session, error } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }
        const supabaseUserId = session.user.id;
        const patientId = await getPatientIdFromSupabaseId(supabaseUserId);
        setUserId(patientId);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchPatientId();
  }, []);
  console.log(userPersonnel);

  //get patient detail from supabaseID

  const getPatientIdFromSupabaseId = async (supabaseId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/patients/supabaseUserID/${supabaseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching patient ID:", error);
      return null;
    }
  };

  //get Services
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

  //get available personnel
  useEffect(() => {
    const fetchAvailablePersonnel = async () => {
      if (clickedInterval) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/schedule/available-doctors?startTime=${clickedInterval.startTime}&endTime=${clickedInterval.endTime}&serviceId=${selectedServiceId}&date=${isoDateString}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch personnel");
          }

          const data = await response.json();
          setClickedDoctors(data);
        } catch (error) {
          console.error("Error fetching service data:", error);
        }
      }
    };

    fetchAvailablePersonnel();
  }, [isoDateString, clickedInterval]);

  console.log(isoDateString);

  const handleSetAppointment = () => {
    if (selectedDate && clickedInterval) {
      // const { id: doctorId } = selectedDoctor;
      const { startTime, endTime } = clickedInterval;

      let url: string;

      if (userId === null) {
        // For unauthenticated user
        url = `/personnel/doctor/appointments/schedule/confirmation/date=${isoDateString}&startTime=${startTime}&endTime=${endTime}&serviceId=${params.id}`;
      } else {
        // For authenticated user
        url = `/appointments/schedule/confirmation/date=${isoDateString}&startTime=${startTime}&endTime=${endTime}&serviceId=${params.id}&patientId=${userId}`;
      }

      router.push(url); // Redirect to the constructed URL
    }
  };

  const handleDateChange = (date: Date) => {
    if (date) {
      setSelectedDoctor(undefined);
      setClickedInterval(undefined);
      setSelectedDate(dayjs(date));
      console.log(date);
    } else {
      setSelectedDate(null);
    }
  };

  const disableDates = (date: dayjs.Dayjs): boolean => {
    const currentDate = dayjs().startOf("day");
    const oneMonthAfterCurrentDate = currentDate.add(1, "month");

    // Disable dates that are before today's date
    if (date.isBefore(currentDate, "day")) {
      return true;
    }

    // Disable dates that are one month or more after today's date
    if (date.isAfter(oneMonthAfterCurrentDate, "day")) {
      return true;
    }

    // Disable Sundays (day() === 0)
    if (date.day() === 0) {
      return true;
    }

    return false; // Enable all other dates
  };

  const handleIntervalClick = (
    interval: Interval,
    doctors: Personnel[] | null
  ) => {
    console.log(interval);
    console.log(doctors);

    setClickedInterval(interval);
    setClickedDoctors(doctors);
  };
  const handleDoctorClick = (doctor: Personnel) => {
    console.log(doctor);
    setSelectedDoctor(doctor);
  };

  return (
    <div>
      <BackNavbar />
      <div className="flex flex-row justify-center items-start ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="bg-white p-4 border-4 border-gray-400 rounded-md">
            <DateCalendar
              value={selectedDate}
              onChange={handleDateChange}
              shouldDisableMonth={disableDates}
            />
          </div>
        </LocalizationProvider>
        {selectedDate != null && (
          <div className="flex ml-8">
            <div className="schedules-list w-25 mx-10">
              <h2 className="text-lg font-semibold text-white">
                Schedules for selected date:
              </h2>
              {services.map(
                (service) =>
                  service.id === selectedServiceId && (
                    <div key={service.id}>
                      <h3 className="text-lg font-semibold text-white my-2">
                        {service.serviceName}
                      </h3>
                      {/* Display intervals for the selected service */}
                      <div className="grid grid-cols-1 gap-4">
                        {intervals.map((interval, index) => (
                          <div
                            key={index}
                            className={` rounded-lg shadow-md p-4 cursor-pointer text-center hover:bg-gray-400 ${
                              clickedInterval === interval
                                ? "bg-gray-500"
                                : "bg-white"
                            }
                           `}
                            onClick={() =>
                              handleIntervalClick(interval, clickedDoctors)
                            }
                          >
                            <p>
                              {interval.startTime} - {interval.endTime}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div>
                        <button
                          className={`my-2 px-4 py-2 text-white rounded-md cursor-pointer ${
                            !clickedInterval
                              ? "bg-gray-400"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
                          onClick={handleSetAppointment}
                          disabled={!clickedInterval}
                        >
                          Set Appointment
                        </button>
                      </div>
                    </div>
                  )
              )}
            </div>
            {/* {clickedInterval && clickedDoctors && (
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
                  className={`my-2 px-4 py-2 text-white rounded-md cursor-pointer ${
                    !selectedDoctor
                      ? "bg-gray-400"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  onClick={handleSetAppointment}
                  disabled={!selectedDoctor}
                >
                  Set Appointment
                </button>
              </div>
            </div>
          )} */}
          </div>
        )}
      </div>
    </div>
  );
};
export default Page;
