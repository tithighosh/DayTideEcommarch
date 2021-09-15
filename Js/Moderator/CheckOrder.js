$(document).ready(function(){

    var type=getCookie("Type");
    if(type!='Moderator' || getCookie("userid")==null)
    {
        window.location='../../Views/Login/index.html'
    }
    else{

	$.ajax({
		url:"http://localhost:2293/api/moderator/CheckOrder",
		complete:function(xmlHttp,status){
			if(xmlHttp.status==200){
				var str='';
				var data=xmlHttp.responseJSON;
				for(var i=0; i<data.length; i++){
					str+="<tr><td>"+data[i].order.customerId+"</td>"
                    str+="<td>"+data[i].order.orderId+"</td>"
                    str+="<td>"+data[i].order.date+"</td>"
                    str+="<td>"+data[i].order.district+"</td>"
                    if (data[i].cart.quantiry == 0)
                    {
                        str+="<td><a href='#' class='btn btn-warning disabled'>Running</a></td></tr>"
                    }
                    else if (data[i].cart.quantiry == -1)
                    {
                        str+="<td><a href='#' class='btn btn-success disabled'Done</a>"
                        str+="<a href='#' class='btn btn-facebook'>Clear</a></td></tr>"
                    }
                    else
                    {
                        str+="<td><a href='OrderDetails.html?orderId="+data[i].order.orderId+"' class='btn btn-primary'>See Detail</a></td></tr>"
                    }

				}	
				$("#Orders tbody").html(str);
			}else{
				alert(xmlHttp.statusText);
			}
		}
	});

}

});

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
