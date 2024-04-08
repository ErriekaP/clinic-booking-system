import React, { useState } from "react";

interface Option {
  id: number;
  timeFrom: string;
  timeTo: string;
}

interface MultipleSelectProps {
  options: Option[];
  selectedOptions: number[];
  onChange: (selectedOptions: number[]) => void;
}

const MultipleSchedule: React.FC<MultipleSelectProps> = ({
  options,
  selectedOptions,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredSchedule, setHoveredSchedule] = useState<Option | null>(null);

  const handleOptionToggle = (optionId: number) => {
    if (selectedOptions.includes(optionId)) {
      onChange(selectedOptions.filter((id) => id !== optionId));
    } else {
      onChange([...selectedOptions, optionId]);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleScheduleHover = (option: Option) => {
    setHoveredSchedule(option);
  };

  const handleScheduleHoverEnd = () => {
    setHoveredSchedule(null);
  };

  const formatTime = (timeString: string) => {
    const hours = parseInt(timeString.slice(11, 13), 10);
    const minutes = timeString.slice(14, 16);
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours > 12 ? hours - 12 : hours;
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <div className="relative inline-block text-left rounded-md p-5 flex-1">
      <p className="text-sm font-bold mb-1">Choose Schedules:</p>

      <div>
        <span
          onClick={toggleDropdown}
          className="rounded-md shadow-sm cursor-pointer bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 flex items-center"
        >
          {selectedOptions.length === 0
            ? "Schedules"
            : selectedOptions
                .map((selectedId) => {
                  const selectedSchedule = options.find(
                    (option) => option.id === selectedId
                  );
                  return selectedSchedule
                    ? `${formatTime(selectedSchedule.timeFrom)} - ${formatTime(
                        selectedSchedule.timeTo
                      )}`
                    : "";
                })
                .join(", ")}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.id}
                className="hover:bg-gray-100"
                onMouseEnter={() => handleScheduleHover(option)}
                onMouseLeave={handleScheduleHoverEnd}
              >
                <label className="flex items-center px-4 py-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-indigo-600"
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => handleOptionToggle(option.id)}
                  />{" "}
                  <span className="ml-2 text-gray-700">
                    {formatTime(option.timeFrom)} - {formatTime(option.timeTo)}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleSchedule;
