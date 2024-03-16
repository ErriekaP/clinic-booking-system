import React, { useState } from "react";

interface Option {
  id: number;
  serviceName: string;
}

interface MultipleSelectProps {
  options: Option[];
  selectedOptions: number[];
  onChange: (selectedOptions: number[]) => void;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  options,
  selectedOptions,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<Option | null>(null);

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

  const handleServiceHover = (option: Option) => {
    setHoveredService(option);
  };

  const handleServiceHoverEnd = () => {
    setHoveredService(null);
  };

  return (
    <div className="relative inline-block text-left bg-white rounded-md shadow-md p-5 mt-10 flex-1">
      <p className="text-sm mb-5 leading-3">Choose Services:</p>
      <div>
        <span
          onClick={toggleDropdown}
          className="rounded-md shadow-sm cursor-pointer bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 flex items-center"
        >
          {selectedOptions.length === 0
            ? "Select services"
            : selectedOptions.map((selectedId, index) => {
                const selectedService = options.find(
                  (option) => option.id === selectedId
                );
                return (
                  <React.Fragment key={selectedId}>
                    {selectedService && (
                      <span>
                        {selectedService.serviceName}
                        {index !== selectedOptions.length - 1 && ", "}
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
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
        <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 flex-1 ">
          <div className="py-1 ">
            {options.map((option) => (
              <div
                key={option.id}
                className="hover:bg-gray-100"
                onMouseEnter={() => handleServiceHover(option)}
                onMouseLeave={handleServiceHoverEnd}
              >
                <label className="flex items-center px-4 py-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-indigo-600"
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => handleOptionToggle(option.id)}
                  />
                  <span className={`ml-2 text-gray-700`}>
                    {option.serviceName}
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

export default MultipleSelect;
