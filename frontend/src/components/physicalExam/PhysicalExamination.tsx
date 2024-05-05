"use client";
import { useState } from "react";

const PhysicalExamination = () => {
  const [skinActivated, setSkinActivated] = useState(false);
  const [headActivated, setHeadActivated] = useState(false);
  const [eyesActivated, setEyesActivated] = useState(false);
  const [earsActivated, setEarsActivated] = useState(false);
  const [neckActivated, setNeckActivated] = useState(false);
  const [throatActivated, setThroatActivated] = useState(false);
  const [chestActivated, setChestActivated] = useState(false);
  const [heartActivated, setHeartActivated] = useState(false);
  const [abdomenActivated, setAbdomenActivated] = useState(false);
  const [gutActivated, setGutActivated] = useState(false);
  const [musculoActivated, setMusculoActivated] = useState(false);
  const [neuroActivated, setNeuroActivated] = useState(false);
  const [CBCActivated, setCBCActivated] = useState(false);
  const [urinalActivated, setUrinalActivated] = useState(false);
  const [fecalActivated, setFecalActivated] = useState(false);
  const [chestXActivated, setChestXActivated] = useState(false);
  const [ECGActivated, setECGActivated] = useState(false);
  const [HBSAGActivated, setHBSAGActivated] = useState(false);
  const [drugActivated, setDrugActivated] = useState(false);

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

  const handleEyesCheckboxChange = () => {
    setEyesActivated(!eyesActivated);
    if (!eyesActivated) {
      setFormData({ ...formData, eyes: "NORMAL" });
    } else {
      setFormData({ ...formData, eyes: "" });
    }
  };

  const handleEarsCheckboxChange = () => {
    setEarsActivated(!earsActivated);
    if (!earsActivated) {
      setFormData({ ...formData, ears: "NORMAL" });
    } else {
      setFormData({ ...formData, ears: "" });
    }
  };

  const handleNeckCheckboxChange = () => {
    setNeckActivated(!neckActivated);
    if (!neckActivated) {
      setFormData({ ...formData, neck: "NORMAL" });
    } else {
      setFormData({ ...formData, neck: "" });
    }
  };

  const handleThroatCheckboxChange = () => {
    setThroatActivated(!throatActivated);
    if (!throatActivated) {
      setFormData({ ...formData, throat: "NORMAL" });
    } else {
      setFormData({ ...formData, throat: "" });
    }
  };

  const handleChestCheckboxChange = () => {
    setChestActivated(!chestActivated);
    if (!chestActivated) {
      setFormData({ ...formData, chestAndLungs: "NORMAL" });
    } else {
      setFormData({ ...formData, chestAndLungs: "" });
    }
  };

  const handleHeartCheckboxChange = () => {
    setHeartActivated(!heartActivated);
    if (!heartActivated) {
      setFormData({ ...formData, heart: "NORMAL" });
    } else {
      setFormData({ ...formData, heart: "" });
    }
  };

  const handleAbdomenCheckboxChange = () => {
    setAbdomenActivated(!abdomenActivated);
    if (!abdomenActivated) {
      setFormData({ ...formData, abdomen: "NORMAL" });
    } else {
      setFormData({ ...formData, abdomen: "" });
    }
  };

  const handleGutCheckboxChange = () => {
    setGutActivated(!gutActivated);
    if (!gutActivated) {
      setFormData({ ...formData, gut: "NORMAL" });
    } else {
      setFormData({ ...formData, gut: "" });
    }
  };

  const handleMusculoCheckboxChange = () => {
    setMusculoActivated(!musculoActivated);
    if (!musculoActivated) {
      setFormData({ ...formData, masculoSkeletal: "NORMAL" });
    } else {
      setFormData({ ...formData, masculoSkeletal: "" });
    }
  };

  const handleNeuroCheckboxChange = () => {
    setNeuroActivated(!neuroActivated);
    if (!neuroActivated) {
      setFormData({ ...formData, neurological: "NORMAL" });
    } else {
      setFormData({ ...formData, neurological: "" });
    }
  };

  const handleCBCCheckboxChange = () => {
    setCBCActivated(!CBCActivated);
    if (!CBCActivated) {
      setFormData({ ...formData, CBC: "NORMAL" });
    } else {
      setFormData({ ...formData, CBC: "" });
    }
  };

  const handleUrinalCheckboxChange = () => {
    setUrinalActivated(!urinalActivated);
    if (!urinalActivated) {
      setFormData({ ...formData, urinalysis: "NORMAL" });
    } else {
      setFormData({ ...formData, urinalysis: "" });
    }
  };

  const handleFecalCheckboxChange = () => {
    setFecalActivated(!fecalActivated);
    if (!fecalActivated) {
      setFormData({ ...formData, fecalysis: "NORMAL" });
    } else {
      setFormData({ ...formData, fecalysis: "" });
    }
  };

  const handleChestXCheckboxChange = () => {
    setChestXActivated(!chestXActivated);
    if (!chestXActivated) {
      setFormData({ ...formData, chestXray: "NORMAL" });
    } else {
      setFormData({ ...formData, chestXray: "" });
    }
  };

  const handleECGCheckboxChange = () => {
    setECGActivated(!ECGActivated);
    if (!ECGActivated) {
      setFormData({ ...formData, ECG: "NORMAL" });
    } else {
      setFormData({ ...formData, ECG: "" });
    }
  };

  const handleHBSAGCheckboxChange = () => {
    setHBSAGActivated(!HBSAGActivated);
    if (!HBSAGActivated) {
      setFormData({ ...formData, HBSAG: "NORMAL" });
    } else {
      setFormData({ ...formData, HBSAG: "" });
    }
  };

  const handleDrugCheckboxChange = () => {
    setDrugActivated(!drugActivated);
    if (!drugActivated) {
      setFormData({ ...formData, drugTest: "NORMAL" });
    } else {
      setFormData({ ...formData, drugTest: "" });
    }
  };

  return (
    <div className="flex flex-col space-x-3 ">
      <div className="flex-grow">
        <h2 className="text-xl mb-4 font-bold text-white text-center">
          Physical Examination
        </h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-row space-x-8 items-start">
            <div className="border-2 border-black border-gray-200 px-5 rounded pb-2">
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
                onChange={(e) =>
                  setFormData({ ...formData, skin: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, head: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  headActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={headActivated}
              />

              {/* Eyes */}
              <p className="text-sm font-bold my-2">Eyes:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.eyes === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.eyes === "NORMAL"}
                      onChange={handleEyesCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !eyesActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={eyesActivated}
                      onChange={handleEyesCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="eyes"
                name="eyes"
                type="text"
                value={!eyesActivated ? formData.eyes : ""}
                onChange={(e) =>
                  setFormData({ ...formData, eyes: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  eyesActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={eyesActivated}
              />

              {/* Ears */}
              <p className="text-sm font-bold my-2">Ears:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.ears === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.ears === "NORMAL"}
                      onChange={handleEarsCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !earsActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={earsActivated}
                      onChange={handleEarsCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="ears"
                name="ears"
                type="text"
                value={!earsActivated ? formData.ears : ""}
                onChange={(e) =>
                  setFormData({ ...formData, ears: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  earsActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={earsActivated}
              />

              {/* Neck */}
              <p className="text-sm font-bold my-2">Neck:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.neck === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.neck === "NORMAL"}
                      onChange={handleNeckCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !neckActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={neckActivated}
                      onChange={handleNeckCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="neck"
                name="neck"
                type="text"
                value={!neckActivated ? formData.neck : ""}
                onChange={(e) =>
                  setFormData({ ...formData, neck: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  neckActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={neckActivated}
              />

              {/* Throat */}
              <p className="text-sm font-bold my-2">Throat:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.throat === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.throat === "NORMAL"}
                      onChange={handleThroatCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !throatActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={throatActivated}
                      onChange={handleThroatCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="throat"
                name="throat"
                type="text"
                value={!throatActivated ? formData.throat : ""}
                onChange={(e) =>
                  setFormData({ ...formData, throat: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  throatActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={throatActivated}
              />

              {/* Chest & Lungs */}
              <p className="text-sm font-bold my-2">Chest & Lungs:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.chestAndLungs === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.chestAndLungs === "NORMAL"}
                      onChange={handleChestCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !chestActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={chestActivated}
                      onChange={handleChestCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="chest"
                name="chest"
                type="text"
                value={!chestActivated ? formData.chestAndLungs : ""}
                onChange={(e) =>
                  setFormData({ ...formData, chestAndLungs: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  chestActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={chestActivated}
              />

              {/* Heart */}
              <p className="text-sm font-bold my-2">Heart:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.heart === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.heart === "NORMAL"}
                      onChange={handleHeartCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !heartActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={heartActivated}
                      onChange={handleHeartCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="heart"
                name="heart"
                type="text"
                value={!heartActivated ? formData.heart : ""}
                onChange={(e) =>
                  setFormData({ ...formData, heart: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  heartActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={heartActivated}
              />

              {/* Abdomen */}
              <p className="text-sm font-bold my-2">Abdomen:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.abdomen === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.abdomen === "NORMAL"}
                      onChange={handleAbdomenCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !abdomenActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={abdomenActivated}
                      onChange={handleAbdomenCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="abdomen"
                name="abdomen"
                type="text"
                value={!abdomenActivated ? formData.abdomen : ""}
                onChange={(e) =>
                  setFormData({ ...formData, abdomen: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  abdomenActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={abdomenActivated}
              />

              {/* Gut */}
              <p className="text-sm font-bold my-2">Gut:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.gut === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.gut === "NORMAL"}
                      onChange={handleGutCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !gutActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={gutActivated}
                      onChange={handleGutCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="gut"
                name="gut"
                type="text"
                value={!gutActivated ? formData.gut : ""}
                onChange={(e) =>
                  setFormData({ ...formData, gut: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  gutActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={gutActivated}
              />

              {/* Musculo */}
              <p className="text-sm font-bold my-2">Masculo Skeletal:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.masculoSkeletal === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.masculoSkeletal === "NORMAL"}
                      onChange={handleMusculoCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !musculoActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={musculoActivated}
                      onChange={handleMusculoCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="musculo"
                name="musculo"
                type="text"
                value={!musculoActivated ? formData.masculoSkeletal : ""}
                onChange={(e) =>
                  setFormData({ ...formData, masculoSkeletal: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  musculoActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={musculoActivated}
              />

              {/* Neurological */}
              <p className="text-sm font-bold my-2">Neurological:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.neurological === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.neurological === "NORMAL"}
                      onChange={handleNeuroCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !neuroActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={neuroActivated}
                      onChange={handleNeuroCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="neuro"
                name="neuro"
                type="text"
                value={!neuroActivated ? formData.neurological : ""}
                onChange={(e) =>
                  setFormData({ ...formData, neurological: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  neuroActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={neuroActivated}
              />
            </div>
            <div className="border-2 border-black border-gray-200 px-5 pb-3 rounded">
              {/* CBC */}
              <p className="text-sm font-bold my-2">CBC:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.CBC === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.CBC === "NORMAL"}
                      onChange={handleCBCCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !CBCActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={CBCActivated}
                      onChange={handleCBCCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="cbc"
                name="cbc"
                type="text"
                value={!CBCActivated ? formData.CBC : ""}
                onChange={(e) =>
                  setFormData({ ...formData, CBC: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  CBCActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={CBCActivated}
              />
              {/* Urinalysis */}
              <p className="text-sm font-bold my-2">Urinalysis:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.urinalysis === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.urinalysis === "NORMAL"}
                      onChange={handleUrinalCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !urinalActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={urinalActivated}
                      onChange={handleUrinalCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="urinal"
                name="urinal"
                type="text"
                value={!urinalActivated ? formData.urinalysis : ""}
                onChange={(e) =>
                  setFormData({ ...formData, urinalysis: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  urinalActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={urinalActivated}
              />
              {/* Fecalysis */}
              <p className="text-sm font-bold my-2">Fecalysis:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.fecalysis === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.fecalysis === "NORMAL"}
                      onChange={handleFecalCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !fecalActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={fecalActivated}
                      onChange={handleFecalCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="fecal"
                name="fecal"
                type="text"
                value={!fecalActivated ? formData.fecalysis : ""}
                onChange={(e) =>
                  setFormData({ ...formData, fecalysis: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  fecalActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={fecalActivated}
              />
              {/* Chest X-Ray */}
              <p className="text-sm font-bold my-2">Chest X-Ray:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.chestXray === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.chestXray === "NORMAL"}
                      onChange={handleChestXCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !chestXActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={chestXActivated}
                      onChange={handleChestXCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="chestX"
                name="chestX"
                type="text"
                value={!chestXActivated ? formData.chestXray : ""}
                onChange={(e) =>
                  setFormData({ ...formData, chestXray: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  chestXActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={chestXActivated}
              />
              {/* ECG */}
              <p className="text-sm font-bold my-2">ECG:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.ECG === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.ECG === "NORMAL"}
                      onChange={handleECGCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !ECGActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={ECGActivated}
                      onChange={handleECGCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="ECG"
                name="ECG"
                type="text"
                value={!ECGActivated ? formData.ECG : ""}
                onChange={(e) =>
                  setFormData({ ...formData, ECG: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  ECGActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={ECGActivated}
              />
              {/* HBSAG */}
              <p className="text-sm font-bold my-2">HBSAG:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.HBSAG === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.HBSAG === "NORMAL"}
                      onChange={handleHBSAGCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !HBSAGActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={HBSAGActivated}
                      onChange={handleHBSAGCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="HBSAG"
                name="HBSAG"
                type="text"
                value={!HBSAGActivated ? formData.HBSAG : ""}
                onChange={(e) =>
                  setFormData({ ...formData, HBSAG: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  HBSAGActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={HBSAGActivated}
              />
              {/* Drug Test */}
              <p className="text-sm font-bold my-2">Drug Test:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      formData.drugTest === "NORMAL" ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.drugTest === "NORMAL"}
                      onChange={handleDrugCheckboxChange}
                    />
                  </div>
                  <span>Normal</span>
                </label>

                <label className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 border-2 border-black rounded ${
                      !drugActivated ? "bg-black" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={drugActivated}
                      onChange={handleDrugCheckboxChange}
                    />
                  </div>
                  <span>Abnormal</span>
                </label>
              </div>

              <input
                id="drug"
                name="drug"
                type="text"
                value={!drugActivated ? formData.drugTest : ""}
                onChange={(e) =>
                  setFormData({ ...formData, drugTest: e.target.value })
                }
                className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  drugActivated ? "cursor-not-allowed bg-gray-200" : ""
                }`}
                disabled={drugActivated}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalExamination;
