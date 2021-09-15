$(document).ready(function(){
    var type=getCookie("Type");
    if(type!='Moderator' || getCookie("userid")==null)
    {
        window.location='../../Views/Login/index.html'
    }
    else{


        $.ajax({
            url:"http://localhost:2293//api/moderator/home",
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var str='';
                    var data=xmlHttp.responseJSON;
                    //alert(data.task)
                    $("#totalEarning").html(data.totalEarning+"&nbsp Taka");
                    $("#totalEmp").html(data.totalEmp);
                    $("#task").html("&nbsp "+data.task+"%");
                    $("#task1").css("width", data.task+"%");
                    $("#pendingRequest").html(data.pendingRequest);
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