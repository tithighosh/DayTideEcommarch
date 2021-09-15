$(document).ready(function(){
	var type=getCookie("Type");

	//alert(type)
    if(type!='Moderator' || getCookie("userid")==null)
    {
        window.location='../../Views/Login/index.html'
    }
    else{

		$("#AddCategory").click(function(){
			$.ajax({
				url:"http://localhost:2293/api/moderator/addcategory",
				method:"POST",
				headers:"Content-Type:application/json",
				data:
				{
					"categoryName": $("#categoryName").val(),
				},
				complete:function(xmlHttp,status){
					if(xmlHttp.status==201){
						window.location.replace("EditCategory.html");
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