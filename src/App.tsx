import "./App.css";
import { useState } from "react";

export default function App() {
  // useState는 맨 처음에
  // because proper inference from initial value is not possible, add type to useState which provides generic type 
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    const file = event.target.files && event.target.files.length > 0
                  ? event.target.files[0]
                  : null;
    setSelectedFile(file);
    console.log("File selected:", file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      setUploadedFiles(prev => [...prev, selectedFile]);
      setSelectedFile(null);
      // Reset the input value to allow selecting the same file again
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      console.log("File added to queue:", selectedFile);
    }
  };

  return (
    <div className="app-container">
      <h1>Minsung File Upload Application</h1>
          <input type="file" id="file-input" hidden
              onChange={handleFileChange}
          />
          <label htmlFor="file-input">  {/*htmlFor connects to id of input*/}
            Choose File
          </label>

          {selectedFile && (  // prevent error when selectedFile is null (.name on null NONO)
           <div>
             <p>Selected: {selectedFile.name}</p>
             <button onClick={handleUpload}>Upload File</button>
           </div>
          )}

          {uploadedFiles.length > 0 && (
            <div>
              <h3>Uploaded Files:</h3>
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name} - size: {file.size} 
                  </li>
                ))}
              </ul>
            </div>
          )}
    </div>
  );
}