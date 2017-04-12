function displayStats(stats)
{
  displayPieChart(stats);
  for (var i = 0; i < Object.keys(stats).length; i++)
    document.getElementById("graphchart").innerHTML+= "<div \"class=\"ct-chart ct-perfect-fourth\" id=\"graphchart" + i + "\"></div>";

  var i = 0;
  for (key in stats)
  {
    displayGraphChart(stats[key], i);
    i++;
  }
}

function displayGraphChart(stats, i)
{
  var labels = [];
  var series = [];
  for (key in stats)
  {
    labels.push(key);
    series.push(stats[key]);
  }
  new Chartist.Line('#graphchart' + i, {
    labels: labels,
    series: [series]
  }, {
    width:400, 
    height:200,
    low: 0,
    showArea: true,
    lineSmooth: Chartist.Interpolation.simple({
    divisor: 2
    }),
    axisY: {
      onlyInteger: true,
      offset: 20
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
    // Get the total path length in order to use for dash array animation
    var pathLength = data.element._node.getTotalLength();

    // Set a dasharray that matches the path length as prerequisite to animate dashoffset
    data.element.attr({
      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
    });

    // Create animation definition while also assigning an ID to the animation for later sync usage
    var animationDefinition = {
      'stroke-dashoffset': {
        id: 'anim' + data.index,
        dur: 2000,
        from: -pathLength + 'px',
        to:  '0px',
        easing: Chartist.Svg.Easing.easeOutQuint,
        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
        fill: 'freeze'
      }
    };

    // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
    if(data.index !== 0)
      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';

    // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
    data.element.attr({
      'stroke-dashoffset': -pathLength + 'px'
    });

    // We can't use guided mode as the animations need to rely on setting begin manually
    // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
    data.element.animate(animationDefinition, false);
  }
});
}
