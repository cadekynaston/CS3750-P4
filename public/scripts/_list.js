
window.onload = ()=> {
     var portfolio = JSON.parse($('#portfolio').val());
     portfolio.forEach(function(element) {
        $('tbody').append('<tr><th>' + element.stockName + '</th><td>' + element.amount + '</td>'
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
