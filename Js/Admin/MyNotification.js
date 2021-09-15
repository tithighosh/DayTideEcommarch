$(document).ready(function(){
    var type=getCookie("Type");
    if(type!='Admin')
    {
        window.location='../../Views/Login/index.html'
    }
    else
    {
    
    $.ajax({
        url:"http://localhost:2293//api/Admin/Mynotification/?id="+getCookie("userid"),
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
                           if(data[i].status=='Unread')
                           {
                                
                                str+="<div class='col-sm-6'>";
                                str+="    <div class='card'>";
                                str+="        <div class='card-body' style='background-color:rgb(102, 153, 255);'>";
                                str+="            <h4>A New Notice Posted For:</h4><h5>"+data[i].send_For+"</h5>";
                                str+="          <h4><b>Massage:</b> <div id =Viewmsg></div></h4>";
                                str+="           <h4><b>Notice Sent By:</b> "+data[i].send_by+"</h4>";
                                str+="  <button style='color:white;background-color:#0099cc;margin-top;30px' onclick=view("+JSON.stringify(data[i].id)+") id='updatesaldelbtn'class='btn'>View Massege</button>";
                                
                                str+="        </div> </div></div>"
                    // "+data[i].massage+"";
                        }
                        else{
                                
                            str1+="<div class='col-sm-6'>";
                            str1+="    <div class='card'>";
                            str1+="        <div class='card-body' style='background-color:rgb(179, 179, 255));'>";
                            str1+="            <h4>A New Notice Posted For:</h4><h5>"+data[i].send_For+"</h5>";
                            str1+="          <h4><b>Massage:</b> <div id =Viewmsg></div></h4><h5>"+data[i].massage+"<h5>";
                            str1+="           <h4><b>Notice Sent By:</b> "+data[i].send_by+"</h4>";
                           // str1+="  <button style='color:white;background-color:#0099cc;margin-top;30px' onclick=view("+JSON.stringify(data[i].id)+") id='updatesaldelbtn'class='btn'>View Massege</button>";
                            
                            str1+="        </div> </div></div>"
                        }
                    }
                    $("#viewnotice").html(str1);
                    $("#notviewnotice").html(str);

                    
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
function view(id){
    $.ajax({
        url:"http://localhost:2293//api/Admin/viewFullMassege?id="+id,
        headers:{
            "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
        },
        Method:"GET",
        complete: function(xmlhttp,status){
            {
                var data1=xmlhttp.responseJSON;
                if(xmlhttp.status==200)
                {
                    $("#Viewmsg").text(data1.massage)
                 //   window.location="../../Views/Admin/PostedNotification.html"

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