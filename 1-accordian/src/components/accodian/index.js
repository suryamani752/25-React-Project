import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enable, setEnable] = useState(false);
  const [multipleSelection, setMultipleSelection] = useState([]);

  function handleSingleSelection(dataItemId) {
    // console.log(dataItemId);
    setSelected(dataItemId === selected ? null : dataItemId);
  }
  function handleMultipleSelection(dataItemId) {
    let copyMultiple = [...multipleSelection];
    const findIndexOfCurrentId = copyMultiple.indexOf(dataItemId);
    if (findIndexOfCurrentId === -1) {
      copyMultiple.push(dataItemId);
    } else {
      copyMultiple.splice(findIndexOfCurrentId, 1);
    }
    setMultipleSelection(copyMultiple);
  }
//   console.log(selected, multipleSelection);
  return (
    <div className="wrapper">
      <button onClick={() => setEnable(!enable)}>
        Enable multiple selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                className="title"
                key={dataItem.id}
                onClick={
                  enable
                    ? () => handleMultipleSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {selected === dataItem.id ||
              multipleSelection.indexOf(dataItem.id) !== -1 ? (
                <div className="content">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>no data found</div>
        )}
      </div>
    </div>
  );
}
