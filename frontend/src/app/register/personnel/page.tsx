"use client";
import { Card, Container, Flex, Heading, Select, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MultipleSelect from "@/components/multipleselect/MultipleSelect";
import MultipleSchedule from "@/components/multipleschedule/MultipleSchedule";

export default function Page() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    role: "STAFF",
    phoneNumber: "",
    dateOfBirth: "2022-02-02T12:34:56Z",
    gender: "MALE",
    specialty: "",
    status: "ACTIVE",
    services: [] as number[],
    workSchedule: [] as number[],
  });

  const [services, setServices] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<any[]>([]);

  useEffect(() => {
    if (formData.role === "DOCTOR") {
      // Fetch services for doctors from backend
      fetchServices();
      fetchSchedule();
    }
  }, [formData.role]);

  const fetchServices = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/services`
      );
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchSchedule = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/schedule`
      );
      if (response.ok) {
        const data = await response.json();
        setSchedule(data);
      } else {
        console.error("Failed to fetch schedules");
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const handleServiceChange = (e: { target: { checked: any; value: any } }) => {
    const { checked, value } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        services: [...prevData.services, value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        services: prevData.services.filter((service) => service !== value),
      }));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            dateOfBirth: `${formData.dateOfBirth}T00:00:00.000Z`,
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

  const handleSelectChange = (
    newValue: string | null,
    fieldName: "gender" | "role"
  ) => {
    setSelectedItem(newValue);
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: newValue || "",
    }));

    if (fieldName === "role" && newValue !== "DOCTOR") {
      setFormData((prevState) => ({
        ...prevState,
        specialty: "",
      }));
    }
  };

  console.log(formData);
  console.log(selectedItem);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Container>
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
          >
            {/* Form Header */}
            <h2 className="text-2xl font-bold mb-4 text-center">
              Register Personnel
            </h2>
            {/* Basic Details Card */}
            <div className="mb-6">
              <Card>
                <p className="text-lg font-semibold mb-2">Basic Details</p>
                <div className="flex flex-col gap-4">
                  {/* First Name */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-bold mb-1"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  {/* Middle Name */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="middleName"
                      className="text-sm font-bold mb-1"
                    >
                      Middle Name
                    </label>
                    <input
                      id="middleName"
                      name="middleName"
                      type="text"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-bold mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="phoneNumber"
                      className="text-sm font-bold mb-1"
                    >
                      Contact Number
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="dateOfBirth"
                      className="text-sm font-bold mb-1"
                    >
                      Date of Birth
                    </label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col">
                    <label htmlFor="gender" className="text-sm font-bold mb-1">
                      Gender
                    </label>
                    <Select.Root
                      name="gender"
                      onValueChange={(newValue) =>
                        handleSelectChange(newValue, "gender")
                      }
                    >
                      <Select.Trigger />
                      <Select.Content>
                        <Select.Group>
                          <Select.Item value="MALE">Male</Select.Item>
                          <Select.Item value="FEMALE">Female</Select.Item>
                          <Select.Item value="NON_BINARY">
                            Non-Binary
                          </Select.Item>
                          <Select.Item value="AGENDER">Agender</Select.Item>
                          <Select.Item value="GENDERFLUID">
                            Gender Fluid
                          </Select.Item>
                          <Select.Item value="BIGENDER">Bigender</Select.Item>
                          <Select.Item value="ANDROGYNOUS">
                            Androgynous
                          </Select.Item>
                          <Select.Item value="PREFER_NOT_TO_SAY">
                            Prefer not to say
                          </Select.Item>
                          <Select.Item value="OTHER">Other</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  </div>
                </div>
              </Card>
            </div>

            {/* Login Details Card */}
            <div className="mb-6">
              <Card>
                <p className="text-lg font-semibold mb-2">Login Details</p>
                <div className="flex flex-col gap-4">
                  {/* Email */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-bold mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="password"
                      className="text-sm font-bold mb-1"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  {/* Role */}
                  <div className="flex flex-col">
                    <label htmlFor="role" className="text-sm font-bold mb-1">
                      Role
                    </label>
                    <Select.Root
                      name="role"
                      onValueChange={(newValue) =>
                        handleSelectChange(newValue, "role")
                      }
                    >
                      <Select.Trigger />
                      <Select.Content>
                        <Select.Group>
                          <Select.Item value="DOCTOR">Doctor</Select.Item>
                          <Select.Item value="NURSE">Nurse</Select.Item>
                          <Select.Item value="STAFF">Staff</Select.Item>
                          {/* Add more role options as needed */}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  </div>
                </div>
              </Card>
            </div>
            {/* Additional Fields for Doctor Role */}
            {formData.role === "DOCTOR" && (
              <>
                <Card>
                  <div className="flex flex-col gap-2">
                    {/* Specialty */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="specialty"
                        className="text-sm font-bold mb-1"
                      >
                        Specialty
                      </label>
                      <input
                        id="specialty"
                        name="specialty"
                        type="text"
                        value={formData.specialty}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>
                </Card>
                <div className="relative">
                  <div className="grid grid-row-2 gap-2">
                    {/* Services (Multiple Select) */}
                    <div className="relative z-50">
                      <MultipleSelect
                        options={services}
                        selectedOptions={formData.services}
                        onChange={(selectedOptions) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            services: selectedOptions,
                          }))
                        }
                      />
                    </div>
                    <div className="relative select-container">
                      <MultipleSchedule
                        options={schedule}
                        selectedOptions={formData.workSchedule}
                        onChange={(selectedOptions) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            workSchedule: selectedOptions,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* Submit Button */}
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
