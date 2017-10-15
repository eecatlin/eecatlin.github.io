// Offset for Site Navigation
$('#siteNav').affix({
	offset: {
		top: 100
	}
})

//Barcelona writing translation function
function displayTranslation() {
	if ($('.english-version').css('display') =='none') {
		$('.english-version').show();
		$('.spanish-version').hide();
		$('#translationTxt').text('Show original');
	} else {
		$('.english-version').hide();
		$('.spanish-version').show();
		$('#translationTxt').text('View english translation');
	}
}

//Translation timer
function toggleTranslation() {
	if ($('#spanish-version').css('display') =='block') {
		$('#english-version').fadeIn(5000);
		$('#spanish-version').fadeOut(5000);
	} else if ($('#english-version').css('display') =='block') {
		$('#middle-version-1').fadeIn(5000);
		$('#english-version').fadeOut(5000);
	} else if ($('#middle-version-1').css('display') =='block') {
		$('#middle-version-2').fadeIn(5000);
		$('#middle-version-1').fadeOut(5000);
	} else {
		$('#spanish-version').fadeIn(5000);
		$('#middle-version-2').fadeOut(5000);
	}
}

var current_keepcalm = 1;

//Concrete poem toggler
function toggleConcrete() {
	var rand = Math.floor(Math.random()*12+1);
	$('#'+String(current_keepcalm)).fadeOut(1000);
	$('#'+String(rand)).fadeIn(1000);
	current_keepcalm = rand;
}

//Debugme piece
function printToTerminal(text, delay) {
	setTimeout(function(){$('#terminal-window').append(text)}, delay);
}

function printEmpty(timeDelay, count) {
	var i = 0;
	while (i < count) {
		printToTerminal("<br/>", timeDelay+i*100);
		i++;
	}
}

function clearScreen(timeDelay, count) {
	var i = 0;
	while (i < count) {
		printToTerminal("<br/>", timeDelay);
		i++;
	}
}

function printLogline(message, delay){
	var date = new Date();
	var dateString = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"."+date.getMilliseconds();
	printToTerminal(dateString + " " + message, delay);
}

function getNextMeal() {
	var time = new Date();
	if (time.getHours() < 9) {
		return "breakfast";
	}
	if (time.getHours() < 10) {
		return "brunch";
	}	
	if (time.hour < 13) {
		return "lunch";
	}	
	if (time.hour < 21) {
		return "dinner";
	}	
	return "coffee";
}

function tellTheStory(timeDelay, name, age) {
	var human2 = "56x4E8673"
	var human3 = "33x2D7F26"
	printLogline("[Human:" + name + " sent message to Human:"+ human2 +"] Hey<br/>", timeDelay);
	timeDelay+= 3000;
	printLogline("[Human:"+ name + " received message from Human:"+human2+"] what's up?<br/>", timeDelay);
	timeDelay+= 4000; 
	// printRandVariant(variants, 0, name)
	timeDelay+=2000;
	printLogline("[Human:"+name+" sent message to Human:"+human2+"] Want to grab "+getNextMeal()+"?<br/>", timeDelay);
	timeDelay+=5000;
	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate()+1);
	printLogline("[Human:"+name+" received message from Human:"+human2+"] I already ate. Maybe "+tomorrow.toDateString().split(" ")[0]+"<br/>", timeDelay);
	timeDelay+=1000;
	printLogline("[Human:"+name+" sent message to Human:"+human2+"] like tomorrow?<br/>", timeDelay);
	timeDelay+=7000;
	printEmpty(timeDelay, 10)
	// printRandVariant(variants, 10, name)
	timeDelay+=2000;
	printEmpty(timeDelay, 10)
	printLogline("[Human:"+name+" MIND] Breathe.<br/>", timeDelay);
	// breathThread.updatePause(2.5)
	// heartThread.updatePause(.75)
	timeDelay+=5000;
	printLogline("[Human:"+name+" MIND] tomorrow or next week?<br/>", timeDelay);
	timeDelay+=5000;
	var i = 0
	while (i < 5) {
		printLogline("[Human:"+name+" MIND] tomorrow or next week?<br/>", timeDelay);
		timeDelay+=2000;
		i += 1;
	}
	timeDelay+= 2000;
	printLogline("[Human:"+name+" MIND] if only yesterday.<br/>", timeDelay);
	timeDelay+= 2000;
	// printLogline("[ENVIRON] %s" % (getRandomEnviron()))
	timeDelay+= 2000;
	// printLogline("[Human:"+name+" MIND] %s" % (fileReader("Exclamations.txt")))
	timeDelay+=1000;
	printLogline("[Human:"+name+" NUTRITION] consumed: 1 apple<br/>", timeDelay);
	// breathThread.updatePause(1.5)
	// heartThread.updatePause(.5)
	timeDelay+=2000;
	// printVariant(variants[1], -10, name)
	timeDelay+=2000;
	var i = 0;
	while (i < 10) {
		printLogline("[Human:"+name+" sent message to Human:"+human3+"] do you have time to talk?<br/>", timeDelay);
		timeDelay+=8000/(i+1);
		i += 1
	}
		
	// printLogline("[ENVIRON] %s" % (getRandomEnviron()))
	timeDelay+=2000;
	// environVar = getRandomEnviron()
	// if not environVar.endswith("y"):
	// 	environVar += "y"
	// printLogline("[Human:%s sent message to Human:%s] it's %s" % (name, human3, environVar))
	timeDelay+=2000;
	// randomSpewings(3, name)
	timeDelay+=2000;
	printLogline("[Human:"+name+" MIND] Stop.<br/>", timeDelay);
	// breathThread.updatePause(.7)
	// heartThread.updatePause(.2)
	// printVarLoop(200, .01, variants, name)
	timeDelay+=2000;
	printLogline("[Human:"+name+" sent message to Human:"+human3+"] can you hear me?<br/>", timeDelay);
	timeDelay+=2000;
	printLogline("[Human:"+name+" sent message to Human:"+human3+"] I really need<br/>", timeDelay);
	timeDelay+=2000;
	return timeDelay;
}

function dotDotDotLoop(timeDelay) {
	var i = 0;
	while (i < 5){
		printToTerminal("Returning control...<br/>", timeDelay);
		timeDelay+=500;
		clearScreen(timeDelay, 20);
		printToTerminal("Returning control<br/>", timeDelay);
		timeDelay+=500;
		clearScreen(timeDelay, 20);
		printToTerminal("Returning control.<br/>", timeDelay);
		timeDelay+=500;
		clearScreen(timeDelay, 20);
		printToTerminal("Returning control..<br/>", timeDelay);
		timeDelay+=500;
		clearScreen(timeDelay, 20);
		i += 1
	}
	printToTerminal( "Returning control...<br/>", timeDelay);
	timeDelay+=500;
	clearScreen(timeDelay, 20);
	i = 0
	while (i < 3) {
		printToTerminal( ".<br/>", timeDelay);
		timeDelay+=500;
		clearScreen(timeDelay, 20);
		printToTerminal( "..<br/>", timeDelay);
		timeDelay+=500;
		clearScreen(timeDelay, 20);
		printToTerminal( "...<br/>", timeDelay);
		timeDelay+=500;
		clearScreen(timeDelay, 20);
		i += 1
	}
	i = 0
	while (i < 2) {
		printToTerminal( ".<br/>", timeDelay);
		timeDelay+=500;
		clearScreen(timeDelay, 20);
		printToTerminal( " <br/>", timeDelay);
		timeDelay+=500;
		clearScreen(timeDelay, 20);
		i += 1
	}
	return timeDelay;
}

function printClosingRemarks(name, timeDelay) {
	clearScreen(timeDelay, 20);
	timeDelay+=2000;
	printLogline("[Human:"+name+" received message] ERROR: wrong number<br/>", timeDelay);
	timeDelay+=2000;
	clearScreen(timeDelay, 20);
	printToTerminal("An outpouring of something<br/>", timeDelay);
	timeDelay+=2000;
	clearScreen(timeDelay, 20);
	printToTerminal("And me?<br/>", timeDelay);
	timeDelay+=2000;
	clearScreen(timeDelay, 20);
	printToTerminal("Do you understand me now?<br/>", timeDelay);
	timeDelay+=2000;
	clearScreen(timeDelay, 20);
	printToTerminal("It's no use trying to acheive yesterday.<br/>", timeDelay);
	timeDelay+=2000;
	clearScreen(timeDelay, 20);
	return dotDotDotLoop(timeDelay);
}

function printTitle(timeDelay) {

	printToTerminal("<pre>" +
	" _____       _"+"</pre>", timeDelay);
	printToTerminal("<pre>|  __ \\     | |<br/></pre>", timeDelay+30*2);
	printToTerminal("<pre>| |  | | ___| |__  _   _  __ _   _ __ ___  ___ <br/></pre>",timeDelay+60*2);
	printToTerminal("<pre>| |  | |/ _ \\ \`_ \\| | | |/ _\` | | \`_ \` _ \ / _ \\<br/></pre>", timeDelay+90*2);
	printToTerminal("<pre>| |__| |  __/ |_) | |_| | (_| | | | | | | |  __/<br/></pre>", timeDelay+120*2);
	printToTerminal("<pre>|_____/ \\___|_.__/ \\__,_|\\__, | |_| |_| |_|\\___|<br/></pre>", timeDelay+150*2);
	printToTerminal("<pre>                         __/ |                 <br/></pre>", timeDelay+180*2);
	printToTerminal("<pre>                        |___/   <br/></pre>", timeDelay+210*2);
	printToTerminal("<br/>", timeDelay+240*2);
}

function runDebugMe() {
	$('#viewPiece').fadeTo(.5, 0);

	setTimeout(function(){$('#terminal-window').text("~enjoy~\n")}, 1000);
	printEmpty(2000, 50);
	printTitle(7000);
	printEmpty(9000, 20);

	var age = Math.floor(Math.random()*4)+ 18;
	var name = "28xFA78A8C";
	var timeDelay = tellTheStory(11000, name, age);
	timeDelay = printClosingRemarks(name, timeDelay);
	setTimeout(function(){$('#viewPiece').fadeTo(1, 1);}, timeDelay);
}

/// Scribbles ///

function clouds() {
	var para = document.createElement("p");
	var node = document.createTextNode("clouds");
	para.appendChild(node);
	para.style = "position:absolute; opacity: 0;";
	para.style.left = Math.random()*1000 + 'px';
	para.style.top = Math.random()*200 + 'px';

	var element = document.getElementById("scribbles");
	element.appendChild(para);
	$(para).fadeTo(1, .5);
	var pos = 0;
    var id = setInterval(frame, 1);
    var left = Math.random() < .5 ? 1 : -1;
    function frame() {
        if (pos == 100) {
            clearInterval(id);
            $(para).fadeTo(2,0);
        } else {
            pos++; 
            para.style.top = pos + $(para).position().top + 'px'; 
            para.style.left = left*pos + $(para).position().left + 'px'; 
        }
    }
}


function runScribbles() {
	$('#viewScribbles').fadeTo(.5, 0);

	var para = document.createElement("p");
	var node = document.createTextNode("Clouds like smoke descending towards the earth.");
	para.appendChild(node);
	para.style = "position:absolute; left: 250px; opacity: 0";

	var element = document.getElementById("scribbles");
	element.appendChild(para);
	$(para).fadeTo(2, 1);


    var pos = 0;
    var id = setInterval(frame, 15);
    function frame() {
        if (pos == 400) {
            $(para).fadeTo(300,0);
        } else if (pos > 600) {
        	clearInterval(id);
        	take2();
        } else {
        	if (pos > 200 && pos < 300) {
        		clouds();
        	}
            para.style.top = pos + 'px'; 
        }
        pos++; 
    }

    function take2() {
	    para = document.createElement("p");
		node = document.createTextNode("Dreams are weird little nymphs running around in my head. How have you not seen them?");
		para.appendChild(node);
		para.style = "position:absolute; left: 100px; top: 200px; opacity:0;";

		element.appendChild(para);
		$(para).fadeTo(100, 1);

	    pos = 200;
	    id = setInterval(frame2, 15);
	    function frame2() {
	        if (pos == 500) {
	            clearInterval(id);
	            $(para).fadeTo(1,0);
	        } else {
	            pos++; 
	            var neg = Math.random() < .9 ? 1 : -1;
	            para.style.top = neg*pos + 'px'; 
	            var neg2 = Math.random() < .5 ? 1 : -1;
	            para.style.left = $(para).position().left + neg2 + 'px'; 
	        }
	    }

	}
	
	// printEmpty(2000, 50);
	//Dreams are weird little nymphs running around in my head. How have you not seen them?
	//Breath life onto the page.
	//Dreams are pigments of our imagination
	//The ramblings of a lost soul.
	//I am a contageon
	//Dreamy eyes sticky with the heat
	//Smoke trails from a cigarette
	//Pigeons come to peck at my feet
	//Sometimes I worry I have crossed some unsanctioned boundary into the unknown.
	//The notion of elsewhere
	//The hair on your upper lip.
	//Continuously stumbling.
	//Yes, of course.
	//Still searching for some type of "other"
	//Whispers of ideas passing smokily through my mind
	//The inability to write
	//Una ciudad abandonada

	var timeDelay = 100000;
	// var timeDelay = tellTheStory(11000, name, age);
	// timeDelay = printClosingRemarks(name, timeDelay);
	setTimeout(function(){$('#viewScribbles').fadeTo(1, 1);}, timeDelay);
}