# 🖊️ Handwritten Image To Text

A web application that converts handwritten text in images into digital text using the **Google Gemini AI** API. Upload an image or use your device camera to capture handwriting — and get accurate transcriptions instantly.

---

## ✨ Features

- 📁 **Image Upload** — Upload any image file containing handwritten text
- 📷 **Live Camera Capture** — Use your webcam to capture handwriting in real time
- 🤖 **AI-Powered OCR** — Powered by Google Gemini 1.5 Flash for accurate handwriting recognition
- ⚡ **Fast & Lightweight** — Simple Node.js/Express backend with no heavy dependencies
- 🌐 **Browser-Based** — No installation needed for end users, works entirely in the browser

---

## 🛠️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Backend   | Node.js, Express.js               |
| AI Model  | Google Gemini 1.5 Flash           |
| File Upload | Multer (in-memory storage)      |
| Frontend  | HTML, CSS, Vanilla JavaScript     |
| Config    | dotenv                            |

---

## 📂 Project Structure

```
Handwritten-Image-To-Text/
├── index.js              # Express server & Gemini API integration
├── package.json          # Project dependencies
├── .env                  # Environment variables (not committed)
└── public/
    ├── index.html        # Frontend UI (upload + camera + result display)
    └── script/
        └── script.js     # Client-side JavaScript
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/hasinishraq/Handwritten-Image-To-Text.git
   cd Handwritten-Image-To-Text
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Start the server**

   ```bash
   node index.js
   ```

5. **Open in your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🖼️ How It Works

1. **Upload or Capture** — The user uploads an image file or captures one via webcam
2. **Send to Server** — The image is sent via a `POST /convert` request (multipart form data)
3. **Gemini AI Processing** — The server encodes the image in Base64 and sends it to the Gemini 1.5 Flash model with a transcription prompt
4. **Display Result** — The transcribed text is returned and displayed on the page

```
Browser → POST /convert (image) → Express Server → Gemini API → Transcribed Text → Browser
```

---

## 🔑 API Reference

### `POST /convert`

Converts a handwritten image to text.

| Parameter | Type   | Description              |
|-----------|--------|--------------------------|
| `image`   | `File` | The handwritten image file |

**Response:**
```json
{
  "text": "Transcribed handwritten text here..."
}
```

**Error Response:**
```json
{
  "error": "Error message describing the issue"
}
```

---

## ⚙️ Environment Variables

| Variable         | Description                                  | Required |
|------------------|----------------------------------------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key                   | ✅ Yes   |
| `PORT`           | Port to run the server on (default: `3000`)  | ❌ No    |

---

## 📦 Dependencies

| Package                  | Version          | Purpose                        |
|--------------------------|------------------|--------------------------------|
| `@google/generative-ai`  | ^0.17.1          | Google Gemini API SDK          |
| `dotenv`                 | ^16.4.5          | Environment variable loader    |
| `express`                | ^4.19.2          | Web server framework           |
| `multer`                 | ^1.4.5-lts.1     | File upload middleware          |

---

## 🔒 Security Notes

- **Never commit your `.env` file** — it contains your API key
- The `.gitignore` should exclude `.env` and `node_modules/`
- Image data is processed **in-memory** and never persisted to disk

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [Google Gemini AI](https://deepmind.google/technologies/gemini/) for the powerful vision model
- [Express.js](https://expressjs.com/) for the simple and fast web framework
- [Multer](https://github.com/expressjs/multer) for handling file uploads
