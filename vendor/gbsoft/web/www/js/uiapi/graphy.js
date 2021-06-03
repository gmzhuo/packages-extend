function createCpuChart(parameter)
{
	return new Highcharts.Chart({
			chart: {
				renderTo: parameter.container,
				height: parameter.height,
				width: parameter.width,
				type: 'spline',
			},
			title: {
				text: null
			},
			subtitle: {
				text: null
			},
			xAxis: {
				type: 'datetime',
			},
			yAxis: {
				title: {
					text: 'CPU负荷 (%)'
				},
				min: 0,
				max: 100,
			},
			tooltip: {
				formatter: function() {
					return '<b>'+ this.series.name +'</b><br/>'+
						Highcharts.dateFormat('%d %H:%M:%S', this.x) +': '+ this.y +' %';
				}
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				name: '1分钟平均',
				data: [
					
				]
				}, {
				name: '5分钟平均',
				data: [
					
				]
				}]
		});
}


function createMemChart(parameter)
{
	return new Highcharts.Chart({
			chart: {
				renderTo: parameter.container,
				height: parameter.height,
				width: parameter.width,
				type: 'spline',
			},
			title: {
				text: null
			},
			subtitle: {
				text: null
			},
			xAxis: {
				type: 'datetime',
			},
			yAxis: {
				floor: 0,
				ceiling: 100,
				title: {
					text: '内存空闲 (%)'
				},
				min: 0,
				max: 100,
			},
			tooltip: {
				formatter: function() {
					return '<b>'+ this.series.name +'</b><br/>'+
						Highcharts.dateFormat('%d %H:%M:%S', this.x) +': '+ Highcharts.numberFormat(this.y, 2) +' %';
				}
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				name: '内存空闲',
				data: [
					
				]
				}, {
				name: '缓存空闲',
				data: [
					
				]
				}]
		});
}

function createThroughputChart(parameter)
{
	function bandwidth_label(bytes, br)
	{
		var uby = 'KByte';
		var kby = (bytes / 1024);

		if (kby >= 1024)
		{
			uby = 'MByte';
			kby = kby / 1024;
		}

		var ubi = 'KBit';
		var kbi = (bytes * 8 / 1024);

		if (kbi >= 1024)
		{
			ubi = 'MBit';
			kbi = kbi / 1024;
		}

		return Highcharts.numberFormat(kby, 2) + " " + uby + "/s";
	}

	return new Highcharts.Chart({
			chart: {
				renderTo: parameter.container,
				height: parameter.height,
				width: parameter.width,
				type: 'spline',
			},
			title: {
				text: null
			},
			subtitle: {
				text: null
			},
			xAxis: {
				type: 'datetime',
			},
			yAxis: {
				title: {
					text: '网络流量 (KB)'
				},
				min: 0
			},
			tooltip: {
				formatter: function() {
					return '<b>'+ this.series.name +'</b><br/>'+
						Highcharts.dateFormat('%d %H:%M:%S', this.x) +'<br/>'+ 
						bandwidth_label(this.y, 0);
				}
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				name: '上行流量',
				data: [
					
				]
				}, {
				name: '下行流量',
				data: [
					
				]
				}]
		});
}

function createHostPieChart(parameter)
{
	var dp = [
		['主机1', 1.0], ['主机2', 1.0], 
		['主机3', 1.0], ['主机4', 1.0], ['其他主机', 1.0]];

	//return null;
	return new Highcharts.Chart({
		chart: {
			renderTo: parameter.container,
			height: parameter.height,
			width: parameter.width,
		},
		title: {
			text:null
		},
		tooltip: {
			formatter: function() {
				return '<b>'+ this.point.name +'</b>: '+ 
					Highcharts.numberFormat(this.percentage, 2) +' %';
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					color: '#000000',
					connectorColor: '#000000',
					formatter: function() {
						return '<b>' + this.point.name + '</b>: ' + 
						Highcharts.numberFormat(this.percentage, 2) + ' %';
					}
				}
			}
		},
		series: [{
			type: 'pie',
			name: 'Browser share',
			data: (function() {
				// generate an array of random data
				var data = [];
				data = dp;
				return data;
			})()
		}]
	});
	return Highcharts.Chart({
		chart: {
			renderTo: parameter.container,
			height: parameter.height,
			width: parameter.width
		},
	});
	/*
		title: {
			text:null
		},
		tooltip: {
			formatter: function() {
				return '<b>'+ this.point.name +'</b>: '+ 
					Highcharts.numberFormat(this.percentage, 2) +' %';
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					color: '#000000',
					connectorColor: '#000000',
					formatter: function() {
						return '<b>' + this.point.name + '</b>: ' + 
						Highcharts.numberFormat(this.percentage, 2) + ' %';
					}
				}
			}
		},
		series: [{
			type: 'pie',
			name: 'Browser share',
			data: (function() {
				// generate an array of random data
				var data = [];
				data = dp;
				return data;
			})()
		}]
	*/
}
