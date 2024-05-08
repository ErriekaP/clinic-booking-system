"use client";
import AfterQueueDialogue from "@/components/afterModal/afterQueueModal";
import QueuePhysicalExamDialog from "@/components/afterModal/QueuePhysicalExam";
import BackNavbar from "@/components/backNavbar/backNavbar";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
//appointments under his number
const Page = () => {
  const router = useRouter();
  //   const { id } = 1;
  const [appointments, setAppointments] = useState<any[]>([]);
  const [physicalExam, setPhysicalExam] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [appointment, setAppointment] = useState<any[]>([]);

  useEffect(() => {
    // Fetch after queue data from an API
    const fetchAfterQueue = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch after queue");
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching after queue:", error);
      }
    };

    fetchAfterQueue();
  }, []);

  useEffect(() => {
    // Fetch after queue data from an API
    const fetchAfterAppointment = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/afterAppointment/${appointments[0]?.patientID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch after appointment");
        }
        const data = await response.json();
        setAppointment(data);
      } catch (error) {
        console.error("Error fetching after appointment:", error);
      }
    };

    if (appointments.length > 0) {
      fetchAfterAppointment();
    }
  }, [appointments]);

  console.log("app", appointment);

  useEffect(() => {
    // Fetch physical exam data from an API
    const fetchPhysicalExam = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/afterQueue/physicalExam/${appointments[0]?.patientID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch after queue");
        }
        const data = await response.json();
        setPhysicalExam(data);
      } catch (error) {
        console.error("Error fetching after queue:", error);
      }
    };

    if (appointments.length > 0) {
      fetchPhysicalExam();
    }
  }, [appointments]);

  console.log("physical", physicalExam);

  const handleClick = (queue: any) => {
    // afterqueues
    console.log("Clicked queue:", queue.afterQueue?.diagnosis);

    setIsDialogOpen(true);

    //router.push(`/personnel/doctor/queues/afterqueues/${queue.id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // Implement search functionality (if needed)
  };

  const filteredAppointment = appointments.filter(
    (appointment) =>
      appointment.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.patient.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.patient.lastName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.service.serviceName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const filteredPhysicalExam = physicalExam.filter((pe) =>
    pe.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
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

  return (
    <div>
      {" "}
      <BackNavbar />
      <div className="flex flex-col h-screen items-center">
        <div className="block relative max-w-sm mb-4">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current text-gray-500"
            >
              <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
            </svg>
          </span>
          <input
            placeholder="Search"
            className="appearance-none rounded-md border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex flex-col flex-grow w-full max-w-7xl">
          <div className="overflow-x-auto">
            {/* Display the main appointments table */}
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="table-fixed bg-white min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase ">
                      Appointment ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      Service
                    </th>

                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      Patient Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase ">
                      Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase ">
                      Time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      Details
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      After Appointment
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      Physical Exam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointment.map((appointment, index) => (
                    <tr
                      key={appointment.id}
                      onClick={() => handleClick(appointment)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {appointment.id}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {appointment.service.serviceName}
                      </td>

                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {" "}
                        {appointment.patient.firstName}{" "}
                        {appointment.patient.lastName}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {formatDate(appointment.startTime)}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {formatTime(appointment.startTime)} -{" "}
                        {formatTime(appointment.endTime)}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {appointment.details}
                      </td>

                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {appointment.status}
                      </td>

                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        <AfterQueueDialogue
                          type="appointment"
                          appointmentID={appointment.id}
                          purpose={appointment.afterAppointmentID?.purpose}
                          genSurvey={appointment.afterAppointmentID?.genSurvey}
                          bloodPressure={
                            appointment.afterAppointmentID?.bloodPressure
                          }
                          pulseRate={appointment.afterAppointmentID?.pulseRate}
                          respRate={appointment.afterAppointmentID?.respRate}
                          bodyTemp={appointment.afterAppointmentID?.bodyTemp}
                          LMP={appointment.afterAppointmentID?.LMP}
                          menstruation={
                            appointment.afterAppointmentID?.menstruation
                          }
                          hypertension={
                            appointment.afterAppointmentID?.hypertension
                          }
                          bronchialAsthma={
                            appointment.afterAppointmentID?.bronchialAsthma
                          }
                          heartDisease={
                            appointment.afterAppointmentID?.heartDisease
                          }
                          chestPain={appointment.afterAppointmentID?.chestPain}
                          seizureDisorder={
                            appointment.afterAppointmentID?.seizureDisorder
                          }
                          others={appointment.afterAppointmentID?.others}
                          LOC={appointment.afterAppointmentID?.LOC}
                          injuries={appointment.afterAppointmentID?.injuries}
                          diagnosis={appointment.afterAppointmentID?.diagnosis}
                          medicineName={appointment.medication?.medicineName}
                          medicineStrength={
                            appointment.medication?.medicineStrength
                          }
                          medicineQuantity={
                            appointment.medication?.medicineQuantity
                          }
                          medicineFrequency={
                            appointment.medication?.medicineFrequency
                          }
                          remarks={appointment.medication?.remarks}
                        />
                      </td>

                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        <QueuePhysicalExamDialog
                          queueID={appointment.physicalExamID?.queueID}
                          purpose={appointment.physicalExamID?.purpose}
                          genSurvey={appointment.physicalExamID?.genSurvey}
                          bloodPressure={
                            appointment.physicalExamID?.bloodPressure
                          }
                          pulseRate={appointment.physicalExamID?.pulseRate}
                          respRate={appointment.physicalExamID?.respRate}
                          bodyTemp={appointment.physicalExamID?.bodyTemp}
                          LMP={appointment.physicalExamID?.LMP}
                          menstruation={
                            appointment.physicalExamID?.menstruation
                          }
                          hypertension={
                            appointment.physicalExamID?.hypertension
                          }
                          bronchialAsthma={
                            appointment.physicalExamID?.bronchialAsthma
                          }
                          heartDisease={
                            appointment.physicalExamID?.heartDisease
                          }
                          chestPain={appointment.physicalExamID?.chestPain}
                          seizureDisorder={
                            appointment.physicalExamID?.seizureDisorder
                          }
                          others={appointment.physicalExamID?.others}
                          LOC={appointment.physicalExamID?.LOC}
                          injuries={appointment.physicalExamID?.injuries}
                          skin={appointment.physicalExamID?.skin}
                          head={appointment.physicalExamID?.head}
                          eyes={appointment.physicalExamID?.eyes}
                          ears={appointment.physicalExamID?.ears}
                          neck={appointment.physicalExamID?.neck}
                          throat={appointment.physicalExamID?.throat}
                          chestAndLungs={
                            appointment.physicalExamID?.chestAndLungs
                          }
                          heart={appointment.physicalExamID?.heart}
                          abdomen={appointment.physicalExamID?.abdomen}
                          gut={appointment.physicalExamID?.gut}
                          masculoSkeletal={
                            appointment.physicalExamID?.masculoSkeletal
                          }
                          neurological={
                            appointment.physicalExamID?.neurological
                          }
                          CBC={appointment.physicalExamID?.CBC}
                          urinalysis={appointment.physicalExamID?.urinalysis}
                          fecalysis={appointment.physicalExamID?.fecalysis}
                          chestXray={appointment.physicalExamID?.chestXray}
                          ECG={appointment.physicalExamID?.ECG}
                          HBSAG={appointment.physicalExamID?.HBSAG}
                          drugTest={appointment.physicalExamID?.drugTest}
                          isPhysicallyFit={
                            appointment.physicalExamID?.isPhysicallyFit
                          }
                          clinicAssessment={
                            appointment.physicalExamID?.clinicAssessment
                          }
                          forClearance={
                            appointment.physicalExamID?.forClearance
                          }
                          forLaboratory={
                            appointment.physicalExamID?.forLaboratory
                          }
                          forOthers={appointment.physicalExamID?.forOthers}
                          finalAssessment={
                            appointment.physicalExamID?.finalAssessment
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
