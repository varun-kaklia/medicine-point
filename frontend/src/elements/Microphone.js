import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Microphone = ({setSearchKeyword,searchItemPage,medicineLength})=> {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const location = useLocation()

  useEffect(()=>{
    if(transcript.length>0){
      const transcriptLowerCase = transcript.toLowerCase()
      if(medicineLength>0){
        const transcriptTrim = transcriptLowerCase.replace(" ",'')
        setSearchKeyword(transcriptTrim && transcriptTrim)
      }else{
        setSearchKeyword(transcriptLowerCase && transcriptLowerCase)
      }
    }
  },[transcript,setSearchKeyword])

  
  useEffect(()=>{
    if(searchItemPage === true){
      stopHandle()
      resetTranscript();
    }
  },[searchItemPage,location])

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
    continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    resetTranscript();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  return (
    <div className="self-center border-y py-3 px-2 border-primary">
      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
        >
          {
            isListening?
            <button onClick={()=>stopHandle()} className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
            </button>
        :
        <button 
        onClick={()=>handleListing()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
        </button>
            }

        </div>
      </div>
      {/* {transcript && (
        <div className="microphone-result-container">
          <button className="microphone-reset btn" onClick={handleReset}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          </button>
        </div>
      )} */}
    </div>
  );
}
export default Microphone;