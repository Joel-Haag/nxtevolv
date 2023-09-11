import styles from '../styles/Home.module.css'
import Logo from "@/components/logo/logo";

import {Canvas} from "@react-three/fiber"
import {useEffect, useRef, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


import {ABeeZee, Orbitron} from 'next/font/google'
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import Link from "next/link";

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: '400'
})

const titleText = ABeeZee({
    subsets: ['latin'],
    weight: '400'
})


export default function Home() {
    const [logoVisible, setLogoVisible] = useState(true);
    const [showNavbar, setShowNavbar] = useState(false);
    const [slideDown, setSlideDown] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('none');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [pileScale, setPileScale] = useState(1);
    const [groundScale, setGroundScale] = useState(1);
    const [pillar1Y, setPillar1Y] = useState(0);
    const [pillar2Y, setPillar2Y] = useState(0);

    const pillar1Style = {
        transform: `translateY(${pillar1Y}%)`,
    };
    const pillar2Style = {
        transform: `translateY(${pillar2Y}%)`,
    };

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


    const handleImageHover = () => {
        const circleRadius = 100; // Adjust the radius of the circle
        const centerX = window.innerWidth / 2; // Adjust the center of the circle
        const centerY = window.innerHeight / 2; // Adjust the center of the circle
        const distance = calculateDistance(mousePosition.x, mousePosition.y, centerX, centerY);
        const maxDistance = circleRadius; // Adjust the max distance for full brightness

        const baseBrightness = 0.8; // Adjust the base brightness when not hovering
        const maxBrightness = 1; // Adjust the maximum brightness when fully hovered

        // Calculate the brightness based on the hover distance
        // Adjust the formula to achieve the desired focus effect
        const brightness = baseBrightness + ((maxBrightness - baseBrightness) * (1 - Math.pow(Math.min(distance / maxDistance, 1), 2)));

        // Update the brightness of the hovered area
        const groundImage = document.querySelector(`.${styles.ImageLightContainer}`);
        groundImage.style.filter = `brightness(${brightness})`;
    };

    useEffect(() => {
        const groundImage = document.querySelector(`.${styles.ImageLightContainer}`);

        if (groundImage) {
            groundImage.addEventListener('mousemove', handleImageHover);

            return () => {
                groundImage.removeEventListener('mousemove', handleImageHover);
            };
        }
    }, [mousePosition]);

    const lightLineRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY; // Get scroll position from the window
            setScrollPosition(currentScrollY);

            //for pillar backgrounds
            const scrollProgress = scrollPosition / (document.body.scrollHeight - window.innerHeight);
            setPillar1Y(-300 * scrollProgress);
            setPillar2Y(750 * scrollProgress);

            // Calculate pile image scale based on scroll position
            const maxScale = 1.6;
            const minScale = 0.5;
            const scaleFactorPiles = (currentScrollY / (window.innerHeight * 0.5)) * (maxScale - minScale);
            const scaleFactorImage = (currentScrollY / (window.innerHeight * 1)) * (maxScale - minScale);
            const newPileScale = Math.max(minScale, maxScale - scaleFactorPiles);
            const newGroundScale = Math.max(0.5, 1 - scaleFactorImage);

            // Apply scale transformation to .pilesImage and .ImageLightContainer
            setPileScale(newPileScale);
            setGroundScale(newGroundScale);

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
        <div className={styles.homePageContainer}>
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
            {/*{logoVisible && (                               <CustomCursor />*/}
            {/*    )}*/}
            <div id={"homeContainer"} className={styles.homeContainer}>
                <div className={styles.firstContainer} style={{"--scroll-position": `${-scrollPosition}px`}}>
                    {logoVisible && (
                        <div className={styles.logoContainer}>
                            <Canvas camera={{position: [0, 0, 4], fov: 30}}>
                                <Logo/>
                            </Canvas>
                            {/*<img src={"/logos/logo.gif"} alt="Your GIF" className={styles.gifLogo}/>*/}
                        </div>
                    )}
                    {!logoVisible && (
                        <div className={styles.ImageLightContainer}
                            // style={{"--scroll-position": `${-scrollPosition}px`, transform: `scale(${groundScale})`}}>
                        >
                            <div className={styles.groundImageContainer}
                                 style={{"--scroll-position": `${-scrollPosition}px`}}>
                                <img src="/piles/Pile_1.png"
                                    // style={{transform: `scale(${pileScale})`}}
                                     alt="Above Light Line" className={styles.pilesImage}
                                     draggable={false}
                                />

                                <img src="/ground/groundimgCut.png" alt="Above Light Line"
                                    // style={{ transform: `scale(${groundScale})` }}
                                     className={styles.groundImage}
                                     draggable={false}/>
                                <div className={styles.groundImageHoverEffect}></div>
                            </div>
                            <div ref={lightLineRef} className={styles.lightLine}
                                 style={{"--scroll-position": `${-scrollPosition}px`}}>
                                &nbsp;
                            </div>
                        </div>
                    )}
                    <div className={`${styles.logoTextContainer} ${slideDown ? styles.textSlideDown : ''}`}>
                        <h1 className={`${styles.homeLogoText} ${orbitron.className}`}>
                            NXT . EVOLV . MEDIA
                        </h1>
                    </div>
                </div>
                {!logoVisible && (
                    <>
                        <div className={styles.secondContainer}>
                            <div className={styles.sloganContainer}
                                 style={{"--scroll-position": `${-scrollPosition}px`}}>
                                <h2 className={`${styles.sloganText} ${orbitron.className}`}>The next evolution of media
                                    and
                                    marketing.</h2>
                            </div>
                            <div className={styles.homeSecondContentContainer}>
                                <Row className={styles.homeContentContainerLeft}>
                                    <Col xs={12} sm={6} md={12}
                                         data-aos="fade-right"
                                         className={`${styles.homeContentColImgLeft}`}>
                                        <img
                                            src="/homePageImages/car12.jpg"
                                            className={styles.homeContentImgLeft}
                                        />

                                    </Col>
                                    <Col xs={12} md={6} sm={6}
                                         className={styles.homeContentColTextLeftOne}
                                         data-aos="zoom-in-up"
                                    >
                                        <div className={styles.homeContentContainerTextLeft}
                                        >
                                            <h3 className={`${styles.homeContentHeadingLeft} ${titleText.className}`}>Who
                                                we
                                                are.</h3>
                                            <p className={`${styles.homeContentTextLeft} ${titleText.className}`}>Nxt
                                                Evolv
                                                Media is a
                                                digital marketing and media agency that prides
                                                itself
                                                in improving and building businesses!</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={styles.homeContentContainerRight}>
                                    <Col xs={12} md={6} sm={6} className={styles.homeContentColImgRight}
                                         data-aos="fade-right"
                                    >
                                        <img
                                            src="/homePageImages/car22.jpg"
                                            className={styles.homeContentImgRight}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} sm={6} className={styles.homeContentColTextRight}
                                         data-aos="zoom-in-up"
                                    >
                                        <div className={styles.homeContentContainerTextRight}
                                        >
                                            <h3 className={`${styles.homeContentHeadingRight} ${titleText.className}`}>What
                                                we
                                                do.</h3>
                                            <p className={`${styles.homeContentTextRight} ${titleText.className}`}>We
                                                work
                                                on
                                                the highest quality strategy, using our many services to give your
                                                company
                                                the
                                                best digital presence possible</p>

                                            <div className={styles.homeAboutButton}><Link
                                                className={styles.homeAboutLink} href={"about"}> About us</Link></div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={styles.homeContentContainerLeft}>
                                    <Col xs={12} md={6} sm={6} className={styles.homeContentColImgLeft}>
                                        <img
                                            data-aos="fade-right"
                                            src="/homePageImages/car23.jpg"
                                            className={styles.homeContentImgLeft}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} sm={6} className={styles.homeContentColTextLeftTwo}
                                         data-aos="zoom-in-up"
                                    >
                                        <div className={styles.homeContentContainerTextLeft}
                                        >
                                            <h3 className={`${styles.homeContentHeadingLeft} ${titleText.className}`}>How
                                                we
                                                do
                                                it.</h3>
                                            <p className={`${styles.homeContentTextLeft} ${titleText.className}`}> We
                                                give
                                                you
                                                the brand you deserve via Social Media Marketing, Web design,
                                                Search engine optimization and more</p>
                                            <div className={styles.homeAboutButton}>Services</div>
                                        </div>
                                    </Col>
                                </Row>
                                <div className={styles.thirdContainer}>
                                    <div className={styles.thirdContentHeading}>
                                        <h3 className={styles.thirdContentHeadingText}>Our Philosophy</h3>
                                    </div>
                                    <div className={styles.philosophyContainer}>

                                        <div className={styles.philosophyBoxOne}>
                                            <p className={`${styles.philosophyTextOne} ${titleText.className}`}>At
                                                Nxt
                                                Evolv Media we believe in Excellence, a Strong Work Ethic, Great
                                                Overall Quality and Exponential Growth! Providing our clients with
                                                the
                                                utmost best!</p>
                                            <p className={`${styles.philosophyTextOne} ${titleText.className}`}>-
                                                Gabriel Coelho, Founder and Owner.</p>
                                        </div>

                                        <div className={styles.philosophyBoxTwoContainer}>
                                            <div className={styles.philosophyBoxTwo}>
                                                <p className={`${styles.philosophyTextTwo} ${titleText.className}`}>
                                                    <span className={styles.philosophyTextHead}> Excellence </span>
                                                    <span className={`${styles.philosophyTextNormal}`}
                                                          style={{"--scroll-position": `${scrollPosition}px`}}>
                                                        in media and digital marketing means always striving for the
                                                        highest
                                                        standard of</span>
                                                    <span className={styles.philosophyTextHead}> quality </span>
                                                    <span className={styles.philosophyTextNormal}>
                                                        and achievement. It means having a
                                                        </span>
                                                    <span
                                                        className={styles.philosophyTextHead}> strong work ethic </span>
                                                    <span className={styles.philosophyTextNormal}>
                                                        and putting hard work and effort necessary to succeed into each
                                                        and every approach. It means being open to
                                                        </span>
                                                    <span className={styles.philosophyTextHead}> growth </span>
                                                    <span className={styles.philosophyTextNormal}>
                                                        and learning, so that our company can continually improve and
                                                        evolve as a digital marketing and media agency. At Nxt Evolv Media we are
                                                        dedicated to excellence and are
                                                        committed to helping our clients achieve the highest levels of
                                                        success when it comes to their digital marketing presence and business goals.
                                                        </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}