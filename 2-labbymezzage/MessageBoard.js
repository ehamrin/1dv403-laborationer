"use strict";

function MessageBoard(containerId, title){
    console.log(title);
    title = (title !== null ? title : 'LabbyMezzages');

    this.rootId = document.getElementById(containerId);
    var that = this;
    this.messages = [];

    var labbyHeader = document.createElement("header");
    var labbyHeaderText = document.createElement("h1");
    labbyHeaderText.innerHTML = title;
    labbyHeader.appendChild(labbyHeaderText);
    this.rootId.appendChild(labbyHeader);

    var labbyMain = document.createElement("div");
    labbyMain.className = "labbyMezzageArea";
    this.rootId.appendChild(labbyMain);

    var labbymezzageCount = document.createElement("div");
    labbymezzageCount.className = "labbyMezzageCount";
    this.rootId.appendChild(labbymezzageCount);

    var labbyTextArea = document.createElement("textarea");
    labbyTextArea.className = "labbyMezzageContent";
    labbyTextArea.onkeypress = function(e){
        if(e.keyCode == 13){
            if(!e.shiftKey){
                e.preventDefault();
                that.addMessage();
            }
        }
    };

    this.rootId.appendChild(labbyTextArea);

    var labbySubmit = document.createElement("button");
    labbySubmit.className = "submitBtn";
    var submitText = document.createTextNode("Send");
    labbySubmit.appendChild(submitText);

    this.rootId.appendChild(labbySubmit);


    this.addMessage = function(){
        var textArea = that.rootId.getElementsByClassName("labbyMezzageContent")[0];

        that.messages.push(new Message(textArea.value, new Date()));

        textArea.value = '';

        that.renderMessages();
    };

    labbySubmit.onclick = function(){
        that.addMessage();
        that.rootId.getElementsByClassName("labbyMezzageContent")[0].focus();
    };

    this.renderMessage = function(message, count){
        var messageMain = document.createElement("section");

        var messageRemove = document.createElement("img");
        messageRemove.alt="Close Message";
        messageRemove.src ="images/Close.png";
        messageRemove.onclick = function(){
            if (window.confirm("Do you want to remove the message?")) {
                that.messages.splice(count, 1);
                that.renderMessages();
            }
        };
        messageMain.appendChild(messageRemove);

        var messageTime = document.createElement("img");
        messageTime.alt="View time information";
        messageTime.src ="images/Clock.png";
        messageTime.onclick = function(){
            alert("Message created on: (" + message.getDate() + ")");
        };
        messageMain.appendChild(messageTime);

        var messageText = document.createElement("p");
        messageText.innerHTML = message.getHTMLText();
        messageMain.appendChild(messageText);

        var messageDate = document.createElement("date");
        messageDate.innerHTML = message.getDateText();
        messageMain.appendChild(messageDate);

        return messageMain;
    };

    this.renderMessages();

}

MessageBoard.prototype.numberOfMessages = function(){
        return this.messages.length + " messages";
};

MessageBoard.prototype.renderMessages = function(){
    var messageArea = this.rootId.getElementsByClassName("labbyMezzageArea")[0];
    var messageCount = this.rootId.getElementsByClassName("labbyMezzageCount")[0];

    messageArea.innerHTML = "";
    var count = 0;

    var messageContent = '';
    var that = this;
    this.messages.forEach(function(message){
        messageArea.appendChild(that.renderMessage(message, count));
        count++;
    });

    messageArea.scrollTop = messageArea.scrollHeight;

    messageCount.innerHTML = this.numberOfMessages();
};