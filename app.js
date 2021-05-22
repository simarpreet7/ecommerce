var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    homeroutes              = require("./routes/home.routes"),
    authroutes              = require("./routes/auth.routes"),
    dashboardroute          = require("./routes/dashboard.routes"),
    cartroute               = require('./routes/cart.routes'),
    searchroute             = require("./routes/search.routes"),
    wishListroute           = require("./routes/wishlist.routes"),
    orderroute              = require("./routes/order.routes"),
    contactusroute          = require("./routes/contactus.routes"),
    saleroute               = require("./routes/sale.routes"),
    aboutusroute            = require("./routes/aboutus.routes"),
    tncroute                = require("./routes/terms&conditions.routes"),
    privacypolicyroute      = require("./routes/privacypolicy.routes"),
    profileroute            = require("./routes/profile.routes"),
    sellerroute             = require("./routes/seller.routes")

var methodOverride = require("method-override");
var app = express();
var port=4000;
var mongoURL = "mongodb+srv://arnav:aryan@cluster0.ucqrc.mongodb.net/amazondb?retryWrites=true&w=majority";
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/public", express.static("public"));
app.use(require("express-session")({
    secret:"Rusty is the best og in the worldpassport ",
    resave: false,
    saveUninitialized: false
}));



app.set('view engine','ejs');
//
app.use(passport.initialize());
app.use(passport.session());
// 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req, res){
    res.redirect("/auth/signup");
})
app.use("/home", homeroutes);
app.use("/auth", authroutes);
app.use("/dashboard", dashboardroute);
app.use("/cart", cartroute);
app.use("/search", searchroute);
app.use("/wishlist", wishListroute);
app.use("/order", orderroute);
app.use("/contactus", contactusroute);
app.use("/sale", saleroute);
app.use("/aboutus", aboutusroute);
app.use("/terms&conditions", tncroute);
app.use("/privacypolicy", privacypolicyroute);
app.use("/profile", profileroute);
app.use("/seller", sellerroute);

app.listen(port, function(){
    console.log("connected to port : ",port);
});