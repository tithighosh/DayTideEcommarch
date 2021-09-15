$(document).ready(function(){
    var type=getCookie("Type");
    if(type!='Admin')
    {
        window.location='../../Views/Login/index.html'
    }
    else
    {
    
    $.ajax({
        url:"http://localhost:2293//api/Admin/PostedNotification/?id="+getCookie("userid"),
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
                        //document.write(data[i].status)        
                           
                                
                                str+="<div class='col-sm-6'>";
                                str+="    <div class='card'>";
                                str+="        <div class='card-body' style='background-color:rgb(102, 153, 255);'>";
                                str+="            <h4>Notice Posted For:</h4><h5>"+data[i].send_For+"</h5>";
                                str+="           <h4><b>Massage:</b> "+data[i].massage+"</h4>";
                                str+="           <h4><b>Notice status:</b> "+data[i].status+"</h4>";
                                str+="  <button style='color:white;background-color:#0099cc;margin-top;30px' onclick=editnoti("+JSON.stringify(data[i].id)+") id='updatesaldelbtn'class='btn'>Edit</button>";
                                str+="  <button style='color:white;background-color:red;margin-top;30px' onclick=deletenoti("+JSON.stringify(data[i].id)+") id='updatesaldelbtn'class='btn'>Delete</button>";
                                str+="        </div> </div></div>"
                    
                        
                    }
                    $("#application").html(str);
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
function editnoti(id){
    window.location = '../../Views/Admin/EditNotice.html?id='+id;
}
function deletenoti(id){
    $.ajax({
        url:"http://localhost:2293//api/Admin/DeleteNotice?id="+id,
        headers:{
            "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
        },
        Method:"GET",
        complete: function(xmlhttp,status){
            {
                
                if(xmlhttp.status==204)
                {
                    window.location="../../Views/Admin/PostedNotification.html"

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