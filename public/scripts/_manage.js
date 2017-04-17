$(document).ready(function() {
    $('.box').hide().fadeIn(1000);
});

// slider
// how do I change the amount of each unique stock???????????
function changeAmount() {
    var x = document.getElementById("myRange").value;
    document.getElementById("dollars").innerHTML = x;
}
// end slider

$(function() {
    var totalMoney = 0;
    // get the stock info here
    var stocks = [
            {stockCode:"EFGH", amount: 2344},
            {stockCode:"IJKL", amount: 15434},
            {stockCode:"MNOP", amount: 23303},
            {stockCode:"ABCD", amount: 6450}];
    
    stocks.forEach(function(element) {
        //sum up the total of all stock amounts
        totalMoney += element.amount;
    })

    // make a list of sliders
    stocks.forEach(function(element) {
        $('.sliderList').append('<div><label><input type="range" value="0" onchange="changeAmount()" id="'
                 + element.stockCode + '">' + element.stockCode + '</input></label></div>');
    }, this);

    //snagged this from stack overflow to format the $
    Number.prototype.formatMoney = function(c, d, t){
        var n = this, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    var moneyString = totalMoney.formatMoney(2,'.',',');
    document.getElementById("loot").innerHTML = '$' + moneyString;
    var myStocks = [];
    
    stocks.forEach(function(element) {
            myStocks.push({name: element.stockCode, y: element.amount / totalMoney})
    });

    var myChart = // Radialize the colors
        Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        });

    // Build the chart
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: '% of Portfolio by Stock'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            name: 'Stocks',
            data: myStocks
        }]
    });
});