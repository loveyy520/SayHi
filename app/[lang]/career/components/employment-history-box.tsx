import { Button } from '@/components/ui/button'
import { getDictionary } from '@/i18n'
import { EmploymentHistoryType } from '@/types/resume'
import { format } from 'date-fns'
import { NextPage } from 'next/types'
import { useMemo, MouseEvent, useCallback } from 'react'

interface EmploymentHistoryBoxProps extends EmploymentHistoryType {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
    onEdit: () => void
    onDelete: () => void
}

const EmploymentHistoryBox: NextPage<EmploymentHistoryBoxProps> = ({
    companyName,
    position,
    department,
    startAndEndDate,
    workSkills,
    workContent,
    workAchievements,
    dictionary,
    onEdit,
    onDelete
}) => {

    const fomattedInOfficeTime = useMemo(() => {
        const startTime = format(startAndEndDate[0], 'yyyy-MM')
        const endTime = format(startAndEndDate[1], 'yyyy-MM')
        return `${startTime} - ${endTime}`
    }, [startAndEndDate[0], startAndEndDate[1]])

    const skills = useMemo(() => workSkills
        ? workSkills.split(',')
        : void 0, [workSkills])

    const handleDelete = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onDelete()
    }, [onDelete])
    return <div className='group/box hover:bg-accent rounded-md md:pl-4 py-2 mb-2' onClick={onEdit}>
        <header className='grid grid-cols-2 md:grid-cols-4 gap-y-2 items-center md:h-10'>
            <span className='text-base'>{companyName}</span>
            <span className='text-base'>{position}</span>
            <span className='text-base text-right md:text-left'>{department}</span>
            <span className='
                group-hover/box:hidden
                text-right
                text-xs
                md:text-base
                text-muted-foreground
                col-start-2
                col-end-3
                row-start-1
                row-end-2
                md:col-start-4
                md:col-end-4'>{fomattedInOfficeTime}</span>
            <div className='hidden group-hover/box:block'>
                <Button
                    variant='link'
                    size='sm'>
                    <i className='i-[material-symbols--edit-square]'></i>
                    {dictionary.resume['Edit']}
                </Button>
                <Button
                    variant='link'
                    size='sm'
                    onClick={handleDelete}>
                    <i className='i-[ion--trash-outline]'></i>
                    {dictionary.resume['Delete']}
                </Button>
            </div>
        </header>
        {
            skills?.length &&
            <div className='text-sm mt-2'>
                {skills.map(skill => <>{skill}</>)}
            </div>
        }
        <div className='text-sm mt-2' dangerouslySetInnerHTML={{ __html: workContent }}></div>
        {
            workAchievements &&
            <div className='text-sm mt-2' dangerouslySetInnerHTML={{ __html: workAchievements }}></div>
        }
    </div>
}

export default EmploymentHistoryBox