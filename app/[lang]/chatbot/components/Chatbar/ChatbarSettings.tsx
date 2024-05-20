import { Button } from '@/components/ui/button'
import { getDictionary } from '@/i18n'
import { SupportedExportFormats } from '@/types/export'
import { PluginKey } from '@/types/plugin'
import { FC } from 'react'
import { Import } from '../Settings/Import'
import { ClearConversations } from './ClearConversations'

interface Props {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
	lightMode: 'light' | 'dark'
	pluginKeys: PluginKey[]
	conversationsCount: number
	onClearConversations: () => void
	onExportConversations: () => void
	onImportConversations: (data: SupportedExportFormats) => void
}

export const ChatbarSettings: FC<Props> = ({
    dictionary,
	lightMode,
	pluginKeys,
	conversationsCount,
	onClearConversations,
	onExportConversations,
	onImportConversations,
}) => {
	return (
		<div className='flex flex-col items-center space-y-1 border-t border-border pt-5 pb-10 text-sm'>
			{conversationsCount > 0 ? (
                <ClearConversations
                    dictionary={dictionary}
					onClearConversations={onClearConversations}
				/>
			) : null}

            <Import
                dictionary={dictionary} onImport={onImportConversations} />

			<Button
				className='w-full justify-start gap-4'
				variant='ghost'
				onClick={() => onExportConversations()}
			>
				<i className='text-lg i-[flowbite--file-export-outline]'></i>
                {dictionary.chat['Export data']!}
			</Button>
		</div>
	)
}
