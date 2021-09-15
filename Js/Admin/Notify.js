$(document).ready(function(){
    var sParam = new URLSearchParams(window.location.search)
    var type=getCookie("Type");
    if(type!='Admin')
    {
        window.location='../../Views/Login/index.html'
    }
    else
    {
   // document.write(sParam);
    //$("#send_For").text(sParam[userid]);
    //var userid=getCookie("userid")

    $.ajax({
        url:"http://localhost:2293//api/Admin/Notify/?"+sParam+"&id="+getCookie("userid"),
        headers:{
            "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
        },
        complete: function(xmlhttp,status){
            {
                
                if(xmlhttp.status==200)
                {
                   
                    var str='';
                    var data=xmlhttp.responseJSON;
                    //document.write(data.send_For);
                    
                    
                    str+="<div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                    str+="<label for='Message' class='form-label'><h3>Message</h3></label>";
                    str+="<input type='text'style ='height: 80px;' class='form-control' id='Message' aria-describedby='massege'>";
                      
                    str+="</div>";
                    str+="<div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                    str+="<label for='send_For' class='form-label'>Send For</label>";
                    str+="  <input type='text' value="+JSON.stringify(data.send_For)+"class='form-control' id='send_For' aria-describedby='send_For'readonly>";
                        
                    str+=" </div>";
                    str+=" <div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                    str+="   <label for='send_By' class='form-label'>Send By</label>";
                    str+="  <input type='text' class='form-control'value="+JSON.stringify(data.send_by)+" id='send_By' aria-describedby='send_By'readonly>";
                        
                    str+="</div>";
                    str+=" <button style='margin-left:45%' onclick=post() id='insertnotice'class='btn btn-primary col-md-offset-2'>Post</button>";
                    
               
                    $("#notify").html(str);
                    
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

  function post()
    {
        var msg=$("#Message").val();
        //document.write(msg);
        if(msg===''){
            
            $("#validationerr").text("Insert some message before Submit")
            
        }
        else {
            
    $.ajax({
        url:"http://localhost:2293//api/Admin/Notify",
        method:"POST",
        headers:{
            "Authorization":"Basic "+btoa('"'+getCookie("Type")+':'+getCookie("userid")+':'+getCookie("pass")+'"')
        },
        headers:"Content-Type:application/json",
        data:{
            "massage": $("#Message").val(),
            "send_For":  $("#send_For").val(),
            "send_by":  $("#send_By").val(),
            "status": "Unread"
        },
        complete: function(xmlhttp,status){
            {
                
                if(xmlhttp.status==201)
                {
                    $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText)
                }
               // else if(xmlhttp.status==401){
                //     window.location="../../Views/Login/index.html"
                // }
                else $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
            }
        }
    
    });
    
        }
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
    /*function valid()
    {
        var msg=document.getElementById("#Message");
        document.write(msg);
    }*/