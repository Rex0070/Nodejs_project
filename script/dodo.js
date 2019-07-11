const tag = '<button id = Done >Finish!</button>'
const input_tag = '<input type = "text" id = post_out name = "todo" placeholder = "Write Down" autocomplete="off">';
const fin_tag = '<p id=fin>Great !</p>'
$(document).ready(()=>{
    $('#todo_id').click(()=>{ //Finish 클릭 시,
        $.ajax({
            url: '/api/post/db_delete',
            dataType:'json',
            type: 'POST'
        })
        $('#fin_div').append(fin_tag);
        $('#fin').fadeIn(500, setTimeout(() => {
            $('#fin').fadeOut(500);
        }, 1000));
        $('#input_id').append(input_tag);
        $('#Done').fadeOut("normal", ()=>{
            $('#Done').remove();
        }); 
        $('#output').html('');
    })
})

$(document).ready(()=>{
    $('#input_id').keydown((key)=>{ //input Write Down 시,
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

