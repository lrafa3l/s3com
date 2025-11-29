import {
    LayoutDashboard,
    MailCheck,
    User2Icon,
} from "lucide-react";

import Subscriber from "./tabs/subscriber";
import Service from "./tabs/service";
import User from "./tabs/user";

export const dashboardTabs = [
    {
        value: "subscriber",
        title: "Inscritos",
        icon: MailCheck,
        component: Subscriber,
    },
    {
        value: "service",
        title: "Serviços",
        icon: LayoutDashboard,
        component: Service,
    },
    {
        value: "user",
        title: "Conta",
        icon: User2Icon,
        component: User,
    },
    
];