;(function ( $, window, document, undefined ) {
	
	var pluginName = 'ik_progressbar',
		defaults = { // values can be overitten by passing configuration options to plugin constructor 
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
			})
			.addClass('ik_progressbar')
      ;
		
		this.fill = $('<div/>')
			.addClass('ik_fill');
			
		this.notification = $('<div/>') // add div element to be used to notify about the status of download
			.addClass('ik_readersonly')
			.appendTo(this.element);

		$('<div/>')
			.addClass('ik_track')
			.append(this.fill)
			.appendTo(this.element);
		
	};
	
	/** 
	 * Gets the current value of progressbar. 
	 *
	 * @returns {number} 
	 */
	Plugin.prototype.getValue = function() {
		
		var value;
		
		value = Number( this.element.data('value') ); // inaccessible
		
		return parseInt( value );
		
	};
	
	/** 
	 * Gets the current value of progressbar. 
	 *
	 * @returns {number} 
	 */
	Plugin.prototype.getPercent = function() {
		
		var percent = this.getValue() / this.options.max * 100;
		
		return parseInt( percent );
		
	};
	
	/** 
	 * Sets the current value of progressbar. 
	 *
	 * @param {number} n - The current value. 
	 */
	Plugin.prototype.setValue = function(n) {
		
		var $el, val, isComplete = false;
		
		$el = $(this.element);
				
		if (n >= this.options.max) {
			val = this.options.max;
			this.notification.text('Loading complete');
		} else {
			val = n;
		}
		
		this.element
			.data({ // inaccessible
				'value': parseInt(val) 
			}) 
      ;
		
		this.updateDisplay();
		
	};
	
	/** Updates visual display. */
	Plugin.prototype.updateDisplay = function() {
		
		this.fill.css({
			'transform': 'scaleX(' + this.getPercent() / 100 + ')'
		});
	
	};
	
	/** Updates text in live region to notify about current status. */
	Plugin.prototype.notify = function() {
		
		this.notification.text(  this.getPercent() + '%' );
		
	};
	
	/** Resets progressbar. */
	Plugin.prototype.reset = function() {
		
		this.setValue(0);
		this.updateDisplay();
		this.notify();
	
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
