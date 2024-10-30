import React, { useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import shirtImagePath from '../../images/black_tee.jpg';
import Konva from 'konva'; // Importa Konva aquí

const TshirtCreator = () => {
  const stageRef = useRef<Konva.Stage | null>(null); // Asegúrate de que el tipo sea Konva.Stage o null
  const [shirtImage] = useImage(shirtImagePath);  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);  
  const [uploadedImageObject] = useImage(uploadedImage || ''); // Usar useImage para la imagen subida
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 }); // Posición de la imagen arrastrada

  // Manejar la subida de imágenes
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para guardar el diseño como imagen
  const handleSave = () => {
    const uri = stageRef.current?.toDataURL();
    if (uri) {  
      const link = document.createElement('a');
      link.download = 'custom-shirt.png';
      link.href = uri;
      link.click();
    } else {
      console.error("El canvas no está disponible.");
    }
  };

  return (
    <div>
      <h1>Bienvenido a tu creador de camisetas</h1>

      <input type="file" accept="image/png" onChange={handleImageUpload} />

      <Stage width={500} height={500} ref={stageRef}>
        <Layer>
          <KonvaImage image={shirtImage} width={500} height={500} />
          {uploadedImageObject && (  // Verifica si se ha cargado la imagen subida
            <KonvaImage
              image={uploadedImageObject}  // Usa la imagen de Konva cargada
              draggable={true}
              width={100} height={100} 
              x={imagePosition.x}  // Establece la posición
              y={imagePosition.y}  
              onDragEnd={(e) => {
                setImagePosition({
                  x: e.target.x(),
                  y: e.target.y(),
                });
              }}
            />
          )}
        </Layer>
      </Stage>

      <button onClick={handleSave}>Guardar Diseño</button>
    </div>
  );
};

export default TshirtCreator;



