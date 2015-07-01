(function ($) {

  // Load the Visualization API and the barchart package.
  google.load('visualization', '1.0', {
    'packages': ['corechart']
  });

  var mapDrugsIntoColorIndices = {};

  // Set a callback to run when the Google Visualization API is loaded.

  // Callback that creates and populates a data table,
  // instantiates the bar chart, passes in the data and
  // draws it.
  function drawChart(colors, data) {
    // Create the data table.
    var numBars = data.length;
    var computedHeight = 28 * numBars;
    var data = google.visualization.arrayToDataTable(data);
    // Set chart options
    var chartAreaHeight = data.getNumberOfRows() * 30;
    var chartHeight = chartAreaHeight + 80;

    var options = {
      chartArea: {'top': 0, 'width': '100%'},
      height: chartHeight,
      vAxis:{textStyle:{color: '#005500',fontSize: '11'}},
      legend: {position: 'none'},
      bar: {groupWidth: '75%'},
      chartArea: {'width': '70%', 'height': chartAreaHeight,},
      colors: colors,
      isStacked: true,
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(document.getElementById('drug-chart'));
    chart.draw(data, options);
    $(window).resize(function () {
      chart.draw(data, options);
    });
  }

  // Callback that creates and populates a data table,
  // instantiates the bar chart, passes in the data and
  // draws it.
  function drawPieChart(colors, data) {
    // Create the data table.
    var data = google.visualization.arrayToDataTable(data);
    // Set chart options
    var options = {
      title: 'Comparative Prescription Volume',
      subtitle: 'From AHRQ MEPS Data',
      height: 400,
      width: 400,
      legend: {
        position: 'bottom'
      },
      colors: colors,
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('pie-chart'));
    chart.draw(data, options);
    $(window).resize(function () {
      chart.draw(data, options);
    });
  }

  // Sorts (descending), an object that has numeric keys
  function sortObjectByValue(obj) {
    var sortable = [];
    for (var k in obj) {
      sortable.push([k, obj[k]]);
    }
    sortable.sort(function (a, b) {
      return b[1] - a[1]
    });
    return sortable;
  }

  $(document).ready(function () {
    // Build our autocomplete
    $.ajax({
      url: "https://api.sideeffect.io/v1/ahrq",
      dataType: 'json',
    }).success(function (data) {
      var source = $.map(data, function (term) {
        return term
      });

      $("#drug").autocomplete({
        source: source,
      });
    });

    var drugChart;
    var count = 0;

    // Add predictable color patterns for bars.
    var silver = '#F7F7F7';
    var grain = '#CECECE';
    var rain = '#75787b';
    var chrono = '#5D6B75';
    var ocean = '#007FAA';
    var sky = '#3FA9F5';
    var grass = '#00A159';

    var silver2 = '#e2dfdf';
    var grain2 = '#Cfdfdf';
    var rain2 = '#799999';
    var chrono2 = '#5b6e7b';
    var ocean2 = '#007777';
    var sky2 = '#3Fffff';
    var grass2 = '#00cccc';

    var silver3 = '#787878';
    var grain3 = '#Cacaca';
    var rain3 = '#75587b';
    var chrono3 = '#5D2222';
    var ocean3 = '#005aaA';
    var sky3 = '#3FaAdd';
    var grass3 = '#039051';

    var bgColor = [ocean, grass, rain, sky, grain, chrono,
		   ocean2, grass2, rain2, sky2, grain2, chrono2,
		   ocean3, grass3, rain3, sky3, grain3, chrono3
		  ];

    appendItems();
    addItems();
    $('#add-to-list').click(function () {
      if ($('#drug').val().length) {
        appendItems();
        addItems();
      }
    });

    // Used for grabbing url query.
    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function appendItems() {
      // Build our checkbox toggles.
      if ($('.added-drug').length != -1) {
        var checks = $('.added-drug').length;
      } else {
        var checks = 0;
      }

      // Build fron query if it exists.
      if (getParameterByName('saved') && count == 0 && !$('#drug').val().length) {
        var savedItems = getParameterByName('saved');
        var savedItemsArr = savedItems.split(' ');
        for (i = 0; i < savedItemsArr.length; i++) {
          $('#added-meds').append('<div class="checkholder" id="' + savedItemsArr[i] + '"><input type="checkbox" checked="checked" value="' + savedItemsArr[i] + '" class="added-drug ' + savedItemsArr[i] + '">' + '<label for="' + savedItemsArr[i] + '">' + savedItemsArr[i] + '</label>' + '<div class="check-color" data-color="' + bgColor[i] + '" style="background: ' + bgColor[i] + '"></div></div>');
        }
      }
      // Build from input.
      else {
        $('#added-meds').append('<div class="checkholder" id="' + $('#drug').val() + '"><input type="checkbox" checked="checked" value="' + $('#drug').val() + '" class="added-drug ' + $('#drug').val() + '">' + '<label for="' + $('#drug').val() + '">' + $('#drug').val() + '</label>' + '<div class="check-color" data-color="' + bgColor[checks] + '" style="background: ' + bgColor[checks] + '"></div></div>');
      }
    }


    $('.added-drug').each(function () {
      $(this).click(function () {
        addItems();
      });
    });

    $(document).change(function () {
      $('.added-drug').each(function () {
        $(this).click(function () {
          addItems();
        });
      });
    });

    function addItems() {
      $('#error').empty();
      var url = 'http://localhost:2095/v1/combined';
      $('#clear-all').removeClass('hidden');
      $.each($('.added-drug:checked'), function () {
        url += '/' + $(this).val();
      });
      $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
          console.log(data.fda);
          var chartdata = $.map(data.fda.data, function(drugs, symptom) {
            var row = $.map(data.fda.status, function(status, drug) {
              if (drugs.drug) {
                return drug;
              }
              return 0;
            });
            row.unshift(symptom)
            return [row];
          });
          header = Object.keys(data.fda.status);
          header.unshift("Drugs");
          chartdata.unshift(header);
          console.log(chartdata);
          drawChart(bgColor, chartdata);
        },
        error: function(data) {
          console.log(data);
        }
      });
    };

    $('input').keypress(function (e) {
      var key = e.which;
      if (key == 13) // the enter key code
      {
        $('#add-to-list').click();
      }
    });
  })
})(jQuery);
