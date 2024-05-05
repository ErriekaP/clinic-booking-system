"use client";
import AfterQueueDialogue from "@/components/afterModal/afterQueueModal";
import QueuePhysicalExamDialog from "@/components/afterModal/QueuePhysicalExam";
import BackNavbar from "@/components/backNavbar/backNavbar";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
//appointments under his number
const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const [queues, setQueues] = useState<any[]>([]);
  const [physicalExam, setPhysicalExam] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch after queue data from an API
    const fetchAfterQueue = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/queue/afterQueue/${id}`
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
    // Fetch physical exam data from an API
    const fetchPhysicalExam = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/afterQueue/physicalExam/${id}`
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

    fetchPhysicalExam();
  }, []);

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

  const filteredQueues = queues.filter((queue) =>
    queue.status.toLowerCase().includes(searchQuery.toLowerCase())
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
                  {filteredQueues.map((queue, index) => (
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
                          diagnosis={queue.afterQueue?.diagnosis}
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
                        {index < filteredPhysicalExam.length ? (
                          <QueuePhysicalExamDialog
                            queueID={
                              filteredPhysicalExam[index].physicalExam?.queueID
                            }
                            purpose={
                              filteredPhysicalExam[index].physicalExam?.purpose
                            }
                            genSurvey={
                              filteredPhysicalExam[index].physicalExam
                                ?.genSurvey
                            }
                            bloodPressure={
                              filteredPhysicalExam[index].physicalExam
                                ?.bloodPressure
                            }
                            pulseRate={
                              filteredPhysicalExam[index].physicalExam
                                ?.pulseRate
                            }
                            respRate={
                              filteredPhysicalExam[index].physicalExam?.respRate
                            }
                            bodyTemp={
                              filteredPhysicalExam[index].physicalExam?.bodyTemp
                            }
                            LMP={filteredPhysicalExam[index].physicalExam?.LMP}
                            menstruation={
                              filteredPhysicalExam[index].physicalExam
                                ?.menstruation
                            }
                            hypertension={
                              filteredPhysicalExam[index].physicalExam
                                ?.hypertension
                            }
                            bronchialAsthma={
                              filteredPhysicalExam[index].physicalExam
                                ?.bronchialAsthma
                            }
                            heartDisease={
                              filteredPhysicalExam[index].physicalExam
                                ?.heartDisease
                            }
                            chestPain={
                              filteredPhysicalExam[index].physicalExam
                                ?.chestPain
                            }
                            seizureDisorder={
                              filteredPhysicalExam[index].physicalExam
                                ?.seizureDisorder
                            }
                            others={
                              filteredPhysicalExam[index].physicalExam?.others
                            }
                            LOC={filteredPhysicalExam[index].physicalExam?.LOC}
                            injuries={
                              filteredPhysicalExam[index].physicalExam?.injuries
                            }
                            skin={
                              filteredPhysicalExam[index].physicalExam?.skin
                            }
                            head={
                              filteredPhysicalExam[index].physicalExam?.head
                            }
                            eyes={
                              filteredPhysicalExam[index].physicalExam?.eyes
                            }
                            ears={
                              filteredPhysicalExam[index].physicalExam?.ears
                            }
                            neck={
                              filteredPhysicalExam[index].physicalExam?.neck
                            }
                            throat={
                              filteredPhysicalExam[index].physicalExam?.throat
                            }
                            chestAndLungs={
                              filteredPhysicalExam[index].physicalExam
                                ?.chestAndLungs
                            }
                            heart={
                              filteredPhysicalExam[index].physicalExam?.heart
                            }
                            abdomen={
                              filteredPhysicalExam[index].physicalExam?.abdomen
                            }
                            gut={filteredPhysicalExam[index].physicalExam?.gut}
                            masculoSkeletal={
                              filteredPhysicalExam[index].physicalExam
                                ?.masculoSkeletal
                            }
                            neurological={
                              filteredPhysicalExam[index].physicalExam
                                ?.neurological
                            }
                            CBC={filteredPhysicalExam[index].physicalExam?.CBC}
                            urinalysis={
                              filteredPhysicalExam[index].physicalExam
                                ?.urinalysis
                            }
                            fecalysis={
                              filteredPhysicalExam[index].physicalExam
                                ?.fecalysis
                            }
                            chestXray={
                              filteredPhysicalExam[index].physicalExam
                                ?.chestXray
                            }
                            ECG={filteredPhysicalExam[index].physicalExam?.ECG}
                            HBSAG={
                              filteredPhysicalExam[index].physicalExam?.HBSAG
                            }
                            drugTest={
                              filteredPhysicalExam[index].physicalExam?.drugTest
                            }
                            isPhysicallyFit={
                              filteredPhysicalExam[index].physicalExam
                                ?.isPhysicallyFit
                            }
                            clinicAssessment={
                              filteredPhysicalExam[index].physicalExam
                                ?.clinicAssessment
                            }
                            forClearance={
                              filteredPhysicalExam[index].physicalExam
                                ?.forClearance
                            }
                            forLaboratory={
                              filteredPhysicalExam[index].physicalExam
                                ?.forLaboratory
                            }
                            forOthers={
                              filteredPhysicalExam[index].physicalExam
                                ?.forOthers
                            }
                            finalAssessment={
                              filteredPhysicalExam[index].physicalExam
                                ?.finalAssessment
                            }
                          />
                        ) : null}
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
