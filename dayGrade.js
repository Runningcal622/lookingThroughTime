var data = d3.json("dayGrade.json");
data.then(function(data){
  initializeScreen(data);
}
,
function(err){
  console.log(err);
})

var day = 0;

var margins ={
  top:10,
  bottom:50,
  left:10,
  right:10
}

var initializeScreen = function(data)
{

  var width = 400;
  var height = 400;
  var body = d3.select("body");
  var svg  = body.append("svg")
              .attr("width",width)
              .attr("height",height);

  width = width - margins.left -margins.right;
  height = height-margins.top-margins.bottom;

  var xScale = d3.scalePoint()
                 .domain(["Fred","Sally","Karl","Nancy"])
                 .range([0,width]);
  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([height,0]);


  var barWidth = width/data[day].grades.length;


  var barArea = svg.append("g")
    .selectAll("rect")
    .data(data[day].grades)
    .enter()
    .append("rect")
    .attr("x",function(d,i){
      return i*barWidth;
    })
    .attr("y",function(d){
    return height - d.grade;})
    .attr("width",barWidth-10)
    .attr("height",function(d){
      return d.grade;});

      console.log("before buttons "+day);

  var prevButton = body.append("button").classed("prevButton",true)
  .text("Prev")
  .on("click",function(){updateScreen(day-1,data);});
  console.log("after 1 button "+day);
  var nextButton = body.append("button").classed("nextButton",true)
  .text("Next")
  .on("click",function(){updateScreen(day+1,data);});
  var dayP = body.append("text").text("   "+(day+1)+"  ").classed("dayOn",true);
  console.log("before 2 button "+day);


  console.log("after 2 button "+day);


  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  svg.append("g").classed("xAxis",true)
            .call(xAxis)
            .attr("transform","translate("+(margins.left)+","+(height+margins.top)+")");

  svg.append("g").classed("yAxis",true)
            .call(yAxis);
}


var updateScreen = function(newDay,data)
{
  var width = 400;
  var height = 400;
  width = width - margins.left -margins.right;
  height = height-margins.top-margins.bottom;
  var barWidth = width/data[day].grades.length;


  if (newDay===-1)
  {
    newDay=0;
  }
  if (newDay===10)
  {
    newDay = 9;
  }
  day = newDay;
  var dataAtDay = data[day];
  var barArea = d3.select("svg")
    .selectAll("rect")
    .data(dataAtDay.grades)
    .transition()
    .attr("x",function(d,i){
      return i*barWidth;
    })
    .attr("y",function(d){
    return height - d.grade;})
    .attr("width",barWidth-10)
    .attr("height",function(d){
      return d.grade;});

    var dayP = d3.select(".dayOn").text("    "+(day+1)+"    ");


}
