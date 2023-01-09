
import { useLayoutEffect } from 'react';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function VarianceIndicators() {
    useLayoutEffect(() => {
        const root = am5.Root.new("chart-variant");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            layout: root.verticalLayout
        }));
        var data = [{
            year: "Turkey",
            europe: 780,
            value: 600
        }, {
            year: "India",
            europe: 400,
            value: 900
        }, {
            year: "Greenland",
            europe: 600,
            value: 1800
        }, 
        {
            year: "USA",
            europe: 500,
            value: 670
        }];

        for (var i = 0; i < (data.length - 1); i++) {
            data[i].valueNext = data[i + 1].value;
        }

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "year",
            renderer: am5xy.AxisRendererX.new(root, {
                cellStartLocation: 0.1,
                cellEndLocation: 0.9,
                minGridDistance: 30
            }),
            tooltip: am5.Tooltip.new(root, {})
        }));

        xAxis.data.setAll(data);
        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            min: 0,
            renderer: am5xy.AxisRendererY.new(root, {})
        }));

        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            categoryXField: "year"
        }));

        series.columns.template.setAll({
            tooltipText: "{categoryX}: {valueY}",
            width: am5.percent(90),
            tooltipY: 0
        });
        series.data.setAll(data);

        var series1 = chart.series.push(am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "europe",
            categoryXField: "year"
        }));

        series1.columns.template.setAll({
            tooltipText: "{categoryX}: {valueY}",
            width: am5.percent(90),
            tooltipY: 0
        });
        series1.data.setAll(data);

        // Variance indicator series
        var series2 = chart.series.push(am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "europe",
            openValueYField: "value",
            categoryXField: "year",
            fill: am5.color(0x555555),
            stroke: am5.color(0x555555)
        }));

        series2.columns.template.setAll({
            width: 1
        });

        series2.data.setAll(data);
        
        series2.bullets.push(function () {
            var label = am5.Label.new(root, {
                text: "{valueY}",
                fontWeight: "500",
                fill: am5.color(0x00cc00),
                centerY: am5.p100,
                centerX: am5.p50,
                populateText: true
            });

            // Modify text of the bullet with percent
            label.adapters.add("text", function (text, target) {
                var percent = getVariancePercent(target.dataItem);
                return percent ? percent + "%" : text;
            });

            // Set dynamic color of the bullet
            label.adapters.add("centerY", function (center, target) {
                return getVariancePercent(target.dataItem) < 0 ? 0 : center;
            });
            label.adapters.add("fill", function (fill, target) {
                return getVariancePercent(target.dataItem) < 0 ? am5.color(0xcc0000) : fill;
            });

            return am5.Bullet.new(root, {
                locationY: 1,
                sprite: label
            });
        });

        series2.bullets.push(function () {
            var arrow = am5.Graphics.new(root, {
                rotation: -90,
                centerX: am5.p50,
                centerY: am5.p50,
                dy: 3,
                fill: am5.color(0x555555),
                stroke: am5.color(0x555555),
                draw: function (display) {
                    display.moveTo(0, -3);
                    display.lineTo(8, 0);
                    display.lineTo(0, 3);
                    display.lineTo(0, -3);
                }
            });
            arrow.adapters.add("rotation", function (rotation, target) {
                return getVariancePercent(target.dataItem) < 0 ? 90 : rotation;
            });

            arrow.adapters.add("dy", function (dy, target) {
                return getVariancePercent(target.dataItem) < 0 ? -3 : dy;
            });

            return am5.Bullet.new(root, {
                locationY: 1,
                sprite: arrow
            })
        })
        series.appear();
        chart.appear(1000, 100);


        function getVariancePercent(dataItem) {
            if (dataItem) {
                var value = dataItem.get("valueY");
                var openValue = dataItem.get("openValueY");
                var change = value - openValue;
                return Math.round(change / openValue * 100);
            }
            return 0;
        }


        return () => {
            root.dispose()
        }
    }, [])


    return (
        <div id="chart-variant" style={{ width: "1500px", height: "500px" }}></div>
    );

}

export default VarianceIndicators;
