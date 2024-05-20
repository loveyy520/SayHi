import { LangParams } from '@/types/i18n'
import PageContent from './components/page-content'
import { getDictionary } from '@/i18n'

const ChatHome = async ({ params: { lang } }: LangParams) => {
    const dictionary = await getDictionary(lang)
    return <main
        className={`flex h-full flex-col text-sm text-foreground bg-background`}
    >
        <PageContent dictionary={dictionary} />
    </main>
}

export default ChatHome