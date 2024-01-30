import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from '../../../Models/photos';
import { UserService } from '../../../_service/user.service';
import { AuthService } from '../../../_service/Auth.service';
import { photoDto } from '../../../Models/photoToUploadDTO';
import { AlertifyService } from '../../../_service/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit {
 
  @Input()photos:Photo[] | undefined
  @Output() memberPhotoChange=new EventEmitter<string>();


  imageUrl:string=''
  fileToUpload:any
  test:any
  selectedImage=false
  currentMain: Photo | undefined

  constructor(private uerService:UserService,private auth:AuthService,
    private alertfay:AlertifyService){}
  ngOnInit(): void {
    
  }

    //upload image
    handelDileInput(file:FileList){
      this.fileToUpload=file.item(0)
      var reader=new FileReader();
      reader.onload=(event:any)=>{
        this.imageUrl=event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      console.log('img ', this.imageUrl)
      console.log('esm el soraaa: '+ this.fileToUpload)
    }
    onSubmit(Image: any){
      this.uerService.UploadImage(this.fileToUpload,this.auth.decodedToken.userId).subscribe({
        next:(res)=>{
          console.log('id el sora ',res)
          this.selectedImage=false
          const photo:Photo={
            id:res.id,
            url:res.url,
            dateAdded:res.dateAdded,
            description:res.description,
            isMain:res.isMain

          }
          this.photos?.push(photo)
          // setTimeout( ()=>{
          //   window.location.reload()
          //   }, 1000)
        },
        error:(error)=>{
          console.log(error)
        }
      })
     }
    slected(){
      this.selectedImage=true
    }

    //set to main
    setMainPhoto(photo:Photo){
      this.uerService.setMainPhoto(this.auth.decodedToken.userId,photo.id).subscribe({
        next:(res)=>{
          this.currentMain=this.photos?.filter(p=>p.isMain===true)[0]
          photo.isMain=true
          if(this.currentMain?.isMain===true)
          {
            this.currentMain.isMain=false
          }
          this.memberPhotoChange.emit(photo.url)
          
          this.alertfay.success('photo set to main successfully')
        },
        error:(error)=>{
          this.alertfay.error(error)
        }
      })
    }
}