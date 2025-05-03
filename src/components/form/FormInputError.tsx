import { FC } from "react";
import { FieldError } from "react-hook-form";

const InputError: FC<{ error?: FieldError }> = ({ error }) => {
  return error && <p className="text-red-500 text-sm">{error.message}</p>;
};

export default InputError;
