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
  const [queues, setQueues] = useState<any[]>([]);
  const [physicalExam, setPhysicalExam] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [queue, setQueue] = useState<any[]>([]);

  useEffect(() => {
    // Fetch after queue data from an API
    const fetchAfterQueue = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/queue`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch after queue");
        }
        const data = await response.json();
        setQueues(data);
      } catch (error) {
        console.error("Error fetching after queue:", error);
      }
    };

    fetchAfterQueue();
  }, []);

  useEffect(() => {
    // Fetch after queue data from an API
    const fetchAfterQueue = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/queue/afterQueue/${queues[0]?.patientID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch after queue");
        }
        const data = await response.json();
        setQueue(data);
      } catch (error) {
        console.error("Error fetching after queue:", error);
      }
    };

    if (queues.length > 0) {
      fetchAfterQueue();
    }
  }, [queues]);

  console.log("queue", queues);

  useEffect(() => {
    // Fetch physical exam data from an API
    const fetchPhysicalExam = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/afterQueue/physicalExam/${queues[0]?.patientID}`
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

    if (queues.length > 0) {
      fetchPhysicalExam();
    }
  }, [queues]);

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

  const filteredQueue = queues.filter(
    (queue) =>
      queue.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      queue.patient.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      queue.patient.lastName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      queue.queueID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      queue.service.serviceName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const filteredPhysicalExam = physicalExam.filter((pe) =>
    pe.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="flex flex-col flex-grow w-full max-w-4xl">
          <div className="overflow-x-auto">
            {/* Display the main appointments table */}
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="table-fixed bg-white min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase ">
                      Queue ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      Queue Name
                    </th>

                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      Patient Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      Service
                    </th>

                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      After Queue
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-bold uppercase">
                      Physical Exam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQueue.map((queue, index) => (
                    <tr
                      key={queue.id}
                      onClick={() => handleClick(queue)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {queue.id}
                      </td>
                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {queue.queueID}
                      </td>

                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {" "}
                        {queue.patient.firstName} {queue.patient.lastName}
                      </td>

                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {queue.service.serviceName}
                      </td>

                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        {queue.status}
                      </td>

                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        <AfterQueueDialogue
                          type="queue"
                          queueID={queue.afterQueueID?.queueID}
                          purpose={queue.afterQueueID?.purpose}
                          genSurvey={queue.afterQueueID?.genSurvey}
                          bloodPressure={queue.afterQueueID?.bloodPressure}
                          pulseRate={queue.afterQueueID?.pulseRate}
                          respRate={queue.afterQueueID?.respRate}
                          bodyTemp={queue.afterQueueID?.bodyTemp}
                          LMP={queue.afterQueueID?.LMP}
                          menstruation={queue.afterQueueID?.menstruation}
                          hypertension={queue.afterQueueID?.hypertension}
                          bronchialAsthma={queue.afterQueueID?.bronchialAsthma}
                          heartDisease={queue.afterQueueID?.heartDisease}
                          chestPain={queue.afterQueueID?.chestPain}
                          seizureDisorder={queue.afterQueueID?.seizureDisorder}
                          others={queue.afterQueueID?.others}
                          LOC={queue.afterQueueID?.LOC}
                          injuries={queue.afterQueueID?.injuries}
                          diagnosis={queue.afterQueueID?.diagnosis}
                          medicineName={queue.medication?.medicineName}
                          medicineStrength={queue.medication?.medicineStrength}
                          medicineQuantity={queue.medication?.medicineQuantity}
                          medicineFrequency={
                            queue.medication?.medicineFrequency
                          }
                          remarks={queue.medication?.remarks}
                        />
                      </td>

                      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-center">
                        <QueuePhysicalExamDialog
                          queueID={queue.physicalExamID?.queueID}
                          purpose={queue.physicalExamID?.purpose}
                          genSurvey={queue.physicalExamID?.genSurvey}
                          bloodPressure={queue.physicalExamID?.bloodPressure}
                          pulseRate={queue.physicalExamID?.pulseRate}
                          respRate={queue.physicalExamID?.respRate}
                          bodyTemp={queue.physicalExamID?.bodyTemp}
                          LMP={queue.physicalExamID?.LMP}
                          menstruation={queue.physicalExamID?.menstruation}
                          hypertension={queue.physicalExamID?.hypertension}
                          bronchialAsthma={
                            queue.physicalExamID?.bronchialAsthma
                          }
                          heartDisease={queue.physicalExamID?.heartDisease}
                          chestPain={queue.physicalExamID?.chestPain}
                          seizureDisorder={
                            queue.physicalExamID?.seizureDisorder
                          }
                          others={queue.physicalExamID?.others}
                          LOC={queue.physicalExamID?.LOC}
                          injuries={queue.physicalExamID?.injuries}
                          skin={queue.physicalExamID?.skin}
                          head={queue.physicalExamID?.head}
                          eyes={queue.physicalExamID?.eyes}
                          ears={queue.physicalExamID?.ears}
                          neck={queue.physicalExamID?.neck}
                          throat={queue.physicalExamID?.throat}
                          chestAndLungs={queue.physicalExamID?.chestAndLungs}
                          heart={queue.physicalExamID?.heart}
                          abdomen={queue.physicalExamID?.abdomen}
                          gut={queue.physicalExamID?.gut}
                          masculoSkeletal={
                            queue.physicalExamID?.masculoSkeletal
                          }
                          neurological={queue.physicalExamID?.neurological}
                          CBC={queue.physicalExamID?.CBC}
                          urinalysis={queue.physicalExamID?.urinalysis}
                          fecalysis={queue.physicalExamID?.fecalysis}
                          chestXray={queue.physicalExamID?.chestXray}
                          ECG={queue.physicalExamID?.ECG}
                          HBSAG={queue.physicalExamID?.HBSAG}
                          drugTest={queue.physicalExamID?.drugTest}
                          isPhysicallyFit={
                            queue.physicalExamID?.isPhysicallyFit
                          }
                          clinicAssessment={
                            queue.physicalExamID?.clinicAssessment
                          }
                          forClearance={queue.physicalExamID?.forClearance}
                          forLaboratory={queue.physicalExamID?.forLaboratory}
                          forOthers={queue.physicalExamID?.forOthers}
                          finalAssessment={
                            queue.physicalExamID?.finalAssessment
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
