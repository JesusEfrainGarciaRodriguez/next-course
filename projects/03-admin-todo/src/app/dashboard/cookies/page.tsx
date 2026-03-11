import { TabBar } from "@/src/components/tab/TabBar";
import { Metadata } from "next";
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Cookies',
  description: 'Manage your cookies settings and preferences.',
};

export default async function CookiesPage() {
  const cookieStore = await cookies()
  const cookieTab = cookieStore.get('selectedTab')?.value ?? '1'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
            <span className="text-3xl">Tabs</span>
            <TabBar currentTab={+cookieTab} />
        </div>
    </div>
  );
}