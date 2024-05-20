import { NextPage } from 'next'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface GloablAvatarProps {
    src?: string
    alt?: string
}

const GloabalAvatar: NextPage<GloablAvatarProps> = ({
    src,
    alt
}) => {
    return <Avatar>
        <AvatarImage src={src} alt={alt ?? ''} />
        <AvatarFallback>
            <i className='i-[tabler--user-circle]  text-primary/80 group-hover:text-primary text-2xl'></i>
        </AvatarFallback>
    </Avatar>
}

export default GloabalAvatar