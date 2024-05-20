'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { SafeUser } from '@/types'
import { NextPage } from 'next'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip'
import { getDictionary } from '@/i18n'

interface MenuProps {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
	currentUser: SafeUser | null
}

const Menu: NextPage<MenuProps> = ({ dictionary, currentUser }) => {
	return (
		<NavigationMenu className='hidden md:flex'>
			<NavigationMenuList>
				<NavigationMenuItem>
                    <NavigationMenuTrigger>{dictionary.menu['Chatbot']}</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
							<li className='row-span-3'>
								<NavigationMenuLink asChild>
									<Link
										className='flex w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
										href='/chatbot'
									>
										{/* <Icons.logo className='h-6 w-6' /> */}
										<div className='mb-2 text-lg font-medium'>
                                            {'Chriorist'}
										</div>
										<p className='text-sm leading-tight text-muted-foreground'>
                                            Chriorist&nbsp;{dictionary.menu[
                                                'could chat with you as a partner or assistant so as to help you to find inspiration.'
                                            ]}
										</p>
									</Link>
								</NavigationMenuLink>
							</li>
							<ListItem
								href='/chatbot/v3'
                                title='Chriorist 3.0'
							>
                                Chriorist 3.0
							</ListItem>
							<ListItem
								href='/chatbot/v4'
                                title='Chriorist 4.0'
							>
                                {dictionary.menu['This is a new version of']}&nbsp;Chriorist
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				{/* <NavigationMenuItem>
					<TooltipProvider delayDuration={300}>
						<Tooltip>
							<TooltipTrigger asChild>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
									asChild
								>
									<Link
										href='/photor'
										passHref
									>
                                        Photor
									</Link>
								</NavigationMenuLink>
							</TooltipTrigger>
							<TooltipContent>
                                <p>{dictionary.menu['Generate photo from text.']}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<TooltipProvider delayDuration={300}>
						<Tooltip>
							<TooltipTrigger asChild>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
									asChild
								>
									<Link
										href='/video-maker'
										passHref
									>
                                        VideoGenerator
									</Link>
								</NavigationMenuLink>
							</TooltipTrigger>
							<TooltipContent>
                                <p>{dictionary.menu['Generate video from photo.']}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</NavigationMenuItem> */}
                <NavigationMenuItem>
                    <TooltipProvider delayDuration={300}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    asChild
                                >
                                    <Link
                                        href='/career'
                                        passHref
                                    >
                                        Career
                                    </Link>
                                </NavigationMenuLink>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{dictionary.menu['View career.']}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

export default Menu

const ListItem = forwardRef<ElementRef<'a'>, ComponentPropsWithoutRef<'a'>>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							className
						)}
						{...props}
					>
						<div className='text-sm font-medium leading-none'>{title}</div>
						<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
							{children}
						</p>
					</a>
				</NavigationMenuLink>
			</li>
		)
	}
)
ListItem.displayName = 'ListItem'
