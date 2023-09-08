import {useState, useEffect, useRef} from 'react';


import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Orbitron, ABeeZee, Roboto} from 'next/font/google'
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import {Container} from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import {Parallax} from "react-scroll-parallax";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowDown,
} from "@fortawesome/free-solid-svg-icons";


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
    const [scrollY, setScrollY] = useState(0);
  const [rotation, setRotation] = useState(0);
    const imageRefs = {
        image1: useRef(null),
        image2: useRef(null),
        image3: useRef(null),
        image4: useRef(null),
    };


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY; // Get scroll position from the window
            setScrollPosition(currentScrollY);
            setScrollY(currentScrollY);

            // Rotate the image based on scroll position
            const rotateAngle = scrollY * 0.1;
            setRotation(rotateAngle);



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

    // Function to handle when an image enters the viewport
    let lastTimestamp;

const handleImageIntersection = (entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const imageRect = entry.target.getBoundingClientRect();
            const scrollPositionRelativeToImage = window.innerHeight - imageRect.top;

            if (scrollPositionRelativeToImage >= imageRect.height) {
                const scaleFactor = 1 + scrollPositionRelativeToImage * 0.005;

                if (lastTimestamp) {
                    const timestamp = performance.now();
                    const timeElapsed = timestamp - lastTimestamp;
                    const marginIncrement = 0.2 * (timeElapsed / 16); // Adjust 16 for a desired frame rate

                    // Get the current margin-left as a number (remove 'px' and parse as float)
                    const currentMarginLeft = parseFloat(getComputedStyle(entry.target).marginLeft);

                    // Calculate the new margin-left based on the scroll direction
                    let newMarginLeft = currentMarginLeft;

                    if (scrollDirection === 'down') {
                        newMarginLeft += marginIncrement + 0.3;
                    } else if (scrollDirection === 'up') {
                        newMarginLeft -= marginIncrement + 0.3;
                    }

                    entry.target.style.transform = `scale(${scaleFactor})`;
                    entry.target.style.marginLeft = `${newMarginLeft}px`;

                    const nextDiv = document.querySelector('.about-find-out-more-container');
                    const nextDivRect = nextDiv.getBoundingClientRect();
                    const opacity = 1 - (scrollPositionRelativeToImage / nextDivRect.top);
                    entry.target.style.opacity = opacity;

                    observer.unobserve(entry.target);
                }

                lastTimestamp = performance.now();
            }
        } else {
            entry.target.style.marginLeft = '';
            entry.target.style.opacity = '';
        }
    });
};



    // const handleImageIntersection = (entries, observer) => {
    //     entries.forEach((entry, index) => {
    //         if (entry.isIntersecting) {
    //             const imageRect = entry.target.getBoundingClientRect();
    //             const scrollPositionRelativeToImage = window.innerHeight - imageRect.top;
    //
    //             // Check if the image is fully visible
    //             if (scrollPositionRelativeToImage >= imageRect.height) {
    //                 const scaleFactor = 1 + scrollPositionRelativeToImage * 0.005;
    //
    //                 // Get the current margin-left as a number (remove 'px' and parse as float)
    //                 const currentMarginLeft = parseFloat(getComputedStyle(entry.target).marginLeft);
    //
    //                 // Calculate the new margin-left based on the original margin, scaling factor, and scroll direction
    //                 const marginLeftIncrement = 0.25; // Adjust as needed for the increment in left margin
    //                 let newMarginLeft = currentMarginLeft;
    //
    //                 if (scrollDirection === 'down') {
    //                     newMarginLeft += marginLeftIncrement;
    //                 } else if (scrollDirection === 'up') {
    //                     newMarginLeft -= marginLeftIncrement;
    //                 }
    //
    //                 entry.target.style.transform = `scale(${scaleFactor})`;
    //                 entry.target.style.marginLeft = `${newMarginLeft}px`; // Apply the new left margin
    //
    //                 // Calculate opacity based on scroll position relative to the next div
    //                 const nextDiv = document.querySelector('.about-find-out-more-container'); // Replace '.next-div' with your selector
    //                 const nextDivRect = nextDiv.getBoundingClientRect();
    //                 const opacity = 1 - (scrollPositionRelativeToImage / nextDivRect.top);
    //                 entry.target.style.opacity = opacity;
    //
    //                 observer.unobserve(entry.target);
    //             }
    //         } else {
    //             // Reset the margin and opacity to their original CSS values
    //             entry.target.style.marginLeft = ''; // Remove the custom margin-left
    //             entry.target.style.opacity = ''; // Remove the custom opacity
    //         }
    //     });
    // };

    // Set up the Intersection Observer for each image
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2,
        };

        for (const key in imageRefs) {
            if (imageRefs[key].current) {
                const observer = new IntersectionObserver(handleImageIntersection, observerOptions);
                observer.observe(imageRefs[key].current);
            }
        }
    }, [imageRefs]);


    useEffect(() => {
        if (scrollDirection === 'down') {
            setShowNavbar(false);
        } else if (scrollDirection === 'up') {
            setShowNavbar(true);
        }
    }, [scrollDirection]);


    return (
        <>
            <div className={"about-page-container"}>

                {/*Blur effect*/}
                {/*<Parallax speed={0}>*/}
                     <img src={"about/Colourblur.png"} alt="Your GIF"
                             className={"about-page-container-blur"}/>
                {/*</Parallax>*/}

                {/*3 dots*/}
                <div className="about-page-dot"></div>
                <div className="about-page-dot"></div>
                <div className="about-page-dot"></div>
                {/*end 3 dots*/}

                {/* 6 X at bottom right*/}
                <div className="about-page-x-container">
                    <div className={"about-page-x-container-row-one"}>
                        <img src={"/about/xPattern.png"} alt="Your GIF" className={"about-page-x-img"}   style={{ transform: `rotate(${rotation}deg)` }}
/>
                        <img src={"/about/xPattern.png"} alt="Your GIF" className={"about-page-x-img"} style={{ transform: `rotate(${rotation}deg)` }}/>
                        <img src={"/about/xPattern.png"} alt="Your GIF" className={"about-page-x-img"} style={{ transform: `rotate(${rotation}deg)` }}/>
                </div>
                    <div className={"about-page-x-container-row-two"}>
                        <img src={"/about/xPattern.png"} alt="Your GIF" className={"about-page-x-img"} style={{ transform: `rotate(${rotation}deg)` }}/>
                        <img src={"/about/xPattern.png"} alt="Your GIF" className={"about-page-x-img"} style={{ transform: `rotate(${rotation}deg)` }}/>
                        <img src={"/about/xPattern.png"} alt="Your GIF" className={"about-page-x-img"} style={{ transform: `rotate(${rotation}deg)` }}/>
                    </div>
                </div>

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
                    {/*<img src={"about/Colourblur.png"} alt="Your GIF"*/}
                    {/*     className={"about-page-container-overlay-blur"}/>*/}

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
                        {/*<img src={"about/Colourblur.png"} alt="Your GIF"*/}
                        {/*     className={"about-about-section-overlay"}/>*/}
                        {/*      <div*/}
                        {/*          className={"about-about-section-overlay"}></div>*/}

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
                                <Parallax speed={20}>
                                <p className={`about-about-section-paragraph-one ${titleText.className}`} >
                                    Nxt Evolv Media is a digital marketing and media agency that prides itself in
                                    improving
                                    and
                                    building businesses!
                                </p>
                                </Parallax>
                                               <Parallax speed={40}>
                                <p className={`about-about-section-paragraph-two ${titleText.className}`}>
                                    Nxt Evolv Media provides assistance in achieving client's business objectives by
                                    boosting
                                    their digital presence and allowing the business to reach their target audience. By
                                    doing
                                    this, Nxt Evolv Media prioritizes the needs of the client by using the finest
                                    approach.
                                    In
                                    return, the clients are rewarded with optimum growth, increased engagement and a
                                    stronger
                                    brand awareness.
                                </p>
                                               </Parallax>
                            </div>
                        </div>
                    </div>

                    {/*GAP SECTION WITH LOGO SYMBOLS*/}
                    <div className={"about-gap-section-one-container"}>
                        <img className={"about-about-progress-bar"} src={"/about/bottomProgressUp.png"}
                             alt="Your GIF"/>
                        <img className={"about-about-progress-bar-two"} src={"/about/bottomProgressInvisible.png"}
                             alt="Your GIF"/>
                        {/*<img src={"about/Colourblur.png"} alt="Your GIF"*/}
                        {/*     className={"about-gap-section-one-container-overlay"}/>*/}
                        <div className={"about-gap-one-pillars-container"}>
                            <Parallax speed={60}>
                                <img src={"/about/LogoSinglePillar_1.png"} alt="Your GIF"
                                     className={"about-gap-one-pillar-one"}/>
                            </Parallax>
                            <Parallax speed={5}>
                                <img src={"/backgroundPillar/pillar1.png"} alt="Your GIF"
                                     className={"about-gap-one-pillar-two"}/>
                            </Parallax>
                            <Parallax speed={25}>
                                <img src={"/backgroundPillar/pillar1.png"} alt="Your GIF"
                                     className={"about-gap-one-pillar-three"}/>
                            </Parallax>
                            <Parallax speed={80}>
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

                        {/*<img src={"about/Colourblur.png"} alt="Your GIF"*/}
                        {/*     className={"about-approach-section-overlay"}/>*/}
                        <div className={"about-approach-section-content"}>
                            <div className={"about-approach-section-header"}>
                                  <Parallax speed={10}>
                                <h1 className={`about-approach-section-heading ${roboto.className}`}>
                                    WHAT'S THE
                                </h1>
                                  </Parallax>
                                  <Parallax speed={20}>
                                <h1 className={`about-approach-section-heading ${roboto.className}`}><span
                                    className={"about-approach-section-heading-blue"}> APPROACH</span></h1></Parallax>

                            </div>
                            <div className={"about-approach-section-text"}>
                                  <Parallax speed={20}>
                                <p className={`about-approach-section-paragraph-one ${titleText.className}`}>
                                    Nxt Evolv Media understands how time consuming, stressful and difficult it is to
                                    identify
                                    the best strategy for your businesses branding, marketing and web design needs. In
                                    search of
                                    the right fit is vital, and this may be challenging when there are a hundred other
                                    tasks
                                    to
                                    get to...
                                </p>
                                  </Parallax>
                                  {/*<Parallax speed={30}>*/}
                                <p className={`about-approach-section-paragraph-two ${titleText.className}`}>
                                    A simple solution.... Let us handle this for you! At Nxt Evolv Media we believe that
                                    a
                                    client's time should be spent handling important business tasks while we work on the
                                    highest
                                    quality strategy for their digital presence!

                                    What you will be rewarded with: Less stress, more time and their media, marketing
                                    and
                                    branding goals met!
                                </p>
                                  {/*</Parallax>*/}
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
                        <img className={"about-vision-progress-bar-three"}
                             src={"/about/bottomProgressInvisibleDown.png"}
                             alt="Your GIF"/>
                        {/*<img src={"about/Colourblur.png"} alt="Your GIF"*/}
                        {/*     className={"about-gap-section-two-container-overlay"}/>*/}
                        <div className={"about-gap-two-pillars-container"}>
                            <Parallax speed={60}>
                                <img src={"/about/LogoSinglePillar_1.png"} alt="Your GIF"
                                     className={"about-gap-two-pillar-one"}/>
                            </Parallax>
                            <Parallax speed={55}>
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
                        {/*<img src={"about/Colourblur.png"} alt="Your GIF"*/}
                        {/*     className={"about-vision-section-overlay"}/>*/}
                        <div className={"about-vision-section-content"}>
                            <div className={"about-vision-section-header"}>
                                    <Parallax speed={10}>
                                <h1 className={`about-vision-section-heading ${roboto.className}`}>
                                    WHAT'S THE
                                </h1>
                                    </Parallax>
                                    <Parallax speed={20}>
                                <h1 className={`about-vision-section-heading ${roboto.className}`}><span
                                    className={"about-vision-section-heading-blue"}> VISION</span></h1>
                                    </Parallax>
                            </div>
                            <div className={"about-vision-section-text"}>
                                    <Parallax speed={20}>
                                <p className={`about-vision-section-paragraph-one ${titleText.className}`}>
                                    Our vision at Nxt Evolv Media is created around our client's needs and how we can
                                    help
                                    them
                                    achieve their business objectives! Making sure that when a client is dealing with
                                    Nxt
                                    Evolv
                                    Media they will always be winning and ahead of the competition.
                                </p>
                                    </Parallax>
                                <p className={`about-vision-section-paragraph-two ${titleText.className}`}>
                                    Our primary focus is our client's ROI, digital presence and brand.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/*small gap before more section*/}
                {/*<div className={"about-small-gap-before-more-section-container "}>*/}
                {/*    <Parallax speed={-50}>*/}
                {/*        <img className={"about-small-gap-before-more-section-img-one "}*/}
                {/*             ref={imageRefs.image1}*/}
                {/*             src={"/about/bottomProgressUp.png"}*/}
                {/*             alt="Your GIF"/>*/}
                {/*    </Parallax>*/}
                {/*    <Parallax speed={-50}>*/}
                {/*        <img className={"about-small-gap-before-more-section-img-two"}*/}
                {/*             src={"/about/bottomProgressUp.png"}*/}
                {/*             ref={imageRefs.image2}*/}
                {/*             alt="Your GIF"/>*/}
                {/*    </Parallax>*/}
                {/*    <Parallax speed={-50}>*/}
                {/*        <img className={"about-small-gap-before-more-section-img-three"}*/}
                {/*             src={"/about/bottomProgressDown.png"}*/}
                {/*             ref={imageRefs.image3}*/}
                {/*             alt="Your GIF"/>*/}
                {/*    </Parallax>*/}
                {/*    <Parallax speed={-50}>*/}
                {/*        <img className={"about-small-gap-before-more-section-img-four"}*/}
                {/*             src={"/about/bottomProgressInvisibleDown.png"}*/}
                {/*             ref={imageRefs.image4}*/}
                {/*             alt="Your GIF"/>*/}
                {/*    </Parallax>*/}
                {/*</div>*/}


                {/*    FIND OUT MORE SECTION */}
                <div className={"about-find-out-more-container"}>

                    <img src={"about/Colourblur.png"} alt="Your GIF"
                         className={"about-more-section-overlay"}/>
                    <div className={"about-find-out-more-logo"} data-aos="zoom-in-up" data-aos-duration="5000"
                         data-aos-easing="linear" data-aos-offset="300">

                        <img src={"/logos/logo.gif"} alt="Your GIF" className={"about-find-out-more-logo-image"}/>

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
                                <div className={"about-find-horizontal-dot"}></div>
                                <div className={"about-find-horizontal-dot"}></div>
                                <div className={"about-find-horizontal-dot"}></div>
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
        </>
    )

}