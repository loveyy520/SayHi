import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { getDictionary } from '@/i18n'
import { OpenAIModel, OpenAIModelID } from '@/types/openai'
import { FC } from 'react'

interface Props {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
	model: OpenAIModel
	models: OpenAIModel[]
	defaultModelId: OpenAIModelID
	onModelChange: (model: OpenAIModel) => void
}

export const ModelSelect: FC<Props> = ({
    dictionary,
	model,
	models,
	defaultModelId,
	onModelChange,
}) => {
	return (
		<div className='flex flex-col gap-4'>
            <Label>{dictionary.chat['Model']}</Label>
			<Select
				value={model?.id || defaultModelId}
				onValueChange={(value) => {
					onModelChange(
						models.find((model) => model.id === value) as OpenAIModel
					)
				}}
			>
				<SelectTrigger className='w-full'>
                    <SelectValue placeholder={dictionary.chat['Select a model']!} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
                        <SelectLabel>{dictionary.chat['Available models:']!}</SelectLabel>
						{models.map((model) => (
							<SelectItem
								key={model.id}
								value={model.id}
							>
								{model.id === defaultModelId
									? `Default (${model.name})`
									: model.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}
