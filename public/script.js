$(function () {

    var socket = io();

    $('.input').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    $('.namechange').submit(function(){
        socket.emit('change name', $('#namechange').val());
        $('#namechange').val('');
        return false;
    });
    
    socket.on('chat message', function(msg){
        if (msg != "") {
            $('#messages').append($('<li>').text(msg));
        }
    });

    $('button').click(function(){
        socket.emit('change name');
        return false;
    });


});