var popup = d3.select("#data_popup")
var infoBtn = d3.select("#info_button")

/**
 * Opens the popup with information about the data and makes button to open the popub invisible
 */

d3.select("#info_button").on("click", function(d){
    console.log("open popup")
    popup
        .style("visibility", "visible")
        .style("top",100)
        .style("left",10)
    infoBtn
        .style("visibility", "hidden")
})

/**
 * Closes the popup and makes button for popup visisble again
 * Is called when the 'X' button of the popup is clicked
 */
function closePopup(){
    console.log("close popup")
    popup
        .style("visibility", "hidden")
    infoBtn
        .style("visibility", "visible")
}

