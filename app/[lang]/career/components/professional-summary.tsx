import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useCallback, useState } from 'react'
import SectionTitle from './section-title'
import QuillEditor from '@/components/editors/quill-editor'
import { getDictionary } from '@/i18n'

interface ProfessionalSummaryProps {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
    content: string
    setContent: (content: string) => void
}

const ProfessionalSummary = ({
    dictionary,
    content,
    setContent,
}: ProfessionalSummaryProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const [value, setValue] = useState(content)

    const handleCancel = useCallback(() => {
        setValue(content)
        setIsEditing(false)
    }, [])
    const handleFinish = useCallback(() => {
        setContent(value)
        setIsEditing(false)
    }, [value, setContent, setIsEditing])
    return isEditing ? (
        <Card
            id='personal-information'
            className={'col-span-1'}
        >
            <CardHeader className='bg-primary/5'>
                <CardTitle>{dictionary.resume['Edit personal advantages']}</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-4'>
                <QuillEditor
                    className='mt-5 small-editor'
                    value={value}
                    onChange={setValue}
                />
            </CardContent>
            <CardFooter className='gap-5 justify-end items-center'>
                <Button
                    variant='outline'
                    onClick={handleCancel}
                >
                    {dictionary.resume['Cancel']}
                </Button>
                <Button onClick={handleFinish}>{dictionary.resume['Finish']}</Button>
            </CardFooter>
        </Card>
    ) : (
        <div
                id='professional-summary'
            className='px-1 md:px-4 md:pt-2 pm-3'
        >
            <SectionTitle className='hidden md:flex'>{dictionary.resume['Professional Summary']}</SectionTitle>
            <div
                className='group relative min-w-8 px-2 md:px-4 py-0 md:py-2 rounded-md shrink hover:bg-accent'
                onClick={() => setIsEditing(true)}
            >
                <div className='whitespace-normal overflow-x-hidden text-ellipsis' dangerouslySetInnerHTML={{ __html: content }}></div>
                <Button
                    variant='link'
                    className='absolute right-0 top-0 gap-1 hidden group-hover:flex'
                >
                    <i className='i-[material-symbols--edit-square-rounded]'></i>
                    {dictionary.resume['Edit']}
                </Button>
            </div>
        </div>
    )
}

export default ProfessionalSummary
