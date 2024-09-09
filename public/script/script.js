const form = document.getElementById('upload-form');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const result = document.getElementById('result');
const preview = document.getElementById('preview');
const imageInput = document.getElementById('image-input');

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    loading.style.display = 'block';
    error.style.display = 'none';
    result.innerHTML = '';

    try {
        const response = await fetch('/convert', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        } else {
            result.innerHTML = `<h3>Converted Text:</h3><p>${data.text}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        error.textContent = `An error occurred: ${error.message}`;
        error.style.display = 'block';
    } finally {
        loading.style.display = 'none';
    }
});