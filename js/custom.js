var global_url = "http://ccsmygrade.com/ccsgiapp/functions.php";

var currentsem= "";

function getsubjectsection(data){
	subjectsection = data;
}

function getcurrentsem(data){
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

$$(document).on('pageAfterAnimation','.page[data-page="teachersubj"]',function(e){
	document.getElementById("semester_title").innerHTML = currentsem;
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


function studentpreregister(){

	 var id = document.getElementById("registeridnumber").value;
	
	$$.post(global_url, {action: 'registerfindid', idnumber: id}, function (data) {
		
		document.getElementById('register_form').innerHTML = "";
		console.log(data);
		
		if (data == 1){
		$$('#register_form').append('<div class="list-block"><ul>'+
			'<li><div class="item-content item-inner item-title item-divider"><center>Registeration Form</center></div></li>'+
			'<li><div class="item-content"><div class="item-inner">'+
				  '<div class="item-title floating-label">Username</div>'+
				  '<div class="item-input"><input type="text" id="registerusername" placeholder=""/></div>'+
			'</div></div></li>'+
			'<li><div class="item-content"><div class="item-inner">'+
				  '<div class="item-title floating-label">Password</div>'+
				  '<div class="item-input"><input type="password" id="registerpassword" placeholder=""/></div>'+
			'</div></div></li>'+
		'</ul></div>'+
		'<div class="content-block"><p class="buttons-row">'+
			'<a href="#" class="button button-raised back link">Discard</a>'+
			'<a href="index.html" id="registerstudentsuccess" style="display:none;">success</a>'+
			'<a onclick="registerusernamepassword();" class="button button-raised button-fill color-pink">Register</a>'+
		'</p></div>');
		}else{
		myApp.alert('<center class="color-deeporange"><strong>Access Denied</strong><br>Either you are not registered in the web app version or an account with this ID Number already exists in the system.<center>');
		}
		
	},JSON);
}

function registerusernamepassword(){
	
	var sid = document.getElementById("registeridnumber").value;
	var suname = document.getElementById("registerusername").value;
	var spass = document.getElementById("registerpassword").value;
	
	if(sid == "" || suname == "" || spass == ""){
	myApp.alert('<center><strong>Please fill all inputs</strong></center>');
	}else{
	
	$$.post(global_url, {action: 'registerusernamepassword', studentid: sid, username: suname, password: spass}, function (data) {
		
		console.log(data);
		
			myApp.alert('<center><strong>Registration Successful!</strong><br>Please login with your <strong>Username</strong> and <strong>password</strong>.</center>');
			var register = document.getElementById("registerstudentsuccess");
			register.click();
		
	},JSON);
	}
	
}
















$$(document).on('pageAfterAnimation','.page[data-page="studentsy"]',function(e){
	
	document.getElementById('displaysy').innerHTML=""; 
	var studname = document.getElementById('student_name'); 
	
	var studentprofile = JSON.parse(localStorage.getItem("studentprofile"));
	var stid = studentprofile.studentID;
	
	$$.post(global_url, {action: 'displaysy'}, function (data,status) {
		
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		
		for(var i = 0; i<datas.length; i++){
			
			//var varsy = datas[i].sy;
			//var schooly = JSON.stringify(varsy);
			//alert(schooly);
			
			$$('#displaysy').append("<li><a href='pages/studentsubjnew.html' class='item-link item-content item-inner item-title' onclick='showgradesnew(\""+datas[i].sy +"\");'>SY "+datas[i].sy+"</a></li>");
		}
	},JSON);
	
})

function showgradesnew(schooly){
	
	$$(document).on('pageAfterAnimation','.page[data-page="studentsubjnew"]',function(e){
	
	document.getElementById('syinput').value = "";
	document.getElementById('syinput').value = schooly;
	var schy = document.getElementById('syinput').value;
	
	var studentprofile = JSON.parse(localStorage.getItem("studentprofile"));
	document.getElementById('student_namenew').innerHTML = studentprofile.fname+" "+studentprofile.lname;
	
	var stid = studentprofile.studentID;
	
		 $$.post(global_url, {action: 'displaygrades', studentid: stid, schoolyear: schy}, function (data) {
			
			document.getElementById('displaygradefirstsem').innerHTML = "";
			document.getElementById('displaygradesecondsem').innerHTML = "";
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){

				if (datas[i].semester == 1){
					//$$('#displaygradefirstsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-pink">'+datas[i].grade+'</a></div></li>');
					
					
					if(datas[i].grade == 1.00 || datas[i].grade == 1.25 || datas[i].grade == 1.50 || datas[i].grade ==  1.75){
						$$('#displaygradefirstsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-green">'+datas[i].grade+'</a></div></li>');
					}else if(datas[i].grade == 2.00 || datas[i].grade == 2.25 || datas[i].grade == 2.50 || datas[i].grade == 2.75){
						$$('#displaygradefirstsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-blue">'+datas[i].grade+'</a></div></li>');
					}else if(datas[i].grade == 3.00){
						$$('#displaygradefirstsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-orange">'+datas[i].grade+'</a></div></li>');
					}else if(datas[i].grade == 5.00){
						$$('#displaygradefirstsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-red">'+datas[i].grade+'</a></div></li>');
					}else if(datas[i].grade == "INC"){
						$$('#displaygradefirstsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-pink">'+datas[i].grade+'</a></div></li>');
					}else if(datas[i].grade == "0"){
						$$('#displaygradefirstsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-pink">'+datas[i].grade+'</a></div></li>');
					}else{
						$$('#displaygradefirstsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-pink">0</a></div></li>');
					}
					
				}else if (datas[i].semester == 2){
					//$$('#displaygradesecondsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-pink">'+datas[i].grade+'</a></div></li>');
					
					if(datas[i].grade == 1.00 || datas[i].grade == 1.25 || datas[i].grade == 1.50 || datas[i].grade ==  1.75){
						$$('#displaygradesecondsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-green">'+datas[i].grade+'</a></div></li>');
					}else if(datas[i].grade == 2.00 || datas[i].grade == 2.25 || datas[i].grade == 2.50 || datas[i].grade == 2.75){
						$$('#displaygradesecondsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-blue">'+datas[i].grade+'</a></div></li>');
					}else if(datas[i].grade == 3.00){
						$$('#displaygradesecondsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-orange">'+datas[i].grade+'</a></div></li>');
					}else if(datas[i].grade == 5.00){
						$$('#displaygradesecondsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-red">'+datas[i].grade+'</a></div></li>');
					}else if(datas[i].grade == "INC"){
						$$('#displaygradesecondsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-pink">'+datas[i].grade+'</a></div></li>');
					}else if(datas[i].grade == "0"){
						$$('#displaygradesecondsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-pink">'+datas[i].grade+'</a></div></li>');
					}else{
						$$('#displaygradesecondsem').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title-row"><div class="item-title text-black">'+datas[i].coursetitle+'</div></div><div class="item-text">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="demo-mark bg-pink">0</a></div></li>');
					}
					
				}else if (datas[i].semester == ''){
					$$('#displaygradefirstsem').append('<div class="content-block-title">No final grade yet</div>');
					
					$$('#displaygradesecondsem').append('<div class="content-block-title">No final grade yet</div>');
					
				} else{}
			}	
		},JSON);	
	})
}










$$(document).on('pageAfterAnimation','.page[data-page="teachersy"]',function(e){
	
	document.getElementById('displaysy').innerHTML=""; 
	
	$$.post(global_url, {action: 'displaysy'}, function (data,status) {
		
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		
		for(var i = 0; i<datas.length; i++){

			$$('#displaysy').append('<li><a href="pages/teachersubjnew.html" class="item-link item-content item-inner item-title" onclick="showteachersubjnew(\''+datas[i].sy +'\');">SY '+datas[i].sy+'</a></li>');

		}
	},JSON);
	
})


function showteachersubjnew(sy){
	
	$$(document).on('pageAfterAnimation','.page[data-page="teachersubjnew"]',function(e){
	
	document.getElementById('syinputteacher').value = "";
	document.getElementById('syinputteacher').value = sy;
	var schy = document.getElementById('syinputteacher').value;
	
	var teacherprofile = JSON.parse(localStorage.getItem("teacherprofile"));
	document.getElementById('teacher_namenew').innerHTML = teacherprofile.fname+" "+teacherprofile.lname;
	
	var teacherid = teacherprofile.teacherid;
	
		 $$.post(global_url, {action: 'displaysubjectsnew', tid: teacherid, sy: schy}, function (data) {
			
			document.getElementById('displaysubjfirstsem').innerHTML = "";
			document.getElementById('displaysubjsecondsem').innerHTML = "";
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){

				if (datas[i].semester == 1){
				
					$$('#displaysubjfirstsem').append('<li class="accordion-item"><a href="#" class="item-link item-content"><div class="item-inner"><div class="item-title"><center><strong><b>'+datas[i].coursetitle+'</b></strong><center></div></div></a><div class="accordion-item-content"><div class="list-block"><ul><li><a onclick="teacherallstudents('+datas[i].courseid+',1);" href="pages/addstudent.html" class="item-link item-content item-inner item-title">Add Students to Subject</a></li><li><a onclick="teacherallstudentssection('+datas[i].courseid+',1);" href="pages/addstudentyear.html" class="item-link item-content item-inner item-title">Add Students to Subject by Section</a></li><li><a onclick="teacherremoveenrolled('+datas[i].courseid+');" href="pages/removestudents.html" class="item-link item-content item-inner item-title">Remove Students</a></li><li><a onclick="teachershowenrolled('+datas[i].courseid+');" href="pages/enrolledstudents.html" class="item-link item-content item-inner item-title">Student Grades</a></li></ul></div></div></li>');
				}else{
					
					$$('#displaysubjsecondsem').append('<li class="accordion-item"><a href="#" class="item-link item-content item-divider"><div class="item-inner"><div class="item-title"><strong><b>'+datas[i].coursetitle+'</b></strong></div></div></a><div class="accordion-item-content"><div class="list-block"><ul><li><a onclick="teacherallstudents('+datas[i].courseid+',1);" href="pages/addstudent.html" class="item-link item-content item-inner item-title">Add Students to Subject</a></li><li><a onclick="teacherallstudentssection('+datas[i].courseid+',1);" href="pages/addstudentyear.html" class="item-link item-content item-inner item-title">Add Students to Subject by Section</a></li><li><a onclick="teacherremoveenrolled('+datas[i].courseid+');" href="pages/removestudents.html" class="item-link item-content item-inner item-title">Remove Students</a></li><li><a onclick="teachershowenrolled('+datas[i].courseid+');" href="pages/enrolledstudents.html" class="item-link item-content item-inner item-title">Student Grades</a></li></ul></div></div></li>');
				}
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
				$$('#displaysubj').append('<li class="accordion-item"><a href="#" class="item-link item-content item-divider"><div class="item-inner"><div class="item-title"><strong><b>'+datas[i].coursetitle+'</b></strong></div></div></a><div class="accordion-item-content"><div class="list-block"><ul><li><a onclick="teacherallstudents('+datas[i].courseid+',1);" href="pages/addstudent.html" class="item-link item-content item-inner item-title">Add Students to Subject</a></li><li><a onclick="teacherallstudentssection('+datas[i].courseid+',1);" href="pages/addstudentyear.html" class="item-link item-content item-inner item-title">Add Students to Subject by Section</a></li><li><a onclick="teacherremoveenrolled('+datas[i].courseid+');" href="pages/removestudents.html" class="item-link item-content item-inner item-title">Remove Students</a></li><li><a onclick="teachershowenrolled('+datas[i].courseid+');" href="pages/enrolledstudents.html" class="item-link item-content item-inner item-title">Student Grades</a></li></ul></div></div></li>');
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
				$$('#displaysubj').append('<li class="accordion-item"><a href="#" class="item-link item-content item-divider"><div class="item-inner"><div class="item-title"><strong><b>'+datas[i].coursetitle+'</b></strong></div></div></a><div class="accordion-item-content"><div class="list-block"><ul><li><a onclick="teacherallstudents('+datas[i].courseid+',2);" href="pages/addstudent.html" class="item-link item-content item-inner item-title">Add Students to Subject</a></li><li><a onclick="teacherallstudentssection('+datas[i].courseid+',2);" href="pages/addstudentyear.html" class="item-link item-content item-inner item-title">Add Students to Subject by Section</a></li><li><a onclick="teacherremoveenrolled('+datas[i].courseid+');" href="pages/removestudents.html" class="item-link item-content item-inner item-title">Remove Students</a></li><li><a onclick="teachershowenrolled('+datas[i].courseid+');" href="pages/enrolledstudents.html" class="item-link item-content item-inner item-title">Student Grades</a></li></ul></div></div></li>');
			}	
		},JSON);	
	})
}

function teacherallstudents(courseid,sem){
$$(document).on('pageAfterAnimation','.page[data-page="addstudent"]',function(e){
	$$.post(global_url, {action: 'displayallstudents', semester: sem}, function (data,status) {
		
		document.getElementById('displaystudents').innerHTML="";
		
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		
		for(var i = 0; i<datas.length; i++){
			$$('#displaystudents').append('<li><a href="#" onclick="addstudent('+datas[i].studentID+','+courseid+');" class="item-link item-content item-title item-inner">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</a></li>');
		}


	},JSON);

})
}

function addstudent(studentid,subjid){
	
	var teacherprof = localStorage.getItem("teacherprofile");
	var teacher = JSON.parse(teacherprof);
	var tid = teacher.teacherid;
	
	myApp.confirm('Add this student to the subject?', function () {
		
		$$.post(global_url, {action: 'enrollstudent',teachid: tid, studid: studentid, subid: subjid}, function (data,status) {
			
			console.log(data);
			myApp.alert('Successfully added!');
			
		},JSON);
        
    });
	
}

function teacherallstudentssection(cid,sem){

	$$(document).on('pageAfterAnimation','.page[data-page="addstudentyear"]',function(e){
		document.getElementById("input_cid").value = cid;
		document.getElementById("input_sem").value = sem;
	})

}


function addyearandsection(){
	
	var teacherprofile = JSON.parse(localStorage.getItem("teacherprofile"));
	var tid = document.getElementById("teacher_id").value = teacherprofile.teacherid;

	var yr = document.getElementById("enrollyear").value;
	var sec = document.getElementById("enrollsection").value;

	var cid = document.getElementById("input_cid").value
	var sem = document.getElementById("input_sem").value
	myApp.confirm('Enroll this year and section to the subject?', function () {
		
		$$.post(global_url, {action: 'enrollyearsection', teacherid: tid, year: yr, section: sec, courseid: cid, semester: sem}, function (data) {
			
			console.log(data);
			myApp.alert('Year and Section<br>Successfully Enrolled!');
			
		},JSON);
        
    });

}


function teachershowenrolled(courseid){
$$(document).on('pageAfterAnimation','.page[data-page="enrolledstudents"]',function(e){
	
	var teacherprofile = JSON.parse(localStorage.getItem("teacherprofile"));
	var teacherid = teacherprofile.teacherid;
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd='0'+dd
	} 
	if(mm<10) {
		mm='0'+mm
	} 
	today = yyyy+'-'+mm+'-'+dd;
	
	$$.post(global_url, {action: 'displayenrolled', sub: courseid, tid: teacherid}, function (data,status) {
		
		document.getElementById('displayenrolled').innerHTML="";
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		
		for(var i = 0; i<datas.length; i++){
			
			
			if(datas[i].deadlinedate <= today){
				
				document.getElementById('displaydeadline').innerHTML = "You met your deadline";
				
				if(datas[i].grade == 1.00 || datas[i].grade == 1.25 || datas[i].grade == 1.50 || datas[i].grade ==  1.75){
				$$('#displayenrolled').append('<li><a href="#" class="item-link item-content item-inner item-title" disabled>('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-green">'+datas[i].grade+'</span></div></a></li>');
				}else if(datas[i].grade == 2.00 || datas[i].grade == 2.25 || datas[i].grade == 2.50 || datas[i].grade == 2.75){
				$$('#displayenrolled').append('<li><a href="#" class="item-link item-content item-inner item-title" disabled>('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-blue">'+datas[i].grade+'</span></div></a></li>');
				}else if(datas[i].grade == 3.00){
				$$('#displayenrolled').append('<li><a href="#" class="item-link item-content item-inner item-title" disabled>('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-orange">'+datas[i].grade+'</span></div></a></li>');
				}else if(datas[i].grade == 5.00){
				$$('#displayenrolled').append('<li><a href="#" class="item-link item-content item-inner item-title" disabled>('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-red">'+datas[i].grade+'</span></div></a></li>');
				}else if(datas[i].grade == "INC"){
				$$('#displayenrolled').append('<li><a href="#" class="item-link item-content item-inner item-title" disabled>('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge">'+datas[i].grade+'</span></div></a></li>');
				}else if(datas[i].grade == "0"){
				$$('#displayenrolled').append('<li><a href="#" class="item-link item-content item-inner item-title" disabled>('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-pink">'+datas[i].grade+'</span></div></a></li>');
				}else{
				$$('#displayenrolled').append('<li><a href="#" class="item-link item-content item-inner item-title" disabled>('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-pink">0</span></div></a></li>');}
			}else{
				document.getElementById('displaydeadline').innerHTML = "You can edit or input grade until the deadline.";
				
				if(datas[i].grade == 1.00 || datas[i].grade == 1.25 || datas[i].grade == 1.50 || datas[i].grade ==  1.75){
				$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-green">'+datas[i].grade+'</span></div></a></li>');
				}else if(datas[i].grade == 2.00 || datas[i].grade == 2.25 || datas[i].grade == 2.50 || datas[i].grade == 2.75){
				$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-blue">'+datas[i].grade+'</span></div></a></li>');
				}else if(datas[i].grade == 3.00){
				$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-orange">'+datas[i].grade+'</span></div></a></li>');
				}else if(datas[i].grade == 5.00){
				$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-red">'+datas[i].grade+'</span></div></a></li>');
				}else if(datas[i].grade == "INC"){
				$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge">'+datas[i].grade+'</span></div></a></li>');
				}else if(datas[i].grade == "0"){
				$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-pink">'+datas[i].grade+'</span></div></a></li>');
				}else{
				$$('#displayenrolled').append('<li><a href="pages/editgrade.html" onclick="shownameoneditgrade('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-pink">0</span></div></a></li>');
				}
			}
			
			
			
			
		}
	},JSON);
})
}

function teacherremoveenrolled(courseid){
$$(document).on('pageAfterAnimation','.page[data-page="removestudents"]',function(e){

	$$.post(global_url, {action: 'displayenrolled', sub: courseid}, function (data,status) {
		
		document.getElementById('displayenrolled').innerHTML="";
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		
		for(var i = 0; i<datas.length; i++){
			$$('#displayenrolled').append('<li><a href="#" onclick="removestudent('+datas[i].studentID+');" class="item-link item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</a></li>');	
		}
	},JSON);
})
}

function removestudent(studentid){

	myApp.confirm('Remove this student from this subject?', function () {
		
		$$.post(global_url, {action: 'removestudent', studid: studentid}, function (data,status) {
			
			console.log(data);
			myApp.alert('<center><strong>Successfully removed</strong></center>');
			
		},JSON);
        
    });

}

function shownameoneditgrade(studid){
	$$(document).on('pageAfterAnimation','.page[data-page="editgrade"]',function(e){
		
		$$.post(global_url, {action: 'showstudentnameonedit', studentid: studid}, function (data,status) {
			
			document.getElementById('student_name').innerHTML="";
			document.getElementById('edit_action').innerHTML="";
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
				$$('#student_name').append(''+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'');
				$$('#edit_action').append('<p class="buttons-row"><a href="#" class="button back">Discard</a><a href="#" onclick="updatefinalgrade('+datas[i].studentID+')" class="button button-fill color-pink">Save</a><a href="#" class="back" id="editsuccess" style="display:none;">success</a></p>');
			}
		},JSON);
	
	})
}

function updatefinalgrade(studentid){
	
	var grade = document.getElementById("gradeinput").value;
	
	$$.post(global_url, {action: 'updatefinalgrade',finalgrade: grade, studid: studentid}, function (data) {
		
		console.log(data);
		//var datas = JSON.parse(data);
		//console.log(datas);
		myApp.alert('<center><strong>Final Grade<br>Successfully Updated</strong></center>');
		var success = document.getElementById("editsuccess");
		success.click();
		
	},JSON);
	
}



























$$(document).on('pageAfterAnimation','.page[data-page="chairmansearch"]',function(e){
	document.getElementById('displayteachers').innerHTML = "";
	
	$$.post(global_url, {action: 'displayteachers'}, function (data,status) {
		
		console.log(data);
		var datas = JSON.parse(data);
		console.log(datas);
		
		for(var i = 0; i<datas.length; i++){
		
			$$('#displayteachers').append('<li><a href="pages/chairmanteacher.html" class="item-link item-content item-inner item-title" onclick="viewteachersubjects('+datas[i].teacherid+');">'+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'</a></li>');
		}
	},JSON);
	
})


function viewteachersubjects(id){
	
	$$(document).on('pageAfterAnimation','.page[data-page="chairmanteacher"]',function(e){
	
	document.getElementById("teacher_id").value = id;
	
		$$.post(global_url, {action: 'displayteachersubjects', teacherid: id}, function (data) {
			
			document.getElementById('displaysubjects').innerHTML = "";
			document.getElementById('teacher_name').innerHTML = "";
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
				$$('#teacher_name').append(''+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<br>')
			
				$$('#displaysubjects').append('<li><a href="pages/sectionstudents.html" class="item-link item-content item-inner item-title" onclick="displaysectionstudents('+datas[i].courseid+','+id+');"><strong><b>'+datas[i].coursetitle+'</b></strong></a></li>');
			}	
			
		},JSON);
	
	})
}


function displaysectionstudents(cid, tid){
	$$(document).on('pageAfterAnimation','.page[data-page="sectionstudents"]',function(e){		
		
		$$.post(global_url, {action: 'displaysectionstudents', courseid: cid, teacherid: tid}, function (data) {
		
		document.getElementById('display_sectionstudents').innerHTML=""; 
			console.log(data);
			var datas = JSON.parse(data);
			console.log(datas);
			
			for(var i = 0; i<datas.length; i++){
			
			if(datas[i].grade == 1.00 || datas[i].grade == 1.25 || datas[i].grade == 1.50 || datas[i].grade ==  1.75){
				$$('#display_sectionstudents').append('<li><div class="item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-green">'+datas[i].grade+'</span></div></div></li>');
			}else if(datas[i].grade == 2.00 || datas[i].grade == 2.25 || datas[i].grade == 2.50 || datas[i].grade == 2.75){
				$$('#display_sectionstudents').append('<li><div class="item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-blue">'+datas[i].grade+'</span></div></div></li>');
			}else if(datas[i].grade == 3.00){
				$$('#display_sectionstudents').append('<li><div class="item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-orange">'+datas[i].grade+'</span></div></div></li>');
			}else if(datas[i].grade == 5.00){
				$$('#display_sectionstudents').append('<li><div class="item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-red">'+datas[i].grade+'</span></div></div></li>');
			}else if(datas[i].grade == "INC"){
				$$('#display_sectionstudents').append('<li><div class="item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge">'+datas[i].grade+'</span></div></div></li>');
			}else if(datas[i].grade == "0"){
				$$('#display_sectionstudents').append('<li><div class="item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-pink">'+datas[i].grade+'</span></div></div></li>');
			}else{
				$$('#display_sectionstudents').append('<li><div class="item-content item-inner item-title">('+datas[i].section+') '+datas[i].fname+' '+datas[i].mi+' '+datas[i].lname+'<div class="item-after"><span class="badge color-pink">0</span></div></div></li>');
			}
			
			
		}
		
		},JSON);
	})
}





























function studentrenewinfo(){
	
	var studentprof = localStorage.getItem("studentprofile");
	var student = JSON.parse(studentprof);
	var sid = student.studentID;
	
	var firstname = document.getElementById("fnameinput").value;
	var lastname = document.getElementById("lnameinput").value;
	var middlei = document.getElementById("miinput").value;
	var suname = document.getElementById("usernameinput").value;
	var spassword = document.getElementById("passwordinput").value;
	
	$$.post(global_url, {action: 'studentrenewinfo',studentid: sid, fname: firstname, lname: lastname, mi: middlei, username: suname, password: spassword}, function (data) {
		
		console.log(data);
		myApp.alert('<center><strong>Account Successfully<br>Updated</strong></center>');
		
	},JSON);
	
}

function studentsetting(){

	$$(document).on('pageAfterAnimation','.page[data-page="studentsetting"]',function(e){

	var studentprof = localStorage.getItem("studentprofile");
	var student = JSON.parse(studentprof);
	var sid = student.studentID;
	
	var fname = student.fname;
	var lname = student.lname;
	var mi = student.mi;
	var suname = student.username;
	var spassword = student.pass;
	
	document.getElementById("fnameinput").value = fname;
	document.getElementById("lnameinput").value = lname;
	document.getElementById("miinput").value = mi;
	document.getElementById("usernameinput").value = suname;
	document.getElementById("passwordinput").value = spassword;
    
    })
}



function teacherrenewinfo(){
	
	var teacherprof = localStorage.getItem("teacherprofile");
	var teacher = JSON.parse(teacherprof);
	var teacherid = teacher.teacherid;
	
	var firstname = document.getElementById("fnameinput").value;
	var lastname = document.getElementById("lnameinput").value;
	var middlei = document.getElementById("miinput").value;
	var tuname = document.getElementById("usernameinput").value;
	var tpassword = document.getElementById("passwordinput").value;
	
	$$.post(global_url, {action: 'teacherrenewinfo',tid: teacherid, fname: firstname, lname: lastname, mi: middlei, username: tuname, password: tpassword}, function (data) {
		
		console.log(data);
		myApp.alert('<center><strong>Account Successfully<br>Updated</strong></center>');
		
	},JSON);
	
}

function teachersetting(){

	$$(document).on('pageAfterAnimation','.page[data-page="teachersetting"]',function(e){

	var teacherprof = localStorage.getItem("teacherprofile");
	var teacher = JSON.parse(teacherprof);
	var teacherid = teacher.teacherid;
	
	var fname = teacher.fname;
	var lname = teacher.lname;
	var mi = teacher.mi;
	var tuname = teacher.username;
	var tpassword = teacher.pass; 
	
	document.getElementById("fnameinput").value = fname;
	document.getElementById("lnameinput").value = lname;
	document.getElementById("miinput").value = mi;
	document.getElementById("usernameinput").value = tuname;
	document.getElementById("passwordinput").value = tpassword;
    
    })
}


function chairmanrenewinfo(){
	
	var chairmanprof = localStorage.getItem("chairmanprofile");
	var chairman = JSON.parse(chairmanprof);
	var chairmanid = chairman.userid;
	
	var fname = document.getElementById("fnameinput").value;
	var lname = document.getElementById("lnameinput").value;
	var cuname = document.getElementById("usernameinput").value;
	var cpassword = document.getElementById("passwordinput").value;
	
	$$.post(global_url, {action: 'chairmanrenewinfo',cid: chairmanid, firstname: fname, lastname: lname, username: cuname, password: cpassword}, function (data) {
		
		console.log(data);
		myApp.alert('<center><strong>Account Successfully<br>Updated</strong></center>');
		
	},JSON);
	
}

function chairmansetting(){

	$$(document).on('pageAfterAnimation','.page[data-page="chairmansetting"]',function(e){

	var chairmanprof = localStorage.getItem("chairmanprofile");
	var chairman = JSON.parse(chairmanprof);
	var chairmanid = chairman.userid;

	var fname = chairman.firstname;
	var lname = chairman.lastname;
	var cuname = chairman.username;
	var cpassword = chairman.pass; 

	document.getElementById("fnameinput").value = fname;
	document.getElementById("lnameinput").value = lname;
	document.getElementById("usernameinput").value = cuname;
	document.getElementById("passwordinput").value = cpassword;
    
    })
}








































































//<li class="accordion-item"><a href="#" class="item-link item-content item-divider"><div class="item-inner"><div class="item-title"><strong><b>'+datas[i].coursetitle+'</b></strong></div></div></a><div class="accordion-item-content"><div class="list-block"><ul><li><a onclick="teacherallstudents('+datas[i].courseid+',1);" href="pages/addstudent.html" class="item-link item-content item-inner item-title">Add Students to Subject</a></li><li><a onclick="teacherallstudentssection('+datas[i].courseid+',1);" href="pages/addstudentyear.html" class="item-link item-content item-inner item-title">Add Students to Subject by Section</a></li><li><a onclick="teacherremoveenrolled('+datas[i].courseid+');" href="pages/removestudents.html" class="item-link item-content item-inner item-title">Remove Students</a></li><li><a onclick="teachershowenrolled('+datas[i].courseid+');" href="pages/enrolledstudents.html" class="item-link item-content item-inner item-title">Student Grades</a></li></ul></div></div></li>
