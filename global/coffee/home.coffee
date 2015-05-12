template = document.querySelector('#tmpl')
template.user = JSON.parse(localStorage.getItem('user'))
template.page = 'history'
client = new ($.RestClient)('http://lwm.eu01.aws.af.cm/',
  request: (resource, options) ->

    options['beforeSend'] = (request) ->
      request.setRequestHeader 'Authorization', 'Bearer ' + localStorage.getItem('token')
      return

    $.ajax options
  stringifyData: true)
client.add 'me'
client.add 'history'
client.add 'favorites'
client.add 'playlists'

template.selectAction = (e, detail) ->
  if detail.isSelected
    selectedItem = detail.item
    switch selectedItem.getAttribute('route')
      when 'history'
        $('#spinner').attr 'active', ''
        client.history.read().done (data, textStatus, xhrObject) ->
          console.log data
          $('#spinner').removeAttr 'active'
          template.historyItems = data
          return
      when 'favorites'
        $('#spinner').attr 'active', ''
        client.favorites.read().done (data, textStatus, xhrObject) ->
          console.log data
          $('#spinner').removeAttr 'active'
          template.favoriteSongs = data
          return
      when 'playlists'
        $('#spinner').attr 'active', ''
        client.playlists.read().done (data, textStatus, xhrObject) ->
          console.log data
          $('#spinner').removeAttr 'active'
          template.userPlaylists = data
          return
      when 'settings'
        # - $("#spinner").attr("active", "");
        # - client.me.read().done(function (data, textStatus, xhrObject) {
        # -     console.log(data);
        # -     $("#spinner").removeAttr("active");
        # -     template.userSettings = data.settings;
        # - });
        return
  return

Polymer()
