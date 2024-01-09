import Image from "next/image"
import { FaUserCircle } from 'react-icons/fa'

type AvatarPropTypes = {
    src?: string | null |undefined
}

function Avatar({ src }: AvatarPropTypes) {

    // if (src) {
    //     <Image src={src} alt='Avatar' className="rounded-full" width='30' height='30'
    // }
    return <FaUserCircle size={24} />
 
}

export default Avatar