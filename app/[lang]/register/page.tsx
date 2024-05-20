import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import UserAuthForm from './components/user-auth-form'
import { LangParams } from '@/types/i18n'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
    title: 'Sign up',
	description: 'Authentication forms built using the components.',
}

export default async function AuthenticationPage({ params: { lang } }: LangParams) {
    const dictionary = await getDictionary(lang)
	return (
		<>
			<div className='md:hidden'>
				<Image
					src='/examples/authentication-light.png'
					width={1280}
					height={540}
					alt='Authentication'
					className='block dark:hidden'
				/>
				<Image
					src='/examples/authentication-dark.png'
					width={1280}
					height={540}
					alt='Authentication'
					className='hidden dark:block'
				/>
			</div>
			<div className='sm:container relative h-auto md:h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
				<Link
					href='/login'
					className={cn(
						buttonVariants({ variant: 'link' }),
						'absolute -right-2 -top-1 sm:right-8 sm:top-0  md:right-8 md:top-12'
					)}
				>
                    {dictionary.auth['Login']}
				</Link>
				<div className='relative hidden h-full flex-col bg-muted p-10 lg:flex dark:border-r'>
					<div className='absolute inset-0' />
					<div className='relative z-20 flex items-center text-lg font-medium text-foreground'>
						<i className='i-[noto--woman-fairy-light-skin-tone] text-2xl mr-2'></i>
						{/* <i className='i-[ph--robot] text-blue-500 text-2xl mr-2'></i> */}
                        {dictionary.auth['Chrior AI']}
					</div>
					<div className='relative z-20 mt-auto'>
						<blockquote className='space-y-2'>
							<p className='text-sm lg:text-lg text-muted-foreground'>
								&ldquo;
                                {dictionary.auth[
									'This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster thanever before.'
                                ]}
								&rdquo;
							</p>
							<footer className='text-sm text-muted-foreground'>
                                --{dictionary.auth['Sofia Davis']}
							</footer>
						</blockquote>
					</div>
				</div>
				<div className='lg:p-8 lg:h-full'>
					<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
						<div className='flex flex-col space-y-2 text-center'>
							<h1 className='text-lg sm:text-2xl font-semibold tracking-tight flex flex-row justify-start items-center'>
								<i className='i-[noto--woman-fairy-light-skin-tone] text-2xl mr-2'></i>
                                <span>{dictionary.auth['Create an account']}</span>
							</h1>
							<p className='hidden sm:block text-sm text-muted-foreground'>
                                {dictionary.auth['Enter your email below to create your account']}
							</p>
						</div>
                        <UserAuthForm dictionary={dictionary} />
						<p className='px-8 text-center text-sm text-muted-foreground'>
                            {dictionary.auth['By clicking continue, you agree to our']}{' '}
							<Link
								href='/terms'
								className='underline underline-offset-4 text-muted-foreground hover:text-primary'
							>
                                {dictionary.auth['Terms of Service']}
							</Link>{' '}
                            {dictionary.auth['and']}{' '}
							<Link
								href='/privacy'
								className='underline underline-offset-4 text-muted-foreground hover:text-primary'
							>
                                {dictionary.auth['Privacy Policy']}
							</Link>
                            {dictionary.auth['.']}
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
