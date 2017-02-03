$("#pdf-container").on("click",function(){
  dronedeployApiInitialze()
    .then(window.dronedeploy.Plans.getCurrentlyViewed)
    .then(fetchTileDataFromPlan)
    .then(processResponse)
    .then(sendTileDataToNodeServer);
    .then(generatePDF)
    .catch(console.log);
  
});

function dronedeployApiInitialze() {
  return new Promise((resolve) => {
    window.dronedeploy.onload(() => {
      resolve();
    });
  });
} 

function fetchTileDataFromPlan(plan) {
  return window.dronedeploy.Tiles.get({planId: String(plan.id), layerName: 'ortho', zoom: 16});
}

function processResponse(response) {
  return response.tiles;
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
