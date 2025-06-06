'use client';
import React from 'react';
import { Button } from '../ui/button';
import { CopyCheck, CopyIcon } from 'lucide-react';

export const CopyButton = ({
	text,
	label,
}: {
	text: string;
	label: string;
}) => {
	const [copied, setCopied] = React.useState<boolean>(false);
	return (
		<Button
			className='w-full'
			onClick={() => {
				navigator.clipboard.writeText(text);
				setCopied(true);
				setTimeout(() => {
					setCopied(false);
				}, 2000);
			}}
		>
			{copied ? (
				<div className='flex gap-2 items-center'>
					<CopyCheck className='h-4 w-4' />
					Copied
				</div>
			) : (
				<div className='flex gap-2 items-center'>
					<CopyIcon className='h-4 w-4' /> {label}
				</div>
			)}
		</Button>
	);
};
