console.log('scripts.js loaded');

// Define createNewItem in the global scope
function createNewItem(section, itemName, id, isChecked) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.setAttribute('data-id', id); // Store the item's ID

    const span = document.createElement('span');
    span.className = 'item-name';
    span.textContent = itemName;

    const checkbox = document.createElement('input');
    checkbox.className = 'form-check-input me-1';
    checkbox.type = 'checkbox';
    checkbox.checked = isChecked;
    checkbox.addEventListener('change', (event) => {
        const li = event.target.closest('.list-group-item');
        const id = li.getAttribute('data-id');
        const checked = event.target.checked ? 1 : 0;
        updateItemInDatabase(id, checked);
        event.target.closest('.list-group-item').classList.toggle('bg-light-green', event.target.checked);
    });

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-sm btn-outline-secondary editItem';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editItem(li));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-outline-danger deleteItem';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteItemFromDatabase(id, li));

    const div = document.createElement('div');
    div.className = 'checkboxAndButtons';
    div.appendChild(checkbox);
    div.appendChild(editButton);
    div.appendChild(deleteButton);

    li.appendChild(span);
    li.appendChild(div);

    section.appendChild(li);

    // Immediately apply the green background if the item is checked
    if (checkbox.checked) {
        li.classList.add('bg-light-green');
    }

    // Ensure the checkbox 'change' event handler sets the background color
    checkbox.addEventListener('change', function(event) {
        this.closest('.list-group-item').classList.toggle('bg-light-green', this.checked);
    });

    // Set the initial state of the checkbox based on isChecked
    checkbox.checked = isChecked;
}



// Define addItemToDatabase in the global scope
function addItemToDatabase(itemName, category, section) {
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
            createNewItem(section, itemName, data.id, false); // Add the new item to the UI
        } else {
            console.error('Error adding item:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Define updateItemInDatabase in the global scope
function updateItemInDatabase(id, checked) {
    fetch('php/update_item.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${encodeURIComponent(id)}&checked=${encodeURIComponent(checked)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Item updated successfully');
        } else {
            console.error('Error updating item:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Define deleteItemFromDatabase in the global scope
function deleteItemFromDatabase(id, liElement) {
    fetch('php/delete_item.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${encodeURIComponent(id)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            liElement.remove(); // Remove the item from the UI
            console.log('Item deleted successfully');
        } else {
            console.error('Error deleting item:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function editItem(li) {
    const span = li.querySelector('.item-name');
    const newName = prompt('Edit the item name:', span.textContent);
    if (newName) {
        span.textContent = newName;
        // update functionality ....
    }
}

function setupChecklist(sectionId, addButtonId) {
    const section = document.getElementById(sectionId);
    if (!section) {
        console.error(`Section not found: ${sectionId}`);
        return;
    }

    document.getElementById(addButtonId).addEventListener('click', () => {
        const itemName = prompt('Enter the name of the new item:');
        if (itemName) {
            addItemToDatabase(itemName, sectionId.replace('Section', ''), section);
        }
    });
}

function fetchItems() {
    console.log('Fetching items...');
    fetch('php/fetch_items.php')
        .then(response => response.json())
        .then(items => {
            console.log('Items fetched:', items);
            items.forEach(item => {
                const section = document.getElementById(item.category + 'Section');
                if (section) {
                    createNewItem(section, item.name, item.id, item.checked === 1);
                } else {
                    console.warn('Section not found for category:', item.category);
                }
            });
        })
        .catch(error => console.error('Error fetching items:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    setupChecklist('mamaSection', 'addMamaItem');
    setupChecklist('babySection', 'addBabyItem');
    setupChecklist('breastfeedingSection', 'addBreastfeedingItem');
    setupChecklist('toiletriesSection', 'addtoiletryItem');
    setupChecklist('usefulTipsSection', 'addAnUsefulTip');
    setupChecklist('othersSection', 'addOthers');
    fetchItems();
});
