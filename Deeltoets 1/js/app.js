// Namespace. Zorgt ervoor dat je binnen een ruimte werkt. Hierdoor kan je conflicten voorkomen.

var APP = APP || {};

(function () {
	// Scrict zorgt ervoor dat er extra goed gelet wordt op fouten. (semicolon, komma's en etc.)
	'use strict';

	// Data objecten: Schedule, Game & Ranking. Allemaal literal objecten.
	APP.schedule = {
		title:'Pool A - Schedule',
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


	APP.game = {
		title:'Pool A - Score: Boomsquad vs. Burning Snow',
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

	APP.ranking = {
		title:'Pool A - Ranking',
		items: [
	    { team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
	    { team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
	    { team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
	    { team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
	    { team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
	    ]
	};
	
	// Controller object. Start de flow van de applicatie.
	APP.controller = {
		init: function () {
			// Initialiseer object router met daarin routie!
			APP.router.init();
		},
		// Zet de router functie weer uit.
		exit: function () {
		}
	};

	// Object router. Literal.
	APP.router = {
		init: function () {
		//Routie zorgt ervoor dat je op dezelfde pagina kan blijven door achter de link een # toe te voegen.
	  		routie({
			    '/schedule': function() {
			    	APP.page.schedule();
				},
			    '/game': function() {
			    	APP.page.game();
			    },

			    '/ranking': function() {
			    	APP.page.ranking();
			    },
			    '*': function() {
			    	APP.page.schedule();
			    }
			});
		},
		
		// Qwery: kleine DOM selector script voor het selecteren van section en data-route tags.
		change: function () {
            var route = window.location.hash.slice(2),
                sections = qwery('section'),
                section = qwery('[data-route=' + route + ']')[0];

            // Voeg 'active' class aan section toe, 
            if (section) {
            	for (var i = 0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}
            	section.classList.add('active');
            }

            // Default route: Als anders dan route, voeg class 'active' toe aan section tag.
            if (!route) {
            	sections[0].classList.add('active');
            }
		}
	};
	// Page object
    APP.page = {
        schedule: function() {
        	// Zorgt voor data binding. Linkt DOM elementen met JSON.
            Transparency.render(qwery('[data-route=schedule]')[0], APP.schedule);
            APP.router.change();
        },
        game: function() {
            Transparency.render(qwery('[data-route=game]')[0], APP.game);
            APP.router.change();
        },
        ranking: function() {
            Transparency.render(qwery('[data-route=ranking]')[0], APP.ranking);
            APP.router.change();
        }
    }
    
	// DOM ready functie. Als pagina geladen is > start applicatie.
	domready(function () {
		// Start controler en daarbij dus de hele applicatie
		APP.controller.init();
	});
	
	
})();