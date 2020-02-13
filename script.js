window.addEventListener("load", function() {
	let addMessage = document.querySelector('.message'),
		addButton = document.querySelector('.add'),
		todo = document.querySelector('.todo');

	let listToDo = [];	
		
	if(localStorage.getItem('todo')){
		listToDo = JSON.parse(localStorage.getItem('todo'));
		displayMessages();
	}
	if(addButton){
		addButton.addEventListener('click', function(){
			if (!addMessage.value) return;
			let newToDo = {
				todo: addMessage.value,
				checked: false,
				important: false
			};
			listToDo.push(newToDo);
			displayMessages();
			localStorage.setItem('todo', JSON.stringify(listToDo));
			addMessage.value = '';
		});
	}
	function displayMessages(){
		let displayMessage = '';
		if (listToDo.length === 0) todo.innerHTML = '';
		listToDo.forEach(function(item, i){
			displayMessage += 
			`<li>
				<input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
				<label for='item_${i}' class="${item.important ? 'important': ''}">${item.todo}</label>
			</li>`;
			todo.innerHTML = displayMessage;
		});
	}
	if (todo){
		todo.addEventListener('change', function(event){
			let idInput = event.target.getAttribute('id');
			let valueLabel = todo.querySelector('[for='+idInput+']').innerHTML;
			
			listToDo.forEach(function(item){
				if(item.todo === valueLabel){
					item.checked = !item.checked;
					localStorage.setItem('todo', JSON.stringify(listToDo));
				}
			});
		});
	}
	if (todo){
		todo.addEventListener('contextmenu', function(event){
			event.preventDefault();
			listToDo.forEach(function(item, i){
				if(item.todo === event.target.innerHTML){
					if(event.ctrlKey || event.metaKey){
						listToDo.splice(i,1);
					} else{
						item.important = !item.important;
					}
					displayMessages();
					localStorage.setItem('todo', JSON.stringify(listToDo));
				}
			});
		});
	}
});






















