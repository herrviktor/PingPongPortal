interface FormFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, children }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
      {label}
    </label>
    {children}
  </div>
);

export default FormField;
