import ReactDOM from "react-dom";
import React, { useState } from "react";

const Test: React.FC = () => {
    const [results, setResults] = useState<number[]>([]);
    const [input, setInput] = useState<string>("");
    const [resultDice, setResultDice] = useState<string>("");
  
    const rollDice = () => {
        const match = input.match(/(\d+)d(\d+)=/);
        if (match) {
          const numDice = parseInt(match[1]);
          const numSides = parseInt(match[2]);
          const diceResults: number[] = [];
          let total = 0;
          for (let i = 0; i < numDice; i++) {
            const result = Math.floor(Math.random() * numSides) + 1;
            diceResults.push(result);
            total += result;
          }
          setResults(diceResults);
          setResultTotal(total);
          let displayText = input;
          setResultDice(displayText.replace(match[0], ` ${match[0] + "@"}`));
        }
      };
    
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
      };
    
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        rollDice();
      };
    
      const [resultTotal, setResultTotal] = useState<number | null>(null);
    
      const displayResult = () => {
        let displayText : string = resultDice;
        if (results.length > 0) {
          displayText = displayText.replace("@", ` ${results.join(", ")} (${resultTotal})`);
        }
        return displayText;
      };
    
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={handleChange} />
            <button type="submit">Roll</button>
          </form>
          {results.length > 0 && <p>Dice Roll Result: {displayResult()} </p>}
        </div>
      );
};

export default Test;

if(document.getElementById("test")){
    const Index = ReactDOM.createRoot(document.getElementById("test"));

    Index.render(
        <React.StrictMode>
            <Test/>
        </React.StrictMode>
    )
}