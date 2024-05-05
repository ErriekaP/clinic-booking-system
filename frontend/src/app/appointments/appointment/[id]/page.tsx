"use client";
import BackNavbar from "@/components/backNavbar/backNavbar";
import QueuePhysicalExamDialog from "@/components/afterModal/QueuePhysicalExam";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QueuePhysicalExamDialogue from "@/components/afterModal/QueuePhysicalExam";
import AfterAppointmentDialogue from "@/components/afterModal/afterAppointmentModal";

interface Appointment {
  id: string;
  details: string;
  startTime: string;
  endTime: string;
  status: string;
  reasonforCancellation: string;
  service: ServiceInfo;
  personnel: PersonnelInfo;
  patient: PatientInfo;
  afterAppointment?: AfterAppointmentInfo;
  medication?: MedicationInfo;
}

interface AfterAppointmentInfo {
  diagnosis: String;
  // Add other properties as needed
}

interface MedicationInfo {
  medicineName: String;
  medicineStrength: String;
  medicineQuantity: String;
  medicineFrequency: String;
  remarks: String;
  // Add other properties as needed
}
interface ServiceInfo {
  serviceName: String;
  description: String;
}

interface PersonnelInfo {
  firstName: string;
  lastName: string;
}

interface PatientInfo {
  id: number;
  firstName: string;
  lastName: string;
}

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [physicalExam, setPhysicalExam] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false); // State to manage dialog visibility

  // Function to toggle dialog state
  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch appointment");
        }
        const data = await response.json();
        setAppointment(data); // Assuming the fetched data matches Appointment interface
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  useEffect(() => {
    // Fetch physical exam data from an API
    const fetchPhysicalExam = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/afterAppointment/physicalExam/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch after queue");
        }
        const data = await response.json();
        const res = data.physicalExam;
        setPhysicalExam(data);
      } catch (error) {
        console.error("Error fetching after queue:", error);
      }
    };

    fetchPhysicalExam();
  }, []);

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
  const handleClick = (appointment: Appointment) => {
    if (
      appointment.status !== "COMPLETE" &&
      appointment.status !== "CANCELLEDBYSTUDENT" &&
      appointment.status !== "CANCELLEDBYDOCTOR"
    ) {
      router.push(`/appointments/update/${appointment.id}`);
    }
  };

  return (
    <div>
      <BackNavbar />

      <div className="flex flex-col h-screen items-center">
        {/* Appointment details section */}
        <div className="max-w-4xl my-8 px-4">
          <h1 className="text-3xl font-bold mb-6 text-white">
            Appointment Details
          </h1>

          {appointment && (
            <div className=" bg-gray-100 p-4 rounded-lg flex justify-center">
              <div className="flex flex-col items-center mr-2">
                <p className="text-md text-black font-bold">
                  {formatDate(appointment.startTime)}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-md text-black font-bold">
                  {formatTime(appointment.startTime)} -{" "}
                  {formatTime(appointment.endTime)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Appointment table section */}
        <div className="flex w-full max-w-4xl items-center flex-col">
          <div className="justify-between items-center row-2  ">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="table-fixed bg-white min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                        Appointment ID
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                        School ID
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                        Patient Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                        Service Name
                      </th>

                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                        Doctor
                      </th>
                      {appointment &&
                        (appointment.status === "CANCELLEDBYDOCTOR" ||
                          appointment.status === "CANCELLEDBYSTUDENT" ||
                          appointment.status === "REQUESTTOCANCELBYSTUDENT" ||
                          appointment.status === "REQUESTTOCANCELBYDOCTOR") && (
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                            Reason for Cancellation
                          </th>
                        )}
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                        Diagnosis
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                        Physical Exam
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointment ? (
                      <tr
                        key={appointment.id}
                        onClick={() => handleClick(appointment)}
                        className={`hover:cursor-pointer
                      }`}
                      >
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                          {appointment.id}
                        </td>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                          {appointment.patient.id}
                        </td>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                          {appointment.patient.firstName}{" "}
                          {appointment.patient.lastName}
                        </td>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                          {appointment.service.serviceName}
                        </td>

                        <td className="py-4 px-6">
                          {appointment.personnel &&
                          appointment.personnel.firstName !== null
                            ? `${appointment.personnel.firstName} ${appointment.personnel.lastName}`
                            : "null"}
                        </td>
                        {appointment &&
                          (appointment.status === "CANCELLEDBYDOCTOR" ||
                            appointment.status === "CANCELLEDBYSTUDENT" ||
                            appointment.status === "REQUESTTOCANCELBYSTUDENT" ||
                            appointment.status ===
                              "REQUESTTOCANCELBYDOCTOR") && (
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                              {appointment.reasonforCancellation}
                            </td>
                          )}
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                          {appointment.status}
                        </td>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                          <AfterAppointmentDialogue
                            diagnosis={
                              appointment.afterAppointment?.diagnosis || ""
                            }
                            medicineName={
                              appointment.medication?.medicineName || ""
                            }
                            medicineStrength={
                              appointment.medication?.medicineStrength || ""
                            }
                            medicineQuantity={
                              appointment.medication?.medicineQuantity || ""
                            }
                            medicineFrequency={
                              appointment.medication?.medicineFrequency || ""
                            }
                            remarks={appointment.medication?.remarks || ""}
                          />
                        </td>

                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                          {physicalExam.map((exam: any, index: number) => (
                            <QueuePhysicalExamDialog
                              key={index}
                              queueID={exam.physicalExam?.queueID}
                              purpose={exam.physicalExam?.purpose}
                              genSurvey={exam.physicalExam?.genSurvey}
                              bloodPressure={exam.physicalExam?.bloodPressure}
                              pulseRate={exam.physicalExam?.pulseRate}
                              respRate={exam.physicalExam?.respRate}
                              bodyTemp={exam.physicalExam?.bodyTemp}
                              LMP={exam.physicalExam?.LMP}
                              menstruation={exam.physicalExam?.menstruation}
                              hypertension={exam.physicalExam?.hypertension}
                              bronchialAsthma={
                                exam.physicalExam?.bronchialAsthma
                              }
                              heartDisease={exam.physicalExam?.heartDisease}
                              chestPain={exam.physicalExam?.chestPain}
                              seizureDisorder={
                                exam.physicalExam?.seizureDisorder
                              }
                              others={exam.physicalExam?.others}
                              LOC={exam.physicalExam?.LOC}
                              injuries={exam.physicalExam?.injuries}
                              skin={exam.physicalExam?.skin}
                              head={exam.physicalExam?.head}
                              eyes={exam.physicalExam?.eyes}
                              ears={exam.physicalExam?.ears}
                              neck={exam.physicalExam?.neck}
                              throat={exam.physicalExam?.throat}
                              chestAndLungs={exam.physicalExam?.chestAndLungs}
                              heart={exam.physicalExam?.heart}
                              abdomen={exam.physicalExam?.abdomen}
                              gut={exam.physicalExam?.gut}
                              masculoSkeletal={
                                exam.physicalExam?.masculoSkeletal
                              }
                              neurological={exam.physicalExam?.neurological}
                              CBC={exam.physicalExam?.CBC}
                              urinalysis={exam.physicalExam?.urinalysis}
                              fecalysis={exam.physicalExam?.fecalysis}
                              chestXray={exam.physicalExam?.chestXray}
                              ECG={exam.physicalExam?.ECG}
                              HBSAG={exam.physicalExam?.HBSAG}
                              drugTest={exam.physicalExam?.drugTest}
                              isPhysicallyFit={
                                exam.physicalExam?.isPhysicallyFit
                              }
                              clinicAssessment={
                                exam.physicalExam?.clinicAssessment
                              }
                              forClearance={exam.physicalExam?.forClearance}
                              forLaboratory={exam.physicalExam?.forLaboratory}
                              forOthers={exam.physicalExam?.forOthers}
                              finalAssessment={
                                exam.physicalExam?.finalAssessment
                              }
                            />
                          ))}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                          No appointment details available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
