var global_url = "http://ccsmygrade.com/ccsgiapp/functions.php";

var currentsem= "";

function getcurrentsem(data){
	//alert("test");
	currentsem = data;
}

function getteachername(data){
	//alert("test");
	teachername = data;
}

function getsubjectsection(data){
	//alert("test");
	subjectsection = data;
}

function getstudentname(data){
	//alert("test");
	studentname = data;
}


$$(document).on('pageAfterAnimation','.page[data-page="studentsy"]',function(e){
	//document.getElementById("sy_title").innerHTML = "test";
	//alert("test");
})

$$(document).on('pageAfterAnimation','.page[data-page="studentsubj"]',function(e){

	document.getElementById("semester_title").innerHTML = currentsem;
	//alert("test");
})

$$(document).on('pageAfterAnimation','.page[data-page="chairmanteacher"]',function(e){

	document.getElementById("teacher_name").innerHTML = teachername;
	//alert("test");
})

$$(document).on('pageAfterAnimation','.page[data-page="chairmangrade"]',function(e){

	document.getElementById("subject_section").innerHTML = subjectsection;
	//alert("test");
})

$$(document).on('pageAfterAnimation','.page[data-page="teachersearch"]',function(e){

	document.getElementById("subject_section").innerHTML = subjectsection;
	//alert("test");
})

$$(document).on('pageAfterAnimation','.page[data-page="teachersubj"]',function(e){

	document.getElementById("semester_title").innerHTML = currentsem;
	//alert("test");
})

$$(document).on('pageAfterAnimation','.page[data-page="editgrade"]',function(e){

	document.getElementById("student_name").innerHTML = studentname;
	//alert("test");
})

$$(document).on('pageAfterAnimation','.page[data-page="studenthome"]',function(e){
	var studentprofile = JSON.parse(localStorage.getItem("studentprofile"));
	document.getElementById("student_name").innerHTML = studentprofile.name;
	//alert("test");
})

$$(document).on('pageAfterAnimation','.page[data-page="parenthome"]',function(e){
	var parentprofile = JSON.parse(localStorage.getItem("parentprofile"));
	document.getElementById("parent_name").innerHTML = parentprofile.parentname;
	//alert("test");
})

function studentlogin(){
	
	//myApp.showPreloader();
	 
	 var uname = document.getElementById("studentusername").value;
     var pwd = document.getElementById("studentpassword").value;
	
	$$.post(global_url, {action: 'studentlogin',username: uname, password: pwd}, function (data,status) {
		var datas = JSON.parse(data);
		
		console.log(data);
		if(parseInt(data)==0){
			myApp.alert('Invalid Username or Password');
		}else{
			localStorage.setItem("studentprofile",JSON.stringify(datas));
			var login = document.getElementById("studentsuccess");
			login.click();

		}
		
	},JSON);
	
	//myApp.hidePreloader();
}








