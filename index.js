import express from 'express';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import uniquid from 'uniqid';
import path from 'path';
import {fileURLToPath} from 'url';



const app = express();
const port = process.env.PORT || 3000;

app.use(fileUpload());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathUploads = path.resolve(__dirname, './client/build/uploads');

app.use(express.static(path.join(__dirname, './client/build')));

if(!fs.existsSync(pathUploads)){
    fs.mkdirSync(pathUploads, {recursive:true});
}

app.post('/uploadImage', (req, res) => {

    if(req.files === null || req.files === undefined) {
        res.status(404).json({msg: 'No file Uploaded'})
    } 

    const {file} = req.files;
    const validation = file.mimetype.includes('image');

    if (!validation){
        res.status(400).json({
            state: 'error',
            msg: 'No image Uploaded'

        })
    }


    const nameArr = file.name.split('.');
    const extensionFile = nameArr[nameArr.length - 1];
    const idUnique = uniquid();
    const fileName = `${idUnique}.${extensionFile}`;
    const filePath = `${pathUploads}/${fileName}`;

    file.mv(filePath, err => {
        if(err){
            console.error(err);
            return res.status(500).json({msg:err})
        }

        res.status(200).json({
            fileName: file.name,
            filePath: filePath
        })
    })
});

const mainHtmlPath = `${__dirname}/client/build/index.html`;
app.get('*', (req, res) => {
    res.sendFile(path.join(mainHtmlPath));
});



app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})