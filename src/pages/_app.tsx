import '@/styles/globals.css'
import KofiButton from 'kofi-button'
import styles from '../styles/Home.module.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return  <><Component {...pageProps} /><div className={styles.KofiButton}><KofiButton color="#ff5f5d" title="Donate" kofiID="ghiblirest" /></div></>
}
