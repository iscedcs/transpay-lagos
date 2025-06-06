import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<Promise<{ id: string }>> }) {

     const session = await auth();
     if (!session || session.user.role !== "SUPERADMIN") {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }

     const vehicleWallet = await db.vehicleWallet.findUnique({
          where: { vehicleId: (await params).id },
          include: { Vehicle: true },
     });

     if (!vehicleWallet) {
          return NextResponse.json({ error: "Vehicle wallet not found" }, { status: 404 });
     }

     return NextResponse.json(vehicleWallet);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
     const session = await auth();
     if (!session || session.user.role !== "SUPERADMIN") {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }

     const data = await request.json();

     const updatedWallet = await db.vehicleWallet.update({
          where: { vehicleId: (await params).id },
          data: {
               walletBalance: data.wallet_balance,
               amountOwed: data.amount_owed,
               netTotal: data.net_total,
               nextTransactionDate: new Date(data.next_transaction_date),
               cvofBalance: data.cvof_balance,
               fareflexBalance: data.fareflex_balance,
               isceBalance: data.isce_balance,
               cvofOwing: data.cvof_owing,
               fareflexOwing: data.fareflex_owing,
               isceOwing: data.isce_owing,
          },
     });

     return NextResponse.json(updatedWallet);
}
