import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import {useRef, useState} from "react";
import StarsCanvas from "../../components/canves/Star.jsx";
import SpacemanCanvas from "../../components/canves/Spaceman.jsx";

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");
    const scrollContainer = useRef(null);

    return (
        <div className="homepage" ref={scrollContainer}>
            {/* 添加星空背景 */}
            <StarsCanvas />

            <img src="/orbital.png" alt="" className="orbital" />
            <div className="left">
                <h1>Stock Chat AI</h1>
                <h2>Supercharge your creativity and productivity</h2>
                <h3>
                    CIS 550 Final Project
                </h3>
                <Link to="/dashboard">Get Started</Link>
            </div>
            <div className="right">
                <div className="imgContainer">
                    {/*<div className="bgContainer">*/}
                    {/*    <div className="bg"></div>*/}
                    {/*</div>*/}
                    {/* 替换机器人图片为SpacemanCanvas */}
                    <div className="spaceman-container">
                        <SpacemanCanvas scrollContainer={scrollContainer}/>
                    </div>
                    <div className="chat">
                        <img
                            src={
                                typingStatus === "Yuchen"
                                    ? "/human3.jpeg"
                                    : typingStatus === "Muyu"
                                        ? "/human5.jpeg"
                                        : typingStatus === "Nathan"
                                            ? "/human1.jpeg"
                                            : typingStatus === "Nikunj"
                                                ? "/human4.jpeg"
                                                : "bot.png"
                            }
                            alt=""
                        />
                        <TypeAnimation
                            sequence={[
                                () => {
                                    setTypingStatus("Yuchen");
                                },
                                "Yuchen: Excited to build this AI-powered stock analysis platform!",
                                2500,
                                () => {
                                    setTypingStatus("Muyu");
                                },
                                "Muyu: Leveraging RAG to make stock analysis smarter than ever!",
                                2500,
                                () => {
                                    setTypingStatus("Nathan");
                                },
                                "Nathan: Real-time insights at your fingertips!",
                                2500,
                                () => {
                                    setTypingStatus("Nikunj");
                                },
                                "Nikunj: Making investment decisions simpler with AI!",
                                2500,
                            ]}
                            wrapper="span"
                            repeat={Infinity}
                            cursor={true}
                            omitDeletionAnimation={true}
                        />
                    </div>
                </div>
            </div>
            <div className="terms">
                <img src="/logo.png" alt=""/>
                <div className="links">
                    <Link to="/">Terms of Service</Link>
                    <span>|</span>
                    <Link to="/">Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
};

export default Homepage;

// const Homepage = () => {
//     const scrollContainer = useRef(null);
//     const [typingStatus, setTypingStatus] = useState("human1");
//
//     return (
//         <div className="homepage" ref={scrollContainer}>
//             <StarsCanvas />
//             <img src="/orbital.png" alt="" className="orbital" />
//             <div className="left">
//                 <h1>STOCK AI CHAT</h1>
//                 <h2>Supercharge your creativity and productivity</h2>
//                 <h3>
//                     CIS 550 Group Project.
//                 </h3>
//                 <Link to="/dashboard">Get Started</Link>
//             </div>
//             <div className="right">
//                 <SpacemanCanvas scrollContainer={scrollContainer} />
//             </div>
//             <div className="terms">
//                 <img src="/logo.png" alt="" />
//                 <div className="links">
//                     <Link to="/">Terms of Service</Link>
//                     <span>|</span>
//                     <Link to="/">Privacy Policy</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Homepage;