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

    $.ajax({
        url:"http://localhost:2293//api/Admin/Editdelreq/?"+sParam,
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
                    str+="<label hidden for='orderId' class='form-label'>Order Id</label>";
                    str+="<input type='text'' value="+JSON.stringify(data.orderId)+" class='form-control' id='orderId' aria-describedby='moderatorId'hidden>";
                      
                    str+="</div>";
                    str+="<div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                    str+="<label for='send_For' class='form-label'>Date</label>";
                    str+="  <input type='text' value="+JSON.stringify(data.date)+"class='form-control' id='date' aria-describedby='date'readonly>";
                        
                    str+=" </div>";
                    str+=" <div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                    str+="   <label for='send_By' class='form-label'>Address</label>";
                    str+="  <input type='text' class='form-control'value="+JSON.stringify(data.address)+" id='addr' aria-describedby='address'readonly>";
                        
                    str+="</div>";
                    str+="<div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                    str+="<label for='Message' class='form-label'>District</label>";
                    str+="<input type='text'' value="+JSON.stringify(data.district)+" class='form-control' id='dis' aria-describedby='district'readonly>";
                      
                    str+="</div>";
                    str+="<div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                    str+="<label for='send_For' class='form-label'>Amount</label>";
                    str+=" <input type='text' value="+JSON.stringify(data.amount)+" class='form-control' id='amount' aria-describedby='amount'readonly>";
                        
                    str+=" </div>";

                    str+=" <div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                    str+="   <label for='send_By' class='form-label'>Payment Type</label>";
                    str+="  <input type='text' class='form-control'value="+JSON.stringify(data.payment_Type)+" id='payment_Type'readonly aria-describedby='payment_Type'>";
                        
                    str+="</div>";

                    str+=" <div class='mb-3'style='margin-left:10%;margin-right:10%'>";
                    str+="   <label for='customerId' class='form-label'>Customer Id</label>";
                    str+="  <input type='text' class='form-control'value="+JSON.stringify(data.customerId)+" id='customerId' aria-describedby='customerId'readonly>";
                        
                    str+="</div><div style ='text-align:center;color:red;'id='name'>"
                    str+=" <button style='color:white;background-color:#0099cc;margin-top;30px' onclick=deleveryManName("+JSON.stringify(data.district)+") id='updatesaldelbtn'class='btn  col-md-offset-2'>Load DeleveryMan</button>";
                    str+="<p  style ='color:red'>Click For Load Delevery Man Name</p></div>";
                    
               
                    $("#processDeliveryreq").html(str);
                    
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
function deleveryManName(add)
{
    //document.write(add);
    $.ajax({
         url:"http://localhost:2293//api/Admin/Finddelmanonadd?add="+add,
         headers:{
            "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
        },
         method:'GET',
         complete: function(xmlhttp,status){
             {
                
                 
                 if(xmlhttp.status==200)
                 {

                    

                     var data1=xmlhttp.responseJSON;
                    //document.write(data1[0].name)
                     
                     for(var i=0;i<data1.length;i++)
                     {
                  
                        $('#options').append(`<option value="${data1[i].delManId}">
                        ${data1[i].name}
                   </option>`);
                     }
                    
                     $("#name").text("Loaded")

                 }
                else if(xmlhttp.status==401)
                {
                    window.location="../../Views/Login/index"
                }
 
                 else $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
             }
         }
     
     });

}
function Accept()
{
    
    var id=$("#options").val();
    //document.write(id);
    if(id===""){
        
        $("#msg").text("Assign DeleveryMan before Submit")
        
    }
    else {
        var delmanid=$("#options").val();
        //document.write(delmanid)
        
$.ajax({
    url:"http://localhost:2293//api/Admin/Editdelreq/?DelManId="+delmanid,
    method:"POST",
    headers:{
        "Authorization":"Basic "+btoa(getCookie("Type")+":"+getCookie("userid")+":"+getCookie("pass"))
    },
    headers:"Content-Type:application/json",
    data:{
        "orderId":$("#orderId").val(),
        "date": $("#date").val(),
        "address": $("#addr").val(),
        "district":$("#dis").val(),
        "amount": $("#amount").val(),
        "payment_Type": $("#payment_Type").val(),
        "customerId": $("#customerId").val()

    },
    complete: function(xmlhttp,status){
        {
            
            if(xmlhttp.status==200)
            {
                window.location.replace('../../Views/Admin/OrderRequest.html') ;
                //$("#msg").html(xmlhttp.status+":"+xmlhttp.statusText)
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