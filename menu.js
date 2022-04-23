fetchMenu();

function fetchMenu() {
	const request = new Request('../menu.html');
	const headers = new Headers({'Content-Type': 'text/xml'});
	
	fetch(request, {headers})
	.then((response) => {
		if(!response.ok) {
			throw new Error(`HTTP error! Status: ${ response.status }`);
		}
		return response.text();
	})
	.then((response) => {
		const sideMenu = document.createElement('DIV');
		sideMenu.innerHTML = response;
		sideMenu.classList.add("nav-wrapper");
		document.body.appendChild(sideMenu);
		
		const menuButton = document.createElement('DIV');
		menuButton.classList.add('menu-button');
		
		const isAprilFools = new Date().toISOString().substring(5, 10) == '04-01';
		menuButton.innerHTML = isAprilFools ? "\uD83C\uDF54" : "\u2630";
		menuButton.setAttribute("title", "Navigation");
		document.body.appendChild(menuButton);
	})
	.then(() => {
		animateMenu();
		preventPageScrollWhenMenuActive();
	});
}

function animateMenu() {
	const dropdowns = document.getElementsByClassName("dropdown-button");
	var i;
	for (i = 0; i < dropdowns.length; i++) {
		dropdowns[i].addEventListener("click", function() {
			this.classList.toggle("dropdown-active");
			var dropdownContent = this.nextElementSibling;
			if (dropdownContent.style.display === "block") {
				dropdownContent.style.display = "none";
			}
			else {
				dropdownContent.style.display = "block";
			}
		});
	}
	
	const menuButton = document.getElementsByClassName("menu-button");
	menuButton[0].addEventListener("click", function() {
		document.getElementsByClassName("nav-wrapper")[0].classList.toggle("menu-active");
	});
	
	const navWrapper = document.getElementsByClassName("nav-wrapper");
	navWrapper[0].addEventListener("click", function() {
		navWrapper[0].classList.toggle("menu-active");
	});
	
	const sideNav = document.getElementsByClassName("side-nav");
	sideNav[0].addEventListener("click", function(event) {
		event.stopPropagation();
		return false;
	});
}

function preventPageScrollWhenMenuActive() {
	const scrollHandler = function(event) {
		console.log(event.type, event.target);
		const isMenuActive = document.getElementsByClassName("nav-wrapper")[0].classList.contains("menu-active");
		const isTargetWrapper = event.target.classList.contains("nav-wrapper");
		if(isMenuActive && isTargetWrapper) {
			event.preventDefault();
		}
		else {
			event.stopPropagation();
		}
	};
	document.body.addEventListener("scroll", scrollHandler, {passive:false});
	document.body.addEventListener("touchmove", scrollHandler, {passive:false});
	document.body.addEventListener("wheel", scrollHandler, {passive:false});
}