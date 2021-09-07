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
    constructor() { }

    //Returns True if Email is Valid. 
    public static validateEmail(email: any) {
      var retVal = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return retVal.test(String(email).toLowerCase());
    }

    //To check if the mobile number is valid. 
    //No + sign or comma or digits in between. 
    //Has to be 10 digits. 
    public static validateMobile(mobile: any) {
        var retVal = /^\d{10,14}$/; 

        return retVal.test(mobile); 
    }

    public static isNullOrEmpty(value: any) {
        var _retVal: boolean = false; 

        if(value === null || value === undefined) {
            _retVal = true; 
        } else if (typeof value === "string" || value instanceof String) {
            if(value === null || value === undefined || value === 'null' || value === 'undefined' || value === '') {
            _retVal = true; 
            } else {
            if(value.trim() == '') {
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
        } else if (typeof error == "boolean" || error instanceof Boolean) {
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
    
    constructor()
    constructor(error?:any)
    constructor(messageString?: string)
    constructor(messageType?:string)
    constructor(messageTitle?:string, messageString?:string)
    constructor(messageTitle?:string, messageString?: string, messageType?:string)
    constructor(messageString?:string, error?:any)
    constructor(messageTitle?:string, messageString?:string, error?:any)
    constructor(messageTitle?:string, messageString?:string, error?:any, messageType?:string)
    constructor(messageTitle?:string, messageString?:string, error?:any, messageType?:string, isSuccess?:boolean)
    constructor(messageId?:string, messageTitle?:string, messageString?: string, messageType?: string, isSuccess?:boolean)
    constructor(messageTitle?: string, messageString?: string, messageType?: string, error?:any, isSuccess?:boolean) 
    constructor(messageId?:string, messageTitle?:string, messageString?: string, messageType?: string, error?:any, isSuccess?:boolean){
      if(messageId === null || messageId == undefined || messageId === 'undefined' || messageId == '') {
        this.messageId = responseCodes.UNHANDLED_ERROR; 
      } else {
        this.messageId = messageId; 
      }
      if(messageTitle === 'undefined' || messageTitle === null || messageTitle === '') {
        this.messageTitle = 'Error'; 
      } else {
        this.messageTitle = messageTitle; 
      }
      if(messageString === 'undefined' || messageString === null || messageString === '') {
        this.messageString = 'Error Occurred'; 
      } else {
        this.messageString = messageString; 
      }
      if(messageType === null || messageType === 'undefined' || messageType === '') {
        messageType = ErrorType.Error; 
      } else {
        this.messageType = messageType; 
      }
      if(!(error === null || error == undefined)) {
        this._innerError = error; 
        this.innerErrorMessage = AppValidations.getErrorString(error);
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