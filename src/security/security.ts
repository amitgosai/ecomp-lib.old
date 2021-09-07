import { AppResource, IAppResource } from "../common/common";
import { DbFields, Idb, IdbFields } from "../data/data";
import { Person } from "../models/person/person";
import { AppValidations } from "../validations/validation";
import { Util } from "../util/util"; 

export const accessLevel = {
    ALL: "All", 
    ALL_CHILDREN: "All Children", 
    SPECIFIC_CHILDREN: "Specific Children"
}

export interface IClassDescription {
    propName: string; 
    required: string;
    dataType: string; 
    propDesc: string; 
}

export interface IUserGroup extends IdbFields {
    appId: string; 
    companyId: string; 
    groupName: string; 
}

export interface IUser extends IdbFields {
    userName: string; 
    photoURL: string | null | undefined; 
    displayName?: string | null | undefined; 
    personId: string; 
    registeredEmail?: string | null | undefined; 
    registeredMobile?: string | null | undefined; 
    isApproved?: boolean | null | undefined; 
    lastOTP?: string | null | undefined; 
    mailVerified?: boolean | null | undefined; 
    mobileVerified?: boolean | null | undefined; 
    isAnonymous: boolean | null | undefined; 
    lastLoginDate?: Date | null | undefined; 
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
    appAccess?: string[] | null | undefined; 
    userGroups?: IUserGroup[] | null | undefined; 
}

export interface IUserProfile extends IdbFields {
    user: IUser 
}

export interface IAppResourceAccess extends IdbFields {
    user: IUser; 
    group: IUserGroup; 
    appResource: IAppResource; 
    view: boolean; 
    edit: boolean; 
    add: boolean; 
    delete: boolean; 
    execute: boolean; 
}

export interface IGroupDataAccessRules extends IdbFields {
    appId: string; 
    groupId: string; 
    collectionName: string; 
    accessLevel: string; 
    allowRead: boolean; 
    allowCreate: boolean;
    allowUpdate: boolean;  
    allowDelete: boolean; 
    allowSoftDelete: boolean; 
}

export interface IUserDataAccessRules extends IdbFields {
    appId: string; 
    userId: string; 
    collectionName: string; 
    allowRead: boolean; 
    allowCreate: boolean; 
    allowUpdate: boolean; 
    allowDelete: boolean; 
    allowSoftDelete: boolean; 
}

export interface IScreen extends IdbFields {
    appId: string; 
    screenId: string; 
    screenName: string; 
}

export interface IScreenElement extends IdbFields {
    appId: string;  
    screenId: string; 
    elementId: string; 
    elementLabel?: string | null | undefined; 
}

export interface IGroupScreenAccess extends IdbFields {
    appId: string; 
    screenId: string; 
    groupId: string; 
    view: boolean; 
}

export interface IGroupScreenElementAccess extends IdbFields {
    appId: string; 
    screenId: string; 
    groupId: string; 
    view: boolean; 
    enabled: boolean; 
}

export interface IUserScreenAccess extends IdbFields {
    appId: string; 
    screenId: string; 
    elementId: string; 
    userId: string; 
    view: boolean; 
}

export interface IUserScreenElementAccess extends IdbFields {
    appId: string; 
    screenId: string; 
    elementId: string; 
    userId: string; 
    view: boolean; 
    enabled: boolean; 
}

export interface IScreenAccess extends DbFields {
    appId: string; 
    screenId: string; 
    userId: string;  
    view: boolean; 
    elementAccess: IUserScreenElementAccess[] | null | undefined; 
    isRootUser: boolean;
}
/****************************************
 * User Groups: Includes full detail of groups. 
*****************************************/
export class UserGroup extends DbFields implements IUserGroup {
    public groupName: string = ""; 
    public appId: string = ""; 
    public companyId: string = ""; 
}

/****************************************
 * User Profile: Includes full detail of a user. 
*****************************************/

export class User extends DbFields implements IUser {
    public userName: string = "";
    public personId: string = ""; 
    public person: Person = new Person(); 
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
    public appAccess?: string[] | null | undefined; 
    public userGroups?: UserGroup[] | null | undefined;  
    
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

export class GroupDataAccessRules extends DbFields implements IGroupDataAccessRules {
    public appId: string = ""; 
    public groupId: string = "";  
    public collectionName: string = ""; 
    public accessLevel: string = "";  
    public allowRead: boolean = true; 
    public allowCreate: boolean = true; 
    public allowUpdate: boolean = true; 
    public allowDelete: boolean = false; 
    public allowSoftDelete: boolean = true; 

    constructor() { super(); }
}

export class UserDataAccessRules extends DbFields implements IUserDataAccessRules {
    public appId: string = ""; 
    public userId: string = "";  
    public collectionName: string = ""; 
    public accessLevel: string = "";  
    public allowRead: boolean = true; 
    public allowCreate: boolean = true; 
    public allowUpdate: boolean = true; 
    public allowDelete: boolean = false; 
    public allowSoftDelete: boolean = true; 

    constructor() { super(); }
}

export class Screen extends DbFields implements IScreen {
    public appId: string = ""; 
    public screenId: string = ""; 
    public screenName: string = ""; 

    constructor() { super(); }
}

export class ScreenElement extends DbFields implements IScreenElement {
    public appId: string = ""; 
    public screenId: string = ""; 
    public elementId: string = ""; 
    public elementLabel?: string | null | undefined; 

    constructor() { super(); }
}

export class GroupScreenAccess extends DbFields implements IGroupScreenAccess {
    public appId: string = ""; 
    public screenId: string= ""; 
    public elementId: string = ""; 
    public groupId: string = ""; 
    public view: boolean = true;  

    constructor() { super(); }
}

export class GroupScreenElementAccess extends DbFields implements IGroupScreenElementAccess {
    public appId: string = ""; 
    public screenId: string= ""; 
    public elementId: string = ""; 
    public groupId: string = ""; 
    public view: boolean = true;  
    public enabled: boolean = true;  

    constructor() { super(); }
}

export class UserScreenAccess extends DbFields implements IUserScreenAccess {
    public appId: string = ""; 
    public screenId: string= ""; 
    public elementId: string = ""; 
    public userId: string = ""; 
    public view: boolean = true; 
    
    constructor() { super(); }
}

export class UserScreenElementAccess extends DbFields implements IUserScreenElementAccess {
    public appId: string = ""; 
    public screenId: string= ""; 
    public elementId: string = ""; 
    public userId: string = ""; 
    public view: boolean = true; 
    public enabled: boolean = true;  
    
    constructor() { super(); }
}

export class ScreenAccess extends DbFields implements IScreenAccess {
    public appId: string = ""; 
    public screenId: string = ""; 
    public userId: string = ""; 
    public elementAccess: UserScreenElementAccess[] | null | undefined = []; 
    public view: boolean = false; 
    public isRootUser: boolean = false; 

    public addElementAccess(elementAccess: UserScreenElementAccess) {
        this.elementAccess?.push(elementAccess); 
    }

    //To find if user has access to specific screen element. 
    public hasElementViewAccess(elementId: string): boolean {
        var retVal = true; //Default to True. 

        try {
            if(this.elementAccess) {
                for(var i=0; i < this.elementAccess.length; i++) {
                    if(this.elementAccess[i].elementId === elementId) {
                        retVal = this.elementAccess[i].view; 
                        break; 
                    }
                }
            }
        } catch (err) {
            //set Return value to false. 
            retVal = false; 
        } finally {
            return retVal; 
        }
    }

    //To find if user has access to specific screen element. 
    public isElementEnabled(elementId: string): boolean {
        var retVal = true; 

        try {
            if(this.elementAccess) {
                for(var i=0; i < this.elementAccess.length; i++) {
                    if(this.elementAccess[i].elementId === elementId) {
                        retVal = this.elementAccess[i].enabled; 
                        break; 
                    }
                }
            }
        } catch (err) {
            //set Return value to false. 
            retVal = false; 
        } finally {
            return retVal; 
        }
    }

    constructor(objScrAcc?: any)
    {
        super(); 
        if(objScrAcc) {
            Util.setCommonDbOjectProps(this, objScrAcc); //Set All the default properties. 
            if(objScrAcc["appId"]) {
                this.appId = objScrAcc["appId"]; 
            }
            if(objScrAcc["screenId"]) {
                this.screenId = objScrAcc["screenId"]; 
            }
            if(objScrAcc["userId"]) {
                this.userId = objScrAcc["userId"]; 
            }
            if(objScrAcc["elementAccess"]) {
                this.elementAccess = objScrAcc["elementAccess"]; 
            }
            if(objScrAcc["view"]) {
                this.view = objScrAcc["view"]; 
            }
            if(objScrAcc["isRootUser"]) {
                this.isRootUser = objScrAcc["isRootUser"]; 
            }
            if(objScrAcc["notes"]) {
                this.notes = objScrAcc["notes"]; 
            }
        }
    }
}