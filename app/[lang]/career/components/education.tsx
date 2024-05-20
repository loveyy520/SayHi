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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { getDictionary } from '@/i18n'
import { EducationType } from '@/types/resume'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import EducationBox from './education-box'
import SectionTitle from './section-title'

interface EducationProps {
	dictionary: Awaited<ReturnType<typeof getDictionary>>
	data: EducationType[]
	setData: (data: EducationType[]) => void
}

const defaultValues: EducationType = {
	schoolName: '',
	educationalSystem: 'Full-time',
	degree: 'Bachelor Degree',
	period: [new Date(), new Date()],
	major: '',
	educationExperience: '',
}

const Education: NextPage<EducationProps> = ({ dictionary, data, setData }) => {
	const [isEditing, setIsEditing] = useState(false)
	const formSchema = z.object({
		schoolName: z.string().min(1, {
			message: dictionary.resume['School name is required.'],
		}),
		educationalSystem: z.enum(['Full-time', 'Part-time']),
		degree: z.enum([
			'High School Education',
			'College Degree',
			'Bachelor Degree',
			'Master Degree',
			'Doctorial Degree',
		]),
		period: z.tuple([z.date(), z.date()]),
		major: z.string(),
		educationExperience: z.string().optional(),
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
				<CardTitle>
					{currentEditingIndex > -1
						? dictionary.resume['Edit education experience']
						: dictionary.resume['Add education experience']}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className='grid grid-cols-2 gap-x-8 gap-y-4 mt-5'
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							name='schoolName'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>{dictionary.resume['School Name']}</FormLabel>
										<FormControl>
											<Input
												placeholder={dictionary.resume['School name']}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<FormField
							name='educationalSystem'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>
											{dictionary.resume['Educational System']}
										</FormLabel>
										<FormControl>
											<Select {...field}>
												<SelectTrigger className='w-[180px]'>
													<SelectValue placeholder='Select a fruit' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectItem value='Full-time'>
															{dictionary.resume['Full-time']}
														</SelectItem>
														<SelectItem value='Part-time'>
															{dictionary.resume['Part-time']}
														</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<FormField
							name='education'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>{dictionary.resume['Degree']}</FormLabel>
										<FormControl>
											<Select {...field}>
												<SelectTrigger className='w-[180px]'>
													<SelectValue placeholder='Select a fruit' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectItem value='High School Education'>
															{dictionary.resume['High School Education']}
														</SelectItem>
														<SelectItem value='College degree'>
															{dictionary.resume['College Degree']}
														</SelectItem>
														<SelectItem value='Bachelor degree'>
															{dictionary.resume['Bachelor Degree']}
														</SelectItem>
														<SelectItem value='Master degree'>
															{dictionary.resume['Master Degree']}
														</SelectItem>
														<SelectItem value='Doctorial Degree'>
															{dictionary.resume['Doctorial Degree']}
														</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<FormField
							name='major'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>{dictionary.resume['Major']}</FormLabel>
										<FormControl>
											<Input
												placeholder={dictionary.resume['Major']}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<div className='col-span-2'>
							<FormField
								name='period'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>
												{dictionary.resume['Education Duration']}
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
								name='educationExperience'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>
												{dictionary.resume['Performance (Optional)']}
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
			id='education'
			className='px-2 md:px-4 pt-4 md:pt-2 pm-3 group'
		>
			<SectionTitle>
				<div className='flex justify-between items-center w-full'>
					<span>{dictionary.resume['Education']}</span>
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
				<EducationBox
					dictionary={dictionary}
					{...item}
					onEdit={() => onEdit(index)}
					onDelete={() => onDelete(index)}
				/>
			))}
		</div>
	)
}

export default Education
