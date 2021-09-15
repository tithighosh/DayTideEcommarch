$(document).ready(function(){

    var type=getCookie("Type");
    if(type!='Moderator' || getCookie("userid")==null)
    {
        window.location='../../Views/Login/index.html'
    }
    else{

	$.ajax({
		url:"http://localhost:2293/api/moderator/getalldeliveryman",
		complete:function(xmlHttp,status){
			if(xmlHttp.status==200){
				var str='';
				var data=xmlHttp.responseJSON;
				for(var i=0; i<data.length; i++){
					str+="<tr><td>"+data[i].deliveryMan.delManId+"</td>"
                    str+="<td>"+data[i].deliveryMan.name+"</td>"
                    str+="<td>"+data[i].deliveryMan.address+"</td>"
                    str+="<td>"+data[i].deliveryMan.complete_Task+"</td>"
                    str+="<td>"+data[i].deliveryMan.address+"</td>"
                    str+="<td>"+data[i].deliveryMan.salary+"</td>"
                    str+="<td>"+data[i].deliveryMan.complete_Task+"</td>"
                    str+="<td>"+data[i].deliveryMan.picture+"</td>"
                    str+="<td><button id='EditDelMan' class='btn btn-primary' onclick=EditDelMan("+JSON.stringify(data[i].deliveryMan.delManId)+")>Edit</button> | ";
                    //str+="<a class='btn btn-info' href='#'>Details</a> | ";
                    str+="<button id='block"+data[i].deliveryMan.delManId+"' class='btn btn-warning'onclick='block("+JSON.stringify(data[i].deliveryMan.delManId)+")'>"+data[i].user.status+"</button></td>";
				}	
				$("#DeliveryMans tbody").html(str);
			}else{
				alert(xmlHttp.statusText);
			}
		}
	});
    }
});



function block(UserId){
    $.ajax({
    url:`http://localhost:2293/api/moderator/BlockDeliveryMan/${UserId}`,
    method:"PUT",
    headers:"Content-Type:application/json",
    complete:function(xmlHttp,status){
        if(xmlHttp.status==200)
        {
            $(`#block${UserId}`).html(xmlHttp.responseJSON.status);
        }
        else
        {
            alert("NO");
        }
    }
    });
}

function EditDelMan(UserId)
{   
    window.location = '../../Views/Moderator/EditDelMan.html?UserId='+UserId;
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