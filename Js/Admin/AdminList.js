$(document).ready(function(){
    var type=getCookie("Type");
    if(type!='Admin')
    {
        window.location='../../Views/Login/index.html'
    }
    else{
        $.ajax({
            url:"http://localhost:2293//api/Admin/AdminList",
            headers:{
                "Authorization":"Basic "+btoa("Admin:111")
            },
            //getCookie("Type"+":"+getCookie("userid")+":"+getCookie("pass")
            complete: function(xmlhttp,status){
                {
                    
                    if(xmlhttp.status==200)
                    {
                        var str='';
                        var data=xmlhttp.responseJSON;
                      // document.write(data[0].admin.adminId.toString());
                        for(var i=0;i<data.length;i++)
                        {
                            if(data[i].user.userId!=getCookie("userid")){
                               // document.write(data[i].user.userId,getCookie("userid"))
                            if (data[i].user.status=="valid"){
                                
                                    str+="<tr><td>"+data[i].admin.name+"</td><td>"+data[i].admin.email+"</td><td>"+data[i].admin.phone+"</td>";
                                    str+="<td>"+data[i].admin.address+"</td><td>"+data[i].admin.salary+"</td>";
                                    str+="<td><button id='notifyad' class='btn btn-primary'onclick='notifyad("+JSON.stringify(data[i].admin.adminId)+")'>Notify</button><td></tr>";
                                }
                            }
 
                        }
                        $("#adminlist tbody").html(str);
                        
                    }
                    else if(xmlhttp.status==401){
                        
                    }
                    else $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
                }
            }
        
        });
        
        
    }

});
function notifyad(id)
{
   // var v=document.getElementById("#notifyAd").value;  
   window.location = '../../Views/Admin/Notify.html?userid='+id;
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