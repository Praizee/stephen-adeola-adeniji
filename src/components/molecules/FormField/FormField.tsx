import React from "react";
import type { InputHTMLAttributes } from "react";
import { Input } from "../../atoms/Input";
import { Typography } from "../../atoms/Typography";
import "./FormField.css";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  error,
  ...props
}) => {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-field__label">
        <Typography variant="label" component="span">
          {label}
        </Typography>
      </label>
      <Input id={id} className="form-field__input" {...props} />
      {error && (
        <Typography
          variant="caption"
          color="danger"
          className="form-field__error"
        >
          {error}
        </Typography>
      )}
    </div>
  );
};

export default FormField;

