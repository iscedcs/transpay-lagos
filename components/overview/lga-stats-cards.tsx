import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Car, Shield, Users, QrCode, Banknote } from "lucide-react"
import Link from "next/link"
import type { KPIStats } from "@/types/overview"

interface LGAStatsCardsProps {
  stats: KPIStats
}

export function LGAStatsCards({ stats }: LGAStatsCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-NG").format(num)
  }

  const statsData = [
    {
      title: "Registered Vehicles",
      value: formatNumber(stats.totalVehicles),
      subtitle: "In this LGA",
      icon: <Car className="h-4 w-4" />,
      trend: <TrendingUp className="h-4 w-4 text-green-600" />,
      link: "/dashboard/vehicles",
    },
    {
      title: "Compliance Rate",
      value: `${stats.compliancePercentage}%`,
      subtitle: `${formatNumber(stats.compliantVehicles)} compliant`,
      icon: <Shield className="h-4 w-4" />,
      trend:
        stats.compliancePercentage >= 85 ? (
          <TrendingUp className="h-4 w-4 text-green-600" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-600" />
        ),
      link: "/dashboard/vehicles?filter=compliance",
    },
    {
      title: "Total Collected",
      value: formatCurrency(stats.totalCollected || 0),
      subtitle: "This month",
      icon: <Banknote className="h-4 w-4" />,
      trend: <TrendingUp className="h-4 w-4 text-green-600" />,
      link: "/dashboard/payments",
    },
    {
      title: "Active Agents",
      value: formatNumber(stats.agentsActiveToday),
      subtitle: "Officers in LGA",
      icon: <Users className="h-4 w-4" />,
      trend: <TrendingUp className="h-4 w-4 text-green-600" />,
      link: "/dashboard/users?filter=agents",
    },
    {
      title: "Stickers Assigned",
      value: formatNumber(stats.stickersAssigned || 0),
      subtitle: "QR codes linked",
      icon: <QrCode className="h-4 w-4" />,
      trend: <TrendingUp className="h-4 w-4 text-green-600" />,
      link: "/dashboard/vehicles?filter=stickers",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {statsData.map((stat, index) => (
        <Link key={index} href={stat.link}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="flex items-center gap-1">
                {stat.trend}
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
