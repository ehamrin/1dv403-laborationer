"use strict";

window.onload = function(){

	
	var birthday = function(date){
		var regex = /^\(?([0-9]{4})\)?[-]([0-9]{2})?[-]([0-9]{2})$/;
		if(!regex.test(date)){
			throw new SyntaxError("Date is not valid");
		}

		date = new Date(date);
		date.setHours(0,0,0,0);
		console.log("Input date: " + date);

		var today = new Date();
		today.setHours(0,0,0,0);
		console.log("Today's date: " + today);

		//Set next birthday year
		if((date.getMonth() < today.getMonth()) || (date.getMonth() === today.getMonth() && date.getDate() < today.getDate())){
			date.setYear(today.getFullYear() + 1);
			console.log("Setting year to: " + date.getFullYear());
		}else{
			date.setYear(today.getFullYear());
			console.log("Setting year to: " + date.getFullYear());
		}

		var day = 24*60*60*1000;
		var difference = Math.round((date - today) / day);

		console.log("Difference between dates: " + difference);
		return difference;

	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};