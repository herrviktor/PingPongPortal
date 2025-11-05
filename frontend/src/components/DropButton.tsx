interface DropdownItemButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    onClick: () => void;
}

const CDropButton = ({ children, onClick, ...props }: DropdownItemButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="block min-w-[100px] px-4 py-2 text-sm border-y-1 hover:bg-gray-100 w-full text-left"
            {...props}
        >
            {children}
        </button>
    );
};

export default CDropButton;
