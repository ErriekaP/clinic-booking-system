"use client";
//import "./styles.css";
import { Card, Container, Flex, Heading, Select, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MultipleSelect from "@/components/multipleselect/MultipleSelect";

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    timeFrom: "",
    timeTo: "",
  });

  const dateStartTimeString = `1990-12-12T${formData.timeFrom}:00.000Z`;
  const dateEndTimeString = `1990-12-12T${formData.timeTo}:00.000Z`;

  //1990-12-12T08:00:00.000Z
  //"1990-12-12T8:00:00.000Z"

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/schedule/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            timeFrom: dateStartTimeString,
            timeTo: dateEndTimeString,
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <Container>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl mb-4 font-bold text-white">Add Schedule</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="timeFrom"
              >
                Time From
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="timeFrom"
                name="timeFrom"
                type="text"
                value={formData.timeFrom}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="timeTo"
              >
                Time To
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="timeTo"
                name="timeTo"
                type="text"
                value={formData.timeTo}
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
      </Container>
    </main>
  );
}
