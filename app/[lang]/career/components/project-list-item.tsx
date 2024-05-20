import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getDictionary } from '@/i18n'

import { ProjectListItemType } from '@/types/resume'
import { format } from 'date-fns'
import { NextPage } from 'next/types'
import { useMemo, MouseEvent, useCallback } from 'react'

interface ProjectListItemProps extends ProjectListItemType {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
    onEdit: () => void
    onDelete: () => void
}

const ProjectListItem: NextPage<ProjectListItemProps> = ({
    projectName,
    role,
    projectLink,
    projectStartTime,
    projectDescription,
    projectResult,
    dictionary,
    onEdit,
    onDelete
}) => {

    const fomattedInOfficeTime = useMemo(() => {
        const startTime = format(projectStartTime[0], 'yyyy-MM')
        const endTime = format(projectStartTime[1], 'yyyy-MM')
        return `${startTime} - ${endTime}`
    }, [projectStartTime[0], projectStartTime[1]])

    const handleDelete = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onDelete()
    }, [onDelete])
    return <div className='group/box hover:bg-accent rounded-md md:pl-4 py-2 mb-2' onClick={onEdit}>
        <header className='grid grid-cols-2 md:grid-cols-3 items-center h-10'>
            <span className='text-base'>{projectName}</span>
            <span className='hidden md:inline text-base'>{role}</span>
            <span className='inline group-hover/box:hidden text-xs md:text-base text-right text-muted-foreground'>{fomattedInOfficeTime}</span>
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
        <div className='text-sm' dangerouslySetInnerHTML={{ __html: projectDescription }}></div>
        {
            projectResult &&
            <div className='text-sm' dangerouslySetInnerHTML={{ __html: projectResult }}></div>
        }
        {
            projectLink &&
            <div className='mt-4 h-10 flex items-center'>
                <span className='font-medium shrink-0'>{dictionary.resume['Project Addr']}：</span>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                className='px-1 w-[calc(100%-80px)] justify-start'
                                variant='link'
                                onClick={(e) => e.stopPropagation()}>
                                <i className='i-[material-symbols--link] shrink-0'></i>
                                <a href={projectLink} className='w-[calc(100%-14px)] text-left overflow-hidden text-ellipsis whitespace-nowrap'>{projectLink}</a>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{dictionary.resume['Project Addr']}：{projectLink}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        }
    </div>
}

export default ProjectListItem