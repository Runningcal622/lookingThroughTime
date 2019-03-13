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
  left:50,
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
 var colors = d3.scaleOrdinal(d3.schemeDark2);

  var barArea = svg.append("g")
    .selectAll("rect")
    .data(data[day].grades)
    .enter()
    .append("rect")
    .attr("x",function(d,i){
      return i*barWidth + margins.left;
    })
    .attr("y",function(d){
    return height + margins.top - yScale(100 - d.grade);})
    .attr("width",barWidth-10)
    .attr("height",function(d){
      return  yScale(100 - d.grade);})
      .attr("fill",function(d){return colors(d.name)});

      console.log("before buttons "+day);

  var prevButton = body.append("button").classed("prevButton",true)
  .text("Prev")
  .on("click",function(){updateScreen(day-1,data, yScale);});
  console.log("after 1 button "+day);
  var nextButton = body.append("button").classed("nextButton",true)
  .text("Next")
  .on("click",function(){updateScreen(day+1,data, yScale);});
  var dayP = body.append("text").text("   "+(day+1)+"  ").classed("dayOn",true);
  console.log("before 2 button "+day);


  console.log("after 2 button "+day);


  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);



  svg.append("g").classed("yAxis",true)
            .call(yAxis)
            .attr("transform","translate("+(margins.left)+","+(margins.top)+")");

  var legend = svg.append("g")
                  .classed("legend",true)
                  .attr("transform","translate("+(margins.left)+"," +(margins.top+ height +10)+")");

  var legendLines = legend.selectAll("g")
                          .data(data[day].grades)
                          .enter()
                          .append("g")
                          .classed("legendLine",true)
                          .attr("transform",function(d,i)
                          {return "translate("+(15+i*80)+",0)";})

        legendLines.append('text')
              .attr("x",function(d,i){
                 console.log(d); return (i*10);
               })
               .attr("y",10)
                .text(function(d) {return d.name})
}


var updateScreen = function(newDay,data, yScale)
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
      return i*barWidth + margins.left;
    })
    .attr("y",function(d){
    return height + margins.top - yScale(100 - d.grade);})
    .attr("width",barWidth-10)
    .attr("height",function(d){
      return  yScale(100 - d.grade);});

    var dayP = d3.select(".dayOn").text("    "+(day+1)+"    ");


}
