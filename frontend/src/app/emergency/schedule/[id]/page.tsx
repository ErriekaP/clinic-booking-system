"use client";
import dayjs from "dayjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const router = useRouter();

  const [formData, setFormData] = useState({
    personnelID: parseInt("", 10),
    patientID: id,
    serviceID: parseInt("", 10),
    startTime: dayjs().toISOString().slice(0, -5) + "Z",
    endTime: dayjs().toISOString().slice(0, -5) + "Z",
    status: "EMERGENCY",
    reasonforCancellation: "",
    details: "",
  });

  console.log(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Convert personnelID from string to number
    // const parsedPersonnelID = parseInt(formData.personnelID, 10);
    // const parsedServiceID = parseInt(formData.serviceID, 10);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            // personnelID: parsedPersonnelID,
            // serviceID: parsedServiceID,
          }),
        }
      );

      if (response.ok) {
        console.log("Form submitted successfully");
        console.log(formData);
        //router.back();
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        {/* Form Header */}
        <h2 className="text-2xl font-bold mb-4 text-center">
          Emergency Patient
        </h2>
        {/* Personnel ID */}
        <div className="flex flex-col">
          <label htmlFor="personnelID" className="text-sm font-bold my-1">
            Personnel ID:{" "}
          </label>
          <input
            type="text"
            name="personnelID"
            id="personnelID"
            value={formData.personnelID}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Service ID */}
        <div className="flex flex-col">
          <label htmlFor="serviceID" className="text-sm font-bold my-1">
            Service ID:{" "}
          </label>
          <input
            type="text"
            name="serviceID"
            id="serviceID"
            value={formData.serviceID}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Details */}
        <div className="flex flex-col">
          <label htmlFor="details" className="text-sm font-bold my-1">
            Details:{" "}
          </label>
          <input
            type="text"
            name="details"
            id="details"
            value={formData.details}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Submit Button */}
        <div className="flex justify-end mt-10">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>{" "}
      </form>
    </div>
  );
}
