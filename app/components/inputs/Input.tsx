"uce client";

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

type InputPropTypes = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

function Input({
  id,
  label,
  type,
  required,
  disabled,
  register,
  errors,
}: InputPropTypes) {
  return (
    <div className="relative w-full">
      <input
        className={`peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${errors[id] ? "border-rose-400 " : "border-slate-300"} ${errors[id] ? "focus:border-rose-400 " : "focus:border-slate-300"}`}
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        type={type}
        placeholder=""
      />
      <label
        htmlFor="id"
        className={`text-md absolute left-4 top-5 z-10 origin-[0] -translate-y-3 transform cursor-text duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${errors[id] ? "text-rose-400" : "text-slate-400"}`}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
