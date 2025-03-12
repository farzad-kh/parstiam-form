import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputFormProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  errors?: FieldErrors<any>; 
}

const InputForm = ({ register, name, label, errors }: InputFormProps) => {
  return (
    <div>
      <label className="block text-gray-700 ">{label}</label>
      <input
        className="border p-2 w-full border-neutral-950 rounded"
        {...register(name)}
        placeholder={label}
      />

 
      {errors?.[name]?.message && (
        <p className="text-red-500">{errors[name]?.message as string}</p>
      )}
    </div>
  );
};

export default InputForm;
