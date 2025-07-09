fetch('https://pdf-983r.onrender.com/api/test')
  .then(res => res.json())
  .then(data => console.log('Response from backend:', data))
  .catch(err => console.error('Error:', err));
