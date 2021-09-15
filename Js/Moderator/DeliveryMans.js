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

    var OrderId = getUrlParameter('OrderId');
    var Address = getUrlParameter('Address');
	$.ajax({
		url:"http://localhost:2293/api/moderator/DeliveryManByPlace/"+Address+"/"+OrderId,
		complete:function(xmlHttp,status){
			if(xmlHttp.status==200){
				var str='';
				var data=xmlHttp.responseJSON;
				for(var i=0; i<data.length; i++){
					str+="<tr><td>"+data[i].name+"</td>"
                    str+="<td>"+data[i].email+"</td>"
                    str+="<td>"+data[i].phone+"</td>"
                    str+="<td>"+data[i].address+"</td>"
                    str+="<td>"+data[i].salary+"</td>"
                    str+="<td>"+data[i].complete_Task+"</td>"
                    str+="<td><div class='gallery'><a target='_blank' href='img_5terre.jpg'><img width='400' height='250' src='data:image/<jpg>;base64,"+data[i].picture+"'></a></div></td>"
                    if (data.In_Service == 1)
                    {
                        str+="<td><a href='#' class='btn btn-success disable'>Appointed</a></td></tr>"
                    }
                    else
                    {
                        str+="<td><button class='btn btn-info' onclick='Appoint("+JSON.stringify(data[i].delManId)+","+JSON.stringify(Address)+","+JSON.stringify(OrderId)+")'>Appoint</button></td><tr>"
                    }

				}	
				$("#DeliveryMans tbody").html(str);
			}else{
				alert(xmlHttp.statusText);
			}
		}
	});
    }
});


function Appoint(DelManId,Address,OrderId){
    alert(DelManId)
    alert(Address)
    alert(OrderId)
    $.ajax({
        url:`http://localhost:2293/api/moderator/Appointed/${DelManId}/${Address}/${OrderId}`,
        method:"PUT",
        headers:"Content-Type:application/json",
        complete:function(xmlHttp,status){
            if(xmlHttp.status==200)
            {
                window.location = '../../Views/Moderator/CheckOrder.html';
            }
            else
            {
                alert("NO");
            }
        }
    });
    //window.location = '../../Views/Moderator/DeliveryMans.html?Address='+Address+'&OrderId='+OrderId;
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
