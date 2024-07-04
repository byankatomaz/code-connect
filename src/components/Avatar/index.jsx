import Image from "next/image"
import style from './avatar.module.css'

export const Avatar = ({ name, imageSrc }) => {
    return (
        <ul className={style.ul}>
            <li>
                <Image src={imageSrc} width={20} height={20} alt="foto da pessoa"/>
            </li>
            <li className={style.name}>
                @{name}
            </li>
        </ul>
    )
}