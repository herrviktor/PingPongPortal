import type{ ReactNode } from 'react';

type SectionProps = {
  title: string;
  listItems?: string[]; // gör valfri med ?
  children?: ReactNode; // barn som valfri prop
};

const SectionTerms = ({ title, listItems, children }: SectionProps) => {
  return (
    <div>
      <h2>{title}</h2>
      {listItems && (
        <ul>
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
};

export default SectionTerms;
