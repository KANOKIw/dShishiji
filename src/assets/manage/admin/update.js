//@ts-check
"use strict";


const spt = $.post("/admin/update/spt");
spt.then(d => {
    $("#da9iouj").val(Number(d.d));
});


Array.from(document.getElementsByClassName("yuihgoV")).forEach(function(el){
    el.addEventListener("click", function(){
        const whe = this.getAttribute("path");

        $.post("/admin/update/"+whe)
        .then(() => {
            PictoNotifier.notifySuccess("SUCCESS - "+whe, { do_not_keep_previous:true });
        })
        .catch(() => {
            PictoNotifier.notifyError("ERROR - "+whe, { do_not_keep_previous:true });
        });
    });
});


Array.from(document.getElementsByClassName("yuihgoYTV")).forEach(function(el){
    el.addEventListener("click", function(){
        const whe = this.getAttribute("path");
        const key = this.getAttribute("key");
        const val = Number(this.parentNode.querySelector("input").value);

        $.post("/admin/update/"+whe, {
            [key]: val
        })
        .then(() => {
            PictoNotifier.notifySuccess("SUCCESS - "+whe, { do_not_keep_previous:true });
        })
        .catch(() => {
            PictoNotifier.notifyError("ERROR - "+whe, { do_not_keep_previous:true });
        });
    });
});


document.getElementById("afsiuhoiw")?.addEventListener("click", function(){
    window.location.href = "/admin/login";
});

