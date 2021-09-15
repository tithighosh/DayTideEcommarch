function login(){
    var UserID =$("#userid").val();
    var pass =$("#pass").val();
    //document.write(UserID)
    $.ajax({
        url:"http://localhost:2293//api/Login/login/?id="+UserID+"&pass="+pass,
       
       Method:"GET",
        complete: function(xmlhttp,status){
            {
                
                if(xmlhttp.status==200)
                {
                   // document.write("ok")
                   var data=xmlhttp.responseJSON;
                   var now = new Date();
                    var time = now.getTime();
                    var expireTime = time + 3600;
                    now.setTime(expireTime);
                   document.cookie = "userid="+UserID+"; expires='+now.toUTCString()+'; path=/;";
                   document.cookie = "pass="+pass+"; expires='+now.toUTCString()+'; path=/;";
                   document.cookie = "Type="+data.type+"; expires='+now.toUTCString()+'; path=/;";
                   if(data.type=="Admin")
                   {
                      window.location="../../Views/Admin/AdminHome.html"
                   }

                }
                else if(xmlhttp.status==403){
                    $("#msg").text("Blocked User/Your SignUp Reqest still Processing")

                }
                else if(xmlhttp.status==404)
                {
                    $("#msg").text("Invalid USerId/Psssword")
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
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}