     google.load('visualization', '1', {'packages': ['geochart']});
     google.setOnLoadCallback(drawMarkersMap);

      function drawMarkersMap() {
      var data = google.visualization.arrayToDataTable([
        ['City',   'Time'],
        ['Yuanping', 'Hometown'],
        ['Taiyuan','2006-2007'],
        ['Shanghai','2007-2011'],
        ['Beijing','2008,2009,2011,2012,2013']
      ]);

      var options = {
        region: 'CN',
        displayMode: 'markers',
        colorAxis: {colors: ['green', 'blue']}
      };

      var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    };
