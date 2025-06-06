'use client';
import React from 'react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { useToast } from '../ui/use-toast';
import { Textarea } from '../ui/textarea';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
} from '../ui/alert-dialog';
import { successIcon } from '@/lib/icons';

const fineFormSchema = z.object({
	title: z.string(),
	category: z
		.string()
		.refine((value) => ['fine', 'penalty'].includes(value), {
			message: 'Invalid means of identification.',
		}),
	definition: z.string(),
	amount: z.number(),
});

type FineFormValues = z.infer<typeof fineFormSchema>;

export default function FineForm({
	fine,
}: {
	fine: {
		title: string;
		type: string;
		description: string;
		amount: number;
	};
}) {
	const [open, setOpen] = React.useState(false);
	const { toast } = useToast();
	const defaultValues: Partial<FineFormValues> = {
		title: fine.title,
		category: fine.type,
		definition: fine.description,
		amount: fine.amount,
	};
	const form = useForm<FineFormValues>({
		resolver: zodResolver(fineFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	function onSubmit(data: FineFormValues) {
		setOpen(true);
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>
						{JSON.stringify(data, null, 2)}
					</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4 '
			>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FormField
						name='title'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Offence Title
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='Enter title for offence'
										required
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='category'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Offence Category
								</FormLabel>

								<Select defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='relative text-body flex  items-center h-14 rounded-2xl'>
											<SelectValue placeholder='Select Category' />
										</SelectTrigger>
									</FormControl>
									<FormMessage />
									<SelectContent>
										<SelectItem value='fine'>
											Fine
										</SelectItem>
										<SelectItem value='penalty'>
											Penalty
										</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='definition'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Offence Definition
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Description of offence'
										className='resize-none'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name='amount'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Fine / Penalty
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body spin-button-none flex  items-center h-14 rounded-2xl'
										{...field}
										type='number'
										placeholder='Enter amount'
										required
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<div className='flex justify-center items-center gap-6 text-title1Bold'>
					<Button
						variant={'outline'}
						size='lg'
						type='button'
						asChild
						className='p-4 py-2 rounded-normal w-32'
					>
						<Link href={'/fines/'}>Cancel</Link>
					</Button>
					<Button
						variant={'default'}
						size='lg'
						type='submit'
						className='p-4 py-2 rounded-normal w-32'
					>
						Save Changes
					</Button>
				</div>
				<AlertDialog
					open={open}
					onOpenChange={setOpen}
				>
					<AlertDialogContent className='bg-secondary'>
						<div className='w-60 mx-auto flex-col'>
							<div className='flex flex-col items-center gap-5 mb-5'>
								<div className='h-20 w-20 text-awesome-foreground'>
									{successIcon}
								</div>
								<div className='text-xl'>
									Agent Account Created
								</div>
							</div>
							<div className='flex flex-col text-center mb-5'>
								<div>
									Fine Category:{' '}
									{form.getValues().category}
								</div>
								<div>
									Fine Title:{' '}
									{form.getValues().title}
								</div>
								<div>
									Fine Fee: {form.getValues().amount}
								</div>
							</div>
							<div className='flex flex-col gap-3'>
								<AlertDialogAction
									asChild
									className='rounded-xl'
								>
									<Link href={`/agents/agentid`}>
										View Account
									</Link>
								</AlertDialogAction>
								<AlertDialogCancel
									asChild
									className='rounded-xl'
								>
									<Link href={`/agents`}>
										Dashboard
									</Link>
								</AlertDialogCancel>
							</div>
						</div>
					</AlertDialogContent>
				</AlertDialog>
			</form>
		</Form>
	);
}
