export class Util {
    private static _nestLevel: string[] = ["Root"]; 
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
        for (var key in siteMap) {
            
            if(key == "0") { break; } //Exit if key does not have a name. 

            var val = siteMap[key]; //Get the value of the Key. 
            if(!(val.name === null || val.name == undefined || val.name == 'undefined' || val.name == '')) {
                if(this._nestLevel.length > val.nstLvl) {
                    //We already had earlier object pushed in there. So, please update. 
                    this._nestLevel[val.nstLvl] = val.name; 
                } else {
                    this._nestLevel.push(val.name); 
                }

                if(val.name == breakAt) {
                    break; 
                }
            }

            this.getBreadCrumb(val, breakAt);
        }

        //Join entire Array. 
        let finalName:string = ''; 

        this._nestLevel.forEach(name => {
            finalName += name; 
        }); 

        this._breadCrumb = finalName; 

        //Finally, return the breadcrumb. 
        return this._breadCrumb;  
    }

    public static getBreadCrumbPath(siteMap: any, breakAt: string):string {
        for (var key in siteMap) {
            
            if(key == "0") { break; } //Exit if key does not have a name. 

            var val = siteMap[key]; //Get the value of the Key. 
            if(!(val.name === null || val.name == undefined || val.name == 'undefined' || val.name == '')) {
                if(this._nestLevel.length > val.nstLvl) {
                    //We already had earlier object pushed in there. So, please update. 
                    this._nestLevel[val.nstLvl] = val.path; 
                } else {
                    this._nestLevel.push(val.path); 
                }

                if(val.name == breakAt) {
                    break; 
                }
            }

            this.getBreadCrumbPath(val, breakAt);
        }

        //Join entire Array. 
        let finalPath:string = ''; 

        this._nestLevel.forEach(path => {
            finalPath += path; 
        }); 

        this._breadCrumbPath = finalPath; 

        //Finally, return the breadcrumb. 
        //console.log(this._breadCrumbPath); 
        return this._breadCrumbPath; 
    }

    public static getRandomNumber(): string {
        return Date.now().toString() + Math.floor((Math.random() * 10000) + 1).toString();  
    }
}