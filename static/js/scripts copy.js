// Function used in time/distance selection
function DistancesViewModel() {
    this.distances = [
                      { label: "10 min", time: 10},
                      { label: "15 min", time: 15},
                      { label: "20 min", time: 20},
                      { label: "25 min", time: 25}
                      ];
    this.chosenDistance = ko.observable();
    this.resetDistance = function() {this.chosenDistance(null) }
}
ko.applyBindings (new DistancesViewModel() );

