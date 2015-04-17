// Setup sliders
function uiLoad (params) {
	if (urlParams.save && urlParams.save.match (/^(\d*,){16}\d*$/)) {
		params = urlParams.save.split (',');

		urlParams = {
			'motorsinit': params [0],
			'motorsmin': params [1],
			'motorsmax': params [2],
			'motorampsinit': params [3],
			'motorampsmin': params [4],
			'motorampsmax': params [5],
			'miscampsinit': params [6],
			'miscampsmin': params [7],
			'miscampsmax': params [8],
			'liposeriesinit': params [9],
			'liposeriesmin': params [10],
			'liposeriesmax': params [11],
			'lipomahinit': params [12],
			'lipomahmin': params [13],
			'lipomahmax': params [14],
			'lipomahstep': params [15],
			'flyloadinit': params [16]
		};

		//urlParams.motorsinit = parseInt (paramDefault (urlParams, 'motorsInit', /^\d+$/, 4), 10);
		//urlParams.motorsmin = parseInt (paramDefault (urlParams, 'motorsMin', /^\d+$/, 1), 10);
		//urlParams.motorsmax = parseInt (paramDefault (urlParams, 'motorsMax', /^\d+$/, 12), 10);
		//urlParams.motorampsinit = parseInt (paramDefault (urlParams, 'motorAmpsInit', /^\d+$/, 10), 10);
		//urlParams.motorampsmin = parseInt (paramDefault (urlParams, 'motorAmpsMin', /^\d+$/, 1), 10);
		//urlParams.motorampsmax = parseInt (paramDefault (urlParams, 'motorAmpsMax', /^\d+$/, 100), 10);
		//urlParams.miscampsinit = parseInt (paramDefault (urlParams, 'miscAmpsInit', /^\d+$/, 1), 10);
		//urlParams.miscampsmin = parseInt (paramDefault (urlParams, 'miscAmpsMin', /^\d+$/, 0), 10);
		//urlParams.miscampsmax = parseInt (paramDefault (urlParams, 'miscAmpsMax', /^\d+$/, 50), 10);
		//urlParams.liposeriesinit = parseInt (paramDefault (urlParams, 'lipoSeriesInit', /^\d+$/, 3), 10);
		//urlParams.liposeriesmin = parseInt (paramDefault (urlParams, 'lipoSeriesMin', /^\d+$/, 1), 10);
		//urlParams.liposeriesmax = parseInt (paramDefault (urlParams, 'lipoSeriesMax', /^\d+$/, 10), 10);
		//urlParams.lipomahinit = parseInt (paramDefault (urlParams, 'lipoMAHInit', /^\d+$/, 1500), 10);
		//urlParams.lipomahmin = parseInt (paramDefault (urlParams, 'lipoMAHMin', /^\d+$/, 100), 10);
		//urlParams.lipomahmax = parseInt (paramDefault (urlParams, 'lipoMAHMax', /^\d+$/, 10000), 10);
		//urlParams.lipomahstep = parseInt (paramDefault (urlParams, 'lipoMAHStep', /^\d+$/, 50), 10);
		//urlParams.flyloadinit = parseInt (paramDefault (urlParams, 'flyLoadInit', /^\d+$/, 40), 10);
	}

	$('#motors_slider').slider ({
		'range': 'min',
		'value': parseInt (paramDefault (urlParams, 'motorsInit', /^\d+$/, 4), 10),
		'min': parseInt (paramDefault (urlParams, 'motorsMin', /^\d+$/, 1), 10),
		'max': parseInt (paramDefault (urlParams, 'motorsMax', /^\d+$/, 12), 10),
		'slide': function (event, ui) {
			$('#motors_value').text (ui.value);
			flightTimeCalculate ();
		}
	});
	$('#motors_value').text ($('#motors_slider').slider ('value'));

	$('#motor_amps_slider').slider ({
		'range': 'min',
		'value': parseInt (paramDefault (urlParams, 'motorAmpsInit', /^\d+$/, 10), 10),
		'min': parseInt (paramDefault (urlParams, 'motorAmpsMin', /^\d+$/, 1), 10),
		'max': parseInt (paramDefault (urlParams, 'motorAmpsMax', /^\d+$/, 100), 10),
		'slide': function (event, ui) {
			$('#motor_amps_value').text (ui.value + 'A');
			flightTimeCalculate ();
		}
	});
	$('#motor_amps_value').text ($('#motor_amps_slider').slider ('value') + 'A');

	$('#misc_amps_slider').slider ({
		'range': 'min',
		'value': parseInt (paramDefault (urlParams, 'miscAmpsInit', /^\d+$/, 1), 10),
		'min': parseInt (paramDefault (urlParams, 'miscAmpsMin', /^\d+$/, 0), 10),
		'max': parseInt (paramDefault (urlParams, 'miscAmpsMax', /^\d+$/, 50), 10),
		'slide': function (event, ui) {
			$('#misc_amps_value').text (ui.value + 'A');
			flightTimeCalculate ();
		}
	});
	$('#misc_amps_value').text ($('#misc_amps_slider').slider ('value') + 'A');

	$('#lipo_series_slider').slider ({
		'range': 'min',
		'value': parseInt (paramDefault (urlParams, 'lipoSeriesInit', /^\d+$/, 3), 10),
		'min': parseInt (paramDefault (urlParams, 'lipoSeriesMin', /^\d+$/, 1), 10),
		'max': parseInt (paramDefault (urlParams, 'lipoSeriesMax', /^\d+$/, 10), 10),
		'slide': function (event, ui) {
			$('#lipo_series_value').text (ui.value + 'S');
			flightTimeCalculate ();
		}
	});
	$('#lipo_series_value').text ($('#lipo_series_slider').slider ('value') + 'S');

	$('#lipo_mah_slider').slider ({
		'range': 'min',
		'value': parseInt (paramDefault (urlParams, 'lipoMAHInit', /^\d+$/, 1500), 10),
		'min': parseInt (paramDefault (urlParams, 'lipoMAHMin', /^\d+$/, 100), 10),
		'max': parseInt (paramDefault (urlParams, 'lipoMAHMax', /^\d+$/, 10000), 10),
		'step': parseInt (paramDefault (urlParams, 'lipoMAHStep', /^\d+$/, 50), 10),
		'slide': function (event, ui) {
			$('#lipo_mah_value').text (ui.value + 'mAh');
			flightTimeCalculate ();
		}
	});
	$('#lipo_mah_value').text ($('#lipo_mah_slider').slider ('value') + 'mAh');

	$('#fly_load_slider').slider ({
		'range': 'min',
		'value': parseInt (paramDefault (urlParams, 'flyLoadInit', /^\d+$/, 40), 10),
		'min': 0,
		'max': 100,
		'slide': function (event, ui) {
			$('#fly_load_value').text (ui.value + '% (' + fuzzyFlyLoad (ui.value) + ' flying)');
			flightTimeCalculate ();
		}
	});
	$('#fly_load_value').text ($('#fly_load_slider').slider ('value') + '% (' + fuzzyFlyLoad ($('#fly_load_slider').slider ('value')) + ' flying)');

	// Load the initial numbers
	flightTimeCalculate ();
}

function paramDefault (params, param, match, fallback) {
	param = param.toLowerCase ();
	if (params [param] && match.exec (params [param])) {
		return (params [param]);
	}
	return (fallback);
}

function fuzzyFlyLoad (load) {
	if (load <= 45) {
		return ('light');
	}
	if (load <= 65) {
		return ('moderate');
	}
	if (load <= 80) {
		return ('agressive');
	}
	return ('extreme');
}

function fuzzySeconds (seconds) {
	var output = '';

	if (seconds >= 3600) {
		output += Math.floor (seconds / 3600) + 'h';
		seconds -= Math.floor (seconds / 3600) * 3600;
	}
	if (seconds >= 60) {
		output += Math.floor (seconds / 60) + 'm';
		seconds -= Math.floor (seconds / 60) * 60;
	} else if (output !== '') {
		output += '0m';
	}
	if (seconds > 0) {
		output += seconds + 's';
	} else if (output === '') {
		output += '0s';
	}

	return (output);
}

function flightTimeCalculate () {
	var
		value_motors = parseInt ($('#motors_value').text (), 10),
		value_lipo_volts = parseInt ($('#lipo_series_value').text (), 10) * 3.7,
		value_lipo_mah = parseInt ($('#lipo_mah_value').text (), 10),
		value_motor_amps = parseInt ($('#motor_amps_value').text (), 10),
		value_misc_amps = parseInt ($('#misc_amps_value').text (), 10),
		value_fly_load = parseInt ($('#fly_load_value').text (), 10) / 100;

	var
		calc_total_amps = (value_motor_amps * value_motors) + value_misc_amps,
		calc_total_amps_by_load = ((value_motor_amps * value_motors) + value_misc_amps) * value_fly_load;
	var
		calc_total_watts = value_lipo_volts * calc_total_amps,
		calc_total_watts_by_load = value_lipo_volts * calc_total_amps_by_load;

	var
		calc_lipo_discharge_rating = (calc_total_amps / value_lipo_mah) * 1000,
		calc_flying_time_seconds = (((value_lipo_mah / 1000) / calc_total_amps_by_load) * 60 * 60).toFixed (0),
		calc_charge_rate = value_lipo_mah / 1000;

	$('#max_draw').text (calc_total_amps.toFixed (0) + 'A / ' + calc_total_watts.toFixed (0) + 'W');
	$('#draw_by_load').text (calc_total_amps_by_load.toFixed (1) + 'A / ' + calc_total_watts_by_load.toFixed (1) + 'W');
	$('#flying_time').text (fuzzySeconds (calc_flying_time_seconds));
	$('#flying_time_80').text (fuzzySeconds ((calc_flying_time_seconds * 0.8).toFixed (0)));
	$('#lipo_discharge_rating').text (calc_lipo_discharge_rating.toFixed (0) + 'C');
	$('#charge_rate').text (calc_charge_rate.toFixed (1) + 'A');

	updateShareURL ();
}

function updateShareURL () {
	var url =
		'http://tools.jwalter.sh/multicopter/lipo.test/flighttime.html?save=' +
		parseInt ($('#motors_value').text (), 10) + ',' +
		paramDefault (urlParams, 'motorsMin', /^\d+$/, 1) + ',' +
		paramDefault (urlParams, 'motorsMax', /^\d+$/, 12) + ',' +
		parseInt ($('#motor_amps_value').text (), 10) + ',' +
		paramDefault (urlParams, 'motorAmpsMin', /^\d+$/, 1) + ',' +
		paramDefault (urlParams, 'motorAmpsMax', /^\d+$/, 100) + ',' +
		parseInt ($('#misc_amps_value').text (), 10) + ',' +
		paramDefault (urlParams, 'miscAmpsMin', /^\d+$/, 0) + ',' +
		paramDefault (urlParams, 'miscAmpsMax', /^\d+$/, 50) + ',' +
		parseInt ($('#lipo_series_value').text (), 10) + ',' +
		paramDefault (urlParams, 'lipoSeriesMin', /^\d+$/, 1) + ',' +
		paramDefault (urlParams, 'lipoSeriesMax', /^\d+$/, 10) + ',' +
		parseInt ($('#lipo_mah_value').text (), 10) + ',' +
		paramDefault (urlParams, 'lipoMAHMin', /^\d+$/, 100) + ',' +
		paramDefault (urlParams, 'lipoMAHMax', /^\d+$/, 10000) + ',' +
		paramDefault (urlParams, 'lipoMAHStep', /^\d+$/, 50) + ',' +
		parseInt ($('#fly_load_value').text (), 10);

	$('#share').attr ('data-href', url);
}
