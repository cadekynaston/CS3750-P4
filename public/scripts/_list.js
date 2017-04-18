
window.onload = ()=> {
     var portfolio = JSON.parse($('#portfolio').val());
     portfolio.forEach(function(element) {
         // add stockName to portfolio for easy access, maybe add current price too
         // they arent in the portfolio that's why they are undefined on the screen
        $('tbody').append('<tr><th>' + element.stockName + '</th><td>' + element.price + '</td>'
        + '<td>Up</td><td>' + element.stockCode + '</td><td><input type="button" id="removebtn" class="btn btn-danger" value="Remove" onclick="remove(this)"/></td>><hr/>');
    })
}

function remove(item)
{    
    $('table').on('click', 'input[type="button"]', function(e)
    {
        $(this).closest('tr').remove();
    });
}