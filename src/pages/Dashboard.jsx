import DashboardCards from "../components/DashboardCards";
import SalesChart from "../components/SalesChart";
import RevenueChart from "../components/RevenueChart";
import TrafficChart from "../components/TrafficChart";
import CategoryPie from "../components/CategoryPie";
import RecentActivity from "../components/RecentActivity";
import IranMap from "../components/IranMap";
export default function Dashboard() {
  return (
    <div className="space-y-6">
      <DashboardCards />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SalesChart />
        <RevenueChart />
        <IranMap />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <TrafficChart />
        <CategoryPie />
        <RecentActivity />
      </div>
    </div>
  );
}
