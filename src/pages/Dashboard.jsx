import DashboardCards from "../components/DashboardCards";
import SalesChart from "../components/SalesChart";
import RecentActivity from "../components/RecentActivity";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <DashboardCards />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SalesChart />
        <RecentActivity />
      </div>
    </div>
  );
}
