
import { getDictionary } from '@/i18n'
import { LangParams } from '@/types/i18n'
import Link from 'next/link'

export default async function NotFound() {

    const lang = 'zh'
    const dictionary = await getDictionary(lang)

	return (
		<div className='flex flex-col items-center justify-center gap-6'>
            <h2>{dictionary['chat']['Not Found']}</h2>
            <p>{dictionary['chat']['Could not find requested resource']}</p>
			<div
				className='
                    w-fit
                    px-4
                    py-2
                    rounded-[var(--radius)]
                    bg-primary
                    text-foreground
                    hover:bg-primary/90
                    cursor-pointer'
			>
                <Link href='/'>{dictionary['chat']['Return Home']}</Link>
			</div>
		</div>
	)
}
