google.load('visualization', '1', {'packages': ['geochart']});
google.setOnLoadCallback(drawMarkersMap);

function drawMarkersMap() {
 var dataAsia = google.visualization.arrayToDataTable([
   ['City',  'Duration'],
   ['Yuanping', 6],
   ['Taiyuan',1],
   ['Shanghai',4],
   ['Beijing',0.5],
   ['Dalian', 0.1],
   ['Shenyang',0.1],
   ['Shijiazhuang', 0.1],
   ['Hangzhou', 0.1],
   ['Ningbo', 0.1],
   ['Suzhou', 0.1],
   ['Nanjing', 0.1],
   ['Jinan', 0.1],
   ['Taian', 0.1],
   ['Qufu', 0.1],
   ['Yinchuan', 0.1],
   ['Lanzhou', 0.1],
   ['Dunhuang', 0.1],
   ['Jiayuguan', 0.1],
   ['Changsha', 0.1],
   ['Seoul',0.1]
 ]);
  var dataUSA = google.visualization.arrayToDataTable([
   ['City',  'Duration'],
   ['Seattle', 2],
   ['Portland',0.1],
   ['Boston',0.1],
   ['Charlottesville',0.8],
   ['Washington DC', 0.1],
   ['Los Angles',0.1]
 ]);


 var optionsAsia = {
   region: '030',
   displayMode: 'markers',
   colorAxis: {colors: ['#e7711c', '#4374e0']}
 };
 var optionsUSA = {
   region: 'US',
   displayMode: 'markers',
   colorAxis: {colors: ['#e7711c', '#4374e0']}
 };

 var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
 chart.draw(dataAsia, optionsAsia);
 var chart2 = new google.visualization.GeoChart(document.getElementById('map_usa'));
 chart2.draw(dataUSA,optionsUSA);
};
