"use client";
//import "./styles.css";
import { Card, Container, Flex, Heading, Select, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MultipleSelect from "@/components/multipleselect/MultipleSelect";
import BackNavbar from "@/components/backNavbar/backNavbar";

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    status: "ACTIVE",
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/add`,
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
        const user = await response.json();
        console.log(user);
        router.back();
      } else {
        console.error("Failed to submit form");
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
    <div>
      <BackNavbar />

      <div className="flex min-h-screen flex-col items-center justify-between p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="bg-white shadow-md rounded p-5">
            <h2 className="text-xl mb-4 font-bold text-white">Add Service</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="serviceName"
              >
                Service Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="serviceName"
                name="serviceName"
                type="text"
                value={formData.serviceName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
