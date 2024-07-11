import Image from "next/image";
import style from "./aside.module.css";
import logo from "./logo.png";
import Link from "next/link";

export const Aside = () => {
  return (
    <aside className={style.aside}>
      <Link href='/'>
        <Image src={logo} alt="Logo da Code Connect" />
      </Link>
    </aside>
  );
};
