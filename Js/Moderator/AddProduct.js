$(document).ready(function(){

	var type=getCookie("Type");
    if(type!='Moderator' || getCookie("userid")==null)
    {
        window.location='../../Views/Login/index.html'
    }
    else{

   if (window.File && window.FileReader && window.FileList && window.Blob) {
      document.getElementById('file').addEventListener('change', handleFileSelect, false);
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
    
    function handleFileSelect(evt) {
      var f = evt.target.files[0]; // FileList object
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          var binaryData = e.target.result;
          //Converting Binary Data to base 64
          var base64String = window.btoa(binaryData);
          //showing file converted to base64
          document.getElementById('picture').value = base64String;
          alert($('#picture').val())
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsBinaryString(f);
    }


    $.ajax({
		url:"http://localhost:2293/api/moderator/getallcategory",
		complete:function(xmlHttp,status){
			if(xmlHttp.status==200){
				var str='';
				var data=xmlHttp.responseJSON;
				for(var i=0; i<data.length; i++){
					str+="<option value="+data[i].categoryId+">"+data[i].categoryName+"</option>"
				}	
				$("#category select").html(str);
			}else{
				alert(xmlHttp.statusText);
			}
		}
	});


   $("#but_upload").click(function(){
		$.ajax({
			url:"http://localhost:2293/api/moderator/addproduct",
			method:"POST",
			headers:"Content-Type:application/json",
			data:
			{
				"productName": $("#productName").val(),
				"description": $("#description").val(),
				"categoryId": $("#categoryId").val(),
				"buying_Price": $("#buying_Price").val(),
				"selling_Price": $("#selling_Price").val(),
				"quantity": $("#quantity").val(),
				"picture": $("#picture").val(),
			},
			complete:function(xmlHttp,status){
				if(xmlHttp.status==201){
					window.location.replace("EditProduct.html");
				}else{
               alert("error");
					$('#error').removeAttr('hidden');
					$("#error").html("Plese Input Properly");
				}
			}
		});

	});

}
});


$(function () {
   $(":file").change(function () {
       if (this.files && this.files[0]) {
           var reader = new FileReader();

           reader.onload = imageIsLoaded;
           reader.readAsDataURL(this.files[0]);
       }
   });
});

function imageIsLoaded(e) {
   $('#img').attr('src', e.target.result);
   $('#yourImage').attr('src', e.target.result);
};


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
