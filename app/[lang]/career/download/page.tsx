import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getDictionary } from '@/i18n'
import { LangParams } from '@/types/i18n'
import { Terminal } from 'lucide-react'
import PdfPreview from './components/preview'
import ResumeInfo from './components/resume-info'

const DownloadResume = async ({ params: { lang } }: LangParams) => {
	const dictionary = await getDictionary(lang)
	return (
		<>
			<Alert className='lg:hidden'>
				<Terminal className='h-4 w-4' />
				<AlertTitle>{dictionary.resume['Warning!']}</AlertTitle>
				<AlertDescription>
					{
						dictionary.resume[
							'Yet not supported on phone. Visit the site again on PC pls!'
						]
					}
				</AlertDescription>
			</Alert>
			<div className='hidden lg:flex flex-row h-full'>
				<ResumeInfo dictionary={dictionary} />
				<PdfPreview dictionary={dictionary} />
			</div>
		</>
	)
}

export default DownloadResume
