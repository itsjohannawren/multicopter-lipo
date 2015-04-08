// Setup sliders
function uiLoad (params) {
	$('#motors_slider').slider ({
		range: 'min',
		value: paramDefault (params, 'motorsInit', /^\d+$/, 4),
		min: paramDefault (params, 'motorsMin', /^\d+$/, 1),
		max: paramDefault (params, 'motorsMax', /^\d+$/, 12),
		slide: function (event, ui) {
			$('#motors_value').text (ui.value);
			lipoLifeCalculate ();
		}
	});
	$('#motors_value').text ($('#motors_slider').slider ('value'));

	$('#motor_amps_slider').slider ({
		range: 'min',
		value: paramDefault (params, 'motorAmpsInit', /^\d+$/, 10),
		min: paramDefault (params, 'motorAmpsMin', /^\d+$/, 1),
		max: paramDefault (params, 'motorAmpsMax', /^\d+$/, 100),
		slide: function (event, ui) {
			$('#motor_amps_value').text (ui.value + 'A');
			lipoLifeCalculate ();
		}
	});
	$('#motor_amps_value').text ($('#motor_amps_slider').slider ('value') + 'A');

	$('#misc_amps_slider').slider ({
		range: 'min',
		value: paramDefault (params, 'miscAmpsInit', /^\d+$/, 1),
		min: paramDefault (params, 'miscAmpsMin', /^\d+$/, 0),
		max: paramDefault (params, 'miscAmpsMax', /^\d+$/, 50),
		slide: function (event, ui) {
			$('#misc_amps_value').text (ui.value + 'A');
			lipoLifeCalculate ();
		}
	});
	$('#misc_amps_value').text ($('#misc_amps_slider').slider ('value') + 'A');

	$('#lipo_series_slider').slider ({
		range: 'min',
		value: paramDefault (params, 'lipoSeriesInit', /^\d+$/, 3),
		min: paramDefault (params, 'lipoSeriesMin', /^\d+$/, 1),
		max: paramDefault (params, 'lipoSeriesMax', /^\d+$/, 10),
		slide: function (event, ui) {
			$('#lipo_series_value').text (ui.value + 'S');
			lipoLifeCalculate ();
		}
	});
	$('#lipo_series_value').text ($('#lipo_series_slider').slider ('value') + 'S');

	$('#lipo_mah_slider').slider ({
		range: 'min',
		value: paramDefault (params, 'lipoMAHInit', /^\d+$/, 1500),
		min: paramDefault (params, 'lipoMAHMin', /^\d+$/, 100),
		max: paramDefault (params, 'lipoMAHMax', /^\d+$/, 10000),
		step: paramDefault (params, 'lipoMAHStep', /^\d+$/, 50),
		slide: function (event, ui) {
			$('#lipo_mah_value').text (ui.value + 'mAh');
			lipoLifeCalculate ();
		}
	});
	$('#lipo_mah_value').text ($('#lipo_mah_slider').slider ('value') + 'mAh');

	$('#fly_load_slider').slider ({
		range: 'min',
		value: paramDefault (params, 'flyLoadInit', /^\d+$/, 40),
		min: 0,
		max: 100,
		slide: function (event, ui) {
			$('#fly_load_value').text (ui.value + '% (' + fuzzyFlyLoad (ui.value) + ' flying)');
			lipoLifeCalculate ();
		}
	});
	$('#fly_load_value').text ($('#fly_load_slider').slider ('value') + '% (' + fuzzyFlyLoad ($('#fly_load_slider').slider ('value')) + ' flying)');

	// Load the initial numbers
	lipoLifeCalculate ();
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

function lipoLifeCalculate () {
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
}
