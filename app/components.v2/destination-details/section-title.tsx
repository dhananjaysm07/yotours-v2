interface SectionTitleProps {
  title: string;
  text?: string;
}

export function SectionTitle({ title, text }: SectionTitleProps) {
  return (
    <div className="sectionTitle -md">
      <h2 className="sectionTitle__title">{title}</h2>
      {text && <p className="sectionTitle__text mt-5 sm:mt-0">{text}</p>}
    </div>
  );
}
