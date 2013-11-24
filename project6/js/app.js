/*************************************************** 
	NAMESPACE 
***************************************************/

var APP = APP || { }; 
(function () {
	
	'use strict';
		
	/*************************************************** 
		START de flow van de APP.
	***************************************************/
	
	APP.flow = { 
		init: function () {	
			APP.router.init(); 
		}
	};	


	/*************************************************** 
		De flow van de APP. 
	***************************************************/

	APP.router = { 	
		init: function () { 
	  		routie({
			    '/agenda': function() {
					APP.router.change();
			    },
			    '/wizard': function() {
					APP.router.change();
			    },
			    '/notificaties': function() {
					APP.router.change();
			    },			    
			    '*': function() {
					APP.router.change();
			    	APP.data.init();
			    	APP.gestures.init();
			    }
			});
		},
		
		change: function () { 
	        var route = window.location.hash.slice(2), 
	        sections = qwery('section'), 
	        section = qwery('[data-route=' + route + ']')[0];
			wrapper = qwery('#wrapper')[0];

            if (section) {
            	for (var i = 0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            		wrapper.classList.remove('login')
            	}
            	section.classList.add('active');
            }
            if (!route) {
            	sections[0].classList.add('active');
            	wrapper.classList.add('login');
            }
		}
	};
	
	APP.data = {
		init: function(){
			APP.page.inchecken.init();
			APP.page.agenda.init();
			APP.page.agenda.post();
			APP.page.wizard.init();
			APP.page.notificaties.init();
		}
	}
	
	APP.gestures = {
		init: function(){ 
			$$('body').swipeDown(function() {
				window.location.reload( true );
			});	
		}		
	};
	

	
	/*************************************************** 
		Objecten met data.
	***************************************************/
	
	APP.page = {
		inchecken: {	
			login: function(form) {
				if (form.id.value=="client") { 
					if (form.pass.value=="1337") {              
						location="#/agenda" 
					} else {
						alert("Foutieve wachtwoord, probeert het opnieuw.")
					}
				} else {  alert("Foutieve clientcode, probeert het opnieuw.")
				} 		    		    	 		   					
			}, 
			init: function() {				
			}	
		},
		/* 
			Client Id
			273841138879.apps.googleusercontent.com
			Client Secret
			MloEL7mfS0D9muzOGgeq0Elo	
		*/
		agenda: {	
			init: function() { 
				jx.load('', function(data) {
				var data = JSON.parse(data); // Maak er JSON objecten van
				console.log(data); //log wat er in de parameter 'data' zit	
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
				var loading = qwery('#loading-schedule')[0];			
				loading.classList.remove('active');
				
				Transparency.render(qwery('[data-route="schedule"]')[0], data, directives);
				},'text','get'); // Haal data op als text.
			},
			post: function() {		
				var type = 'POST';
				var url = 'https://accounts.google.com/o/oauth2/token';	
				var postData = "code=4/vqSnLdeVN7X0QZSsis_8Paex6_Wd.ArFkGgofkC8UOl05ti8ZT3bHHeGshAI&client_id=273841138879.apps.googleusercontent.com&client_secret=MloEL7mfS0D9muzOGgeq0Elo&redirect_uri=http://sjmkalidien.nl&grant_type=authorization_code";
				// Create request
				var http = new XMLHttpRequest();
				http.open(type,url,true);
				http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				http.setRequestHeader('Host','accounts.google.com');
				http.send(postData);			
			} 
		},	
	
		wizard: {	
			init: function() { 		 		    	
			}
		},
		notificaties: {	
			init: function() { 		  		    	
			}		
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

	
})();	


		/* 
			Client Id
			273841138879.apps.googleusercontent.com
			Client Secret
			MloEL7mfS0D9muzOGgeq0Elo			
			code=4/vqSnLdeVN7X0QZSsis_8Paex6_Wd.ArFkGgofkC8UOl05ti8ZT3bHHeGshAI
			
			
https://accounts.google.com/o/oauth2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile& state=%2Fprofile&redirect_uri=http%3A%2F%2Fsjmkalidien.nl&response_type=code&client_id=273841138879.apps.googleusercontent.com&approval_prompt=force

		*/