import React from "react";
import Image from "next/image";
import styles from "@/styles/Nav.module.css";
import Link from "next/link";

export default function Nav() {
  const scrollToClass = (className: string) => {
    const element = document.querySelector(`.${className}`) as HTMLElement;

    if (element) {
      const windowHeight = window.innerHeight;
      const elementHeight = element.offsetHeight;
      const offset = Math.max(0, (windowHeight - elementHeight) / 2);

      window.scrollTo({ top: element.offsetTop - offset, behavior: "smooth" });
    }
  };
  return (
    <>
      <nav className={`${styles.nav}`}>
        <div className={styles.title}>
          <Image src="/logo.png" alt="" width={42} height={42}></Image>
          <h1>ghibli.rest</h1>
        </div>
        <div className={`${styles.links}`}>
          <Link href="/">Home</Link>
          <a onClick={() => scrollToClass("demo")}>Demo</a>
          <Link href="/status">Status</Link>
          <Link href="/docs">Docs</Link>
          <Link href="https://donate.ghibli.rest" className={styles.donate}>
            Donate
          </Link>
        </div>
        <i className={`bx bx-menu`}></i>
      </nav>
      <div className={`${styles.nav__mobile}`}>
        <h1>ghibli.rest</h1>
        <Link href="/">Home</Link>
        <a onClick={() => scrollToClass("demo")}>Demo</a>
        <Link href="/status">Status</Link>
        <Link href="/docs">Docs</Link>
        <Link href="https://donate.ghibli.rest" className={styles.donate}>
          Donate
        </Link>
      </div>
    </>
  );
}
