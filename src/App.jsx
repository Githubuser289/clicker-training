import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const workareaRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [buttonText, setButtonText] = useState("START");
  const [startTime, setStartTime] = useState(null);
  const dimsRatio = 15 / 9;
  const colors = [
    "cadetblue",
    "cornflowerblue",
    "crimson",
    "darkmagenta",
    "gold",
    "hotpink",
    "lightsalmon",
    "olive",
    "plum",
    "silver",
    "springgreen",
    "yellowgreen",
  ];
  const workareaColor = "#414141";
  let maxColumns = 8;
  let srchColor = colors[Math.floor(Math.random() * maxColumns)];

  let totalMarkedDivs = 0;
  let correctPicks = 0;
  let wrongPicks = 0;

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  // obține dimensiunile div "workarea"
  const updateDimensions = () => {
    if (workareaRef.current) {
      const rect = workareaRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  };

  useEffect(() => {
    updateDimensions(); // obține dimensiunile la prima randare (mount)
  }, []);

  const finalMessage = () => {
    const now = Date.now();
    alert(
      `Timpul trecut: ${((now - startTime) / 1000).toFixed(0)} secunde` +
        `\nAi cules ${correctPicks} dintr-un total de ${totalMarkedDivs} dreptunghiuri` +
        `\nAi facut clic gresit de ${wrongPicks} ori`
    );
  };
  const handleButtonClick = () => {
    if (buttonText === "START") {
      setButtonText("STOP");
      setStartTime(Date.now());
    } else {
      setButtonText("START");
      finalMessage();
    }
  };

  const handleClick = (event) => {
    const clickedColor = event.target.style.backgroundColor;
    const clickedDiv = event.target.getAttribute("data-index");
    if (clickedDiv !== null) {
      if (clickedColor === srchColor) {
        correctPicks = correctPicks + 1;
        event.target.style.backgroundColor = workareaColor;
      } else {
        wrongPicks = wrongPicks + 1;
      }
      console.log(
        `Utilizatorul a făcut clic pe div-ul cu indexul: ${clickedDiv}`
      );
      console.log(
        "correctPicks=",
        correctPicks,
        "  totalMarkedDivs=",
        totalMarkedDivs,
        " wrongPicks=",
        wrongPicks
      );
    }
  };

  const generateDivs = () => {
    var elemWidth = Math.floor(dimensions.width / maxColumns);
    var elemHeight = Math.floor(elemWidth / dimsRatio);

    const cols = Math.floor(dimensions.width / elemWidth);
    const rows = Math.floor(dimensions.height / elemHeight);

    elemHeight = elemHeight - 5;
    elemWidth = elemWidth - 10;

    return Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="rowdiv">
        {Array.from({ length: cols }).map((_, colIndex) => {
          const divIndex = rowIndex * cols + colIndex;
          const divColor = colors[getRandomInt(cols)];
          if (divColor === srchColor) {
            totalMarkedDivs = totalMarkedDivs + 1;
          }
          return (
            <div
              key={divIndex}
              data-index={divIndex}
              className="inner-div"
              style={{
                width: `${elemWidth}px`,
                height: `${elemHeight}px`,
                backgroundColor: divColor,
              }}
            ></div>
          );
        })}
      </div>
    ));
  };

  return (
    <>
      <div className="controlbar">
        <div className="buttonbar">
          <button className="mainbutton" onClick={handleButtonClick}>
            {buttonText}
          </button>
          {/* {elapsedTime && <p>Timpul trecut: {elapsedTime} secunde</p>} */}
        </div>
        <div className="settings">
          <p>Culoarea căutată este:</p>
          <div
            className="searchedColor"
            style={{ backgroundColor: srchColor }}
          ></div>
        </div>
      </div>
      <div className="workarea" ref={workareaRef} onClick={handleClick}>
        {generateDivs()}
      </div>
    </>
  );
}

export default App;
