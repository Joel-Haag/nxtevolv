import {useEffect, useState} from "react";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import Navbar from "react-bootstrap/Navbar";
import {Container} from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import Nav from "react-bootstrap/Nav";
import {ABeeZee, Roboto} from "next/font/google";


const titleText = ABeeZee({
    subsets: ['latin'],
    weight: '400'
})

const roboto = Roboto({
    subsets: ['latin'],
    weight: '700'
})


export default function Contact() {
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
        <div className={"contact-page-container"}>
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
                            <Nav.Link href="contact" className="nav-link contact-link">CONTACT US</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className={"contact-page-content-container"}>
                <div className="contact-page-header">
                    <div className="contact-page-header-text">
                        <h1 className={`contact-page-header-text-one ${roboto.className}`}>INTERESTED IN THE</h1>
                        <h1 className={`contact-page-header-text-two ${roboto.className}`}>NXT EVOLUTION?</h1>
                        <h2 className={`contact-page-header-text-three ${roboto.className}`}>CONTACT US</h2>
                    </div>
                </div>
                <div className="contact-page-content">
                    <div className="contact-page-content-left">
                        {/*emails and numbers*/}
                        <div className="contact-page-content-left-text">
                            <p className={`contact-page-content-left-text-one ${roboto.className}`}>info@nxtevolvmedia.com</p>
                            <p className={`contact-page-content-left-text-two ${roboto.className}`}>Sales@nxtevolvmedia.com</p>
                            <p className={`contact-page-content-left-text-three ${roboto.className}`}>+27 71 352 6388</p>
                            <p className={`contact-page-content-left-text-four ${roboto.className}`}>Gabriel@nxtevolvmedia.com</p>
                        </div>
                    </div>
                    {/*email form to fill out, 1 name, 2, email, 3 contact*/}
                    <div className={"contact-page-content-right"}>
                        <form className={"contact-page-content-right-form"}>

                            <input className={`contact-page-content-right-form-name ${roboto.className}`} type="text" id="name" name="name"
                                   placeholder="Your name.."/>
                            <input className={`contact-page-content-right-form-email ${roboto.className}`} type="email" id="email"
                                   name="email" placeholder="Your email.."/>
                            <textarea
                                id="message"
                                name="message"
                                className={`contact-page-content-right-form-message ${roboto.className}`}
                                placeholder="Give us the info of your project. We'd love to work with you!"
                            ></textarea>
                            <input className={`contact-page-content-right-form-submit ${roboto.className}`} type="submit" value="Submit"/>

                        </form>
                    </div>


                </div>
            </div>

        </div>
    )
}