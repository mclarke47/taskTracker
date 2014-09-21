/**
 * Created by matthew on 20/09/14.
 */

initalTaskId =0;
lastFocus =null;

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
jQuery(function($){
    $(document).ready(function(){

        $('#deleteTask').click(function(){

            if(lastFocus!=null){
                lastFocus.remove();
                $('#deleteTask').attr("disabled", true);
            }

        });

        $('#addTask').click(function() {
            $('body').append("<div tabindex=\"-1\" class=\"task\" id=\"task"+ ++initalTaskId + "\"></div>");

            //Add events to task
            var newTaskId = "#task"+initalTaskId;
            $(newTaskId).on("click", function(){
               // $(this).text("id="+this.id);
                $(this).focus();
            });

            $(newTaskId).draggable();

            $(newTaskId).on("focus", function(){
                lastFocus = $(this);
                $('#deleteTask').removeAttr("disabled");
            });

            /*$(newTaskId).on("focusout", function(){
                $('#deleteTask').attr("disabled", true);
            });*/
        });
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