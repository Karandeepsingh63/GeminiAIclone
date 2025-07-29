import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets/assets'
import { context } from '../../Context/context'

function Main() {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(context);

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Icon" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev..</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="Compass Icon" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: Urban Planning</p>
                                <img src={assets.bulb_icon} alt="Bulb Icon" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="Message Icon" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of code</p>
                                <img src={assets.code_icon} alt="Code Icon" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="User Icon" />
                            <p>{recentPrompt}</p>
                            {/* recent prompt ke recent prompt arha hai */}
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="Gemini Icon" />
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <div
                                  className="result-content"
                                  dangerouslySetInnerHTML={{ __html: resultData }}
                                />
                                // resultData ke andr data aya hai
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder='Enter a prompt here'
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery Icon" />
                            <img src={assets.mic_icon} alt="Mic Icon" />
                            {input ? (
                                <img onClick={() => onSent()} src={assets.send_icon} alt="Send Icon" />
                            ) : (
                                <img className="disabled-send-icon" src={assets.send_icon} alt="Disabled Send Icon" />
                            )}
                            {/* sent pe click krte hi on sent function call hua */}
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate info, including about people. Double-check its responses.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main;
