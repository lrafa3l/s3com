import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { dashboardTabs } from "./dashboardTabs";

interface InfraPageProps { 
  className?: string; 
  tab?: string
}

export default function Dashboard({
  className,
}: InfraPageProps) {
  return (
    <Tabs
      defaultValue="subscriber"
      className={cn("w-full gap-0 bg-sidebar h-[calc(100vh-70px)]", className)}
    >
      <div className="sticky top-0 z-10 flex justify-between bg-card h-[50px] border-b px-4 sm:px-8 max-w-full overflow-y-hidden overflow-x-auto no-scrollbar">
        <TabsList className="flex bg-card border-b-0 items-center h-[50px] gap-1 m-auto max-w-5xl w-full justify-between select-none">

          <div className="flex flex-wrap gap-1 h-[50px]">
            {dashboardTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger key={tab.value} value={tab.value} className="tabStyle">
                  <Icon />
                  {tab.title}
                </TabsTrigger>
              );
            })}
          </div>
        </TabsList>
      </div>

      {dashboardTabs.map(({ value, component: Component }) => (
        <TabsContent key={value} value={value}>
          <Component className="m-auto max-w-5xl py-5" />
        </TabsContent>
      ))}
    </Tabs>
  );
}
