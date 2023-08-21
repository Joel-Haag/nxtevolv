import {useState, useEffect, useRef} from 'react';


import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Orbitron, ABeeZee} from 'next/font/google'
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import {Container} from "react-bootstrap";
import styles from '../../styles/Home.module.css'


const roboto = Orbitron({
    subsets: ['latin'],
    weight: '400'
})

const titleText = ABeeZee({
    subsets: ['latin'],
    weight: '400'
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
        <>
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
            {/*ABOUT SECTION*/}
            <div className="about-container">
                <div className={`about-heading-container ${titleText.className}`}>
                    <h1 className="about-heading">ABOUT US</h1>
                    <div className="about-heading-underline"/>
                </div>
                <div className={`about-content-container`}>
                    <p className={`about-content-text ${titleText.className}`}>
                        <span className={"about-content-text-header"}>Nxt</span> Evolv Media is a digital marketing and
                        media agency that prides itself in improving and
                        building businesses!
                    </p>
                    <p className={`about-content-text ${titleText.className}`}>
                        Nxt <span className={"about-content-text-header"}>Evolv </span> Media provides
                        assistance in achieving client's business objectives by boosting their digital presence and
                        allowing the business to reach their target audience. By doing this, Nxt Evolv <span
                        className={"about-content-text-header"}>Media </span> prioritizes
                        the needs of the client by using the finest approach. In return, the clients are rewarded with
                        optimum growth, increased engagement and a stronger brand awareness.
                    </p>
                </div>
            </div>

            {/*APPROACH SECTION*/}
            <div className="approach-container">
                <div className={`approach-heading-container ${titleText.className}`}>
                    <h1 className="approach-heading" data-aos="fade-right">APPROACH</h1>
                    <div className="approach-heading-underline"/>
                </div>
                <div className={`approach-content-container`}>
                    <div className={`approach-content-image-container `}>
                        <img src={"/piles/4PillarPile.png"} alt="Your GIF" className={"approach-content-image"} data-aos="zoom-in"/>
                    </div>
                    <div className="approach-content-text-container">
                        <p className={`approach-content-text ${titleText.className}`} data-aos="fade-left">
                            Nxt Evolv Media understands how time consuming, stressful and difficult it is to identify
                            the
                            best strategy for your businesses branding, marketing and web design needs. In search of the
                            right fit is vital, and this may be challenging when there are a hundred other tasks to get
                            to...
                        </p>
                        <p className={`approach-content-text ${titleText.className}`} data-aos="fade-right">
                            A simple solution.... Let us handle this for you! At Nxt Evolv Media we believe that a
                            client's
                            time should be spent handling important business tasks while we work on the highest quality
                            strategy for their digital presence!
                        </p>
                        <p className={`approach-content-text ${titleText.className}`} data-aos="fade-left">
                            What you will be rewarded with: Less stress, more time and their media, marketing and
                            branding
                            goals met!
                        </p>
                    </div>
                </div>
            </div>

            {/*VISION SECTION*/}
            <div className="vision-container">
                <div className={`vision-heading-container ${titleText.className}`} data-aos="zoom-in-down">
                    <h1 className="vision-heading">WHAT'S THE VISION</h1>
                    <div className="vision-heading-underline"/>
                </div>
                <div className={`vision-content-container`}>
                    <div className={"vision-content-image-container"}>
                        <img src={"/vision/vision.webp"} alt="Your GIF" className={"vision-content-image"} data-aos="flip-left"/>
                    </div>
                    <div className="vision-content-text-container">
                        <p className={`vision-content-text ${titleText.className}`} data-aos="zoom-out-right">
                            Our vision at Nxt Evolv Media is created around our client's needs and how we can help them
                            achieve their business objectives! Making sure that when a client is dealing with Nxt Evolv
                            Media they will always be winning and ahead of the competition.
                        </p>
                        <p className={`vision-content-text ${titleText.className}`} data-aos="zoom-out-right">
                            Our primary focus is our client's ROI, digital presence and brand.
                        </p>
                    </div>
                </div>
            </div>

        </>
    )

}