interface GeneralInfoProps {
  destination: {
    fromDate: string;
    toDate: string;
    fromOccasion: string;
    toOccasion: string;
  };
}

export default function GeneralInfo({ destination }: GeneralInfoProps) {
  const fromDate = new Date(destination.fromDate);
  const toDate = new Date(destination.toDate);

  const fromMonthAbbreviation = fromDate.toLocaleString('default', {
    month: 'long',
  });
  const toMonthAbbreviation = toDate.toLocaleString('default', {
    month: 'long',
  });

  return (
    <div className="col-xl-3 lg:col-6">
      <div className="text-15">Best time to visit</div>
      <div className="row y-gap-10">
        <div className="col-auto">
          <div className="fw-500">{fromMonthAbbreviation || 'All Year'}</div>
          <div className="text-15 text-light-1">
            {destination.fromOccasion || ''}
          </div>
        </div>
        <div className="col-auto">
          <div className="fw-500">to</div>
        </div>
        <div className="col-auto">
          <div className="fw-500">{toMonthAbbreviation || 'All Year'}</div>
          <div className="text-15 text-light-1">
            {destination.toOccasion || ''}
          </div>
        </div>
      </div>
    </div>
  );
}
