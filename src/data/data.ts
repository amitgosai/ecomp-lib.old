export const Database = {
    Firestore: "Firestore"
}; 

export const documentDb = {
  generalCols: {
    id: "id", 
    createdOn: "createdOn", 
    createdBy: "createdBy", 
    updatedOn: "updatedOn", 
    updatedBy: "updatedBy", 
    isDeleted: "isDeleted", 
    deletedOn: "deletedOn", 
    deletedBy: "deletedBy", 
    notes: "notes", 
    rowOrder: "rowOrder" // To Order values for a small table like lookups ! 
  }, 
  persons: {
    collection: "persons", 
    doc: {
      firstName: "firstName", 
      lastName: "lastName", 
      fullName: "fullName", 
      fullNameLower: "fullNameLower", // Full Name in lower case for firestore queries. 
      gender: "gender", 
      dateOfBirth: "dateOfBirth", 
      contactGroup: "contactGroup"
    }
  }, 
  lkpCompanyTypes: {
    collection: "lkpCompanyTypes", 
    doc: {
      ids: {
        PvtLtd: "PvtLtd", 
        PubLtd: "PubLtd", 
        Partnership: "Partnership", 
        LLP: "LLP", 
        OnePerson: "OnePerson", 
        SoleProp: "SoleProp", 
        SecEight: "SecEight", 
        Other: "Other"
      }, 
      companyType: "companyType"
    }
  }, 
  companies: {
    collection: "companies", 
    doc: {
      publicId: "publicId", // Purely for security reasons. This will be provided in Dropdowns and end user cannot see actual company id. 
      companyName: "companyName", 
      companyNameLower: "companyNameLower",
      companyType: "companyType", 
      registrationNumber: "registrationNumber", // Company Identification Number OR CIN
      dateOfIncorporation: "dateOfIncorporation", 
      taxIDs: "taxIDs", 
      websites: "websites", 
      contactGroup: "contactGroup"
    }
  }, 
  lkpPhoneTypes: {
    collection: "lkpPhoneTypes", 
    doc: {
      companyId: "companyId", 
      phoneType: "phoneType"
    }
  }, 
  lkpEmailTypes: {
    collection: "lkpEmailTypes", 
    doc: {
      companyId: "companyId", 
      emailType: "emailType"
    }
  }, 
  applications: {
    collection: "applications", 
    doc: {
      ids: {
        eCompanyAdmin: "eCompanyAdmin"
      }, 
      companyId: "companyId", 
      name: "name", 
      tagLine: "tagLine"
    }
  }, 
  userGroups: {
    collection: "userGroups", 
    doc: {
      ids: {
        Administrator: "Administrator", 
        Root: "Root", 
        User: "User"
      }, 
      companyId: "companyId", 
      appId: "appId", 
      groupName: "groupName"
    }
  }, 
  appResources: {
    collection: "appResources", 
    doc: {
      resourceName: "resourceName", 
      appId: "appId"
    }
  }, 
  mailTemplates: {
    collection: "mailTemplates", 
    doc: {
      ids: {
        CurryTym_Reg_OTP_Mail: "CurryTym_Reg_OTP_Mail"
      }, 
      companyId: "companyId", 
      mailTemplate: "mailTemplate"
    }
  }, 
  mailOTPs: {
    collection: "mailOTPs", 
    doc: {
      email: "email", 
      otp: "otp"
    }
  }, 
  smsOTPs: {
    collection: "smsOTPs", 
    doc: {
      mobileNumber: "mobileNumber", 
      otp: "otp"
    }
  }, 
  jobTitles: {
    collection: "jobTitles", 
    doc: {
      companyId: "companyId", 
      jobTitle: "jobTitle"
    }
  }, 
  lkpPerCompAssociationTypes: { // Company And Person association Types, i.e. Owner, Customer, Employee, Vendor, etc. 
    collection: "lkpPerCompAssociationTypes", 
    doc: {
      ids: {
        Owner: "Owner", 
        Customer: "Customer", 
        Employee: "Employee", 
        ServiceProvider: "Service Provider", 
        Vendor: "Vendor", 
        Supplier: "Supplier", 
        Contractor: "Contractor", 
        Other: "Other"
      }, 
      associationType: "associationType"
    }
  }, 
  personCompanies: {
    collection: "personCompanies", 
    doc: {
      personId: "personId", 
      companyId: "companyId", 
      jobTitleId: "jobTitleId", 
      isShareholder: "isShareholder", 
      sharePercent: "sharePercent", 
      associationType: "associationType", 
      isThirdPartyAssociate: "isThirdPartyAssociate"
    }
  }, 
  countries: {
    collection: "countries", 
    doc: {
      countryName: "countryName",
      officialStateName: "officialStateName", // Repulican of India
      sovereignty: "sovereignty", // United Kingdom, etc. 
      alpha2Code: "alpha2Code", 
      isdCode: "isdCode", 
      flagIconImgPath: "flagIconImgPath", 
      flagIconCss: "flagIconCss"
    }
  }, 
  srvcblCountries: {
    collection: "srvcblCountries", 
    doc: {
      companyid: "companyId", 
      companyName: "companyName", 
      countryName: "countryName",
      officialStateName: "officialStateName", // Repulican of India
      sovereignty: "sovereignty", // United Kingdom, etc. 
      alpha2Code: "alpha2Code", 
      isdCode: "isdCode", 
      flagIconImgPath: "flagIconImgPath", 
      flagIconCss: "flagIconCss"
    }
  }, 
  countryStates: {
    collection: "countryStates", 
    doc: {
      countryId: "countryId", 
      countryName: "countryName", 
      isdCode: "isdCode", 
      flagIconImgPath: "flagIconImgPath", 
      flagIconCss: "flagIconCss", 
      stateName: "stateName", 
    }
  }, 
  srvcblStates: {
    collection: "srvcblStates", 
    doc: {
      companyid: "companyId", 
      companyName: "companyName", 
      countryId: "countryId", 
      countryName: "countryName", 
      isdCode: "isdCode", 
      flagIconImgPath: "flagIconImgPath", 
      flagIconCss: "flagIconCss", 
      stateName: "stateName", 
    }
  }, 
  stateCities: {
    collection: "stateCities", 
    doc: {
      countryId: "countryId", 
      countryName: "countryName", 
      isdCode: "isdCode", 
      flagIconImgPath: "flagIconImgPath", 
      flagIconCss: "flagIconCss", 
      stateId: "stateId", 
      stateName: "stateName", 
      stdCode: "stdCode", 
      cityName: "cityName", 
    }
  }, 
  srvcblCities: {
    collection: "srvcblCities", 
    doc: {
      companyid: "companyId", 
      companyName: "companyName", 
      countryId: "countryId", 
      countryName: "countryName", 
      isdCode: "isdCode", 
      flagIconImgPath: "flagIconImgPath", 
      flagIconCss: "flagIconCss", 
      stateId: "stateId", 
      stateName: "stateName", 
      stdCode: "stdCode", 
      cityName: "cityName", 
    }
  }, 
  cityAreas: {
    collection: "cityAreas", 
    doc: {
      countryId: "countryId", 
      countryName: "countryName", 
      isdCode: "isdCode", 
      flagIconImgPath: "flagIconImgPath", 
      flagIconCss: "flagIconCss", 
      stateId: "stateId", 
      stateName: "stateName", 
      stdCode: "stdCode", 
      cityId: "cityId", 
      cityName: "cityName", 
      areaName: "areaName", 
      zipCode: "zipCode", 
    }
  }, 
  srvcblAreas: {
    collection: "srvcblAreas", 
    doc: {
      companyid: "companyId", 
      companyName: "companyName",
      countryId: "countryId", 
      countryName: "countryName", 
      isdCode: "isdCode", 
      flagIconImgPath: "flagIconImgPath", 
      flagIconCss: "flagIconCss", 
      stateId: "stateId", 
      stateName: "stateName", 
      stdCode: "stdCode", 
      cityId: "cityId", 
      cityName: "cityName", 
      areaName: "areaName", 
      zipCode: "zipCode", 
    }
  }, 
  addresses: {
    collection: "addresses", 
    doc: {
      personId: "personId", 
      companyId: "companyId", 
      addressName: "addressName", 
      addLine1: "addLine1", 
      addLine2: "addLine2", 
      areaName: "areaName", 
      cityId: "cityId", 
      city: "city", 
      stateId: "stateId", 
      state: "state", 
      countryId: "countryId", 
      country: "country", 
      zipCode: "zipCode", 
      lat: "lat", 
      long: "long"
    }
  }, 
  emails: {
    collection: "emails", 
    doc: {
      personId: "personId", 
      companyId: "companyId", 
      email: "email", 
      emailTypeId: "emailTypeId", 
      emailType: "emailType", 
      isPrimary: "isPrimary", 
      isVerified: "isVerified"
    }
  }, 
  phones: {
    collection: "phones", 
    doc: {
      personId: "personId", 
      companyId: "companyId", 
      countryCode: "countryCode", 
      phoneNumber: "phoneNumber", 
      phoneTypeId: "phoneTypeId", 
      phoneType: "phoneType", 
      isPrimary: "isPrimary", 
      isVerified: "isVerified"
    }
  }, 
  socialMediaIDs: {
    collection: "socialMediaIDs", 
    doc: {
      personId: "personId", 
      companyId: "companyId", 
      socialMedia: "socialMedia", 
      socialMediaId: "socialMediaId", 
      profileURL: "profileURL"
    }
  }, 
  users: {
    collection: "users", 
    doc: {
      photoURL: "photoURL", 
      userName: "userName", 
      displayName: "displayName", 
      registeredEmail: "registeredEmail", 
      registeredMobile: "registeredMobile", 
      isApproved: "isApproved", 
      lastOTP: "lastOTP", 
      mailVerified: "mailVerified", 
      mobileVerified: "mobileVerified", 
      isAnonymous: "isAnonymous", 
      lastLoginDateTime: "lastLoginDateTime", 
      privacyAgreedOn: "privacyAgreedOn", 
      privacyAgreeDevice: "privacyAgreeDevice", 
      tncAgreedOn: "tncAgreedOn", 
      tncAgreeDevice: "tncAgreeDevice", 
      contactId: "contactId", 
      appAccess: "appAccess",
      userGroups: "userGroups"
    }
  }, 
  groupDataAccessRules: {
    collection: "groupDataAccessRules", 
    doc: {
      appId: "appId", 
      groupId: "groupId", 
      accessLevel: "accessLevel", 
      collectionName: "collectionName", 
      allowRead: "allowRead", 
      allowCreate: "allowCreate",
      allowUpdate: "allowUpdate", 
      allowDelete: "allowDelete", 
      allowSoftDelete: "allowSoftDelete", 
      specificChildren: {
        collection: "specificChildren", 
        doc: {
          childId: "childId"
        }
      }
    }
  }, 
  userDataAccessRules: {
    collection: "userDataAccessRules", 
    doc: {
      appId: "appId", 
      userId: "userId", 
      accessLevel: "accessLevel", 
      collectionName: "collectionName", 
      allowRead: "allowRead", 
      allowCreate: "allowCreate",
      allowUpdate: "allowUpdate", 
      allowDelete: "allowDelete", 
      allowSoftDelete: "allowSoftDelete", 
      specificChildren: {
        collection: "specificChildren", 
        doc: {
          childId: "childId"
        }
      }
    }
  }, 
  screens: {
    collection: "screen", 
    doc: {
      ids: {
        eCompLogin: "eCompLogin", 
        eCompSignup: "eCompSignup", 
        eCompAdmin: "eCompAdmin", 
        eCompAdminDashboard: "eCompAdminDashboard", 
        eCompAdminUserProfile: "eCompAdminUserProfile"
      }, 
      appId: "appId", 
      screenId: "screenId", 
      screenName: "screenName"
    }
  },
  groupScreenAccess: {
    collection: "groupScreenAccess", 
    doc: {
      appId: "appId", 
      groupId: "groupId", 
      screenId: "screenId", 
      view: "view"
    }
  }, 
  userScreenAccess: {
    collection: "userScreenAccess", 
    doc: {
      appId: "appId", 
      userId: "userId", 
      screenId: "screenId", 
      view: "view"
    }
  }, 
  screenElements: {
    collection: "screenElements", 
    doc: {
      screenId: "screenId", 
      elementId: "screenElementId", 
      elementLabel: "elementLabel"
    }
  }, 
  groupScreenElementAccess: {
    collection: "groupScreenElementAccess", 
    doc: {
      groupId: "groupId", 
      screenId: "screenId", 
      elementId: "screenId", 
      view: "view", 
      enabled: "enabled"
    }
  }, 
  userScreenElementAccess: {
    collection: "userScreenElementAccess", 
    doc: {
      userId: "userId", 
      screenId: "screenId", 
      elementId: "screenId", 
      view: "view", 
      enabled: "enabled"
    }
  }
}; 

export interface Idb {
    dbName: string
}

export interface IdbFields {
    id: string; 
    createdOn?: Date | null | undefined; 
    createdBy?: string | null | undefined;  
    updatedOn?: Date | null | undefined; 
    updatedBy?: string | null | undefined;  
    isDeleted?: boolean | null | undefined; 
    deletedOn?: Date | null | undefined; 
    deletedBy?: string | null | undefined;  
    notes?: string | null | undefined; 
    rowOrder?: number | null | undefined; 
}

export class WhereParam {
    public columnName: string = ""; 
    public operator: string = ""; 
    public value: any;  
  
    constructor(columnName: string, operator: string, value: any) {
      this.columnName = columnName; 
      this.operator = operator; 
      this.value = value; 
    }
}

// tslint:disable-next-line: max-classes-per-file
export class DbFields implements IdbFields {
  public id: string = ""; 
  public createdOn?: Date | null | undefined; 
  public createdBy?: string | null | undefined; 
  public updatedOn?: Date | null | undefined; 
  public updatedBy?: string | null | undefined; 
  public isDeleted?: boolean | null | undefined; 
  public deletedOn?: Date | null | undefined; 
  public deletedBy?: string | null | undefined; 
  public notes?: string | null | undefined = ""; 
  public rowOrder?: number | null | undefined; 
}