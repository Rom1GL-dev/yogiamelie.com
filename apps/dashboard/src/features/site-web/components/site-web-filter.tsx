interface EventFilterProps {
  selectedType: string;
  siteWebParametreType: { key: string; label: string }[];
  onSelect: (type: string) => void;
}

export const SiteWebFilter = ({
  selectedType,
  siteWebParametreType,
  onSelect
}: EventFilterProps) => {
  return (
    <div className="flex w-full flex-col gap-x-4 lg:flex-row">
      <div className="hidden w-full flex-wrap gap-x-4 lg:flex">
        {siteWebParametreType.map(({ key, label }) => (
          <div
            key={key}
            className={`flex cursor-pointer items-center rounded-lg p-1 px-2 text-sm md:px-5 lg:gap-x-4 lg:text-base ${
              selectedType === key
                ? 'bg-slate-600 text-white'
                : 'border border-slate-200 bg-slate-100 text-slate-600'
            }`}
            onClick={() => {
              localStorage.setItem('siteWebParametreType', key);
              onSelect(key);
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};
