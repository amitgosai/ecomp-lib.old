export const responseCodes = {
    SUCCESS: "SUCCESS", 
    VALIDATION_MESSAGE: "VALIDATION_MESSAGE",   
    INVALID_REQUEST: "INVALID_REQUEST", 
    INVALID_PARAM: "INVALID_PARAM", 
    PARAM_MISSING: "PARAM_MISSING", 
    USER_NOT_FOUND: "USER_NOT_FOUND",
    PAGE_NOT_FOUND: "PAGE_NOT_FOUND", 
    NO_DATA: "NO_DATA", 
    DATA_DELETED: "DATA_DELETED", 
    DATA_FETCH_ERROR: "DATA_FETCH_ERROR", 
    DATA_WRITE_ERROR: "DATA_WRITE_ERROR", 
    UNHANDLED_ERROR: "UNHANDLED_ERROR", 
	NOT_AUTHORIZED: "NOT_AUTHORIZED"
};

export const SMSTxnTypes = {
	TXN: "TXN", 
	PROMO: "PROMO", 
}; 

export const ExternalAPIUrls = {
	IPify: "https://api64.ipify.org?format=json", 
};

export const eCompAdminSiteMap = {
	Root: {
		path: "/", 
		name: "Home", 
		nstLvl: 0,  
        PageNotFound: {
            path: "pagenotfound/", 
            name: "Page Not Found", 
            nstLvl: 1
        }, 
		Login: {
			path: "login/", 
			name: "Login", 
			nstLvl: 1
		},
		Signup: {
			path: "signup/", 
			name: "Signup", 
			nstLvl: 1
		}, 
		Admin: {
			path: "admin/", 
			name: "Admin",
			nstLvl: 1, 
			Dashboard: {
				path: "dashboard/",
				name: "Dashboard", 
				nstLvl: 2
			}
		}
	}
}; 