import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const initialMatrixData = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const initialImagesData = [
  { id: "1", src: "img_puzzle_1.png" },
  { id: "2", src: "img_puzzle_02.png" },
  { id: "3", src: "img_puzzle_03.png" },
  { id: "4", src: "img_puzzle_04.png" },
  { id: "5", src: "img_puzzle_05.png" },
  { id: "6", src: "img_puzzle_06.png" },
  { id: "7", src: "img_puzzle_07.png" },
  { id: "8", src: "img_puzzle_08.png" },
  { id: "9", src: "img_puzzle_09.png" },
];
function App() {
  const [matrixData, setMatrixData] = useState(initialMatrixData);
  const [imagesData, setImagesData] = useState(
    initialImagesData.slice().sort(() => Math.random() - 0.5)
  );

  const allowDrop = (e) => {
    e.preventDefault();
    e.target.classList.add("hover");
  };

  const dragLeave = (ev) => {
    ev.preventDefault();
    ev.target.classList.remove("hover");
  };

  const drag = (e, image) => {
    console.log("DRAG", image);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("image", JSON.stringify(image));
  };

  const drop = (e, rowIndex, columnIndex) => {
    e.preventDefault();
    e.target.classList.remove("hover");
    const data = e.dataTransfer.getData("image");
    const image = JSON.parse(data);
    console.log("me esta llegando al drop la imagen?", image);
    console.log("drog rowindex y columnaindex: ", rowIndex, columnIndex);
    console.log("imagen en el drop:", image.id);
    console.log("selected image: ", image);
    if (
      (rowIndex === 0 && columnIndex === 0 && image.id === "1") ||
      (rowIndex === 0 && columnIndex === 1 && image.id === "2") ||
      (rowIndex === 0 && columnIndex === 2 && image.id === "3") ||
      (rowIndex === 1 && columnIndex === 0 && image.id === "4") ||
      (rowIndex === 1 && columnIndex === 1 && image.id === "5") ||
      (rowIndex === 1 && columnIndex === 2 && image.id === "6") ||
      (rowIndex === 2 && columnIndex === 0 && image.id === "7") ||
      (rowIndex === 2 && columnIndex === 1 && image.id === "8") ||
      (rowIndex === 2 && columnIndex === 2 && image.id === "9")
    ) {
      const updatedMatrix = [...matrixData];
      updatedMatrix[rowIndex][columnIndex] = image;
      setMatrixData(updatedMatrix);

      const updatedImages = imagesData.map((img) => {
        if (img.id === image.id) {
          // Establece las propiedades en valores vacíos o nulos
          return { ...img, src: "", id: "" };
        } else {
          // Mantén las demás imágenes sin cambios
          return img;
        }
      });
      setImagesData(updatedImages);
    } else {
      alert("Esta pieza no va aquí");
    }
  };

  useEffect(() => {
    console.log("matrixData", matrixData);
    console.log("imagesData", imagesData);
  }, [matrixData, imagesData]);

  return (
    <main>
      <h1>Puzzle Dragon Ball</h1>
      <div className="row1">
        <div className="col">
          {imagesData.slice(0, 3).map((image) => (
            <section key={image.id} className="image">
              {image.id !== "" ? (
                <div
                  id={image.id}
                  className="image select"
                  draggable="true"
                  onDragStart={(e) => drag(e, image)}
                >
                  <img src={image.src} alt={`Imagen ${image.id}`} />
                </div>
              ) : null}
            </section>
          ))}
        </div>
        <div className="matriz">
          {matrixData.map((row, rowIndex) => (
            <section key={rowIndex} className="rows">
              {row.map((cellImageId, columnIndex) => (
                <div
                  id={`cell-${rowIndex}-${columnIndex}`}
                  className="image celda"
                  key={columnIndex}
                  data-row={rowIndex}
                  data-column={columnIndex}
                  onDrop={(e) => drop(e, rowIndex, columnIndex)}
                  onDragOver={(e) => allowDrop(e)}
                  onDragLeave={(e) => dragLeave(e)}
                >
                  {cellImageId !== null && (
                    <img src={cellImageId.src} alt={`Imagen ${cellImageId}`} />
                  )}
                </div>
              ))}
            </section>
          ))}
        </div>

        <div className="col">
          {imagesData.slice(3, 6).map((image) => (
            <section key={image.id} className="image">
              {image.id !== "" ? (
                <div
                  id={image.id}
                  className="image select"
                  draggable="true"
                  onDragStart={(e) => drag(e, image)}
                >
                  <img src={image.src} alt={`Imagen ${image.id}`} />
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </div>

      <div className="row2">
        {imagesData.slice(6, 9).map((image) => (
          <section key={image.id} className="image">
            {image.id !== "" ? (
              <div
                id={image.id}
                className="image select"
                draggable="true"
                onDragStart={(e) => drag(e, image)}
              >
                <img src={image.src} alt={`Imagen ${image.id}`} />
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </main>
  );
}

export default App;
