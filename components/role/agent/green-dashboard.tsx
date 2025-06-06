import DashboardCard from "@/components/layout/dashboard-card";
import { AGENT_DASHBOARD_CARD } from "@/lib/const";

export default async function DashboardGreen() {
     return (
          <div>
               <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {AGENT_DASHBOARD_CARD.map((card: DashboardCardI, i) => (
                         <DashboardCard
                              key={i}
                              name={card.name}
                              image={card.image}
                              href={card.href}
                              description={card.description}
                              number={card.number}
                              icon={card.icon}
                         />
                    ))}
               </div>
               {/* garri */}
          </div>
     );
}
