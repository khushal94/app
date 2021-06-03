import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';
export const API_Path = "http://localhost/medicaladmin/public/api/";
export const IMG_Path = "http://localhost/medicaladmin/public/imgs/";
@Injectable()

export class ApiService {
    public loadervar: any;
    constructor(public http: HttpClient, public toast: ToastController, public loader: LoadingController) {

    }

    POST(URL, DATA) {
        return this.http.post<any>(API_Path + '' + URL, DATA);
    }

    GET(URL) {
        return this.http.get<any>(API_Path + '' + URL);
    }

    showToast(msg, duration) {

        this.toast.create({
            message: msg,
            duration: duration
        }).then((toastData) => {
            toastData.present();
        });
    }

    Get_UserData() {

        var data = localStorage.getItem('userdata');
        data = JSON.parse(data);
        return data;

    }

    Get_UserId() {

        var data: any = localStorage.getItem('userdata');
        data = JSON.parse(data);
        return data.user_id;

    }

    Get_DateOnly(datep) {
        var date = new Date(datep);
        return date.toLocaleDateString();
    }

    Get_DateTimeLocal(datep) {
        var date = new Date(datep);
        return date.toLocaleString();
    }

    async LoaderShow(type, msg) {
        let options: any = { message: msg, }

        if (type == 1) {
            let loadervar = await this.loader.create(options);
            await loadervar.present();
        } else {
            this.closeLoader()
        }
    }

    async closeLoader() {
        // Instead of directly closing the loader like below line
        // return await this.loadingController.dismiss();
        
        this.checkAndCloseLoader();
        
        // sometimes there's delay in finding the loader. so check if the loader is closed after one second. if not closed proceed to close again
        setTimeout(() => this.checkAndCloseLoader(), 1000);
        
      }
    
      async checkAndCloseLoader() {
       // Use getTop function to find the loader and dismiss only if loader is present.
       const loader = await this.loader.getTop();
       // if loader present then dismiss
        if(loader !== undefined) { 
          await this.loader.dismiss();
        }
      }

}