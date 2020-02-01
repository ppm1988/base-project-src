import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor () {

  }

  ngOnInit () {
    this.removeScripts("bootstrap.min.css", "css");
    this.removeScripts("all.css", "css");
    this.removeScripts("popper.min.js", "js");
    this.removeScripts("jquery-3.3.1.slim.min.js", "js");
    this.removeScripts("bootstrap.min.js", "js");
  }

  removeScripts ( filename, filetype ) {
console.log('removing package ', filename);
    
    let targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none";
    let targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none";
    let allsuspects=document.getElementsByTagName(targetelement)
    for (let i=allsuspects.length; i>=0; i--){
      if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1){
console.log('found ', allsuspects[i]);
        allsuspects[i].parentNode.removeChild(allsuspects[i]);
      }
    }
  }

} // EXPORTS
