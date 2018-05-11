var dialogsModule = require("ui/dialogs");
var UserViewModel = require("../../shared/view-models/user-view-model");
// var user = new UserViewModel();

//Pass values as we need login a lot
var user = new UserViewModel({
    email: "victoria.alston@nastc.com",
    password: "nastc"
});

// var observableModule = require("data/observable");
// var user = new observableModule.fromObject({
//     email: "user@domain.com",
//     password: "password"
// });

var frameModule = require("ui/frame");

var page;
var email;

exports.loaded = function(args) {
    page = args.object;
    if (page.ios) {
    var navigationBar = frameModule.topmost().ios.controller.navigationBar;
    navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
}
    page.bindingContext = user;
};

exports.signIn = function() {
    user.login()
        .catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function() {
            frameModule.topmost().navigate("views/list/list");
            //frameModule.topmost.navigate("views/dashboard/dashboard");
        });
};

exports.register = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};