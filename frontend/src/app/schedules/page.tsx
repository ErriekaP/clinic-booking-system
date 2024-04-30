//kunin ang services, when clicked, makita anf doctors with their schedules

"use client";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackNavbar from "@/components/backNavbar/backNavbar";

export default function Page() {
  const router = useRouter();

  interface Schedule {
    id: number;
    timeFrom: string;
    timeTo: string;
  }

  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/schedule`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Schedule");
        }
        const data = await response.json();
        setSchedule(data);
      } catch (error) {
        console.error("Error fetching Schedule:", error);
      }
    };
    fetchSchedule();
  }, []); // Fetch patients on component mount

  // Function to handle search query change
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  // Filter patients based on search query
  const filteredSchedule = schedule.filter(
    (schedule) =>
      schedule.timeFrom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.timeTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToAddSchedules = () => {
    router.push("/schedules/add");
  };
  const extractTimeFromISO = (isoDateTime: string | number | Date) => {
    const date = new Date(isoDateTime);
    const hours = date.getUTCHours().toString().padStart(2, "0"); // Get hours in UTC and pad with leading zero if needed
    const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Get minutes in UTC and pad with leading zero if needed
    return `${hours}:${minutes}`;
  };

  return (
    <div>
      <BackNavbar />
      <div className="flex flex-col items-center justify-center">
        <div className="flex mt-8">
          <div className="flex items-center">
            <span className="absolute ml-2">
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
          <div className="basis-1/4">
            <button
              onClick={navigateToAddSchedules}
              className="   bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-3 rounded focus:outline-none"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto flex-grow">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="table-fixed bg-white min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-s font-bold uppercase ">
                      ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-s font-bold uppercase ">
                      Time From
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-s font-bold uppercase">
                      Time To
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchedule.map((schedule) => (
                    <tr key={schedule.id} className="hover:border-4">
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src="https://www.addu.edu.ph/wp-content/uploads/2020/08/UniversitySeal480px.png"
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {schedule.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {" "}
                          {extractTimeFromISO(schedule.timeFrom)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {" "}
                          {extractTimeFromISO(schedule.timeTo)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
