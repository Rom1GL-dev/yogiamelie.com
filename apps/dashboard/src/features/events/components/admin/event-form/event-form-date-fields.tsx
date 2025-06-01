import React from 'react';
import FormField from '@/components/form-field.tsx';

type Props = {
  startDate: string;
  startHour: string;

  endDate: string;
  endHour: string;

  onStartChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHourStartChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onEndChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHourEndChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EventFormDateFields = ({
  startDate,
  startHour,
  endDate,
  endHour,
  onStartChange,
  onHourStartChange,
  onEndChange,
  onHourEndChange
}: Props) => {
  return (
    <div className="space-y-5">
      <div className={'flex items-center gap-x-3'}>
        <FormField
          label="Date de début"
          type="date"
          value={startDate}
          onChange={onStartChange}
          required
        />
        <FormField
          label="Heure de début"
          type="text"
          value={startHour}
          onChange={onHourStartChange}
        />
      </div>
      <div className={'flex items-center gap-x-3'}>
        <FormField
          label="Date de fin"
          type="date"
          value={endDate}
          onChange={onEndChange}
          required
        />
        <FormField
          label="Heure de fin"
          type="text"
          value={endHour}
          onChange={onHourEndChange}
        />
      </div>
    </div>
  );
};

export default EventFormDateFields;
