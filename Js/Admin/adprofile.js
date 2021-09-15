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
        url:"http://localhost:2293//api/Admin/Adprofile?id="+getCookie("userid"),
        headers:{
            "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
        },
        complete: function(xmlhttp,status){
            {
                
                if(xmlhttp.status==200)
                {
                    var str='';
                   
                    var data=xmlhttp.responseJSON;
                   // document.write(data.name);
                    var src="data:image/png; base64"
                    //document.write(src)
                 //<img src="data:image/png;base64,">
                           // document.write(data.links)
                            str+="<tr><td>"
                            str+="   <img  style='height: 400px; width: 450px; margin-left: 40px ; src='"+src+","+data.picture+"'>" ;
                            str+="</td>"

                            str+="<td><dl style ='margin-left:30px'class='dl-horizontal'>";
                            str+="<dt>AdminId</dt>";

                            str+="<dd>"+data.adminId+"</dd>";

                            str+="<dt>Name</dt>";

                            str+="<dd>"+data.name+"</dd>";

                            str+=" <dt>Email</dt>";

                            str+=" <dd>"+data.email+"</dd>";

                            str+=" <dt>Phone</dt>";

                            str+="<dd>"+data.phone+"</dd>";

                            str+=" <dt>Address</dt>";

                            str+="<dd>"+data.address+"</dd>";

                            str+=" <dt>Salary</dt>";

                            str+="<dd>"+data.address+"</dd>";


                            str+="</dl></td></tr>";
                            str+="<tr><td colspan='2'style='text-align:center;'><button style='margin-top:15px;background-color:orange;color:black'id='blockmod'onclick='EditBio("+JSON.stringify(data.adminId)+")'class='btn btn-primary'>EditBio</button>"
                            str+="</td></tr>" ;
                    
                    $("#detailadmin").html(str);
  
                }
                else if(xmlhttp.status==401){
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
    function EditBio(id)
    {
        window.location="../../Views/Admin/EditBio.html?id="+id;
    }