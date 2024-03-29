"use client";
import React, { useState } from "react";
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
  const { date, startTime, endTime, doctorId, serviceId, patientId } =
    parsedParams;

  // Convert the start time
  const startDateTimeString = `${date} ${startTime}`;
  const startTimeDate = new Date(startDateTimeString);
  const startISODate = new Date(
    Date.UTC(
      startTimeDate.getFullYear(),
      startTimeDate.getMonth(),
      startTimeDate.getDate(),
      startTimeDate.getHours(),
      startTimeDate.getMinutes(),
      startTimeDate.getSeconds()
    )
  );
  const isoFormattedStartTime = startISODate.toISOString();

  // Convert the end time
  const endDateTimeString = `${date} ${endTime}`;
  const endTimeDate = new Date(endDateTimeString);
  const endISODate = new Date(
    Date.UTC(
      endTimeDate.getFullYear(),
      endTimeDate.getMonth(),
      endTimeDate.getDate(),
      endTimeDate.getHours(),
      endTimeDate.getMinutes(),
      endTimeDate.getSeconds()
    )
  );
  const isoFormattedEndTime = endISODate.toISOString();

  console.log("ISO formatted start time:", isoFormattedStartTime);
  console.log("ISO formatted end time:", isoFormattedEndTime);

  const handleCancel = () => {
    router.back();
  };

  const formData = {
    patientID: parseInt(patientId, 10),
    personnelID: parseInt(doctorId, 10),
    serviceID: parseInt(serviceId, 10),
    startTime: isoFormattedStartTime,
    endTime: isoFormattedEndTime,
    details: "",
    reasonforCancellation: "",
    status: "PENDING",
  };

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
        router.push("/appointments");
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
            <p className="font-bold">Date:</p>
            <p>{date}</p>
          </div>
          <div className="">
            <p className="font-bold">Start Time:</p>
            <p>{startTime}</p>
          </div>
          <div className="">
            <p className="font-bold">End Time:</p>
            <p>{endTime}</p>
          </div>
          <div className="">
            <p className="font-bold">Doctor ID:</p>
            <p>{doctorId}</p>
          </div>
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
            Schedule Appointment
          </button>
        </div>
      </form>
    </div>
  );
}
