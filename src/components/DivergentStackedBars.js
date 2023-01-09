
import { useLayoutEffect } from 'react';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function DivergentStackedBars() {
    useLayoutEffect(() => {
        const root = am5.Root.new("chart-div");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: root.horizontalLayout,
                arrangeTooltips: false
            })
        );


        root.numberFormatter.set("numberFormat", "#.#s'%");


        var legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            })
        );
        var data = [{
            category: "Search engines",
            negative1: -30,
            positive2: 0
        }, {
            category: "Online encyclopedias",
            negative1: -2,
            negative2: -4,
            positive1: 19,
            positive2: 75
        }, {
            category: "Peers",
            negative1: -2,
            negative2: -10,
            positive1: 46,
            positive2: 42
        }, {
            category: "Social media",
            negative1: -2,
            negative2: -13,
            positive1: 33,
            positive2: 52
        }, {
            category: "Study guides",
            negative1: -6,
            negative2: -19,
            positive1: 34,
            positive2: 41
        }, {
            category: "News websites",
            negative1: -3,
            negative2: -23,
            positive1: 49,
            positive2: 25
        }, {
            category: "Textbooks",
            negative1: -5,
            negative2: -28,
            positive1: 49,
            positive2: 18
        }, {
            category: "Librarian",
            negative1: -14,
            negative2: -34,
            positive1: 37,
            positive2: 16
        }, {
            category: "Printed books",
            negative1: -9,
            negative2: -41,
            positive1: 38,
            positive2: 12
        }, {
            category: "Databases",
            negative1: -18,
            negative2: -36,
            positive1: 29,
            positive2: 17
        }, {
            category: "Student search engines",
            negative1: -17,
            negative2: -39,
            positive1: 34,
            positive2: 10
        }];
        var yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "category",
                renderer: am5xy.AxisRendererY.new(root, {
                    inversed: true,
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9
                })
            })
        );

        yAxis.data.setAll(data);

        var xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
                calculateTotals: true,
                min: -100,
                max: 100,
                renderer: am5xy.AxisRendererX.new(root, {
                    minGridDistance: 50
                })
            })
        );
        var xRenderer = yAxis.get("renderer");
        xRenderer.axisFills.template.setAll({
            fill: am5.color(0x000000),
            fillOpacity: 0.05,
            visible: true
        });


        function createSeries(field, name, color) {
            var series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    xAxis: xAxis,
                    yAxis: yAxis,
                    name: name,
                    valueXField: field,
                    valueXShow: "valueXTotalPercent",
                    categoryYField: "category",
                    sequencedInterpolation: true,
                    stacked: true,
                    fill: color,
                    stroke: color,
                    calculateAggregates: true
                })
            );

            series.columns.template.setAll({
                height: am5.p100
            });
            series.bullets.push(function (root, series) {
                return am5.Bullet.new(root, {
                    locationX: 0.5,
                    locationY: 0.5,
                    sprite: am5.Label.new(root, {
                        fill: am5.color(0xffffff),
                        centerX: am5.p50,
                        centerY: am5.p50,
                        text: "{valueX}",
                        populateText: true,
                        oversizedBehavior: "hide"
                    })
                });
            });

            series.data.setAll(data);
            series.appear();

            return series;
        }
        var positiveColor = root.interfaceColors.get("positive");
        var negativeColor = root.interfaceColors.get("negative");

        createSeries("negative1", "Never", negativeColor);
        createSeries("positive2", "Very often", positiveColor);

        var legend = chart.children.push(
            am5.Legend.new(root, {
                centerY: am5.p50,
                y: am5.p50,
                layout: root.verticalLayout,
                marginLeft: 50
            })
        );
        legend.data.setAll(chart.series.values);


        chart.appear(1000, 100);


        return () => {
            root.dispose()
        }
    }, [])


    return (
        <div id="chart-div" style={{ width: "900px", height: "500px" }}></div>
    );

}

export default DivergentStackedBars;
