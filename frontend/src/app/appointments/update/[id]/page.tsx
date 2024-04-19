"use client";

//add reason for cancellation

import { Card, Container, Flex, Heading, Select, Text } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface Personnel {
  id: string;
  firstName: string;
  lastName: string;
}

interface FormData {
  id: string;
  startTime: string;
  endTime: string;
  description: string;
  status: string;
  reasonforCancellation: string;
  service: {
    id: string;
    serviceName: string;
    description: string;
  };
  personnelID: number | null; // Change personnel to string | null
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
  };
}

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [personnelList, setPersonnelList] = useState<Personnel[]>([]);

  const [formData, setFormData] = useState<FormData>({
    id: "",
    startTime: "",
    endTime: "",
    description: "",
    status: "",
    reasonforCancellation: "",
    service: {
      id: "",
      serviceName: "",
      description: "",
    },
    personnelID: null,
    patient: {
      id: "",
      firstName: "",
      lastName: "",
      contactNumber: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        // Update the formData state with the fetched data
        setFormData((prevData) => ({
          ...prevData,
          id: data.id,
          startTime: data.startTime,
          endTime: data.endTime,
          description: data.description,
          status: data.status,
          reasonforCancellation: data.reasonforCancellation,
          service: {
            id: data.service?.id,
            serviceName: data.service?.serviceName,
            description: data.service?.description,
          },
          personnelID: data.personnel?.id ?? null, // Set personnel as ID or null

          // personnel: {
          //   id: data.personnel?.id,
          //   firstName: data.personnel?.firstName,
          //   lastName: data.personnel?.lastName,
          //   phoneNumber: data.personnel?.phoneNumber,
          // },

          patient: {
            id: data.patient?.id,
            firstName: data.patient?.firstName,
            lastName: data.patient?.lastName,
            contactNumber: data.patient?.contactNumber,
          },
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (formData.service && formData.service.id) {
          const personnelResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/${formData.service.id}/personnel`
          );
          const data = await personnelResponse.json();
          const personnelData = data.personnel;
          setPersonnelList(personnelData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [formData.service]);

  //console.log(personnel);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/update/${params.id}`,
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

  console.log(personnelList);

  const handleSelectChange = (newValue: string | null, fieldName: "status") => {
    setSelectedItem(newValue);
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: newValue || "",
      // personnel: personnelList.id ?? null,
    }));
  };

  const handlePersonnelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedPersonnelId = event.target.value;

    // Parse the selectedPersonnelId to a number
    const personnelId =
      selectedPersonnelId !== "null" ? parseInt(selectedPersonnelId, 10) : null;

    // Update the formData state with the parsed personnel ID
    setFormData({
      ...formData,
      personnelID: personnelId,
    });
  };

  console.log("pers", formData);

  const formatTime = (timeString: string) => {
    const hours = parseInt(timeString.slice(11, 13), 10);
    const minutes = timeString.slice(14, 16);
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours > 12 ? hours - 12 : hours;
    return `${formattedHours}:${minutes} ${period}`;
  };
  const formatDate = (dateString: string) => {
    const dayjsObject = dayjs(dateString);
    const isoDateString = dayjsObject.format("MMMM D, YYYY	");
    return isoDateString;
  };

  const formattedstartISO = formatTime(formData.startTime);
  const formattedendISO = formatTime(formData.endTime);

  const dateSchedule = formatDate(formData.startTime);

  console.log("data", formData.startTime);
  console.log(selectedItem);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Container>
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              Update Status
            </h2>
            <div className=" columns-2 container mx-auto">
              <div className="mb-4">
                <p className="text-sm">Patient:</p>
                <p className="font-bold">
                  {formData.patient.firstName} {formData.patient.lastName}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm">Contact Number:</p>
                <p className="font-bold">{formData.patient.contactNumber}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm">Schedule:</p>
              <p className="font-bold">
                {dateSchedule} {formattedstartISO} - {formattedendISO}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm">Service:</p>
              <p className="font-bold">{formData.service.serviceName}</p>
            </div>

            <div className="container mx-auto  font-sans text-sm">
              <div className="mb-4">
                <p className="text-sm">Doctor:</p>

                {personnelList.length > 0 ? (
                  <select
                    value={formData.personnelID ?? "null"}
                    onChange={handlePersonnelChange}
                    className=" font-bold border-2 rounded p-1"
                  >
                    <option value="null">Select Personnel</option>
                    {personnelList.map((personnel) => (
                      <option key={personnel.id} value={personnel.id}>
                        {`${personnel.firstName} ${personnel.lastName}`}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>Loading personnel data...</p> // Placeholder for loading state
                )}
              </div>
            </div>

            {formData.status !== "PENDING" &&
              formData.status !== "SCHEDULED" &&
              formData.status !== "COMPLETE" && (
                <div className="mb-4">
                  <p className="text-sm">Reason for Cancellation:</p>
                  <p className="font-bold">{formData.reasonforCancellation}</p>
                </div>
              )}

            <fieldset>
              <div className="container mx-auto">
                <div className="mb-4 ">
                  <label htmlFor="status" className="text-sm ">
                    Status:
                  </label>

                  <div className="relative">
                    <Select.Root
                      name="status"
                      value={formData.status}
                      onValueChange={(newValue) =>
                        handleSelectChange(newValue, "status")
                      }
                    >
                      <Select.Trigger className="font-bold"></Select.Trigger>
                      <Select.Content>
                        <Select.Group>
                          <Select.Item value="PENDING">Pending</Select.Item>
                          <Select.Item value="SCHEDULED">Scheduled</Select.Item>
                          <Select.Item
                            value="REQUESTTOCANCELBYSTUDENT"
                            disabled
                          >
                            Request to Cancel by Student
                          </Select.Item>
                          <Select.Item value="REQUESTTOCANCELBYDOCTOR" disabled>
                            Request to Cancel by Doctor
                          </Select.Item>
                          <Select.Item value="CANCELLEDBYSTUDENT">
                            Cancelled by Student
                          </Select.Item>
                          <Select.Item value="CANCELLEDBYDOCTOR">
                            Cancelled by Doctor
                          </Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  </div>
                </div>
              </div>
            </fieldset>
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
