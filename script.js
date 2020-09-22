var removeButtonHover = function () {
  $('p').closest('.row').hover(function () {
    $(this).find('button').css('opacity', '1')
  }, function () {
    $(this).find('button').css('opacity', '0')
  })
}

// display active list function
var displayActive = function () {
  $('[type=checkbox]').each(function (index, element) {
    if ($(element).prop('checked')) {
      $(element).closest('.row').hide()
    } else {
      $(element).closest('.row').show()
    }
  })
}

// display completed list function
var displayCompleted = function () {
  $('[type=checkbox]').each(function (index, element) {
    if (!$(element).prop('checked')) {
      $(element).closest('.row').hide()
    } else {
      $(element).closest('.row').show()
    }
  })
}

// display all list function 
var displayAll = function () {
  $('[type=checkbox]').each(function (index, element) {
    $(element).closest('.row').show()
  })
}

$(document).ready(function () {
  // get lists from the server
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=188',
    dataType: 'json',
    success: function (response, textStatus, errorMessage) {
      response.tasks.forEach(function (element, index) {
        var content = element.content;
    if (element.completed) {
      // add checkbox input to checked property
      $('.container.px-3').append('<div class="row py-3">' +
      '<div class="col-1">' + 
      '<input type="checkbox" checked ' + 'index="'+ element.id + '">' +
      '</div>' +
      '<div class="col"><p class="task-content">' + content + '</p></div>' + 
      '<button class="btn btn-danger remove">Remove</button>' + 
      '</div>');
    } else {
      $('.container.px-3').append('<div class="row py-3">' +
      '<div class="col-1">' + 
      '<input type="checkbox" index="' + element.id + '">' +
      '</div>' +
      '<div class="col"><p class="task-content">' + content + '</p></div>' + 
      '<button class="btn btn-danger remove">Remove</button>' + 
      '</div>');
    }
    // add remove button hover
    removeButtonHover();
    // imitate to click all
    $('#all').click()
      })
    } 
  })
  
  // if it checked make line-through to it's corresponding paragraph
  $(document).on('input','[type=checkbox]', function () {
   if ($(this).prop('checked')) {
    $(this).parent().next().children('p').css('text-decoration', 'line-through')
   } else {
    $(this).parent().next().children('p').css('text-decoration','none')
   }
  })

  // remove element function 
  $(document).on('click', 'button.remove', function () {
    
    var id = $(this).siblings('.col-1').children('input').attr('index');
    $.ajax({
      type: 'DELETE',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=188',
      dataType: 'json'
    })

   $(this).closest('.row').remove()
  })

  // active button clicked
  $('#active').click(function () {
    displayActive();
    $(this).siblings('button').css({
      'background-color': 'white',
      color: 'black'
    });
    $(this).css({
      'background-color': 'black',
      color: 'white'
    })
  })

  // completed button clicked
  $('#completed').click(function () {
    displayCompleted()
    $(this).siblings('button').css({
      'background-color': 'white',
      color: 'black'
    });
    $(this).css({
      'background-color': 'black',
      color: 'white'
    })
  })

  // all button clicked
  $('#all').click(function () {
    displayAll()
    $(this).siblings('button').css({
      'background-color': 'white',
      color: 'black'
    });
    $(this).css({
      'background-color': 'black',
      color: 'white'
    })
  })

  // add item to the DOM and server
  $('#add-button').click(function () {
    var input = $(this).prev().val();
    if (input) {
      $('.container.px-3').append('<div class="row py-3">' +
    '<div class="col-1">' + 
    '<input type="checkbox">' +
    '</div>' +
    '<div class="col"><p class="task-content">' + input + '</p></div>' + 
    '<button class="btn btn-danger remove">Remove</button>' + 
    '</div>');
    removeButtonHover()

    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=188',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        task: {
          content: input
        }
      })
    })
    }
    })
    
})