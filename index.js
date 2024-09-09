const express = require('express');
const multer = require('multer');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


require('dotenv').config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/convert', upload.single('image'), async (req, res) => {
  console.log('Received request to /convert');
  console.log('req.file:', req.file);
  console.log('req.body:', req.body);

  if (!req.file) {
    console.log('No file uploaded');
    return res.status(400).json({ error: 'No image file uploaded' });
  }

  try {
    console.log('File received:', req.file.originalname, 'Size:', req.file.size, 'bytes');

    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Please analyze this image and transcribe any handwritten text you see. Provide only the transcribed text, without any additional comments.";

    console.log('Sending request to Gemini API');
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: req.file.buffer.toString('base64')
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();

    console.log('Received response from Gemini API');
    res.json({ text });
  } catch (error) {
    console.error('Error during handwriting conversion:', error);
    res.status(500).json({ error: 'An error occurred during handwriting conversion: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
