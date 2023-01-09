
import { useLayoutEffect } from 'react';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function ClusteredBarChart() {
  useLayoutEffect(() => {
    const root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));

    var legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50
    }))

    var data = [{
      year: "Turkey",
      income: 23.5,
      expenses: 18.1
    }, {
      year: "India",
      income: 26.2,
      expenses: 22.8
    }, {
      year: "Rusian",
      income: 30.1,
      expenses: 23.9
    }, {
      year: "Serbia",
      income: 29.5,
      expenses: 25.1
    }, {
      year: "Greek",
      income: 24.6,
      expenses: 25
    }];
    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "year",
      renderer: am5xy.AxisRendererY.new(root, {
        inversed: true,
        cellStartLocation: 0.1,
        cellEndLocation: 0.9
      })
    }));

    yAxis.data.setAll(data);

    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {}),
      min: 0
    }));


    function createSeries(field, name) {
      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: field,
        categoryYField: "year",
        sequencedInterpolation: true,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "[bold]{name}[/]\n{categoryY}: {valueX}"
        })
      }));
      series.columns.template.setAll({
        height: am5.p100
      });


      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            centerY: am5.p50,
            text: "{valueX}",
            populateText: true
          })
        });
      });

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            centerX: am5.p100,
            centerY: am5.p50,
            text: "{name}",
            fill: am5.color(0xffffff),
            populateText: true
          })
        });
      });


      series.data.setAll(data);

      series.appear();

      return series;
    }

    createSeries("income", "Income");
    createSeries("expenses", "Expenses");


   


    chart.appear(1000, 100);


    return () => {
      root.dispose()
    }
  }, [])


  return (
    <div id="chartdiv" style={{ width: "600px", height: "500px" }}></div>
  );

}

export default ClusteredBarChart;
