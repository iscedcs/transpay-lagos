'use server'

import { db } from "@/lib/db";

export async function getGroupsAction(page: number = 1, pageSize: number = 20) {

    const [vehicle_groups, totalCount] = await db.$transaction([
         db.vehicleGroup.findMany({
              select: {
                   id: true,
                  groupName: true,
                  totalCharge: true,
                  _count: true,
                  Vehicle: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
              },
              skip: (page - 1) * pageSize,
              take: pageSize,
              orderBy: { createdAt: "desc" },
         }),
         db.vehicleGroup.count()
    ]);

    return {
        vehicle_groups,
         pagination: {
              page,
              pageSize,
              totalCount,
              totalPages: Math.ceil(totalCount / pageSize),
         },
    };
}
export async function getGroupsByName() {

    const [groupName] = await db.$transaction([
         db.vehicleGroup.findMany({
              select: {
                  groupName: true,
                  
              },

         }),
    ]);

    return {
        groupName,
        
    };
}
export async function getGroupsId(page: number = 1, pageSize: number = 20, id: string) {

    const [vehicle_groups, totalCount] = await db.$transaction([
         db.vehicleGroup.findMany({
              select: {
                   id: true,
                  groupName: true,
                  totalCharge: true,
                  _count: true,
                  Vehicle: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
              },
              skip: (page - 1) * pageSize,
              take: pageSize,
              orderBy: { createdAt: "desc" },
         }),
         db.vehicleGroup.count(),
    ]);

    return {
        vehicle_groups,
        id,
         pagination: {
              page,
              pageSize,
              totalCount,
              totalPages: Math.ceil(totalCount / pageSize),
         },
    };
}
export async function getGroupById(id?: string) {
     if (!id) return null
     try {
          const group = await db.vehicleGroup.findUnique({
               where: { id },
               select: {
                    Vehicle: true,
                    _count: true,
                    createdAt: true,
                    deletedAt: true,
                    groupName: true,
                    id: true,
                    totalCharge: true,
                    updatedAt: true
               }
          })
          return group
     } catch (error) {
          return null
     }
}

export async function getGroups() {
     try {
          const groups = await db.vehicleGroup.findMany({
               select: {
                    groupName: true,
                    id: true,
               }
          })
          return groups
     } catch (error) {
          return null
     }
}
