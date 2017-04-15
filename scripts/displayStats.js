function displayStats(stats, names, min, max, high)
{
  var mid = Math.floor(Object.keys(stats).length / 2);
  var table = "<table><tr><td><div class=\"ct-chart ct-square\" style=\"width: 300px;\" id=\"piechart\"></div></td>";
  for (var i = 0; i < mid; i++)
    table += "<td><div class=\"authorname\">" + names[i] + "</div><div \"class=\"ct-chart ct-perfect-fourth\" style=\"height:200px;\" id=\"graphchart" + i + "\"></div></td>";
  table += "</tr><tr>";
  for (var i = mid; i < Object.keys(stats).length; i++)
    table += "<td><div class=\"authorname\">" + names[i] + "</div><div \"class=\"ct-chart ct-perfect-fourth\" style=\"height:200px;\" id=\"graphchart" + i + "\"></div></td>";
  table += "</tr></table>";
  document.getElementById('graphchart').innerHTML = table;

  displayPieChart(stats);

  var i = 0;
  for (key in stats)
  {
    displayGraphChart(stats[key], i, min, max, high);
    i++;
  }
}

function displayGraphChart(stats, i, min, max, high)
{
  var series = [];
  for (var j = 0; j <= i; j++)
    series.push([]);
  
  for (var j = min-1; j <= max; j++)
  {
    if (j in stats)
      series[i].push({x: j-min+1, y: stats[j]});
    else
      series[i].push({x: j-min+1, y: 0});
  }

  var chart = new Chartist.Line('#graphchart' + i, {
    series: series
  }, {
    width:400, 
    height:200,
    low: 0,
    high: high+1,
    showArea: true,
    showPoint: false,
    fullWidth: true,
    axisY: {
      onlyInteger: true
    },
    axisX: {
			type: Chartist.AutoScaleAxis,
			showLabel: false,
			showGrid: false
    }
  });

  var seq = 0, delays = 100, durations = 1000;
  chart.on('draw', function(data) {
    seq++;

    if(data.type === 'line') {
      data.element.animate({
        opacity: {
          begin: seq * delays + 1000,
          dur: durations,
          from: 0,
          to: 1
        }
      });
    } else if(data.type === 'label' && data.axis === 'x') {
      data.element.animate({
        y: {
          begin: seq * delays,
          dur: durations,
          from: data.y + 100,
          to: data.y,
          easing: 'easeOutQuart'
        }
      });
    } else if(data.type === 'label' && data.axis === 'y') {
      data.element.animate({
        x: {
          begin: seq * delays,
          dur: durations,
          from: data.x - 100,
          to: data.x,
          easing: 'easeOutQuart'
        }
      });
    } else if(data.type === 'point') {
      data.element.animate({
        x1: {
          begin: seq * delays,
          dur: durations,
          from: data.x - 10,
          to: data.x,
          easing: 'easeOutQuart'
        },
        x2: {
          begin: seq * delays,
          dur: durations,
          from: data.x - 10,
          to: data.x,
          easing: 'easeOutQuart'
        },
        opacity: {
          begin: seq * delays,
          dur: durations,
          from: 0,
          to: 1,
          easing: 'easeOutQuart'
        }
      });
    } else if(data.type === 'grid') {
      var pos1Animation = {
        begin: seq * delays,
        dur: durations,
        from: data[data.axis.units.pos + '1'] - 30,
        to: data[data.axis.units.pos + '1'],
        easing: 'easeOutQuart'
      };

      var pos2Animation = {
        begin: seq * delays,
        dur: durations,
        from: data[data.axis.units.pos + '2'] - 100,
        to: data[data.axis.units.pos + '2'],
        easing: 'easeOutQuart'
      };

      var animations = {};
      animations[data.axis.units.pos + '1'] = pos1Animation;
      animations[data.axis.units.pos + '2'] = pos2Animation;
      animations['opacity'] = {
        begin: seq * delays,
        dur: durations,
        from: 0,
        to: 1,
        easing: 'easeOutQuart'
      };
      data.element.animate(animations);
    }
  });
}

function displayPieChart(stats)
{
  series = [];
  for (key in stats)
  {
    var sum = 0;
    for (date in stats[key])
      sum += stats[key][date];
    series.push(sum);
  }

  var chart = new Chartist.Pie('#piechart', {
  series: series,
  labels: series
  }, {
    donut: true,
    showLabel: true,
    donutWidth: 30,
    width: 300,
    height: 300
  });

chart.on('draw', function(data) {
  if(data.type === 'slice') {
    var pathLength = data.element._node.getTotalLength();

    data.element.attr({
      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
    });

    var animationDefinition = {
      'stroke-dashoffset': {
        id: 'anim' + data.index,
        dur: 1000,
        from: -pathLength + 'px',
        to:  '0px',
        easing: Chartist.Svg.Easing.easeOutQuint,
        fill: 'freeze'
      }
    };

    if(data.index !== 0)
      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';

    data.element.attr({
      'stroke-dashoffset': -pathLength + 'px'
    });

    data.element.animate(animationDefinition, false);
  }
});
}
