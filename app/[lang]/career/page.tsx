import { LangParams } from '@/types/i18n'
import PdfWidget from './components/pdf-widget'
import Resume from './components/resume'
import Toc from './components/toc'
import { getDictionary } from '@/i18n'
import { Metadata } from 'next/types'
import getCurrentUser from '@/actions/getCurrentUser'

export const metadata: Metadata = {
    title: 'Resume',
    description: 'AI tools, chatgpt',
}

const CareerPage = async ({ params: { lang } }: LangParams) => {
    const dictionary = await getDictionary(lang)
    const currentUser = await getCurrentUser()
	return (
        <div className='grid grid-cols-10 gap-8 w-full'>
            <Toc dictionary={dictionary}></Toc>
            <Resume dictionary={dictionary} currentUser={currentUser}></Resume>
			<PdfWidget></PdfWidget>
		</div>
	)
}

export default CareerPage
