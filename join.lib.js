var $s = function (id) { return document.getElementById(id); }

var JoinForm = function () {
    
    this.fields = [];
    this.fields["username"] = {}
    this.fields["password"] = {};
    this.fields["email"] = {};
    this.fields["fname"] = {};
    this.fields["lname"] = {};
    this.fields["address"] = {};
    this.fields["city"] = {};
    this.fields["country"] = {};
    this.fields["state"] = {};
    this.fields["zip"] = {};
    this.fields["province"] = {};
    this.fields["postal"] = {};
    this.fields["tele"] = {};

    // Default field messages
    this.fields["username"].message = "Username must be at least 4 characters";
    this.fields["email"].message = "Must be a valid email address.";
    this.fields["password"].message = "Password  requires a combination of 6 numbers and letters";
    this.fields["state"].message = "Use 2 letter abbreviation.";
    this.fields["postal"].message = "6 numbers or letters";
    this.fields["zip"].message = "Use 5 or 9 digit ZIP code.";
    this.fields["tele"].message = "Use 999-999-9999 format.";
    

    // Field error messages
    this.fields["username"].required = "Username is required.";
    this.fields["username"].tooShort = ["Username must be at least 4 numbers and/or letters.", 4];
    this.fields["username"].isUsername = "Username must contain only numbers and letters";
    this.fields["fname"].isName = "First name can only contain letters"
    this.fields["lname"].isName = "Last name can only contain letters"
    this.fields["email"].required = "Email is required.";
    this.fields["email"].isEmail = "Email is not valid.";
    this.fields["password"].required = "Password must be 4 or more letters and 2 or more numbers.";
   	this.fields["password"].isPassword = ["Password must be 4 or more letters and 2 or more numbers"];
    this.fields["state"].isState = "State is not valid.";
    this.fields["zip"].isZip = "ZIP Code is not valid.";
    this.fields["province"].isProvince = "Province/Territory is not valid.";
    this.fields["postal"].isPostal = "Postal Code is not valid.";
    this.fields["tele"].isPhone = "Phone number is not valid.";
    this.success = "You have successfully joined. We're happy to have you as a member."
}

// Validation methods
JoinForm.prototype.tooShort = function (text, length) {
    return (text.length < length);
}

JoinForm.prototype.matches = function (text1, text2) {
    return (text1 == text2);
}

JoinForm.prototype.isUsername = function(text){
        return /^[a-zA-Z0-9]{4,}[a-zA-Z]*?$/.test(text);
}
JoinForm.prototype.isPassword = function (text) {
    return /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(text);
}
JoinForm.prototype.isName = function(text){
        return /^[a-zA-Z]*$/.test(text);
}
JoinForm.prototype.isEmail = function (text) {
    if (text.length == 0) return false;
    var parts = text.split("@");
    if (parts.length != 2 ) return false;
    if (parts[0].length > 64) return false;
    if (parts[1].length > 255) return false;
    var address =
        "(^[\\w!#$%&'*+/=?^`{|}~-]+(\\.[\\w!#$%&'*+/=?^`{|}~-]+)*$)";
    var quotedText = "(^\"(([^\\\\\"])|(\\\\[\\\\\"]))+\"$)";
    var localPart = new RegExp( address + "|" + quotedText );
    if ( !parts[0].match(localPart) ) return false;
    var hostnames =
        "(([a-zA-Z0-9]\\.)|([a-zA-Z0-9][-a-zA-Z0-9]{0,62}[a-zA-Z0-9]\\.))+";
    var tld = "[a-zA-Z0-9]{2,6}";
    var domainPart = new RegExp("^" + hostnames + tld + "$");
    if ( !parts[1].match(domainPart) ) return false;
    return true;
}

JoinForm.prototype.isCountry = function(country){
	    return true;
}

JoinForm.prototype.isState = function (text) {
    var states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
        "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
        "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
        "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
        "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    for( var i in states ) {
        if ( text == states[i] ) {
            return true;
        }
    }
    return false;
}

JoinForm.prototype.isProvince = function (text) {
    var provinces = ["AB", "BC", "MB", "NB", "NL", "NS", "NU", "NT", "ON", "PE", "QC", "SK", "YT"];
    for( var i in provinces ) {
        if ( text == provinces[i] ) {
            return true;
        }
    }
    return false;
}

JoinForm.prototype.isPostal = function (text) {
    return /^[a-zA-Z]\d[a-zA-Z] ?\d[a-zA-Z]\d$/.test(text);
}

JoinForm.prototype.isZip = function (text) {
    return /^\d{5}(-\d{4})?$/.test(text);
}

JoinForm.prototype.isPhone = function (text) {
    if(text !=''){
        return(/^\d{3}-\d{3}-\d{4}$/.test(text));
    } else{
        return true;
    }
}

JoinForm.prototype.validateField = function (fieldName, text) {
    var field = this.fields[fieldName];
    if (field.required) {
        if ( this.tooShort(text,1) ) {
            throw new Error(field.required);
        }
    }
    if (field.tooShort) {
        if ( this.tooShort(text, field.tooShort[1]) ) {
            throw new Error(field.tooShort[0]);
        }
    }
    // Check if password is valid
    if(field.isPassword){
		 if (! this.isPassword(text, field.isPassword[0].value) ) {
		            throw new Error(field.isPassword[0]);
        }
	}
    if (field.noMatch) {
        if ( ! this.matches(text, $s(field.noMatch[1]).value ) ) {
            throw new Error(field.noMatch[0]);
        }
    }
    if(field.isUsername){

        if ( ! this.isUsername(text) ) {
            throw new Error(field.isUsername);
        }
    }
    if (field.isEmail) {
        if ( ! this.isEmail(text) ) {
            throw new Error(field.isEmail);
        }
    }
    if (field.isFname) {
        if ( ! this.isFname(text) ) {
            throw new Error(field.isFname);
        }
    }
    if (field.isLname) {
        if ( ! this.isLname(text) ) {
            throw new Error(field.isLname);
        }
    }
    if(field.isCountry){
             if ( ! this.isCountry(text) ) {
                throw new Error(field.isCountry);
            }
    }
    if(fieldName == "state" && text != ''){
        if ( ! this.isState(text) ) {
            throw new Error(field.isState);
        }
    }
    if(fieldName == "zip" && text != ''){
        if ( ! this.isZip(text) ) {
            throw new Error(field.isZip);
        }
    }
    if(fieldName == "province" && text != ''){
        if ( ! this.isProvince(text) ) {
            throw new Error(field.isProvince);
        }
    }
    if(fieldName == "postal" && text != ''){
        if ( ! this.isPostal(text) ) {
            throw new Error(field.isPostal);
        }
    }
    if (field.isPhone) {
        if ( ! this.isPhone(text) ) {
            throw new Error(field.isPhone);
        }
    }
}

// Error message methods
JoinForm.prototype.resetErrors = function () {
    var message;
    for ( var fieldName in this.fields ) {
        $s(fieldName + "_error").className = "";
        message = this.fields[fieldName].message;
        $s(fieldName + "_error").firstChild.nodeValue =
            ( message ) ? message : "";
    }
}
// Set default messages
JoinForm.prototype.setMessages = function () {
    var message;
    for ( var fieldName in this.fields ) {
        $s(fieldName + "_error").className = "";
        message = this.fields[fieldName].message;
        if(message == undefined){
        	message = "";
        }
        $s(fieldName + "_error").firstChild.nodeValue = message;
    }
}
JoinForm.prototype.clearError = function ( fieldName ) {
    if(fieldName){
    $s(fieldName + "_error").className = "";
    $s(fieldName + "_error").firstChild.nodeValue = "";
    }
}

// Method to validate form
JoinForm.prototype.validateForm = function () {
    var hasErrors = false;
    var error_count = 0;
    for ( var fieldName in this.fields ) {
        this.clearError(fieldName);
        try {
            this.validateField(fieldName, $s(fieldName).value );
        } catch (error) {
            error_count++;
            hasErrors = true;
            $s(fieldName + "_error").className = "error";
            // Uncomment the following if statement to add an ARIA alert to the error message
            // Only the last alert is read, so limit alerts to the first error
            // so it matches with focus sent to the first message
            //if(error_count == 1){
            //	$s(fieldName + "_error").setAttribute("role", "alert");
            //}
            $s(fieldName + "_error").firstChild.nodeValue = error.message;
            if(error_count == 1){
            	$s(fieldName).focus();
            }
        }
    	
    }
    error_count = 0;
    if(hasErrors === false){
    	$s("feedback").style.display = "inline-block";
        $s("feedback").firstChild.nodeValue = this.success;
        $s("feedback").className = "feedback";
       // Uncomment the next line to add an ARIA alert to the feedback message
       // $s("feedback").setAttribute("role", "alert");
    }
    return hasErrors;
}

