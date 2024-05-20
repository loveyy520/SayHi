'use client'

import QuillEditor from '@/components/editors/quill-editor'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import CalendarCaption from '@/components/ui/calendar-caption'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { getDictionary } from '@/i18n'
import {
	EducationType,
	EmploymentHistoryType,
	ProjectListItemType,
} from '@/types/resume'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import EducationInfo from './education-info'
import EmploymentInfo from './employment-info'
import ProjectInfo from './project-info'
interface ResumeInfoProps {
	dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const ResumeInfo = ({ dictionary }: ResumeInfoProps) => {
	const formSchema = z.object({
		// Personal Info
		name: z.string().min(1),
		avatar: z.string(),
		position: z.string(),
		gender: z.string(),
		careerStartDate: z.tuple([z.date(), z.date()]),
		birth: z.date(),
		email: z.string().email(),
		phone: z.string().min(1),
		wechatAccount: z.string().optional(),
		workingCity: z.string(),
		salaryExpectation: z.number(),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: 'Chris Ley',
			avatar: '/images/avatar-1.png',
			position: '前端开发工程师',
			gender: 'Male',
			careerStartDate: [new Date(), new Date()],
			birth: new Date(),
			email: '201357337@qq.com',
			phone: '17671712803',
			wechatAccount: 'ChrisLey521',
			workingCity: '广州',
			salaryExpectation: 3000,
		},
	})

	const [professionalSummary, setProfessionalSummary] = useState('')

	const employmentHistory: EmploymentHistoryType[] = [
		{
			companyName: '广州佳星科技有限公司',
			position: '前端开发工程师',
			startAndEndDate: [new Date(), new Date()],
			workContent: '1. 早上9点半打卡；2. 晚上7点打卡下班',
			workAchievements: '荣获2023年度最佳摸鱼奖',
		},
		{
			companyName: '广州佳星科技有限公司',
			position: '前端开发工程师',
			startAndEndDate: [new Date(), new Date()],
			workContent: '1. 早上9点半打卡；2. 晚上7点打卡下班',
			workAchievements: '荣获2023年度最佳摸鱼奖',
		},
	]

	const projectList: ProjectListItemType[] = [
		{
			projectName: '集你太美',
			role: '前端',
			projectStartTime: [new Date(), new Date()],
			projectDescription: '这是一个开发两年半的项目',
		},
	]

	const education: EducationType[] = [
		{
			schoolName: 'Wuhan University of Technology',
			educationalSystem: 'Full-time',
			period: [new Date(), new Date()],
			degree: 'Bachelor Degree',
			major: '车车专业',
			educationExperience: '',
		},
	]

	return (
		<ScrollArea className='w-1/2 h-full pr-10'>
			{/* Personal Info */}
			<div className='grid grid-cols-1 gap-5'>
				<div className='text-lg font-bold'>
					{dictionary.resume['Personal Information']}
				</div>
				<Form {...form}>
					<form className='grid grid-cols-2 gap-x-8 gap-y-4 mt-2 px-1'>
						<FormField
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{dictionary.resume['Name']}</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name='avatar'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Image
											src={field.value}
											alt='Avatar'
											width='80'
											height='80'
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name='position'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{dictionary.resume['Expected Position']}
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name='gender'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{dictionary.resume['Gender']}</FormLabel>
									<FormControl>
										<Select {...field}>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														placeholder={dictionary.resume['Gender']}
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='Male'>
													{dictionary.resume['Male']}
												</SelectItem>
												<SelectItem value='Female'>
													{dictionary.resume['Female']}
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='careerStartDate'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>{dictionary.resume['CareerStartDate']}</FormLabel>
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
														${!field.value && 'text-muted-foreground'}
                                                    `}
												>
													{field.value ? (
														format(field.value[0], 'yyyy-MM-dd')
													) : (
														<span>{dictionary.resume['Pick a date']}</span>
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
												fromYear={1990}
												toYear={2150}
												selected={new Date(field.value[1])}
												onSelect={field.onChange}
												disabled={(date) =>
													date > new Date() || date < new Date('1900-01-01')
												}
												initialFocus
												components={{
													Caption: CalendarCaption,
												}}
											/>
										</PopoverContent>
									</Popover>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='birth'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>{dictionary.resume['Birth']}</FormLabel>
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
														${!field.value && 'text-muted-foreground'}
                                                    `}
												>
													{field.value ? (
														format(field.value, 'yyyy-MM-dd')
													) : (
														<span>{dictionary.resume['Pick a date']}</span>
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
												fromYear={1990}
												toYear={2150}
												selected={new Date(field.value)}
												onSelect={field.onChange}
												disabled={(date) =>
													date > new Date() || date < new Date('1900-01-01')
												}
												initialFocus
												components={{
													Caption: CalendarCaption,
												}}
											/>
										</PopoverContent>
									</Popover>
								</FormItem>
							)}
						/>
						<FormField
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{dictionary.resume['Email']}</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{dictionary.resume['Phone']}</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name='wechatAccount'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{dictionary.resume['WeChat']}</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name='workingCity'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{dictionary.resume['City']}</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name='salaryExpectation'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{dictionary.resume['Salary']}</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div>
			{/* Professional Summary */}
			<div className='grid grid-cols-1 gap-5'>
				<div className='text-lg font-bold mt-10'>
					{dictionary.resume['Professional Summary']}
				</div>
				<QuillEditor
					className='small-editor'
					value={professionalSummary}
					onChange={setProfessionalSummary}
				/>
			</div>
			{/* Employment History */}
			<div className='grid grid-cols-1 gap-5'>
				<div className='text-lg font-bold mt-10'>
					{dictionary.resume['Employment History']}
				</div>
				{employmentHistory.map((employment) => (
					<EmploymentInfo
						{...employment}
						dictionary={dictionary}
					/>
				))}
			</div>
			{/* Project List */}
			<div className='grid grid-cols-1 gap-5'>
				<div className='text-lg font-bold mt-10'>
					{dictionary.resume['Project List']}
				</div>
				{projectList.map((project) => (
					<ProjectInfo
						{...project}
						dictionary={dictionary}
					/>
				))}
			</div>
			{/* Education */}
			<div className='grid grid-cols-1 gap-5'>
				<div className='text-lg font-bold mt-10'>
					{dictionary.resume['Project List']}
				</div>
				{education.map((educationInfo) => (
					<EducationInfo
						{...educationInfo}
						dictionary={dictionary}
					/>
				))}
			</div>
		</ScrollArea>
	)
}

export default ResumeInfo
