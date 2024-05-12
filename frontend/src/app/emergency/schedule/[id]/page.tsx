"use client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Service {
  id: string;
  serviceName: string;
}

interface Personnel {
  id: string;
  firstName: string;
  lastName: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState("");
  const [selectedService, setSelectedService] = useState("");

  // // Get the current date and time in the Philippines timezone
  const currentDateTime = dayjs().format("YYYY-MM-DD[T]HH:mm:ss[Z]");

  const [formData, setFormData] = useState({
    personnelID: 0,
    patientID: parseInt(id),
    serviceID: 0,
    startTime: currentDateTime,
    endTime: currentDateTime,
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

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/personnel/doctor`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch personnel");
        }
        const data = await response.json();
        setPersonnel(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPersonnel();
  }, []);

  useEffect(() => {
    const fetchService = async () => {
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
    fetchService();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/personnel/doctor`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setPersonnel(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

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
          body: JSON.stringify({
            ...formData,
          }),
        }
      );

      if (response.ok) {
        console.log("Form submitted successfully");
        console.log(formData);
        router.back();
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPersonnel(value); // Update selected personnel ID in state
    setFormData({ ...formData, personnelID: parseInt(value) }); // Update personnel ID in formData
  };

  const handleSelectChangeService = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedService(value); // Update selected personnel ID in state
    setFormData({ ...formData, serviceID: parseInt(value) }); // Update personnel ID in formData
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
        <div>
          <label htmlFor="personnelID" className="text-sm font-bold my-1">
            Doctor:{" "}
          </label>{" "}
          <select
            id="personnelID"
            value={selectedPersonnel}
            onChange={(event) => handleSelectChange(event)}
            className="shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Doctor...</option>
            {personnel.map((person) => (
              <option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </option>
            ))}
          </select>
        </div>
        {/* Service ID */}
        <div>
          <label htmlFor="serviceID" className="text-sm font-bold my-1">
            Service:{" "}
          </label>{" "}
          <select
            id="serviceID"
            value={selectedService}
            onChange={(event) => handleSelectChangeService(event)}
            className="shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Service...</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.serviceName}
              </option>
            ))}
          </select>
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
