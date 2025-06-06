import QRScan from '@/components/pages/admin/scan';
import GreenSearchVehicle from '@/components/pages/green/search-vehicle';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { getGreenAgent } from '@/lib/controllers/agent-controller';
import { notFound } from 'next/navigation';

export default async function GreenEnginePage() {
	const user: IUser | undefined = await getGreenAgent();
	if (!user) return notFound();
	return (
		<div className='w-full p-3 md:p-5 flex flex-col gap-5'>
			<div className=' text-title2Bold md:text-h5Bold'>
				Welcome Back, {user.name}
			</div>
			<div className='w-full'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full'>
					<Dialog>
						<DialogTrigger>
							<Card className='bg-secondary overflow-hidden h-full  shadow-md hover:shadow-xl transition-all'>
								<CardContent className='p-3'>
									<div className='flex flex-col gap-1.5'>
										<div className=' text-bodyBold uppercase'>
											Search Vehicle
										</div>
									</div>
								</CardContent>
							</Card>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[425px]'>
							<GreenSearchVehicle />
						</DialogContent>
					</Dialog>
					<Dialog>
						<DialogTrigger>
							<Card className='bg-secondary overflow-hidden h-full  shadow-md hover:shadow-xl transition-all'>
								<CardContent className='p-3'>
									<div className='flex flex-col gap-1.5'>
										<div className=' text-bodyBold uppercase'>
											Scan Plate
										</div>
									</div>
								</CardContent>
							</Card>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[425px]'>
							<div className='p-3 md:p-5'>
								<QRScan role={user.role} />
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</div>
			<Separator />
			<div className='w-full'>
				<div className=''>
					You have added trackers to 12 vehicles in total
				</div>
			</div>
		</div>
	);
}
