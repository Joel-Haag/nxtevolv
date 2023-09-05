import {useState, useEffect, useRef} from 'react';


import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Orbitron, ABeeZee, Roboto} from 'next/font/google'
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import {Container} from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import {Parallax} from "react-scroll-parallax";


const titleText = ABeeZee({
    subsets: ['latin'],
    weight: '400'
})

const roboto = Roboto({
    subsets: ['latin'],
    weight: '700'
})

export default function About() {
    const [showNavbar, setShowNavbar] = useState(true);
    const [scrollDirection, setScrollDirection] = useState('none');
    const [scrollPosition, setScrollPosition] = useState(0);


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY; // Get scroll position from the window
            setScrollPosition(currentScrollY);


            // Check scroll direction
            if (currentScrollY > scrollPosition) {
                setScrollDirection('down');
            } else if (currentScrollY < scrollPosition) {
                setScrollDirection('up');
            }

            // Update scroll position
            setScrollPosition(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll); // Use window scroll event

        return () => {
            window.removeEventListener('scroll', handleScroll); // Remove the event listener when component unmounts
        };
    }, [scrollPosition]);


    useEffect(() => {
        if (scrollDirection === 'down') {
            setShowNavbar(false);
        } else if (scrollDirection === 'up') {
            setShowNavbar(true);
        }
    }, [scrollDirection]);


    return (
        <div className={"about-page-container"}>

            {/*3 dots*/}
            <div className="about-page-dot"></div>
            <div className="about-page-dot"></div>
            <div className="about-page-dot"></div>
            {/*end 3 dots*/}

            <CustomCursor/>
            <Navbar
                expand="lg"
                variant="dark"
                className={`bg-black ${showNavbar ? '' : 'navbar-hidden'} `}
            >


                <Container>
                    <Navbar.Brand href="#home">
                        <div className="navLogoContainer">
                            <img src={"/logos/logo.gif"} alt="Your GIF" className={styles.gifNavLogo}/>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav className="me-0 ms-auto ">
                            <Nav.Link href="/" className="nav-link nav-link-items">HOME</Nav.Link>
                            <Nav.Link href="about" className="nav-link nav-link-items">ABOUT US</Nav.Link>
                            <Nav.Link href="#link" className="nav-link nav-link-items">SERVICES</Nav.Link>
                            <Nav.Link href="#link" className="nav-link contact-link">CONTACT US</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/*ABOUT HEADER SECTION*/}

            <div className={`about-header-container ${roboto.className}`}>
                {/*Overlay effect with the blue*/}
                <img src={"about/Colourblur.png"} alt="Your GIF"
                     className={"about-page-container-overlay-blur"}/>

                {/*end of overlay effect*/}
                <div className={"about-header-content"}>
                    <h1 className={"about-header-heading"}> THE NEXT </h1>
                    <h1 className={"about-header-heading"}><span className={"about-header-blue"}> EVOLUTION </span>
                    </h1>
                    <h1 className={"about-header-heading"}> OF </h1>
                    <h1 className={"about-header-heading"}> MEDIA </h1>
                </div>
            </div>

            {/*END ABOUT HEADER SECTION*/}

            {/*ABOUT SECTION*/}
            <div className={"about-about-content-placing"}>
                <div className={"about-circle-container"}>
                    <img src={"/about/circle.png"} alt="Your GIF" className={"about-circle-img"}/>
                </div>
                <div className={"about-x-container"}>
                    <img src={"/about/x.png"} alt="Your GIF" className={"about-x-img"}/>
                </div>
                <div className={"about-about-section-container"}>
                    <img src={"about/Colourblur.png"} alt="Your GIF"
                         className={"about-about-section-overlay"}/>

                    <div className={"about-about-section-content"}>
                        <img className={"about-about-progress-bar"} src={"/about/bottomProgressUp.png"}
                             alt="Your GIF"/>
                        <div className={"about-about-section-header"}>
                            <Parallax speed={-30}>
                                <h1 className={`about-about-section-heading ${roboto.className}`}><span
                                    className={"about-header-blue"}> NXT EVOLV MEDIA </span>
                                </h1>
                            </Parallax>
                            <h1 className={`about-about-section-heading ${roboto.className}`}> ABOUT</h1>
                        </div>
                        <div className={"about-about-section-text"}>
                            <p className={`about-about-section-paragraph-one ${titleText.className}`}>
                                Nxt Evolv Media is a digital marketing and media agency that prides itself in improving
                                and
                                building businesses!
                            </p>
                            <p className={`about-about-section-paragraph-two ${titleText.className}`}>
                                Nxt Evolv Media provides assistance in achieving client's business objectives by
                                boosting
                                their digital presence and allowing the business to reach their target audience. By
                                doing
                                this, Nxt Evolv Media prioritizes the needs of the client by using the finest approach.
                                In
                                return, the clients are rewarded with optimum growth, increased engagement and a
                                stronger
                                brand awareness.
                            </p>
                        </div>
                    </div>
                </div>

                {/*GAP SECTION WITH LOGO SYMBOLS*/}
                <div className={"about-gap-section-one-container"}>
                    <img className={"about-about-progress-bar"} src={"/about/bottomProgressUp.png"}
                         alt="Your GIF"/>
                                         <img className={"about-about-progress-bar-two"} src={"/about/bottomProgressInvisible.png"}
                         alt="Your GIF"/>
                    <img src={"about/Colourblur.png"} alt="Your GIF"
                         className={"about-gap-section-one-container-overlay"}/>
                    <div className={"about-gap-one-pillars-container"}>
                        <Parallax speed={10}>
                            <img src={"/about/LogoSinglePillar_1.png"} alt="Your GIF"
                                 className={"about-gap-one-pillar-one"}/>
                        </Parallax>
                        <Parallax speed={-10}>
                            <img src={"/backgroundPillar/pillar1.png"} alt="Your GIF"
                                 className={"about-gap-one-pillar-two"}/>
                        </Parallax>
                        <Parallax speed={30}>
                            <img src={"/backgroundPillar/pillar1.png"} alt="Your GIF"
                                 className={"about-gap-one-pillar-three"}/>
                        </Parallax>
                        <Parallax speed={-20}>
                            <img src={"/backgroundPillar/pillar1.png"} alt="Your GIF"
                                 className={"about-gap-one-pillar-four"}/>
                        </Parallax>
                    </div>
                </div>
            </div>


            {/*APPROACH SECTION*/}
            <div className={"about-approach-content-placing"}>
                <div className={"about-approach-section-container"}>
                    <img className={"about-approach-progress-bar-one"} src={"/about/bottomProgressInvisible.png"}
                         alt="Your GIF"/>
                    <img className={"about-approach-progress-bar-two"} src={"/about/bottomProgressUp.png"}
                         alt="Your GIF"/>

                    <img src={"about/Colourblur.png"} alt="Your GIF"
                         className={"about-approach-section-overlay"}/>
                    <div className={"about-approach-section-content"}>
                        <div className={"about-approach-section-header"}>
                            <h1 className={`about-approach-section-heading ${roboto.className}`}>
                                WHAT'S THE
                            </h1>
                            <h1 className={`about-approach-section-heading ${roboto.className}`}><span
                                className={"about-approach-section-heading-blue"}> APPROACH</span></h1>
                        </div>
                        <div className={"about-approach-section-text"}>
                            <p className={`about-approach-section-paragraph-one ${titleText.className}`}>
                                Nxt Evolv Media understands how time consuming, stressful and difficult it is to
                                identify
                                the best strategy for your businesses branding, marketing and web design needs. In
                                search of
                                the right fit is vital, and this may be challenging when there are a hundred other tasks
                                to
                                get to...
                            </p>
                            <p className={`about-approach-section-paragraph-two ${titleText.className}`}>
                                A simple solution.... Let us handle this for you! At Nxt Evolv Media we believe that a
                                client's time should be spent handling important business tasks while we work on the
                                highest
                                quality strategy for their digital presence!

                                What you will be rewarded with: Less stress, more time and their media, marketing and
                                branding goals met!
                            </p>
                        </div>

                    </div>
                </div>

                {/*  Gap section  */}
                {/*GAP SECTION WITH LOGO SYMBOLS*/}
                <div className={"about-gap-section-two-container"}>
                                 <img className={"about-approach-progress-bar-one"} src={"/about/bottomProgressInvisible.png"}
                         alt="Your GIF"/>
                    <img className={"about-approach-progress-bar-two"} src={"/about/bottomProgressUp.png"}
                         alt="Your GIF"/>
                         <img className={"about-vision-progress-bar-three"} src={"/about/bottomProgressInvisible.png"}
                         alt="Your GIF"/>
                    <img src={"about/Colourblur.png"} alt="Your GIF"
                         className={"about-gap-section-two-container-overlay"}/>
                    <div className={"about-gap-two-pillars-container"}>
                        <Parallax speed={30}>
                            <img src={"/about/LogoSinglePillar_1.png"} alt="Your GIF"
                                 className={"about-gap-two-pillar-one"}/>
                        </Parallax>
                        <Parallax speed={-10}>
                            <img src={"/backgroundPillar/pillar1.png"} alt="Your GIF"
                                 className={"about-gap-two-pillar-two"}/>
                        </Parallax>
                    </div>
                </div>
            </div>


            {/*VISION SECTION*/}
            <div className={"about-vision-content-placing"}>
                <div className={"about-vision-section-container"}>
                    <img className={"about-vision-progress-bar-one"} src={"/about/bottomProgressInvisible.png"}
                         alt="Your GIF"/>
                    <img className={"about-vision-progress-bar-two"} src={"/about/bottomProgressInvisible.png"}
                         alt="Your GIF"/>
                    <img className={"about-vision-progress-bar-three"} src={"/about/bottomProgressDown.png"}
                         alt="Your GIF"/>
                    <img src={"about/Colourblur.png"} alt="Your GIF"
                         className={"about-vision-section-overlay"}/>
                    <div className={"about-vision-section-content"}>
                        <div className={"about-vision-section-header"}>
                            <h1 className={`about-vision-section-heading ${roboto.className}`}>
                                WHAT'S THE
                            </h1>
                            <h1 className={`about-vision-section-heading ${roboto.className}`}><span
                                className={"about-vision-section-heading-blue"}> VISION</span></h1>
                        </div>
                        <div className={"about-vision-section-text"}>
                            <p className={`about-vision-section-paragraph-one ${titleText.className}`}>
                                Our vision at Nxt Evolv Media is created around our client's needs and how we can help
                                them
                                achieve their business objectives! Making sure that when a client is dealing with Nxt
                                Evolv
                                Media they will always be winning and ahead of the competition.
                            </p>
                            <p className={`about-vision-section-paragraph-two ${titleText.className}`}>
                                Our primary focus is our client's ROI, digital presence and brand.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )

}