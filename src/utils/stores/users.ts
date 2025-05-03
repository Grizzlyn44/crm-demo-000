import {
  Priority,
  Status,
  User,
} from "@/app/(protected)/users/UsersTable/columns";
import { create } from "zustand";
import { FormData } from "@/app/(protected)/users/[id]/page";

type UsersStore = {
  users: User[];
  fetchUsers: () => Promise<void>;
  usersAreLoading: boolean;
  usersAreFetching: boolean;
  usersInitialized: boolean;
  updateUser: (userId: number, formData: FormData) => Promise<void>; //because of mock
};

const getRandomDate = (start: Date, end: Date): string => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0]; // formát YYYY-MM-DD
};

const getRandomItem = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const priorities = Object.values(Priority);
const statuses = Object.values(Status);

const getData = async (): Promise<User[]> => {
  const users: User[] = [];

  const companies = [
    "Company A",
    "Company B",
    "Company C",
    "Company D",
    "Company E",
  ];
  const startDate = new Date("2020-01-01");
  const endDate = new Date("2025-01-01");

  for (let i = 1; i <= 55; i++) {
    users.push({
      id: i,
      name: `Test User ${i}`,
      email: `test.user${i}@example.com`,
      createdAt: getRandomDate(startDate, endDate),
      updatedAt: getRandomDate(startDate, endDate),
      company: getRandomItem(companies),
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }

  return users;
};

export const useUserStore = create<UsersStore>((set, get) => ({
  users: [],
  fetchUsers: async () => {
    // Simulate an API call to fetch users
    set({ usersAreLoading: !get().usersInitialized, usersAreFetching: true });
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve(getData()), 3500)
    );
    set({
      users: response as User[],
      usersAreLoading: false,
      usersAreFetching: false,
      usersInitialized: true,
    });
  },
  updateUser: async (userId: number, formData: FormData) => {
    const foundUser = get().users.find((user) => user.id === userId);

    if (foundUser) {
      foundUser.name = formData.name;
      foundUser.email = formData.email;
      // foundUser.company = formData.company;
      foundUser.priority = formData.priority;
      foundUser.status = formData.status;

      const newUsers = [...get().users];
      const index = newUsers.findIndex((user) => user.id === userId);
      newUsers[index] = foundUser;

      console.log("newUsers", newUsers);

      set({ users: newUsers });
    }

    await new Promise((resolve) => setTimeout(() => resolve(true), 1500));

    // return response;

    // const foundUser = get().users.find((user) => user.id === userId);

    // set((state) => ({
    //   // users: state.users.map((user) =>
    //   //   user.id === userId ? { ...user, ...formData } : user
    //   // ),
    //   const foundUser = state.users.find((user) => user.id === userId);
    //   // if (foundUser) {
    //   //   foundUser.name = formData.name;
    //   //   foundUser.email = formData.email;
    //   //   foundUser.company = formData.company;
    //   //   foundUser.priority = formData.priority;
    //   //   foundUser.status = formData.status;
    //   // set({ users: [...state.users] });
    //   // }
    // }));
  },
  usersAreLoading: false,
  usersAreFetching: false,
  usersInitialized: false,

  //   setUsers: (users: string[]) => set({ users }),

  //   addUser: (user) =>
  //     set((state) => ({
  //       users: [...state.users, user],
  //     })),

  //   removeUser: (id) =>
  //     set((state) => ({
  //       users: state.users.filter((user) => user.id !== id),
  //     })),

  //   updateUser: (updatedUser) =>
  //     set((state) => ({
  //       users: state.users.map((user) =>
  //         user.id === updatedUser.id ? updatedUser : user
  //       ),
  //     })),
}));
