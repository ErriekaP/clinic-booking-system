//kunin ang services, when clicked, makita anf doctors with their schedules

"use client";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchUserInfo } from "@/utilities/fetch/patient";
import BackNavbar from "@/components/backNavbar/backNavbar";

export default function Page() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  interface Services {
    id: number;
    serviceName: string;
    description: string;
    status: string;
  }

  const [services, setServices] = useState<Services[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<Services | null>(null);
  const [user, setUser] = useState<String | null>(null);

  const handleClick = (service: Services) => {
    setSelectedService(service);
    if (user == "ADMIN" || user == "NURSE") {
      router.push(`/services/update/${service.id}`);
    }
    //router.push(`/services/${service.id}`);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/services`,
          {
            method: "GET",
          }
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
  }, []); // Fetch patients on component mount
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data: sessionData, error } = await supabase.auth.getSession();
        if (error || !sessionData || !sessionData.session) {
          // Error or no session data, redirect to login page
          router.push("/login");
          return;
        }
        const userInfo = await fetchUserInfo(sessionData.session.user.id);
        console.log("user", userInfo);
        if (userInfo.role === "ADMIN") {
          setUser("ADMIN");
        } else if (userInfo.patientType === "STUDENT") {
          setUser("STUDENT");
        } else if (userInfo.patientType === "EMPLOYEE") {
          setUser("EMPLOYEE");
        } else if (userInfo.role === "DOCTOR") {
          setUser("DOCTOR");
        } else if (userInfo.role === "NURSE") {
          setUser("NURSE");
        } else if (userInfo.role === "STAFF") {
          setUser("STAFF");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    getUserInfo();
  }, [router]);
  // Function to handle search query change
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  // Filter patients based on search query
  const filteredServices = services.filter(
    (service) =>
      service.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (isoDate: string | number | Date) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  };

  const navigateToAddService = () => {
    router.push("/services/add");
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
                  onClick={navigateToAddService}
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
                      Service Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-s font-bold uppercase">
                      Description
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-s font-bold uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service) => (
                    <tr
                      key={service.id}
                      onClick={() => handleClick(service)}
                      className="hover:border-4"
                    >
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
                              {service.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {" "}
                          {service.serviceName}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {" "}
                          {service.description}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {" "}
                          {service.status}
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
