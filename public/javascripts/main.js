'use strict';
$(function() {
    /**
     * CREATE
     */
    $('.createBtn').click(function(e) {
        e.preventDefault();
        var bandData = {
            name: $('input').val()
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(bandData),
            contentType: 'application/json',
            url: '/bandList',
            success: function(result) {
                $('input').val('');
                // The result is html fully baked on the server side. Add to the DOM
                var band = result;
                $('.list-group').prepend(band);
            },
            error: function() {
                displayMsg('POST error');
            }
        });
    });
    /**
     * READ
     */
    $(document).on('click', '.getBtn', function(e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        $.ajax({
            url: '/bandList/' + id,
            type: 'GET',
            success: function(result) {
                displayMsg('Band name: ' + result.bandname + '<br>Create Date: ' + result.createdate);
            },
            error: function() {
                displayMsg('READ error');
            }
        });
    });
    /**
     * UPDATE
     */
    $(document).on('click', '.putBtn', function(e) {
        e.preventDefault();
        var $element = $(this),
            id = $element.attr('data-id');
        $.ajax({
            url: '/bandList/' + id,
            type: 'PUT',
            success: function(result) {
                $($element).closest('li').find('h5').html(result.bandname);
                displayMsg('Update Band Name To: ' + result.bandname + '<br>Create Date: ' + result.createdate);
            },
            error: function() {
                displayMsg('UPDATE error');
            }
        });
    });
    /**
     * DELETE
     */
    $(document).on('click', '.delBtn', function(e) {
        e.preventDefault();
        var $element = $(this),
            id = $element.attr('data-id');
        $.ajax({
            url: '/bandList/' + id,
            type: 'DELETE',
            success: function() {
                $($element).closest('li').fadeOut();
            },
            error: function() {
                displayMsg('DELETE error');
            }
        });
    });
    /**
     * Displays Modal
     * @param  {string} str [Message to display]
     */
    function displayMsg(str) {
        $('.modal-body').html(str);
        $('#myModal').modal();
    }
});
