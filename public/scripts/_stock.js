window.onload = ()=>{
    var portfolio = JSON.parse($('#portfolio').val());

    portfolio.forEach(function(element) {
        var name = element.stockCode;
        var seriesOptions = [];
        var iChart = "c";
        iChart += name.toString();
        $('#container').append("<div id=" + iChart + "></div>");
        $('#' + iChart).append("<p>test: " + name + "</p>");
        
        function doIt(div){
            $('#' + div).highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg,
                marginRight: 
                10,
            },
            title: {
                text: name
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        });

        }
        doIt(iChart);
    });
}

       