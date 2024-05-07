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

      <div className="flex items-center justify-center min-h-screen ">
        <Container>
          <div className="flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                Add Service
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="serviceName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Service Name
                </label>
                <input
                  id="serviceName"
                  name="serviceName"
                  type="text"
                  value={formData.serviceName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-3 pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}
