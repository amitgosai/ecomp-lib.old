export const localStoreKeys = {
	appID: "appID", 
	appName: "appName", 
	tagLine: "tagLine",
	userID: "userID", //User ID of Logged-in user. 
	userDetails: "userDetails", //User details as received from cloud authentication system (i.e. Firebase)
	userGPSCountry: "userGPSCountry", //Geolocation where user is currently available. 
	userSelectedCountry: "userSelectedCountry", //The country user selected to view his app data. 
	allCountries: "allCountries", //All the countries as stored in database. 
	locationServiceEnable: "locationServiceEnable", //Did user enabled the location services
	isMobile: "isMobile", //Is a Mobile Device. Determined from Device Info Service. Will give false if site is accessed via computer even if using small screen size. 
	isTablet: "isTablet", //Is a Tablet. Determined from Device Info Service. 
	isDesktop: "isDesktop", //Is a Deskto. Determined from Device Info Service. 
	deviceInfo: "deviceInfo", //Device information, provided via Device Info Service. 
	screenSize: "screenSize", //Values: xs, md, lg - Determined via Media Observer of Flex Grid. 
    isMobileScreenSize: "isMobileScreenSize", //Values determined by Flex Grid Media Query. 
    isTabletScreenSize: "isTabletScreenSize", //Values determined by Flex Grid Media Query. 
    isDesktopScreenSize: "isDesktopScreenSize", //Values determined by Flex Grid Media Query. 
}; 