const smallScreen = window.innerWidth < 800 || window.innerHeight < 800;

if(smallScreen) {
	document.body.classList.add('small');
}
else {
	document.body.classList.add('big');
	
	const headers = new Headers({'Content-Type': 'text/xml'});
	const myRequest = new Request('../menu.html');
	
	fetch(myRequest, {headers})
	.then((response) => {
		if(!response.ok) {
			throw new Error(`HTTP error! Status: ${ response.status }`);
		}
		return response.text();
	})
	.then((response) => {
		const menu = document.createElement('DIV');
		menu.innerHTML = response;
		document.body.appendChild(menu);
		animateMenu();
	});
}

function animateMenu() {
	var dropdown = document.getElementsByClassName("dropdown-button");
	var i;
	for (i = 0; i < dropdown.length; i++) {
		dropdown[i].addEventListener("click", function() {
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
}