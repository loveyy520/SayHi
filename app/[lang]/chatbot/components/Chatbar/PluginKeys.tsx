import { Button } from '@/components/ui/button'
import { getDictionary } from '@/i18n'
import { PluginID, PluginKey } from '@/types/plugin'
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react'

interface Props {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
	pluginKeys: PluginKey[]
	onPluginKeyChange: (pluginKey: PluginKey) => void
	onClearPluginKey: (pluginKey: PluginKey) => void
}

export const PluginKeys: FC<Props> = ({
    dictionary,
	pluginKeys,
	onPluginKeyChange,
	onClearPluginKey,
}) => {
	const [isChanging, setIsChanging] = useState(false)

	const modalRef = useRef<HTMLDivElement>(null)

	const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			setIsChanging(false)
		}
	}

	useEffect(() => {
		const handleMouseDown = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				window.addEventListener('mouseup', handleMouseUp)
			}
		}

		const handleMouseUp = (e: MouseEvent) => {
			window.removeEventListener('mouseup', handleMouseUp)
			setIsChanging(false)
		}

		window.addEventListener('mousedown', handleMouseDown)

		return () => {
			window.removeEventListener('mousedown', handleMouseDown)
		}
	}, [])

	return (
		<>
			<Button
				className='w-full justify-start gap-4'
				variant='ghost'
				onClick={() => setIsChanging(true)}
			>
				<i className='text-lg i-[solar--key-line-duotone]' />
                {dictionary.chat['Plugin Keys']!}
			</Button>

			{isChanging && (
				<div
					className='z-100 fixed inset-0 flex items-center justify-center bg-background bg-opacity-50'
					onKeyDown={handleEnter}
				>
					<div className='fixed inset-0 z-10 overflow-y-auto'>
						<div className='flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
							<div
								className='hidden sm:inline-block sm:h-screen sm:align-middle'
								aria-hidden='true'
							/>

							<div
								ref={modalRef}
								className='dark:border-netural-400 overflow-scroll inline-block max-h-[400px] transform rounded-lg border border-border bg-background px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:max-h-[600px] sm:w-full sm:max-w-lg sm:p-6 sm:align-middle'
								role='dialog'
							>
								<div className='mb-10 text-4xl'>Plugin Keys</div>

								<div className='mt-6 rounded border p-4'>
									<div className='text-xl font-bold'>Google Search Plugin</div>
									<div className='mt-4 italic'>
										Please enter your Google API Key and Google CSE ID to enable
										the Google Search Plugin.
									</div>

									<div className='mt-6 text-sm font-bold text-foreground'>
										Google API Key
									</div>
									<input
										className='mt-2 w-full rounded-lg border border-border px-4 py-2 text-foreground shadow focus:outline-none dark:border-opacity-50'
										type='password'
										value={
											pluginKeys
												.find((p) => p.pluginId === PluginID.GOOGLE_SEARCH)
												?.requiredKeys.find((k) => k.key === 'GOOGLE_API_KEY')
												?.value
										}
										onChange={(e) => {
											const pluginKey = pluginKeys.find(
												(p) => p.pluginId === PluginID.GOOGLE_SEARCH
											)

											if (pluginKey) {
												const requiredKey = pluginKey.requiredKeys.find(
													(k) => k.key === 'GOOGLE_API_KEY'
												)

												if (requiredKey) {
													const updatedPluginKey = {
														...pluginKey,
														requiredKeys: pluginKey.requiredKeys.map((k) => {
															if (k.key === 'GOOGLE_API_KEY') {
																return {
																	...k,
																	value: e.target.value,
																}
															}

															return k
														}),
													}

													onPluginKeyChange(updatedPluginKey)
												}
											} else {
												const newPluginKey: PluginKey = {
													pluginId: PluginID.GOOGLE_SEARCH,
													requiredKeys: [
														{
															key: 'GOOGLE_API_KEY',
															value: e.target.value,
														},
														{
															key: 'GOOGLE_CSE_ID',
															value: '',
														},
													],
												}

												onPluginKeyChange(newPluginKey)
											}
										}}
									/>

									<div className='mt-6 text-sm font-bold text-foreground'>
										Google CSE ID
									</div>
									<input
										className='mt-2 w-full rounded-lg border border-border px-4 py-2 text-foreground shadow focus:outline-nonedark:border-opacity-50'
										type='password'
										value={
											pluginKeys
												.find((p) => p.pluginId === PluginID.GOOGLE_SEARCH)
												?.requiredKeys.find((k) => k.key === 'GOOGLE_CSE_ID')
												?.value
										}
										onChange={(e) => {
											const pluginKey = pluginKeys.find(
												(p) => p.pluginId === PluginID.GOOGLE_SEARCH
											)

											if (pluginKey) {
												const requiredKey = pluginKey.requiredKeys.find(
													(k) => k.key === 'GOOGLE_CSE_ID'
												)

												if (requiredKey) {
													const updatedPluginKey = {
														...pluginKey,
														requiredKeys: pluginKey.requiredKeys.map((k) => {
															if (k.key === 'GOOGLE_CSE_ID') {
																return {
																	...k,
																	value: e.target.value,
																}
															}

															return k
														}),
													}

													onPluginKeyChange(updatedPluginKey)
												}
											} else {
												const newPluginKey: PluginKey = {
													pluginId: PluginID.GOOGLE_SEARCH,
													requiredKeys: [
														{
															key: 'GOOGLE_API_KEY',
															value: '',
														},
														{
															key: 'GOOGLE_CSE_ID',
															value: e.target.value,
														},
													],
												}

												onPluginKeyChange(newPluginKey)
											}
										}}
									/>

									<Button
										className='mt-6'
										onClick={() => {
											const pluginKey = pluginKeys.find(
												(p) => p.pluginId === PluginID.GOOGLE_SEARCH
											)

											if (pluginKey) {
												onClearPluginKey(pluginKey)
											}
										}}
									>
										Clear Google Search Plugin Keys
									</Button>
								</div>

								<Button
									className='mt-6'
									onClick={() => setIsChanging(false)}
								>
                                    {dictionary.chat['Save']}
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
