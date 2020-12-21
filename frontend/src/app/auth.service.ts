import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"


@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    credentials

    authLogin(credentials): Promise<any> {
        this.credentials = credentials
        return this.http.post('/login/', credentials).toPromise()
    }

    async authAndSubmit(formData): Promise<any> {
        try {
            const authResult = await this.http.post('/login/', this.credentials).toPromise()
            console.log(authResult)
            const postComments = await this.http.post('/share/', formData).toPromise()

        } catch (e) {
            console.log(e)
            throw e
        }

    }
}