$(document).ready(function () {
    // Pseudocode:

    // 1.  Create state object
    // What is contained in the state object:
    // - item name

    // FYI: state.items[0].name === 'apples'
    var state = {
        items: [
            {name: "apples", checked: false},
            {name: "oranges", checked: false},
            {name: "milk", checked: true},
            {name: "bread", checked: false}
        ]
    };

    // 2.  Functions that modify the state object

    function addItem(state, item){
        var newItem = {name: item, checked:false};
        state.items.push(newItem);

        return state;
    }

    function findItemIndex(state, item) {
        return state.items.findIndex(function (element) {
            return element.name === item;
        });
    }


    function toggleCheck(state, item) {
        var toggleIndex = findItemIndex(state, item);

        // - check / uncheck
        state.items[toggleIndex].checked = state.items[toggleIndex].checked 
            ? false
            : true;

        console.log(state.items[toggleIndex].checked);

        return state;
    }

    function deleteItem(state, item){
        var deleteIndex = findItemIndex(state, item);

        state.items.splice(deleteIndex, 1);

        return state;
    }


    // 3.  Functions that render the state
    //  -- jQuery methods that updates the DOM
    // pass in pointer to the 'shopping-list'


    //<li id="apples">apples</li>
    function renderList(state, element) {
        
        var itemsHTML = state.items.map(function(item) {
            var toggleClass = item.checked ? ' shopping-item__checked' : '';
            
            var thisItem = '<li><span class="shopping-item ' + toggleClass + '">' + item.name + 
            '</span><div class="shopping-item-controls"><button class="shopping-item-toggle">'+
            '<span class="button-label">check</span></button>\n<button class="shopping-item-delete">'+
            '<span class="button-label">delete</span></button></div></li>';

            console.log(thisItem);

            return thisItem;
        });

        element.html(itemsHTML);
        // re-attach listeners
        attachbuttonListeners();   
    };


    // 4.  Event listeners that trigger the previous functions

    $('#js-shopping-list-form').submit(function(event) {
        event.preventDefault();
        var newItem = $('#shopping-list-entry').val();
        addItem(state, newItem);
        renderList(state, $('.shopping-list'));

        event.target.reset();
    });

    function attachbuttonListeners() {
        $('.shopping-item-toggle').click(function(event) {
                
            var itemToToggle = $(event.target).closest('li').find('.shopping-item').text();

            toggleCheck(state, itemToToggle);
            renderList(state, $('.shopping-list'));
        });

        $('.shopping-item-delete').click(function(event) {
            var itemToDelete = $(event.target).closest('li').find('.shopping-item').text();

            deleteItem(state, itemToDelete);
            renderList(state, $('.shopping-list'));
        });
    }

    // first attachment
    attachbuttonListeners();

    // Final output goal:
    // The user being able to create a shopping list and edit and update the shopping list
    // -- when user submits a new item, it's added to the list
    // -- when user takes an action on an item, it's reflected on the list
  

});








