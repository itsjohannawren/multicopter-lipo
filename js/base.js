var urlParams = {};

function inIFrame () {
	try {
		return (window.self !== window.top);
	} catch (err) {
		// Nothing
	}
	return (true);
}

$(function () {
	var
		querystring = window.location.search.replace (/^\?/, ''),
		pairs = querystring.split ('&');

	$.each (pairs, function (index, pair) {
		var param;
		if (param = pair.match (/^([^=]+)(?:=(.*))?$/)) {
			param [1] = decodeURIComponent (param [1].replace (/\+/g, ' ')).toLowerCase ();
			if (param [2]) {
				urlParams [param [1]] = decodeURIComponent (param [2].replace (/\+/g, ' '));
			} else {
				urlParams [param [1]] = true;
			}
		}
	});

	if (inIFrame ()) {
		$('body').addClass ('iframe');
	}

	if (urlParams.css) {
		$('head').append (
			$('<link>')
				.attr ('rel', 'stylesheet')
				.attr ('type', 'text/css')
				.attr ('href', urlParams.css)
		);
	}

	try {
		if ($.type (uiLoad) === 'function') {
			uiLoad (urlParams);
		}
	} catch (err) {
		// Nothing
	}
});

