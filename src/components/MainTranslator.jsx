import { useState } from "react";
import logo from '../assets/Frame 7.png';
import translateButton from '../assets/buttons/Button-link.png';
import frenchFlag from '../assets/flags/fr-flag.png';
import spanishFlag from '../assets/flags/sp-flag.png';
import japaneseFlag from '../assets/flags/jpn-flag.png';
import radioSelected from '../assets/icons/radio-selected.png';
import radioUnselected from '../assets/icons/radio-unselected.png';

export default function MainTranslator() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("french");
  const [translated, setTranslated] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) {
      alert("Please enter the text first!");
      return;
    }

    try {
      // worker
      const response = await fetch('https://my-worker.my-translator.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          target: language 
        })
      });

      if (!response.ok) {
        throw new Error('Error connecting to server!');
      }

      const data = await response.json();
      setTranslated(data.translation);
      setShowResult(true);
      
    } catch (error) {
      console.error('Error:', error);
      alert('error translation!: ' + error.message);
    }
  };

  const handleReset = () => {
    setText("");
    setTranslated("");
    setShowResult(false);
    setLanguage("french");
  };

  return (
    <div className="bg-white rounded-2xl w-[390px] min-h-[780px] shadow-lg overflow-hidden flex flex-col relative">
      
  
      <img src={logo} alt="Pollyglot" className="w-full h-[213px] object-cover" />

    
      <div className="absolute border-4 border;'#252F42' rounded-[15px] bg-white"
        style={{
          width: '362px',
          height: '505px',
          top: '243px',
          left: '13px'
        }}
      >
        <div className="p-6 h-full flex flex-col">
          {!showResult ? (
            <>
              
              <h2 className="text-[20px] font-bold mb-3 text-center font-['Poppins'] leading-[150%]" style={{ color: '#035A9D' }}>
                Text to translate 👇
              </h2>
              
              
              <textarea
                className="w-full border border-gray-300 rounded-xl p-4 mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="How are you?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                  width:'317',
                  height: '118px',
                  backgroundColor: '#EFF0F4'
                }}
              />

            
<h3 className="text-[20px] font-bold mb-3 text-center font-['Poppins'] leading-[150%]" style={{ color: '#035A9D' }}>
  Select language 👇
</h3>


<div className="mb-6">
  {[
    { id: "french", flag: frenchFlag, text: "French" },
    { id: "spanish", flag: spanishFlag, text: "Spanish" }, 
    { id: "japanese", flag: japaneseFlag, text: "Japanese" }
  ].map((lang) => (
    <div 
      key={lang.id}
      onClick={() => setLanguage(lang.id)}
      className="flex items-center p-2 mb-2 cursor-pointer hover:bg-gray-50 rounded-lg"
    >
      <img 
        src={language === lang.id ? radioSelected : radioUnselected} 
        alt="select"
        className="w-6 h-6 mr-3"
      />
      <span className="text-gray-700 font-bold text-lg mr-3">{lang.text}</span>
      <img src={lang.flag} alt={lang.text} className="w-8 h-6" />
    </div>
  ))}
</div>

{/* buttton*/}
<button 
  onClick={handleTranslate}
  className="w-full mt-auto"
>
  <img 
    src={translateButton} 
    alt="Translate" 
    className="w-full h-[50px] object-contain rounded-lg" 
  />
</button>
            </>
          ) : (
            <>
              {/* result view*/}
              <div className="flex flex-col flex-1">
                
               
                <h3 className="text-[20px] font-bold mb-3 text-center font-['Poppins'] leading-[150%]" style={{ color: '#035A9D' }}>
                  Original text 👇
                </h3>
                
                
                <div 
                  className="mb-6 rounded-lg flex items-center justify-center"
                  style={{
                    width: '317px',
                    height: '118px',
                    backgroundColor: '#EFF0F4',
                    margin: '0 auto'
                  }}
                >
                  <p className="text-black text-lg text-center">{text}</p>
                </div>
                 <br/>
                
                <h3 className="text-[20px] font-bold mb-3 text-center font-['Poppins'] leading-[150%] " style={{ color: '#035A9D' }}>
                  Your translation 👇
                </h3>
                <br/>
                
                <div 
                  className="mb-8 rounded-lg flex items-center justify-center"
                  style={{
                    width: '317px',
                    height: '118px',
                    backgroundColor: '#EFF0F4',
                    margin: '0 auto'
                  }}
                >
                  <p className="text-black text-lg text-center font-bold">{translated}</p>
                </div>

                {/* Start Over */}
                <button 
                  onClick={handleReset}
                  className="rounded-lg font-bold text-white transition-colors mx-auto mt-auto"
                  style={{
                    width: '322px',
                    height: '50px',
                    backgroundColor: '#035A9D'
                  }}
                >
                  Start Over
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
