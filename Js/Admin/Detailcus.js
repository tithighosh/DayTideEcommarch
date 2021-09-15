$(document).ready(function(){
    var sParam = new URLSearchParams(window.location.search)
    var type=getCookie("Type");
    if(type!='Admin')
    {
        window.location='../../Views/Login/index.html'
    }
    else
    {
    $.ajax({
        url:"http://localhost:2293//api/Admin/DetailCus?"+sParam,
        headers:{
            "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
        },
        complete: function(xmlhttp,status){
            {
                
                if(xmlhttp.status==200)
                {
                    var str='';
                   
                    var data=xmlhttp.responseJSON;
                    //document.write(data.customerId);
                    
                        
                            //document.write(data[0].user.status)
    
                            str+="<dl class='dl-horizontal'>";
                            str+="<dt>Name</dt>";

                            str+="<dd>"+data.name+"</dd>";

                            str+=" <dt>Email</dt>";

                            str+=" <dd>"+data.email+"</dd>";

                            str+=" <dt>Phone</dt>";

                            str+="<dd>"+data.phone+"</dd>";

                            str+=" <dt>Address</dt>";

                            str+="<dd>"+data.address+"</dd>";

                            str+="</dl>";
                        
                            
                    
                    $("#detailcus").html(str);
  
                }
                else if(xmlhttp.status==401)
                {
                    window.location="../../Views/Login/index.html"
                }
            
                else $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
            }
        }
    
    });
}
    });
    function notifydel(id)
    {
       // var v=document.getElementById("#notifyAd").value;  
       window.location = '../../Views/Admin/Notify.html?userid='+id;
    }
    function detaildel(id)
    {
       // var v=document.getElementById("#notifyAd").value;  
       window.location = '../../Views/Admin/DetailDelman.html?userid='+id;
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