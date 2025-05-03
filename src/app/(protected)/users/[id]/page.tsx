"use client";

import { useUserStore } from "@/utils/stores/users";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Priority,
  priorityLabels,
  Status,
  statusLabels,
  User,
} from "../UsersTable/columns";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/form/FormInput";
import { toast } from "sonner";
import FormSelect from "@/components/form/FormSelect";

const schema = z.object({
  email: z.string().email("Neplatný email").nonempty("Email is required"),
  name: z.string().nonempty("Name is required"),
  company: z.string().nullable(),
  priority: z.enum([
    Priority.Neutral,
    Priority.Low,
    Priority.Medium,
    Priority.High,
  ]),
  status: z.enum([Status.Disabled, Status.Active, Status.Inactive]),
});

export type FormData = z.infer<typeof schema>;

const UserDetail = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userError, setUserError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const usersStore = useUserStore();

  // console.log("usersStore", usersStore.users);

  const {
    register,
    handleSubmit,
    setValue,
    formState,
    control,
    reset,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      // id: "",
      // createdAt: null,
      // updatedAt: null,
      company: null,
      priority: undefined,
      status: undefined,
      name: "",
    },
    shouldUnregister: false,
  });

  const { errors } = formState;

  // console.log("formState", formState);
  // console.log("defaultValues", formState.defaultValues);
  // console.log("values", formState.values());
  // console.log("errors", errors);

  useEffect(() => {
    if (!usersStore.usersInitialized) usersStore.fetchUsers();
  }, []);

  useEffect(() => {
    if (usersStore.users?.length > 0 || usersStore.usersInitialized) {
      const foundUser =
        usersStore.users.find((u) => u.id === Number(id)) || null;
      if (!foundUser) {
        setUserError("404");
        return;
      }

      setUser(foundUser);
    }
  }, [usersStore.users, usersStore.usersInitialized, id]);

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        company: user.company,
        priority: user.priority,
        status: user.status,
        name: user.name,
      });

      setValue("email", user.email);
      setValue("company", user.company);
      setValue("priority", user.priority);
      setValue("status", user.status);
      setValue("name", user.name);
    }
  }, [user, setValue]);

  const onSubmit = async (data: FormData) => {
    // console.log("Form submitted: data", data);
    // console.log("getValues", getValues());
    await usersStore.updateUser(Number(id), data);
    // console.log("DONE", id, typeof id, Number(id));
    toast("User has been updated.");
  };

  const onError = (error: unknown) => {
    console.error("Form submission error:", error);
  };

  return (
    <div className="min-h-full flex flex-col">
      <div className="font-[600] pb-[1rem] flex items-center justify-between">
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip delayDuration={500}>
              <TooltipTrigger>
                <Link href={"/users"}>
                  <Button
                    variant={"ghost"}
                    className="hover:bg-[transparent] ml-[-1rem]"
                  >
                    <ChevronLeft />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="relative left-[-.5rem]">
                <p>Go to users overview</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          User Detail - {user?.name}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onError={onError}
        className="space-y-[1rem] flex flex-col flex-[1_0_auto]"
      >
        {/* <div>
          <InputLabel htmlFor="id">ID</InputLabel>
          <Input id="id" placeholder="ID" disabled value={user.id} />
        </div>
        <div>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" placeholder="Name" {...register("name")} />
          <InputError error={errors.name} />
        </div>
        <div>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <InputError error={errors.email} />
        </div>
        <div>
          <Input
            placeholder="Date of creation"
            disabled
            value={user.createdAt}
          />
        </div>
        <div>
          <Input
            placeholder="Last updated at"
            disabled
            value={user.updatedAt}
          />
        </div>
        <div>
          <Input placeholder="Company" {...register("company")} />
          <InputError error={errors.company} />
        </div>
        <div>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value as Priority);
                  }}
                  // defaultValue={user.priority}
                  value={field.value as Priority}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Priority).map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priorityLabels[priority]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />
        </div>
        <div>
          <Controller
            name="status"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value as Priority);
                  }}
                  defaultValue={user.status}
                  value={field.value as Status}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Status).map((status) => (
                      <SelectItem key={status} value={status}>
                        {statusLabels[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />
        </div> */}

        <FormInput
          label="Name"
          error={errors.name}
          id="name"
          isLoading={!user && !userError}
          {...register("name")}
        />

        <FormInput
          label="Email"
          error={errors.email}
          id="email"
          isLoading={!user && !userError}
          {...register("email")}
        />

        <FormSelect
          id="priority"
          name="priority"
          label="Priority"
          error={errors.priority}
          control={control}
          isLoading={!user && !userError}
          data={Object.values(Priority).map((priority) => ({
            label: priorityLabels[priority],
            value: priority.toString(),
          }))}
        />

        <FormSelect
          id="status"
          name="status"
          label="status"
          error={errors.status}
          control={control}
          isLoading={!user && !userError}
          data={Object.values(Status).map((status) => ({
            label: statusLabels[status],
            value: status.toString(),
          }))}
        />

        <div className="w-full flex justify-center items-end flex-[1_0_auto] mt-[auto] pt-[5rem]">
          <Button type="submit" size={"lg"}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserDetail;
