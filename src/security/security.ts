import { AppResource, IAppResource } from "../common/common";
import { DbFields } from "../data/data";
import { Contact, IContact } from "../models/person/person";

export interface IUserGroup {
    groupName: string; 
    appId: string; 
}

export interface IUser {
    userName: string; 
    photoURL: string | null | undefined; 
    displayName?: string | null | undefined; 
    registeredEmail?: string | null | undefined; 
    registeredMobile?: string | null | undefined; 
    isApproved?: boolean | null | undefined; 
    lastOTP?: string | null | undefined; 
    emailVerified?: boolean | null | undefined; 
    mobileVerified?: boolean | null | undefined; 
    isAnonymous: boolean | null | undefined; 
    lastLoginAt?: string | null | undefined; 
    privacyAgreedOn: Date | null | undefined;  
    privacyAgreeDevice: {
        deviceIP?: string | null | undefined, 
        deviceID?: string | null | undefined, 
        deviceOS?: string | null | undefined,
        deviceName?: string | null | undefined
    } | null | undefined; 
    tncAgreedOn: Date | null | undefined; 
    tncAgreeDevice: {
        deviceIP?: string | null | undefined; 
        deviceID?: string | null | undefined; 
        deviceOS?: string | null | undefined; 
        deviceName?: string | null | undefined; 
    } | null | undefined; 
    contactId?: IContact | null | undefined; 
    appAccess?: string[] | null | undefined; 
    userGroups?: string[] | null | undefined; 
}

export interface IUserProfile {
    user: IUser, 
    contact: IContact, 
}

export interface IAppResourceAccess {
    user: IUser; 
    group: IUserGroup; 
    appResource: IAppResource; 
    view: boolean; 
    edit: boolean; 
    add: boolean; 
    delete: boolean; 
    execute: boolean; 
}

/****************************************
 * User Groups: Includes full detail of groups. 
*****************************************/
export class UserGroup extends DbFields implements IUserGroup {
    public groupName: string = ""; 
    public appId: string = ""; 
}

/****************************************
 * User Profile: Includes full detail of a user. 
*****************************************/

export class User extends DbFields implements IUser {
    public userName: string = "";
    public photoURL: string | null | undefined; 
    public displayName: string | null | undefined;  
    public registeredEmail?: string | null | undefined; 
    public registeredMobile?: string | null | undefined; 
    public isApproved?: boolean | null | undefined; 
    public lastOTP?: string | null | undefined; 
    public emailVerified?: boolean | null | undefined; 
    public mobileVerified?: boolean | null | undefined; 
    public isAnonymous: boolean | null | undefined; 
    public lastLoginAt?: string | null | undefined; 
    public privacyAgreedOn: any | null | undefined;  
    public privacyAgreeDevice: {
        deviceIP?: string | null | undefined, 
        deviceID?: string | null | undefined, 
        deviceOS?: string | null | undefined,
        deviceName?: string | null | undefined
    } | null | undefined; 
    public tncAgreedOn: any | null | undefined; 
    public tncAgreeDevice: {
        deviceIP?: string | null | undefined; 
        deviceID?: string | null | undefined; 
        deviceOS?: string | null | undefined; 
        deviceName?: string | null | undefined; 
    } | null | undefined; 
    public contact?: Contact | null | undefined; 
    public appAccess?: string[] | null | undefined; 
    public userGroups?: string[] | null | undefined;  
    
    constructor() { super(); }
}

export class AppResourceAccess extends DbFields implements IAppResourceAccess {
    public user: User = new User(); 
    public group: UserGroup = new UserGroup(); 
    public appResource: AppResource = new AppResource(); 
    public view: boolean = false; 
    public edit: boolean = false; 
    public add: boolean = false; 
    public delete: boolean = false; 
    public execute: boolean =  false; 
}