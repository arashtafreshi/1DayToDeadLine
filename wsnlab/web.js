
var GroupID=0;
$(".MotesGroup").click(function(){
	GroupID = $(this).attr("data-groupID");
	$("#selectedGroupContainer").text($(this).text());
	//alert("GroupID : "+GroupID);
});

$("#bigImgCon").css("background-color","#E6E6E6");
$("body").css("background-color","#E9EDF5");

// when Group image clicked
$("#img1").click(function(){
	$("#bigImgCon").slideToggle("slow");
	$(".btnselector").toggleClass("disabled");

	// setting the position of motes on image
		setCoord("bigimg1" , 1 , 0.11 , 0.23 , 0.27 , 0.75);
		setCoord("bigimg1" , 2 , 0.44 , 0.23 , 0.59 , 0.77);
		setCoord("bigimg1" , 3 , 0.73 , 0.26 , 0.87 , 0.78);
});

// activates when button clicked
$(".btnselector").click(function(){
	if (!($(this).hasClass("disabled"))) {
		$("#modalHeadreText").text($(this).text()+":");

		// in case "Flash" clicked
		if ($(this).text()=="Flash" ){
			$(".modalBody").html("\
				<form id='upload' method='post' action='upload.php' enctype='multipart/form-data'>\
		            <div id='drop'>\
		                Drop Here\
		                <a>Browse</a>\
		                <input type='file' name='upl' multiple />\
		            </div>\
		            <ul>\
		                <!-- The file uploads will be shown here -->\
		            </ul>\
		        </form>\
			");

			//$.post("php/insert.php" , {"ActivityID":4 , "GroupID":3 , "JobDate":"03.12.13" , "JobID":5 , "MoteID":1 , "UserID":3});

			
			
			// Insert job to the DB
			$("tr.SelectedMote").each(function(){
				var MoteID = $(this).attr("data-MoteID");
				var currentTime = new Date();
				var JsonToSend = {
					"DBTable":"job" ,
					"ActivityID":1 ,
					"GroupID":GroupID ,
					"JobDate":currentTime ,
					"JobID":1 ,
					"MoteID":MoteID ,
				"UserID":3};
				InsertToDB(JsonToSend);
				
			});


			// The uploader: Directly added from its website


			var ul = $('#upload ul');

		    $('#drop a').click(function(){
		        // Simulate a click on the file input button
		        // to show the file browser dialog
		        $(this).parent().find('input').click();
		    });

		    // Initialize the jQuery File Upload plugin
		    $('#upload').fileupload({

		        // This element will accept file drag/drop uploading
		        dropZone: $('#drop'),

		        // This function is called when a file is added to the queue;
		        // either via the browse button, or via drag/drop:
		        add: function (e, data) {

		            var tpl = $('<li class="working"><input type="text" value="0" data-width="48" data-height="48"'+
		                ' data-fgColor="#0788a5" data-readOnly="1" data-bgColor="#3e4043" /><p></p><span></span></li>');

		            // Append the file name and file size
		            tpl.find('p').text(data.files[0].name)
		                         .append('<i>' + formatFileSize(data.files[0].size) + '</i>');

		            // Add the HTML to the UL element
		            data.context = tpl.appendTo(ul);

		            // Initialize the knob plugin
		            tpl.find('input').knob();

		            // Listen for clicks on the cancel icon
		            tpl.find('span').click(function(){

		                if(tpl.hasClass('working')){
		                    jqXHR.abort();
		                }

		                tpl.fadeOut(function(){
		                    tpl.remove();
		                });

		            });

		            // Automatically upload the file once it is added to the queue
		            var jqXHR = data.submit();
		        },

		        progress: function(e, data){

		            // Calculate the completion percentage of the upload
		            var progress = parseInt(data.loaded / data.total * 100, 10);

		            // Update the hidden input field and trigger a change
		            // so that the jQuery knob plugin knows to update the dial
		            data.context.find('input').val(progress).change();

		            if(progress == 100){
		                data.context.removeClass('working');
		            }
		        },

		        fail:function(e, data){
		            // Something has gone wrong!
		            data.context.addClass('error');
		        }

		    });

		    // Prevent the default action when a file is dropped on the window
		    $(document).on('drop dragover', function (e) {
		        e.preventDefault();
		    });

		    // Helper function that formats the file sizes
		    function formatFileSize(bytes) {
		        if (typeof bytes !== 'number') {
		            return '';
		        }

		        if (bytes >= 1000000000) {
		            return (bytes / 1000000000).toFixed(2) + ' GB';
		        }

		        if (bytes >= 1000000) {
		            return (bytes / 1000000).toFixed(2) + ' MB';
		        }

		        return (bytes / 1000).toFixed(2) + ' KB';
		    }
			
		}


		else if ($(this).text()=="Start SF" ) {
			$(".modalBody").html("");
			// Insert job into DB
			$("tr.SelectedMote").each(function(){
				var MoteID = $(this).attr("data-MoteID");
				var MoteName = $(this).attr("data-MoteName");
				var currentTime = new Date();
				var JsonToSend = {
					"DBTable":"job" ,
					"ActivityID":2 ,
				  	"GroupID":GroupID ,
				   	"JobDate":currentTime ,
				    "JobID":2 ,
			     	"MoteID":MoteID ,
				"UserID":3};
				InsertToDB(JsonToSend);
				$(".modalBody").append("\
					<p> "+MoteName+" ("+MoteID+"):</p>\
		    	<div class='progress progress-striped active'>\
		    		<div class='bar' style='width:5%;'></div>\
				");
			});
		}


		else if ($(this).text()=="Stop SF" ) {
			$(".modalBody").html("");
			// Insert job into DB
			$("tr.SelectedMote").each(function(){
				var MoteID = $(this).attr("data-MoteID");
				var MoteName = $(this).attr("data-MoteName");
				var currentTime = new Date();
				var JsonToSend = {
					"DBTable":"job" ,
					"ActivityID":3 ,
				  	"GroupID":GroupID ,
				   	"JobDate":currentTime ,
				    "JobID":2 ,
			     	"MoteID":MoteID ,
				"UserID":3};
				InsertToDB(JsonToSend);
				$(".modalBody").append("\
					<p> "+MoteName+" ("+MoteID+"):</p>\
		    	<div class='progress progress-striped active'>\
		    		<div class='bar' style='width:5%;'></div>\
				");
			});
		}


		// in case "Neighbors Graph" clicked
		else if ($(this).text()=="Neighbors Graph" ) {
			$(".modalBody").html("\
				<label>Transmission Power</label>\
				<input id='amount' type='text' class='span1' value='45'>\
				<div id='slider-range-max'></div><hr>\
				<p>The result shown is the result of last update.</p>\
				<button class='btn' onclick='updateGraph();'>Update Graph</button>\
				<canvas id='viewport' width='500' height='300'></canvas>\
			");

			// slider 
			$(function() {
				$( "#slider-range-max" ).slider({
				  range: "max",
				  min: 1,
				  max: 31,
				  step: 3,
				  value: 31,
				  slide: function( event, ui ) {
					$( "#amount" ).val( ui.value );
				  }
				});
				$( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
			});

			// Graph
			var sys = arbor.ParticleSystem(1000, 400,1);
			sys.parameters({gravity:true});
			sys.renderer = Renderer("#viewport") ;
			var n_1 = sys.addNode('Amy',{'color':'red','shape':'dot','label':'Amy'});
			var n_2 = sys.addNode('Stuart',{'color':'blue','shape':'dot','label':'Stuart'});
			var n_3 = sys.addNode('Barry',{'color':'green','shape':'dot','label':'Barry'});
			drawTest(sys , n_2 , n_3);
			drawTest(sys , n_1 , n_2);
			drawTest(sys , n_1 , n_3);
		}
		

		else if ($(this).text()=="Serial Forwarder" ) {
			
			$(".modalBody").html("\
				<p style='color:red'><Blink>Check Red Leds on Motes</Blink></p>\
		    	<p>If they are Blinking everything is file with Serial Forwarding in your system</p>\
		    		<div class='bar' style='width:40%;'></div>\
		    	</div><hr>\
			");

			// Insert job into DB
			$("tr.SelectedMote").each(function(){
				var MoteID = $(this).attr("data-MoteID");
				var currentTime = new Date();
				var JsonToSend = {
					"DBTable":"job" ,
					"ActivityID":5 ,
				  	"GroupID":GroupID ,
				   	"JobDate":currentTime ,
				    "JobID":5 ,
			     	"MoteID":MoteID ,
				"UserID":3};
				InsertToDB(JsonToSend);
				
			});


		}

		else if ($(this).text()=="Send Beacon" ) {
			
			$(".modalBody").html("\
				<p style='color:blue'><Blink>Check Blue Leds on Motes</Blink></p>\
		    	<p>If they are Blinking everything is file with BeaconSend in your system</p>\
		    		<div class='bar' style='width:40%;'></div>\
		    	</div><hr>\
			");
			
			// Insert job into DB
			$("tr.SelectedMote").each(function(){
				var MoteID = $(this).attr("data-MoteID");
				var currentTime = new Date();
				var JsonToSend = {
					"DBTable":"job" ,
					"ActivityID":4 ,
				  	"GroupID":GroupID ,
				   	"JobDate":currentTime ,
				    "JobID":5 ,
			     	"MoteID":MoteID ,
				"UserID":3};
				InsertToDB(JsonToSend);
				
			});
		}

		else if ($(this).text()=="Temperature" ) {
				
			$(".modalBody").html("\
				<table class='table table-condensed'>\
					<thead class='well'>\
						<tr>\
							<th>ID</th>\
							<th>Name</th>\
							<th>Group ID</th>\
							<th>Temperature</th>\
						</tr>\
					</thead>\
					<tbody id='tblBody'>\
						<tr class='success' data-MoteID='0' data-MoteName='Amy'>\
							<td>0</td>\
							<td>Amy</td>\
							<td>1</td>\
							<td>25 C</td>\
						</tr>\
						<tr class='success' data-MoteID='1' data-MoteName='Stuart'>\
							<td>1</td>\
							<td>Stuart</td>\
							<td>1</td>\
							<td>25 C</td>\
						</tr>\
						<tr class='success' data-MoteID='2' data-MoteName='Barry'>\
							<td>2</td>\
							<td>Barry</td>\
							<td>1</td>\
							<td>25 C</td>\
						</tr>\
					</tbody>\
				</table>\
		    		<div class='bar' style='width:40%;'></div>\
		    	</div><hr>\
			");
			
			// Insert job into DB
			$("tr.SelectedMote").each(function(){
				var MoteID = $(this).attr("data-MoteID");
				var currentTime = new Date();
				var JsonToSend = {
					"DBTable":"job" ,
					"ActivityID":4 ,
				  	"GroupID":GroupID ,
				   	"JobDate":currentTime ,
				    "JobID":5 ,
			     	"MoteID":MoteID ,
				"UserID":3};
				InsertToDB(JsonToSend);
				
			});
		}

		else  {
			//$(".modalBody").html("<p>Empty</p>");

			$.post("php/insert.php" );
			$(".modalBody").html("\
				<p>Amy (0):</p>\
		    	<div class='progress progress-striped active'>\
		    		<div class='bar' style='width:40%;'></div>\
		    	</div><hr>\
		    		<p>Stuart (1):</p>\
		    	<div class='progress progress-striped active'>\
		    		<div class='bar' style='width:15%;'></div>\
		    	</div><hr>\
		    		<p>Barry (3):</p>\
		    	<div class='progress progress-striped active'>\
		    		<div class='bar bar-danger' style='width:67%;'></div>\
		    	</div><hr>\
			");
			
		}

		// show modal anyway
		$("#modalTest").modal("toggle");
		
	};
});



// When area on image clicked, then toggle its existence
$(".area").click("click",function(){
	var i = $(this).attr("data-IDtoToggle");
	$(".mote"+i).toggleClass("hide");
	$(".mote"+i).toggleClass("SelectedMote");
});
	

$("#btnlogin").click(function(){
	$.post("php/select.php" , function(data){
		var a =jQuery.parseJSON(data);
		if ( ($("#user").val()==a.UN) && ($("#pass").val()==a.UP))  {
			//alert("Welcome");
			//$("#btnlogin").attr("href","Home.html");
			$("#error").toggle("slow");
			window.location.href="Home.html";
		}
		else{
			
			// body...
			$("#error").show("slow");
			
		};
	});
});

function InsertToDB(JsonString) {
	$.post("php/insert.php" , JsonString);
}



// Event: after corousel image changed do:
$("#myCarousel").on("slid",function(e){
	var index = $("#myCarousel .active").index();

	if (index == 0){
		setCoord("bigimg1" , 1 , 0.11 , 0.23 , 0.27 , 0.75);
		setCoord("bigimg1" , 2 , 0.44 , 0.23 , 0.59 , 0.77);
		setCoord("bigimg1" , 3 , 0.73 , 0.26 , 0.87 , 0.78);
	}
	else if (index == 1) {
		setCoord("bigimg2" , 1 , 0.2 , 0.11 , 0.43 , 0.85);
		setCoord("bigimg2" , 2 , 0.53 , 0.27 , 0.65 , 0.76);
		setCoord("bigimg2" , 3 , 0.7 , 0.37 , 0.78 , 0.73);
	} 
	else if (index == 2){
		setCoord("bigimg3" , 1 , 0.15 , 0.30 , 0.23 , 0.64);
		setCoord("bigimg3" , 2, 0.32 , 0.27 , 0.45 , 0.73);
		setCoord("bigimg3" , 3 , 0.61 , 0.14 , 0.82 , 0.83);
	}
});

// setting area coordinates for selecting/deselecting motes
// patter:    (Id of the image , MoteID , x_coord of top-left , y_coor of top-left , x_coord of bottom-right , y_coord of bottom-right) 
// ****************  coord values are ratio  **************************
function setCoord(imgID , id , rx1 , ry1 , rx2 , ry2) {
	var h = $("#"+imgID).height();
	var w = $("#"+imgID).width();

	var p1h = ry1 * h;
	var p1w = rx1 * w;
	var p2h = ry2 * h;
	var p2w = rx2 * w;

	$("#area"+id).attr("coords",p1w+","+p1h+","+p2w+","+p2h);
}


$("#btnDeselectAll").on("click",function(){
	$(".SelectedMote").toggleClass("hide SelectedMote");
});

$("#btnSelectAll").on("click",function(){
	$("tr.hide").toggleClass("hide SelectedMote");
});

function updateGraph(){
	// Insert job into DB
	$("tr.SelectedMote").each(function(){
		var MoteID = $(this).attr("data-MoteID");
		var currentTime = new Date();
		var JsonToSend = {
			"DBTable":"job" ,
			"ActivityID":4 ,
			"GroupID":GroupID ,
			"JobDate":currentTime ,
			"JobID":4 ,
			"MoteID":MoteID ,
		"UserID":3};
		//InsertToDB(JsonToSend);
	});
	var timeoutID;
	//timeoutID = window.setTimeout(retriveData(),5000);
	
		


		var JsonToSend = {
			"DBTable":"neighbor" ,
			"GroupID":1 
			};

		$.post("php/select.php" ,JsonToSend ,  function(data){
		var a =jQuery.parseJSON(data);

		//alert(a.length);
		//alert(a[1].GroupID);

			var sys = arbor.ParticleSystem(1000, 400,1);
			sys.parameters({gravity:true});
			sys.renderer = Renderer("#viewport") ;
			var n_1 = sys.addNode('Amy',{'color':'red','shape':'dot','label':'Amy'});
			var n_2 = sys.addNode('Stuart',{'color':'blue','shape':'dot','label':'Stuart'});
			var n_3 = sys.addNode('Barry',{'color':'green','shape':'dot','label':'Barry'});

		for (var i = a.length - 1; i >= 0; i--) {
			//drawGraph(a[i].SourceID , a[i].DestID);
			var S_name = "n_"+a[i].SourceID;
			var D_name = "n_"+ a[i].DestID;
			//alert(S_name)
			//sys.addEdge(s,d);
			drawTest(sys,S_name,D_name);
		};
	});
}

function drawTest(sys , s , d){
	sys.pruneEdge(s,d);
	sys.addEdge(s,d);
}

function graph(){
	var sys = arbor.ParticleSystem(1000, 400,1);
	sys.parameters({gravity:true});
	sys.renderer = Renderer("#viewport") ;
	var n_1 = sys.addNode('Amy',{'color':'red','shape':'dot','label':'Amy'});
	var n_2 = sys.addNode('Stuart',{'color':'blue','shape':'dot','label':'Stuart'});
	var n_3 = sys.addNode('Barry',{'color':'green','shape':'dot','label':'Barry'});

	drawTest(sys , n_2 , n_3);
	drawTest(sys , n_1 , n_2);
	drawTest(sys , n_1 , n_3);
}








//**************************************************************************************************************************************************


(function($){

  var Renderer = function(canvas){
    var canvas = $(canvas).get(0)
    var ctx = canvas.getContext("2d");
    var particleSystem

    var that = {
      init:function(system){
        //
        // the particle system will call the init function once, right before the
        // first frame is to be drawn. it's a good place to set up the canvas and
        // to pass the canvas size to the particle system
        //
        // save a reference to the particle system for use in the .redraw() loop
        particleSystem = system

        // inform the system of the screen dimensions so it can map coords for us.
        // if the canvas is ever resized, screenSize should be called again with
        // the new dimensions
        particleSystem.screenSize(canvas.width, canvas.height) 
        particleSystem.screenPadding(80) // leave an extra 80px of whitespace per side
        
        // set up some event handlers to allow for node-dragging
        that.initMouseHandling()
      },
      
      redraw:function(){
        // 
        // redraw will be called repeatedly during the run whenever the node positions
        // change. the new positions for the nodes can be accessed by looking at the
        // .p attribute of a given node. however the p.x & p.y values are in the coordinates
        // of the particle system rather than the screen. you can either map them to
        // the screen yourself, or use the convenience iterators .eachNode (and .eachEdge)
        // which allow you to step through the actual node objects but also pass an
        // x,y point in the screen's coordinate system
        // 
        ctx.fillStyle = "white"
        ctx.fillRect(0,0, canvas.width, canvas.height)
        
        particleSystem.eachEdge(function(edge, pt1, pt2){
          // edge: {source:Node, target:Node, length:#, data:{}}
          // pt1:  {x:#, y:#}  source position in screen coords
          // pt2:  {x:#, y:#}  target position in screen coords

          // draw a line from pt1 to pt2
          ctx.strokeStyle = "rgba(0,0,0, .333)"
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(pt1.x, pt1.y)
          ctx.lineTo(pt2.x, pt2.y)
          ctx.stroke()
        })

        particleSystem.eachNode(function(node, pt){
          // node: {mass:#, p:{x,y}, name:"", data:{}}
          // pt:   {x:#, y:#}  node position in screen coords

          // draw a rectangle centered at pt
          var w = 10
          ctx.fillStyle = (node.data.alone) ? "orange" : "black"
          ctx.fillRect(pt.x-w/2, pt.y-w/2, w,w)
        })    			
      },
      
      initMouseHandling:function(){
        // no-nonsense drag and drop (thanks springy.js)
        var dragged = null;

        // set up a handler object that will initially listen for mousedowns then
        // for moves and mouseups while dragging
        var handler = {
          clicked:function(e){
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            dragged = particleSystem.nearest(_mouseP);

            if (dragged && dragged.node !== null){
              // while we're dragging, don't let physics move the node
              dragged.node.fixed = true
            }

            $(canvas).bind('mousemove', handler.dragged)
            $(window).bind('mouseup', handler.dropped)

            return false
          },
          dragged:function(e){
            var pos = $(canvas).offset();
            var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

            if (dragged && dragged.node !== null){
              var p = particleSystem.fromScreen(s)
              dragged.node.p = p
            }

            return false
          },

          dropped:function(e){
            if (dragged===null || dragged.node===undefined) return
            if (dragged.node !== null) dragged.node.fixed = false
            dragged.node.tempMass = 1000
            dragged = null
            $(canvas).unbind('mousemove', handler.dragged)
            $(window).unbind('mouseup', handler.dropped)
            _mouseP = null
            return false
          }
        }
        
        // start listening
        $(canvas).mousedown(handler.clicked);

      },
      
    }
    return that
  }  