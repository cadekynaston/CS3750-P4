window.onload = ()=>{
    
        
    var portfolio = JSON.parse($('#portfolio').val());
    
    portfolio.forEach(function(element) {
        console.log(element.stockCode);
        let name = element.stockCode;
        let data = [];
        $.get('/stock/graphInfo/'+name, function (text) {
            console.log(text.substring(30,text.length-2));
            let json = JSON.parse(text.substring(30,text.length-2));
            $.each(json.series,function(i, series){
                let time = series.Timestamp/.001
                // 1493348187939 your time
                // 1491573298000 my time
                data.push({
                    x:time,
                    y:series.high
                });
            })
            console.log(data)
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
                        name: name,
                        data: data
                    }]
                });

            }
            doIt(iChart)
        })
        
    });
    
}
    
