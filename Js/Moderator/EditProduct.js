
$(document).ready(function(){

    var type=getCookie("Type");
    if(type!='Moderator' || getCookie("userid")==null)
    {
        window.location='../../Views/Login/index.html'
    }
    else{

    $.ajax({
        url:"http://localhost:2293/api/moderator/GetAllProduct",
        complete:function(xmlHttp,status){
            if(xmlHttp.status==200){
                var str='';
                var data=xmlHttp.responseJSON;
                for(var i=0; i<data.length; i++){
                    str+="<tr id=deleted"+data[i].product.productId+"><td>"+data[i].product.productId+"</td>"
                    str+="<td>"+data[i].product.productName+"</td>"
                    str+="<td>"+data[i].product.productName+"</td>"
                    str+="<td>"+data[i].category.categoryName+"</td>"
                    str+="<td>"+data[i].product.buying_Price+"</td>"
                    str+="<td>"+data[i].product.selling_Price+"</td>"
                    str+="<td id=quantity"+data[i].product.productId+">"+data[i].product.quantity+"</td>"
                    str+="<td><div class='gallery'><a target='_blank' href='img_5terre.jpg'><img width='400' height='250' src='data:image/<jpg>;base64,"+data[i].product.picture+"'></a></div></td>"
                    str+="<td><button id='Product' class='btn btn-primary' onclick=EditProduct("+data[i].product.productId+","+data[i].category.categoryId+")>Edit</button> | ";
                    //str+="<a class='btn btn-info' href='#'>Details</a> | ";
                    str+=" <button id='delete"+data[i].product.productId+"' class='btn btn-warning'onclick='remove("+data[i].product.productId+")'>Delete</button> |"
                    if(data[i].product.quantity>0){
                        str+=" <button id='stock"+data[i].product.productId+"' class='btn btn-success' onclick='stock("+data[i].product.productId+")'>Stock</button></td>";
                    }else{
                        str+=" <button id='stock"+data[i].product.productId+"' class='btn btn-dark' onclick='stock("+data[i].product.productId+")'>Stock Out</button></td></tr>";
                    }
                    
                    str+="<tr  id='confirm"+data[i].product.productId+"' hidden><td><i class='fa fa-trash' aria-hidden='true'></i></td>"
                    str+="<td>Are</td>"
                    str+="<td>You</td>"
                    str+="<td>Sure</td>"
                    str+="<td>Want To</td>"
                    str+="<td>Delete</td>"
                    str+="<td>This</td>"
                    str+="<td>Product("+data[i].product.productName+")</td>"
                    str+="<td><button id='YES' class='btn btn-danger' onclick=YES("+data[i].product.productId+")>YES</button> | ";
                    str+=" <button id='NO' class='btn btn-info' onclick='NO("+data[i].product.productId+")'>NO</button></tr>"


                }	
                $("#Products tbody").html(str);
            }else{
                alert(xmlHttp.statusText);
            }
        }
    });
    }
})

function YES(ProductId){
    $.ajax({
        url:`http://localhost:2293/api/moderator/deleteProduct/${ProductId}`,
        method:"DELETE",
        headers:"Content-Type:application/json",
        complete:function(xmlHttp,status){
            if(xmlHttp.status==204)
            {
                $(`#confirm${ProductId}`).remove();
                $(`#deleted${ProductId}`).remove();
            }
            else
            {
                alert("NO");
            }
        }
    });
}

function NO(ProductId){
    $(`#confirm${ProductId}`).attr('hidden',true);
}


function EditProduct(ProductId, CategoryId){

    window.location = '../../Views/Moderator/EditPro.html?ProductId='+ProductId+'&CategoryId='+CategoryId;

}

function remove(ProductId){
    $(`#confirm${ProductId}`).removeAttr('hidden');
}

function stock(ProductId){
    $.ajax({
    url:`http://localhost:2293/api/moderator/StockProduct/${ProductId}`,
    method:"PUT",
    headers:"Content-Type:application/json",
    complete:function(xmlHttp,status){
        if(xmlHttp.status==200)
        {
            data=xmlHttp.responseJSON;
            if(data.quantity<0){
                $(`#stock${ProductId}`).html("Stock Out");
                $(`#stock${ProductId}`).removeClass("btn btn-success");
                $(`#stock${ProductId}`).addClass("btn btn-dark");
                $(`#quantity${ProductId}`).html(data.quantity);

            }else{
                $(`#stock${ProductId}`).html("Stock");
                $(`#stock${ProductId}`).removeClass("btn btn-dark");
                $(`#stock${ProductId}`).addClass("btn btn-success");
                $(`#quantity${ProductId}`).html(data.quantity);
            }
            
        }
        else
        {
            alert("NO");
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