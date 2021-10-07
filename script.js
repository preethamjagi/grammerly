var obj = {};
function correctReplacement(event) {
	if(event.button == 2){
		
		let badString = document.getElementById("popup").textContent;
		let goodStrings = obj[badString];
		
		var contents = document.getElementById("showText");
		var ul = document.createElement('ul');
		ul.classList.add('menu');
		ul.setAttribute('id', 'menus');
		
		
		console.log(goodStrings.length);
		for(let i = 0; i < goodStrings.length; i++) {
			var li = document.createElement('li');
			var str = goodStrings[i];
			li.classList.add('menu-item');
			li.setAttribute('id', ""+str+"");
			li.innerHtml = str; 
			ul.appendChild(li);
			
		}
		console.log(ul);
		
		contents.appendChild(ul);
		
		let menu = null;
        document.addEventListener('DOMContentLoaded', function(){
            //make sure the right click menu is hidden
            menu = document.querySelector('.menu');
            menu.classList.add('off');
            
            //add the right click listener to the box
            let box = document.getElementById('popup');
            box.addEventListener('contextmenu', (ev)=>{
			//stop the real right click menu
			ev.preventDefault(); 
			//show the custom menu
			//console.log( ev.clientX, ev.clientY );
			menu.style.top = `${ev.clientY - 20}px`;
			menu.style.left = `${ev.clientX - 20}px`;
			menu.classList.remove('off');
		});
            
            //add a listener for leaving the menu and hiding it
            menu.addEventListener('mouseleave', (ev)=>{
			ul.classList.add('off');
			ul.style.top = '-200%';
			ul.style.left = '-200%';
		});
            
            //add the listeners for the menu items
            for(let i = 0; i < goodStrings.length; i++) {
			var st = goodStrings[i];
			console.log(st);
			let elem = document.getElementById(""+st+"");
			console.log(elem);
			document.getElementById(""+st+"").addEventListener('click', (ev)=>{
				menu.classList.add('off');
				menu.style.top = '-200%';
				menu.style.left = '-200%';
				let txt = ev.target.id;
				document.getElementById('popup').innerText = txt;
			});
			}
        });
        
        		
	}
}


	  
    

function onFileLoad(elementId, event) {
	
	var el = document.getElementById("showText");
	el.style.margin = "auto";
	el.style.width = '70%';
	el.style.border = "2px solid black";
	el.style.padding = "10px";
    
	var fileOutput = event.target.result;
	//console.log(fileOutput);
	var str = fileOutput.replace(/\s+/g, '+');
	var res = str.slice(0, str.length - 1);
	console.log(res);
	
	var url = "https://api.textgears.com/spelling?key=dsuyVkMvuhiSZg03&text="+res+"&language=en-GB"
	fetch(url)
	 .then(response => response.json())
	 .then((response) => {
		console.log(response);
		console.log(typeof response);
		var errors = response['response']['errors'];
		var fileText = fileOutput;
		var k = 0;
		for(let i = 0; i < errors.length; i++) {
			console.log(errors[i]['bad']);
			let badString = errors[i]['bad'];
			let goodStrings = errors[i]['better'];
			obj[badString] = goodStrings;
			
			for(let j = 0; j < fileOutput.length; j++) {
				if(fileOutput.substr(j, badString.length) == badString){
					let strs = obj[badString];
					let key = badString;
					let regex = new RegExp(key,'g');
					fileText = fileText.replace(regex,
					'<mark style="background-color:#f26666; text-decoration:underline;" onmouseover="this.style.color=\'red\';" onmouseout="this.style.color=\'black\';">'+key+'</mark>');
					k++;
					
					
				}
			}
		}
		
		document.getElementById(elementId).innerHTML = fileText;
		
		var contents = document.getElementById("showText");
		
		for(let i = 0; i < errors.length; i++) {
			let badString = errors[i]['bad'];
			let goodStrings = errors[i]['better'];
			
			
			var ul = document.createElement('ul');
			ul.classList.add("menu");
			ul.setAttribute('id', ""+badString+"-"+i);
				
			for(let i = 0; i < goodStrings.length; i++) {
				let li = document.createElement('li');
				let str = goodStrings[i];
				li.classList.add('menu-item');
				li.setAttribute('id', ""+str+"");
				li.innerText = str; 
				ul.appendChild(li);
			
			}
			console.log(ul);
		
			contents.appendChild(ul);
		}
		
		
		function onReady(){
			
			var menu = null;
			var obj1 = {};
			var obj2 = {};
			
			
				
				for(let i = 0; i < k; i++) {
					
					
				let badString = errors[i]['bad'];
				let goodStrings = errors[i]['better'];
				menu = document.querySelector("#"+badString+"-"+i);
				obj1['menu-'+i] = menu;
				obj1['menu-'+i].classList.add('off');
				
				//add the right click listener to the box
				
					var box = document.getElementsByTagName('mark')[i];
					
					obj2['mark-'+i] = box;
					
					function showmenu(ev){
						//stop the real right click menu
						ev.preventDefault(); 
						//show the custom menu
						console.log( ev.clientX, ev.clientY );
						obj1['menu-'+i].style.top = `${ev.clientY -20}px`;
						obj1['menu-'+i].style.left = `${ev.clientX -20}px`;
						console.log(obj1['menu-'+i]);
						obj1['menu-'+i].classList.remove('off');
						console.log(obj1['menu-'+i]);
					}
					
					obj2['mark-'+i].addEventListener('contextmenu', showmenu);
					
					//add a listener for leaving the menu and hiding it
					function hidemenu(ev){
						obj1['menu-'+i].classList.add('off');
						obj1['menu-'+i].style.top = '-200%';
						obj1['menu-'+i].style.left = '-200%';
					}
					
					obj1['menu-'+i].addEventListener('mouseleave', hidemenu);
					
					//add the listeners for the menu items
					function setText(ev){
						hidemenu();
						let txt = ev.target.id;
						//obj2['mark-'+i].innerHTML = txt;
						obj2['mark-'+i].replaceWith(txt);
					}
					
					function addMenuListeners(){
						var st = [];
						for(let j = 0; j < goodStrings.length; j++) {
							st[j] = goodStrings[j];
							console.log("-----"+st[j]+"-------");
							
							document.getElementById(""+st[j]+"").addEventListener('click', setText);
						}
				
					}
				addMenuListeners();
			}
			
		
        
		}
		
		
        if (document.readyState !== "loading") {
			onReady(); 
		} else {
			document.addEventListener("DOMContentLoaded", onReady);
		}
	
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

function onChooseFile(event, onLoadFileHandler) {
    if (typeof window.FileReader !== 'function')
        throw ("The file API isn't supported on this browser.");
    let input = event.target;
    if (!input)
        throw ("The browser does not properly implement the event object");
    if (!input.files)
        throw ("This browser does not support the `files` property of the file input.");
    if (!input.files[0])
        return undefined;
    let file = input.files[0];
	
    let fr = new FileReader();
	
    fr.onload = onLoadFileHandler;
    fr.readAsText(file);
	
}
