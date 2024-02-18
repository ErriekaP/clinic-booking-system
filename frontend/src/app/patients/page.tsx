"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import "./styles.css";
import { Container, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { SetStateAction, useEffect, useState } from "react";

export default function Page() {
  interface Patient {
    id: number;
    firstName: string;
    lastName: string;
  }

  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/patients`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []); // Fetch patients on component mount

  // Function to handle search query change
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  // Filter patients based on search query
  const filteredPatients = patients.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 ">
        <Container>
          <Flex>
            <TextField.Root>
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
              <TextField.Input
                placeholder="Search the docs…"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </TextField.Root>
          </Flex>
          <Flex
            display="flex"
            direction="column"
            align="center"
            justify="center"
          >
            <Heading>
              <Text style={{ color: "white" }}>View Patients</Text>
            </Heading>
            {filteredPatients.map((patient) => (
              <div key={patient.id}>
                {patient.id} {patient.firstName} {patient.lastName}{" "}
              </div>
            ))}
          </Flex>
        </Container>
      </main>
    </>
  );
}
