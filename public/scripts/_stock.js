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
                if(i%3==1)
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
                Highcharts.stockChart(div, {


                    rangeSelector: {
                        selected: 1
                    },

                    title: {
                        text: name
                    },

                    series: [{
                        name: name,
                        data: data,
                        tooltip: {
                            valueDecimals: 2,
                            formatter: function () {
                                return '<b>' + this.series.name + '</b><br/>' +
                                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                                    Highcharts.numberFormat(this.y, 2);
                            }
                        }
                    }]
                });
            

            }
            doIt(iChart)
        })
        
    });
    
}
    
