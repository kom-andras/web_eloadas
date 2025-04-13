const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{
      label: 'Kiválasztott sor',
      data: [],
      borderColor: 'blue',
      fill: false
    }]
  }
});

document.querySelectorAll('table tr').forEach(row => {
  row.addEventListener('click', () => {
    const values = Array.from(row.cells).map(cell => Number(cell.textContent));
    chart.data.datasets[0].data = values;
    chart.update();
  });
});