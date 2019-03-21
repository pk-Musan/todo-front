var url = "http://";
var tasks = [];

function postText(){
    const new_task = $("#new_task").get(0).value;
    if(new_task == ""){
        alert("Task入力してや");
        return;
    }

    $.ajax({
        type: "POST",
        url: url,
        data: new_task,
        datatype: JSON,
        cache: false,
        contentType: false,
        processData: false,
    }).done(function(response){
        tasks = response.memo;
        showTask();
    }).fail(function(){
        alert("fail");
    });
}

function getText(){
    $.ajax({
        type: "GET",
        url: url/*,
        datatype: JSON,
        cache: false,
        contentType: false,
        processData: false,*/
    }).done(function(response){
        /*
        tasks = [];
        for(var i=0; i<response.length; i++)
            tasks[i] = response.memo[i];
        */
        tasks = response.memo;
        showTask();
    }).fail(function(){
        alert("fail");
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

function init(){
    showTask();
}

init();
getText();