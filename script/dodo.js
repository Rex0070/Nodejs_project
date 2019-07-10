const tag = '<button id = Done >Finish!</button>'
const input_tag = '<input type = "text" id = post_out name = "todo" placeholder = "TODO" autocomplete="off">';

$(document).ready(()=>{
    $('#todo_id').click(()=>{
        $.ajax({
            url: '/api/post/db_delete',
            dataType:'json',
            type: 'POST'
        })
        alert("GREAT!");
        $('#input_id').append(input_tag);
        $('#Done').fadeOut("normal", ()=>{
            $('#Done').remove();
        }); 
        $('#output').html('');
    })
})

$(document).ready(()=>{
    $('#input_id').keydown((key)=>{
        if(key.keyCode == 13){
            $.ajax({
                url: '/api/post',
                dataType: 'json',
                type: 'POST',
                data : {data : $('#post_out').val()},
                success : ((result)=>{
                    $('#output').html(result.result);
                })
            })
            $('#post_out').fadeOut("normal", ()=>{
                $('#post_out').remove();
            });
            $('#todo_id').append(tag);     
        }
    })
})

