//@ts-check
"use strict";


const g = $.post(ajaxpath.banddel);
var s = 0;

g.then(d => {
    $("#band_delayer").val(d.d);
    s = Number(d.d);
});

document.getElementById("asiu9W")?.addEventListener("click", function(){
    //@ts-ignore
    const delay = Number($("#band_delayer").val());

    if (delay == s){
        PictoNotifier.notifyError("Same", { do_not_keep_previous: true });
        return;
    }

    if (Number.isNaN(delay)){
        PictoNotifier.notifyError("Error", { do_not_keep_previous: true });
        return;
    }

    intoLoad("setter", "middle");
    $.post("/admin/setter/band_schedule", {
        delay: delay
    })
    .then(() => {
        s = delay;
        PictoNotifier.notifySuccess("Success!!");
    })
    .catch(() => {
        PictoNotifier.notifySuccess("Error: try reloading");
    })
    .always(() => intoLoad("setter", "middle"));
});


document.getElementById("afsiuhoiw")?.addEventListener("click", function(){
    window.location.href = "/admin/login";
});
