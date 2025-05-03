"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  ArrowDown,
  ArrowUp,
  Check,
  X,
  Minus,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FC, PropsWithChildren } from "react";
import cn from "classnames";
import Link from "next/link";

export enum Priority {
  Neutral = "Neutral",
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export const priorityLabels = {
  [Priority.Neutral]: "Neutral",
  [Priority.Low]: "Low",
  [Priority.Medium]: "Medium",
  [Priority.High]: "High",
};

export enum Status {
  Disabled = "Disabled",
  Active = "Active",
  Inactive = "Inactive",
}

export const statusLabels = {
  [Status.Disabled]: "Disabled",
  [Status.Active]: "Active",
  [Status.Inactive]: "Inactive",
};

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  company: string;
  priority: Priority;
  status: Status;
}

const renderSortIcon = (column: Column<User>) => {
  const sort = column.getIsSorted();
  if (!sort) return null;

  if (sort === "asc") {
    return <ArrowDown className="ml-2 h-4 w-4" />;
  }

  return <ArrowUp className="ml-2 h-4 w-4" />;
};

const handleSorting = (column: Column<User>) => {
  const sort = column.getIsSorted();
  if (sort === "desc") {
    column.clearSorting();
    return;
  }

  column.toggleSorting(column.getIsSorted() === "asc");
};

const SortableHeader: FC<PropsWithChildren & { column: Column<User> }> = ({
  column,
  children,
}) => {
  return (
    <Button
      variant="ghost"
      onClick={() => handleSorting(column)}
      className="flex justify-start p-0 w-full h-full px-[1rem] relative left-[-1rem]"
    >
      {children}
      {renderSortIcon(column)}
    </Button>
  );
};

const PriorityLabel: FC<{ priority: Priority }> = ({ priority }) => {
  // const priorityStyles = {
  //   [Priority.Neutral]:
  //     "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300",
  //   [Priority.Low]:
  //     "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  //   [Priority.Medium]:
  //     "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  //   [Priority.High]:
  //     "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  // };

  return (
    <span
      // className={`text-sm font-medium px-[.75rem] py-[.15rem] rounded-[1rem] ${priorityStyles[priority]}`}
      className={cn(
        "text-sm font-medium px-[.75rem] py-[.15rem] rounded-[1rem]",
        {
          "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300":
            priority === Priority.Neutral,
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300":
            priority === Priority.Low,
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300":
            priority === Priority.Medium,
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300":
            priority === Priority.High,
        }
      )}
    >
      {Priority[priority]}
    </span>
  );
};

const StatusLabel: FC<{ status: Status }> = ({ status }) => {
  const iconStyle = "h-[.5rem] w-[.5rem] text-[#fff] ";

  const statusIcons = {
    [Status.Disabled]: <X className={iconStyle} />, //"h-4 w-4 text-red-500" />,
    [Status.Active]: <Check className={iconStyle} />, //"h-4 w-4 text-green-500" />,
    [Status.Inactive]: <Minus className={iconStyle} />, //"h-4 w-4 text-yellow-500" />,
  };

  return (
    <span className="text-sm font-medium flex items-center gap-[.5rem]">
      <span
        className={cn(
          "w-[.75rem] h-[.75rem] rounded-[100%] flex items-center justify-center",
          {
            "bg-red-700 dark:bg-red-800": status === Status.Disabled,
            "bg-green-600 dark:bg-green-800": status === Status.Active,
            "bg-gray-600 dark:bg-gray-400": status === Status.Inactive,
          }
        )}
      >
        {statusIcons[status]}
      </span>
      <span
        className={cn("", {
          "text-red-700": status === Status.Disabled,
          "text-green-600": status === Status.Active,
          "text-gray-600": status === Status.Inactive,
        })}
      >
        {Status[status]}
      </span>
    </span>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      const menuClassName = "hover:cursor-pointer";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:cursor-pointer"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className={`${menuClassName}`}
              // onClick={() => navigator.clipboard.writeText(user.id.toString())}
            >
              <Trash
                // height={".5rem"}
                // width={"auto"}
                className="text-black fill-black h-[.75rem]! relative top-[-1px] "
              />
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/users/${user.id}`}>
              <DropdownMenuItem
                className={menuClassName} /*onClick={() => {
              // router.push(`/users/${user.id}`);
              // router.push(`/users/${user.id}`, undefined, { shallow: true });
              // router.push(`/users/${user.id}`, { shallow: true });
            }}*/
              >
                View User
              </DropdownMenuItem>
            </Link>
            {/* <DropdownMenuItem className={menuClassName}>
              View payment details
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <SortableHeader column={column}>ID</SortableHeader>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row }) => {
      const email = getValue() as string;
      return (
        <Link
          href={`/users/${row.original.id}`}
          className="text-primary font-[500]"
        >
          {email}
        </Link>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue, row }) => {
      const email = getValue() as string;
      return <Link href={`/users/${row.original.id}`}>{email}</Link>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <SortableHeader column={column}>Created At</SortableHeader>;
    },
  },
  {
    accessorKey: "company",
    header: ({ column }) => {
      return <SortableHeader column={column}>Company</SortableHeader>;
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return <SortableHeader column={column}>Priority</SortableHeader>;
    },
    cell: ({ getValue }) => {
      const priority = getValue() as Priority;
      return <PriorityLabel priority={priority} />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <SortableHeader column={column}>Status</SortableHeader>;
    },
    cell: ({ getValue }) => {
      const status = getValue() as Status;
      return <StatusLabel status={status} />;
    },
  },
];
