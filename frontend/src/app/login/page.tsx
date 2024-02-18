"use client";
import { Flex, Select, Tabs, Text } from "@radix-ui/themes";
import "./styles.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formRegisterData, setFormRegisterData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
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
        console.log("Login successfully");
        const user = await response.json();
        console.log(user.id);
        if (user.role === "ADMIN") {
          router.push(`/admin/${user.id}`);
        } else if (user.role === "DOCTOR") {
          router.push(`/doctor/${user.id}`);
        } else if (user.role === "NURSE") {
          router.push(`/nurse/${user.id}`);
        } else if (user.patientType === "STUDENT") {
          router.push(`/patient/${user.id}`);
        } else if (user.patientType === "EMPLOYEE") {
          router.push(`/patient/${user.id}`);
        } else {
          router.push("/default");
        }
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleRegisterSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/patients/registerpatients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formRegisterData,
          }),
        }
      );

      if (response.ok) {
        console.log("Register successfully");
        const patient = await response.json();
        console.log(patient);
        console.log(patient.data.patientType);
        if (patient.data.patientType === "STUDENT") {
          router.push(`/student/${patient.data.id}`);
        } else if (patient.data.patientType === "EMPLOYEE") {
          router.push(`/employees/${patient.data.id}`);
        }
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

  const handleRegisterInputChange = (e: {
    target: { name: any; value: any };
  }) => {
    const { name, value } = e.target;

    setFormRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    newValue: string | null,
    fieldName: "patientType"
  ) => {
    setSelectedItem(newValue);
    setFormRegisterData((prevState) => ({
      ...prevState,
      [fieldName]: newValue || "",
    }));
  };

  return (
    <main className="flex flex-col items-center justify-between p-4 ">
      <Flex direction="column" align="center" justify="center">
        <Text className="Heading">Clinic Booking System</Text>
        <Flex className="TabsContainer">
          <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="Manage your account">
              <Tabs.Trigger className="TabsTrigger" value="tab1">
                Login
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                Register
              </Tabs.Trigger>
            </Tabs.List>
            <form onSubmit={handleSubmit}>
              <Tabs.Content className="TabsContent" value="tab1">
                <p className="Text">Login your account here!</p>
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="Input"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="Input"
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    justifyContent: "flex-end",
                  }}
                >
                  <button className="Button brown" type="submit">
                    Login
                  </button>
                </div>
              </Tabs.Content>
            </form>
            <form onSubmit={handleRegisterSubmit}>
              <Tabs.Content className="TabsContent" value="tab2">
                <p className="Text">Register your account here!</p>
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="Input"
                    id="email"
                    type="email"
                    name="email"
                    value={formRegisterData.email}
                    onChange={handleRegisterInputChange}
                  />
                </fieldset>
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="Input"
                    id="password"
                    type="password"
                    name="password"
                    value={formRegisterData.password}
                    onChange={handleRegisterInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="role">
                    Role
                  </label>
                  <Select.Root
                    name="patientType"
                    onValueChange={(newValue) =>
                      handleSelectChange(newValue, "patientType")
                    }
                  >
                    <Select.Trigger className="SelectTrigger" />
                    <Select.Content className="SelectContent">
                      <Select.Group>
                        <Select.Label>Role</Select.Label>
                        <Select.Item className="SelectItem" value="STUDENT">
                          Student
                        </Select.Item>
                        <Select.Item className="SelectItem" value="EMPLOYEE">
                          Employee
                        </Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </fieldset>

                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    justifyContent: "flex-end",
                  }}
                >
                  <button className="Button" type="submit">
                    Register
                  </button>
                </div>
              </Tabs.Content>
            </form>
          </Tabs.Root>
        </Flex>
      </Flex>
    </main>
  );
}
