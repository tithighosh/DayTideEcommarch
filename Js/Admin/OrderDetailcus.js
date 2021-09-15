$(document).ready(function(){
    var sParam = new URLSearchParams(window.location.search)
    var  param = sParam.get('id')
    var type=getCookie("Type");
    if(type!='Admin')
    {
        window.location='../../Views/Login/index.html'
    }
    else
    {
    //document.write(param);
    
    $.ajax({
        url:"http://localhost:2293//api/Admin/OrderDetailcus?"+sParam,
        headers:{
            "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
        },
        complete: function(xmlhttp,status){
            {
                
                if(xmlhttp.status==200)
                {
                    var str='';
                   
                    var data=xmlhttp.responseJSON;
                    //document.write(data);
                    for(var i=0;i<data.length;i++)
                    {
                        if (data[i].customer.customerId==param){

                            //document.write(param);
                            //document.write(data[0].user.status)
    
                            str+="<tr><td>"+data[i].order_Detail.date+"</td>";
                            str+="<td>"+data[i].customer.name+"</td>";
                            str+="<td>"+data[i].customer.customerId+"</td>";
                            str+="<td>"+data[i].order_Detail.address+"</td>";
                            str+="<td>"+data[i].order_Detail.district+"</td>";
                            str+="<td>"+data[i].order_Detail.amount+"</td>";
                            str+="<td>"+data[i].order_Detail.payment_Type+"</td>";
                            str+="<td>"+data[i].deliveryMan.name+"</td>";
                            str+="<td>"+data[i].deliveryMan.delManId+"</td>";
                            str+="<td>"+data[i].order_Detail.status+"</td>";
                            str+="</tr>";
                        }
                    
                        //str+="<td>"+data.AdminId+"</td>";
                        
                    }
                     $("#orderdetailcus tbody").html(str);
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