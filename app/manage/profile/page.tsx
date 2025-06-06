import { InformationCard } from '@/components/layout/informationCard';
import { ADDRESS_INFORMATION, PERSONAL_INFORMATION } from '@/lib/const';
import Image from 'next/image';

export default function ProfilePage() {
	return (
		<div className='flex flex-col gap-6 px-5 w-screen pb-20'>
			<div className='mt-[20px]'>
				<h3 className='text-h4Bold'>{`My Profile`}</h3>
				<p className='text-title1 text-gray-500'>
					{`View and edit your personal information`}
				</p>
			</div>

			<div className='bg-secondary lg:w-[926px] lg:text-left text-center items-center  rounded-[20px] py-[30px] lg:pl-5 flex gap-7 flex-col lg:flex-row'>
				<Image
					src='/avater2.png'
					alt='avater'
					width='90'
					height='90'
				/>
				<div className='flex flex-col gap-2'>
					<h2 className='text-h5Bold'>{`Agent ISCE`}</h2>
					<p className='text-title1Bold text-gray-500'>
						{`Isaac Emperor`}
					</p>
					<p className='text-title1 text-gray-400'>
						{`No 14, Agbero Road, Anambra`}
					</p>
				</div>
			</div>
			<InformationCard
				header='Personal Details'
				link=''
				info={PERSONAL_INFORMATION}
			/>

			<InformationCard
				header='Address'
				link=''
				info={ADDRESS_INFORMATION}
			/>
		</div>
	);
}
