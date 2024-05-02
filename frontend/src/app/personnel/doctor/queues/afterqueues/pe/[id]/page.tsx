"use client";
import BackNavbar from "@/components/backNavbar/backNavbar";
import Assessment from "@/components/physicalExam/Assessment";
import GeneralSurvey from "@/components/physicalExam/GeneralSurvey";
import PhysicalExamination from "@/components/physicalExam/PhysicalExamination";
import { Card, Checkbox, Container, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    queueID: parseInt(params.id),
    diagnosis: "Sample diagnosis",
    medications: [
      {
        medicineName: "",
        medicineStrength: "",
        medicineQuantity: "",
        medicineFrequency: "",
        remarks: "",
        afterAppointmentID: null,
      },
    ],
    physicalExam: [
      {
        afterAppointmentID: null,
        purpose: "",
        genSurvey: [],
        bloodPressure: "",
        pulseRate: "",
        respRate: "",
        bodyTemp: "",
        menstruation: null,
        LMP: "",
        hypertension: "",
        bronchialAsthma: "",
        heartDisease: "",
        chestPain: "",
        seizureDisorder: "",
        others: "",
        LOC: "",
        injuries: "",
        skin: "",
        head: "",
        eyes: "",
        ears: "",
        neck: "",
        throat: "",
        chestAndLungs: "",
        heart: "",
        abdomen: "",
        gut: "",
        masculoSkeletal: "",
        neurological: "",
        CBC: "",
        urinalysis: "",
        fecalysis: "",
        chestXray: "",
        ECG: "",
        HBSAG: "",
        drugTest: "",
        isPhysicallyFit: true,
        clinicAssessment: "PENDING",
        forClearance: "",
        forLaboratory: "",
        forOthers: "",
        finalAssessment: "",
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/afterQueue/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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

  return (
    <div>
      <BackNavbar />
      <div className="flex flex-col min-h-screen items-center p-4 justify-center">
        <h2 className="text-xl mb-4 font-bold text-white text-center">
          Physical Exam Checklist
        </h2>
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-row space-x-3 ">
            <GeneralSurvey />
            <PhysicalExamination />
            <Assessment />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Page;
