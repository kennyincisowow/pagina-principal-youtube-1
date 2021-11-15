/**
 * --------------------------------------------
 * AdminLTE Dropdown.js
 * License MIT
 * --------------------------------------------
 */

import $ from 'jquery'


var NAME$a = 'Dropdown';
var DATA_KEY$a = 'lte.dropdown';
var JQUERY_NO_CONFLICT$a = $__default['default'].fn[NAME$a];
var SELECTOR_NAVBAR = '.navbar';
var SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
var SELECTOR_DROPDOWN_MENU_ACTIVE = '.dropdown-menu.show';
var SELECTOR_DROPDOWN_TOGGLE = '[data-toggle="dropdown"]';
var CLASS_NAME_DROPDOWN_RIGHT = 'dropdown-menu-right';
var CLASS_NAME_DROPDOWN_SUBMENU = 'dropdown-submenu'; // TODO: this is unused; should be removed along with the extend?

var Default$9 = {};
/**
 * Class Definition
 * ====================================================
 */

var Dropdown = /*#__PURE__*/function () {
  function Dropdown(element, config) {
    this._config = config;
    this._element = element;
  } // Public


  var _proto = Dropdown.prototype;

  _proto.toggleSubmenu = function toggleSubmenu() {
    this._element.siblings().show().toggleClass('show');

    if (!this._element.next().hasClass('show')) {
      this._element.parents(SELECTOR_DROPDOWN_MENU).first().find('.show').removeClass('show').hide();
    }

    this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function () {
      $__default['default']('.dropdown-submenu .show').removeClass('show').hide();
    });
  };

  _proto.fixPosition = function fixPosition() {
    var $element = $__default['default'](SELECTOR_DROPDOWN_MENU_ACTIVE);

    if ($element.length === 0) {
      return;
    }

    if ($element.hasClass(CLASS_NAME_DROPDOWN_RIGHT)) {
      $element.css({
        left: 'inherit',
        right: 0
      });
    } else {
      $element.css({
        left: 0,
        right: 'inherit'
      });
    }

    var offset = $element.offset();
    var width = $element.width();
    var visiblePart = $__default['default'](window).width() - offset.left;

    if (offset.left < 0) {
      $element.css({
        left: 'inherit',
        right: offset.left - 5
      });
    } else if (visiblePart < width) {
      $element.css({
        left: 'inherit',
        right: 0
      });
    }
  } // Static
  ;

  Dropdown._jQueryInterface = function _jQueryInterface(config) {
    return this.each(function () {
      var data = $__default['default'](this).data(DATA_KEY$a);

      var _config = $__default['default'].extend({}, Default$9, $__default['default'](this).data());

      if (!data) {
        data = new Dropdown($__default['default'](this), _config);
        $__default['default'](this).data(DATA_KEY$a, data);
      }

      if (config === 'toggleSubmenu' || config === 'fixPosition') {
        data[config]();
      }
    });
  };

  return Dropdown;
}();
/**
 * Data API
 * ====================================================
 */


$__default['default'](SELECTOR_DROPDOWN_MENU + " " + SELECTOR_DROPDOWN_TOGGLE).on('click', function (event) {
  event.preventDefault();
  event.stopPropagation();

  Dropdown._jQueryInterface.call($__default['default'](this), 'toggleSubmenu');
});
$__default['default'](SELECTOR_NAVBAR + " " + SELECTOR_DROPDOWN_TOGGLE).on('click', function (event) {
  event.preventDefault();

  if ($__default['default'](event.target).parent().hasClass(CLASS_NAME_DROPDOWN_SUBMENU)) {
    return;
  }

  setTimeout(function () {
    Dropdown._jQueryInterface.call($__default['default'](this), 'fixPosition');
  }, 1);
});
/**
 * jQuery API
 * ====================================================
 */

$__default['default'].fn[NAME$a] = Dropdown._jQueryInterface;
$__default['default'].fn[NAME$a].Constructor = Dropdown;

$__default['default'].fn[NAME$a].noConflict = function () {
  $__default['default'].fn[NAME$a] = JQUERY_NO_CONFLICT$a;
  return Dropdown._jQueryInterface;
};

/**
 * --------------------------------------------
 * AdminLTE ExpandableTable.js
 * License MIT
 * --------------------------------------------
 */
/**
  * Constants
  * ====================================================
  */

var NAME$9 = 'ExpandableTable';
var DATA_KEY$9 = 'lte.expandableTable';
var EVENT_KEY$3 = "." + DATA_KEY$9;
var JQUERY_NO_CONFLICT$9 = $__default['default'].fn[NAME$9];
var EVENT_EXPANDED$1 = "expanded" + EVENT_KEY$3;
var EVENT_COLLAPSED$2 = "collapsed" + EVENT_KEY$3;
var SELECTOR_TABLE = '.expandable-table';
var SELECTOR_EXPANDABLE_BODY = '.expandable-body';
var SELECTOR_DATA_TOGGLE$2 = '[data-widget="expandable-table"]';
var SELECTOR_ARIA_ATTR = 'aria-expanded';
/**
  * Class Definition
  * ====================================================
  */

var ExpandableTable = /*#__PURE__*/function () {
  function ExpandableTable(element, options) {
    this._options = options;
    this._element = element;
  } // Public


  var _proto = ExpandableTable.prototype;

  _proto.init = function init() {
    $__default['default'](SELECTOR_DATA_TOGGLE$2).each(function (_, $header) {
      var $type = $__default['default']($header).attr(SELECTOR_ARIA_ATTR);
      var $body = $__default['default']($header).next(SELECTOR_EXPANDABLE_BODY).children().first().children();

      if ($type === 'true') {
        $body.show();
      } else if ($type === 'false') {
        $body.hide();
        $body.parent().parent().addClass('d-none');
      }
    });
  };

  _proto.toggleRow = function toggleRow() {
    var $element = this._element;
    var time = 500;
    var $type = $element.attr(SELECTOR_ARIA_ATTR);
    var $body = $element.next(SELECTOR_EXPANDABLE_BODY).children().first().children();
    $body.stop();

    if ($type === 'true') {
      $body.slideUp(time, function () {
        $element.next(SELECTOR_EXPANDABLE_BODY).addClass('d-none');
      });
      $element.attr(SELECTOR_ARIA_ATTR, 'false');
      $element.trigger($__default['default'].Event(EVENT_COLLAPSED$2));
    } else if ($type === 'false') {
      $element.next(SELECTOR_EXPANDABLE_BODY).removeClass('d-none');
      $body.slideDown(time);
      $element.attr(SELECTOR_ARIA_ATTR, 'true');
      $element.trigger($__default['default'].Event(EVENT_EXPANDED$1));
    }
  } // Static
  ;

  ExpandableTable._jQueryInterface = function _jQueryInterface(operation) {
    return this.each(function () {
      var data = $__default['default'](this).data(DATA_KEY$9);

      if (!data) {
        data = new ExpandableTable($__default['default'](this));
        $__default['default'](this).data(DATA_KEY$9, data);
      }

      if (typeof operation === 'string' && /init|toggleRow/.test(operation)) {
        data[operation]();
      }
    });
  };

  return ExpandableTable;
}();
/**
  * Data API
  * ====================================================
  */


$__default['default'](SELECTOR_TABLE).ready(function () {
  ExpandableTable._jQueryInterface.call($__default['default'](this), 'init');
});
$__default['default'](document).on('click', SELECTOR_DATA_TOGGLE$2, function () {
  ExpandableTable._jQueryInterface.call($__default['default'](this), 'toggleRow');
});
/**
  * jQuery API
  * ====================================================
  */

$__default['default'].fn[NAME$9] = ExpandableTable._jQueryInterface;
$__default['default'].fn[NAME$9].Constructor = ExpandableTable;

$__default['default'].fn[NAME$9].noConflict = function () {
  $__default['default'].fn[NAME$9] = JQUERY_NO_CONFLICT$9;
  return ExpandableTable._jQueryInterface;
};

 /**
  * Constants
  * ====================================================
  */
 
 const NAME = 'Dropdown'
 const DATA_KEY = 'lte.dropdown'
 const JQUERY_NO_CONFLICT = $.fn[NAME]
 
 const SELECTOR_NAVBAR = '.navbar'
 const SELECTOR_DROPDOWN_MENU = '.dropdown-menu'
 const SELECTOR_DROPDOWN_MENU_ACTIVE = '.dropdown-menu.show'
 const SELECTOR_DROPDOWN_TOGGLE = '[data-toggle="dropdown"]'
 
 const CLASS_NAME_DROPDOWN_RIGHT = 'dropdown-menu-right'
 const CLASS_NAME_DROPDOWN_SUBMENU = 'dropdown-submenu'
 
 // TODO: this is unused; should be removed along with the extend?
 const Default = {}
 
 /**
  * Class Definition
  * ====================================================
  */
 
 class Dropdown {
   constructor(element, config) {
     this._config = config
     this._element = element
   }
 
   // Public
 
   toggleSubmenu() {
     this._element.siblings().show().toggleClass('show')
 
     if (!this._element.next().hasClass('show')) {
       this._element.parents(SELECTOR_DROPDOWN_MENU).first().find('.show').removeClass('show').hide()
     }
 
     this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', () => {
       $('.dropdown-submenu .show').removeClass('show').hide()
     })
   }
 
   fixPosition() {
     const $element = $(SELECTOR_DROPDOWN_MENU_ACTIVE)
 
     if ($element.length === 0) {
       return
     }
 
     if ($element.hasClass(CLASS_NAME_DROPDOWN_RIGHT)) {
       $element.css({
         left: 'inherit',
         right: 0
       })
     } else {
       $element.css({
         left: 0,
         right: 'inherit'
       })
     }
 
     const offset = $element.offset()
     const width = $element.width()
     const visiblePart = $(window).width() - offset.left
 
     if (offset.left < 0) {
       $element.css({
         left: 'inherit',
         right: offset.left - 5
       })
     } else if (visiblePart < width) {
       $element.css({
         left: 'inherit',
         right: 0
       })
     }
   }
 
   // Static
 
   static _jQueryInterface(config) {
     return this.each(function () {
       let data = $(this).data(DATA_KEY)
       const _config = $.extend({}, Default, $(this).data())
 
       if (!data) {
         data = new Dropdown($(this), _config)
         $(this).data(DATA_KEY, data)
       }
 
       if (config === 'toggleSubmenu' || config === 'fixPosition') {
         data[config]()
       }
     })
   }
 }
 
 /**
  * Data API
  * ====================================================
  */
 
 $(`${SELECTOR_DROPDOWN_MENU} ${SELECTOR_DROPDOWN_TOGGLE}`).on('click', function (event) {
   event.preventDefault()
   event.stopPropagation()
 
   Dropdown._jQueryInterface.call($(this), 'toggleSubmenu')
 })
 
 $(`${SELECTOR_NAVBAR} ${SELECTOR_DROPDOWN_TOGGLE}`).on('click', event => {
   event.preventDefault()
 
   if ($(event.target).parent().hasClass(CLASS_NAME_DROPDOWN_SUBMENU)) {
     return
   }
 
   setTimeout(function () {
     Dropdown._jQueryInterface.call($(this), 'fixPosition')
   }, 1)
 })
 
 /**
  * jQuery API
  * ====================================================
  */
 
 $.fn[NAME] = Dropdown._jQueryInterface
 $.fn[NAME].Constructor = Dropdown
 $.fn[NAME].noConflict = function () {
   $.fn[NAME] = JQUERY_NO_CONFLICT
   return Dropdown._jQueryInterface
 }
 
 export default Dropdown
 