"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Flex,
  Inset,
  Strong,
  Table,
  Text,
} from "@radix-ui/themes";
import Navbar from "@/components/navbar/page";
import "./styles.css";
import dayjs from "dayjs";

interface Queue {
  id: number;
  queueID: number;
}

const Page = ({ params }: { params: { id: string } }) => {
  const [personnelData, setPersonnelData] = useState<any>(null);
  const [queueOngoingData, setQueueOngoingData] = useState<Queue[]>([]);

  useEffect(() => {
    const getPatientData = async (id: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/personnel/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }
        const data = await response.json();
        setPersonnelData(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    getPatientData(params.id);
  }, [params.id]);

  useEffect(() => {
    const getQueueData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/queue/allOngoing`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch queue data");
        }
        const data = await response.json();
        setQueueOngoingData(data);
      } catch (error) {
        console.error("Error fetching queue data:", error);
      }
    };

    getQueueData();
  }, []);

  if (!personnelData) {
    return null;
  }
  console.log(personnelData);
  return (
    <main>
      <Navbar />
      <Container className="flex min-h-screen flex-col items-center justify-between p-4 ">
        <Flex className="TableContainer">
          <Table.Root className="TableRoot">
            <Table.Body className="TableBody">
              <Table.Row className="TableRow">
                <Table.RowHeaderCell className="TableRowHeaderCell">
                  School ID:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {personnelData.data.id}
                </Table.Cell>

                <Table.RowHeaderCell className="TableRowHeaderCell">
                  Email:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {personnelData.data.email}
                </Table.Cell>

                <Table.RowHeaderCell className="TableRowHeaderCell">
                  Role:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {personnelData.data.role}
                </Table.Cell>

                <Table.RowHeaderCell className="TableRowHeaderCell">
                  Specialty:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {personnelData.data.specialty}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.RowHeaderCell className="TableRowHeaderCell">
                  Name:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {personnelData.data.lastName}, {personnelData.data.firstName}{" "}
                  {personnelData.data.middleName}
                </Table.Cell>

                <Table.RowHeaderCell className="TableRowHeaderCell">
                  Contact No.:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {personnelData.data.phoneNumber}
                </Table.Cell>

                <Table.RowHeaderCell className="TableRowHeaderCell">
                  Date of Birth:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {dayjs(personnelData.data.dateOfBirth).format("MM/DD/YYYY")}
                </Table.Cell>

                <Table.RowHeaderCell className="TableRowHeaderCell">
                  Gender:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {personnelData.data.gender}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Flex>

        <div className="flex items-center justify-center mt-10 text-white">
          <div className=" text-center ">
            <p className="text-lg font-bold">Current Queue Numbers:</p>
            {queueOngoingData.map((queue) => (
              <h1 className="text-9xl font-bold ml-2">{queue.queueID}</h1>
            ))}
          </div>
        </div>
        {/* <Flex className="CardContainer">
          <Card className="Card">
            <a href="">
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
                  className="Image"
                />
              </Inset>
              <Text as="p" align="center" className="Text">
                <Strong>Schedule</Strong>
              </Text>
            </a>
          </Card>
          <Card className="Card">
            <a href={`/personnel/doctor/appointments/${personnelData.data.id}`}>
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
                  className="Image"
                />
              </Inset>
              <Text as="p" align="center" className="Text">
                <Strong>Appointments</Strong>
              </Text>
            </a>
          </Card>
          <Card className="Card">
            <a href="/">
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
                  className="Image"
                />
              </Inset>
              <Text as="p" align="center" className="Text">
                Services
              </Text>
            </a>
          </Card>
        </Flex> */}
      </Container>
    </main>
  );
};

export default Page;
