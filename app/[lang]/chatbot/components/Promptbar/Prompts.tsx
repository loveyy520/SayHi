import { Prompt } from '@/types/prompt'
import { FC } from 'react'
import { PromptComponent } from './Prompt'
import { getDictionary } from '@/i18n'

interface Props {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
	prompts: Prompt[]
	onUpdatePrompt: (prompt: Prompt) => void
	onDeletePrompt: (prompt: Prompt) => void
}

export const Prompts: FC<Props> = ({
    dictionary,
	prompts,
	onUpdatePrompt,
	onDeletePrompt,
}) => {
	return (
		<div className='flex w-full flex-col gap-1'>
			{prompts
				.slice()
				.reverse()
				.map((prompt, index) => (
					<PromptComponent
                        dictionary={dictionary}
						key={index}
						prompt={prompt}
						onUpdatePrompt={onUpdatePrompt}
						onDeletePrompt={onDeletePrompt}
					/>
				))}
		</div>
	)
}
