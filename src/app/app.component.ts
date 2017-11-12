import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

interface Post {
  title: string;
  content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chats: FirebaseListObservable<any[]>;
  
  constructor(public af: AngularFireDatabase) {
    this.chats = af.list('chats');
    
  }

  botAI:{index: number,id: string, response: string, contents: any}[] = [
    {index: 1,id: 'Welcome',response: 'Hi, Welcome to ChefRef', contents: ['HI','HELLO','HOLA','HAI']},
    {index:2,id: 'Error',response: 'Hi, I am sorry. I am still in the learning phase', contents: []},
  ];
  messageInput: string;
  responseMsg: string;
  sendMessage(){
    let message = {
      status: true,
      message: this.messageInput,
      date: new Date().toString()
    }
    this.chats.push(message);
    
    setTimeout(()=>{   
          this.checkResponse(this.messageInput);
          this.messageInput = '';
    },1000);
    
  }

  checkResponse(msg){
    
    for(let i=0; i< this.botAI.length; i++){
      if(this.botAI[i].contents.includes(msg.toUpperCase())){
        this.responseMsg = this.botAI[i].response;
        break;
      }else{
        this.responseMsg = 'Hi, I am sorry. I am still in the learning phase';
        break;
      }
    }
    let response = {
      status: false,
      message: this.responseMsg,
      date: new Date().toString()
    }
    this.chats.push(response);
  }
}
