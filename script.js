**script.js:**
```javascript
// Definiamo una variabile globale per memorizzare i dati delle dimensioni
let dimensionData = [];

// Funzione per aggiungere un nuovo campo per una dimensione
function addInputField() {
    const inputFields = document.getElementById("input-fields");
    const newInputField = document.createElement("div");
    newInputField.className = "input-field";
    newInputField.innerHTML = `
        <label for="dimension-name">Nome della dimensione:</label>
        <input type="text" class="dimension-name" placeholder="Nome">
        <label for="dimension-value">Valore della dimensione (da 1 a 5):</label>
        <input type="number" class="dimension-value" min="1" max="5" placeholder="Valore">
    `;
    inputFields.appendChild(newInputField);
}

// Funzione per raccogliere i dati inseriti dagli utenti e generare il grafico
function generateChart() {
    // Resetta i dati delle dimensioni
    dimensionData = [];
    // Recupera i dati inseriti dagli utenti
    const inputFields = document.querySelectorAll(".input-field");
    inputFields.forEach(inputField => {
        const dimensionName = inputField.querySelector(".dimension-name").value;
        const dimensionValue = inputField.querySelector(".dimension-value").value;
        if (dimensionName && dimensionValue) {
            dimensionData.push({ name: dimensionName, value: dimensionValue });
        }
    });

    // Genera il grafico utilizzando Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    const labels = dimensionData.map(dimension => dimension.name);
    const values = dimensionData.map(dimension => dimension.value);
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valore delle dimensioni',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5 // Impostiamo il massimo valore sull'asse Y a 5
                }
            }
        }
    });
}

// Funzione per scaricare il grafico come immagine
function downloadChart() {
    const chartCanvas = document.getElementById('myChart');
    const url = chartCanvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'framework_chart.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
```
