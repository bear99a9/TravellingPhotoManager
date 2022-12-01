import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "src/app/services/auth/auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();

        let headers = req.headers
            .set('Authorization', `Bearer ${authToken}`);
        req = req.clone({
            headers: headers
        });

        return next.handle(req);
    }
}