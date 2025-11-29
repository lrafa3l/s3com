import {
  LayoutDashboard,
  MailCheck,
  Newspaper,
  User2Icon,
  User as userIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import Overview from "./tabs/overview";
import { Button } from "../ui/button";
import Subscriber from "./tabs/subscriber";
import Service from "./tabs/service";
import User from "./tabs/user";

interface InfraPageProps {
  className?: string;
  data?: any;
  tab?: string;
}

export default function Dashboard({
  className,
  tab = "overview",
}: InfraPageProps) {
  return (
    <Tabs
      defaultValue={tab}
      className={cn("w-full gap-0 bg-sidebar h-[calc(100vh-70px)]", className)}
    >
      {/* Cabeçalho fixo */}
      <div className="sticky top-0 z-10 flex justify-between bg-card  h-[50px] border-b px-4 sm:px-8 max-w-full overflow-y-hidden overflow-x-auto no-scrollbar">
        <TabsList className="flex bg-card border-b-0 items-center h-[50px] gap-1 m-auto max-w-5xl w-full justify-between select-none">
          <div className="flex flex-wrap gap-1 h-[50px]">
            <TabsTrigger value="overview" className="tabStyle">
              <LayoutDashboard /> Overview
            </TabsTrigger>

            <TabsTrigger value="subscriber" className="tabStyle">
              <MailCheck /> Subscriber
            </TabsTrigger>

            <TabsTrigger value="article" className="tabStyle">
              <Newspaper /> Article
            </TabsTrigger>

            <TabsTrigger value="service" className="tabStyle">
              <LayoutDashboard /> Service
            </TabsTrigger>

            <TabsTrigger value="user" className="tabStyle">
              <User2Icon /> User
            </TabsTrigger>
          </div>

          <div className="hidden sm:block">
            <Button variant="outline">Dashboard</Button>
          </div>
        </TabsList>
      </div>

      {/* Conteúdos das abas */}
      <TabsContent value="overview">
        <Overview className="m-auto max-w-5xl" />
      </TabsContent>

      <TabsContent value="subscriber">
        <Subscriber className="m-auto max-w-5xl py-5" />
      </TabsContent>

      {/* Abas adicionais — placeholders */}
      <TabsContent value="article">
        <div className="m-auto max-w-5xl p-6 text-muted-foreground">
          <p>Área de gerenciamento de artigos.</p>
        </div>
      </TabsContent>

      <TabsContent value="service">
        <Service className="m-auto py-5" />
      </TabsContent>

      <TabsContent value="user">
        <User />
      </TabsContent>
    </Tabs>
  );
}
