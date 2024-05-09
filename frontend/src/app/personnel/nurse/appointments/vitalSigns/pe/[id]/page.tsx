"use client";
import BackNavbar from "@/components/backNavbar/backNavbar";
import VitalSigns from "@/components/vitalSignsformsDialog/page";
import { Flex, Text } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hypertensionActivated, setHypertensionActivated] = useState(false);
  const [bronchialAsthmaActivated, setBronchialAsthmaActivated] =
    useState(false);
  const [heartDiseaseActivated, setHeartDiseaseActivated] = useState(false);
  const [chestPainActivated, setChestPainActivated] = useState(false);
  const [seizureDisorderActivated, setSeizureDisorderActivated] =
    useState(false);
  const [injuriesActivated, setInjuriesActivated] = useState(false);
  const [LOCActivated, setLOCActivated] = useState(false);

  const conditionOptions = [
    "CONSCIOUS",
    "COHERENT",
    "AMBULATORY",
    "NOTINDISTRESS",
  ];

  const [formData, setFormData] = useState({
    appointmentID: parseInt(params.id),
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
    skin: "NORMAL",
    head: "NORMAL",
    eyes: "NORMAL",
    ears: "NORMAL",
    neck: "NORMAL",
    throat: "NORMAL",
    chestAndLungs: "NORMAL",
    heart: "NORMAL",
    abdomen: "NORMAL",
    gut: "NORMAL",
    masculoSkeletal: "NORMAL",
    neurological: "NORMAL",
    CBC: "NORMAL",
    urinalysis: "NORMAL",
    fecalysis: "NORMAL",
    chestXray: "NORMAL",
    ECG: "NORMAL",
    HBSAG: "NORMAL",
    drugTest: "NORMAL",
    isPhysicallyFit: false,
    clinicAssessment: "PENDING",
    forClearance: "",
    forLaboratory: "",
    forOthers: "",
    finalAssessment: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/vital-sign/appointment/${formData.appointmentID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            purpose: formData.purpose,
            genSurvey: formData.genSurvey,
            bloodPressure: formData.bloodPressure,
            pulseRate: formData.pulseRate,
            respRate: formData.respRate,
            bodyTemp: formData.bodyTemp,
            menstruation: formData.menstruation
              ? dayjs(formData.menstruation).toISOString()
              : null,
            LMP: formData.LMP,
            hypertension: formData.hypertension,
            bronchialAsthma: formData.bronchialAsthma,
            heartDisease: formData.heartDisease,
            chestPain: formData.chestPain,
            seizureDisorder: formData.seizureDisorder,
            others: formData.others,
            LOC: formData.LOC,
            injuries: formData.injuries,
          }),
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
  console.log("mens", formData.menstruation);
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleConditionChange = (condition: string) => {
    let updatedConditions;
    if (selectedConditions.includes(condition)) {
      updatedConditions = selectedConditions.filter(
        (item) => item !== condition
      );
    } else {
      updatedConditions = [...selectedConditions, condition];
    }

    setSelectedConditions(updatedConditions);

    // Update the formData object with the updated selected conditions
    setFormData({ ...formData, genSurvey: updatedConditions });
  };

  const handleCheckboxChange = (value: string) => {
    setFormData({ ...formData, LMP: value });
  };
  console.log(formData);

  const handleHypertensionCheckboxChange = () => {
    setHypertensionActivated(!hypertensionActivated);
    if (!hypertensionActivated) {
      setFormData({ ...formData, hypertension: "" });
    }
  };

  const handleBronchialAsthmaCheckboxChange = () => {
    setBronchialAsthmaActivated(!bronchialAsthmaActivated);
    if (!bronchialAsthmaActivated) {
      setFormData({ ...formData, bronchialAsthma: "" });
    }
  };

  const handleHeartDiseaseCheckboxChange = () => {
    setHeartDiseaseActivated(!heartDiseaseActivated);
    if (!heartDiseaseActivated) {
      setFormData({ ...formData, heartDisease: "" });
    }
  };

  const handleChestPainCheckboxChange = () => {
    setChestPainActivated(!chestPainActivated);
    if (!chestPainActivated) {
      setFormData({ ...formData, chestPain: "" });
    }
  };

  const handleSeizureDisorderCheckboxChange = () => {
    setSeizureDisorderActivated(!seizureDisorderActivated);
    if (!seizureDisorderActivated) {
      setFormData({ ...formData, seizureDisorder: "" });
    }
  };

  const handleInjuriesCheckboxChange = () => {
    setInjuriesActivated(!injuriesActivated);
    if (!injuriesActivated) {
      setFormData({ ...formData, injuries: "" });
    }
  };

  const handleLOCCheckboxChange = () => {
    setLOCActivated(!LOCActivated);
    if (!LOCActivated) {
      setFormData({ ...formData, LOC: "" });
    }
  };

  return (
    <div>
      <BackNavbar />
      <div className="flex flex-col min-h-screen items-center p-4 justify-center">
        {/* <h2 className="text-xl mb-4 font-bold text-white ">
          Physical Exam Checklist
        </h2> */}
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col space-x-3 ">
            {/* GENERAL SURVEY */}
            <div className="flex flex-col ">
              <div className=" ">
                <h2 className="text-xl mb-4 font-bold text-white text-center">
                  General Survey
                </h2>
                <div className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="flex flex-row space-x-8 justify-center items-center">
                    <div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold my-2"
                          htmlFor="purpose"
                        >
                          Purpose
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="purpose"
                          rows={6}
                          name="purpose"
                          value={formData.purpose}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* General Survey */}

                      <div className="mb-4 relative">
                        <label
                          className="block text-gray-700 text-sm font-bold my-2"
                          htmlFor="conditions"
                        >
                          Select General Survey:
                        </label>
                        <div className="relative">
                          <div
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight cursor-pointer focus:outline-none focus:border-blue-500"
                            onClick={toggleDropdown}
                          >
                            {selectedConditions.length === 0
                              ? "Select conditions"
                              : selectedConditions.join(", ")}
                          </div>
                          {isOpen && (
                            <div className="absolute z-10 bg-white border border-gray-400 mt-1 w-full rounded shadow-md">
                              {conditionOptions.map((condition, index) => (
                                <label
                                  key={index}
                                  className="block px-4 py-2 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    className="mr-2 leading-tight"
                                    checked={selectedConditions.includes(
                                      condition
                                    )}
                                    onChange={() =>
                                      handleConditionChange(condition)
                                    }
                                  />
                                  {condition}
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Blood Pressure */}
                      <div className="flex flex-col">
                        <label
                          htmlFor="bloodPressure"
                          className="text-sm font-bold my-2"
                        >
                          Blood Pressure:
                        </label>
                        <input
                          id="bloodPressure"
                          name="bloodPressure"
                          type="text"
                          value={formData.bloodPressure}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      {/* Pulse Rate */}
                      <div className="flex flex-col">
                        <label
                          htmlFor="pulseRate"
                          className="text-sm font-bold my-2"
                        >
                          Pulse Rate:
                        </label>
                        <input
                          id="pulseRate"
                          name="pulseRate"
                          type="text"
                          value={formData.pulseRate}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      {/* Resp Rate */}
                      <div className="flex flex-col">
                        <label
                          htmlFor="respRate"
                          className="text-sm font-bold my-2"
                        >
                          Respiratory Rate:
                        </label>
                        <input
                          id="respRate"
                          name="respRate"
                          type="text"
                          value={formData.respRate}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      {/* Body Temp */}
                      <div className="flex flex-col">
                        <label
                          htmlFor="bodyTemp"
                          className="text-sm font-bold my-2"
                        >
                          Body Temperature:
                        </label>
                        <input
                          id="bodyTemp"
                          name="bodyTemp"
                          type="text"
                          value={formData.bodyTemp}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>

                      {/* Menstruation */}
                      <div className="flex flex-col">
                        <label
                          htmlFor="menstruation"
                          className="text-sm font-bold my-2"
                        >
                          Menstruation:
                        </label>
                        <input
                          id="menstruation
                          "
                          name="menstruation"
                          type="date"
                          value={formData.menstruation}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>

                      {/* LMP */}

                      <div>
                        <p className="text-sm font-bold my-2">LMP:</p>

                        <Text as="label" size="2">
                          <Flex gap="2">
                            <div
                              className={`h-4 w-4 border-2 border-black rounded ${
                                formData.LMP === "REGULAR" ? "bg-black" : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                className=""
                                checked={formData.LMP === "REGULAR"}
                                onChange={() => handleCheckboxChange("REGULAR")}
                              />
                            </div>
                            Regular
                          </Flex>
                        </Text>

                        <Text as="label" size="2">
                          <Flex gap="2">
                            <div
                              className={`h-4 w-4 border-2 border-black rounded ${
                                formData.LMP === "IRREGULAR" ? "bg-black" : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                className=""
                                checked={formData.LMP === "IRREGULAR"}
                                onChange={() =>
                                  handleCheckboxChange("IRREGULAR")
                                }
                              />
                            </div>
                            Irregular
                          </Flex>
                        </Text>
                        <Text as="label" size="2">
                          <Flex gap="2">
                            <div
                              className={`h-4 w-4 border-2 border-black rounded ${
                                formData.LMP === "NOTAPPLICABLE"
                                  ? "bg-black"
                                  : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                className=""
                                checked={formData.LMP === "NOTAPPLICABLE"}
                                onChange={() =>
                                  handleCheckboxChange("NOTAPPLICABLE")
                                }
                              />
                            </div>
                            Not Applicable
                          </Flex>
                        </Text>
                      </div>
                    </div>
                    <div>
                      {/* Hypertension */}
                      <div>
                        <p className="text-sm font-bold my-2">Hypertension:</p>
                        <label>
                          <Flex gap="2">
                            <div
                              className={`h-4 w-4 border-2 border-black rounded ${
                                hypertensionActivated ? "bg-black" : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                onChange={handleHypertensionCheckboxChange}
                              />
                            </div>
                          </Flex>
                        </label>
                        <input
                          id="hypertension"
                          name="hypertension"
                          type="text"
                          value={formData.hypertension}
                          onChange={handleInputChange}
                          className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            hypertensionActivated
                              ? ""
                              : "cursor-not-allowed bg-gray-200"
                          }`}
                          disabled={!hypertensionActivated}
                        />
                      </div>

                      {/* Bronchial Asthma */}
                      <div>
                        <p className="text-sm font-bold my-2">
                          Bronchial Asthma:
                        </p>
                        <label>
                          <Flex gap="2">
                            <div
                              className={`h-4 w-4 border-2 border-black rounded ${
                                bronchialAsthmaActivated ? "bg-black" : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                onChange={handleBronchialAsthmaCheckboxChange}
                              />
                            </div>
                          </Flex>
                        </label>
                        <input
                          id="bronchialAsthma"
                          name="bronchialAsthma"
                          type="text"
                          value={formData.bronchialAsthma}
                          onChange={handleInputChange}
                          className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            bronchialAsthmaActivated
                              ? ""
                              : "cursor-not-allowed bg-gray-200"
                          }`}
                          disabled={!bronchialAsthmaActivated}
                        />
                      </div>
                      {/* Heart Disease */}
                      <div>
                        <p className="text-sm font-bold my-2">Heart Disease:</p>
                        <label>
                          <Flex gap="2">
                            <div
                              className={`h-4 w-4 border-2 border-black rounded ${
                                heartDiseaseActivated ? "bg-black" : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                onChange={handleHeartDiseaseCheckboxChange}
                              />
                            </div>
                          </Flex>
                        </label>
                        <input
                          id="heartDisease"
                          name="heartDisease"
                          type="text"
                          value={formData.heartDisease}
                          onChange={handleInputChange}
                          className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            heartDiseaseActivated
                              ? ""
                              : "cursor-not-allowed bg-gray-200"
                          }`}
                          disabled={!heartDiseaseActivated}
                        />
                      </div>
                      {/* Chest Pain */}
                      <div>
                        <p className="text-sm font-bold my-2">Chest Pain:</p>
                        <label>
                          <Flex gap="2">
                            <div
                              className={`h-4 w-4 border-2 border-black rounded ${
                                chestPainActivated ? "bg-black" : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                onChange={handleChestPainCheckboxChange}
                              />
                            </div>
                          </Flex>
                        </label>
                        <input
                          id="chestPain"
                          name="chestPain"
                          type="text"
                          value={formData.chestPain}
                          onChange={handleInputChange}
                          className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            chestPainActivated
                              ? ""
                              : "cursor-not-allowed bg-gray-200"
                          }`}
                          disabled={!chestPainActivated}
                        />
                      </div>
                      {/* LOC */}
                      <div>
                        <p className="text-sm font-bold my-2">LOC:</p>
                        <label>
                          <Flex gap="2">
                            <div
                              className={`h-4 w-4 border-2 border-black rounded ${
                                LOCActivated ? "bg-black" : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                onChange={handleLOCCheckboxChange}
                              />
                            </div>
                          </Flex>
                        </label>
                        <input
                          id="LOC"
                          name="LOC"
                          type="text"
                          value={formData.LOC}
                          onChange={handleInputChange}
                          className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            LOCActivated ? "" : "cursor-not-allowed bg-gray-200"
                          }`}
                          disabled={!LOCActivated}
                        />
                      </div>
                      {/* Seizure Disorder */}
                      <div>
                        <p className="text-sm font-bold my-2">
                          Seizure Disorder:
                        </p>
                        <label>
                          <Flex gap="2">
                            <div
                              className={`h-4 w-4 border-2 border-black rounded ${
                                seizureDisorderActivated ? "bg-black" : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                onChange={handleSeizureDisorderCheckboxChange}
                              />
                            </div>
                          </Flex>
                        </label>
                        <input
                          id="seizureDisorder"
                          name="seizureDisorder"
                          type="text"
                          value={formData.seizureDisorder}
                          onChange={handleInputChange}
                          className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            seizureDisorderActivated
                              ? ""
                              : "cursor-not-allowed bg-gray-200"
                          }`}
                          disabled={!seizureDisorderActivated}
                        />
                      </div>
                      {/* Injuries */}
                      <div>
                        <p className="text-sm font-bold my-2">Injuries:</p>
                        <label>
                          <Flex gap="2">
                            <div
                              className={`h-4 w-4 border-2 border-black rounded ${
                                injuriesActivated ? "bg-black" : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                onChange={handleInjuriesCheckboxChange}
                              />
                            </div>
                          </Flex>
                        </label>
                        <input
                          id="injuries"
                          name="injuries"
                          type="text"
                          value={formData.injuries}
                          onChange={handleInputChange}
                          className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            injuriesActivated
                              ? ""
                              : "cursor-not-allowed bg-gray-200"
                          }`}
                          disabled={!injuriesActivated}
                        />
                      </div>
                      {/* Other */}
                      <div>
                        <p className="text-sm font-bold my-2">Others:</p>

                        <input
                          id="others"
                          name="others"
                          type="text"
                          value={formData.others}
                          onChange={handleInputChange}
                          className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
