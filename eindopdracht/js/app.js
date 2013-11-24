/*************************************************** 
	NAMESPACE 
***************************************************/

var APP = APP || { }; // Namespace als globale object. Zorgt ervoor dat je een nieuwe ruimte maakt binnen de 'window'. Hierdoor kan je conflicten voorkomen. Maar nooit 100%.


(function () {
	
	'use strict'; 	// Scrict is een nieuwe feature in ECMAScript 5. daarmee kunnen we een programma of een functie in strict javascripttaal plaatsen. Het kijkt naar fouten en schakelt features uit die slecht zijn bedacht. 


	/*************************************************** 
		GLOBALE VARIABELEN
	***************************************************/


		
	/*************************************************** 
		START de flow van de APP.
	***************************************************/
	
	APP.flow = { 	// Literal object: Flow. Vuur af!
		init: function () {	// Start/initialiseer object router met daarin de Routie functie.
			APP.router.init(); //Voer router init functie uit. init is voor best practice. INIT IS EEN METHOD. Een method = net als een functie: geassocieerd met een object.
			APP.pull.init();
		}
	};	


	/*************************************************** 
		De flow van de APP. 
	***************************************************/

	APP.router = { 	// Literal object: 'router'.
		init: function () { 
	  		routie({	//Routie kijkt naar wat achter de # komt achter de link en selecteert het. 
			    '/schedule': function() {
					APP.page.schedule.get(); 
					APP.router.change();
			    },
			    '/game': function() {
					APP.page.game.get(); 
					APP.router.change();
			    },
			    '/ranking': function() {
					APP.page.ranking.get();
					APP.router.change();
			    },
				'/gamePost': function() {   
					APP.router.change();
			    },			    
			    '*': function() {
					APP.router.change();
			    }
			});
		},
	
		change: function () { //Method: change. 
			var route = window.location.hash.slice(2),
			    sections = qwery('section'),
			    section = qwery('[data-route=' + route + ']')[0];
			
			// Show active section, hide all other
			if (section) {
			        for (var i=0; i < sections.length; i++){
						sections[i].classList.remove('active');
			        }
				section.classList.add('active');
			}
			
			// Default route
			if (!route) {
			    sections[0].classList.add('active');
			}

		}
	};
	
	
	APP.pull = {
		init: function() {
			var myScroll, pullDownEl, pullDownOffset;
	
			function pullDownAction () {
					APP.page.schedule.get(); 
					APP.page.game.get(); 
					APP.page.ranking.get(); 			
					
					myScroll.refresh();
			}

			function loaded() {
				var pullDownEl = qwery('#pullDown')[0];
				var pullDownOffset = pullDownEl.offsetHeight;
				var pullDownLabel = qwery('.pullDownLabel')[0];
				var pullReleaseLabel = qwery('.pullReleaseLabel')[0];
				
				myScroll = new iScroll('wrapper', {
					useTransition: true,
					topOffset: pullDownOffset,
					onRefresh: function () {
						pullDownLabel.classList.add('active');
						pullReleaseLabel.classList.remove('active');
					},
					onScrollMove: function () {
					if (this.y > 40 && !pullDownEl.className.match('flip')) {
							pullDownLabel.classList.remove('active');
							pullReleaseLabel.classList.add('active');
						} else if (this.y < 40 && pullDownEl.className.match('flip')) {
							pullDownLabel.classList.add('active');
							pullReleaseLabel.classList.remove('active');
						}
					},
					onScrollEnd: function () {
					pullDownAction();
					} 
				});
			}
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
			
			loaded();
		} 
	};
	
	
	/*************************************************** 
		Objecten met (JSON) data vanuit leaguevine. 
	***************************************************/

	/* 	
		HTTPS request: https://www.leaguevine.com/oauth2/token/?client_id=6cfe84f67e52ee62c42cc49ce218b2&client_secret=12f1d6247377f7d9fd82e17ca94294&grant_type=client_credentials&scope=universal
		Client ID: 6cfe84f67e52ee62c42cc49ce218b2
		Client Secret Key: 12f1d6247377f7d9fd82e17ca94294 
		Acces Token: 40e50065ad
	*/

	
	/* [Review]		
	
	APP.leaguevine = new Object(); // Constructor object 'leaguevine'. [Review: dit is geen object constructor]
	
	*/
	
	APP.page = {
		// Properties:
		// APP.leaguevine.mainTitle = 'Leaguevine'; // [Review: Dit hoeft niet, je kan ook letterlijk Leaguevine in de html h1 zetten.]	
		//https://api.leaguevine.com/v1/games/?pool_id=19221&access_token=40e50065ad	
		schedule: {			    		    	
			get: function() { 		    		    	
				var type = 'GET';
				var url = 'https://api.leaguevine.com/v1/games/?pool_id=19221&access_token=40e50065ad';
				
				// Create GET request
				var http = new XMLHttpRequest();
				http.open(type,url,true);
				http.setRequestHeader('Content-type','application/json');
				http.setRequestHeader('Authorization','bearer 40e50065ad');
				http.send();			
				
				var loading = qwery('#loading-schedule')[0];
				loading.classList.add('active');	


				/* Verander de manier van data-binden met Transparancy.*/
				var directives = {
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
				}; // Sluit directives.
								
				http.onreadystatechange = function() {
					if (http.readyState==4 && http.status==200) {			
						loading.classList.remove('active');
						
						var data = JSON.parse(http.responseText);			
						Transparency.render(qwery('[data-route="schedule"]')[0], data, directives);
					}
				}
			} 				 
		},		
		
		game: {			
			get: function() { 						
				var type = 'GET';
				var url = 'https://api.leaguevine.com/v1/games/127178/?access_token=a98a9401df';
				
				// Create GET request
				var http = new XMLHttpRequest();
				http.open(type,url,true);
				http.setRequestHeader('Content-type','application/json');
				http.setRequestHeader('Authorization','bearer 40e50065ad');
				http.send();			
				
				var loading = qwery('#loading-game')[0];
				loading.classList.add('active');	
				
				APP.router.change();

	            var directives = {
                    objects: { 
                    	resource_uri: {
                    		href: function () {
                            	return this.resource_uri + "score/create/?next=/tournaments/19389/autumn-2013/pools/";
                            },
						html: function(){
                            	return "Update Game";
                            }                    
						},	     
                    	start_time: {
							html: function() {
								return this.start_time;
							}
						}	
					}
	            }; // Sluit directives.
	            
				http.onreadystatechange = function() {
					if (http.readyState==4 && http.status==200) {			
						loading.classList.remove('active');
						
						var data = JSON.parse(http.responseText);			
						Transparency.render(qwery('[data-route="game"]')[0], data, directives);
					}
				}
			},
			post: function() {		
				var type = 'POST';
				var url = 'https://api.leaguevine.com/v1/game_scores/';
				
				var loading = qwery('#loading-gamePost')[0];
				loading.classList.add('active');
				
				var inputScore1 = qwery('#inputScore1')[0].value;
				var inputScore2 = qwery('#inputScore2')[0].value;
				
				var postData = JSON.stringify({
					game_id: '127178',
					team_1_score: inputScore1,
					team_2_score: inputScore2,
					is_final: 'true'
				});						
				
				//Zou je hier nog een alert kunnen toevoegen als post niet lukt?
				
				// Create POST request
				var http = new XMLHttpRequest();
				http.open(type,url,true);
				http.setRequestHeader('Content-type','application/json');
				http.setRequestHeader('Authorization','bearer 40e50065ad');
				http.send(postData);			
				
				http.onreadystatechange = function() {
					if (http.readyState==4) {			
						loading.classList.remove('active');						
					}
				}
			}
		},		
    
		ranking: {	
			get: function() { 						
				var type = 'GET';
				var url = 'https://api.leaguevine.com/v1/pools/19221/?access_token=40e50065ad';
				
				// Create GET request
				var http = new XMLHttpRequest();
				http.open(type,url,true);
				http.setRequestHeader('Content-type','application/json');
				http.setRequestHeader('Authorization','bearer 40e50065ad');
				http.send();			
				
				var loading = qwery('#loading-ranking')[0];
				loading.classList.add('active');
				
				APP.router.change();
				
				var directives = { 
					objects: { 
						team: { 
							leaguevine_url: {
				    				href: function() {
									return this.leaguevine_url;
								},
								html: function(){
									return "Link";	
								}
							}
						}
					}
				}; // Sluit directives.
				
				http.onreadystatechange = function() {
					if (http.readyState==4 && http.status==200) {			
						loading.classList.remove('active');
												
						var data = JSON.parse(http.responseText);									
						Transparency.render(qwery('[data-route="ranking"]')[0], data, directives);
					}
				}
			}		
		}
		
	}; // Sluit APP.page af.	
	   
    
	/*************************************************** 
		IS DOM READY? FIRE!
	***************************************************/
    
	// DOM ready functie. Als pagina geladen is > start flow van applicatie.
	domready(function () {
		// Start/initialiseer controller en daarbij dus de hele applicatie
		APP.flow.init(); //start 'init'-method van 'flow'-object.
	});

	
})();	
