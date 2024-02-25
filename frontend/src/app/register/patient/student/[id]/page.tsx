"use client";
import "./styles.css";
import { Card, Container, Flex, Heading, Select, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    schoolID: "",
    supabaseUserID: "",
    firstName: "",
    middleName: "",
    lastName: "",
    address: {
      city: "",
      province: "",
      zipCode: "",
      houseNo: "",
      street: "",
      barangay: "",
      subdivision: "",
    },
    patientType: "STUDENT",
    course: "",
    section: "",
    cluster: "",
    department: "",
    occupation: "",
    facultyDepartment: "",
    contactNumber: "",
    dateOfBirth: "2020-03-20",
    gender: "MALE",
    bloodType: "O",
    emergencyContact: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      relation: "",
      healthInsuranceCompany: "",
      emergencyHospital: "",
    },
    familyPhysician: {
      firstName: "",
      lastName: "",
      contactNumber: "",
    },
    medicalHistory: {
      famHistory: "",
      childhoodDiseases: "",
      medicalCondition: "",
      hospitalization: "",
      medication: "",
      allergies: "",
      vaccines: "",
      psychosocialHistory: "",
      sexualHistory: "",
    },
    status: "ACTIVE",
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/patients/addpatients/${id}`,
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
        const patient = await response.json();
        console.log(patient.data.id);
        console.log("patientType:", patient.data.patientType);
        if (patient.data.patientType === "STUDENT") {
          router.push(`/patient/student/${patient.data.id}`);
        } else if (patient.data.patientType === "EMPLOYEE") {
          router.push(`/patient/employee/${patient.data.id}`);
        } else {
          router.push("/default");
        }
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name.split(".")[1]]: value,
        },
      }));
    } else if (name.startsWith("emergencyContact.")) {
      setFormData((prevState) => ({
        ...prevState,
        emergencyContact: {
          ...prevState.emergencyContact,
          [name.split(".")[1]]: value,
        },
      }));
    } else if (name.startsWith("familyPhysician.")) {
      setFormData((prevState) => ({
        ...prevState,
        familyPhysician: {
          ...prevState.familyPhysician,
          [name.split(".")[1]]: value,
        },
      }));
    } else if (name.startsWith("medicalHistory.")) {
      setFormData((prevState) => ({
        ...prevState,
        medicalHistory: {
          ...prevState.medicalHistory,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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
              <Text>Info</Text>
            </Heading>
          </Flex>
          <Flex>
            <Card className="CardsContent">
              <p className="Text">Basic Details</p>

              <fieldset className="Fieldset">
                <label className="Label" htmlFor="schoolID">
                  School ID
                </label>
                <input
                  className="Input"
                  id="schoolID"
                  name="schoolID"
                  value={formData.schoolID}
                  onChange={handleInputChange}
                />
              </fieldset>

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
                  <label className="Label" htmlFor="course">
                    Course
                  </label>
                  <input
                    className="Input"
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="section">
                    Section
                  </label>
                  <input
                    className="Input"
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="cluster">
                    Cluster
                  </label>
                  <input
                    className="Input"
                    id="cluster"
                    name="cluster"
                    value={formData.cluster}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="department">
                    Department
                  </label>
                  <input
                    className="Input"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </Flex>

              <Flex direction="row" gap="3">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="contactNumber">
                    Contact Number
                  </label>
                  <input
                    className="Input"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
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

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="bloodtype">
                    Blood Type
                  </label>

                  <Select.Root
                    name="bloodType"
                    onValueChange={(newValue) =>
                      handleSelectChange(newValue, "bloodType")
                    }
                  >
                    <Select.Trigger className="SelectTrigger" />
                    <Select.Content className="SelectContent">
                      <Select.Group>
                        <Select.Label className="SelectLabel">
                          Blood Type
                        </Select.Label>
                        <Select.Item className="SelectItem" value="O">
                          O
                        </Select.Item>
                        <Select.Item className="SelectItem" value="A">
                          A
                        </Select.Item>
                        <Select.Item className="SelectItem" value="B">
                          B
                        </Select.Item>
                        <Select.Item className="SelectItem" value="AB">
                          AB
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
              <p className="Text">Address</p>
              <Flex direction="row" gap="3">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="houseNo">
                    House No.
                  </label>
                  <input
                    className="Input"
                    id="houseNo"
                    name="address.houseNo"
                    value={formData.address.houseNo}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="subdivision">
                    Subdivision
                  </label>
                  <input
                    className="Input"
                    id="subdivision"
                    name="address.subdivision"
                    value={formData.address.subdivision}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="street">
                    Street
                  </label>
                  <input
                    className="Input"
                    id="street"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </Flex>

              <Flex direction="row" gap="3">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="barangay">
                    Barangay
                  </label>
                  <input
                    className="Input"
                    id="barangay"
                    name="address.barangay"
                    value={formData.address.barangay}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="city">
                    City
                  </label>
                  <input
                    className="Input"
                    id="city"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="province">
                    Province
                  </label>
                  <input
                    className="Input"
                    id="province"
                    name="address.province"
                    value={formData.address.province}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="zipcode">
                    Zipcode
                  </label>
                  <input
                    className="Input"
                    id="zipcode"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </Flex>
            </Card>
          </Flex>

          <Flex>
            <Card className="CardsContent">
              <p className="Text">Emergency Contact</p>

              <Flex direction="row" gap="3">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="ecFirstname">
                    FirstName
                  </label>
                  <input
                    className="Input"
                    id="ecFirstname"
                    name="emergencyContact.firstName"
                    value={formData.emergencyContact.firstName}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="ecLastname">
                    LastName
                  </label>
                  <input
                    className="Input"
                    id="ecLastname"
                    name="emergencyContact.lastName"
                    value={formData.emergencyContact.lastName}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="ecContactno">
                    Contact Number
                  </label>
                  <input
                    className="Input"
                    id="ecContactno"
                    name="emergencyContact.contactNumber"
                    value={formData.emergencyContact.contactNumber}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </Flex>

              <Flex direction="row" gap="3">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="relation">
                    Relation
                  </label>
                  <input
                    className="Input"
                    id="relation"
                    name="emergencyContact.relation"
                    value={formData.emergencyContact.relation}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="healthinsurance">
                    Health Insurance Company
                  </label>
                  <input
                    className="Input"
                    id="healthinsurance"
                    name="emergencyContact.healthInsuranceCompany"
                    value={formData.emergencyContact.healthInsuranceCompany}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="emergencyhosp">
                    Emergency Hospital
                  </label>
                  <input
                    className="Input"
                    id="emergencyhosp"
                    name="emergencyContact.emergencyHospital"
                    value={formData.emergencyContact.emergencyHospital}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </Flex>
            </Card>
          </Flex>

          <Flex>
            <Card className="CardsContent">
              <p className="Text">Family Physician</p>

              <Flex direction="row" gap="3">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="fpFirstname">
                    FirstName
                  </label>
                  <input
                    className="Input"
                    id="fpFirstname"
                    name="familyPhysician.firstName"
                    value={formData.familyPhysician.firstName}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="fpLastname">
                    LastName
                  </label>
                  <input
                    className="Input"
                    id="fpLastname"
                    name="familyPhysician.lastName"
                    value={formData.familyPhysician.lastName}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="fpContactno">
                    Contact Number
                  </label>
                  <input
                    className="Input"
                    id="fpContactno"
                    name="familyPhysician.contactNumber"
                    value={formData.familyPhysician.contactNumber}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </Flex>
            </Card>
          </Flex>

          <Flex>
            <Card className="CardsContent">
              <p className="Text">Medical History</p>

              <Flex direction="row" gap="3">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="famHistory">
                    Family History
                  </label>
                  <input
                    className="Input"
                    id="famHistory"
                    name="medicalHistory.famHistory"
                    value={formData.medicalHistory.famHistory}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="childhoodDiseases">
                    Childhood Diseases
                  </label>
                  <input
                    className="Input"
                    id="childhoodDiseases"
                    name="medicalHistory.childhoodDiseases"
                    value={formData.medicalHistory.childhoodDiseases}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="medicalCondition">
                    Medical Condition
                  </label>
                  <input
                    className="Input"
                    id="medicalCondition"
                    name="medicalHistory.medicalCondition"
                    value={formData.medicalHistory.medicalCondition}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </Flex>

              <Flex direction="row" gap="3">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="hospitalization">
                    Hospitalization
                  </label>
                  <input
                    className="Input"
                    id="hospitalization"
                    name="medicalHistory.hospitalization"
                    value={formData.medicalHistory.hospitalization}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="medication">
                    Medication
                  </label>
                  <input
                    className="Input"
                    id="medication"
                    name="medicalHistory.medication"
                    value={formData.medicalHistory.medication}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="allergies">
                    Allergies
                  </label>
                  <input
                    className="Input"
                    id="allergies"
                    name="medicalHistory.allergies"
                    value={formData.medicalHistory.allergies}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </Flex>

              <Flex direction="row" gap="3">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="vaccines">
                    Vaccines
                  </label>
                  <input
                    className="Input"
                    id="vaccines"
                    name="medicalHistory.vaccines"
                    value={formData.medicalHistory.vaccines}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="psychosocialHistory">
                    Psychosocial History
                  </label>
                  <input
                    className="Input"
                    id="psychosocialHistory"
                    name="medicalHistory.psychosocialHistory"
                    value={formData.medicalHistory.psychosocialHistory}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="sexualHistory">
                    SexualHistory
                  </label>
                  <input
                    className="Input"
                    id="sexualHistory"
                    name="medicalHistory.sexualHistory"
                    value={formData.medicalHistory.sexualHistory}
                    onChange={handleInputChange}
                  />
                </fieldset>
              </Flex>
            </Card>
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
