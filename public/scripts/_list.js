window.onload = ()=> {
     var portfolio = JSON.parse($('#portfolio').val());
     portfolio.forEach(function(element) {
        $('.stock-list').append('<div id="list"><span id="left">' + element.stockCode + '</span><span id="right">' + element.amount + '</span></div> <hr/> ');        
    })

}