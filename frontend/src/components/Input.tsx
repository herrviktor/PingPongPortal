import React from "react";

interface InputProps {
    type: string;
    placeholder?: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    name?: string;
    ariaLabel?: string;
    className?: string;
}

const CInput: React.FC<InputProps> = ({
    type,
    placeholder,
    value,
    onChange,
    id,
    name,
    ariaLabel,
    className,
}) => {

    const baseClasses = "cInput";

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            id={id}
            name={name}
            aria-label={ariaLabel}
            className={`${baseClasses} ${className ?? ""}`}
        />
    );
};

export default CInput;
