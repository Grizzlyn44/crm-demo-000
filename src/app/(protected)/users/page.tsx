"use client";

import { columns } from "@/app/(protected)/users/UsersTable/columns";
import { UsersTable } from "@/app/(protected)/users/UsersTable/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useUserStore } from "@/utils/stores/users";
import { useEffect, useState } from "react";
import { RefreshCw, Filter, Plus } from "lucide-react";
import cn from "classnames";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);

  const usersStore = useUserStore();
  // console.log("usersStore", usersStore.users);

  const fetchUsers = async () => {
    await usersStore.fetchUsers();
  };

  useEffect(() => {
    if (!usersStore.usersInitialized) fetchUsers();
  }, []);

  const buttonIconClassName = cn("", {
    "animate-spin [animation-duration:2s]":
      usersStore.usersAreLoading || usersStore.usersAreFetching,
  });

  return (
    <div className="">
      <div className="w-full flex justify-end">
        <Switch
          checked={isLoading}
          onCheckedChange={(checked) => setIsLoading(checked)}
        />
      </div>
      <div className="font-[600] bg-[#fff] pb-[1rem] flex items-center justify-between">
        <div>List Users</div>
        <div className="flex gap-[1rem]">
          <Button variant="outline">
            <Filter />
            Filter
          </Button>

          <Button disabled={usersStore.usersAreLoading}>
            <Plus />
            Add User
          </Button>

          <Button
            disabled={usersStore.usersAreLoading || usersStore.usersAreFetching}
            onClick={() => usersStore.fetchUsers()}
          >
            <RefreshCw className={buttonIconClassName} />
            Reload data
          </Button>
        </div>
      </div>
      <div>
        <UsersTable
          columns={columns}
          data={usersStore.users}
          scrollable
          isLoading={usersStore.usersAreLoading || !usersStore.usersInitialized}
        />
      </div>
    </div>
  );
};

export default Users;

// sticky top-[0] z-1
