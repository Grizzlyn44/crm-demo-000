"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  ArrowDown,
  ArrowUp,
  Check,
  X,
  Minus,
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

enum Priority {
  Neutral = 0,
  Low = 1,
  Medium = 2,
  High = 3,
}

enum Status {
  Disabled = 0,
  Active = 1,
  Inactive = 2,
}

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
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
  const priorityStyles = {
    [Priority.Neutral]:
      "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300",
    [Priority.Low]:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    [Priority.Medium]:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    [Priority.High]:
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <span
      className={`text-sm font-medium px-[.75rem] py-[.15rem] rounded-[1rem] ${priorityStyles[priority]}`}
    >
      {Priority[priority]}
    </span>
  );
};

const StatusLabel: FC<{ status: Status }> = ({ status }) => {
  const iconStyle = "h-[.5rem] w-[.5rem] text-[#fff]";

  const statusIcons = {
    [Status.Disabled]: <X className={iconStyle} />, //"h-4 w-4 text-red-500" />,
    [Status.Active]: <Check className={iconStyle} />, //"h-4 w-4 text-green-500" />,
    [Status.Inactive]: <Minus className={iconStyle} />, //"h-4 w-4 text-yellow-500" />,
  };

  const dominantColors = {
    [Status.Disabled]: "[#FF5659]",
    [Status.Active]: "[#12C739]",
    [Status.Inactive]: "gray-400",
  };

  const x = "[#FF5659]";

  const iconStyles = {
    [Status.Disabled]: `bg-${x} text-${
      dominantColors[Status.Disabled]
    } dark:bg-red-900 dark:text-red-300`,
    [Status.Active]: `bg-${dominantColors[Status.Active]} text-${
      dominantColors[Status.Active]
    } dark:bg-green-900 dark:text-green-300`,
    [Status.Inactive]: `bg-${dominantColors[Status.Inactive]} text-${
      dominantColors[Status.Inactive]
    } dark:bg-yellow-900 dark:text-yellow-300`,
  };

  const labelsStyles = {
    [Status.Disabled]: `text-${dominantColors[Status.Disabled]}`,
    [Status.Active]: `text-${dominantColors[Status.Active]}`,
    [Status.Inactive]: `text-${dominantColors[Status.Inactive]}`,
  };

  return (
    <span className="text-sm font-medium flex items-center gap-[.5rem]">
      <span
        className={`w-[.75rem] h-[.75rem] rounded-[100%] flex items-center justify-center ${iconStyles[status]}`}
      >
        {statusIcons[status]}
      </span>
      <span className={labelsStyles[status]}>{Status[status]}</span>
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
              className={menuClassName}
              onClick={() => navigator.clipboard.writeText(user.id.toString())}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={menuClassName}>
              View customer
            </DropdownMenuItem>
            <DropdownMenuItem className={menuClassName}>
              View payment details
            </DropdownMenuItem>
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
  },
  {
    accessorKey: "email",
    header: "Email",
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
      // return (
      //   <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
      //     {Priority[priority]}
      //   </span>
      // );
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
      // return (
      //   <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
      //     {Status[status]}
      //   </span>
      // );
    },
  },
];
