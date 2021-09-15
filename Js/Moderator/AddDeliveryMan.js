$(document).ready(function(){

	var type=getCookie("Type");
    if(type!='Moderator' || getCookie("userid")==null)
    {
        window.location='../../Views/Login/index.html'
    }
    else{
		$("#AddDeliveryMan").click(function(){
			$.ajax({
				url:"http://localhost:2293/api/moderator/createdeliveryman",
				method:"POST",
				headers:"Content-Type:application/json",
				data:
				{
					"delManId": $("#id").val(),
					"name": $("#name").val(),
					"email": $("#email").val(),
					"phone": $("#phone").val(),
					"address": $("#address").val(),
					"salary": $("#salary").val(),
					"picture": "me.jpg",
					"complete_Task": 0,
					"in_Service": 0
				},
				complete:function(xmlHttp,status){
					if(xmlHttp.status==201){
						window.location.replace("EditDeliveryMan.html");
					}else{
						$('#error').removeAttr('hidden');
						$("#error").html("Plese Input Properly");
					}
				}
			});
	
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