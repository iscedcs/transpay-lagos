"use server"

import { db } from "@/lib/db"

export const getWaiverDueToDisablementById = async (vehicleId: string) => {
  const today = new Date()

  const activeWaiver = await db.vehicleWaiver.findFirst({
    where: {
      reason: "DISABLED",
      status: "APPROVED",
      vehicleId,
      startDate: { lte: today },
      endDate: { gte: today },
    },
  })

  if (!activeWaiver) {
    return null
  }

  const daysLeft = Math.ceil((activeWaiver.endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const totalDuration = Math.ceil(
    (activeWaiver.endDate.getTime() - activeWaiver.startDate.getTime()) / (1000 * 60 * 60 * 24),
  )
  const isExpiringSoon = daysLeft <= 30

  const waiverInfo = {
    id: activeWaiver.id,
    createdAt: activeWaiver.createdAt.toISOString(),
    updatedAt: activeWaiver.updatedAt.toISOString(),
    deletedAt: activeWaiver.deletedAt ? activeWaiver.deletedAt.toISOString() : null,
    reason: activeWaiver.reason,
    additionalInfo: activeWaiver.additionalInfo,
    startDate: activeWaiver.startDate.toISOString().split("T")[0], // YYYY-MM-DD format
    endDate: activeWaiver.endDate.toISOString().split("T")[0], // YYYY-MM-DD format
    status: activeWaiver.status,
    vehicleId: activeWaiver.vehicleId,
    approvedById: activeWaiver.approvedById,
    daysLeft,
    totalDuration,
    isExpiringSoon,
  }

  return waiverInfo
}