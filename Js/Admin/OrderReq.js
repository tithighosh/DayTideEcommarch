$(document).ready(function(){
    var type=getCookie("Type");
    if(type!='Admin')
    {
        window.location='../../Views/Login/index.html'
    }
    else
    {
    
    $.ajax({
        url:"http://localhost:2293//api/Admin/OrderRequest",
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
                  //document.write(data[0]);
                    for(var i=0;i<data.length;i++)
                    {
                     
    
                            str+="<tr><td>"+data[i].date+"<td>"+data[i].address+"</td><td>"+data[i].district+"</td><td>"+data[i].amount+"</td><td>"+data[i].payment_Type+"</td><td>"+data[i].customerId+"</td>";
                            str+="<td><button id='acceptreq'style='margin-right:5px' class='btn btn-primary'onclick='accept("+JSON.stringify(data[i].orderId)+")'>Accept</button>";
                            str+="<button style='background-color:red'id='delreq' class='btn btn-primary'onclick='deletereq("+JSON.stringify(data[i].orderId)+")'>Delete</button>";
                            str+="</td></tr>";
                        
                       
                        //str+="<td>"+data.AdminId+"</td>";
                        
                    }
                    $("#processorderlist tbody").html(str);

                }
                else  if(xmlhttp.status==401)
                {
                    window.location="../../Views/Login/index.html"
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
       window.location = '../../Views/Admin/Editdelreq.html?id='+id;
    }
    function deletereq(id)
    {
        $.ajax({
            url:"http://localhost:2293//api/Admin/Deletedelreq?id="+id,
            headers:{
                "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
            },
            method:'DELETE',
            complete: function(xmlhttp,status){
                {
                    //document.write(xmlhttp.status)
                    
                    if(xmlhttp.status==204)
                    {
                       
                        window.location = '../../Views/Admin/OrderRequest.html';
                    }
                    else if(xmlhttp.status==401){
                        window.location="../../Views/Login/index.html"
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