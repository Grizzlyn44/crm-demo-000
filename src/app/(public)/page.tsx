import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>Login screen@TBD</div>
      <div>
        <Link href="/dashboard">
          <Button>Proceed to dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
