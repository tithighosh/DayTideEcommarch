$(document).ready(function(){
    var type=getCookie("Type");
    if(type!='Moderator' || getCookie("userid")==null)
    {
        window.location='../../Views/Login/index.html'
    }
    else{

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    };

    var OrderId = getUrlParameter('orderId');
    //alert(OrderId)
	$.ajax({
		url:"http://localhost:2293/api/moderator/OrderDetail/"+OrderId,
		complete:function(xmlHttp,status){
			if(xmlHttp.status==200){
				var str='';
				var data=xmlHttp.responseJSON;
				for(var i=0; i<data.length; i++){
					str+="<tr><td>"+data[i].order.customerId+"</td>"
                    str+="<td>"+data[i].order.orderId+"</td>"
                    str+="<td>"+data[i].product.productName+"</td>"
                    str+="<td>"+data[i].cart.price+"</td>"
                    str+="<td>"+data[i].order.address+"</td>"
                    str+="<td>"+data[i].order.date+"</td>"
                    str+="<td>"+data[i].order.district+"</td>"
                    str+="<td>"+data[i].cart.quantiry+"</td>"
                    str+="<td><div class='gallery'><a target='_blank' href='img_5terre.jpg'><img width='400' height='250' src='data:image/<jpg>;base64,"+data[i].product.picture+"'></a></div></td>"
				}	
				$("#OrderDetails tbody").html(str);
                var str1="<button style='margin-left:auto;margin-right:auto;display:block;' class='btn btn-info' onclick='Appoint("+JSON.stringify(data[0].order.address)+","+data[0].order.orderId+")'>Appoint Delivery Man</button>"
                $("#btn").html(str1);
			}else{
				alert(xmlHttp.statusText);
			}
		}
	});
}

});


function Appoint(Address, OrderId){
    window.location = '../../Views/Moderator/DeliveryMans.html?Address='+Address+'&OrderId='+OrderId;
}

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