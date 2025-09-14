import "./App.css";
import { useState } from "react";

export default function App() {
  // useState는 맨 처음에
  // because proper inference from initial value is not possible, add type to useState which provides generic type 
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    const file = event.target.files && event.target.files.length > 0
                  ? event.target.files[0]
                  : null;
    setSelectedFile(file);
    console.log("File selected", file);
  };

  return (
    <div className="app-container">
      <h1>Minsung File Upload Application</h1>
          <input type="file" id="file-input" 
              onChange={handleFileChange}
          />
          <label htmlFor="file-input">  {/*htmlFor connects to id of input*/}
            Choose File
          </label>

          {selectedFile && (  // prevent error when selectedFile is null (.name on null NONO)
           <p>Selected: {selectedFile.name}</p>
          )}
    </div>
  );
}