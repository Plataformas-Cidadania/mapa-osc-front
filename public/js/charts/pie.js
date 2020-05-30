var options = {
    series: [4840, 4137, 7, 5185, 4181],
    chart: {
        width: 450,
        type: 'pie',
    },
    legend: {//Legenda topo
        position: 'right',
        offsetY: 0,
        show: true,
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#chartPie"), options);
chart.render();
