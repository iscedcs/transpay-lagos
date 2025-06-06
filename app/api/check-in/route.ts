import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const plate = searchParams.get('plate');
	try {
		const vehicle =
			await sql<IInterStateVehicle>`SELECT * from INTERSTATE where plate=${plate}`;
		const v = vehicle.rows[0];
		return NextResponse.json({ v }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
