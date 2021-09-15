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
        url:"http://localhost:2293//api/Admin/EditBio?id="+getCookie("userid"),
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
                    
                        
                           // document.write(data.links)
                           
                                                    
                        //    str+="<div id='pic'>";
                        //     str+="<div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                        //     str+=" <label for='Message' class='form-label'>Picture</label>";
                        //     str+="<input type='file' id='file' name='files' />"
                        //     //str+="  <input type='file'' value="+data.picture+" class='form-control' name='files' id='files' aria-describedby='moderatorId'>";
                        //     str+="<textarea id='base64' rows='5'></textarea>";
                            str+="<div id='adadmin'>";
                            str+="<div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                            str+=" <label for='Message' class='form-label'>Admin Id</label>";
                            str+="  <input type='text'' value="+data.adminId+" class='form-control' id='adminId' aria-describedby='moderatorId'readonly>";
                                
                            str+="  </div>";
                            str+=" <div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                            str+=" <label for='name' class='form-label'>Name</label>";
                            str+="  <input type='text' value="+data.name+" class='form-control' id='name' aria-describedby='name'>";
                              
                            str+=" </div>";
                            str+=" <div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                            str+="   <label for='email' class='form-label'>Email</label>";
                            str+=" <input type='text' class='form-control'value="+data.email+" id='email' aria-describedby='email'>";
                                  
                            str+=" </div>";
                            str+="<div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                            str+="<label for='phone' class='form-label'>Phone</label>";
                            str+="<input type='text'' value="+data.phone+" class='form-control' id='phone' aria-describedby='phone'>";
                                
                            str+="</div>";
                            str+="<div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                            str+=" <label for='Address' class='form-label'>Address</label>";
                            str+="   <input type='text' value="+data.address+" class='form-control' id='addr' aria-describedby='add'>";
                                  
                            str+="</div>";
                            str+="<div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                            str+=" <label for='sal' class='form-label'hidden>Salary</label>";
                            str+="   <input type='text' value="+data.salary+" class='form-control' id='sal' aria-describedby='sal'hidden></div>";
                            str+=" <button style='margin-left:45%;margin-bottom:50px;margin-top:45px' onclick=updatetad() id='updatead'class='btn btn-primary col-md-offset-2'>Update</button>";
                              
                          


                            
                         
                      
                    $("#editadmin").html(str);
  
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
    function updatetad()
{
    //document.write("All The Field Must be Inserted");
    if($("#name").val()==='')
    {
        $("#validationerr").text("**Name Field Must be Inserted**")
    }
    // else if($("#files").val()!==null)
    // {
         
    // }
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
            url:"http://localhost:2293//api/Admin/EditBio/",
            headers:{
                "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
            },
            method:"PUT",
            headers:"Content-Type:application/json",
            data:{
                "adminId": $("#adminId").val(),
                "name": $("#name").val(),
                "email": $("#email").val(),
                "phone": $("#phone").val(),
                "address":$("#addr").val(),
                "salary":$("#sal").val(),
                "picture": $("#base64").val()
                    
            },
            complete: function(xmlhttp,status){
                {
                    
                    if(xmlhttp.status==201)
                    {
                        window.location.replace('../../Views/Admin/Adprofile.html') ;
                        //$("#msg").html(xmlhttp.status+":"+xmlhttp.statusText)
                    }
                    else if(xmlhttp.status==401)
                    {
                        window.location="../../Views/Login/index.html"
                    }
                    else if(xmlhttp.status==406)
                    {
                        $("#validationerr").text("**AdminId Already Taken Or InValid UserID**")
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
 
    // $("files").on('focusout',function(){
    //     Document.write('hi')
    //     var data = $(this).val().base64file(); // it is not a plugin is just an example
    //     alert(data);
    //   });