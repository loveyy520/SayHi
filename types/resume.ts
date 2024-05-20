type Gender = 'male' | 'female'

type JobStatus = 'On the stuff' | 'Resigned'
interface PersonalInfoType {
	name: string
	gender: Gender
	birth: string
    degree: DegreeType
	careerStartDate: string
	email?: string
	jobStatus: JobStatus
	phone: string
	wechatAccount?: string
}

type PositionType = 'Part Time' | 'Full Time'
interface PositionInfoType {
    positionType: PositionType,
    position: string
    salaryExpectation: number
    workingCity: string
}

interface EmploymentHistoryType {
    companyName: string
    industry?: string
    department?: string
    position: string
    startAndEndDate: [Date, Date],
    workContent: string
    workAchievements?: string
    workSkills?: string
}

interface ProjectListItemType {
    projectName: string,
    role: string,
    projectLink?: string,
    projectStartTime: [Date, Date],
    projectDescription: string,
    projectResult?: string
}

type DegreeType = 'High School Education' | 'College Degree' | 'Bachelor Degree' | 'Master Degree' | 'Doctorial Degree'
type EducationalSystem = 'Full-time' | 'Part-time'
interface EducationType {
    schoolName: string,
    educationalSystem: EducationalSystem,
    degree: DegreeType,
    period: [Date, Date],
    major: string,
    educationExperience?: string
}

export {
    type Gender,
    type PersonalInfoType,
    type PositionInfoType,
    type PositionType,
    type EmploymentHistoryType,
    type ProjectListItemType,
    type DegreeType,
    type EducationalSystem,
    type EducationType
}

