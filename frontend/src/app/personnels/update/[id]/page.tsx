"use client";
import BackNavbar from "@/components/backNavbar/backNavbar";
import "./styles.css";
import { Card, Container, Flex, Heading, Select, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: "",
    supabaseUserID: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    dateOfBirth: "2000-04-16",
    gender: "MALE",
    specialty: "MALE",
    status: "ACTIVE",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/personnel/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);

        const dob = new Date(data.data.dateOfBirth);
        const formattedDateOfBirth = dob.toISOString().split("T")[0];
        // Update the formData state with the fetched data
        setFormData((prevData) => ({
          ...prevData,
          id: data.data.id,
          firstName: data.data.firstName,
          middleName: data.data.middleName,
          lastName: data.data.lastName,
          role: data.data.role,
          phoneNumber: data.data.phoneNumber,
          dateOfBirth: formattedDateOfBirth,
          gender: data.data.gender,
          email: data.data.email,
          password: data.data.password,
          specialty: data.data.specialty,
          status: data.data.status,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log("form", formData);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/personnel/update/${params.id}`,
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
    fieldName: "gender" | "bloodType"
  ) => {
    setSelectedItem(newValue);
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: newValue || "",
    }));
  };

  console.log(formData);
  console.log(selectedItem);

  return (
    <div>
      <BackNavbar />
      <div className="flex min-h-screen flex-col items-center justify-between p-4 ">
        <Container>
          <form onSubmit={handleSubmit}>
            <Flex
              display="flex"
              direction="column"
              align="center"
              justify="center"
            >
              <Heading>
                <p className="text-white text-3xl">Personnel Information</p>
              </Heading>
            </Flex>

            <Flex>
              <Card className="CardsContent">
                <p className="Text">Basic Details</p>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="id">
                    School ID
                  </label>
                  <input
                    className="UpdateInput"
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <Flex direction="row" gap="3">
                  <fieldset className="Fieldset">
                    <label className="Label" htmlFor="firstName">
                      FirstName
                    </label>
                    <input
                      className="UpdateInput"
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
                      className="UpdateInput"
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
                      className="UpdateInput"
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
                      className="UpdateInput"
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
                      className="UpdateInput"
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
                      value={formData.gender}
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
                          <Select.Item
                            className="SelectItem"
                            value="NON_BINARY"
                          >
                            Non-Binary
                          </Select.Item>
                          <Select.Item className="SelectItem" value="AGENDER">
                            Agender
                          </Select.Item>
                          <Select.Item
                            className="SelectItem"
                            value="GENDERFLUID"
                          >
                            Gender Fluid
                          </Select.Item>
                          <Select.Item className="SelectItem" value="BIGENDER">
                            Bigender
                          </Select.Item>
                          <Select.Item
                            className="SelectItem"
                            value="ANDROGYNOUS"
                          >
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
                <p className="Text">Logins</p>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="UpdateInput"
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
                    className="UpdateInput"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    type="password"
                  />
                </fieldset>
              </Card>
            </Flex>

            <div className="flex mt-20 justify-end">
              <button className="Button blue" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
}
