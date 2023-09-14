import styles from '../styles/Home.module.css'
import Logo from "@/components/logo/logo";

import {Canvas} from "@react-three/fiber"
import {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


import {ABeeZee, Orbitron, Roboto} from 'next/font/google'
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import {Parallax} from "react-scroll-parallax";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: '400'
})

const titleText = ABeeZee({
    subsets: ['latin'],
    weight: '400'
})

const roboto = Roboto({
    subsets: ['latin'],
    weight: '700'
})


export default function Home() {
    const [logoVisible, setLogoVisible] = useState(true);
    const [showNavbar, setShowNavbar] = useState(false);
    const [slideDown, setSlideDown] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('none');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [rotation, setRotation] = useState(0);


    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({x: event.clientX, y: event.clientY});
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const calculateDistance = (x1, y1, x2, y2) => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    };


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY; // Get scroll position from the window
            setScrollPosition(currentScrollY);

            // Rotate the x based on scroll position
            const rotateAngle = scrollY * 0.1;
            setRotation(rotateAngle);

            //for pillar backgrounds

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


    useEffect(() => {
        const handlePageClick = () => {
            setLogoVisible(false);
            setShowNavbar(true);
            setSlideDown(true)
        };

        document.addEventListener('click', handlePageClick);

        return () => {
            document.removeEventListener('click', handlePageClick);
        };
    }, []);


    return (
        <div className={"home-page-container"}>

            {!logoVisible && (
                <>
                    {/*3 dots*/}
                    <img src={"socials/Facebook-02.svg"} className="home-page-dot"></img>
                    <img src={"socials/Instagram.svg"} className="home-page-dot"></img>
                    <img src={"socials/LinkedIn-03.svg"} className="home-page-dot"></img>
                    {/*end 3 dots*/}

                    <img src={"about/Colourblur.png"} alt="Your GIF"
                         className={"home-page-container-blur"}/>

                    {/* 6 X at bottom right*/}
                    <div className="about-page-x-container">
                        <div className={"about-page-x-container-row-one"}>
                            <img src={"/about/xPattern.png"} alt="Your GIF" className={"about-page-x-img"}
                                 style={{transform: `rotate(${rotation}deg)`}}
                            />
                            <img src={"/about/xPattern.png"} alt="Your GIF" className={"about-page-x-img"}
                                 style={{transform: `rotate(${rotation}deg)`}}/>
                            <img src={"/about/xPattern.png"} alt="Your GIF" className={"about-page-x-img"}
                                 style={{transform: `rotate(${rotation}deg)`}}/>
                        </div>
                        <div className={"about-page-x-container-row-two"}>
                            <img src={"/about/xPattern.png"} alt="Your GIF" className={"about-page-x-img"}
                                 style={{transform: `rotate(${rotation}deg)`}}/>
                            <img src={"/about/xPattern.png"} alt="Your GIF" className={"about-page-x-img"}
                                 style={{transform: `rotate(${rotation}deg)`}}/>
                            <img src={"/about/xPattern.png"} alt="Your GIF" className={"about-page-x-img"}
                                 style={{transform: `rotate(${rotation}deg)`}}/>
                        </div>
                    </div>
                </>
            )}
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
                            <Nav.Link href="" className="nav-link nav-link-items">HOME</Nav.Link>
                            <Nav.Link href="about" className="nav-link nav-link-items">ABOUT US</Nav.Link>
                            <Nav.Link href="#link" className="nav-link nav-link-items">SERVICES</Nav.Link>
                            <Nav.Link href="contact" className="nav-link contact-link">CONTACT US</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div>
                <div className={` ${logoVisible ? "first-container-one" : "first-container-two"}`}>
                    {logoVisible && (
                        <div className={"logo-container"}>
                            <Canvas camera={{position: [0, 0, 4], fov: 30}}>
                                <Logo/>
                            </Canvas>
                            {/*<img src={"/logos/logo.gif"} alt="Your GIF" className={styles.gifLogo}/>*/}
                        </div>
                    )}
                    {logoVisible && (
                        <div className={`logo-text-container ${slideDown ? "text-slide-down" : ''}`}>
                            <h1 className={`home-logo-text ${orbitron.className}`}>
                                NXT . EVOLV . MEDIA
                            </h1>
                        </div>
                    )}
                    {!logoVisible && (
                        <div className={"home-page-content"}>
                            {/*page one*/}
                            <div className={"home-page-intro"}>
                                <div className={"home-page-heading"}>
                                    <h1 className={`home-heading-text-one ${roboto.className}`}>
                                        WELCOME TO
                                    </h1>
                                    <h1 className={`home-heading-text-two ${roboto.className}`}>
                                        NXT EVOLV MEDIA
                                    </h1>
                                </div>
                                <div className={"home-page-sub-heading"}>
                                    <h2 className={`home-sub-heading-text ${roboto.className}`}>
                                        Thinking of taking your brand to the next level?
                                    </h2>
                                    <h2 className={`home-sub-heading-text ${roboto.className}`}>
                                        Contact us now and start your brand
                                        Evolution.
                                    </h2>
                                    <div className={"home-page-contact-button"}>
                                        <a href="/contact" className={"contact-button-link"}>
                                            <div className={"contact-button"}>
                                                CONTACT US
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/*  page two - who we are  */}
                            <div className={"home-page-who-container"}>
                                <div className={"home-page-who-heading"}>
                                    <h2 className={`home-heading-who-text-one ${roboto.className}`}>
                                        WHO IS
                                    </h2>
                                    <h2 className={`home-heading-who-text-two ${roboto.className}`}>
                                        NXT EVOLV MEDIA
                                    </h2>
                                </div>
                                <div className={"home-who-content"}>
                                    <p className={`home-who-paragraph-text-one ${roboto.className}`}>
                                        NXT Evolv Media is a digital marketing and media agency located in Johannesburg
                                        South Africa.
                                    </p>
                                    <p className={`home-who-paragraph-text-two ${roboto.className}`}>
                                        We are passionate about transforming the world of entertainment and the way
                                        brands connect with their audience. Our innovative approach combines
                                        cutting-edge
                                        technology, creative storytelling, and data-driven strategies to deliver
                                        unparalleled results.
                                    </p>
                                </div>
                            </div>
                            {/*  gap one with symbols  */}
                            <div className={"home-page-gap-one"}>
                                <div className={"home-gap-one-pillars-container"}>
                                    <Parallax speed={60}>
                                        <img src={"/about/LogoSinglePillar_1.png"} alt="Your GIF"
                                             className={"home-gap-one-pillar-one"}/>
                                    </Parallax>
                                    {/*<Parallax speed={5}>*/}
                                    {/*    <img src={"/backgroundPillar/pillar1.png"} alt="Your GIF"*/}
                                    {/*         className={"home-gap-one-pillar-two"}/>*/}
                                    {/*</Parallax>*/}
                                    <Parallax speed={25}>
                                        <img src={"/backgroundPillar/pillar1.png"} alt="Your GIF"
                                             className={"home-gap-one-pillar-three"}/>
                                    </Parallax>
                                    <Parallax speed={80}>
                                        <img src={"/backgroundPillar/pillar1.png"} alt="Your GIF"
                                             className={"home-gap-one-pillar-four"}/>
                                    </Parallax>
                                </div>
                            </div>

                            {/*  Philosophy section  */}
                            <div className={"home-page-philosophy-container"}>
                                <div className={"home-page-philosophy-heading"}>
                                    <h2 className={`home-heading-philosophy-text-one ${roboto.className}`}>
                                        WHAT'S THE
                                    </h2>
                                    <h2 className={`home-heading-philosophy-text-two ${roboto.className}`}>
                                        PHILOSOPHY
                                    </h2>
                                </div>
                                <div className={"home-philosophy-content"}>
                                    <p className={`home-philosophy-paragraph-text-one ${roboto.className}`}>
                                        At Nxt Evolv Media we believe in Excellence, a Strong Work Ethic, Great Overall
                                        Quality and Exponential Growth! Providing our clients with the utmost best!
                                    </p>
                                    <p className={`home-philosophy-paragraph-text-two ${roboto.className}`}>
                                        Excellence in media and digital marketing means always striving for the highest
                                        standard of quality and achievement.
                                    </p>
                                    <p className={`home-philosophy-paragraph-text-three ${roboto.className}`}>
                                        It means having a strong work ethic and putting hard work and effort necessary
                                        to succeed into each and every approach.
                                    </p>
                                    <p className={`home-philosophy-paragraph-text-four ${roboto.className}`}>
                                        It means being open to growth and learning, so that our company can continually
                                        improve and evolve as a digital marketing and media agency.
                                    </p>
                                    <p className={`home-philosophy-paragraph-text-five ${roboto.className}`}>
                                        At Nxt Evolv Media we are dedicated to excellence and are committed to helping
                                        our clients achieve the highest levels of success when it comes to their digital
                                        marketing presence and business goals.
                                    </p>
                                </div>
                            </div>

                            {/*  second gap  */}
                            <div className={"home-page-gap-two"}>
                                <div className={"home-gap-two-pillars-container"}>
                                    <Parallax speed={60}>
                                        <img src={"/about/LogoSinglePillar_1.png"} alt="Your GIF"
                                             className={"home-gap-two-pillar-one"}/>
                                    </Parallax>
                                    <Parallax speed={10}>
                                        <img src={"/backgroundPillar/pillar1.png"} alt="Your GIF"
                                             className={"home-gap-two-pillar-two"}/>
                                    </Parallax>
                                    <Parallax speed={25}>
                                        <img src={"/backgroundPillar/pillar1.png"} alt="Your GIF"
                                             className={"home-gap-two-pillar-three"}/>
                                    </Parallax>
                                    <Parallax speed={60}>
                                        <img src={"/backgroundPillar/pillar1.png"} alt="Your GIF"
                                             className={"home-gap-two-pillar-four"}/>
                                    </Parallax>
                                </div>
                            </div>

                            {/*  Interesting Facts Section  */}
                            <div className={"home-page-interesting-facts-container"}>
                                <div className={"home-page-interesting-facts-image-container"}>
                                    <img src={"/homePageImages/InterestingFactsChar.png"} alt="Your GIF"
                                         className={"home-page-interesting-fact-image"}/>
                                </div>
                                <div className={"home-page-interesting-facts-content-container"}>
                                    <div className={"home-page-interesting-facts-heading"}>
                                        <h2 className={`home-heading-interesting-facts-text-one ${roboto.className}`}>
                                            INTERESTING FACTS
                                        </h2>
                                    </div>
                                    <div className={"home-interesting-facts-content"}>
                                        <div className={"home-interesting-facts-content-col"}>
                                            <h3 className={`home-interesting-facts-title ${roboto.className}`}>
                                                75
                                            </h3>
                                            <p className={`home-interesting-facts-text ${roboto.className}`}>
                                                Percent of consumers agreed that they are keen on buying from brands
                                                that
                                                offer personalized digital experiences.
                                            </p>
                                        </div>
                                        <div className={"home-interesting-facts-content-col"}>
                                            <h3 className={`home-interesting-facts-title ${roboto.className}`}>
                                                4.9
                                            </h3>
                                            <p className={`home-interesting-facts-text ${roboto.className}`}>
                                                Billion people are active on social media!
                                            </p>
                                        </div>
                                        <div className={"home-interesting-facts-content-col"}>
                                            <h3 className={`home-interesting-facts-title ${roboto.className}`}>
                                                54
                                            </h3>
                                            <p className={`home-interesting-facts-text ${roboto.className}`}>
                                                Percent of internet users use social media to research services and
                                                products before purchasing.
                                            </p>
                                        </div>
                                        <div className={"home-interesting-facts-content-col"}>
                                            <h3 className={`home-interesting-facts-title ${roboto.className}`}>
                                                83
                                            </h3>
                                            <p className={`home-interesting-facts-text ${roboto.className}`}>
                                                Percent of search traffic comes from Google!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*  find out more section  */}
                            {/*    FIND OUT MORE SECTION */}
                            <div className={"about-find-out-more-container"}>

                                <img src={"about/Colourblur.png"} alt="Your GIF"
                                     className={"about-more-section-overlay"}/>
                                <div className={"about-find-out-more-logo"} data-aos="zoom-in-up"
                                     data-aos-duration="5000"
                                     data-aos-easing="linear" data-aos-offset="300">

                                    <img src={"/logos/logo.gif"} alt="Your GIF"
                                         className={"about-find-out-more-logo-image"}/>

                                </div>
                                <div className={"about-find-out-more-content"}>
                                    <div className={"about-find-out-more-header"}>
                                        <h1 className={`about-find-out-more-heading ${roboto.className}`}>
                                            NXT EVOLV MEDIA
                                        </h1>
                                    </div>
                                    <div className={"about-find-out-more-text"}>
                                        <p className={`about-find-out-more-paragraph ${titleText.className}`}>
                                            Keep your company in the loop let Nxt Evolv Media make your vision reality!
                                        </p>
                                    </div>
                                    <div className={"about-find-horizontal-container"}>
                                        <div className={"about-find-dots-container"}>
                                            <img src={"socials/Facebook-02.svg"}
                                                 className={"about-find-horizontal-dot"}></img>
                                            <img src={"socials/Instagram.svg"}
                                                 className={"about-find-horizontal-dot"}></img>
                                            <img src={"socials/LinkedIn-03.svg"}
                                                 className={"about-find-horizontal-dot"}></img>
                                        </div>
                                        <div className={"about-find-text"}>
                                            <p className={`about-find-text-paragraph ${titleText.className}`}>
                                                Find out more
                                            </p>
                                            {/*    Arrow icon now point down from font awesome*/}
                                            <div className="about-find-arrow-container">
                                                <FontAwesomeIcon
                                                    icon={faArrowDown}
                                                    style={{fontSize: 40, color: "teal"}}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className={"about-find-out-more-email-container"}>
                                        <p className={`about-find-out-more-email-paragraph ${titleText.className}`}>
                                            info@nxtevolvmedia.co.za
                                        </p>
                                    </div>

                                </div>

                            </div>


                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}