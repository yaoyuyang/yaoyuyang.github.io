google.load('visualization', '1', {'packages': ['geochart']});
google.setOnLoadCallback(drawMarkersMap);

 function drawMarkersMap() {
 var data = google.visualization.arrayToDataTable([
   ['City',    'Details'],
   ['Yuanping', 'Yuanping\rMiddle and high school here'],
   ['Taiyuan', 'Taiyuan\nStayed a year after high school graduation'],
   ['Shanghai', 'Collge study at SJTU'],
   ['Beijing', 'Visited several times'],
   ['Dalian', 'A beautiful city'],
   ['Shenyang','Visited while in college'],
   ['Shijiazhuang','best friend\'s hometown'],
   ['Jinan','Baotuquan'],
   ['Taian','The gorgeous moutain'],
   ['Yinchuan','A northwest perl']
 ]);

 var options = {
   region: 'CN',
   displayMode: 'markers',
   colorAxis: {colors: ['green','blue']}
 };

 var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
 chart.draw(data, options);
};
