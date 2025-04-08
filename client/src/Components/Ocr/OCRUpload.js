import React, { useState } from 'react';
import axios from 'axios';

function OCRUpload() {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('isOverlayRequired', 'false');
        formData.append('apikey', 'helloworld'); 
        formData.append('language', 'eng');

        const response = await axios.post('https://api.ocr.space/parse/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const parsedText = response.data?.ParsedResults?.[0]?.ParsedText;
        setText(parsedText || 'No text found');
    };

    return (
        <div >
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>DO OCR</button>
            <pre>{text}</pre>
        </div>
    );
}

export default OCRUpload;
