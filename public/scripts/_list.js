window.onload = ()=> {
     var stocks = [
            {stockCode:"EFGH", amount: 44},
            {stockCode:"IJKL", amount: 34},
            {stockCode:"MNOP", amount: 12},
            {stockCode:"ABCD", amount: 10}
            ];

     var portfolio = $('#portfolio').portfolio;
     stocks.forEach(function(element) {
        $('.stock-list').append('<div id="list"><span id="left">' + element.stockCode + '</span><span id="right">' + element.amount + '</span></div> <hr/> ');        
    })

}