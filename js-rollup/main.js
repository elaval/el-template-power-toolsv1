App.aux.tsv("data/data.txt", function(data) {
  
  App.dataService.observer.next(data);

})

