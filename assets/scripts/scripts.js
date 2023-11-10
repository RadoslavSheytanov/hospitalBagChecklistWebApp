function setupChecklist(sectionId, addButtonId) {
    const section = document.getElementById(sectionId);
  
    // Function to toggle the background color of the list item
    const toggleItemBackground = (checkbox) => {
      checkbox.closest('.list-group-item').classList.toggle('bg-light-green', checkbox.checked);
    };
  
    // Function to create a text span element for the item name
    const createTextSpan = (itemName) => {
      const span = document.createElement('span');
      span.className = 'item-name';
      span.textContent = itemName;
      return span;
    };
  
    // Function to create a checkbox input element
    const createCheckbox = () => {
      const checkbox = document.createElement('input');
      checkbox.className = 'form-check-input me-1';
      checkbox.type = 'checkbox';
      checkbox.value = '';
      checkbox.setAttribute('aria-label', '...');
      checkbox.addEventListener('change', (event) => toggleItemBackground(event.target));
      return checkbox;
    };
  
    // Function to create a button element
    const createButton = (text, className, handler) => {
      const button = document.createElement('button');
      button.className = `btn btn-sm ${className}`;
      button.textContent = text;
      button.addEventListener('click', handler);
      return button;
    };
  
    // Function to create a new list item with the given item name
    const createNewItem = (itemName) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      
      const span = createTextSpan(itemName);
      const checkbox = createCheckbox();
      const editButton = createButton('Edit', 'btn-outline-secondary editItem', () => editItem(li));
      const deleteButton = createButton('Delete', 'btn-outline-danger deleteItem', () => deleteItem(li));
  
      const div = document.createElement('div');
      div.className = 'checkboxAndButtons';
      div.appendChild(checkbox);
      div.appendChild(editButton);
      div.appendChild(deleteButton);
  
      li.appendChild(span);
      li.appendChild(div);
  
      section.appendChild(li);
    };
  
    // Function to edit the name of an existing list item
    const editItem = (li) => {
      const span = li.querySelector('.item-name');
      const newName = prompt('Edit the item name:', span.textContent);
      if (newName) {
        span.textContent = newName;
      }
    };
  
    // Function to delete an existing list item
    const deleteItem = (li) => {
      if (confirm('Are you sure you want to delete this item?')) {
        section.removeChild(li);
      }
    };
  
    // Event listener for the 'Add Item' button
    document.getElementById(addButtonId).addEventListener('click', () => {
      const itemName = prompt('Enter the name of the new item:');
      if (itemName) {
        createNewItem(itemName);
      }
    });
  }
  
  // Initial setup once the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    setupChecklist('mamaSection', 'addMamaItem');
    setupChecklist('babySection', 'addBabyItem');
    setupChecklist("breastfeedingSection", "addBreastfeedingItem");
    setupChecklist('toiletriesSection', 'addtoiletryItem');
    setupChecklist('usefulTipsSection', 'addAnUsefulTip');
    setupChecklist('othersSection', 'addOthers');
  });


  // AJAX Communication with the Back-end - Adding items, updating the UI ...

  function addItemToDatabase(itemName, category) {
    fetch('php/add_item.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${encodeURIComponent(itemName)}&category=${encodeURIComponent(category)}`
    })
    .then(response => response.json())
    .then(data => {
      if (data.id) {
        console.log('Item added with ID:', data.id);
        // Add item to the UI list
      } else {
        console.error('Error adding item:', data.error);
      }
    })
    .catch(error => console.error('Error:', error));
  }
  
  