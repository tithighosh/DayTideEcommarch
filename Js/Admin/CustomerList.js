$(document).ready(function(){
    var type=getCookie("Type");
    if(type!='Admin')
    {
        window.location='../../Views/Login/index.html'
    }
    else{
    $.ajax({
        url:"http://localhost:2293//api/Admin/Customerlist",
        headers:{
            "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
        },
        complete: function(xmlhttp,status){
            {
                
                if(xmlhttp.status==200)
                {
                    var str='';
                    var data=xmlhttp.responseJSON;
                   //document.write(data[0].user.type);
                    for(var i=0;i<data.length;i++)
                    {
                        if (data[i].user.status=="valid"){
    
                            str+="<tr><td>"+data[i].customer.name+"</td><td>"+data[i].customer.email+"</td><td>"+data[i].customer.phone+"</td><td>"+data[i].customer.address+"</td>";
                            str+="<td><button id='notifycus'style='margin-right:5px' class='btn btn-primary'onclick='notifycus("+JSON.stringify(data[i].customer.customerId)+")'>Notify</button>";
                            str+="<button id='Detailcus'style='margin-right:5px' class='btn btn-primary'onclick='detailycus("+JSON.stringify(data[i].customer.customerId)+")'>Detail</button>";
                            str+="<button id='orderdetail' class='btn btn-primary'onclick='Orderdetailcus("+JSON.stringify(data[i].customer.customerId)+")'>Orderdetail</button>";
                            str+="</td></tr>";
                        }
                       
                        //str+="<td>"+data.AdminId+"</td>";
                        
                    }
                    $("#Customerlist tbody").html(str);
                    
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
    function notifycus(id)
    {
       // var v=document.getElementById("#notifyAd").value;  
       window.location = '../../Views/Admin/Notify.html?userid='+id;
    }
    function detailycus(id)
    {
       // var v=document.getElementById("#notifyAd").value;  
       window.location = '../../Views/Admin/Detailscus.html?id='+id;
    }
    function Orderdetailcus(id)
    {
       // var v=document.getElementById("#notifyAd").value;  
       window.location = '../../Views/Admin/OrderDetailcus.html?id='+id;
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