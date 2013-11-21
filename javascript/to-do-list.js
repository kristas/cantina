YUI().add('to-do-list', function (Y) {

  var counter = 0,
      TO_DO_ITEM_TEMPLATE =
      '<div class="to-do-item">\
        <input type="checkbox" id="to-do-item-{counter}"><label for="to-do-item-{counter}" class="to-do-item-desc">{desc}</label>\
       </div>';

  Y.ToDoList = Y.Base.create( 'ToDoList', Y.Base, [], {

    /**
     * Initializes the to-do list
     */
    initializer: function() {
      Y.one('#create-task').on('submit', this._createNewToDoTask, this);
      Y.one('#list-items').delegate(
          'click',
          this._toggleItemStatus,
          '.to-do-item',
          this
      );
    },

    /**
     * Create a new task in the to-do list
     */
    _createNewToDoTask: function(e) {
      e.preventDefault();
      var itemDesc = Y.one('#to-do-desc').get('value');
      if (itemDesc !== '') {
        var taskHTML = Y.Lang.substitute(
          TO_DO_ITEM_TEMPLATE,
          {desc: itemDesc, counter: counter}
        );
        Y.one('#list-items').append(taskHTML);
        Y.one('#to-do-desc').set('value', '');
      }
      counter++;
    },

    /**
     * Sets (or unsets) the completed status of item
     */
    _toggleItemStatus: function(e) {
      e.preventDefault;
      var checkbox;
      if (e.target.get('type') === 'checkbox') {
        checkbox = e.target;
      } else {
        checkbox = e.target.one('input[type="checkbox"]');
        // check the checkbox since it won't happen automatically
        if (checkbox.get('checked') === true) {
          checkbox.set('checked', false);
        } else {
          checkbox.set('checked', true);
        }
      }

      checkbox.get('parentNode').toggleClass('completed');
    },
  });

}, '1.0', {
    requires: ['base','node-base', 'node-event-delegate', 'substitute']
});

