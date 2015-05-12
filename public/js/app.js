(function() {
  var client, template;

  template = document.querySelector('#tmpl');

  template.user = JSON.parse(localStorage.getItem('user'));

  template.page = 'history';

  client = new $.RestClient('http://lwm.eu01.aws.af.cm/', {
    request: function(resource, options) {
      options['beforeSend'] = function(request) {
        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
      };
      return $.ajax(options);
    },
    stringifyData: true
  });

  client.add('me');

  client.add('history');

  client.add('favorites');

  client.add('playlists');

  template.selectAction = function(e, detail) {
    var selectedItem;
    if (detail.isSelected) {
      selectedItem = detail.item;
      switch (selectedItem.getAttribute('route')) {
        case 'history':
          $('#spinner').attr('active', '');
          client.history.read().done(function(data, textStatus, xhrObject) {
            console.log(data);
            $('#spinner').removeAttr('active');
            template.historyItems = data;
          });
          break;
        case 'favorites':
          $('#spinner').attr('active', '');
          client.favorites.read().done(function(data, textStatus, xhrObject) {
            console.log(data);
            $('#spinner').removeAttr('active');
            template.favoriteSongs = data;
          });
          break;
        case 'playlists':
          $('#spinner').attr('active', '');
          client.playlists.read().done(function(data, textStatus, xhrObject) {
            console.log(data);
            $('#spinner').removeAttr('active');
            template.userPlaylists = data;
          });
          break;
        case 'settings':
          return;
      }
    }
  };

  Polymer();

}).call(this);
