import { useState } from "react";

// BOX COLOR VARIENT
const boxColorVariant = {
  primary: 'bg-slate-300',
  active: "bg-emerald-500",
  secondary: 'bg-orange-400',
}

const initialState = {
  colorState: Array(9).fill(boxColorVariant.primary),
  clickState: [],
  effectState: false,
}


function Matrix() {
  const [boxColors, setBoxColors] =
    useState(initialState.colorState); // SETS INITIAL BOX COLOR
  const [clickedBoxes, setClickedBoxes] =
    useState(initialState.clickState); // TRACKS BOX CLICK 
  const [isEffectOver, setIsEffectOver] =
    useState(initialState.effectState); // TRACKS EFFECT END
  const [activeGrid, setActiveGrid] = useState(null); // FOR VISTUAL EFFECT

  // METHOD THAT HANDLES BOX CLICK
  const handleBoxClick = (index) => {
    if (isEffectOver) return;

    // BOX STATE TRACKING LOGIC: ONCLICK -> SET BG=GREEN 
    const newBoxColors = [...boxColors];
    newBoxColors[index] = boxColorVariant.active;
    setBoxColors(newBoxColors);

    // BOX CLICK TRACKING LOGIC: STORE CLICKED GRID INDEX
    const updatedClickedBoxes = [...clickedBoxes, index];
    setClickedBoxes(updatedClickedBoxes);

    // IF LAST BOX CLICKED : START EFFECT : CHANGE COLOR TO ORANGE ON BASIS OF CLICKS
    if (index === 8) {

      let delay = 0;
      updatedClickedBoxes.forEach((clickedIndex) => {
        setTimeout(() => {
          setBoxColors((prevColors) => {
            const updatedColors = [...prevColors];
            updatedColors[clickedIndex] = boxColorVariant.secondary; // SET ORANGE
            setActiveGrid(clickedIndex); // SET GRID TO ACTIVE FOR VISUALIZATION
            return updatedColors;
          });
        }, delay);
        delay += 500;
      });
      setActiveGrid(null);
      setIsEffectOver(true)
    }
  };

  // ONCLICK RESET BUTTON -> RESET STATE
  const handleReset = () => {
    setBoxColors(initialState.colorState);
    setClickedBoxes(initialState.clickState);
    setIsEffectOver(initialState.effectState);
  }

  return (
    <>
      {/* GRID VISUALIZATION */}
      <ul className="mb-3 flex gap-2 h-8">
        {clickedBoxes.map((item, index) => {

          return <li key={index} className="flex gap-2 group text-lg">
            <span className={`${activeGrid === item ? "font-semibold" : ""} transition-all duration-200 `}>
              ({Math.floor(item / 3)}, {item % 3})
            </span>
            <span className="group-last:hidden ">&rarr;</span>
          </li>
        })}
      </ul>

      {/* 3 X 3 MATRIX */}
      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {boxColors.map((color, index) => (
          <div
            key={index}
            className={`border-2 border-transparent hover:border-slate-400 w-26 h-26 rounded-lg cursor-pointer transition-all duration-200 ${color}`}
            onClick={() => handleBoxClick(index)}
          />
        ))}
        <button onClick={handleReset}
          className="mt-3 rounded-md bg-slate-400 py-1 text-white col-end-3 transition-all duration-200 cursor-pointer text-lg hover:bg-slate-500 tracking-wide">
          Reset</button>
      </div>
    </>
  );
}

export default Matrix;
