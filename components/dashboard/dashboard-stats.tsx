import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { STATE_CONFIG } from "@/lib/constants"
import type { DashboardStats } from "@/types/dashboard"

interface DashboardStatsProps {
  stats: DashboardStats
  role: string
}

export function DashboardStatsCards({ stats, role }: DashboardStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: STATE_CONFIG.currency,
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-NG").format(num)
  }

  const getTrendIcon = (current: number, target: number) => {
    if (current > target) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (current < target * 0.8) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Minus className="h-4 w-4 text-yellow-600" />
  }

  const getStatsForRole = () => {
    switch (role) {
      case "super_admin":
        return [
          {
            title: "Total Revenue",
            value: formatCurrency(stats.totalRevenue),
            subtitle: `Target: ${formatCurrency(STATE_CONFIG.monthlyRevenueTarget)}`,
            icon: getTrendIcon(stats.totalRevenue, STATE_CONFIG.monthlyRevenueTarget),
          },
          {
            title: "Registered Vehicles",
            value: formatNumber(stats.totalVehicles),
            subtitle: "Across all states",
            icon: <TrendingUp className="h-4 w-4 text-green-600" />,
          },
          {
            title: "Compliance Rate",
            value: `${stats.complianceRate}%`,
            subtitle: `Target: ${STATE_CONFIG.complianceThreshold}%`,
            icon: getTrendIcon(stats.complianceRate, STATE_CONFIG.complianceThreshold),
          },
          {
            title: "Active Users",
            value: formatNumber(stats.activeUsers),
            subtitle: "System-wide",
            icon: <TrendingUp className="h-4 w-4 text-green-600" />,
          },
        ]

      case "admin":
        return [
          {
            title: "State Revenue",
            value: formatCurrency(stats.totalRevenue),
            subtitle: "This month",
            icon: getTrendIcon(stats.totalRevenue, STATE_CONFIG.monthlyRevenueTarget),
          },
          {
            title: "Vehicles Registered",
            value: formatNumber(stats.totalVehicles),
            subtitle: `${STATE_CONFIG.name}`,
            icon: <TrendingUp className="h-4 w-4 text-green-600" />,
          },
          {
            title: "Compliance Rate",
            value: `${stats.complianceRate}%`,
            subtitle: "State average",
            icon: getTrendIcon(stats.complianceRate, STATE_CONFIG.complianceThreshold),
          },
          {
            title: "Active Agents",
            value: formatNumber(stats.activeUsers),
            subtitle: "Across LGAs",
            icon: <TrendingUp className="h-4 w-4 text-green-600" />,
          },
        ]

      case "lga_admin":
        return [
          {
            title: "LGA Revenue",
            value: formatCurrency(stats.totalRevenue),
            subtitle: "This month",
            icon: <TrendingUp className="h-4 w-4 text-green-600" />,
          },
          {
            title: "Registered Vehicles",
            value: formatNumber(stats.totalVehicles),
            subtitle: "In your LGA",
            icon: <TrendingUp className="h-4 w-4 text-green-600" />,
          },
          {
            title: "Compliance Rate",
            value: `${stats.complianceRate}%`,
            subtitle: "LGA average",
            icon: getTrendIcon(stats.complianceRate, STATE_CONFIG.complianceThreshold),
          },
          {
            title: "Active Agents",
            value: formatNumber(stats.activeUsers),
            subtitle: "In your LGA",
            icon: <TrendingUp className="h-4 w-4 text-green-600" />,
          },
        ]

      case "lga_agent":
        return [
          {
            title: "Pending Tasks",
            value: formatNumber(stats.pendingTasks || 0),
            subtitle: "Assigned to you",
            icon: <Minus className="h-4 w-4 text-yellow-600" />,
          },
          {
            title: "Today's Scans",
            value: formatNumber(stats.todayScans || 0),
            subtitle: "Vehicles scanned",
            icon: <TrendingUp className="h-4 w-4 text-green-600" />,
          },
          {
            title: "Registrations",
            value: formatNumber(stats.totalVehicles),
            subtitle: "By you this month",
            icon: <TrendingUp className="h-4 w-4 text-green-600" />,
          },
          {
            title: "Compliance Rate",
            value: `${stats.complianceRate}%`,
            subtitle: "Your area",
            icon: getTrendIcon(stats.complianceRate, STATE_CONFIG.complianceThreshold),
          },
        ]

      case "lga_compliance":
        return [
          {
            title: "Today's Scans",
            value: formatNumber(stats.todayScans || 0),
            subtitle: "Compliance checks",
            icon: <TrendingUp className="h-4 w-4 text-green-600" />,
          },
          {
            title: "Violations Found",
            value: formatNumber(stats.pendingTasks || 0),
            subtitle: "This week",
            icon: <TrendingDown className="h-4 w-4 text-red-600" />,
          },
          {
            title: "Compliance Rate",
            value: `${stats.complianceRate}%`,
            subtitle: "Your patrol area",
            icon: getTrendIcon(stats.complianceRate, STATE_CONFIG.complianceThreshold),
          },
          {
            title: "Active Vehicles",
            value: formatNumber(stats.totalVehicles),
            subtitle: "In your area",
            icon: <TrendingUp className="h-4 w-4 text-green-600" />,
          },
        ]

      case "vehicle_owner":
        return [
          {
            title: "My Vehicles",
            value: formatNumber(stats.totalVehicles),
            subtitle: "Registered",
            icon: <TrendingUp className="h-4 w-4 text-green-600" />,
          },
          {
            title: "Compliance Status",
            value: `${stats.complianceRate}%`,
            subtitle: "Of my vehicles",
            icon: getTrendIcon(stats.complianceRate, 100),
          },
          {
            title: "Outstanding Balance",
            value: formatCurrency(stats.totalRevenue),
            subtitle: "Due payments",
            icon: <Minus className="h-4 w-4 text-yellow-600" />,
          },
          {
            title: "Last Payment",
            value: "2 days ago",
            subtitle: "Most recent",
            icon: <TrendingUp className="h-4 w-4 text-green-600" />,
          },
        ]

      default:
        return []
    }
  }

  const statsToShow = getStatsForRole()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsToShow.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
