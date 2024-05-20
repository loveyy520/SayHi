import { getDictionary } from '@/i18n'
import { Locale } from '@/i18n/config'
import But from './But'

const HomePage = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const dictionary = await getDictionary(lang)

	return (
		<div className='flex flex-col gap-5'>
			{dictionary['server-component'].welcome}
			<But />
		</div>
	)
}

export default HomePage
