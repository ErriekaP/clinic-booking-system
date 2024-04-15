"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchUserInfo } from "@/utilities/fetch/patient";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  patientType: "STUDENT" | "EMPLOYEE";
  role: "ADMIN" | "DOCTOR" | "NURSE" | "STAFF";
  email: string;
}

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();

  // Decode the URL-encoded string
  const decodedSlug = decodeURIComponent(params.slug);

  // Parse the parameters from the decoded string
  const paramsArray = decodedSlug.split("&");
  const parsedParams: { [key: string]: string } = {};
  paramsArray.forEach((param) => {
    const [key, value] = param.split("=");
    parsedParams[key] = value;
  });

  // Extract date, time, and doctorId from parsedParams
  const { serviceID } = parsedParams;

  //   const dateString = date.slice(0, 10);

  //   // Convert the start time
  //   const startDateTimeString = `${dateString}T${startTime}:00.000Z`;

  //   //const startTimeDate = new Date(startDateTimeString);

  const [service, setService] = useState<any>(null);
  const [user, setUser] = useState<User | undefined>();
  const [isStop, setIsStop] = useState<boolean | null>(null);

  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        // Retrieve the session from Supabase
        const { data: session, error } = await supabase.auth.getUser();
        if (error) {
          throw new Error("Failed to fetch session");
        }

        console.log("sess", session);

        if (session && session.user) {
          // Fetch user info from your API using the user ID
          const userInfo = await fetchUserInfo(session.user.id);

          let newUserType;
          if (userInfo.role != null) {
            newUserType = userInfo.role;
          } else {
            newUserType = userInfo.patientType;
          }

          // Set user
          setUser(userInfo);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        // Handle error or show error message to the user
      }
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/${serviceID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch service");
        }
        const responseData = await response.json();

        setService(responseData);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [serviceID]);

  console.log(service);

  //   // Convert the end time
  //   const endDateTimeString = `${dateString}T${endTime}:00.000Z`;

  //const endTimeDate = new Date(endDateTimeString);

  const handleCancel = () => {
    router.back();
  };

  const handleIsStop = () => {
    if (service.isStop == true) {
      alert("Service is not available right now.");
    } else {
      console.log("Form submitted successfully!");
      router.push(`/patient/student/${user?.id}`);
    }
  };

  const formData = {
    serviceID: parseInt(serviceID, 10),
    patientID: user?.id,
    status: "JOINED",
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/queue/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        handleIsStop();
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <div className="flex flex-col gap-4">
          <div className="">
            <p className="font-bold">ServiceID:</p>
            <p>{serviceID}</p>
          </div>

          <div>
            {service ? (
              <div>
                <p className="font-bold">Service Name:</p>
                <p>{service.serviceName}</p>
              </div>
            ) : (
              <p>Loading service data...</p>
            )}
          </div>

          {/* <div>
            {personnel ? (
              <div>
                <p className="font-bold">Doctor:</p>
                <p>
                  {personnel.firstName} {personnel.lastName}
                </p>
              </div>
            ) : (
              <p>Loading personnel data...</p>
            )}
          </div> */}
        </div>
        <div className="mt-8 flex gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            type="submit"
          >
            Get Ticket
          </button>
        </div>
      </form>
    </div>
  );
}
