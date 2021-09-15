$(document).ready(function(){
    var type=getCookie("Type");
    if(type!='Admin')
    {
        window.location='../../Views/Login/index.html'
    }
    
  
});
function Insertad()
{
    //document.write("All The Field Must be Inserted");
    if($("#adminId").val()==='')
    {
        $("#validationerr").text("** ID  Field Must be Inserted**")
    }
    else if($("#name").val()==='')
    {
        $("#validationerr").text("**Name Field Must be Inserted**")
    }
    else if($("#email").val()==='')
    {
        $("#validationerr").text("**Email  Field Must be Inserted**")
    }
    else if($("#phone").val()==='')
    {
        $("#validationerr").text("**phone number Must be Inserted**")
    }
    else if($("#addr").val()==='')
    {
        $("#validationerr").text("***Addres Must be Inserted***")
    }
    else if($("#sal").val()==='')
    {
        $("#validationerr").text("Salary  Field Must be Inserted")
    }
    else{
        $.ajax({
            url:"http://localhost:2293//api/Admin/AddAdmin/",
            method:"POST",
            headers:"Content-Type:application/json",
            headers:{
                "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
            },
            data:{
                "adminId": $("#adminId").val(),
                "name": $("#name").val(),
                "email": $("#email").val(),
                "phone": $("#phone").val(),
                "address":$("#addr").val(),
                "salary":$("#sal").val(),
                "picture": ""
                    
            },
            complete: function(xmlhttp,status){
                {
                    
                    if(xmlhttp.status==200)
                    {
                        window.location.replace('../../Views/Admin/AdminList.html') ;
                        //$("#msg").html(xmlhttp.status+":"+xmlhttp.statusText)
                    }
                    else if(xmlhttp.status==406)
                    {
                        $("#validationerr").text("**AdminId Already Taken Or InValid UserID**")
                    }
                    else if(xmlhttp.status==401){
                        window.location="../../Views/Login/index.html"
                    }
                    else $("#validationerr").html(xmlhttp.status+":"+xmlhttp.statusText);
                }
            }
        
        });
    }
}
function Insertdelman()
{
    //document.write("All The Field Must be Inserted");
    if($("#delManId").val()==='')
    {
        $("#validationerr").text("** ID  Field Must be Inserted**")
    }
    else if($("#name").val()==='')
    {
        $("#validationerr").text("**Name Field Must be Inserted**")
    }
    else if($("#email").val()==='')
    {
        $("#validationerr").text("**Email  Field Must be Inserted**")
    }
    else if($("#phone").val()==='')
    {
        $("#validationerr").text("**phone number Must be Inserted**")
    }
    else if($("#addr").val()==='')
    {
        $("#validationerr").text("***Addres Must be Inserted***")
    }
    else if($("#sal").val()==='')
    {
        $("#validationerr").text("Salary  Field Must be Inserted")
    }
    else{
        $.ajax({
            url:"http://localhost:2293//api/Admin/AddDelMan/",
            method:"POST",
            headers:"Content-Type:application/json",
            headers:{
                "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
            },
            data:{
                "delManId": $("#delManId").val(),
                "name": $("#name").val(),
                "email": $("#email").val(),
                "phone": $("#phone").val(),
                "address":$("#addr").val(),
                "salary":$("#sal").val(),
                "picture": "",
                "complete_Task": 0,
                "in_Service": 0
                    
            },
            complete: function(xmlhttp,status){
                {
                    
                    if(xmlhttp.status==200)
                    {
                        window.location.replace('../../Views/Admin/DeleveryManList.html') ;
                        //$("#msg").html(xmlhttp.status+":"+xmlhttp.statusText)
                    }
                    else if(xmlhttp.status==406)
                    {
                        $("#validationerr").text("**DeliveryManId Already Taken Or InValid UserID**")
                    }
                    else if(xmlhttp.status==401){
                        window.location="../../Views/Login/index.html"
                    }
                    else $("#validationerr").html(xmlhttp.status+":"+xmlhttp.statusText);
                }
            }
        
        });
    }
}
function Insertmod()
{
    //document.write("All The Field Must be Inserted");
    if($("#modId").val()==='')
    {
        $("#validationerr").text("** ID  Field Must be Inserted**")
    }
    else if($("#name").val()==='')
    {
        $("#validationerr").text("**Name Field Must be Inserted**")
    }
    else if($("#email").val()==='')
    {
        $("#validationerr").text("**Email  Field Must be Inserted**")
    }
    else if($("#phone").val()==='')
    {
        $("#validationerr").text("**phone number Must be Inserted**")
    }
    else if($("#addr").val()==='')
    {
        $("#validationerr").text("***Addres Must be Inserted***")
    }
    else if($("#sal").val()==='')
    {
        $("#validationerr").text("Salary  Field Must be Inserted")
    }
    else{
        $.ajax({
            url:"http://localhost:2293//api/Admin/AddModerator/",
            method:"POST",
            headers:"Content-Type:application/json",
            headers:{
                "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
            },
            data:{
                "moderatorId": $("#modId").val(),
                "name": $("#name").val(),
                "email": $("#email").val(),
                "phone": $("#phone").val(),
                "address":$("#addr").val(),
                "salary":$("#sal").val(),
                "picture": ""
                    
            },
            complete: function(xmlhttp,status){
                {
                    
                    if(xmlhttp.status==200)
                    {
                        window.location.replace('../../Views/Admin/ModeratorList.html') ;
                        //$("#msg").html(xmlhttp.status+":"+xmlhttp.statusText)
                    }
                    else if(xmlhttp.status==406)
                    {
                        $("#validationerr").text("**ModeratorId Already Taken Or InValid UserID**")
                    }
                    else if(xmlhttp.status==401){
                        window.location="../../Views/Login/index.html"
                    }
                    else $("#validationerr").html(xmlhttp.status+":"+xmlhttp.statusText);
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