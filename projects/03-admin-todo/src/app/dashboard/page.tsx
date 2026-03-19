import { getServerSession } from "next-auth";
import { WidgetItem } from "../../components/widget-item/WidgetItem";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/api/auth/signin')
  }
  
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
      <WidgetItem title="Global Activities" value="User" percentage={2} comparedTo={JSON.stringify(session.user)} />
      <WidgetItem title="New Users" value="1,234" percentage={5} comparedTo="last week" />
      <WidgetItem title="Total Revenue" value="$45,678" percentage={10} comparedTo="last week" />
    </div>
  );
}
