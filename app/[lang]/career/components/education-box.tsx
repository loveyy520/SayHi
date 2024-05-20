import { Button } from '@/components/ui/button'
import { EducationType } from '@/types/resume'
import { format } from 'date-fns'
import { NextPage } from 'next/types'
import { useMemo, MouseEvent, useCallback } from 'react'
import Image from 'next/image'
import { type getDictionary } from "@/i18n"

interface EducationBoxProps extends EducationType {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
    onEdit: () => void
    onDelete: () => void
}

const EducationBox: NextPage<EducationBoxProps> = ({
    schoolName,
    educationalSystem,
    degree,
    major,
    period,
    educationExperience,
    dictionary,
    onEdit,
    onDelete
}) => {

    const fomattedInOfficeTime = useMemo(() => {
        const startTime = format(period[0], 'yyyy-MM')
        const endTime = format(period[1], 'yyyy-MM')
        return `${startTime} - ${endTime}`
    }, [period[0], period[1]])

    const handleDelete = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onDelete()
    }, [onDelete])
    return <div className='group/box hover:bg-accent rounded-md md:pl-4 py-2 mb-2 h-20' onClick={onEdit}>
        <div className='flex justify-start gap-1 items-center'>
            <Image
                src='/images/education.png'
                alt=''
                height={60}
                width={60} />
            <div className='flex-1'>
                <div className='flex justify-start items-start gap-3 min-h-10'>
                    <span className='text-sm md:text-base font-medium md:font-bold shrink'>{schoolName}</span>
                    <span className='
                        group-hover/box:hidden
                        ml-auto
                        text-xs
                        md:text-base
                        text-right
                        text-muted-foreground
                        shrink-0'>
                        {fomattedInOfficeTime}
                    </span>
                    <div className='hidden group-hover/box:block ml-auto'>
                        <Button
                            variant='link'
                            size='sm'>
                            <i className='i-[material-symbols--edit-square]'></i>
                            {dictionary['resume'].Edit}
                        </Button>
                        <Button
                            variant='link'
                            size='sm'
                            onClick={handleDelete}>
                            <i className='i-[ion--trash-outline]'></i>
                            {dictionary['resume'].Delete}
                        </Button>
                    </div>
                </div>
                <div className='flex justify-start items-center gap-5 mt-2'>
                    <span className='text-sm order-2 md:order-1'>{major}</span>
                    <span className='text-xs md:text-sm shrink-0 md:text-right order-1 md:order-2'>{degree}</span>
                </div>
            </div>
        </div>
        {
            educationExperience &&
            <div className='text-sm mt-2' dangerouslySetInnerHTML={{ __html: educationExperience }}></div>
        }
    </div>
}

export default EducationBox