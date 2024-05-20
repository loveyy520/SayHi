'use client'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectValue,
} from '@/components/ui/select'
import { getDictionary } from '@/i18n'
import { Plugin, PluginList } from '@/types/plugin'
import { SelectTrigger } from '@radix-ui/react-select'
import { FC } from 'react'

interface Props {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
	plugin: Plugin | null
	onPluginChange: (plugin: Plugin) => void
}

export const PluginSelect: FC<Props> = ({ plugin, onPluginChange, dictionary }) => {
	return (
		<Select
			value={plugin?.id}
			onValueChange={(value) => {
				onPluginChange(
					PluginList.find((plugin) => plugin.id === value) as Plugin
				)
			}}
		>
			<SelectTrigger className='absolute left-3 top-3 justify-center items-center w-5 h-5'>
				<SelectValue
					autoFocus
					placeholder={<i className='i-[ic--outline-offline-bolt] text-xl'></i>}
				>
					<i className='i-[logos--google-icon] text-xl'></i>
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
                    <SelectLabel>{dictionary.chat['Select Plugin']!}</SelectLabel>
					{PluginList.map((plugin) => (
						<SelectItem
							key={plugin.id}
							value={plugin.id}
						>
							{plugin.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
