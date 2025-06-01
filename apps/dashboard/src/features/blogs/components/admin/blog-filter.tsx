import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface EventFilterProps {
    selectedType: string;
    blogTypes: { key: string; label: string; count: number }[];
    onSelect: (type: string) => void;
}

export const BlogFilter = ({ selectedType, blogTypes, onSelect }: EventFilterProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row gap-x-4 w-full">
            <div className="hidden lg:flex flex-wrap gap-x-4 w-full">
                {blogTypes.map(({ key, label, count }) => (
                    <div
                        key={key}
                        className={`p-1 px-2 text-sm lg:text-base md:px-5 rounded-lg cursor-pointer flex items-center lg:gap-x-4 ${
                            selectedType === key
                                ? "bg-slate-600 text-white"
                                : "bg-slate-100 border border-slate-200 text-slate-600"
                        }`}
                        onClick={() => {
                            localStorage.setItem("blogType", key);
                            onSelect(key);
                        }}
                    >
                        {label}
                        <div
                            className={`text-xs border ${
                                selectedType === key ? "bg-white" : "bg-slate-200"
                            } border-slate-200 rounded-md text-slate-600 p-1 px-2`}
                        >
                            {count}
                        </div>
                    </div>
                ))}
            </div>

            <div className="lg:hidden w-3/5 sm:w-2/5 md:w-1/5">
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full bg-slate-100 border border-slate-200 p-1 px-2 rounded-lg flex items-center justify-between text-slate-600"
                    >
                        {blogTypes.find((type) => type.key === selectedType)?.label || "Filtrer par"}
                        <span className={`ml-2`}>{dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute left-0 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                            <div className="flex flex-col">
                                {blogTypes.map(({ key, label, count }) => (
                                    <div
                                        key={key}
                                        onClick={() => {
                                            localStorage.setItem("blogType", key);
                                            onSelect(key);
                                            setDropdownOpen(false);
                                        }}
                                        className={`p-2 px-4 text-sm cursor-pointer flex justify-between ${
                                            selectedType === key
                                                ? "bg-slate-600 text-white"
                                                : "bg-slate-100 text-slate-600"
                                        }`}
                                    >
                                        {label}
                                        <span
                                            className={`text-xs border ${
                                                selectedType === key ? "bg-white" : "bg-slate-200"
                                            } border-slate-200 rounded-md text-slate-600 p-1 px-2`}
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
