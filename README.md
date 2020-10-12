# Link

## How to run 
>ionic state restore <br>
>npm install <br>

Android App:
>ionic build --prod <br>
>npx cap sync <br>
>npx cap open android <br>
<br>

Web App: <br>
>ionic build --prod <br>
>ionic serve <br>


## Common Errors

Firebase Auth
Error:app.auth is not a function angular/angularfire

Solution:
> npm uninstall firebase @angular/fire --save <br>
> npm install firebase @angular/fire --save
