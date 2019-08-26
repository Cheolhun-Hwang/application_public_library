// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["IT/컴퓨터", "한국소설", "외국소설", "경제/정치", "교육", "에세이"],
    datasets: [{
      data: [16, 20, 16, 16, 16, 16],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#F3ECD1', 'pink'],
    }],
  },
});
