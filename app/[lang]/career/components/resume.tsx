'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { getDictionary } from '@/i18n'
import { SafeUser } from '@/types'
import {
	EducationType,
	EmploymentHistoryType,
	PersonalInfoType,
	PositionInfoType,
	ProjectListItemType,
} from '@/types/resume'
import Link from 'next/link'
import { useState } from 'react'
import EducationExperience from './education'
import WorkExperience from './employment-history'
import ExpectedPosition from './expected-position'
import PersonalInfo from './personal-info'
import ProfessionalSummary from './professional-summary'
import ProjectExperience from './project-list'
import Skills from './skills'

const Resume = ({
	dictionary,
	currentUser,
}: {
	dictionary: Awaited<ReturnType<typeof getDictionary>>
	currentUser: SafeUser | null
}) => {
	const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>(() => ({
		name: 'ChrisLey',
		gender: 'male',
		birth: '1997-04-27',
		degree: 'Bachelor Degree',
		careerStartDate: '2019-07-26',
		email: '201357337@qq.com',
		jobStatus: 'On the stuff',
		phone: '17671712803',
		wechatAccount: 'ChrisLey521',
	}))

	const initialPersonalAdvantages = '物美价廉'
	const [myAdvantages, setMyAdvantages] = useState(initialPersonalAdvantages)

	const initialSkills = '1. 熟悉Vue的拼写；2.掌握React的安装；3.了解TS的全称；'
	const [skills, setSkills] = useState(initialSkills)

	const [positionInfo, setPositionInfo] = useState<PositionInfoType>(() => ({
		positionType: 'Full Time',
		position: '前端工程师',
		salaryExpectation: 3000,
		workingCity: '广州',
	}))

	const [workExperienceData, setWorkExperienceData] = useState<
		EmploymentHistoryType[]
	>(() => [
		{
			companyName: 'XXX有限公司',
			industry: '互联网',
			department: '产品研发中心',
			position: '前端工程师',
			startAndEndDate: [new Date(), new Date()],
			workContent: '123',
		},
	])

	const [projectExperienceData, setProjectExperienceData] = useState<
		ProjectListItemType[]
	>(() => [
		{
			projectName: 'Onlyy to Chrior',
			role: '前端',
			projectLink: 'https://amber.chrisley.site/career',
			projectStartTime: [new Date(), new Date()],
			projectDescription: '一个xxxx项目',
			projectResult: '',
		},
	])

	const [educationExperienceData, setEducationExperienceData] = useState<
		EducationType[]
	>(() => [
		{
			schoolName: 'Wuhan University of Technology',
			educationalSystem: 'Full-time',
			degree: 'Bachelor Degree',
			major: 'Vilcle profession',
			period: [new Date(), new Date()],
			educationExperience: '',
		},
	])

	const { toast } = useToast()
	const handleEditResume = () => {
		toast({
			// variant: 'destructive',
			title: '功能受限',
			description: '下载App解锁功能',
		})
	}
	return (
		<Card className='resume col-span-10 md:col-span-6 max-h-[calc(100vh-120px)]'>
			<ScrollArea className='h-full w-full resume-scroll-area'>
				<CardHeader className='bg-primary/10'>
					<CardTitle>
						<div className='flex justify-between items-center'>
							<span className='hidden md:inline'>
								{dictionary.resume['My online resume']}
							</span>
							<span className='inline md:hidden'>
								{dictionary.resume['Online resume']}
							</span>
							<div className='hidden lg:flex items-center gap-0 h-10'>
								<Button variant='link'>{dictionary.resume['preview']}</Button>
								<Separator
									orientation='vertical'
									className='h-4'
								></Separator>
								<Button variant='link'>
									<Link href='/career/download'>
										{dictionary.resume['download as PDF']}
									</Link>
								</Button>
							</div>
						</div>
					</CardTitle>
					<CardDescription className='hidden md:block'>
						{dictionary.resume['Lists your skills and experience.']}
					</CardDescription>
				</CardHeader>
				<CardContent className='px-1 md:px-6 grid grid-cols-1 gap-1 md:gap-4 md:mt-5'>
					{/* Personal Info */}
					<PersonalInfo
						dictionary={dictionary}
						{...personalInfo}
						setPersonalInfo={setPersonalInfo}
					/>
					{/* Professional Summary */}
					<ProfessionalSummary
						dictionary={dictionary}
						content={myAdvantages}
						setContent={setMyAdvantages}
					/>
					{/* Skills */}
					<Skills
						dictionary={dictionary}
						content={skills}
						setContent={setSkills}
					/>
					{/* Expected Position */}
					<ExpectedPosition
						dictionary={dictionary}
						{...positionInfo}
						setPositionInfo={setPositionInfo}
					/>
					{/* Employment History */}
					<WorkExperience
						dictionary={dictionary}
						data={workExperienceData}
						setData={setWorkExperienceData}
					/>
					{/* Project List */}
					<ProjectExperience
						dictionary={dictionary}
						data={projectExperienceData}
						setData={setProjectExperienceData}
					/>
					{/* Education */}
					<EducationExperience
						dictionary={dictionary}
						data={educationExperienceData}
						setData={setEducationExperienceData}
					/>
				</CardContent>
				<CardFooter
					className='md:hidden'
					onClick={handleEditResume}
				>
					<Button className='w-full'>{dictionary.resume['Edit Resume']}</Button>
				</CardFooter>
			</ScrollArea>
		</Card>
	)
}

export default Resume
