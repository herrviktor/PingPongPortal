import type { ReactNode } from 'react';

type SectionProps = {
    title: string;
    listItems?: string[];
    children?: ReactNode;
};

const SectionTerms = ({ title, listItems, children }: SectionProps) => {
    return (
        <div className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-2xl">
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
