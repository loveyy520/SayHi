'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { getDictionary } from '@/i18n'
import { radiusPool, themes } from '@/styles/themes/consts'
import { useThemeStore } from '@/styles/themes/utils'
import { CSSProperties, useEffect } from 'react'

const ThemeSwitch = ({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
}) => {
	// const { mode, setMode } = useMode()
	// const { theme, setTheme, resetTheme } = useTheme()
	// const { radius: currentRadius, setRadius } = useRadius()

	const {
		theme,
		setTheme,
		resetTheme,
		mode,
		setMode,
		radius: currentRadius,
		setRadius,
	} = useThemeStore()

	useEffect(
		// () => recoverTheme(theme, mode, currentRadius),
		() => {
			setTheme(theme)
			setMode(mode)
			setRadius(currentRadius)
		},
		[theme, mode, currentRadius, setMode, setRadius, setTheme]
	)

	return (
		<div id='theme-switch'>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant='ghost'
						size='icon'
						className='group'
					>
						<i className='i-[ic--outline-color-lens] text-primary/80 group-hover:text-primary text-2xl'></i>
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-screen sm:w-[340px]'>
					<div className='grid gap-8'>
						<div className='space-y-2'>
							<div className='flex justify-between items-center font-semibold leading-none tracking-tight'>
                                {dictionary.menu['Customize']}
								<Button
									variant={'secondary'}
									size='sm'
									onClick={resetTheme}
								>
                                    {dictionary.menu['Reset']}
								</Button>
							</div>
							<div className='text-xs text-muted-foreground'>
                                {dictionary.menu['Pick a color and radius to change the look of this site.']}
							</div>
						</div>
						<div className='space-y-2'>
                            <Label>{dictionary.menu['Color']}</Label>
							<div className='grid grid-cols-3 gap-2'>
								{themes.map(({ color, label }) => (
									<Button
										variant='outline'
										className={`${
											theme === label ? 'border-2 border-primary' : ''
										} justify-start text-xs`}
										size='sm'
										key={label}
										onClick={() => setTheme(label)}
									>
										<span
											className='mr-1 h-4 w-4 shrink-0 -translate-x-1 rounded-full bg-primary'
											style={{ '--primary': color } as CSSProperties}
										></span>
                                        {dictionary.menu[label]}
									</Button>
								))}
							</div>
						</div>
						<div className='space-y-2'>
                            <Label>{dictionary.menu['Radius']}</Label>
							<div className='grid grid-cols-5 gap-2'>
								{radiusPool.map((radius) => (
									<Button
										className={`text-xs ${
											currentRadius === radius ? 'border-2 border-primary' : ''
										}`}
										variant='outline'
										size='sm'
										key={radius}
										onClick={() => setRadius(radius)}
									>
										{radius}
									</Button>
								))}
							</div>
						</div>
						<div className='space-y-2'>
                            <Label>{dictionary.menu['Mode']}</Label>
							<div className='grid grid-cols-3 gap-2'>
								<Button
									variant='outline'
									className={`group text-xs ${
										mode === 'light' ? 'border-2 border-primary' : ''
									}`}
									size='sm'
									onClick={() => setMode('light')}
								>
									<i className='i-[ph--sun-duotone] group-hover:text-primary mr-2'></i>
                                    {dictionary.menu['Light']}
								</Button>
								<Button
									variant='outline'
									className={`group text-xs ${
										mode === 'dark' ? 'border-2 border-primary' : ''
									}`}
									size='sm'
									onClick={() => setMode('dark')}
								>
									<i className='i-[tabler--moon-stars] group-hover:text-primary mr-2'></i>
                                    {dictionary.menu['Dark']}
								</Button>
								<PopoverClose className='lg:hidden'>
									<div className='flex flex-row justify-end items-center'>
										<Button
											variant={'secondary'}
											size={'sm'}
										>
											<i className='i-[iconamoon--close-bold] w-4 h-4'></i>
                                            {dictionary.menu['Close']}
										</Button>
									</div>
								</PopoverClose>
							</div>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default ThemeSwitch
