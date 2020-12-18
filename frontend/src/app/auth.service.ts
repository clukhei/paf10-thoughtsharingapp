import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
    constructor(private http: HttpClient){}

    authLogin(credentials): Promise<any> {
        return this.http.post('/login/', credentials ).toPromise()
    }
}