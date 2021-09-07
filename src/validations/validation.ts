// tslint:disable max-classes-per-file
import { responseCodes } from '../config/config'; 

export const ErrorType = {
    Error: "Error", 
    Warning: "Warning", 
    Info: "Info", 
    None: ""
}; 

export interface IAppMessage {
    messageId?: string; 
    messageCode?: string; 
    messageTitle?: string; 
    messageString?: string; 
    messageType?: string; 
    innerError?: any; 
    data?: any; 
    innerMessageModule?: string; 
    innerMessageFunction?: string; 
    innerErrorMessage?: string; 
    isSuccess?: boolean;
}

export class AppValidations {
    // Returns True if Email is Valid. 
    public static validateEmail(email: any) {
      const retVal = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return retVal.test(String(email).toLowerCase());
    }

    // To check if the mobile number is valid. 
    // No + sign or comma or digits in between. 
    // Has to be 10 digits. 
    public static validateMobile(mobile: any) {
        const retVal = /^\d{10,14}$/; 

        return retVal.test(mobile); 
    }

    public static isNullOrEmpty(value: any) {
        let _retVal: boolean = false; 

        if(value === null || value === undefined) {
            _retVal = true; 
        } else if (typeof value === "string" || value instanceof String) {
            if(value === null || value === undefined || value === 'null' || value === 'undefined' || value === '') {
            _retVal = true; 
            } else {
            if(value.trim() === '') {
                _retVal = true; 
            }
            }
        }

        return _retVal; 
    }

    public static getErrorString(error: any) {
        let _retVal: any; 

        if(error instanceof Error) {
            _retVal = error.message; 
        }else if(error instanceof AppMessage) {
            _retVal = error.messageString; 
        }else if(typeof error === "string" || error instanceof String) {
            _retVal = error.toString(); 
        } else if(typeof error === "number" || error instanceof Number) {
            _retVal = error.toString(); 
        } else if (typeof error === "boolean" || error instanceof Boolean) {
            _retVal = error; 
        } else {
            _retVal = JSON.stringify(error); 
        }

        return _retVal; 
    }

    public static getErrorTitle(error: any):any {
        let _retVal: any;

        if(error instanceof AppMessage) {
            _retVal = error.messageTitle; 
        } else {
            _retVal = "An Error Occurred";
        }

        return _retVal; 
    }
}

export class AppMessage implements IAppMessage  {
    public messageId?: string; 
    public messageCode?: string; 
    public messageTitle?: string; 
    public messageString?: string = ""; 
    public messageType?: string = ""; 
    public isSuccess?: boolean = false; 
    private _innerError?: any; 
    public data?: any; 
    public innerMessageModule?: string; 
    public innerMessageFunction?: string; 
    public innerErrorMessage?: string; 
    
    constructor(messageString?: string | any) // Either Message OR Error. 
    constructor(messageString?: string, error?: any | string, messageType?: string, messageId?: string, isSuccess?: boolean) // Message String Along with Error Object OR Error Title.
    {

      if(messageString) {
        if(typeof messageString === "object") { // If Message String is object, then it's an error object. 
          this._innerError = messageString; 
        } else { // It's string. 
          this.messageString = messageString; 
        }
      } else {
        this.messageString = "Error Occurred"; 
      }

      if(error && typeof error === "object") { // If we have object of Error, then update the inner error. 
        this._innerError = error; 
        this.innerErrorMessage = AppValidations.getErrorString(error); 
      } else if (error) { // Else update it as Message Title. 
        this.messageTitle = error; 
      } else { // Else update the Default title. 
        this.messageTitle = "Error"; 
      }

      if(messageId === null || messageId === undefined || messageId === 'undefined' || messageId === '') {
        this.messageId = responseCodes.UNHANDLED_ERROR; 
      } else {
        this.messageId = messageId; 
      }
      
      if(messageType === null || messageType === 'undefined' || messageType === '') {
        messageType = ErrorType.Error; 
      } else {
        this.messageType = messageType; 
      }
      
      if(isSuccess === null) {
        this.isSuccess = false; 
      } else {
          this.isSuccess = isSuccess; 
      }
    }
  
    get innerError(): any {
      return this._innerError; 
    } 
    set innerError(value: any) {
  
      if (value instanceof Error) {
        this.messageId = responseCodes.UNHANDLED_ERROR; 
        this.messageTitle = "Error"; 
        this.messageType = ErrorType.Error; 
        this.isSuccess = false; 
        this.messageString = value.message; 
        this.innerErrorMessage = value.message; 
      }
  
      this._innerError = value; 
    }

    setIsSuccess(value: boolean) {
      if (value) {
        this.messageId = responseCodes.SUCCESS; 
        this.isSuccess = value; 
        this.messageTitle = "Success"; 
        this.messageString = "Success"; 
        this.messageType = ErrorType.Info; 
        this._innerError = null;  
        this.innerErrorMessage = ""; 
        this.innerMessageModule = ""; 
        this.innerMessageFunction = ""; 
      } else {
        this.isSuccess = value; 
      }
    }
  }