'use strict';
'require baseclass';
'require fs';
'require rpc';

var callSystemInfo = rpc.declare({
	object: 'system',
	method: 'info'
});

function getHoliday(infojson){
	var name = '';
	for(let i=0;i < infojson['jieri'].length;++i){
		name += infojson['jieri'][i] + " ";
	}
	return name;
}


return baseclass.extend({
	title    : _('Chinese Calendar'),


	load	:function() {
		var date = new Date(Date.now());
		var year = date.getUTCFullYear();
		var calendar_list = [
			'',
			'',
			"/usr/share/calendar/calendar20_29.json",
			"/usr/share/calendar/calendar30_39.json",
			"/usr/share/calendar/calendar40_49.json",
		]
		return L.resolveDefault(fs.read_direct(calendar_list[parseInt(year%100/10)],"json"), null);
	},

	render	:function(info) {
		var data = null;
		if(info){
			var date = new Date(Date.now());
			var monthstr = '%04d%02d'.format(
				date.getUTCFullYear(),
				date.getUTCMonth() + 1,
			);
			var calendarjson = info;
			var todayjson = calendarjson[monthstr][date.getUTCDate()];
			data = {
				'calendar':"%s %s %s".format(todayjson['nongli']['nian'],todayjson['nongli']['yue'],todayjson['nongli']['ri']),
				'solar_term':todayjson['jieqi'],
				'holiday':getHoliday(todayjson),
				'suitable':todayjson['yi'],
				'avoidable':todayjson['ji'],
			};
		}else{
			data = {
				'calendar':"?",
				'solar_term':"?",
				'holiday':"?",
				'suitable':"?",
				'avoidable':"?",
			};
		}

        var fields = [
			_('Calendar'),						data.calendar,
			_('Solar Term'),                    data.solar_term,
			_('Holiday'),                    	data.holiday,
			_('Suitable'),                    	data.suitable,
			_('Avoidable'),                    	data.avoidable,
		];

		var table = E('table', { 'class': 'table' });

		for (var i = 0; i < fields.length; i += 2) {
			table.appendChild(E('tr', { 'class': 'tr' }, [
				E('td', { 'class': 'td left', 'width': '33%' }, [ fields[i] ]),
				E('td', { 'class': 'td left' }, [ (fields[i + 1] != null) ? fields[i + 1] : '?' ])
			]));
		}
		return table;

	},
});
