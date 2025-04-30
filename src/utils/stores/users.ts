import { User } from "@/app/(protected)/users/UsersTable/columns";
import { create } from "zustand";

type UsersStore = {
  users: User[];
  fetchUsers: () => Promise<void>;
  usersAreLoading: boolean;
  usersAreFetching: boolean;
  usersInitialized: boolean;
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
      company: getRandomItem(companies),
      priority: Math.floor(Math.random() * 4), // 0–3
      status: Math.floor(Math.random() * 3), // 0–2
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
