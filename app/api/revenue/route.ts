import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
// REVENUE REPORT

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const type = searchParams.get('type');
		const startDate = searchParams.get('startDate');
		const endDate = searchParams.get('endDate');

		// const vehicleResult = await db
		// 	.select(filters)
		// 	.from(vehicle)
		// 	.limit(limit);

		return NextResponse.json(
			{ name: 'REVENUE REPORT', type, startDate, endDate },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
