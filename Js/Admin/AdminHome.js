$(document).ready(function(){
    var type=getCookie("Type");
    if(type!='Admin')
    {
        window.location='../../Views/Login/index.html'
    }
    else{
        $.ajax({
            url:"http://localhost:2293//api/Useres/GetUsers",
            headers:{
                "Authorization":"Basic "+btoa("Admin:111")
            },
            complete: function(xmlhttp,status){
                {
                    
                    if(xmlhttp.status==200)
                    {
                        var str='';
                        var blockeduser=0
                        var pending=0
                        var Admin=0
                        var customer=0
                        var moderator=0
                        var Deleveryman=0
                        var data=xmlhttp.responseJSON;
                        for(var i=0;i<data.length;i++)
                        {
                            if(data[i].type=="Admin")
                            {
                                Admin=Admin+1;
                            }
                            else if(data[i].type=="Moderator")
                            {
                                moderator=moderator+1;
                            }
                            else if(data[i].type=="Customer")
                            {
                                customer=customer+1;
                            }
                            else
                            {
                                Deleveryman=Deleveryman+1;
                            }
                            if(data[i].status=="Invalid"){
                                blockeduser=blockeduser+1
                            }
                            else if(data[i].status=="Processing"){
                                pending=pending+1
                            }
                        }
                        
                            var PieChartData =
                            {
                                labels: ["Admin", "Moderator", "DeleveryMan", "Customer", "Blocked", "Pending_Sign_Up(Delevery Man)"],
                                datasets: [{
                                label: 'User Detail Chart',
                                backgroundColor: [
                                    "#f990a7",
                                    "#aad2ed",
                                    "#9966FF",
                                    "#99e5e5",
                                    "#f7bd83",
                                ],
                                borderWidth: 2,
                                //data: [3,2,34,4,6,1]
                                    data: [Admin,moderator,Deleveryman,customer,blockeduser,pending]
                                }]
                        };

                            var ctx1 = document.getElementById("Piecanvas").getContext("2d");
                            window.myBar = new Chart(ctx1,
                                {
                                    type: 'pie',
                                    data: PieChartData,
                                    options:
                                    {
                                        title:
                                        {
                                            display: true,
                                            text: "User Lists"
                                        },
                                        responsive: true,
                                        maintainAspectRatio: true
                                    }
                                });
                        }

                else if(xmlhttp.status==401){

                    document.write(xmlhttp.status)
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