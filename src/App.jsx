import React, { useState, useEffect } from "react";
import { Hourglass } from "react-loader-spinner";

function App() {
  const [quote, setQuote] = useState(
    "It’s not a bug — it’s an undocumented feature."
  );
  const [loading, setLoading] = useState(false); 

  const getQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setQuote(data.slip.advice);
    } catch (err) {
      console.error("Error fetching advice:", err);
      setQuote("Failed to fetch advice. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="mt-[10rem]">
      <h1 className="text-white text-[2rem] font-bold p-[2rem] flex justify-center">
        The Sage's Manuscript
      </h1>
      <div className="m-auto">
        <div className="w-[25%] flex items-center justify-center h-auto text-[1.5rem] leading-5 m-auto text-center">
          <h1 className="m-auto font-mono font-semibold mt-20">
            {loading ? (
              <Hourglass
                color="#00BFFF"
                height={100}
                width={100}
                visible={true}
                ariaLabel="Loading..."
              />
            ) : (
              quote
            )}
          </h1>
        </div>
        <div className="flex justify-center mt-32">
          <button
            className="active:bg-sky-300 bg-gray-500 text-white text-base px-4 py-2 mt-4 rounded cursor-pointer"
            onClick={getQuote}>
            Consult the Codex
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
