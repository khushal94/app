import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingController, ToastController} from '@ionic/angular';
export const API_Path = "http://localhost/medicaladmin/public/api/";
export const IMG_Path = "http://localhost/medicaladmin/public/imgs/";
@Injectable()

export class ApiService {
    constructor(public http: HttpClient, public toast: ToastController) {

    }

    POST(URL, DATA){
        return this.http.post<any>(API_Path+''+URL, DATA);
    }

    GET(URL){
        return this.http.get<any>(API_Path+''+URL);
    }

    showToast(msg, duration){

        this.toast.create({
            message: msg,
            duration: duration
        }).then((toastData) =>{
            toastData.present();
        });
    }

    Get_UserData(){
        
        var data = localStorage.getItem('userdata');
        data = JSON.parse(data);
        return data;

    }

    Get_UserId(){
        
        var data:any = localStorage.getItem('userdata');
        data = JSON.parse(data);
        return data.user_id;

    }

    Get_DateOnly(datep){
        var date = new Date(datep);
       return date.toLocaleDateString();
    }
}