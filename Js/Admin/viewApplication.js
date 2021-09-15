$(document).ready(function(){
    var type=getCookie("Type");
    if(type!='Admin')
    {
        window.location='../../Views/Login/index.html'
    }
    else
    {
        $("#uname").text(getCookie("userid"))
    $.ajax({
        url:"http://localhost:2293//api/Admin/viewApplication",
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
                            if (data[i].status == "Processing")
                            {
                                
                                str+="<div class='col-sm-6'>";
                                str+="    <div class='card'>";
                                str+="        <div class='card-body' style='background-color:rgb(102, 153, 255);'>";
                                str+="            <h4>A  New Application Posted By "+data[i].sentBy+" <b></b></h4>";
                                str+="           <h4><b>Massage:</b> "+data[i].massage+"</h4>";
                                str+="           <h4><b>Application Subject:</b> "+data[i].applicationType+"</h4>";
                                str+="  <button style='color:white;background-color:#0099cc;margin-top;30px' onclick=AcceptApplication("+JSON.stringify(data[i].id)+") id='updatesaldelbtn'class='btn'>Accept</button>";
                                str+="  <button style='color:white;background-color:red;margin-top;30px' onclick=RejectApplication("+JSON.stringify(data[i].id)+") id='updatesaldelbtn'class='btn'>Reject</button>";
                                str+="        </div> </div></div>"
                    
                            }
                        //str+="<td>"+data.AdminId+"</td>";
                        
                    }
                    $("#application").html(str);
                    for(var i=0;i<data.length;i++)
                    {   
                        //document.write(data[i].status)        
                            if (data[i].status != "Processing")
                            {
                                
                                str1+="<div class='col-sm-6'>";
                                str1+="    <div class='card'>";
                                str1+="        <div class='card-body' style='background-color:rgba(0,0,255,0.1);'>";
                                str1+="            <h4>A  New Application Posted By "+data[i].sentBy+" <b></b></h4>";
                                str1+="           <h4><b>Massage:</b> "+data[i].massage+"</h4>";
                                str1+="           <h4><b>Application Subject:</b> "+data[i].applicationType+"</h4>";
                                str1+="         <h4><b>Application Status:</b> "+data[i].status+"</h4>";
                                str1+="        </div> </div></div>"
                    
                            }
                        //str+="<td>"+data.AdminId+"</td>";
                        
                    }
                    $("#doneapplication").html(str1);


                }
                else if (xmlhttp.status==401)
                {
                    window.location="../../Views/Login/index.html";
                }

                else $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
            }
        }
    
    });
}
});
function AcceptApplication(id){
    $.ajax({
        url:"http://localhost:2293//api/Admin/applicationAccept/?id="+id+"&userid="+getCookie("userid"),
        headers:{
            "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
        },
        Method:"GET",
        complete: function(xmlhttp,status){
            {
                
                if(xmlhttp.status==200)
                {
                    window.location="../../Views/Admin/viewApplication.html"

                }
                else if (xmlhttp.status==401)
                {
                    window.location="../../Views/Login/index.html";
                }
                else $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
            }
        }
    
    });
}
function RejectApplication(id){
    $.ajax({
        url:"http://localhost:2293//api/Admin/applicationReject/?id="+id+"&userid="+getCookie("userid"),
        headers:{
            "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
        },
        Method:"GET",
        complete: function(xmlhttp,status){
            {
                
                if(xmlhttp.status==200)
                {
                    window.location="../../Views/Admin/viewApplication.html"

                }
                else if (xmlhttp.status==401)
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