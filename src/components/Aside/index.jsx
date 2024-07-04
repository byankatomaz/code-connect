import Image from 'next/image'
import style from './aside.module.css'
import logo from './logo.png'

export const Aside = () => {
    return (
        <aside className={style.aside}>
            <Image src={logo} alt="Logo da Code Connect"/>
        </aside>
    )
}