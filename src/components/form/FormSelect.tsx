"use client";

// import { Input, BaseInputProps } from "@/components/ui/input";
import { ReactNode, useMemo } from "react";
import FormInputLabel from "@/components/form/FormInputLabel";
import FormInputError from "@/components/form/FormInputError";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  useWatch,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
// import {
//   Priority,
//   priorityLabels,
// } from "@/app/(protected)/users/UsersTable/columns";

// const data = [
//   {
//     value: "1",
//     label: "Option 1",
//   },
// ];

// type InputProps = BaseInputProps;

type FormInputProps<T extends FieldValues> = {
  label: ReactNode;
  error?: FieldError;
  isLoading?: boolean;
  control: Control<T>;

  placeholder?: string;
  name: Path<T>;
  id: string;
  data: { value: string; label: string }[];
};

const FormSelect = <T extends FieldValues>(props: FormInputProps<T>) => {
  const {
    label,
    error,
    isLoading,
    control,

    placeholder,
    name,
    id,
    data,
  } = props;

  const value = useWatch({ control, name });

  if (!name) {
    throw new Error("FormSelect requires a prop 'name'.");
  }

  const labelWidth = useMemo(() => {
    const randomNumber = (Math.random() * (5 - 2) + 2).toFixed(2); // string
    return `${randomNumber}rem`;
  }, []);

  if (isLoading || value === undefined) {
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
      {id && <FormInputLabel htmlFor={id}>{label}</FormInputLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
              }}
              //   value={field.value ?? undefined}
              value={value}
              // defaultValue={user.priority}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder ?? "Select"} />
              </SelectTrigger>
              <SelectContent>
                {data.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
                {/* {Object.values(Priority).map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priorityLabels[priority]}
                  </SelectItem>
                ))} */}
                {/* {Object.values(Priority).map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priorityLabels[priority]}
                  </SelectItem>
                ))} */}
              </SelectContent>
            </Select>
          );
        }}
      />
      {/* <Input
        // type="email"
        // placeholder="Email"
        // {...register("email")}
        {...rest}
      /> */}
      <FormInputError error={error} />
    </div>
  );
};

export default FormSelect;
