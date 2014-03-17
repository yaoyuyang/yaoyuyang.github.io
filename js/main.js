google.load('visualization', '1', {'packages': ['geochart']});
google.setOnLoadCallback(drawMarkersMap);

 function drawMarkersMap() {
 var data = google.visualization.arrayToDataTable([
   ['City',   'Duration', 'Details'],
   ['Yuanping', 6, 'Middle and high school here'],
   ['Taiyuan', 1, 'Stayed a year after high school graduation'],
   ['Shanghai', 4, 'Collge study at SJTU'],
   ['Beijing', 0.2, 'Visited several times'],
   ['Dalian', 0.1, 'A beautiful city'],
   ['Shenyang',0.1],
   ['Shijiazhuang',0.1],
   ['Jinan',0.1],
   ['Taian',0.1],
   ['Yinchuan',0.1]
 ]);

 var options = {
   region: 'CN',
   displayMode: 'markers',
   colorAxis: {colors: ['green']}
 };

 var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
 chart.draw(data, options);
};
