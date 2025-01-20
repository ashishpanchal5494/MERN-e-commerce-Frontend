import React, { useState } from "react";

const Color = (props) => {
  const { colorData, setColor, selectedColor, setSelectedColor } = props;

  const handleColorClick = (id) => {
    setColor(id);
    setSelectedColor(id); // Update the selected color
  };

  return (
    <>
      <ul
        className="colors ps-0"
        style={{ listStyle: "none", display: "flex", gap: "10px" }}
      >
        {colorData &&
          colorData.map((item, index) => (
            <li
              onClick={() => handleColorClick(item?._id)}
              style={{
                backgroundColor: item?.title,
                cursor: "pointer",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                boxShadow:
                  selectedColor === item?._id
                    ? "0 0 0 4px #000" // Creates a border effect with margin
                    : "none",
              }}
              key={index}
            ></li>
          ))}
      </ul>
    </>
  );
};

export default Color;
