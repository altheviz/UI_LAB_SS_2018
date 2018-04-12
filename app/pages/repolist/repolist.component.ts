import { Component, ElementRef, NgZone, OnInit, ViewChild,  Input, ChangeDetectionStrategy } from "@angular/core";
import { TextField } from "ui/text-field";
import { Http, Headers, URLSearchParams } from "@angular/http";
import { ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {Router} from "@angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import {Repository} from "../../shared/grocery/repository";
let cache = require("nativescript-cache");
var Toast = require("nativescript-toast");
@Component({
  selector: "cache",
  moduleId: module.id,
  templateUrl: "./repolist.html",
  styleUrls: ["./repolist-common.css", "./repolist.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RepolistComponent  implements OnInit{
  isLoading = false;
  listLoaded = false;
    repos = new ObservableArray<Repository>();
    urls = {0: "https://api.github.com/orgs/google/repos", 1: "https://api.github.com/orgs/microsoft/repos" , 2: "https://api.github.com/orgs/nodejs/repos"};
  constructor(private router: Router, private zone: NgZone, private http: Http, private route: ActivatedRoute) {
  }
   ngOnInit() {
       this.isLoading = true;
       let id = this.route.snapshot.params["id"];
       let timer = Date.now();
       let time = -1;
       let cachedRes = cache.get(this.urls[id]);
       if(cachedRes) {
           this.generateList(JSON.parse(cachedRes));
           this.isLoading = false;
           this.listLoaded = true;
           time = Date.now() - timer;
           Toast.makeText("cached: " + time + " ms").show()
       } else {
           this.http.get(this.urls[id], {})
               .map(res => res.json())
               .subscribe(res => {
                   cache.set(this.urls[id], JSON.stringify(res));
                   this.generateList(res);
                   this.isLoading = false;
                   this.listLoaded = true;
                   time = Date.now() - timer;
                   Toast.makeText("interwebz: " + time + " ms").show()
               });
       }

    }
    codeSite() {
        this.router.navigate(["/cache"]);
    }

     logout() {
        let dialogs = require("ui/dialogs");
        dialogs.confirm({
            title: "Logout",
            message: "Wollen Sie sich wirklich ausloggen?",
            okButtonText: "Ja",
            cancelButtonText: "Nein"
        }).then((result) => {
        if(result){
           this.router.navigate([""]);
           }
        });
        }

        public onItemTap(args) {
        let repoCount = 0;
        this.repos.forEach((repo) => {
           if(repoCount == args.index){
            alert(repo.url);
           }
           repoCount++;
           });
        }

         private generateList(responseJson){
          this.repos = new ObservableArray();
            responseJson.forEach((repo) => {
                this.repos.push(new Repository(repo.full_name, repo.html_url));
            });
         }
}

// Name und Html url
