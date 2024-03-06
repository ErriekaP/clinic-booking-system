"use client";
import "./styles.css";
import { Card, Container, Flex, Heading, Select, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    dateOfBirth: "2020-03-20",
    gender: "MALE",
    specialty: "",
    status: "ACTIVE",
  });

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
    <main className="flex min-h-screen flex-col items-center justify-between p-4 ">
      <Container>
        <form onSubmit={handleSubmit}>
          <Flex
            display="flex"
            direction="column"
            align="center"
            justify="center"
          >
            <Heading>
              <Text style={{ color: "white" }}>Register Personnel</Text>
            </Heading>
          </Flex>

          <Flex>
            <Card className="CardsContent">
              <p className="Text">Basic Details</p>

              <Flex direction="row" gap="3">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="firstName">
                    FirstName
                  </label>
                  <input
                    className="Input"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="middleName">
                    MiddleName
                  </label>
                  <input
                    className="Input"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="lastName">
                    LastName
                  </label>
                  <input
                    className="Input"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </Flex>

              <Flex direction="row" gap="3">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="phoneNumber">
                    Contact Number
                  </label>
                  <input
                    className="Input"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="dateOfbirth">
                    Date of Birth
                  </label>
                  <input
                    className="Input"
                    id="dateOfBirth"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="gender">
                    Gender
                  </label>

                  <Select.Root
                    name="gender"
                    onValueChange={(newValue) =>
                      handleSelectChange(newValue, "gender")
                    }
                  >
                    <Select.Trigger className="SelectTrigger" />
                    <Select.Content className="SelectContent">
                      <Select.Group>
                        <Select.Label className="SelectLabel">
                          Gender
                        </Select.Label>
                        <Select.Item className="SelectItem" value="MALE">
                          Male
                        </Select.Item>
                        <Select.Item className="SelectItem" value="FEMALE">
                          Female
                        </Select.Item>
                        <Select.Item className="SelectItem" value="NON_BINARY">
                          Non-Binary
                        </Select.Item>
                        <Select.Item className="SelectItem" value="AGENDER">
                          Agender
                        </Select.Item>
                        <Select.Item className="SelectItem" value="GENDERFLUID">
                          Gender Fluid
                        </Select.Item>
                        <Select.Item className="SelectItem" value="BIGENDER">
                          Bigender
                        </Select.Item>
                        <Select.Item className="SelectItem" value="ANDROGYNOUS">
                          Androgynous
                        </Select.Item>
                        <Select.Item
                          className="SelectItem"
                          value="PREFER_NOT_TO_SAY"
                        >
                          Prefer not to say
                        </Select.Item>
                        <Select.Item className="SelectItem" value="OTHER">
                          Other
                        </Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </fieldset>
              </Flex>
            </Card>
          </Flex>

          <Flex>
            <Card className="CardsContent">
              <p className="Text">Login Details</p>
              <Flex direction="row" gap="4">
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
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="role">
                    Role
                  </label>

                  <Select.Root
                    name="role"
                    onValueChange={(newValue) =>
                      handleSelectChange(newValue, "role")
                    }
                  >
                    <Select.Trigger className="SelectTrigger" />
                    <Select.Content className="SelectContent">
                      <Select.Group>
                        <Select.Label className="SelectLabel">
                          Role
                        </Select.Label>
                        <Select.Item className="SelectItem" value="DOCTOR">
                          Doctor
                        </Select.Item>
                        <Select.Item className="SelectItem" value="NURSE">
                          Nurse
                        </Select.Item>
                        <Select.Item className="SelectItem" value="STAFF">
                          Staff
                        </Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </fieldset>
              </Flex>
            </Card>
          </Flex>

          <Flex>
            {formData.role === "DOCTOR" && (
              <Card className="CardsContent">
                <p className="Text">Specialty</p>
                <Flex direction="row" gap="4">
                  <fieldset className="Fieldset">
                    <label className="Label" htmlFor="specialty">
                      Specialty
                    </label>

                    <input
                      className="Input"
                      id="specialty"
                      name="specialty"
                      type="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                    />
                  </fieldset>
                </Flex>
              </Card>
            )}
          </Flex>
          <div className="flex mt-20 justify-end">
            <button className="Button blue" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Container>
    </main>
  );
}
