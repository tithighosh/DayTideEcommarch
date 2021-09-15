$(document).ready(function(){
    var type=getCookie("Type");
    if(type!='Admin')
    {
        window.location='../../Views/Login/index.html'
    }
    else
    {
    
    $.ajax({
        url:"http://localhost:2293//api/Admin/OrderHistory",
        headers:{
            "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
        },
        complete: function(xmlhttp,status){
            {
                
                if(xmlhttp.status==200)
                {
                    var str='';
                    
                    var data=xmlhttp.responseJSON;
                  //document.write(data[0]);
                    for(var i=0;i<data.length;i++)
                    {
                     
    
                            str+="<tr><td>"+data[i].orderId+"</td><td>"+data[i].date+"</td><td>"+data[i].address+"</td><td>"+data[i].district+"</td><td>"+data[i].amount+"</td><td>"+data[i].payment_Type+"</td><td>"+data[i].customerId+"</td><td>"+data[i].delManId+"</td><td>"+data[i].status+"</td></tr>";
                        
                       
                        //str+="<td>"+data.AdminId+"</td>";
                        
                    }
                    $("#processorderlist tbody").html(str);

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