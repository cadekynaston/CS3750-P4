
window.onload = ()=> {
     var portfolio = JSON.parse($('#portfolio').val());
     portfolio.forEach(function(element) {
        //console.log(element.stockCode);
        callAPI(element.stockCode);
        $('tbody').append('<tr><th>' + element.stockTitle + '</th><td>' + element.price + '</td>'
        + '<td>Up</td><td id="stockCode">' + element.stockCode + '</td><td><input type="button" id="removebtn" class="btn btn-danger" value="Remove" onclick="remove(this)"/></td>><hr/>');
    })    
}

function jsonCallback(data){
    console.log(data.Change);
    console.log(data.Name);
    console.log(data.LastPrice);
    // add stockName to portfolio for easy access, maybe add current price too
    // they arent in the portfolio that's why they are undefined on the screen
    // $('tbody').append('<tr><th>' + element.stockTitle + '</th><td>' + element.price + '</td>'
    // + '<td>Up</td><td id="stockCode">' + element.stockCode + '</td><td><input type="button" id="removebtn" class="btn btn-danger" value="Remove" onclick="remove(this)"/></td>><hr/>');
            
};
            
function callAPI(x) {
    $.ajax({
        url: "http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=" + x,
        dataType: "jsonp",
        jsonpCallback: "jsonCallback"
    });
};

function remove(item)
{
    $('table').on('click', 'input[type="button"]', function(e)
    {
        var parent = $(this).parent().parent();

        var data = {};
        data.symbol =  $(parent[0]).find('#stockCode')[0].textContent,
        data._csrf = document.querySelector('#csrf').value;

        $.ajax({type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/stock/list',
            success: function(data) {
                console.log('success');
                console.log(JSON.stringify(data));
            }
        });

        console.log($(parent[0]).find('#stockCode')[0].textContent);

        $(this).closest('tr').remove();
    });
}
