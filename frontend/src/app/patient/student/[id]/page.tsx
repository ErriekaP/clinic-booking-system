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

const StudentPage = ({ params }: { params: { id: string } }) => {
  const [patientData, setPatientData] = useState<any>(null);

  useEffect(() => {
    const getPatientData = async (id: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/patients/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    getPatientData(params.id);
  }, [params.id]);

  if (!patientData) {
    return null;
  }

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
                  {patientData.schoolID}
                </Table.Cell>

                <Table.RowHeaderCell className="TableRowHeaderCell">
                  Course:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {patientData.course}
                </Table.Cell>

                <Table.RowHeaderCell className="TableRowHeaderCell">
                  Department:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {patientData.department}
                </Table.Cell>

                <Table.RowHeaderCell className="TableRowHeaderCell">
                  Section:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {patientData.section}
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.RowHeaderCell className="TableRowHeaderCell">
                  Name:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {patientData.lastName}, {patientData.firstName}{" "}
                  {patientData.middleName}
                </Table.Cell>

                <Table.RowHeaderCell className="TableRowHeaderCell">
                  Contact No.:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {patientData.contactNumber}
                </Table.Cell>

                <Table.RowHeaderCell className="TableRowHeaderCell">
                  Date of Birth:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {patientData.dateOfBirth}
                </Table.Cell>

                <Table.RowHeaderCell className="TableRowHeaderCell">
                  Gender:
                </Table.RowHeaderCell>
                <Table.Cell className="TableCell">
                  {patientData.gender}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Flex>
        <Flex className="CardContainer">
          <Card className="Card">
            <a href="/services">
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
                  className="Image"
                />
              </Inset>
              <Text as="p" align="center" className="Text">
                <Strong>Services</Strong>
              </Text>
            </a>
          </Card>
          <Card className="Card">
            <a href="/appointments">
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
                Queue
              </Text>
            </a>
          </Card>
        </Flex>
      </Container>
    </main>
  );
};

export default StudentPage;
