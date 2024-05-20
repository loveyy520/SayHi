import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import TocItem from './toc-item'
import { getDictionary } from '@/i18n'

function Toc({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
}) {
    const contentItems = [
        {
            id: 'personal-information',
            title: dictionary.resume['Personal Information'],
        },
        {
            id: 'professional-summary',
            title: dictionary.resume['Professional Summary'],
        },
        {
            id: 'prefessional-skills',
            title: dictionary.resume['Prefessional Skills'],
        },
        {
            id: 'expected-position',
            title: dictionary.resume['Expected Position'],
        },
        {
            id: 'employment-history',
            title: dictionary.resume['Employment History'],
        },
        {
            id: 'project-list',
            title: dictionary.resume['Project List'],
        },
        {
            id: 'education-experience',
            title: dictionary.resume['Education'],
        },
        {
            id: 'qualification',
            title: dictionary.resume['Qualification'],
        },
    ]
	return (
        <Card className={'hidden md:block w-fit col-span-3'}>
			<ScrollArea className='h-full'>
				<CardHeader className='bg-primary/10'>
                    <CardTitle>{dictionary.resume['Resume Content']}</CardTitle>
					<CardDescription>
                        {dictionary.resume['Quickly locate to what you concern.']}
					</CardDescription>
				</CardHeader>
				<CardContent className='grid gap-4'>
					<ul className='py-5'>
						{contentItems.map((item) => (
							<TocItem
								key={item.id}
								id={item.id}
								title={item.title}
							/>
						))}
					</ul>
				</CardContent>
				<CardFooter>
                    <div>{dictionary.resume['You are the best!']}</div>
				</CardFooter>
			</ScrollArea>
		</Card>
	)
}

export default Toc
