"use client";
import { Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PhysicalExamination = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [skinActivated, setSkinActivated] = useState(false);
  const [headActivated, setHeadActivated] = useState(false);

  const [heartDiseaseActivated, setHeartDiseaseActivated] = useState(false);
  const [chestPainActivated, setChestPainActivated] = useState(false);
  const [seizureDisorderActivated, setSeizureDisorderActivated] =
    useState(false);

  const conditionOptions = [
    "CONSCIOUS",
    "COHERENT",
    "AMBULATORY",
    "NOTINDISTRESS",
  ];

  const [formData, setFormData] = useState({
    diagnosis: "Physical Exam",
    afterAppointmentID: null,
    purpose: "",
    genSurvey: [] as string[],
    bloodPressure: "",
    pulseRate: "",
    respRate: "",
    bodyTemp: "",
    menstruation: "",
    LMP: "REGULAR",
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
    isPhysicallyFit: false,
    clinicAssessment: "PENDING",
    forClearance: "",
    forLaboratory: "",
    forOthers: "",
    finalAssessment: "",
  });

  console.log(formData);

  const handleSkinCheckboxChange = () => {
    setSkinActivated(!skinActivated);
    if (!skinActivated) {
      setFormData({ ...formData, skin: "NORMAL" });
    } else {
      setFormData({ ...formData, skin: "" });
    }
  };

  const handleHeadCheckboxChange = () => {
    setHeadActivated(!headActivated);
    if (!headActivated) {
      setFormData({ ...formData, head: "NORMAL" });
    } else {
      setFormData({ ...formData, head: "" });
    }
  };

  return (
    <div className="flex flex-row space-x-3 ">
      <div className="flex-grow">
        <h2 className="text-xl mb-4 font-bold text-white text-center">
          Physical Examination
        </h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Skin */}
          <p className="text-sm font-bold my-2">Skin:</p>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <div
                className={`h-4 w-4 border-2 border-black rounded ${
                  formData.skin === "NORMAL" ? "bg-black" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.skin === "NORMAL"}
                  onChange={handleSkinCheckboxChange}
                />
              </div>
              <span>Normal</span>
            </label>

            <label className="flex items-center space-x-2">
              <div
                className={`h-4 w-4 border-2 border-black rounded ${
                  !skinActivated ? "bg-black" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={skinActivated}
                  onChange={handleSkinCheckboxChange}
                />
              </div>
              <span>Abnormal</span>
            </label>
          </div>

          <input
            id="skin"
            name="skin"
            type="text"
            value={!skinActivated ? formData.skin : ""}
            onChange={(e) => setFormData({ ...formData, skin: e.target.value })}
            className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              skinActivated ? "cursor-not-allowed bg-gray-200" : ""
            }`}
            disabled={skinActivated}
          />

          {/* Head */}
          <p className="text-sm font-bold my-2">Head:</p>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <div
                className={`h-4 w-4 border-2 border-black rounded ${
                  formData.head === "NORMAL" ? "bg-black" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.head === "NORMAL"}
                  onChange={handleHeadCheckboxChange}
                />
              </div>
              <span>Normal</span>
            </label>

            <label className="flex items-center space-x-2">
              <div
                className={`h-4 w-4 border-2 border-black rounded ${
                  !headActivated ? "bg-black" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={headActivated}
                  onChange={handleHeadCheckboxChange}
                />
              </div>
              <span>Abnormal</span>
            </label>
          </div>

          <input
            id="head"
            name="head"
            type="text"
            value={!headActivated ? formData.head : ""}
            onChange={(e) => setFormData({ ...formData, head: e.target.value })}
            className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              headActivated ? "cursor-not-allowed bg-gray-200" : ""
            }`}
            disabled={headActivated}
          />
        </div>
      </div>
    </div>
  );
};

export default PhysicalExamination;
