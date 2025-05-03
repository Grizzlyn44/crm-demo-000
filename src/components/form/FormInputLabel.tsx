import { FC, PropsWithChildren } from "react";

const FormInputLabel: FC<{ htmlFor: string } & PropsWithChildren> = ({
  htmlFor,
  children,
}) => {
  return (
    <label
      className="text-sm font-[500] w-full block mb-[.25rem]"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default FormInputLabel;
