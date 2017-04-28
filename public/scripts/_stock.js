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
                console.log('index', i , 'data', series);
                data.push([series.Timestamp,series.close,series.high,series.low,series.open]);
            })
            seriesOptions[i] = {
                name: name,
                data: data
            };

            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            seriesCounter += 1;

            
        });
    });
}
    
