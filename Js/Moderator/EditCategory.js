$(document).ready(function(){

    var type=getCookie("Type");
    if(type!='Moderator' || getCookie("userid")==null)
    {
        window.location='../../Views/Login/index.html'
    }
    else{
        $.ajax({
            url:"http://localhost:2293/api/moderator/getallcategory",
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var str='';
                    var data=xmlHttp.responseJSON;
                    for(var i=0; i<data.length; i++){
                        str+="<tr id='row"+data[i].categoryId+"'><td id='category"+data[i].categoryId+"'>"+data[i].categoryId+"</td>"
                        str+="<td id='catName"+data[i].categoryId+"'>"+data[i].categoryName+"</td>"
                        str+="<td><button id='EditCat' class='btn btn-primary' onclick='Edit("+JSON.stringify(data[i].categoryId)+")'>Edit</button> | "
                        str+="<button id='delete"+data[i].categoryId+"' class='btn btn-danger'onclick='deletes("+JSON.stringify(data[i].categoryId)+")'>Delete</button></td>"
                        str+="<tr id='editOption"+data[i].categoryId+"' hidden>"
                        str+="<td><i class='fas fa-fw fa-wrench'></i></td>"
                        str+="<td><input class='form-control' type='text' size='3' id='categoryName"+JSON.stringify(data[i].categoryId)+"' name='categoryName' value='"+data[i].categoryName+"'></td>"
                        str+="<td><button class='btn btn-success' onclick='edited("+JSON.stringify(data[i].categoryId)+")'>Confirm</button> |"
                        str+=" <button class='btn btn-info' onclick='no1("+JSON.stringify(data[i].categoryId)+")'>NO</button></td></tr>"
                        str+="<tr id='confirm"+data[i].categoryId+"' hidden>"
                        str+="<td><i class='fa fa-trash' aria-hidden='true'></i></td>"
                        str+="<td>You sure?</td>"
                        str+="<td><button class='btn btn-warning' onclick='yes("+JSON.stringify(data[i].categoryId)+")'>YES</button> |"
                        str+=" <button class='btn btn-info' onclick='no("+JSON.stringify(data[i].categoryId)+")'>NO</button></td></tr>"
                    }	
                    $("#Categories tbody").html(str);
                }else{
                    alert(xmlHttp.statusText);
                }
            }
        });
    }

});

function Edit(CategoryId){
    $(`#editOption${CategoryId}`).removeAttr('hidden');
}

function deletes(CategoryId){
    //alert(CategoryId);
    $(`#confirm${CategoryId}`).removeAttr('hidden');
}

function edited(CategoryId){
    $.ajax({
        url:`http://localhost:2293/api/moderator/editcategory/${CategoryId}`,
        method:"PUT",
        headers:"Content-Type:application/json",
        data:{
            "catehoryId": CategoryId,
            "categoryName": $("#categoryName"+CategoryId).val(),
        },
        complete:function(xmlHttp,status){
            if(xmlHttp.status==200)
            {
                $(`#catName${CategoryId}`).html(xmlHttp.responseJSON.categoryName);
                $(`#editOption${CategoryId}`).attr('hidden',true);
            }
            else
            {
                alert("NO");
            }
        }
    });
}

function yes(CategoryId){
    $.ajax({
        url:`http://localhost:2293/api/moderator/deletecategory/${CategoryId}`,
        method:"DELETE",
        headers:"Content-Type:application/json",
        complete:function(xmlHttp,status){
            if(xmlHttp.status==204)
            {
                $(`#confirm${CategoryId}`).remove();
                $(`#editOption${CategoryId}`).remove();
                $(`#row${CategoryId}`).remove();
                $(`#category${CategoryId}`).remove();
            }
            else
            {
                alert("NO");
            }
        }
    });
}

function no(CategoryId){
    $(`#confirm${CategoryId}`).attr('hidden',true);
}

function no1(CategoryId){
    $(`#editOption${CategoryId}`).attr('hidden',true);
}

function EditDelMan(UserId)
{   
    window.location = '../../Views/Moderator/EditDelMan.html?UserId='+UserId;
}

// function yes(UserId)
// {   
//     window.location = '../../Views/Moderator/EditDelMan.html?UserId='+UserId;
// }

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