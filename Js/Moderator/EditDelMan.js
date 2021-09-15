
$(document).ready(function(){
    var type=getCookie("Type" || getCookie("userid")==null);
    if(type!='Moderator')
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

    var UserId = getUrlParameter('UserId');

	$.ajax({
		url:"http://localhost:2293/api/moderator/getdeliveryman/"+UserId,
        method:"GET",
		headers:"Content-Type:application/json",
		complete:function(xmlHttp,status){
			if(xmlHttp.status==200){
				var data=xmlHttp.responseJSON;
                $("#id").val(data.delManId);
                $("#name").val(data.name);
                $("#email").val(data.email);
                $("#phone").val(data.phone);
                $("#address").val(data.address);
                $("#salary").val(data.salary);
			}else{
				alert(xmlHttp.statusText);
			}
		}
	});

    $("#EditDeliveryMan").click(function(){
		$.ajax({
			url:"http://localhost:2293/api/moderator/editdeliveryman/"+UserId,
			method:"PUT",
			headers:"Content-Type:application/json",
			data:
			{
				"delManId": $("#id").val(),
				"name": $("#name").val(),
				"email": $("#email").val(),
				"phone": $("#phone").val(),
				"address": $("#address").val(),
				"salary": $("#salary").val(),
				"picture": "default.jpg",
				"complete_Task": 0,
				"in_Service": 0
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==200){
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