"use client";

import { Card, Container, Flex, Heading, Select, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Update the formData state with the fetched data
        setFormData((prevData) => ({
          ...prevData,
          serviceName: data.serviceName,
          description: data.description,
          status: data.status,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(formData);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/update/${params.id}`,
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

  const handleSelectChange = (newValue: string | null, fieldName: "status") => {
    setSelectedItem(newValue);
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: newValue || "",
    }));
  };

  console.log(formData);
  console.log(selectedItem);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Container>
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Update Service
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
            <div className="mb-4">
              <fieldset>
                <div className="mb-4 ">
                  <label
                    htmlFor="status"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Status
                  </label>
                  <div className="relative">
                    <Select.Root
                      name="status"
                      value={formData.status}
                      onValueChange={(newValue) =>
                        handleSelectChange(newValue, "status")
                      }
                    >
                      <Select.Trigger>
                        {formData.status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Group>
                          <Select.Item value="ACTIVE">Active</Select.Item>
                          <Select.Item value="INACTIVE">Inactive</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  </div>
                </div>
              </fieldset>
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
  );
}
