;(function ( $, window, document, undefined ) {
 
	var pluginName = 'ik_togglebutton',
		defaults = {
			"label": "toggle button",
			"isPressed": false,
			"onToggle": function() { console.log('toggle action is undefined'); }
		};
	 
	/**
	 * @constructs Plugin
	 * @param {Object} element - Current DOM element from selected collection.
	 * @param {Object} [options] - Configuration options.
	 */
	function Plugin( element, options ) {
		
		this._name = pluginName;
		this._defaults = defaults;
		this.element = $(element);
		this.options = $.extend( {}, defaults, options) ;
		
		this.init();
	}
	
	/** Initializes plugin. */
	Plugin.prototype.init = function () {
		
		var plugin, id, $elem;
		
		plugin = this;
		id = 'toggle' + $('.ik_togglebutton').length; // generate unique id
		$elem = this.element
			.attr({
				"id": id,
				"tabindex": 0,
				"role": "button",
				"aria-label": plugin.options.label,
				"aria-pressed": false
			});
		
		plugin.options.onToggle = plugin.options.onToggle.bind(plugin);
		
		$elem
			.on('click', {plugin: plugin}, plugin.onActivate)
		.on('keydown', {plugin: plugin}, plugin.onActivate)
		;
		
	};
	
	/** 
	 * Triggers button's action.
	 * 
	 * @param {Object} event - Keydown or click event.
	 * @param {object} event.data - Event data.
	 * @param {object} event.data.plugin - Reference to plugin.
	 */
	Plugin.prototype.onActivate = function (event) {
		
		var plugin, $me;
		
		if (event.type === 'click' || event.keyCode === ik_utils.keys.enter || event.keyCode === ik_utils.keys.space) {
			
			event.stopPropagation();
			
			plugin = event.data.plugin;
			$me = plugin.element;
			
			if (plugin.options.isPressed) {
				$me
					.removeClass('pressed')
				.attr({
					"aria-pressed": false
				})
					;
				plugin.options.isPressed = false;
			} else {
				$me
					.addClass('pressed')
				.attr({
				  "aria-pressed": true
					})
          ;
				plugin.options.isPressed = true;
			}
			
			plugin.options.onToggle();
		}
		
	};
	
	$.fn[pluginName] = function ( options ) {
		
		return this.each(function () {
			
			if ( !$.data(this, pluginName )) {
				$.data( this, pluginName,
				new Plugin( this, options ));
			}
			
		});
		
	}
 
})( jQuery, window, document );