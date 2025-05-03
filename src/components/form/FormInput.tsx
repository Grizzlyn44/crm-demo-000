import { Input, BaseInputProps } from "@/components/ui/input";
import { FC, ReactNode, useMemo } from "react";
import FormInputLabel from "@/components/form/FormInputLabel";
import FormInputError from "@/components/form/FormInputError";
import { FieldError } from "react-hook-form";

type InputProps = BaseInputProps;

type FormInputProps = {
  label: ReactNode;
  error?: FieldError;
  isLoading?: boolean;
} & InputProps;

const FormInput: FC<FormInputProps> = ({
  label,
  error,
  isLoading,
  ...rest
}) => {
  const labelWidth = useMemo(() => {
    const randomNumber = (Math.random() * (5 - 2) + 2).toFixed(2); // string
    return `${randomNumber}rem`;
  }, []);

  if (isLoading) {
    return (
      <div>
        <div
          className="h-4 mb-[.55rem] bg-gray-200 rounded-[.15rem] animate-pulse transition-width duration-300"
          style={{
            width: labelWidth,
            // transition: "width 0.3s ease-in-out",
          }}
        />
        <div className="h-9 w-full bg-gray-200 rounded-md animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      {rest.id && <FormInputLabel htmlFor={rest.id}>{label}</FormInputLabel>}
      <Input
        // type="email"
        // placeholder="Email"
        // {...register("email")}
        {...rest}
      />
      <FormInputError error={error} />
    </div>
  );
};

export default FormInput;
