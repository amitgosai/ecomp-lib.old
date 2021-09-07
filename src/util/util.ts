// tslint:disable no-empty
import { IClassDescription } from "..";
import { AppValidations } from "../validations/validation";

export class Util {
    private static _nestLevel: string[] = ["Root"]; 
    private static _bcFound: boolean = false; 
    private static _breadCrumb: string = ''; 
    private static _breadCrumbPath: string = ''; 

    constructor() { }

    private static getNestedValue = (p:any, o:any) => p.reduce((xs:any, x:any) => (xs && xs[x]) ? xs[x] : null, o); 

    /**
     * Function allows you to retrieve value from any nested node of JSON object.  
     * @param jsonObject //Pass actual JSON object. 
     * @param nestedPath //Pass the JSON nodes into [] braces. 
     * Example: 
     * getObjectNestedValue(World, ['countries', 'India', 0, 'areas'])
     * World = {
     *  countries: {
     *      India: [
     *          { cityName: Pune, areas: ['Vishrantwadi', 'Hinjewadi'] }, 
     *          { cityName: Rajkot, areas: ['Alka', 'Anand'] }
     *      ]
     *  }
     * }
     */
    public static getObjectNestedValue(jsonObject:any, nestedPath: any) {
        return this.getNestedValue(nestedPath, jsonObject); 
    }

    public static clearNestLevel() {
        this._nestLevel.splice(0, this._nestLevel.length); 
        this._nestLevel = ["Root"]; 
    }
    
    public static getBreadCrumb(siteMap: any, breakAt: string):string {
        for (const key of siteMap) {
            if(key === "0") { break; } // Exit if key does not have a name. 
            const val = siteMap[key]; // Get the value of the Key. 
            if(!(val.name === null || val.name === undefined || val.name === 'undefined' || val.name === '')) {
                if(this._nestLevel.length > val.nstLvl) {
                    // We already had earlier object pushed in there. So, please update. 
                    this._nestLevel[val.nstLvl] = val.name; 
                } else {
                    this._nestLevel.push(val.name); 
                }
                if(val.name === breakAt) {
                    break; 
                }
            }

            this.getBreadCrumb(val, breakAt);
        }

        // Join entire Array. 
        let finalName:string = ''; 

        this._nestLevel.forEach(name => {
            finalName += name; 
        }); 

        this._breadCrumb = finalName; 

        // Finally, return the breadcrumb. 
        return this._breadCrumb;  
    }

    public static getBreadCrumbPath(siteMap: any, breakAt: string):string {
        for(const key of siteMap) {
            if(key === "0") { break; }
    
            const val = siteMap[key]; 
    
            if(val.path && !this._bcFound) {
                // Remove rest of the elements from this array. 
                // console.log("Nest Level: " + val.nstLvl.toString() + "Array Length: " + this._nestLevel.length); 
                this._nestLevel.splice(val.nstLvl, this._nestLevel.length - val.nstLvl); 
    
                if(this._nestLevel.length > val.nstLvl) {
                    this._nestLevel[val.nstLvl] = val.path; 
                } else {
                    this._nestLevel.push(val.path); 
                }
                // console.log("Key Value: " + "{ Name: " + val.name + ", Path: " + val.path + "} | Array: " + this._nestLevel.toString()); 
            }
    
            if(typeof(siteMap[key]) === "object") {
                if(val.name === breakAt) {
                    this._bcFound = true; 
                    break; 
                }
                if(!this._bcFound) {
                    this.getBreadCrumbPath(siteMap[key], breakAt); 
                } else {
                    break; 
                }
            }
        }
    
        // Join entire array. 
        let finalPath: string = ""; 
        this._nestLevel.forEach( path => {
            finalPath += path; 
        }); 
    
        this._breadCrumbPath = finalPath; 
    
        return this._breadCrumbPath; 
    }

    public static getRandomNumber(): string {
        return Date.now().toString() + Math.floor((Math.random() * 10000) + 1).toString();  
    }

    public static getUniqueId(): string {
        let dt = new Date().getTime();
        // tslint:disable-next-line: only-arrow-functions
        const uuid = 'xxxxx-xxxx-4xxx-yxxx-xxxxx'.replace(/[xy]/g, function(c) {
            // tslint:disable-next-line: no-bitwise
            const r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            // tslint:disable-next-line: no-bitwise
            return (c==='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    public static getTrimmedString(stringValue: string, trimmedLength: number, includeDots:boolean = true) : string {
        let retVal: string = stringValue; 

        try {
            if(stringValue.length > trimmedLength) {
                retVal = stringValue.substr(0, trimmedLength); 
                
                if(includeDots) {
                    retVal = retVal.substr(0, retVal.length - 3); 
                    retVal = retVal + "..."; 
                }
            } else {
                retVal = stringValue; 
            }
            return retVal; 
        } catch (err) {
            retVal = stringValue; 
            return retVal; 
        }
    }

    public static searchArrayByKey(arrayList: any[], key: string): any | null | undefined {
        let retVal: any | null | undefined; 
        try {
            for(const item of arrayList) {
                if(item.key === key) {
                    retVal = item; 
                    break; 
                }
            }
            return retVal; 
        } catch (err) {
            // Do Nothing. 
            retVal = null; 
            return retVal; 
        }
    }

    public static removeArrayItemByKey(arrayList: any[], key: string): any | null | undefined {
        let retVal: any | null | undefined; 

        try {
            retVal = arrayList; 
            for(let i=0; i < arrayList.length; i++) {
                if(arrayList[i].key === key) {
                    retVal.splice(i, 1); 
                    break; 
                }
            }
            return retVal; 
        } catch (err) {
            // Do Nothing. 
            retVal = null; 
            throw new Error("Error removing Array Item"); 
        }
    }

    public static getItemValueByKey(arrayList: any[], key: string): any | null | undefined {
        let retVal: any | null | undefined; 

        try {
            retVal = null; 
            for(const item of arrayList) {
                if(item.key === key) {
                    retVal = item.value; 
                    break; 
                }
            }

            return retVal; 
        } catch (err) {
            retVal = null; 
            throw new Error("Error while getting new value: "); 
        }
    }

    public static arrayToCsv(arrayList: string[], separator: string): string {
        let retVal: string = ""; 
        try {
            retVal = arrayList.toString(); // We have a Comma Separated Value now. 
            if(!AppValidations.isNullOrEmpty(separator)) {
                retVal = retVal.split(",").join(separator); 
            }
            return retVal; 
        } catch (err) {
            retVal = ""; 
            return retVal; 
        }
    }

    public static searchArrayObjects(arrayList: any[], propName: string, searchValue: any) : any | null | undefined {
        let retVal: any | null | undefined; 
        try {
            retVal = null; 
            for(const item of arrayList) {
                if(item[propName] === searchValue) {
                    retVal = item; 
                    break; 
                }
            }
            return retVal; 
        } catch (err) {
            retVal = null; 
            throw new Error("Error while searching array"); 
        }
    }

    public static removeArrayObject(arrayList: any[], propName: string, searchValue: any): any[] | null | undefined {
        let retVal: any[] | null | undefined; 

        try {
            const newArr = arrayList; 
            for(let i=0; i < newArr.length; i++) {
                if(newArr[i][propName] === searchValue) {
                    newArr.splice(i, 1); 
                }
            }

            // Finally, set return value. 
            retVal = newArr;

            return retVal; 
        } catch (err) {
            retVal = null;
            throw new Error("Error deleting object from array"); 
        }
    }

    public static filterArrayObject(arrayList: any[] | null | undefined, propName: string, searchValue: any): any[] | null | undefined {
        let retVal: any[] | null | undefined; 

        try {
            const newArr = []; 
            if(arrayList) {
                for(const item of arrayList) {
                    if(item[propName].toString().toLowerCase().includes(searchValue.toString().toLowerCase())) {
                        newArr.push(item); 
                    }
                }
            }

            retVal = newArr; 
            return retVal; 
        } catch (err) {
            retVal = null;
            throw new Error("Error searching object from array"); 
        }
    }

    public static setCommonDbOjectProps(thisObj: any, valueObj: any) {
        if(thisObj.hasOwnProperty("id") && valueObj.hasOwnProperty("id")) {
            thisObj.id = valueObj.id; 
        }
        if(thisObj.hasOwnProperty("notes") && valueObj.hasOwnProperty("notes")) {
            thisObj.notes = valueObj.notes; 
        }
        if(thisObj.hasOwnProperty("createdOn") && valueObj.hasOwnProperty("createdOn")) {
            thisObj.createdOn = valueObj.createdOn; 
        }
        if(thisObj.hasOwnProperty("createdBy") && valueObj.hasOwnProperty("createdBy")) {
            thisObj.createdBy = valueObj.createdBy; 
        }
        if(thisObj.hasOwnProperty("updatedOn") && valueObj.hasOwnProperty("updatedOn")) {
            thisObj.updatedOn = valueObj.updatedOn; 
        }
        if(thisObj.hasOwnProperty("updatedBy") && valueObj.hasOwnProperty("updatedBy")) {
            thisObj.updatedBy = valueObj.updatedBy; 
        }
        if(thisObj.hasOwnProperty("isDeleted") && valueObj.hasOwnProperty("isDeleted")) {
            thisObj.isDeleted = valueObj.isDeleted; 
        }
        if(thisObj.hasOwnProperty("deletedOn") && valueObj.hasOwnProperty("deletedOn")) {
            thisObj.deletedOn = valueObj.deletedOn; 
        }
        if(thisObj.hasOwnProperty("deletedBy") && valueObj.hasOwnProperty("deletedBy")) {
            thisObj.deletedBy = valueObj.deletedBy; 
        }
    }
}