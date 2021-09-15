$(document).ready(function(){
    var sParam = new URLSearchParams(window.location.search)
    var type=getCookie("Type");
    if(type!='Admin')
    {
        window.location='../../Views/Login/index.html'
    }
    else
    {
    
    $.ajax({
        url:"http://localhost:2293//api/Admin/DetailDelman?"+sParam,
        headers:{
            "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
        },
        complete: function(xmlhttp,status){
            {
                
                if(xmlhttp.status==200)
                {
                    var str='';
                   
                    var data=xmlhttp.responseJSON;
                    //document.write(data.name);
                    
                        
                           // document.write(data.links)
                            str+="<tr><td>"
                            str+="   <img class='img-profile ' style='height: 400px; width: 450px; margin-left: 40px ;";
                            str+="       src='~/Content/Users/"+data.picture+"'>" ;
                            str+="</td>"

                            str+="<td><dl style ='margin-left:30px'class='dl-horizontal'>";
                            str+="<dt>Name</dt>";

                            str+="<dd>"+data.name+"</dd>";

                            str+=" <dt>Email</dt>";

                            str+=" <dd>"+data.email+"</dd>";

                            str+=" <dt>Phone</dt>";

                            str+="<dd>"+data.phone+"</dd>";

                            str+=" <dt>Address</dt>";

                            str+="<dd>"+data.address+"</dd>";
                            str+=" <dt>Complete Tasks</dt>";

                            str+="<dd>"+data.complete_Task+"</dd>";

                            str+=" <dt>In Services</dt>";

                            str+="<dd>"+data.in_Service+"</dd>";

                            str+=" <dt>Salary</dt>";

                            str+="<dd>"+data.salary+"</dd>";


                            str+="</dl></td></tr>";
                            str+="<tr><td colspan='2'style='text-align:center;'><button style='margin-top:15px;background-color:orange;color:black'id='blockdel'onclick='blockdel("+JSON.stringify(data.delManId)+")'class='btn btn-primary'>Block</button>"
                            str+="<button  style='margin-top:15px;background-color:orange;color:black;margin-left:5px;margin-right:5px;'id='deleteMod'onclick='Deletedel("+JSON.stringify(data.delManId)+")'class='btn btn-primary'>Delete</button>"
                            str+="<button style='margin-top:15px;margin-left:5px;margin-right:5px;'id='UpdatesalMod'onclick='Updatesaldel("+JSON.stringify(data.delManId)+")'class='btn btn-primary'>Update Salary</button>"
                            str+="<button style='margin-top:15px;margin-left:5px;margin-right:5px;'id='UpdatesalMod'onclick='loadraring("+JSON.stringify(data.delManId)+")'class='btn btn-primary'>Load Rtings</button>"
                            str+=" <a style='margin-top:15px;margin-left:5px;margin-right:5px;'class='btn btn-primary'href='DeleveryManList.html'>Back</a></td></tr>"
                
                    
                    $("#detaildelman").html(str);
  
                }
                
            else if(xmlhttp.status==401)
            {
                window.location="../../Views/Login/index.html";
            }
                else $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
            }
        }
    
    });
}
    });
    function blockdel(id)
    {
                 
    $.ajax({
        url:"http://localhost:2293//api/Admin/Blockdel?id="+id,
        headers:{
            "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
        },
        method:"GET",
        complete: function(xmlhttp,status){
            {
                
                if(xmlhttp.status==200)
                {
                    window.location = '../../Views/Admin/DeleveryManList.html';
                }
                else if(xmlhttp.status==401)
                {
                    window.location="../../Views/Login/index.html"
                }
                else $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
            }
        }
    
    });
    
       // document.write(id)
       // var v=document.getElementById("#notifyAd").value;  
       //window.location = '../../Views/Admin/Notify.html?userid='+id;
    }
    function Updatesaldel(id)
    {
        //document.write(id)
       // var v=document.getElementById("#notifyAd").value;  
       window.location = '../../Views/Admin/updatesalDeletedelman.html?id='+id;
    }
    function Deletedel(id)
    {
        $.ajax({
            url:"http://localhost:2293//api/Admin/Deletedelman/?id="+id,
            headers:{
                "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
            },
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
                    else if(xmlhttp.status==401)
                    {
                        window.location="../../Views/Login/index.html"
                    }
                    else $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
                }
            }
        
    })
}
   function loadraring(id)
    {
        var str1=''
        var str=''
        $.ajax({
            url:"http://localhost:2293//api/Admin/Loadratingdelman/?id="+id,
            headers:{
                "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
            },
            method:"GET",
            complete: function(xmlhttp,status){
                {
                    
                    if(xmlhttp.status==200)
                    {
                        var ratin=0;
                        var data=xmlhttp.responseJSON;
                        for (var i=0;i<data.length;i++){
                            //document.write(data[i].rating);
                            ratin=ratin+parseInt(JSON.stringify(data[i].rating));
                        }
                       ratin=parseInt(ratin/data.length ) ;
                      
    
                       str1+=" <div style='margin-left:40px;margin-top:20px;margin-bottom:40px;'>"
                       str1+=" <h2>User Rating</h2>";
                                        if (ratin == 5)
                                        {
                    
                                           str1+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str1+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str1+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str1+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str1+=" <span class='fa fa-star checked'style='color:red''></span>"; 
                                        }
                                        else if (ratin  ==4 )
                                        {
                                          //document.write("hi")
                                            str1+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str1+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str1+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str1+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str1+=" <span class='fa fa-star '></span>"; 
                                        }
                                        else if (ratin == 3)
                                        {
                                            str1+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str1+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str1+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str1+=" <span class='fa fa-star '></span>"; 
                                           str1+=" <span class='fa fa-star '></span>"; 
                                        }
                                        else if (ratin ==  2)
                                        {
                                            str1+=" <span class='fa fa-star style='style='color:red' ></span>"; 
                                           str1+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str1+=" <span class='fa fa-star '></span>"; 
                                           str1+=" <span class='fa fa-star '></span>"; 
                                           str1+=" <span class='fa fa-star '></span>"; 
                                        }
                                        else if(ratin ==  1)
                                        {
                                            str1+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                            str1+=" <span class='fa fa-star '></span>"; 
                                            str1+=" <span class='fa fa-star '></span>"; 
                                            str1+=" <span class='fa fa-star '></span>"; 
                                            str1+=" <span class='fa fa-star '></span>"; 
                                        }
                                        
                    
                                    str1+="</div>"
                                    $("#totalrating").html(str1);

                                   // document.write(data[0].commments)
                                    str+="<div style='color:white;margin-bottom:40px;'><h3>Individual Comments:</h3>"
                                    for (var i=0;i<data.length;i++){
                                        str+="<div class='col-sm-18'>";
                                        str+="    <div class='card'>";
                                        str+="        <div class='card-body' style='background-color:rgb(102, 153, 255);'>";
                                       str+="           <h4>CustomerId</h4><h3>"+data[i].customerId+"</h3>";
                                        str+="          <h4><b>Comments:</b> "+data[i].comments;
                                        str+="           <h4><b>Rating:</b>";
                                        if (data[i].rating == 5)
                                        {
                    
                                           str+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str+=" <span class='fa fa-star checked'style='color:red''></span>"; 
                                        }
                                        else if (data[i].rating  ==4 )
                                        {
                                          //document.write("hi")
                                            str+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str+=" <span class='fa fa-star '></span>"; 
                                        }
                                        else if (data[i].rating == 3)
                                        {
                                            str+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str+=" <span class='fa fa-star '></span>"; 
                                           str+=" <span class='fa fa-star '></span>"; 
                                        }
                                        else if (data[i].rating[i].rating ==  2)
                                        {
                                            str+=" <span class='fa fa-star style='style='color:red' ></span>"; 
                                           str+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                           str+=" <span class='fa fa-star '></span>"; 
                                           str+=" <span class='fa fa-star '></span>"; 
                                           str+=" <span class='fa fa-star '></span>"; 
                                        }
                                        else if (data[i].rating ==  1)
                                        {
                                            str+=" <span class='fa fa-star checked'style='color:red'></span>"; 
                                            str+=" <span class='fa fa-star '></span>"; 
                                            str+=" <span class='fa fa-star '></span>"; 
                                            str+=" <span class='fa fa-star '></span>"; 
                                            str+=" <span class='fa fa-star '></span>"; 
                                        }
                                        else
                                        {   
                                            //document.write("hi")
                                            str+=" <span class='fa fa-star '></span>"; 
                                            str+=" <span class='fa fa-star '></span>"; 
                                            str+=" <span class='fa fa-star '></span>"; 
                                            str+=" <span class='fa fa-star '></span>"; 
                                            str+=" <span class='fa fa-star '></span>"; 
                                        }
                                        str+="        </div> </div></div>"
                                      
                                    }
                                    str+="        </div> ";
                                     $("#rating").html(str);
                       
                        //window.location = '../../Views/Admin/DeleveryManList.html';
                    }
                    else if(xmlhttp.status==204)
                    {
                        
                        str1+=" <div style='margin-left:40px;margin-top:20px;margin-bottom:40px;'>"
                        str1+=" <h2>User Rating</h2>";
                            //document.write("hi")
                            str1+=" <span class='fa fa-star '></span>"; 
                            str1+=" <span class='fa fa-star '></span>"; 
                            str1+=" <span class='fa fa-star '></span>"; 
                            str1+=" <span class='fa fa-star '></span>"; 
                            str1+=" <span class='fa fa-star '></span>"; 
                            str1+="</div>"
                            $("#totalrating").html(str1);
                    }
                    else if(xmlhttp.status==401)
                    {
                        window.location="../../Views/Login/index.html"
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
function rating(r)
{
    
    //document.write(r1)
   

}