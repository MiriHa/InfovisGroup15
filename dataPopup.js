/**
 *  Info text of used data
 */

var popup = d3.select("#data_popup")
var infoBtn = d3.select("#info_button")
//var closeBtn = d3.select("close popup")
var scrollDownBtn = d3.select("#arrow")

infoBtn.on("click", function(d){
    //openDataPopup()
    console.log("open popup")
    //var mouse = d3.pointer(event)
    //console.log(mouse)
    popup
        .style("visibility", "visible")
        .style("top",100)
        .style("left",10)
    infoBtn
        .style("visibility", "hidden")
})

/*var dataWrapper = document.getElementById("dataWrapper")
var tooltip = d3.select("#data_popup")
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
    popup
        .style("visibility", "hidden")
    infoBtn
        .style("visibility", "visible")
}

function scrollDown(){
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
}

