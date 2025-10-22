System.register(['angular2/core', 'angular2/http', 'angular2/router', '../04Search/search.component'], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, search_component_1;
    var GalleryComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (search_component_1_1) {
                search_component_1 = search_component_1_1;
            }],
        execute: function () {
            GalleryComponent = (function () {
                function GalleryComponent(_routeParams1, _http, renderer, _router, elementRef, _sc) {
                    var _this = this;
                    this._routeParams1 = _routeParams1;
                    this._http = _http;
                    this.renderer = renderer;
                    this._router = _router;
                    this._sc = _sc;
                    this.numbervar = 0;
                    this.OnChangeVar = 0;
                    this.lazyvar = 0;
                    this.UserID = DB.getItem("UserID");
                    this.systemUrl = "https://" + Token + ".stoneprofits.com/api/fetchdataAngularProductionToyota.ashx";
                    this.TrimmedUserID = this.UserID.slice(2, this.UserID.length);
                    this.elementRef = elementRef;
                    this.renderer.listenGlobal('window', 'scroll', function (evt) { _this.onScroll(); });
                    window.addEventListener("beforeunload", function (e) {
                        DB.clear();
                    });
                }
                GalleryComponent.prototype.ngOnChanges = function () {
                    this.numbervar = this.numbervar + 1;
                    this.lazyvar = 0;
                };

                var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": SPSWebToken });
                var options = new http_1.RequestOptions({ headers: headers });

                GalleryComponent.prototype.ngOnInit = function () {
                    this.systemUrl = "https://" + Token + ".stoneprofits.com/api/fetchdataAngularProductionToyota.ashx";
                    //console.log('Local storage: '+ DB.getItem('webConnectSettings'));
                    this.NumberOfPages = parseInt(document.getElementById("hiddenNumberOfPages").innerHTML);
                    document.getElementById("hiddenNumberOfPages").innerHTML;
                    this.counter = true;
                    this.gallery = null;                    
                    document.getElementById('headerId').innerHTML = "<span id='GalleryPageTitle'></span>";
                    this.getSettings();
                    document.getElementById('goBackID').setAttribute("style", "display: none;");                                                        
                };
                GalleryComponent.prototype.onScroll = function () {
                    jQuery("img.lazy").lazyload({
                        threshold: 1500
                    });
                };
                GalleryComponent.prototype.showGallery = function () {
                    // console.log(this.counter);
                    //if (this.counter) {
                    if (this.gallery != null) {
                        this.gallery.data('lightGallery').destroy(true);
                    }
                    this.gallery = jQuery(this.elementRef.nativeElement).find('#ItemGallery');
                    this.gallery.lightGallery({ selector: '.Gallery', loop: false, mode: 'lg-slide', width: '1024px', thumbnail: false, hash: false, share: false, download: false, actualSize: false });
                    //  this.counter = false;        
                };
                GalleryComponent.prototype.lightGallery = function () {
                    this.lazyvar = this.lazyvar + 1;
                    if (this.lazyvar == 2) {
                        this.onScroll();
                    }
                    if (parseInt(DB.getItem("PerPage")) > parseInt(document.getElementById('ProductCount').innerHTML)) {
                        document.getElementById('pagingTop').setAttribute("style", "display: none;");
                        document.getElementById('pagingBottom').setAttribute("style", "display: none;");
                        document.getElementById('perPageLHS').setAttribute("style", "display: none;");
                        if (document.getElementById('ProductCount').innerHTML === "0") {
                            document.getElementById('NoneFoundID').setAttribute("style", "display: display; align:center");
                        }
                        else {
                            document.getElementById('NoneFoundID').setAttribute("style", "display: none; align:center");
                        }
                    }
                    else {
                        document.getElementById('pagingTop').setAttribute("style", "display: display;");
                        document.getElementById('pagingBottom').setAttribute("style", "display: display;");
                        document.getElementById('perPageLHS').setAttribute("style", "display: display;");
                        document.getElementById('NoneFoundID').setAttribute("style", "display: none; align:center");
                    }
                    $('span').removeClass('clicked')
                    if (parseInt(DB.getItem("PerPage")) > 0)
                        $('#span' + DB.getItem("PerPage")).addClass('clicked')
                    if (document.getElementById('LastPage').innerHTML === "0") {
                        document.getElementById('GalleryDivID').innerHTML == "None found";
                    }

                    if (DB.getItem('CurrentPage') && document.getElementById('hiddenGoToPage').innerHTML != '1') {
                        document.getElementById("CurrentPage").innerHTML = DB.getItem('CurrentPage');
                        this.CurrentPage = parseInt(document.getElementById('CurrentPage').innerHTML);
                    }
                    if (parseInt(document.getElementById('CurrentPage').innerHTML) > parseInt(document.getElementById('LastPage').innerHTML)) {
                        document.getElementById("CurrentPage").innerHTML = document.getElementById('LastPage').innerHTML;
                        this.CurrentPage = parseInt(document.getElementById('CurrentPage').innerHTML);
                    }
                    if (parseInt(document.getElementById('CurrentPage').innerHTML) < 1) {
                        document.getElementById('CurrentPage').innerHTML = "1";
                        this.CurrentPage = parseInt(document.getElementById('CurrentPage').innerHTML);
                    }
                    this.CurrentPage = parseInt(document.getElementById('CurrentPage').innerHTML);
                    this.LastPage = parseInt(document.getElementById('hiddenNumberOfPages').innerHTML);
                    document.getElementById('LastPage').innerHTML = document.getElementById('hiddenNumberOfPages').innerHTML;
                    document.getElementById('ProductCount').innerHTML = document.getElementById('hiddenCount').innerHTML;
                };
                GalleryComponent.prototype.AddToCollection = function (Inventory) {
                    var _this = this;
                    var str = this.WCSettings[0]["GroupInventoryBy"].replace(/,/g, '_');
                    str = str.substring(0, str.length - 1);
                    var res = str.split("_");
                    var GroupByParametersL = [];
                    var GroupByParametersR = [];
                    var GroupByParameters = "";
                    var i = 0;
                    for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                        var parameter = res_1[_i];
                        if (parameter == 'IDOne') {
                            GroupByParametersL.push(parameter);
                            GroupByParametersR.push(Inventory.IDOne);
                        }
                        else if (parameter == 'IDTwo') {
                            GroupByParametersL.push(parameter);
                            GroupByParametersR.push(Inventory.IDTwo);
                        }
                        else if (parameter == 'IDThree') {
                            GroupByParametersL.push(parameter);
                            GroupByParametersR.push(Inventory.IDThree);
                        }
                        else if (parameter == 'Lot') {
                            GroupByParametersL.push("SerialPrefix");
                            GroupByParametersR.push(Inventory.SerialPrefix);
                        }
                        GroupByParameters += " &" + GroupByParametersL[i] + "=" + GroupByParametersR[i];
                        i = i + 1;
                    }
                    this._http.get(this.systemUrl + '?act=AddToWebCart&ItemID=' + Inventory.ItemID + '&Type=' + Inventory.ProductFormValue + '&Category=' + Inventory.CategoryName + '&ItemName=' + Inventory.ItemName + '&FileName=' + Inventory.Filename + '&UserID=' + this.TrimmedUserID + '&FileID=' + Inventory.FileID + '&AvgWidth=' + Inventory.AverageWidth + '&AvgLength=' + Inventory.AverageLength + '' + GroupByParameters + '&AvailableQty=' + Inventory.AvailableQty + '&AvailableSlabs=' + Inventory.AvailableSlabs + '&UOM=' + Inventory.UOM + '&GroupInventoryBy=' + this.WCSettings[0]["GroupInventoryBy"].replace(/,/g, '_'), options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return Inventory.WebCartID = data; }, function (err) { return _this.logError(err); }, function () { return _this.getCartCount(_this.TrimmedUserID); });
                };
                GalleryComponent.prototype.RemoveFromCollection = function (Inventory) {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=RemoveFromWebCart&WebCartID=' + Inventory.WebCartID, options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return Inventory.WebCartID = 0; }, function (err) { return _this.logError(err); }, function () { return _this.getCartCount(_this.TrimmedUserID); });
                };
                GalleryComponent.prototype.getCartCount = function (Uid) {
                    var _this = this;
                    if (this.WCSettings[0]["SearchType"] == "Top") {
                        this.paging = ['36', '40', '80', '1000'];
                    }
                    if (this.WCSettings[0]["SearchType"] != "Top") {
                        this.paging = ['36', '60', '120', '1000'];
                    }
                    this._http.get(this.systemUrl + '?act=getCartCount&Uid=' + Uid + '&q=' + new Date().getTime(), options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.CartCount = data; }, function (err) { return _this.logError(err); }, function () { return console.log(document.getElementById('countId').innerHTML = _this.CartCount[0].Count); });
                };
                GalleryComponent.prototype.gotoDetail = function (Item) {
					//var link = ['InventoryItemDetail', { name: Item.ItemName.split(/[^a-zA-Z0-9]/g).join('-'), id: JSON.stringify(Item.ItemID) }];
					// Added if else condition to get the location id while filtering with location
                    //console.log(document.getElementById('').innerHTML)
                    //console.log(document.getElementById('SelectedSlabOption').innerHTML)
					if (document.getElementById('SelectedLocation').innerHTML != '' && document.getElementById('SelectedLocation').innerHTML != null)
					{
					var link = ['InventoryItemDetail', { name: Item.ItemName.split(/[^a-zA-Z0-9]/g).join('-'), id: JSON.stringify(Item.ItemID), Location: document.getElementById('SelectedLocation').innerHTML  }];
					}
                    else if (document.getElementById('SelectedSlabOption').innerHTML != '' && document.getElementById('SelectedSlabOption').innerHTML != null)
                    {
                    var link = ['InventoryItemDetail', { name: Item.ItemName.split(/[^a-zA-Z0-9]/g).join('-'), id: JSON.stringify(Item.ItemID), slaboption: document.getElementById('SelectedSlabOption').innerHTML.replace(' ','-')  }];
                    }
					else{
                    var link = ['InventoryItemDetail', { name: Item.ItemName.split(/[^a-zA-Z0-9]/g).join('-'), id: JSON.stringify(Item.ItemID) }];
					}
                    this._router.navigate(link);
                };
                GalleryComponent.prototype.onChange = function (x) {
                    $('span').removeClass('clicked');
                    if (x == '20') {
                        this.perPage = '20';
                        $('#span' + this.perPage).addClass('clicked')
                        document.getElementById('pagingTop').setAttribute("style", "display: display;");
                    }
                    else if (x == '40') {
                        this.perPage = '40';
                        $('#span' + this.perPage).addClass('clicked')
                        document.getElementById('pagingTop').setAttribute("style", "display: display;");
                    }
                    else if (x == '80') {
                        this.perPage = '80';
                        $('#span' + this.perPage).addClass('clicked')
                        document.getElementById('pagingTop').setAttribute("style", "display: display;");
                    }
                    else if (x == '1000') {
                        this.perPage = '1000';
                        $('#span' + this.perPage).addClass('clicked')
                        document.getElementById('pagingTop').setAttribute("style", "display: display;");
                    }
                    else if (x == '36') {
                        this.perPage = '36';
                        $('#span' + this.perPage).addClass('clicked')
                        document.getElementById('pagingTop').setAttribute("style", "display: display;");
                    }
                    else if (x == '60') {
                        this.perPage = '60';
                        $('#span' + this.perPage).addClass('clicked')
                        document.getElementById('pagingTop').setAttribute("style", "display: display;");
                    }
                    else if (x == '120') {
                        this.perPage = '120';
                        $('#span' + this.perPage).addClass('clicked')
                        document.getElementById('pagingTop').setAttribute("style", "display: display;");
                    }
                    else if (x == 'All') {
                        this.perPage = '-1';
                        document.getElementById('pagingTop').setAttribute("style", "display: none;");
                        document.getElementById('pagingBottom').setAttribute("style", "display: none;");
                    }
                    DB.setItem('PerPage', this.perPage);
                    DB.setItem('CurrentPage', 1);
                    document.getElementById('HiddenItemsPerPage').innerHTML = this.perPage;
                    document.getElementById('hiddenGoToPage').innerHTML = '1';
                    document.getElementById("CurrentPage").innerHTML = '1';
                    document.getElementById('btnsearchForm').click();
                };
                GalleryComponent.prototype.logError = function (err) {
                    console.error("There was an error:" + err);
                };
                GalleryComponent.prototype.getSettings = function () {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=getSettings&WebconnectSettingID='+ WebconnectSettingID +'&q=' + new Date().getTime() + '&q=' + new Date().getTime(), options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { 
                            this.MetaDataSettings = data[0] ;                              
                            if(this.MetaDataSettings.WebPageTitle1 != "" && this.MetaDataSettings.WebPageTitle != null){                                
                                $("title").text(this.MetaDataSettings.WebPageTitle);
                            }
                            else{
                                $("title").text("" + Company + " | " + Products + "");
                            }

                            if(this.MetaDataSettings.MetaDescription != "" && this.MetaDataSettings.MetaDescription != null){                                
                                $("meta[name='description']").attr("content", this.MetaDataSettings.MetaDescription); 
                            }
                            else{
                                $("meta[name='description']").attr("content", "View our wide selection of " + Products + ", and more at " + Company + "");
                            }

                            if(this.MetaDataSettings.MetaKeyWords != "" && this.MetaDataSettings.MetaKeyWords != null){                                
                                $("meta[name='keywords']").attr("content", this.MetaDataSettings.MetaKeyWords); 
                            }                            

                            if(this.MetaDataSettings.OgTitle != "" && this.MetaDataSettings.OgTitle != null){                                
                                $("meta[property='og:title']").attr("content", this.MetaDataSettings.OgTitle);
                            }
                            else{
                                $("meta[property='og:title']").attr("content", "" + Company + " " + Products + ", and More ");
                            }

                            if(this.MetaDataSettings.OgDescription != "" && this.MetaDataSettings.OgDescription != null){                                
                                $("meta[property='og:description']").attr("content", this.MetaDataSettings.OgDescription);
                            }
                            else{
                                $("meta[property='og:description']").attr("content", "View our wide selection of " + Products + ", and more at " + Company + "");
                            }                           

                            if(this.MetaDataSettings.OgImage != "" && this.MetaDataSettings.OgImage != null){                                
                                $("meta[name='og:image']").attr("content", "" + this.MetaDataSettings.OgImage + "");  
                            }
                            else{
                                $("meta[name='og:image']").attr("content", "" + ogImage + "");  
                            }                             
                            $("meta[name='og:url']").attr("content", "" + Domain + "");                                                              
                        
                            return _this.WCSettings = data; 
                        }, function (err) { return _this.logError(err); }, function () { return });
                };
                GalleryComponent.prototype.nextPage = function () {
                    document.getElementById('hiddenTimeAtNonSubmit').innerHTML = (new Date()).toString();
                    document.getElementById('hiddenGoToPage').innerHTML = (parseInt(document.getElementById('CurrentPage').innerHTML) + 1).toString();
                    DB.setItem('CurrentPage', document.getElementById('hiddenGoToPage').innerHTML);
                    document.getElementById('btnsearchForm').click();
                    if (parseInt(document.getElementById('hiddenGoToPage').innerHTML) <= parseInt(document.getElementById("LastPage").innerHTML)) {
                        if (parseInt(document.getElementById('hiddenGoToPage').innerHTML) > parseInt(document.getElementById('hiddenNumberOfPages').innerHTML)) {
                            document.getElementById("CurrentPage").innerHTML = (parseInt(document.getElementById('hiddenGoToPage').innerHTML) - 1).toString();
                        }
                        else {
                            document.getElementById("CurrentPage").innerHTML = document.getElementById('hiddenGoToPage').innerHTML;
                        }
                    }
                    // scrollTo(document.body, 0, 10);
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                };
                GalleryComponent.prototype.prevPage = function () {
                    document.getElementById('hiddenTimeAtNonSubmit').innerHTML = (new Date()).toString();
                    document.getElementById('hiddenGoToPage').innerHTML = (parseInt(document.getElementById('CurrentPage').innerHTML) - 1).toString();
                    DB.setItem('CurrentPage', document.getElementById('hiddenGoToPage').innerHTML);
                    document.getElementById('btnsearchForm').click();
                    if (parseInt(document.getElementById('hiddenGoToPage').innerHTML) < 1) {
                        document.getElementById('hiddenGoToPage').innerHTML = '1';
                        document.getElementById("CurrentPage").innerHTML = '1';
                    }
                    else {
                        document.getElementById("CurrentPage").innerHTML = document.getElementById('hiddenGoToPage').innerHTML;
                    }
                    //console.log(DB.getItem('CurrentPage'))
                    // scrollTo(document.body, 0, 10);
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                };

                GalleryComponent.prototype.firstPage = function () {
                    document.getElementById('hiddenTimeAtNonSubmit').innerHTML = (new Date()).toString();
                    document.getElementById('hiddenGoToPage').innerHTML = '1';
                    document.getElementById('btnsearchForm').click();
                    DB.setItem('CurrentPage', document.getElementById('hiddenGoToPage').innerHTML);
                    document.getElementById('hiddenGoToPage').innerHTML = '1';
                    document.getElementById("CurrentPage").innerHTML = '1';
                    // scrollTo(document.body, 0, 10);
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                };
                GalleryComponent.prototype.lastPage = function () {
                    document.getElementById('hiddenTimeAtNonSubmit').innerHTML = (new Date()).toString();
                    document.getElementById('hiddenGoToPage').innerHTML = document.getElementById('hiddenNumberOfPages').innerHTML;
                    DB.setItem('CurrentPage', document.getElementById('hiddenNumberOfPages').innerHTML);
                    document.getElementById("CurrentPage").innerHTML = document.getElementById('hiddenNumberOfPages').innerHTML;
                    document.getElementById('btnsearchForm').click();
                    // scrollTo(document.body, 0, 10);
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                };

                GalleryComponent.prototype.exactPage = function (pageNumber) {
                    document.getElementById('hiddenTimeAtNonSubmit').innerHTML = (new Date()).toString();
                    document.getElementById('hiddenGoToPage').innerHTML = pageNumber;
                    DB.setItem('CurrentPage', document.getElementById('hiddenGoToPage').innerHTML);
                    document.getElementById('btnsearchForm').click();
                    document.getElementById("CurrentPage").innerHTML = pageNumber;
                    // scrollTo(document.body, 0, 10);
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                };
                GalleryComponent.prototype.EmailSingleImage = function (Item, i, FileServer, VirtualDirectoryName, IDOneLable, IDTwoLable, IDThreeLable, SerialPrefixLable) {
                    var _this = this;
                    var HomeLocation;
                    //var str = location.href,
                    //delimiter = '/',
                    //start = 3,
                    //tokens = str.split(delimiter).slice(start),
                    //result = tokens.join(delimiter);
                    //HomeLocation = location.href.split(result)[0]
                    // HomeLocation = location.href;
                     HomeLocation = location.href.replace(/[^a-zA-Z0-9\/.:]+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');

                    //location.href = location.href.split(result)[0];
                    document.getElementById('SendingMail1').innerHTML = "<img style='-webkit-user-select: none; margin-left:500px; position:relative; margin-top:-30px; width:2%' src='image/loading.gif'/>";
                    if (document.getElementById('email1_' + i).value && document.getElementById('email2_' + i).value) {
                        this.EmailID = "" + document.getElementById('email1_' + i).value + ", " + document.getElementById('email2_' + i).value + ",";
                    }
                    else if ("" + document.getElementById('email1_' + i).value != "") {
                        this.EmailID = "" + document.getElementById('email1_' + i).value + ",";
                    }
                    else if ("" + document.getElementById('email2_' + i).value != "") {
                        this.EmailID = "" + document.getElementById('email2_' + i).value + ",";
                    }
                    if (this.EmailID == undefined) {
                        alert("Please provide atleast one Email Id to send an email.");
                        document.getElementById('SendingMail1').innerHTML = "";
                    }
                    else {
                        if (document.getElementById('email1_' + i).value) {
                            var x1 = document.getElementById('email1_' + i).value;
                            var atpos1 = x1.indexOf("@");
                            var dotpos1 = x1.lastIndexOf(".");
                            if (atpos1 < 1 || dotpos1 < atpos1 + 2 || dotpos1 + 2 >= x1.length) {
                                alert("Not a valid e-mail address");
                                document.getElementById('SendingMail1').innerHTML = "";
                            }
                            else {
                                if (document.getElementById('email2_' + i).value) {
                                    var x2 = document.getElementById('email2_' + i).value;
                                    var atpos2 = x2.indexOf("@");
                                    var dotpos2 = x2.lastIndexOf(".");
                                    if (atpos2 < 1 || dotpos2 < atpos2 + 2 || dotpos2 + 2 >= x2.length) {
                                        alert("Not a valid e-mail address");
                                        document.getElementById('SendingMail1').innerHTML = "";
                                    }
                                    else {
                                        this._http.get(this.systemUrl + '?act=emailSingleImage&TrimmedUserID=' + this.TrimmedUserID + '&HomeLocation=' + HomeLocation + '&EmailID=' + this.EmailID + '&IDOne=' + Item.IDOne + '&IDOneLable=' + IDOneLable + '&IDTwo=' + Item.IDTwo + '&IDTwoLable=' + IDTwoLable + '&IDThree=' + Item.IDThree + '&IDThreeLable=' + IDThreeLable + '&SerialPrefix=' + Item.SerialPrefix + '&SerialPrefixLable=' + SerialPrefixLable + '&ItemName=' + Item.ItemName + '&AvgWidth=' + Item.AverageWidth + '&AvgLength=' + Item.AverageLength + '&Category=' + Item.CategoryName + '&AvailableQty=' + Item.AvailableQty + '&UOM=' + Item.UOM + '&AvailableSlabs=' + Item.AvailableSlabs + '&Type=' + Item.ProductFormValue + '&FileServer=' + FileServer + '&VirtualDirectoryName=' + VirtualDirectoryName + '&FileName=' + Item.Filename + '&Location=' + Item.Location + '&Group=' + Item.ProductGroup, options)
                                            .map(function (res) { return res.json(); })
                                            .subscribe(function (data) { return _this.MailData = data; }, function (err) { return _this.EmailError(err); }, function () { return _this.EmailSent(); });
                                    }
                                }
                                else {
                                    this._http.get(this.systemUrl + '?act=emailSingleImage&TrimmedUserID=' + this.TrimmedUserID + '&HomeLocation=' + HomeLocation + '&EmailID=' + this.EmailID + '&IDOne=' + Item.IDOne + '&IDOneLable=' + IDOneLable + '&IDTwo=' + Item.IDTwo + '&IDTwoLable=' + IDTwoLable + '&IDThree=' + Item.IDThree + '&IDThreeLable=' + IDThreeLable + '&SerialPrefix=' + Item.SerialPrefix + '&SerialPrefixLable=' + SerialPrefixLable + '&ItemName=' + Item.ItemName + '&AvgWidth=' + Item.AverageWidth + '&AvgLength=' + Item.AverageLength + '&Category=' + Item.CategoryName + '&AvailableQty=' + Item.AvailableQty + '&UOM=' + Item.UOM + '&AvailableSlabs=' + Item.AvailableSlabs + '&Type=' + Item.ProductFormValue + '&FileServer=' + FileServer + '&VirtualDirectoryName=' + VirtualDirectoryName + '&FileName=' + Item.Filename + '&Location=' + Item.Location + '&Group=' + Item.ProductGroup, options)
                                        .map(function (res) { return res.json(); })
                                        .subscribe(function (data) { return _this.MailData = data; }, function (err) { return _this.EmailError(err); }, function () { return _this.EmailSent(); });
                                }
                            }
                        }
                    }
                };
                GalleryComponent.prototype.EmailSent = function () {
                    alert("Email sent successfully");
                    document.getElementById('SendingMail1').innerHTML = "";
                };
                GalleryComponent.prototype.EmailError = function (err) {
                    //document.getElementById('SendingMail1').setAttribute("style", "display: none;");	
                    //console.error("There was an error:" + err);
                    // alert("Some thing went wrong, Email was not sent!");
                    alert("The email was not sent. Please contact us for assistance.");
                    document.getElementById('SendingMail1').innerHTML = "";
                };
                GalleryComponent.prototype.getCompanyInfo = function () {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=getCompanyInfo' + '&q=' + new Date().getTime(), options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.CompanyInfo = data; }, function (err) { return _this.logError(err); }, function () { return console.log("Company information is loaded."); });
                };
                __decorate([
                    core_1.Input(),
                    __metadata('design:type', Array)
                ], GalleryComponent.prototype, "ItemGallery", void 0);
                GalleryComponent = __decorate([
                    core_1.Component({
                        selector: 'GallerySection',
                        templateUrl: galleryHtmlPage,
                        //templateUrl: './app/Gallery/Gallery.html',
                        providers: [search_component_1.SearchComponent]
                    }),
                    __metadata('design:paramtypes', [router_1.RouteParams, http_1.Http, core_1.Renderer, router_1.Router, core_1.ElementRef, search_component_1.SearchComponent])
                ], GalleryComponent);
                return GalleryComponent;
            }());
            exports_1("GalleryComponent", GalleryComponent);
        }
    }
});

function scrollTo(element, to, duration) {
    if (duration < 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 2;

    setTimeout(function () {
        element.scrollTop = element.scrollTop + perTick;
        scrollTo(element, to, duration - 2);
    }, 10);
}
//# sourceMappingURL=gallery.component.js.map