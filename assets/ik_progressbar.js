;(function ( $, window, document, undefined ) {
	
	var pluginName = 'ik_progressbar',
		defaults = { // values can be overitten by passing configuration options to plugin constructor 
			'instructions': 'Press any key to get progress',
			'max': 100
		};
	
	/**
	 * @constructs Plugin
	 * @param {Object} element - Current DOM element from selected collection.
	 * @param {Object} options - Configuration options.
	 * @param {string} options.instructions - Custom instructions for screen reader users.
	 * @param {number} options.max - End value.
	 */ 
	function Plugin( element, options ) {
		
		this._name = pluginName;
		this._defaults = defaults;
		this.element = $(element);
		this.options = $.extend( {}, defaults, options) ;
		
		this.init();
	
	}
	
	/** Initializes plugin. */
	Plugin.prototype.init = function () { // initialization function
		
		var id = 'pb' + $('.ik_progressbar').length;
				
		this.element
			.attr({
				'id': id,
				'tabindex': 0, // add current element to tab oder
				'role': 'progressbar', // assign  progressbar role
				'aria-valuenow': 0, // set current value to 0 (required by screen readers)
				'aria-valuemin': 0, // set minimum (start) value to 0
				'aria-valuemax': this.options.max, // set maximum (end) value
				'aria-describedby': id + '_instructions' // add aria-describedby attribute 
			})
			.addClass('ik_progressbar');
		
		this.fill = $('<div/>')
			.addClass('ik_fill');
			
		$('<div/>') // add div element to be used with aria-described attribute of the progressbar
			.text(this.options.instructions) // get instruction text from plugin options
			.addClass('ik_readersonly') // hide element from visual display
			.attr({
				'id': id + '_instructions', 
				'aria-hidden': 'true'  // hide element from screen readers to prevent it from being read twice
			})
			.appendTo(this.element);
			
		$('<div/>')
			.addClass('ik_track')
			.append(this.fill)
			.appendTo(this.element);
					
	};
	
	/** 
	 * Gets the current value of progressbar. 
	 * @returns {number} 
	 */
	Plugin.prototype.getValue = function() {
		
		var value;
		
		//value = Number( this.element.data('value') ); // inaccessible
		
		value = Number( this.element.attr('aria-valuenow') ); // accessible
		
		return value;
		
	};
	
	/** 
	 * Gets the current value of progressbar. 
	 * @returns {number} 
	 */
	Plugin.prototype.getPercent = function() {
		
		var percent = this.getValue() / this.options.max * 100;
		
		return parseInt( percent );
		
	};
	
	/** 
	 * Sets the current value of progressbar. 
	 * @param {number} n - The current value. 
	 */
	Plugin.prototype.setValue = function(n) {
		
		var val = (n > this.options.max) ? this.options.max : (n < 0) ? 0 : n;
		
		this.element
			/*.data({ // inaccessible
				'value': parseInt(val) 
			}) */
			.attr({ // accessible
				'aria-valuenow': parseInt(val)
			});
		
		this.updateDisplay();
		
	};
	
	/** Updates visual display. */
	Plugin.prototype.updateDisplay = function() {
		
		this.fill.css({
			'transform': 'scaleX(' + this.getPercent() / 100 + ')'
		});
	
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