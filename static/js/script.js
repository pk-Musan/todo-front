var url = "http://127.0.0.1:8000/api/todos";
var tasks = [];

function getText(){
    $.ajax({
        type: "GET",
        url: url,
        datatype: JSON,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(response){
        tasks = [];
        for(var i=0; i<response.length; i++)
            tasks[i] = response[i].memo;
        showTask();
    }).fail(function(){
        alert('Task受信に失敗しました')
    });
}

function postText(){
    const new_task = $("#new_task").get(0).value;
    if(new_task == ""){
        alert("入力してください");
        return;
    }

    console.log(new_task);

    var data = {
        memo: new_task,
        status: 0
    };

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        datatype: JSON,
        cache: false,
        contentType: false,
        scriptCharset: 'utf-8'
    }).done(function(response){
        tasks = [];
        for(var i=0; i<response.length; i++)
            tasks[i] = response[i].memo;
        clearText();
        showTask();
    }).fail(function(){
        alert('Task送信に失敗しました')
    });
}

function showTask(){
    $("#list").empty('');

    var fragment = document.createDocumentFragment();

    for(var i=0; i<tasks.length; i++){
        var $li = document.createElement('li');
        var task = document.createTextNode(tasks[i]);
        $li.appendChild(task);
        fragment.appendChild($li);
    }

    $("#list").get(0).appendChild(fragment);
}

function clearText(){
    $("#new_task").get(0).value = "";
}

function init(){
    getText();
}

init();