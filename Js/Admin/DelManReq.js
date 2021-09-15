$(document).ready(function(){
    var type=getCookie("Type");
    if(type!='Admin')
    {
        window.location='../../Views/Login/index.html'
    }
    else
    {
    $.ajax({
        url:"http://localhost:2293//api/Admin/Deleverymanlist",
        headers:{
            "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
        },
        complete: function(xmlhttp,status){
            {
                
                if(xmlhttp.status==200)
                {
                    var str='';
                    var str1='';
                    var data=xmlhttp.responseJSON;
                  //document.write(data[0].user.status);
                    for(var i=0;i<data.length;i++)
                    {
                        if (data[i].user.status=="Processing"){
                            //document.write(data[0].user.status)
    
                            str+="<tr><td>"+data[i].deliveryMan.delManId+"<td>"+data[i].deliveryMan.name+"</td><td>"+data[i].deliveryMan.email+"</td><td>"+data[i].deliveryMan.phone+"</td><td>"+data[i].deliveryMan.address+"</td>";
                            str+="<td><button id='acceptreq'style='margin-right:5px' class='btn btn-primary'onclick='accept("+JSON.stringify(data[i].deliveryMan.delManId)+")'>Accept</button>";
                            str+="<button style='background-color:red'id='delreq' class='btn btn-primary'onclick='deletereq("+JSON.stringify(data[i].deliveryMan.delManId)+")'>Delete</button>";
                            str+="</td></tr>";
                        }
                       
                        //str+="<td>"+data.AdminId+"</td>";
                        
                    }
                    $("#processDellist tbody").html(str);

                }
                else if(xmlhttp.status==401)
                {
                    window.location="../../Views/Login/index.html";
                }

                else $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
            }
        }
    
    });
}
});
function accept(id)
    {
       // var v=document.getElementById("#notifyAd").value;  
       window.location = '../../Views/Admin/EditDelSignup.html?id='+id;
    }
    function deletereq(id)
    {
        $.ajax({
            url:"http://localhost:2293//api/Admin/DeleteDelSignup?id="+id,
            method:'DELETE',
            headers:{
                "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
            },
            complete: function(xmlhttp,status){
                {
                    
                    if(xmlhttp.status==200)
                    {
                       
                        window.location = '../../Views/Admin/DelManReq.html';
                    }
                    else if(xmlhttp.status==401)
                    {
                        window.location="../../Views/Login/index.html";
                    }
    
                    else $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
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