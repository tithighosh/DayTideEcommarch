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
                            if (data[i].user.status=="valid"){
                                //document.write(data[0].user.status)
        
                                str+="<tr><td>"+data[i].deliveryMan.name+"</td><td>"+data[i].deliveryMan.email+"</td><td>"+data[i].deliveryMan.phone+"</td><td>"+data[i].deliveryMan.address+"</td><td>"+data[i].deliveryMan.salary+"</td>";
                                str+="<td><button id='notifydel'style='margin-right:5px' class='btn btn-primary'onclick='notifydel("+JSON.stringify(data[i].deliveryMan.delManId)+")'>Notify</button>";
                                str+="<button id='notifydel' class='btn btn-primary'onclick='detaildel("+JSON.stringify(data[i].deliveryMan.delManId)+")'>Detail</button>";
                                str+="</td></tr>";
                            }
                           
                            //str+="<td>"+data.AdminId+"</td>";
                            
                        }
                        $("#validDellist tbody").html(str);
                        
                        for(var i=0;i<data.length;i++)
                        {
                            if (data[i].user.status=="invalid"){
    
                                str1+="<tr><td>"+data[i].deliveryMan.name+"</td><td>"+data[i].deliveryMan.email+"</td><td>"+data[i].deliveryMan.phone+"</td><td>"+data[i].deliveryMan.address+"</td>><td>"+data[i].deliveryMan.salary+"</td>";
                                str1+="<td><button style='margin-right:5px;'id='blockdel'onclick='Unblockdel("+JSON.stringify(data[i].deliveryMan.delManId)+")'class='btn btn-primary'>UnBlock</button>";
                                str1+="<button id='Deletedel' class='btn btn-primary'id='blockdel'onclick='Deletedel("+JSON.stringify(data[i].deliveryMan.delManId)+")'>Delete</button>";
                                str1+="</td></tr>";
                            }
                        
                            //str+="<td>"+data.AdminId+"</td>";
                            
                        }
                         $("#invalidDellist tbody").html(str1);
                    
                        
                    }
                    else if(xmlhttp.status==401){
                        window.location="../../Views/Login/index"
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
       window.location = '../../Views/Admin/DetailDelman.html?id='+id;
    }
    function Unblockdel(id)
    {
        $.ajax({
            url:"http://localhost:2293//api/Admin/UnBlockdel?id="+id,
            method:"GET",
            complete: function(xmlhttp,status){
                {
                    
                    if(xmlhttp.status==200)
                    {
                        window.location = '../../Views/Admin/DeleveryManList.html';
                    }
                    else $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
                }
            }
        
        });
    }
    function Deletedel(id)
    {
        $.ajax({
            url:"http://localhost:2293//api/Admin/Deletedelman/?id="+id,
            method:"DELETE",
            complete: function(xmlhttp,status){
                {
                    
                    if(xmlhttp.status==200)
                    {
                        
                        window.location = '../../Views/Admin/DeleveryManList.html';
                    }
                    else if(xmlhttp.status==406)
                    {
                        $("#msg").text("Couldnot Delete Delevery Man is under A delevery Process")
                    }
                    else $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
                }
            }
        
    })
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