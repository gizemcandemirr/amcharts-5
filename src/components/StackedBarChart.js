
import { useLayoutEffect } from 'react';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function StackedBarCart() {
    useLayoutEffect(() => {
        const root = am5.Root.new("chartdivv");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);
        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: root.verticalLayout,
                arrangeTooltips: false
            })
        );


        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        var legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            })
        );
        var data = [
            {
                age: "85+",
                male: -40,
            },

            {
                age: "70-74",
                female: 30
            },

            {
                age: "50-54",
                female: 25
            },
            {
                age: "45-49",
                male: -28,
            },

            {
                age: "25-29",
                male: -36,
            },

        ];
        var yRenderer = am5xy.AxisRendererY.new(root, {})
        yRenderer.labels.template.set('visible', false)
       
        var yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "age",
                renderer: yRenderer
            })
        );
     

        yAxis.data.setAll(data);

        var xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererX.new(root, {})
            })
        );
        var positiveColor = root.interfaceColors.get("positive");
        var negativeColor = root.interfaceColors.get("negative");

        function createSeries(field, labelCenterX, pointerOrientation, rangeValue, color, disabled) {
            var series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueXField: field,
                    categoryYField: "age",
                    ariaHidden: true,
                    openValueYField:disabled,
                    sequencedInterpolation: true,
                    clustered: false,
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: pointerOrientation,
                        labelText: "{categoryY}: {valueX}"
                    })

                })
            );
       
          
            series.columns.template.setAll({
                height: 40,
                fill: color,
                stroke: color,
                

            })

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationX: 1,
                    locationY: 0.5,
                    sprite: am5.Label.new(root, {
                        centerY: am5.p50,
                        text: "{valueX}",
                        populateText: true,
                        centerX: labelCenterX
                    })
                });
            });

            series.data.setAll(data);
            series.appear();
            var rangeDataItem = xAxis.makeDataItem({
                value: rangeValue
            });
            xAxis.createAxisRange(rangeDataItem);



            return series;
        }



        createSeries("male", am5.p100, "right", -3, negativeColor,false);
        createSeries("female", 0, "left", 4, positiveColor,true);



        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "zoomY"
        }));
        cursor.lineY.set("forceHidden", true);
        cursor.lineX.set("forceHidden", true);


        chart.appear(1000, 100);


        return () => {
            root.dispose()
        }
    }, [])


    return (
        <div id="chartdivv" style={{ width: "800px", height: "500px" }}></div>
    );

}

export default StackedBarCart;
