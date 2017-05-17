var global_url = "http://ccsmygrade.com/ccsgiapp/functions.php";

var currentsem= "";





function getsubjectsection(data){
	subjectsection = data;
}

function getstudentname(data){
	studentname = data;
}

function getcurrentsem(data){
	//alert("test");
	currentsem = data;
}


$$(document).on('pageAfterAnimation','.page[data-page="studentsy"]',function(e){
	var studentprofile = JSON.parse(localStorage.getItem("studentprofile"));
	document.getElementById("student_name").innerHTML = studentprofile.fname+" "+studentprofile.lname;
})

$$(document).on('pageAfterAnimation','.page[data-page="teachersy"]',function(e){
	var teacherprofile = JSON.parse(localStorage.getItem("teacherprofile"));
	document.getElementById("teacher_name").innerHTML = teacherprofile.fname+" "+teacherprofile.lname;
})



$$(document).on('pageAfterAnimation','.page[data-page="chairmangrade"]',function(e){

	//document.getElementById("subject_section").innerHTML = subjectsection;
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


function teacherlogin(){
	
	 //myApp.showPreloader();
	 
	 var uname = document.getElementById("teacherusername").value;
     var pwd = document.getElementById("teacherpassword").value;
	
	$$.post(global_url, {action: 'teacherlogin',username: uname, password: pwd}, function (data,status) {
		var datas = JSON.parse(data);
		
		console.log(data);
		if(parseInt(data)==0){
			myApp.alert('Invalid Username or Password');
		}else{
			localStorage.setItem("teacherprofile",JSON.stringify(datas));
			var login = document.getElementById("teachersuccess");
			login.click();
		}
		
	},JSON);
	
	//myApp.hidePreloader();
}

function chairmanlogin(){
	
	//myApp.showPreloader();
	 
	 var uname = document.getElementById("chairmanusername").value;
     var pwd = document.getElementById("chairmanpassword").value;
	
	$$.post(global_url, {action: 'chairmanlogin',username: uname, password: pwd}, function (data,status) {
		var datas = JSON.parse(data);
		
		console.log(data);
		if(parseInt(data)==0){
			myApp.alert('Invalid Username or Password');
		}else{
			localStorage.setItem("chairmanprofile",JSON.stringify(datas));
			var login = document.getElementById("chairmansuccess");
			login.click();
		}
		
	},JSON);
	
	//myApp.hidePreloader();
}


function studentregister(){
	 
	 var sem = document.getElementById("registersemester").value;
	 var yr = document.getElementById("registeryear").value;
	 var sec = document.getElementById("registersection").value;
	 var id = document.getElementById("registeridnumber").value;
	 var fname = document.getElementById("registerfirstname").value;
	 var mid = document.getElementById("registermiddleinitial").value;
	 var lname = document.getElementById("registerlastname").value;
	 var uname = document.getElementById("registerusername").value;
	 var pwd = document.getElementById("registerpassword").value;
	 //var vcode = document.getElementById("studentvcode").value;
	
	$$.post(global_url, {action: 'registerstudent',semester: sem, year: yr, section: sec, idnumber: id, firstname: fname, middleinitial: mid, lastname: lname, username: uname, password: pwd}, function (data,status) {
		
		console.log(data);
		myApp.alert('<center><strong>Registration Successful!</strong><br>Please login with your <strong>Username</strong> and <strong>password</strong>.</center>');
		var register = document.getElementById("registerstudentsuccess");
		register.click();
		
	},JSON);
}


function showfirstsem(sem){
	currentsem = sem;
	$$(document).on('pageAfterAnimation','.page[data-page="studentsubj"]',function(e){
	
	document.getElementById("semester_title").innerHTML = currentsem;
	
		var studentprofile = JSON.parse(localStorage.getItem("studentprofile"));
		var studid = document.getElementById("student_id").value = studentprofile.sid;
		
		$$.post(global_url, {action: 'displaygradefirstsem', studentid: studid}, function (dat) {
			
			document.getElementById('displaygrade').innerHTML = "";
			console.log(dat);
			var datas = JSON.parse(dat);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
			
				$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-green">'+datas[i].grade+'</span></div></div></div></li>');
			}	
		},JSON);	
	})
}


function showsecondsem(sem){
	currentsem = sem;
	$$(document).on('pageAfterAnimation','.page[data-page="studentsubj"]',function(e){
	
	document.getElementById("semester_title").innerHTML = currentsem;
	
		var studentprofile = JSON.parse(localStorage.getItem("studentprofile"));
		var studid = document.getElementById("student_id").value = studentprofile.sid;
		
		$$.post(global_url, {action: 'displaygradesecondsem', studentid: studid}, function (dat) {
			
			document.getElementById('displaygrade').innerHTML = "";
			console.log(dat);
			var datas = JSON.parse(dat);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
			
				$$('#displaygrade').append('<li><div class="item-content"><div class="item-inner"><div class="item-title">'+datas[i].coursetitle+'</div><div class="item-after"> <span class="badge color-pink">'+datas[i].grade+'</span></div></div></div></li>');
			}	
		},JSON);	
	})
}


function teachershowfirstsem(sem){
	currentsem = sem;
	$$(document).on('pageAfterAnimation','.page[data-page="teachersubj"]',function(e){
	
	document.getElementById("semester_title").innerHTML = currentsem;
	
		var teacherprofile = JSON.parse(localStorage.getItem("teacherprofile"));
		var tid = document.getElementById("teacher_id").value = teacherprofile.teacherid;
		
		$$.post(global_url, {action: 'displaysubjfirstsem', teacherid: tid}, function (data) {
			
			document.getElementById('displaysubj').innerHTML = "";
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
			
				$$('#displaysubj').append('<li class="accordion-item"><a href="#" class="item-link item-content item-divider"><div class="item-inner"><div class="item-title"><strong><b>'+datas[i].coursetitle+'</b></strong></div></div></a><div class="accordion-item-content"><div class="list-block"><ul><li><a href="pages/teachersearch.html" class="item-link item-content item-inner item-title">1-A</a></li><li><a href="pages/teachersearch.html" class="item-link item-content item-inner item-title">1-B</a></li><br></ul></div></div></li>');
			}	
		},JSON);	
	})
}



function teachershowsecondsem(sem){
	currentsem = sem;
	$$(document).on('pageAfterAnimation','.page[data-page="teachersubj"]',function(e){
	
	document.getElementById("semester_title").innerHTML = currentsem;
	
		var teacherprofile = JSON.parse(localStorage.getItem("teacherprofile"));
		var tid = document.getElementById("teacher_id").value = teacherprofile.teacherid;
		
		$$.post(global_url, {action: 'displaysubjsecondsem', teacherid: tid}, function (data) {
			
			document.getElementById('displaysubj').innerHTML = "";
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
			
				$$('#displaysubj').append('<li class="accordion-item"><a href="#" class="item-link item-content item-divider"><div class="item-inner"><div class="item-title"><strong><b>'+datas[i].coursetitle+'</b></strong></div></div></a><div class="accordion-item-content"><div class="list-block"><ul><li><a href="pages/teachersearch.html" class="item-link item-content item-inner item-title">1-A</a></li><li><a href="pages/teachersearch.html" class="item-link item-content item-inner item-title">1-B</a></li><br></ul></div></div></li>');
			}	
		},JSON);	
	})
}




$$(document).on('pageAfterAnimation','.page[data-page="chairmansearch"]',function(e){
	document.getElementById('displayteachers').innerHTML = "";
	
	$$.post(global_url, {action: 'displayteachers'}, function (data,status) {
		
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		
		for(var i = 0; i<datas.length; i++){
		
			$$('#displayteachers').append('<li><a href="pages/chairmanteacher.html" class="item-link item-content item-inner item-title" onclick="viewteachersubjects('+datas[i].teacherid+');">'+datas[i].fname+' '+datas[i].lname+'</a></li>');
		}
	},JSON);
	
})


function viewteachersubjects(id){
	//var teacherfname = first;
	//var teacherlname = last;
	//var tid = id;
	
	$$(document).on('pageAfterAnimation','.page[data-page="chairmanteacher"]',function(e){
	
	//myApp.alert(first);
	//myApp.alert(last);
	//myApp.alert(id);
	
	//document.getElementById("teacher_name").value = teacherfname+" "+teacherlname;
	document.getElementById("teacher_id").value = id;
	
		$$.post(global_url, {action: 'displayteachersubjects', teacherid: id}, function (data) {
			
			document.getElementById('displaysubjects').innerHTML = "";
			document.getElementById('teacher_name').innerHTML = "";
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
			
				$$('#displaysubjects').append('<li class="accordion-item"><a href="#" class="item-link item-content"><div class="item-inner"><div class="item-title"><strong><b>'+datas[i].coursetitle+'</b></strong></div></div></a><div class="accordion-item-content"><div class="list-block"><ul><li><div class="item-content item-divider"><div class="item-inner"><div class="item-title">1st Semester</div></div></div></li><li><a href="pages/chairmangrade.html" class="item-link item-content item-inner item-title" onclick="getsubjectsection();">1-A</a></li><br><li><div class="item-content item-divider"><div class="item-inner"><div class="item-title">2nd Semester</div></div></div></li><li><a href="pages/chairmangrade.html" class="item-link item-content item-inner item-title" onclick="getsubjectsection();">1-A</a></li><br></ul></div></div></li>');
				
				$$('#teacher_name').append(''+datas[i].fname+''+datas[i].lname+'')
			}	
			
		},JSON);
	
	})
}

























































