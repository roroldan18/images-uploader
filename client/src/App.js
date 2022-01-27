import { useState } from "react";
import axios from 'axios';
import {Message} from './Message.js';
import {ProgressBar} from './ProgressBar.js';


export const App = () => {

  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose a file');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('No file uploaded');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: ProgressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round( (ProgressEvent.loaded * 100) / ProgressEvent.total )
            )
          );
        setTimeout(() => {
          setUploadPercentage(0);
        }, 10000);
        }
      })

      const {fileName, filePath} = res.data;

      const filePathSplit = filePath.split('/');
      const newNameFile = filePathSplit[filePathSplit.length - 1]
      const newFilePath = `/uploads/${newNameFile}`


      
      setUploadedFile({fileName, newFilePath});
      setMessage('File Uploaded');

    } catch (error) {
      if(error.response.status === 500){
        setMessage('There was a problem with the server');
      } else{
        setMessage(error.response.data.msg);
      }
    }

  }


  return (
    <div className="container text-center d-flex flex-column">
      <h1 className="display-2">Image uploader</h1>
      {message && <Message msg={message}/> }
      <form className="form d-flex flex-column" onSubmit={handleSubmit}>
        <ProgressBar percentage={uploadPercentage} />
        <input type="file" accept="image/*" name="image" onChange={handleChange}/>
        <button className="btn btn-primary" onClick={handleSubmit}>Upload</button>
      </form>

      <label className="label">
        {fileName}
      </label>

      {
        uploadedFile
        &&
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <img src={uploadedFile.newFilePath} alt={uploadedFile.fileName} style={{width:'100%'}} />
          </div>
        </div>
      }
    </div>
  );
}
