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
import dayjs from "dayjs";
//import "./styles.css";
interface Queue {
  id: number;
  queueID: number;
}

const EmployeePage = ({ params }: { params: { id: string } }) => {
  const [patientData, setPatientData] = useState<any>(null);
  const [queueOngoingData, setQueueOngoingData] = useState<Queue[]>([]);
  const [queueData, setQueueData] = useState<Queue[]>([]);

  useEffect(() => {
    const getQueueData = async (id: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/queue/ongoing/patient/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch queue data");
        }
        const data = await response.json();
        setQueueData(data);
      } catch (error) {
        console.error("Error fetching queue data:", error);
      }
    };

    getQueueData(params.id);
  }, [params.id]);

  console.log("yes", queueData);

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
        dayjs(patientData.dateOfBirth).format("DD/MM/YYYY");
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
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-between p-4">
          <Flex className="flex justify-center m-5">
            <Table.Root className="TableRoot">
              <Table.Body className="border-2">
                {/* Table Row for displaying patient information */}
                <Table.Row className="border-b-2">
                  {/* School ID */}
                  <Table.RowHeaderCell className="p-8 text-center font-medium text-white">
                    Faculty ID:
                  </Table.RowHeaderCell>
                  <Table.Cell className="border-r-2 p-8 text-center text-white align-middle">
                    {patientData.schoolID}
                  </Table.Cell>

                  {/* Course */}
                  <Table.RowHeaderCell className="p-8 text-center font-medium text-white">
                    Occupation:
                  </Table.RowHeaderCell>
                  <Table.Cell className="border-r-2 p-8 text-center text-white align-middle">
                    {patientData.occupation}
                  </Table.Cell>

                  {/* Department */}
                  <Table.RowHeaderCell className="p-8 text-center font-medium text-white">
                    Faculty Department:
                  </Table.RowHeaderCell>
                  <Table.Cell className="border-r-2 p-8 text-center text-white align-middle">
                    {patientData.facultyDepartment}
                  </Table.Cell>

                  {/* Section */}
                  <Table.RowHeaderCell className="p-8 text-center font-medium text-white">
                    Section:
                  </Table.RowHeaderCell>
                  <Table.Cell className="border-r-2 p-8 text-center text-white align-middle">
                    {patientData.section}
                  </Table.Cell>
                </Table.Row>

                {/* Additional Table Row for displaying other patient details */}
                <Table.Row>
                  {/* Name */}
                  <Table.RowHeaderCell className="p-8 text-center font-medium text-white">
                    Name:
                  </Table.RowHeaderCell>
                  <Table.Cell className="border-r-2 p-8 text-center text-white align-middle">
                    {patientData.lastName}, {patientData.firstName}{" "}
                    {patientData.middleName}
                  </Table.Cell>

                  {/* Contact Number */}
                  <Table.RowHeaderCell className="p-8 text-center font-medium text-white">
                    Contact No.:
                  </Table.RowHeaderCell>
                  <Table.Cell className="border-r-2 p-8 text-center text-white align-middle">
                    {patientData.contactNumber}
                  </Table.Cell>

                  {/* Date of Birth */}
                  <Table.RowHeaderCell className="p-8 text-center font-medium text-white">
                    Date of Birth:
                  </Table.RowHeaderCell>
                  <Table.Cell className="border-r-2 p-8 text-center text-white align-middle">
                    {dayjs(patientData.dateOfBirth).format("MM/DD/YYYY")}
                  </Table.Cell>

                  {/* Gender */}
                  <Table.RowHeaderCell className="p-8 text-center font-medium text-white">
                    Gender:
                  </Table.RowHeaderCell>
                  <Table.Cell className="border-r-2 p-8 text-center text-white align-middle">
                    {patientData.gender}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Flex>

          {/* Display Queue Number */}

          <div className="flex text-white">
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg font-bold">Your Queue Number:</p>
              <div className="flex flex-col justify-center">
                {queueData.map((queue) => (
                  <h1 className="text-5xl font-bold ml-2">{queue.queueID}</h1>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-10 text-white">
            <div className=" text-center ">
              <p className="text-lg font-bold">Current Queue Numbers:</p>
              {queueOngoingData.map((queue) => (
                <h1 className="text-9xl font-bold ml-2">{queue.queueID}</h1>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
