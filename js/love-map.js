var data = [
     {name: '株洲', value: ['2017.12.01','第一次相遇']},
     {name: '武功山', value: ['2018.03','登顶金顶']},
     {name: '上海', value: ['2018.05','上海迪士尼打卡']},
     {name: '东京', value: ['2018.08','东京拍婚纱照']}
];
var geoCoordMap = {
    '株洲':[113.08172,27.840571],
    '武功山':[114.135944,27.495319],
    '上海':[121.671964,31.148267],
    '东京':[139.745,35.658]
};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

option = {
    backgroundColor: '#A7B1CA',
    title: {
    },
    tooltip: {
        trigger: 'item',
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1,
        formatter: function (params) {
            name = params.name
            time = params.value[2]
            describe = params.value[3]
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                + name
                + '</div>'
                + time
                + '<br>'
                + describe;
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: false,
        itemStyle: {
            normal: {
                areaColor: '#fff',
                borderColor: '#C9CED9'
            },
            emphasis: {
                areaColor: '#DFE0E3'
            }
        }
    },
    series : [
        {
            name: '足迹',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: '#FD8888',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }
    ]
};

var myChart = echarts.init(document.getElementById("myMap"));
myChart.setOption(option);
