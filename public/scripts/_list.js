
window.onload = ()=> {
     var portfolio = JSON.parse($('#portfolio').val());
     portfolio.forEach(function(element) {
        console.log(element.stockCode);
        
        $.ajax({
            url: "http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol="+ element.stockCode,
            dataType: "jsonp",
            success: function(data){
              let change = '';
               if (data.Change > 0) {
                 change = 'Up';
               } else {
                 change = 'Down';
               }

              $('tbody').append('<tr><th>' + element.stockTitle + '</th><td>$' + data.LastPrice + '</td>'
              + '<td>'+change+'</td><td id="stockCode">' + element.stockCode + '</td><td><input type="button" id="removebtn" class="btn btn-danger" value="Remove" onclick="remove(this)"/></td>><hr/>');
            }
        });
    })
}


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
            url: '/stock/remove',
            success: function(data) {
                console.log('success');
                console.log(JSON.stringify(data));
            }
        });

        console.log($(parent[0]).find('#stockCode')[0].textContent);

        $(this).closest('tr').remove();
    });
}
