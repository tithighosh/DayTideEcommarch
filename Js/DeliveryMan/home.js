$(document).ready(function(){

    var DelManId=getCookie("userid");
    

	$.ajax({
		url:"http://localhost:2293/api/DeliveryMan/GetOrder/"+DelManId,
		complete:function(xmlHttp,status){
			if(xmlHttp.status==200){
				var str='';
				var data=xmlHttp.responseJSON;
				for(var i=0; i<data.length; i++){
					str+="<tr><td>"+data[i].orderId+"</td>"
                    str+="<td>"+data[i].date+"</td>"
                    str+="<td>"+data[i].address+"</td>"
                    str+="<td>"+data[i].district+"</td>"
                    str+="<td>"+data[i].amount+"</td>"
                    str+="<td>"+data[i].payment_Type+"</td>"
                    str+="<td>"+data[i].customerId+"</td>"
                    str+="<td id='status"+data[i].orderId+"'>"+data[i].status+"</td>"
                    if(data[i].status=="Done"){
                        str+="<td><button class='btn btn-success disabled'>Done</button></td><tr>"
                    }else{
                        str+="<td><button id='change"+data[i].orderId+"' onclick=Accepted("+data[i].orderId+","+JSON.stringify(data[i].delManId)+") class='btn btn-info'>Accept</button></td><tr>"
                    }
				}	
				$("#Order tbody").html(str);
			}else{
				alert(xmlHttp.statusText);
			}
		}
	});

});

function Accepted(OrderId, DelManId){

        $.ajax({
            url:`http://localhost:2293/api/DeliveryMan/OrderDone/${OrderId}/${DelManId}`,
            method:"PUT",
            headers:"Content-Type:application/json",
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200)
                {
                    $(`#change${OrderId}`).html("Done");
                    $(`#change${OrderId}`).removeClass("btn btn-info");
                    $(`#change${OrderId}`).addClass("btn btn-success");
                    $(`#status${OrderId}`).html("Done");
                }
                else
                {
                    alert("NO");
                }
            }
        });

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