/*function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

export { handleSubmit }*/
async function handleSubmit(event) {
    event.preventDefault();
  
    const formText = document.getElementById('name').value;
  
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formText }),
      });
  
      const data = await response.json();
      document.getElementById('results').innerHTML = `
        <strong>Results:</strong>
        <div>
          <p>Score Tag: ${data.score_tag}</p>
          <p>Agreement: ${data.agreement}</p>
          <p>Subjectivity: ${data.subjectivity}</p>
          <p>Irony: ${data.irony}</p>
        </div>
      `;
    } catch (error) {
      console.log('Error:', error);
      document.getElementById('results').innerHTML = 'An error occurred';
    }
  }
  
  export { handleSubmit };
