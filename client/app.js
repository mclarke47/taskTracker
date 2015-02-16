/**
 * Created by matthew on 20/09/14.
 */

initalTaskId =0;
lastFocus =null;
endpoint = "http://localhost:8080/taskTracker/v1/";
taskPostEndpoint = endpoint+"task";
taskListGetEndpoint = endpoint+"me/tasks";

function editTaskText(keyCode, existing) {
    switch(keyCode){

        case 8:
            return existing = existing.substring(0, existing.length-1);
        break;
        case 13:
            return existing = existing + "\n"; //replace with nested divs
        break;
        default:
            return existing = existing + String.fromCharCode(keyCode);
        break;
    }

}
function postTask(lastFocus) {

    var data = {};
    data.taskText = lastFocus.context.innerText;

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: taskPostEndpoint,
        success: function(data) {
            console.log('success');
            console.log(JSON.stringify(data));
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
        }
    });
}

function deleteTask() {

    $.ajax({
        type: 'DELETE',
        contentType: 'application/json',
        url: taskPostEndpoint,
        success: function(data) {
            console.log(JSON.stringify(data));
            lastFocus.remove();
            $('#deleteTask').attr("disabled", true);
        }
    });

}

function getMyTasks() {

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: taskListGetEndpoint,
        success: function(data) {
            console.log('success');
            console.log(JSON.stringify(data));
            JSON.parse(data).forEach(function(entry) {
                addTask(entry.taskText);
            });

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
        }
    });

}

function addTask(text) {
    $('body').append("<div tabindex=\"-1\" class=\"task\" id=\"task"+ ++initalTaskId + "\"></div>");

    //Add events to task
    var newTaskId = "#task"+initalTaskId;
    $(newTaskId).on("click", function(){
        $(this).focus();
    });

    $(newTaskId).draggable();

    $(newTaskId).on("focus", function(){
        lastFocus = $(this);
        $('#deleteTask').removeAttr("disabled");
        $('#saveTask').removeAttr("disabled");
    });

    $(newTaskId).text(text);
}

$(function($){


    $(document).ready(function(){

        $('#deleteTask').click(function(){

            if(lastFocus!=null){
                deleteTask();
            }

        });

        $('#saveTask').click(function(){

            if(lastFocus!=null){
                postTask(lastFocus);
            }

        });


        $('#addTask').click();

        getMyTasks();


    });

    $(document).keydown(function(e){
        var element = $("#"+document.activeElement['id']);

        if(element !=null && element.hasClass("task")){
            var existing = element.text();
            var newText = editTaskText(e.keyCode, existing);
            element.text(newText);
        }

    });



});