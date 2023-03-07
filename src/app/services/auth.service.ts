import {Injectable} from '@angular/core';
import {
  ListUsersCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import {Auth} from 'aws-amplify';
import {SharedService} from "../shared/shared.service";

import {environment} from "../../environments/environment";

export interface IUser {
  username: string;
  email: string;
  password: string;
  showPassword: boolean;
  admin: boolean;
  code: string;
  firstName: string;
  lastName: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private shared: SharedService) { }

  async signUp(user: IUser): Promise<any> {
    const username = user.username;
    const password = user.password;
    const email = user.email;
    const admin = user.admin?'Y':'N';
    const firstName = user.firstName;
    const lastName = user.lastName;

    return await Auth.signUp({
      username,
      password,
      attributes: {
        'email': email,
        'custom:admin':admin,
        'custom:firstName':firstName,
        'custom:lastName':lastName
      }
    });
  }

  async confirmSignUp(user: IUser): Promise<any> {
    return await Auth.confirmSignUp(user.username, user.code);
  }

  async signIn(user: IUser): Promise<any> {
    return await Auth.signIn(user.username, user.password);
  }

  async signOut(): Promise<any> {
    return await Auth.signOut();
  }

  public isAuthenticated(): Promise<boolean> {
    return this.getCurrentAuthenticatedUser()
      .then((user: any) => {
        return !!user;
      }).catch(() => {
        return false;
      });
  }

  async getCurrentAuthenticatedUser(): Promise<any> {
    let response = await Auth.currentAuthenticatedUser();
    return this.shared.populateUser(response);
  }
  async getAllUsers() {
    const client = new CognitoIdentityProviderClient({ region: environment.region/*, accessKeyId: ''*/ })

    const command = new ListUsersCommand({
      UserPoolId: environment.cognito.userPoolId
    });

    //Auth.
    return await client.send(command);
  }

  public async isAdmin() {
    const user = await this.getCurrentAuthenticatedUser();
    return user.admin;
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
      .then((cognitoUser: any) => {
        return Auth.updateUserAttributes(cognitoUser, user);
      });
  }
}
