
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useMemo } from 'react'
import { DropdownMenuShortcut } from '../ui/dropdown-menu'
import { getDictionary } from '@/i18n'

interface MenuItemProps {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const MenuItem = ({
    dictionary
}: MenuItemProps) => {
	const redirectPathname = usePathname()
	const redirectSearchParams = useSearchParams()
	const loginUrl = useMemo(
		() =>
			['/', '/register', '/login'].includes(redirectPathname)
				? '/login'
				: `/login?redirect=${redirectPathname}${redirectSearchParams}`,
		[redirectPathname, redirectSearchParams]
	)
	return (
		<Link
			href={loginUrl}
			className='flex w-full items-center'
		>
			<i className='i-[lets-icons--sign-in-circle-duotone-line] mr-2 h-4 w-4'></i>
            <span>{dictionary.menu['Login']}</span>
			<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
		</Link>
	)
}

const MenuItemLogin = ({ dictionary }: MenuItemProps) => (
	<Suspense>
        <MenuItem dictionary={dictionary} />
	</Suspense>
)

export default MenuItemLogin
