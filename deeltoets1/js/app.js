/*************************************************** 
	NAMESPACE 
***************************************************/

var APP = APP || { }; // Namespace als globale object. Zorgt ervoor dat je een nieuwe ruimte maakt binnen de 'window'. Hierdoor kan je conflicten voorkomen. Maar nooit 100%.


(function () {
	
	'use strict'; 	// Scrict is een nieuwe feature in ECMAScript 5. daarmee kunnen we een programma of een functie in strict javascripttaal plaatsen. Het kijkt naar fouten en schakelt features uit die slecht zijn bedacht. 


	/*************************************************** 
		Objecten met (JSON) data. 
	***************************************************/
	
	APP.schedule = { 	// Literal data object 'schedule'.
		mainTitle:'Pool A - Schedule',
		items: [ // Array met Properties en value's 
		    { date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9" },
		    { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11" },
		    { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12" },
		    { date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15" },
		    { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15" },    
		    { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6" },
		    { date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15" },
		    { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8" },
		    { date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14" },
		    { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11" }
	    ]
	};
	
	
	APP.game = { 	// Literal data object 'game'.
		mainTitle:'Pool A - Score: Boomsquad vs. Burning Snow',
        items: [
		    { score: "1", team1: "Boomsquad", team1Score: "1", team2: "Burning Snow", team2Score: "0"},
		    { score: "2", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "0"},
		    { score: "3", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "1"},
		    { score: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "2"},
		    { score: "5", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "2"},
		    { score: "6", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "2"},
		    { score: "7", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "2"},
		    { score: "8", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "3"},
		    { score: "9", team1: "Boomsquad", team1Score: "6", team2: "Burning Snow", team2Score: "3"},
		    { score: "10", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "3"},
		    { score: "11", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "4"},
		    { score: "12", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "4"},
		    { score: "13", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "5"},
		    { score: "14", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "6"},
		    { score: "15", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "6"},
		    { score: "16", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "7"},
		    { score: "17", team1: "Boomsquad", team1Score: "10", team2: "Burning Snow", team2Score: "7"},
		    { score: "18", team1: "Boomsquad", team1Score: "11", team2: "Burning Snow", team2Score: "7"},
		    { score: "19", team1: "Boomsquad", team1Score: "12", team2: "Burning Snow", team2Score: "7"},
		    { score: "20", team1: "Boomsquad", team1Score: "13", team2: "Burning Snow", team2Score: "7"},
		    { score: "21", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "7"},
		    { score: "22", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "8"},
		    { score: "23", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"}
	    ]
	};
	
	APP.ranking = { 	// Literal data object 'ranking'.
		mainTitle:'Pool A - Ranking',
		items: [
		    { team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
		    { team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
		    { team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
		    { team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
		    { team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
	    ]
	};
	
	
	APP.films = new Object(); 	// Constructor object 'films'.
		// Properties:
    	APP.films.mainTitle = 'Films';
    	APP.films.items = function() { 		
	    	jx.load('http://dennistel.nl/movies', function(data) {
				var data = JSON.parse(data); // Maak er JSON objecten van	
				//console.log(data); // log wat er in de parameter 'data' zit			
				var directives = { // Verander de manier van data-binden
					cover: {
					    src: function() {
					    return this.cover; //return de property 'cover' van het JSON object.
					    }
					}
				};	
			Transparency.render(qwery('[data-route=films]')[0], data, directives);			
			},'text','get'); // Haal data op als text.   			 		    	
    	};	  	
  			
	// [Review]	
	//APP.leaguevine = new Object(); // Constructor object 'leaguevine'. [Review: dit is geen object constructor]
	APP.leaguevine = {
		// Properties:
		// APP.leaguevine.mainTitle = 'Leaguevine'; // [Review: Dit hoeft niet, je kan ook letterlijk Leaguevine in de html h1 zetten.]
		
		items: function() { 
			
    		/* 	
    		HTTPS request: https://www.leaguevine.com/oauth2/token/?client_id=6cfe84f67e52ee62c42cc49ce218b2&client_secret=12f1d6247377f7d9fd82e17ca94294&grant_type=client_credentials&scope=universal
    		Client ID: 6cfe84f67e52ee62c42cc49ce218b2
    		Client Secret Key: 12f1d6247377f7d9fd82e17ca94294 
    		Acces Token: 40e50065ad
    		*/
    	
	    		jx.load('https://api.leaguevine.com/v1/tournament_teams/?tournament_ids=%5B19389%5D&access_token=40e50065ad', function(data) {
				var data = JSON.parse(data); // Maak er JSON objecten van
				//console.log(data); //log wat er in de parameter 'data' zit	
				var directives = { //Verander de manier van data-binden met Transparancy.
					objects: { 
						team: { 
							leaguevine_url: { //Structuur van de JSON objecten. (objects > teams > leaguevine).
				    				href: function() {
									return this.leaguevine_url; // Return de property 'leaguevine_url' van het JSON object.
								},
								html: function(){
									return "Link";	
								}
							}
						}
					}
				};

				
			Transparency.render(qwery('[data-route=leaguevine]')[0], data, directives);
			},'text','get'); // Haal data op als text.       		    	
		},
		
		post: function() {
					
			// Plain JavaScript POST method.
			var type = 'POST';
			var url = 'https://api.leaguevine.com/v1/game_scores/';
			var postData = JSON.stringify({
				game_id: '127236',
				team_1_score: '2',
				team_2_score: '4',
				is_final: 'False'
			});
			
			// Create request
			var http = new XMLHttpRequest();
			http.open(type,url,true);
			http.setRequestHeader('Content-type','application/json');
			http.setRequestHeader('Authorization','bearer 40e50065ad');
			http.send(postData);
			
			
		}
		
	};
    	



		
	/*************************************************** 
		START de flow van de APP.
	***************************************************/
	
	APP.flow = { 	// Literal object: Flow. Vuur af!
		init: function () {	// Start/initialiseer object router met daarin de Routie functie.
			APP.router.init(); //Voer router init functie uit. init is voor best practice. INIT IS EEN METHOD. Een method = net als een functie: geassocieerd met een object. 
			
		}
	};
	


	/*************************************************** 
		De flow van de APP. 
	***************************************************/

	APP.router = { 	// Literal object: 'router'.
		init: function () { 
	  		routie({	//Routie kijkt naar wat achter de # komt achter de link en selecteert het. 
			    '/schedule': function() {
			    	APP.page.schedule();
				},
			    '/game': function() {
			    	APP.page.game();
			    },
			    '/ranking': function() {
			    	APP.page.ranking();
			    },
			    '/films': function() { //NIEUW
			    	APP.page.films();
			    },
			    '/leaguevine': function() { //NIEUW
			    	APP.page.leaguevine();
			    },
			    '*': function() {
			    	APP.page.schedule();
			    }
			});
		},

		
		change: function () { //Method: change. 
            var route = window.location.hash.slice(2), // Kijkt naar je URL inclusief hashtag. Slice 'snijdt' een deel van de link eruit. 3e character achter de hashtag.
                sections = qwery('section'), // Qwery zorgt ervoor dat het elementen zoekt en selectert met CSS 1-3 queries.
                section = qwery('[data-route=' + route + ']')[0];

            // Voeg 'active' class aan section toe, 
            if (section) {
            	for (var i = 0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}
            	section.classList.add('active');
            }

            // Default route: Als anders dan route variable, voeg class 'active' toe aan section tag.
            if (!route) {
            	sections[0].classList.add('active');
            }
		}
	};
	

    APP.page = {	// Literal object: page.                     
        schedule: function() {     // Method binnen een literal object: schedule.
            Transparency.render(qwery('[data-route=schedule]')[0], APP.schedule);	// Transparancy is een client-side template engine wat 'data-bind' met DOM.. Qwery zorgt ervoor dat het elementen zoekt en selectert met CSS 1-3 queries.
            APP.router.change(); // Voer change method functie uit. Verander de class 'active'. [0] = eerste in de Array.
        },
        game: function() {
            Transparency.render(qwery('[data-route=game]')[0], APP.game);
            APP.router.change();
        },
        ranking: function() {            
            Transparency.render(qwery('[data-route=ranking]')[0], APP.ranking);
            APP.router.change();
        },
        films: function() {
			APP.films.items();
            APP.router.change();
        },
        leaguevine: function() {
            APP.leaguevine.items();
            APP.leaguevine.post();
            APP.router.change();
        }
    };

    
    
	/*************************************************** 
		IS DOM READY? FIRE!
	***************************************************/
    
	// DOM ready functie. Als pagina geladen is > start flow van applicatie.
	domready(function () {
		// Start/initialiseer controller en daarbij dus de hele applicatie
		APP.flow.init(); //start 'init'-method van 'flow'-object.
	});



	
	
	/*************************************************** 
		UITLEG LIBRARIES
	***************************************************/
	
	/*
		Routie kijkt naar wat achter de # komt achter de link en selecteert het.
		
		.render();
	*/		
	
	
	/*	
		Transparancy is een client-side template engine wat 'data-bind' met DOM. WERKING: Javascript: .render(DATA); && HTML: data-bind=""

     	Voorbeeld:
		var hello = {
		greeting: 'Hello',
		name:     'world!'
		};
		
		$('#template').render(hello); //jQuery DOM selector
		
		of 
		
		Transparency.render(document.getElementById('activities'), activities); //JavaScript selector	
	*/     
		
	
	/*	
		Qwery zorgt ervoor dat het elementen zoekt en selectert met CSS 1-3 queries.
		
		qwery('ELEMENT')';	
	*/

	
	/*	
		JXS Ajax script laadt data in met AJAX.

		jx.load('http://dennistel.nl/movies',function(data){
			console.log(data);
		},'text','get');	
	
	*/	
	
	
	/*
		domready kijkt naar als pagina geladen is, zo ja: voer een functie uit. 
		
		domready(function () {		
			// Do something.	
		});

	*/
	

	
})();	
