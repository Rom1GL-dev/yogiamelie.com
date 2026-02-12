import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface EventFilterProps {
  selectedType: string;
  blogTypes: { key: string; label: string; count: number }[];
  onSelect: (type: string) => void;
}

export const BlogFilter = ({
  selectedType,
  blogTypes,
  onSelect
}: EventFilterProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-x-4 lg:flex-row">
      <div className="hidden w-full flex-wrap gap-x-4 lg:flex">
        {blogTypes.map(({ key, label, count }) => (
          <div
            key={key}
            className={`flex cursor-pointer items-center rounded-lg p-1 px-2 text-sm md:px-5 lg:gap-x-4 lg:text-base ${
              selectedType === key
                ? 'bg-[#667467] text-white'
                : 'border border-slate-200 bg-slate-100 text-slate-600'
            }`}
            onClick={() => {
              localStorage.setItem('blogType', key);
              onSelect(key);
            }}
          >
            {label}
            <div
              className={`border text-xs ${
                selectedType === key ? 'bg-white' : 'bg-slate-200'
              } rounded-md border-slate-200 p-1 px-2 text-slate-600`}
            >
              {count}
            </div>
          </div>
        ))}
      </div>

      <div className="w-3/5 sm:w-2/5 md:w-1/5 lg:hidden">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-100 p-1 px-2 text-slate-600"
          >
            {blogTypes.find((type) => type.key === selectedType)?.label ||
              'Filtrer par'}
            <span className={`ml-2`}>
              {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 z-10 mt-2 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
              <div className="flex flex-col">
                {blogTypes.map(({ key, label, count }) => (
                  <div
                    key={key}
                    onClick={() => {
                      localStorage.setItem('blogType', key);
                      onSelect(key);
                      setDropdownOpen(false);
                    }}
                    className={`flex cursor-pointer justify-between p-2 px-4 text-sm ${
                      selectedType === key
                        ? 'bg-[#667467] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {label}
                    <span
                      className={`border text-xs ${
                        selectedType === key ? 'bg-white' : 'bg-slate-200'
                      } rounded-md border-slate-200 p-1 px-2 text-slate-600`}
                    >
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
