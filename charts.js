const ChartModule = {
  chart:null,
  renderScenarioChart(sim){
    const ctx = document.getElementById("scenarioChart").getContext("2d");

    if(this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
      type:"line",
      data:{
        labels: sim.labels,
        datasets:[
          { label:"Optimista", data:sim.optimistic, borderColor:"green", tension:0.2 },
          { label:"Esperado", data:sim.expected, borderColor:"orange", tension:0.2 },
          { label:"Pesimista", data:sim.pessimistic, borderColor:"red", tension:0.2 }
        ]
      },
      options:{
        responsive:true,
        scales:{ y:{ beginAtZero:true } }
      }
    });
  }
};
