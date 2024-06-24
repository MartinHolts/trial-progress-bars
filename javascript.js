window.onload = function() {
	var profile = [
	{"MODE":"Comfort","MONDAY":"09:00:00","TUESDAY":"09:00:00","WEDNESDAY":"09:00:00","THURSDAY":"09:00:00","FRIDAY":"09:00:00","SATURDAY":null,"SUNDAY":null},
	{"MODE":"Eco","MONDAY":"22:00:00","TUESDAY":"22:00:00","WEDNESDAY":"22:00:00","THURSDAY":"22:00:00","FRIDAY":"22:00:00","SATURDAY":null,"SUNDAY":null},
	{"MODE":"Standby","MONDAY":"07:30:00","TUESDAY":"07:30:00","WEDNESDAY":"07:30:00","THURSDAY":"07:30:00","FRIDAY":"07:30:00","SATURDAY":null,"SUNDAY":null},
	{"MODE":"Standby","MONDAY":"21:00:00","TUESDAY":"21:00:00","WEDNESDAY":"21:00:00","THURSDAY":"21:00:00","FRIDAY":"21:00:00","SATURDAY":null,"SUNDAY":null}
	];

	var days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
	var daysLowercase = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

	// Goes through every time value in profile, makes it into seconds and replaces the original time value with seconds.
	for (var i = 0; i < profile.length; i++) {
		for (var d = 0; d < days.length; d++) {
			var hms = profile[i][days[d]];
			if (hms === null) {
				var seconds = 0;
				profile[i][days[d]] = seconds;
				continue;
			}
			var a = hms.split(':'); // splits it at the colons
			// minutes are worth 60 seconds. Hours are worth 60 minutes.
			var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
			profile[i][days[d]] = seconds;
		}
	}

	// Goes through every weekday value in profile.
	for (var i = 0; i < days.length; i++) {
		var colors = [];
		// Goes through profile "MODE" values, checks what color they correspond to and puts them into colors array.
		for (var d = 0; d < profile.length; d++) {
			var temp = profile[d]["MODE"];
			if (temp === "Comfort") {
				colors[d] = "#A2A2A2";
			}
			if (temp === "Eco") {
				colors[d] = "#005264";
			}
			if (temp === "Standby") {
				colors[d] = "#868686";
			}
		}
		var daysTemp = [];
		// Goes through every value of given weekday and puts it into daysTemp array.
		for (var d = 0; d < profile.length; d++) {
			var temp = profile[d][days[i]];
			daysTemp[d] = temp;
		}
		var done = false;
		// Sorts values in daysTemp array by smallest to largest. Also when value of daysTemp is moved, 
		// same index value in colors array is moved by the same amount, so daysTemp array value corresponds to colors array value of that same time.
		while (!done) {
		    done = true;
		    for (var b = 0; b < profile.length; b += 1) {
		      	if (daysTemp[b] > daysTemp[b+1]) {
		        done = false;
		        var temp = daysTemp[b];
		        daysTemp[b] = daysTemp[b + 1];
		        daysTemp[b + 1] = temp;
		        temp = colors[b];
		        colors[b] = colors[b + 1];
		        colors[b + 1] = temp;
		    	}
		    }
		}
		// Goes through seconds values in daysTemp, makes into percentages of 24 hours and puts them into temp variable.
		for (var b = 0; b < profile.length; b += 1) {
	      	var temp = daysTemp[b] * 0.00001157407 * 100;
	      	// Makes first part of the progress bar that is eco until another mode is declared for the day.
	      	if (b === 0) {
	      		var hiddenInput = document.createElement("div");
				hiddenInput.setAttribute("id", (days[i] + "ProgressbarPart") + b);
				document.getElementById(daysLowercase[i]).appendChild(hiddenInput);
				document.getElementById((days[i] + "ProgressbarPart") + b).style.width = temp + "%";
				document.getElementById((days[i] + "ProgressbarPart") + b).style.height = "15px";
				document.getElementById((days[i] + "ProgressbarPart") + b).style.backgroundColor = "#005264"; // #005264 = eco
				document.getElementById((days[i] + "ProgressbarPart") + b).style.display = "inline-block";
	      	}
	      	// Makes every part of the progress bar that is not first or last one.
	      	if ((profile.length - 1) - b !== 0) {
		      	var hiddenInput = document.createElement("div");
				hiddenInput.setAttribute("id", (days[i] + "ProgressbarPart") + (b + 1));
				document.getElementById(daysLowercase[i]).appendChild(hiddenInput);
				document.getElementById((days[i] + "ProgressbarPart") + (b + 1)).style.width = ((daysTemp[b + 1] * 0.00001157407 * 100) - temp) + "%";
				document.getElementById((days[i] + "ProgressbarPart") + (b + 1)).style.height = "15px";
				document.getElementById((days[i] + "ProgressbarPart") + (b + 1)).style.backgroundColor = colors[b];
				document.getElementById((days[i] + "ProgressbarPart") + (b + 1)).style.display = "inline-block";
	      	}
	      	// Makes last part of the progress bar.
	      	if ((profile.length - 1) - b === 0) {
	      		var hiddenInput = document.createElement("div");
				hiddenInput.setAttribute("id", (days[i] + "ProgressbarPart") + (b + 1));
				document.getElementById(daysLowercase[i]).appendChild(hiddenInput);
				document.getElementById((days[i] + "ProgressbarPart") + (b + 1)).style.width = (100 - temp) + "%";
				document.getElementById((days[i] + "ProgressbarPart") + (b + 1)).style.height = "15px";
				document.getElementById((days[i] + "ProgressbarPart") + (b + 1)).style.backgroundColor = colors[b];
				document.getElementById((days[i] + "ProgressbarPart") + (b + 1)).style.display = "inline-block";
	      	}
	    }
	}
}