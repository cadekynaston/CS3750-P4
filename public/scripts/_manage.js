var chartItems = [];
var myStocks = [];
const totalMoney = 100;
var myChart;

$(document).ready(function() {
    $('.box').hide().fadeIn(1000);
});

// get the stock info, show list and create a chart
$(function() {
    
    // get the stock info here
    var stocks = JSON.parse($('#portfolio').val());

    // make a list of sliders
    stocks.forEach(function(element) {
        $('.sliderList').append('<div><label>' + element.stockCode + 
            '<br>' + '<input type="number" onchange="updateSlider(this)" size="3" min="0" max="100" id="' 
            + element.stockCode + 'amount" value="' + element.amount 
            + '"</input><input type="range" max="100" value="' 
            + element.amount + '" onchange="adjustAmounts(this)" id="'
            + element.stockCode + '"></input></label></div>');
            
            //write the values into a chart friendly array (a decimal 0 to 1)
            chartItems.push({name: element.stockCode, y: (element.amount) / 100});
            //{stockCode:,stockTitle:,amount:
            myStocks.push({stockCode: element.stockCode, stockTitle: element.stockTitle, amount: element.amount});
    }, this);

    drawChart(chartItems);
}); // end initial get and drawChart

function updateSlider(numberBox){
    //alert("box changed" + sliderID.id);
    //$('#' + this.value = 0;//$('#' + sliderID.id + 'amount').value;
    var num = numberBox.value;
    var mySlider = numberBox.id;
    mySlider = mySlider.substring(0, mySlider.length - 6);
    document.getElementById(mySlider).value = num;
    document.getElementById(mySlider).onchange();
}

function adjustAmounts(callingSlider){
    var sumOfOthers = 0;
    var diff = 0;

    //push in the new value
    myStocks.forEach(function(element){
        if(element.stockCode == callingSlider.id){
            //set the moved item in the main array
            element.amount = parseInt(callingSlider.value);
        }
        else{
            sumOfOthers += parseInt(element.amount);
        }
    });
 
    if((callingSlider.value + sumOfOthers) > 100){
        diff = totalMoney - callingSlider.value;
        diff -= sumOfOthers;
        myPercentage = 0.0;
        myStocks.forEach(function(element){
            if(element.stockCode != callingSlider.id){
                if(sumOfOthers > 0) {myPercentage = element.amount / sumOfOthers;}
                element.amount = Math.floor(element.amount + (myPercentage * diff));
                if(element.amount < 0){ element.amount = 0;}
            }
        });
    };
    //post to db here?
    setNewAmounts(myStocks);

}

function postIt(){
    
    var data = {portfolio: myStocks, _csrf: document.querySelector('#csrf').value};
    console.log(data.portfolio);
   
    $.ajax({type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/stock/update',
        success: function(data) {
            console.log('success');
            console.log(JSON.stringify(data));
        }
    });


}

function setNewAmounts(arr){
    //write the new values to the text boxes,sliders, redraw chart
    var c = [];
    arr.forEach(function(element){
        document.getElementById(element.stockCode + "amount").value = element.amount;
        document.getElementById(element.stockCode).value = element.amount;
        c.push({name: element.stockCode, y: (element.amount) / 100})
    });
    
    var chart = $('#container').highcharts();
    chart.series[0].setData(c, true);
}

$(function (){//drawChart(chartItems){
        //var 
       myChart = // Radialize the colors
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
            data: chartItems
        }]
    });
});