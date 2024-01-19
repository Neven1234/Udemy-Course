import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/UserDTO';
import { UserService } from '../../../_service/user.service';
import { AlertifyService } from '../../../_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../../Models/photos';
import { animate, style, transition, trigger,AnimationEvent } from '@angular/animations';
import { transform } from 'typescript';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit {
  user:User={
    id: 0,
    username: '',
    knownAs: '',
    age: 0,
    gender: '',
    created: new Date,
    lastActive: new Date,
    photoUrl: '',
    city: '',
    country: '',
    lookingFor: ''
  }
  imges:string[]=[
    'https://randomuser.me/api/portraits/women/7.jpg',
    'https://randomuser.me/api/portraits/women/17.jpg',
  ]
  previewImage=false
  showMask=false
  showCount=true
  currentLightboxImage=this.imges[0]
  currentIndex=0
  controles=true
  totalImageCount=0

  constructor(private userService:UserService,private alertify:AlertifyService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.LoadeUser()
   
   
  }
  LoadeUser(){
    return this.userService.GetUser(+this.route.snapshot.params['id']).subscribe({
      next:(result)=>{
        this.user=result
        this.getImages()
        console.log(this.user.photoUrl)
      },
      error:(error)=>{
        console.log(error)
        this.alertify.error(error)
      }
    })
  }
  getImages(){
    
    this.user.photos?.forEach(photo=>{
      this.imges.push(photo.url)
    })
    this.totalImageCount=this.imges.length
  }
  onPreviewImage(index:number){
    this.showMask=true
    this.previewImage=true
    this.currentIndex=index
    this.currentLightboxImage=this.imges[index]
  }

 
  onClosePreview(){
    this.previewImage=false
    this.showMask=false
  }
  prev(){
    this.currentIndex=this.currentIndex-1
    if(this.currentIndex<0)
    {
      this.currentIndex=this.imges.length-1
    }
    this.currentLightboxImage=this.imges[this.currentIndex]
  }
  next(){
    this.currentIndex=this.currentIndex+1
    if(this.currentIndex>this.imges.length-1)
    {
      this.currentIndex=0
    }
    this.currentLightboxImage=this.imges[this.currentIndex]
  }
}
