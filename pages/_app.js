import '@/styles/globals.css'
import '@/styles/navbar.css'
import '@/styles/cursor.css'
import '@/styles/about.css'
import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";
import {ParallaxProvider} from "react-scroll-parallax";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;


export default function App({Component, pageProps}) {

    useEffect(() => {
        AOS.init({
            // easing: "ease-out-cubic",
            // once: true,
            offset: 50,
            duration: 2000
        });
    }, []);


    return (
        <ParallaxProvider scrollAxis='vertical'>
            <Component {...pageProps} />
        </ParallaxProvider>
    )

}
