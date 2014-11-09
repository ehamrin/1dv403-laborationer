"use strict";

function Message(message, date){
    this.getText = function(){
        return message;
    };

    this.setText = function(_text){
        message = _text;
    };

    this.getDate = function(){
        return date;
    };

    this.setDate = function(_date){
        date = _date;
    };
}

//Retrieve Message body formatted as HTML
Message.prototype.getHTMLText = function(){
    return this.getText().replace(/[\n\r]/g, "</br>");
};

//Retrieve Date as formatted string
Message.prototype.getDateText = function(){
    var now = new Date();
    var milliseconds = now - this.getDate();
    var seconds = Math.round(milliseconds/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);
    var days = Math.floor(hours/24);

    if(seconds < 60){
        return "just now";
    }
    else if(minutes == 1){
        return minutes + " minute ago";
    }
    else if(minutes < 60){
        return minutes + " minutes ago";
    }
    else if(days < 1){
        return "Today " + this.getDate().getHours() + ":" + (this.getDate().getMinutes() < 10 ? '0' : '') + this.getDate().getMinutes() + ":" + (this.getDate().getSeconds() < 10 ? '0' : '') + this.getDate().getSeconds();
    }
    else if(days < 2){
        return "Yesterday " + this.getDate().getHours() + ":" + (this.getDate().getMinutes() < 10 ? '0' : '') + this.getDate().getMinutes() + ":" + (this.getDate().getSeconds() < 10 ? '0' : '') + this.getDate().getSeconds();
    }
    else
    {
        return this.getDate().getUTCDate() + "/" + (this.getDate().getMonth() + 1) + " " + this.getDate().getHours() + ":" + (this.getDate().getMinutes() < 10 ? '0' : '') + this.getDate().getMinutes() + ":" + (this.getDate().getSeconds() < 10 ? '0' : '') + this.getDate().getSeconds();
    }
};