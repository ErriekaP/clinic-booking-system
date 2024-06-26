"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const { date, startTime, endTime, doctorId, serviceId } = parsedParams;

  const dateString = date.slice(0, 10);

  //if doctors will set reserve the appointment because he is off duty

  // Convert the start time
  const startDateTimeString = `${dateString}T${startTime}:00.000Z`;

  const [personnel, setPersonnel] = useState<any>(null);

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/personnel/${doctorId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch personnel");
        }
        const responseData = await response.json();
        const personnelData = responseData.data;

        setPersonnel(personnelData);
      } catch (error) {
        console.error("Error fetching personnel:", error);
      }
    };

    fetchPersonnel();
  }, [doctorId]);

  // Convert the end time
  const endDateTimeString = `${dateString}T${endTime}:00.000Z`;

  //const endTimeDate = new Date(endDateTimeString);

  const handleCancel = () => {
    router.back();
  };

  const [formData, setFormData] = useState({
    personnelID: parseInt(doctorId, 10),
    serviceID: parseInt(serviceId, 10),
    startTime: startDateTimeString,
    endTime: endDateTimeString,
    details: "",
    reasonforCancellation: "",
    status: "DOCTORNOTAVAILABLE",
  });
  //console.log(startTimeDate);
  console.log(endDateTimeString);

  console.log(formData);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Form submitted successfully!");
        router.push(`/personnel/doctor/appointments/${doctorId}`);
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <div className="flex flex-col gap-4">
          <div className="">
            <p className="font-bold">Date:</p>
            <p>{dateString}</p>
          </div>
          <div className="">
            <p className="font-bold">Start Time:</p>
            <p>{startTime}</p>
          </div>
          <div className="">
            <p className="font-bold">End Time:</p>
            <p>{endTime}</p>
          </div>

          <div>
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
          </div>
        </div>
        <div className="my-4">
          <label
            htmlFor="reasonforCancellation"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Reason for Removal:
          </label>
          <input
            id="reasonforCancellation"
            name="reasonforCancellation"
            type="text"
            value={formData.reasonforCancellation}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
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
            Remove Schedule
          </button>
        </div>
      </form>
    </div>
  );
}
