d3.select("#info_button").on("click", function(d){
    //openDataPopup()
    console.log("open popup")
    var mouse = d3.pointer(event)
    console.log(mouse)
    var popup = d3.select("#data_popup")
        .style("visibility", "visible")
        .style("top",100)
        .style("left",10)
})

var dataWrapper =document.getElementById("dataWrapper")

/*var tooltip = d3.select("#data_popup")
    .style("position", "absolute")
    .style("visibility", "hidden");*/
/*
function openDataPopup(){
    console.log("open popup")
    var popup = d3.select("#data_popup")
        .style("visibility", "visible")
        .style("top",dataWrapper.offsetTop+90+"px")
        .style("left",dataWrapper.offsetLeft+10+"px")
}*/

function closePopup(){
    console.log("close popup")
    var popup = d3.select("#data_popup")
        .style("visibility", "hidden")
}