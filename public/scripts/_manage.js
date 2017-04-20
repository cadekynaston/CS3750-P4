var myStocks = [];

$(document).ready(function() {
    $('.box').hide().fadeIn(1000);
});

// get the stock info, show list and create a chart
$(function() {
    var totalMoney = 0;
    // get the stock info here
    var stocks = [
            {stockCode:"EFGH", amount: .25},
            {stockCode:"IJKL", amount: .25},
            {stockCode:"MNOP", amount: .25},
            {stockCode:"ABCD", amount: .25}];
    
    // stocks.forEach(function(element) {
    //     //sum up the total of all stock amounts
    //     totalMoney += element.amount;
    // })
    
    //Format the money
    //snagged this from stack overflow to format the $
    // Number.prototype.formatMoney = function(c, d, t){
    //     var n = this, 
    //     c = isNaN(c = Math.abs(c)) ? 2 : c, 
    //     d = d == undefined ? "." : d, 
    //     t = t == undefined ? "," : t, 
    //     s = n < 0 ? "-" : "$", 
    //     i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    //     j = (j = i.length) > 3 ? j % 3 : 0;
    //     return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    // };
    // var moneyString = totalMoney.formatMoney(2,'.',',');
    // document.getElementById("loot").innerHTML = moneyString;

    // make a list of sliders
    stocks.forEach(function(element) {
        $('.sliderList').append('<div><label>' + element.stockCode + 
            '<br>' + '<input type="number" size="3" min="0" max="100" id="' + element.stockCode + 
                'amount" value="' + element.amount * 100 
            + '"</input><input type="range" max="100" defaultValue="' 
            + element.amount + '" onchange="adjustAmounts(this)" id="'
            + element.stockCode + '"></input></label></div>');
    }, this);
    
    stocks.forEach(function(element) {
        myStocks.push({name: element.stockCode, y: element.amount})
    });

    drawChart(myStocks);
}); // end initial get and drawChart

function adjustAmounts(callingSlider){  // ???????????????????????????
    document.getElementById(callingSlider.id + "amount").value = callingSlider.value;
    // get the new percentage of this stock
    var currentAmount = callingSlider.value;
    currentAmount /= 100;
    var sumOfOthers = 0;
    var diff = 0;
    //var otherStocks = [];
    //push in the new value
    myStocks.forEach(function(element){
        if(element.name == callingSlider.id){
            element.y = callingSlider.value /100;
        }
    });
    //get all the other percentages
    myStocks.forEach(function(element) {
        if(element.name != callingSlider.id){
            sumOfOthers += element.y;
        }
    });
    if((currentAmount + sumOfOthers) > 1){
        diff = (1 - (currentAmount + sumOfOthers));
        //alert(diff);
        myStocks.forEach(function(element){
            if(element.name != callingSlider.id){
                var myPercentage = element.y / sumOfOthers;
                element.y = (element.y + myPercentage * diff) / 100;
            }
        });

       // drawChart(myStocks);

        myStocks.forEach(function(element){
            alert(element.name + " " + element.y);
        });

    }

    //alert("new value: " + currentAmount);
    //document.getElementById(callingSlider.id + "amount").value = currentAmount;

    

    //document.getElementById("dollars").innerHTML = x;

    //subtract the difference from the remaining stocks proportionally
    //write to stockList
    //redraw graph
}

function drawChart(arr){
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
}