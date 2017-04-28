window.onload = ()=>{
    var seriesOptions = [],
        seriesCounter = 0,
        names = [];
    var portfolio = JSON.parse($('#portfolio').val());
    portfolio.forEach(function(element) {
        console.log(element.stockCode);
        names.push(element.stockCode);
    });

    /**
     * Create the chart when all data is loaded
     * @returns {undefined}
     */

    $.each(names, function (i, name) {

        $.get('/stock/graphInfo/'+name, function (text) {
            console.log(text.substring(30,text.length-2));
            let json = JSON.parse(text.substring(30,text.length-2));
            let data = [];
            $.each(json.series,function(i, series){
                let time = new Date(series.Timestamp/.001)
                time = time.toString().substr(0,24)
                data.push({x:time.substring(0,24),y:series.high});
            })
            console.log('index', i , 'data', data);
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
                            Highcharts.dateFormat('%a %b %d %Y %H:%M:%S %Z', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                    }
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series:{
                    name: name,
                    data: data
                }
            });

        }
        
            doIt(iChart);

            
        });
    });
}
    
