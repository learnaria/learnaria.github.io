;(function ( $, window, document, undefined ) {
	 
	var pluginName = 'ik_tabs',
		defaults = {
			tabLocation: 'top',
			selectedIndex: 0
		};
	
	/**
	 * @constructs Plugin
	 * @param {Object} element - Current DOM element from selected collection.
	 * @param {Object} [options] - Configuration options.
	 * @param {number} [options.tabLocation='top'] - Tab location (currently supports only top).
	 * @param {number} [options.selectedIndex] - Initially selected tab.
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
		
		var id, $elem, $tabbar, pad;
		
		plugin = this;
		id = 'tabs' + $('.ik_tabs').length; // create unique id
		$elem = this.element.addClass('ik_tabs');
		
		$tabbar = $('<ul/>') // create ul element to hold all tabs
			.addClass('ik_tabbar cf')
			.prependTo($elem);
		
		plugin.panels = $elem // initialize panels and create tabs
			.children('div')
			.each( function(i, el) {
				
				var $tab, $panel, lbl;
				
				$panel = $(el).attr({
					'id': id + '_panel' + i  // add unique id for a panel					
				})
				.addClass('ik_tabpanel')
				.hide();
				
				lbl = $panel.attr('title'); // get tab label from panel title
				
				$panel.removeAttr('title');
				
				$tab = $('<li/>').attr({
					'id': id + '_tab' + i // create unique id for a tab

				})
				.text(lbl > '' ? lbl : 'Tab ' + (i + 1))
				.on('click', {'plugin': plugin, 'index': i}, plugin.selectTab) // add mouse event handler
				.appendTo($tabbar);
			});
		
		plugin.tabs = $tabbar.find('li');
		
		plugin.selectTab({ // select a pre-defined tab / panel 
			data:{
				'plugin': plugin, 
				'index': plugin.options.selectedIndex
			}
		});
	};
	
	/** 
	 * Selects specified tab.
	 * 
	 * @param {Object} [event] - Keyboard event (optional).
	 * @param {object} event.data - Event data.
	 * @param {object} event.data.plugin - Reference to plugin.
	 * @param {object} event.data.index - Index of a tab to be selected.
	 */
	Plugin.prototype.selectTab = function (event) {
		
		var plugin = event.data.plugin, 
			ind = event.data.index, 
			$tabs, 
			$panels;
		
		$elem = plugin.element;
		$tabs = plugin.tabs;
		$panels = plugin.panels;
		
		$tabs // deselect all tabs
			.removeClass('selected')
			.blur();
		
		$($tabs[ind]) // select specified tab
			.addClass('selected');
		
		if (event.type) $($tabs[ind]).focus(); // move focus to current tab if reached by mouse or keyboard
		
		$panels // hide all panels
			.hide(); 
		
		$($panels[ind]) // show current panel
			.show(); 
		
	}
	
	$.fn[pluginName] = function ( options ) {
		
		return this.each(function () {
			
			if ( !$.data(this, pluginName )) {
				$.data( this, pluginName,
				new Plugin( this, options ));
			}
			
		});
		
	}
 
})( jQuery, window, document );