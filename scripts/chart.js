chartDic = new Array();

function Chart_DataPreprocess(dataObject, YMax) {
    let NanData = [];
    let len = dataObject.length;
    let firestitem = true;
    for (let i =0;i<len;i++)
    {
        NanData[i] = new Object();
        NanData[i].x = dataObject[i].x;
        if(dataObject[i].y.toString() == "Nan")
        {
            NanData[i].y = YMax;
            if(firestitem && i>=0)
            {
                NanData[i-1].y = YMax;
                firestitem = false;
            }
        }
        else
        {
            if(!firestitem)
            {
                firestitem = true;
                NanData[i].y = YMax;
            }
            else
            {
                NanData[i].y = "Nan";
            }
        }
    }

    return NanData;
}
function Chart_New(chartName, canvasObject, dataObject, title, x_title, y_title, YMax)
{
    let NanData = Chart_DataPreprocess(dataObject, YMax);
    chartDic[chartName] = new Array();
    chartDic[chartName][0] = canvasObject;
    chartDic[chartName][1] = new Chart(canvasObject, {
        type: 'line',
        data: {
            datasets: [{
                data:  dataObject,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                pointRadius: 0,
                borderWidth: 1,
                lineTension: 0,
                fill: 'start',
                spanGaps: false
                
            }, {
                label: 'Filled',
                backgroundColor: ['rgba(0,0,0,0.2)'],
                pointRadius: 0,
                borderWidth: 0,
                lineTension: 0,
                data: NanData,
                fill: 'start',
                spanGaps: false
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
                display: true,
                text: title
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        format: 'M-D HH:mm',
                        tooltipFormat: 'M-D HH:mm',
                        minUnit: 'minute',
                        displayFormats: {
                            quarter: 'M D HH:mm'
                        }
                    },
                    
                    ticks:{
                        source: 'auto'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: x_title
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: y_title
                    },
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: YMax
                    }
                }]

            }
        }
    });
    chartDic[chartName][2] = YMax;
}

function Chart_update(chartName, dataObject)
{
    let i = 0;
    chartDic[chartName][1].data.datasets.forEach((dataset) => {
        if(i == 0)
        {
            dataset.data = dataObject;
            i++;
        }else
        {
            dataset.data = Chart_DataPreprocess(dataObject, chartDic[chartName][2]);
        }
    });
    chartDic[chartName][1].update();
}
