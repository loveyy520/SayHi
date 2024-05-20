import QuillEditor from '@/components/editors/quill-editor'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import CalendarCaption from '@/components/ui/calendar-caption'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { type getDictionary } from '@/i18n'
import { EmploymentHistoryType } from '@/types/resume'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import EmploymentHistoryBox from './employment-history-box'
import SectionTitle from './section-title'

interface EmploymentHistoryProps {
	dictionary: Awaited<ReturnType<typeof getDictionary>>
	data: EmploymentHistoryType[]
	setData: (data: EmploymentHistoryType[]) => void
}

const defaultValues: EmploymentHistoryType = {
	companyName: '',
	industry: '',
	department: '',
	position: '',
	startAndEndDate: [new Date(), new Date()],
	workContent: '',
	workAchievements: '',
	workSkills: '',
}

const WorkExperience: NextPage<EmploymentHistoryProps> = ({
	dictionary,
	data,
	setData,
}) => {
	const [isEditing, setIsEditing] = useState(false)
	const formSchema = z.object({
		companyName: z.string().min(1, {
			message: dictionary.resume['Company name is required.'],
		}),
		industry: z.string().optional(),
		department: z.string().optional(),
		position: z.string(),
		startAndEndDate: z.tuple([z.date(), z.date()]),
		workContent: z.string().min(1, {
			message: dictionary.resume['Work content is required.'],
		}),
		workAchievements: z.string().optional(),
		workSkills: z.string().optional(),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		currentEditingIndex > -1
			? setData(data.toSpliced(currentEditingIndex, 1, values))
			: setData([...data, values])
		setIsEditing(false)
	}

	const [currentEditingIndex, setCurrentEditingIndex] = useState(-1)

	const handleAddClick = useCallback(() => {
		setCurrentEditingIndex(-1)
		form.reset(defaultValues)
		setIsEditing(true)
	}, [setCurrentEditingIndex, setIsEditing])

	const onEdit = useCallback(
		(index: number) => {
			setCurrentEditingIndex(index)
			form.reset(data[index])
			setIsEditing(true)
		},
		[form, data, setCurrentEditingIndex, setIsEditing]
	)

	const onDelete = useCallback(
		(index: number) => setData(data.toSpliced(index, 1)),
		[data, setData]
	)

	return isEditing ? (
		<Card
			id='personal-information'
			className={'col-span-1'}
		>
			<CardHeader className='bg-primary/5'>
				<CardTitle>{dictionary.resume['Edit work experience']}</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className='grid grid-cols-2 gap-x-8 gap-y-4 mt-5'
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							name='companyName'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>{dictionary.resume['Company Name']}</FormLabel>
										<FormControl>
											<Input
												placeholder={dictionary.resume['Company name']}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<FormField
							name='industry'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>{dictionary.resume['Industry']}</FormLabel>
										<FormControl>
											<Input
												placeholder={dictionary.resume['Industry (Optional)']}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<FormField
							name='department'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>
											{dictionary.resume['Department (Optional)']}
										</FormLabel>
										<FormControl>
											<Input
												placeholder={dictionary.resume['Department (Optional)']}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<FormField
							name='position'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>{dictionary.resume['Position']}</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<div className='col-span-2'>
							<FormField
								name='startAndEndDate'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>
												{dictionary.resume['Start And End Date']}
											</FormLabel>
											<FormControl>
												<div>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant={'outline'}
																	className={`
                                                                    pl-3
                                                                    text-left
                                                                    font-normal
                                                                    active:scale-100
                                                                    ${
																																			!field.value &&
																																			'text-muted-foreground'
																																		}
                                                                `}
																>
																	{field.value ? (
																		format(field.value[0], 'yyyy-MM-dd')
																	) : (
																		<span>
																			{dictionary.resume['Pick a date']}
																		</span>
																	)}
																	<i className='i-[material-symbols--calendar-month-rounded] ml-auto h-4 w-4 text-primary/80' />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent
															className='w-auto p-0'
															align='start'
														>
															<Calendar
																mode='single'
																captionLayout='dropdown-buttons'
																selected={field.value[0]}
																onSelect={(val) =>
																	field.onChange([val, field.value[1]])
																}
																disabled={(date) =>
																	date > new Date() ||
																	date < new Date('1950-01-01')
																}
																initialFocus
																fromYear={1950}
																toYear={2150}
																components={{
																	Caption: CalendarCaption,
																}}
															/>
														</PopoverContent>
													</Popover>
													<span className='mx-4'>
														{dictionary.resume['to']}
													</span>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant={'outline'}
																	className={`
                                                                    pl-3
                                                                    text-left
                                                                    font-normal
                                                                    active:scale-100
                                                                    ${
																																			!field.value &&
																																			'text-muted-foreground'
																																		}
                                                                `}
																>
																	{field.value ? (
																		format(field.value[1], 'yyyy-MM-dd')
																	) : (
																		<span>
																			{dictionary.resume['Pick a date']}
																		</span>
																	)}
																	<i className='i-[material-symbols--calendar-month-rounded] ml-auto h-4 w-4 text-primary/80' />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent
															className='w-auto p-0'
															align='start'
														>
															<Calendar
																mode='single'
																captionLayout='dropdown-buttons'
																selected={field.value[1]}
																onSelect={(val) =>
																	field.onChange([field.value[0], val])
																}
																disabled={(date) =>
																	date > new Date() ||
																	date < new Date('1950-01-01')
																}
																initialFocus
																fromYear={1950}
																toYear={2150}
																components={{
																	Caption: CalendarCaption,
																}}
															/>
														</PopoverContent>
													</Popover>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
						</div>
						<div className='col-span-2'>
							<FormField
								name='workContent'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>{dictionary.resume['Work Content']}</FormLabel>
											<FormControl>
												<QuillEditor
													className='small-editor'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
						</div>
						<div className='col-span-2'>
							<FormField
								name='workAchievements'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>
												{dictionary.resume['Work Achievements (Optional)']}
											</FormLabel>
											<FormControl>
												<QuillEditor
													className='small-editor'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
						</div>
						<div className='col-span-2'>
							<FormField
								name='workSkills'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>
												{dictionary.resume['Work Skills (Optional)']}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={
														dictionary.resume['Share your wrok skills.']
													}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
						</div>
						<div className='col-span-2 flex flex-row justify-end gap-4 items-center'>
							<Button
								variant='outline'
								onClick={() => setIsEditing(false)}
							>
								{dictionary.resume['Cancel']}
							</Button>
							<Button type='submit'>{dictionary.resume['Finish']}</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	) : (
		<div
			id='work-experience'
			className='px-2 md:px-4 pt-4 md:pt-2 pm-3 group'
		>
			<SectionTitle>
				<div className='flex justify-between items-center w-full'>
					<span>{dictionary.resume['Employment History']}</span>
					<Button
						variant='link'
						size='sm'
						className='hidden group-hover:flex h-7 py-1'
						onClick={handleAddClick}
					>
						<i className='i-[material-symbols--add-circle] text-lg text-primary/50'></i>
						{dictionary.resume['Add']}
					</Button>
				</div>
			</SectionTitle>
			{data.map((item, index) => (
				<EmploymentHistoryBox
					{...item}
					dictionary={dictionary}
					onEdit={() => onEdit(index)}
					onDelete={() => onDelete(index)}
				/>
			))}
		</div>
	)
}

export default WorkExperience
