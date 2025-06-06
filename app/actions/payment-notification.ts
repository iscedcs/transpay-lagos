"use server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import moment from "moment";

export type PaymentNotificationFilter = {
  startDate?: Date;
  endDate?: Date;
  search?: string;
  plateNumber?: string;
  revenueCode?: string;
};

const REVENUE_TYPES = {
  CVOF: "29001001-12040682",
  FAREFLEX: "20008001-12040411",
  ISCE: "20008001-12040632",
};

type RevenueType = keyof typeof REVENUE_TYPES;

export async function getPaymentNotification(
  page: number = 1,
  pageSize: number = 10,
  filter: PaymentNotificationFilter = {}
) {
  const where: Prisma.PaymentNotificationWhereInput = {};

  if (filter.startDate && filter.endDate) {
    where.paymentDate = {
      gte: filter.startDate,
      lte: filter.endDate,
    };
  }

  if (filter.search) {
    where.OR = [
      { paymentReference: { contains: filter.search, mode: "insensitive" } },
      { customerName: { contains: filter.search, mode: "insensitive" } },
    ];
  }

  if (filter.revenueCode) {
    where.revenueCode = { equals: filter.revenueCode, mode: "insensitive" };
  }

  const [notifications, totalCount] = await db.$transaction([
    db.paymentNotification.findMany({
      where,
      select: {
        id: true,
        paymentReference: true,
        customerName: true,
        paymentDate: true,
        amount: true,
        revenueName: true,
        revenueCode: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { paymentDate: "desc" },
    }),
    db.paymentNotification.count({ where }),
  ]);

  return {
    notifications,
    pagination: {
      page,
      pageSize,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  };
}
export async function getPaymentNotificationByReference(
  paymentReference: string
) {
  return db.paymentNotification.findFirst({
    where: { paymentReference: paymentReference },
    include: {
      Vehicle: true,
    },
  });
}

export async function getPaymentNotificationByRevenueCode(
  revenueCode: string,
  page: number = 1,
  pageSize: number = 10
) {
  const [notifications, totalCount] = await db.$transaction([
    db.paymentNotification.findMany({
      where: { revenueCode: revenueCode },
      select: {
        id: true,
        paymentReference: true,
        customerName: true,
        paymentDate: true,
        amount: true,
        revenueName: true,
        revenueCode: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { paymentDate: "desc" },
    }),
    db.paymentNotification.count({ where: { revenueCode: revenueCode } }),
  ]);

  return {
    notifications,
    pagination: {
      page,
      pageSize,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  };
}

export async function getPaymentNotificationById(id: string) {
     return db.paymentNotification.findUnique({
          where: { id },
          include: {
               Vehicle: true,
          },
     });
}

export async function getPaymentTotalsOld(startDate?: Date, endDate?: Date) {
     const now = moment().toDate();
     const startOfDay = moment().startOf("day").toDate();
     const startOfWeek = moment().startOf("week").toDate();
     const startOfMonth = moment().startOf("month").toDate();
     const startOfYear = moment().startOf("year").toDate();

     const [allTimeTotal, yearToDateTotal, monthToDateTotal, weekToDateTotal, dayToDateTotal, customRangeTotal] = await db.$transaction([
          db.paymentNotification.aggregate({
               _sum: { amount: true },
          }),
          db.paymentNotification.aggregate({
               _sum: { amount: true },
               where: { paymentDate: { gte: startOfYear } },
          }),
          db.paymentNotification.aggregate({
               _sum: { amount: true },
               where: { paymentDate: { gte: startOfMonth } },
          }),
          db.paymentNotification.aggregate({
               _sum: { amount: true },
               where: { paymentDate: { gte: startOfWeek } },
          }),
          db.paymentNotification.aggregate({
               _sum: { amount: true },
               where: { paymentDate: { gte: startOfDay } },
          }),
          db.paymentNotification.aggregate({
               _sum: { amount: true },
               where: {
                    paymentDate: {
                         gte: moment(startDate ?? now)
                              .startOf("hour")
                              .toDate(),
                         lte: moment(endDate ?? now)
                              .endOf("hour")
                              .toDate(),
                    },
               },
          }),
     ]);

     return {
          allTimeTotal: allTimeTotal._sum.amount || 0,
          yearToDateTotal: yearToDateTotal._sum.amount || 0,
          monthToDateTotal: monthToDateTotal._sum.amount || 0,
          weekToDateTotal: weekToDateTotal._sum.amount || 0,
          dayToDateTotal: dayToDateTotal._sum.amount || 0,
          customRangeTotal: customRangeTotal._sum.amount ?? 0,
     };
}

export async function getPaymentTotals({endDate,revenueType,startDate}:{startDate?: Date, endDate?: Date, revenueType?: RevenueType}) {
  const now = moment().toDate()
  const startOfDay = moment().startOf("day").toDate()
  const startOfWeek = moment().startOf("week").toDate()
  const startOfMonth = moment().startOf("month").toDate()
  const startOfYear = moment().startOf("year").toDate()

  // Create a base where clause
  const baseWhereClause: any = {}
  if (revenueType) {
    baseWhereClause.revenueCode = { startsWith: REVENUE_TYPES[revenueType] }
  }

  const [allTimeTotal, yearToDateTotal, monthToDateTotal, weekToDateTotal, dayToDateTotal, customRangeTotal] =
    await db.$transaction([
      db.paymentNotification.aggregate({
        _sum: { amount: true },
        where: baseWhereClause,
      }),
      db.paymentNotification.aggregate({
        _sum: { amount: true },
        where: {
          ...baseWhereClause,
          paymentDate: { gte: startOfYear },
        },
      }),
      db.paymentNotification.aggregate({
        _sum: { amount: true },
        where: {
          ...baseWhereClause,
          paymentDate: { gte: startOfMonth },
        },
      }),
      db.paymentNotification.aggregate({
        _sum: { amount: true },
        where: {
          ...baseWhereClause,
          paymentDate: { gte: startOfWeek },
        },
      }),
      db.paymentNotification.aggregate({
        _sum: { amount: true },
        where: {
          ...baseWhereClause,
          paymentDate: { gte: startOfDay },
        },
      }),
      db.paymentNotification.aggregate({
        _sum: { amount: true },
        where: {
          ...baseWhereClause,
          paymentDate: {
            gte: moment(startDate ?? now)
              .startOf("hour")
              .toDate(),
            lte: moment(endDate ?? now)
              .endOf("hour")
              .toDate(),
          },
        },
      }),
    ])

  return {
    allTimeTotal: allTimeTotal._sum.amount || 0,
    yearToDateTotal: yearToDateTotal._sum.amount || 0,
    monthToDateTotal: monthToDateTotal._sum.amount || 0,
    weekToDateTotal: weekToDateTotal._sum.amount || 0,
    dayToDateTotal: dayToDateTotal._sum.amount || 0,
    customRangeTotal: customRangeTotal._sum.amount ?? 0,
  }
}

export async function getChatData(frequency: 'all' | 'yearly' | 'monthly' | 'weekly' | 'daily', date: Date) {
  let startDate: Date
  let endDate: Date
  let groupBy: string

  switch (frequency) {
    case 'all':
      startDate = new Date(0) // Beginning of time
      endDate = new Date()
      groupBy = 'year'
      break
    case 'yearly':
      startDate = moment(date).startOf('year').toDate()
      endDate = moment(date).endOf('year').toDate()
      groupBy = 'month'
      break
    case 'monthly':
      startDate = moment(date).startOf('month').toDate()
      endDate = moment(date).endOf('month').toDate()
      groupBy = 'week'
      break
    case 'weekly':
      startDate = moment(date).startOf('week').toDate()
      endDate = moment(date).endOf('week').toDate()
      groupBy = 'day'
      break
    case 'daily':
      startDate = moment(date).startOf('day').toDate()
      endDate = moment(date).endOf('day').toDate()
      groupBy = 'hour'
      break
  }

  const transactions = await db.paymentNotification.findMany({
    where: {
      paymentDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      paymentDate: true,
      amount: true,
    },
    orderBy: {
      paymentDate: 'asc',
    },
  })

  const total = transactions.reduce((sum, transaction) => sum + Number(transaction.amount), 0)

  let chartData: { date: string; amount: number }[] = []

  if (frequency === 'daily') {
    // For daily, we want to show data in 2-hour intervals
    for (let i = 0; i < 24; i += 1) {
      const hourStart = moment(date).startOf('day').add(i, 'hours')
      const hourEnd = moment(date).startOf('day').add(i + 1, 'hours')
      const amount = transactions
        .filter(t => moment(t.paymentDate).isBetween(hourStart, hourEnd))
        .reduce((sum, t) => sum + Number(t.amount), 0)
      chartData.push({ date: hourStart.toISOString(), amount })
    }
  } else {
    chartData = transactions.reduce((acc, transaction) => {
      const key = moment(transaction.paymentDate).startOf(groupBy as moment.unitOfTime.StartOf).format('YYYY-MM-DD HH:mm:ss')
      const existingEntry = acc.find(entry => entry.date === key)
      if (existingEntry) {
        existingEntry.amount += Number(transaction.amount)
      } else {
        acc.push({ date: key, amount: Number(transaction.amount) })
      }
      return acc
    }, [] as { date: string; amount: number }[])
  }

  return {
    total,
    chartData,
  }
}

