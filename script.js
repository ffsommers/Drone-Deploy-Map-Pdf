$("#pdf-container").on("click",function(){
  dronedeployApiInitialze()
    .then(window.dronedeploy.Plans.getCurrentlyViewed)
    .then(fetchTileDataFromPlan)
    .then(getTilesFromResponse)
    .then(sendTileDataToNodeServer);
    .then(generatePDF)
    .catch(console.log);
  
}); 

function fetchTileDataFromPlan(plan) {
  // assumed the default layerName as 'ortho' and zoom level as 16
  return window.dronedeploy.Tiles.get({planId: String(plan.id), layerName: 'ortho', zoom: 16});
}

function getTilesFromResponse(tileResponse) {
  return tileResponse.tiles;
}

function sendTileDataToNodeServer(tiles) {
  const url = 'https://dronenode.herokuapp.com/tiles/';
  const body = JSON.stringify({
    'tile': tiles
  });
  return fetch(url, {
    method: 'POST',
    headers : new Headers({
        'Content-Type': 'application/json'
    }),
    body: body
  })
    .then((res) => res.json())
    .then((rjson) => rjson);
}
