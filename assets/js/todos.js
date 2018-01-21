
var str_btn_selector = "h1 span i";
var str_input_selector = "input[type='text']";
var str_ul_selector = ".todo-list";
var str_li_selector = "li";
var str_delete_btn_selector = "li span i";
var str_display_selector = "#signal";

function alertAction(input_text, type) {
    var alert_type;
    if(type === "success"){
        alert_type = "alert-success";
    }else if(type === "danger"){
        alert_type = "alert-danger"
    }else if(type === "warning"){
        alert_type = "alert-warning";
    }else{
        alert_type = "alert-info";
    }

    var alert_tab = $(str_display_selector);
    alert_tab.addClass(alert_type);
    alert_tab.text(input_text);
    alert_tab.fadeToggle().delay(400).fadeToggle(function () {
        alert_tab.removeClass(alert_type);
    });
}
function addNewTodo(){
    var input_text = $(str_input_selector).val();
    if(isValidTodo(input_text)){
        $(str_ul_selector).append("<li><span class='icond'><i class='fa fa-trash delete'></i></span><span class='text-span'>" + input_text +"</span></li>");
        alertAction("TODO: " + input_text + " added", "success");
    }else{
        //Do not add the todo. Optionally show some negative response.
        alertAction("Please enter a TODO", "warning");
    }
    $(str_input_selector).val("");
}

function isValidTodo(input_text){
    // The regular expression /\s/g gets whitespaces
    if(!input_text.replace(/\s/g, '').length){
        return false;
    }else{
        return true;
    }
}

$(str_btn_selector).on("click", function() {
    $(str_input_selector).fadeToggle(500, function() {
        console.log("Fade complete.");
    });
});

$(str_input_selector).on("keypress", function (event) {
    if(event.which === 13){
        addNewTodo();
    }
});

$(str_ul_selector).on("click", str_delete_btn_selector, function () {
    //$(this).parent().parent() selects the UL -> LI text.
    var li = $(this).parent().parent();
    li.remove();
    //May need to remove this line when using fontawesome.
    var text = li.text();
    alertAction("TODO: " + text + " deleted!", "danger");
});

$(str_ul_selector).on("click", str_li_selector ,function(){
    $(this).toggleClass("strike-off");
});