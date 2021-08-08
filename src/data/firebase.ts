import { AppMessage, ErrorType } from '../validations/validation';
import { WhereParam } from './data'; 


// Firebase Database Operations 
export const FbDbOperations = {
    add: "add", 
    set: "set", 
    update: "update", 
    softdelete: "softdelete"
}; 

export const firebaseErrorCodes = {
    auth: {
        userNotFound: {
        code: "auth/user-not-found", 
        errorCode: "auth/user-not-found",
        title: "User Not Found", 
        message: "User does not exists or deleted", 
        type: ErrorType.Info
        }, 
        emailAlreadyInUse: {
            code: "auth/email-already-in-use",
            errorCode: "auth/email-already-in-use", 
            title: "User Name already taken", 
            message: "The email address already in use by another account.",
            type: ErrorType.Info
        }, 
        wrongPassword: {
            code: "auth/wrong-password",
            errorCode: "auth/wrong-password",
            title: "Invalid Login", 
            message: "Incorrect Password", 
            type: ErrorType.Info
        } 
    }, 
    storage: {
        Unauthorized: {
            code: "storage/unauthorized", 
            errorCode: "403", 
            title: "Cannot upload file/document", 
            message: "Cannot upload file/document due to large size", 
            type: ErrorType.Info
        }, 
        ObjectNotFound: {
            code: "storage/object-not-found", 
            errorCode: "404", 
            title: "File/Document not found", 
            message: "Uploaded file/document not found", 
            type: ErrorType.Info
        }
    }
}; 

export const FirebaseFunc = {
    initializeFirestore: "initializeFirestore", 
    getAppDetails: "getAppDetails", 
    getUserDetails: "getUserDetails", 
    updateUserDetails: "updateUserDetails", 
    userEmailExists: "userEmailExists", 
    addUserDetails: "addUserDetails", 
    sendEmailOTP: "sendEmailOTP", 
    verifyMailOTP: "verifyMailOTP"
}

export class FbWhereClause {
    private _params: WhereParam[] = []; 
  
    constructor() { }
  
    public addClause(columnName: string, operator: string, value: any) {
        this._params.push(new WhereParam(columnName, operator, value)); 
    }
  
    public getParams(): WhereParam[] {
        return this._params; 
    }
  
    public clearParams() {
        //Let's clean the array. Slow, but effective. 
        this._params.splice(0, this._params.length);
    }
  
    public getClause(): string {
        let _retVal: string = ''; 
        let paramValue: string = '';
        let _paramString: string = '';
  
        this._params.forEach(param => {
            if(typeof param.value === 'string' || param.value instanceof String) {
                paramValue = "'" + param.value + "'"; 
            } else {
                paramValue = String(param.value); 
            }
            _paramString =  ".where('" + param.columnName.toString() + "', '" + param.operator.toString() + "', " + paramValue.toString() + ")";  
            _retVal += _paramString 
        }); 
  
        return _retVal; 
    }
}

export class FbUtils {
    public static getFbError(errorObj: any): AppMessage | null | undefined {
        let _retVal: AppMessage | null | undefined = new AppMessage();  

        switch(errorObj.code) {
            case firebaseErrorCodes.auth.userNotFound.code:
                _retVal.innerError = errorObj; 
                _retVal.messageTitle = firebaseErrorCodes.auth.userNotFound.title; 
                _retVal.messageId = firebaseErrorCodes.auth.userNotFound.code; 
                _retVal.messageString = firebaseErrorCodes.auth.userNotFound.message; 
                _retVal.messageType = firebaseErrorCodes.auth.userNotFound.type; 
                _retVal.isSuccess = false; 
                break; 
            case firebaseErrorCodes.auth.emailAlreadyInUse.code: 
                _retVal.innerError = errorObj; 
                _retVal.messageTitle = firebaseErrorCodes.auth.emailAlreadyInUse.title; 
                _retVal.messageId = firebaseErrorCodes.auth.emailAlreadyInUse.code; 
                _retVal.messageString = firebaseErrorCodes.auth.emailAlreadyInUse.message; 
                _retVal.messageType = firebaseErrorCodes.auth.emailAlreadyInUse.type; 
                _retVal.isSuccess = false; 
                break; 
            case firebaseErrorCodes.auth.wrongPassword.code: 
                _retVal.innerError = errorObj; 
                _retVal.messageTitle = firebaseErrorCodes.auth.wrongPassword.title; 
                _retVal.messageId = firebaseErrorCodes.auth.wrongPassword.code; 
                _retVal.messageString = firebaseErrorCodes.auth.wrongPassword.message; 
                _retVal.messageType = firebaseErrorCodes.auth.wrongPassword.type; 
                _retVal.isSuccess = false; 
                break;
            default: 
                _retVal = null; 
        }

        return _retVal; 
    }
}