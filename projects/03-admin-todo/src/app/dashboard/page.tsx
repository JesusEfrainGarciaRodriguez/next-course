import { WidgetItem } from "../../components/widget-item/WidgetItem";

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Global Activities" value="$23,988" percentage={2} comparedTo="last week" />
      <WidgetItem title="New Users" value="1,234" percentage={5} comparedTo="last week" />
      <WidgetItem title="Total Revenue" value="$45,678" percentage={10} comparedTo="last week" />
    </div>
  );
}
