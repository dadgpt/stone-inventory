System.register(['angular2/core', 'angular2/http', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1;
    var InventoryDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            InventoryDetailComponent = (function () {
                function InventoryDetailComponent(_routeParams, _http, elementRef, _location, _router) {
                    this._routeParams = _routeParams;
                    this._http = _http;
                    this.systemUrl = ""; 
                    this._router = _router;  

                    this.ButtonClass = "";
                    this.UserID = DB.getItem("UserID");
                    this.TrimmedUserID = this.UserID.slice(2, this.UserID.length);
                    this.elementRef = elementRef;
                    this.lazyvar = 0;
                }
                    
    var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization":SPSWebToken });
    var options = new http_1.RequestOptions({ headers: headers });

                InventoryDetailComponent.prototype.ngOnInit = function () {
                    this.systemUrl = "https://" + Token + ".stoneprofits.com/api/fetchdataAngularProductionToyota.ashx";
                    document.getElementById('headerId').innerHTML = "<span id='DetailPageTitle'></span>";
                    document.getElementById('goBackID').setAttribute("style", "display: block;");
                    this.counter = true;
                    var id = +this._routeParams.get('id');
                    this.getItemColors(id);
                    this.getSettings(id, this.TrimmedUserID);
                    this.getItemDetails(id);
					this.Download();                    
                };
                InventoryDetailComponent.prototype.ngOnChanges = function () {
                    this.lazyvar = 0;
                };
                InventoryDetailComponent.prototype.onScroll = function () {
                    jQuery("img.lazy").lazyload({
                        threshold: 800000
                    });
                };
				
                InventoryDetailComponent.prototype.lightGallery = function () {
					this.lazyvar = this.lazyvar + 1;
                    if (this.lazyvar == 2) {
                        this.onScroll();
                    }
                    if (this.counter) {
                        jQuery(this.elementRef.nativeElement).find('#DetailGallery').lightGallery({
                            selector: '.Gallery',
                            loop: false,
                            mode: 'lg-slide',
                            width: '1024px', 
							thumbnail: false,
							hash: false,
							share: false,
							download: false,
							actualSize: true,
							scale:1

                        });
                        this.counter = false;
                    }
                };
				//To close lightgallery when clicking on browser back button
					$(window).on('popstate', function(event) {
					$('#DetailGallery').data('lightGallery').destroy(true);
					});
	
				InventoryDetailComponent.prototype.ngAfterContentChecked = function () {
					var userAgent, ieReg, ie;
					userAgent = window.navigator.userAgent;
					ieReg = /msie|Trident.*rv[ :]*11\./gi;
					ie = ieReg.test(userAgent);
					if(ie) {						
					  $(".ImgWrap").each(function () {
						var $container = $(this),
							imgUrl = $container.find("img").prop("src");
						if (imgUrl) {
						  $container.css("backgroundImage", 'url(' + imgUrl + ')').addClass("ms-object-fit");
						}
					  });
					}
				};
                InventoryDetailComponent.prototype.getSettings = function (id, TrimmedUserID) {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=getSettings&WebconnectSettingID='+ WebconnectSettingID +'&q=' + new Date().getTime() , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.WCSettings = data; }, function (err) { return _this.logError(err); }, function () { 
                                                       
                            return _this.getItemInventory(id, TrimmedUserID, _this.WCSettings[0]["GroupInventoryBy"].replace(/,/g, '_'), _this.WCSettings[0]["ShowRemnantsinDetail"], _this.WCSettings[0]["ShowRemnantsasSeparateSection"]); });

                    this._http.get(this.systemUrl + '?act=getSearchSettings&q=' + new Date().getTime(), options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {                               
                            _this.IDOneLable = data[0].IDOneSlabLabel;
                            _this.IDTwoLable = data[0].IDTwoSlabLabel;
                            _this.IDThreeLable = data[0].IDThreeSlabLabel;
                            _this.SerialPrefixLable = data[0].SerialPrefixLable;
                        })
                };
				InventoryDetailComponent.prototype.GetSortOrder =function (prop) { 
					return function(a, b) {    
						if (a[prop] < b[prop]) {    
							return 1;    
						} else if (a[prop] > b[prop]) {    
							return -1;    
						}    
						return 0;    
					}  
				}
                InventoryDetailComponent.prototype.getItemInventory = function (id, TrimmedUserID, InventoryGroupBy, ShowRemnantsinDetail, ShowRemnantsasSeparateSection) {
                    var _this = this;
					var SelectedLocationName,LocationName;					

					if(DB.getItem("Location") != ''){
						document.getElementById('SelectedLocation').innerHTML = DB.getItem("Location");
						LocationName = _this._routeParams.get('Location');
						SelectedLocationName = _this._routeParams.get('location');
					}
					else if(_this._routeParams.get('location') != '' && _this._routeParams.get('location') != 'undefined'){
						document.getElementById('SelectedLocation').innerHTML = _this._routeParams.get('location');
						DB.setItem("Location",(document.getElementById('SelectedLocation').innerHTML).replace('%20',' '))
					}
                    document.getElementById('myNav').setAttribute("style", "display: none;");
                    this._http.get(this.systemUrl + '?act=getItemInventory&WebconnectSettingID='+ WebconnectSettingID +'&id=' + id + '&InventoryGroupBy=' + InventoryGroupBy + '&TrimmedUserID=' + TrimmedUserID + '&OnHold=' + this.WCSettings[0]["IncludeInventoryOnHold"] + '&OnSO=' + this.WCSettings[0]["IncludeInventoryOnSO"] + '&Intransit=' + this.WCSettings[0]["IncludeInventoryOnTransfer"] + '&SelctdLocation=' + LocationName + '&ShowLocationinGallery=' + this.WCSettings[0]["ShowLocationinGallery"]+ '&LotPicturesRestrictToSIPL=' + this.WCSettings[0]["LotPictures_RestrictToSIPL"] +'&q=' + new Date().getTime()+ '&DetailLocation='+SelectedLocationName , options)
                        .map(function (res) {
                            if(_this._routeParams.get('slaboption') != null && _this._routeParams.get('slaboption') != '' && _this._routeParams.get('slaboption') != 'undefined'){                                                                   
                                var SelectedSlabOptionValue = _this._routeParams.get('slaboption');                                
                                if(SelectedSlabOptionValue  == 'Remnant' || SelectedSlabOptionValue  == 'remnant')
                                {
                                    return res.json().filter(function (_){return _.Remnant == 'on';});	                                   
                                }
                                else if(SelectedSlabOptionValue  == 'Full Slab' || SelectedSlabOptionValue  == 'Full-Slab'){
                                    return res.json().filter(function (_){return _.Remnant == '';});	  
                                } 
                                else{
                                    _this.getNonSlabInventoryDetails(_this.TrimmedUserID, id); return res.json().sort(_this.GetSortOrder("FileName")); 
                                }  

                            }
                            else{
                                _this.getNonSlabInventoryDetails(_this.TrimmedUserID, id); return res.json().sort(_this.GetSortOrder("FileName")); 
                            }
                            
                        })
                        .subscribe(function (data) {                                                      
                            
                            //console.log(_this.WCSettings, _this.WCSettings[0]["ShowSlabSmithImagesinDetail"], "_this.WCSettings");                            
                            if(_this.WCSettings[0]["ShowSlabSmithImagesinDetail"] == 'on')
                                {
                                    for (let item of data) {  
                                        if(item.SlabSmithFileName != ''){                                      
                                        item.FileName = item.SlabSmithFileName;
                                        }
                                        else{
                                            item.FileName = ""; 
                                        }
                                    }                                    
                                }
                                //return _this.ItemInventory = data;                                                          
                                return _this.ItemInventory = data.sort(_this.GetSortOrder("AvailableSlabs"))
                                
                                
                        }, function (err) { return _this.logError(err); }, function () { 
						if(SelectedLocationName == 'Chicago'){
								$('#InventoryHref').attr('href', '/stock/Location/Chicago');
							}
						else if(SelectedLocationName == 'KY'){
								$('#InventoryHref').attr('href', '/stock/Location/KY');

						}                                 
                        //if(ShowSlabSmithImagesinDetail == "on"){ _this.getItemSlabsmithInventory(_this.TrimmedUserID, id); }                            
                        if(ShowRemnantsinDetail == 'on')
                        {
                            _this.getItemRemnantInventory(id, TrimmedUserID,_this.WCSettings[0]["GroupInventoryBy"].replace(/,/g, '_'), ShowRemnantsinDetail, ShowRemnantsasSeparateSection);                            
                        }                                                                                            
						return _this.getCartCount(_this.TrimmedUserID); });

                       
                };
                InventoryDetailComponent.prototype.getItemRemnantInventory = function (id, TrimmedUserID, InventoryGroupBy, ShowRemnantsinDetail, ShowRemnantsasSeparateSection) {                     
                    var _this = this;                  
                    this._http.get(this.systemUrl + '?act=getItemInventory&WebconnectSettingID='+ WebconnectSettingID +'&onlyRemnants=on&id=' + id + '&InventoryGroupBy=' + InventoryGroupBy + '&TrimmedUserID=' + TrimmedUserID + '&OnHold=' + this.WCSettings[0]["IncludeInventoryOnHold"] + '&OnSO=' + this.WCSettings[0]["IncludeInventoryOnSO"] + '&Intransit=' + this.WCSettings[0]["IncludeInventoryOnTransfer"] + '&SelctdLocation=&ShowLocationinGallery=' + this.WCSettings[0]["ShowLocationinGallery"]+ '&LotPicturesRestrictToSIPL=' + this.WCSettings[0]["LotPictures_RestrictToSIPL"] +'&q=' + new Date().getTime(),options)
                    .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.RemnantItemInventory = data; }, function (err) { 
                            return _this.logError(err); }, function () { 
                                if(_this.WCSettings[0]["ShowSlabSmithImagesinDetail"] == 'on')
                                    {
                                        for (let item of _this.RemnantItemInventory) {  
                                            if(item.SlabSmithFileName != ''){                                      
                                            item.FileName = item.SlabSmithFileName;
                                            }
                                            else{
                                                item.FileName = ""; 
                                            }
                                        }                                    
                                    }
                                if(ShowRemnantsasSeparateSection != 'on')
                                {
                                    for (let item of _this.RemnantItemInventory) {_this.ItemInventory.push(item);}
                                    _this.RemnantItemInventory = [];
                                }
                                //return console.log("Item RemnantItemInventory loaded"); 
                            });
                };

                InventoryDetailComponent.prototype.getItemDetails = function (id) {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=getProductDetails&id=' + id +'&q=' + new Date().getTime() , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { 
					
					return _this.ItemDetails = data; }, function (err) { return _this.logError(err); }, function () { $("title").text("" +_this.ItemDetails[0].Name +" "+_this.ItemDetails[0].ProductColor+" "+_this.ItemDetails[0].ServiceCategoryValue+" "+_this.ItemDetails[0].ProductSubCategory+" " +_this.ItemDetails[0].ProductFormValue+" | "+Company+"" );
						$("meta[name='description']").attr("content", "Check out our supply of "+_this.ItemDetails[0].Name +" " +_this.ItemDetails[0].ProductColor+" " +_this.ItemDetails[0].ServiceCategoryValue+" "+_this.ItemDetails[0].ProductSubCategory+" " +_this.ItemDetails[0].ProductFormValue+", and much more at "+Company+"");
						$("meta[name='og:description']").attr("content", "Check out our supply of "+_this.ItemDetails[0].Name +" " +_this.ItemDetails[0].ProductColor+" " +_this.ItemDetails[0].ServiceCategoryValue+" "+_this.ItemDetails[0].ProductSubCategory+" " +_this.ItemDetails[0].ProductFormValue+", and much more at "+Company+"");
						$("meta[name='og:title']").attr("content",_this.ItemDetails[0].Name +" " +_this.ItemDetails[0].ProductColor+" " +_this.ItemDetails[0].ServiceCategoryValue+" "+_this.ItemDetails[0].ProductSubCategory+" " +_this.ItemDetails[0].ProductFormValue +" | "+Company+"");
						$("meta[name='og:url']").attr("content", ""+CurrentPage+"");
						_this.ProductType = _this.ItemDetails[0].ProductFormValue; return ; });
					
                };

				InventoryDetailComponent.prototype.getNonSlabInventoryDetails = function (TrimmedUserID, id) {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=getNonSlabItemInventory&id=' + id + '&TrimmedUserID=' + TrimmedUserID + '&OnHold=' + this.WCSettings[0]["IncludeInventoryOnHold"] + '&OnSO=' + this.WCSettings[0]["IncludeInventoryOnSO"] + '&Intransit=' + this.WCSettings[0]["IncludeInventoryOnTransfer"] + '&SelctdLocation=' + document.getElementById('SelectedLocation').innerHTML +'&q=' + new Date().getTime() , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.NonSlabInventoryDetails = data; }, function (err) { return _this.logError(err); } , function () { return _this.ProductType = _this.ItemDetails[0].ProductFormValue; });
                };
				
                InventoryDetailComponent.prototype.getItemColors = function (id) {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=getAvailableColors&id=' + id +'&q=' + new Date().getTime() , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.ItemColors = data[0].Colors; }, function (err) { return _this.logError(err); }, function () { return });
                };
                InventoryDetailComponent.prototype.getCartValues = function (Uid) {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=getCartValues&UserID=' + Uid +'&q=' + new Date().getTime() , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.CustomCartList = data; }, function (err) { return _this.logError(err); }, function () { return });
                };
				InventoryDetailComponent.prototype.Download = function () {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=Download&FileType=WebPDF&ItemID='+this._routeParams.get('id') , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { if(data.length > 0)  {  return _this.URLString = data[0].FileName; }  else {  return _this.URLString = '' ; } }, function (err) { return _this.logError(err); });
                };
                InventoryDetailComponent.prototype.AddToCollection = function (Inventory) {
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
                       if (parameter == 'SerialNumber') {
                            GroupByParametersL.push(parameter);
                            GroupByParametersR.push(Inventory.SerialNumber);
                        }
                        else if (parameter == 'IDOne') {
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
                    if(Inventory.SlabSmithFileName !== "" && typeof(Inventory.SlabSmithFileName) !== "undefined" ){Inventory.FileName = Inventory.SlabSmithFileName; }                    
                    this._http.get(this.systemUrl + '?act=AddToWebCart&ItemID=' + this._routeParams.get('id') + '&ItemName=' + encodeURIComponent(Inventory.ItemName) + '&Type=' + Inventory.ProductFormValue + '&Category=' + Inventory.CategoryName + '&FileName=' + Inventory.FileName + '&UserID=' + this.TrimmedUserID + '&FileID=' + Inventory.FileID + '&AvgWidth=' + Inventory.AverageWidth + '&AvgLength=' + Inventory.AverageLength + '' + GroupByParameters + '&AvailableQty=' + Inventory.AvailableQty + '&AvailableSlabs=' + Inventory.AvailableSlabs + '&UOM=' + Inventory.UOM + '&LocationID=' + Inventory.LocationID + '&TransactionLineID=' + Inventory.TransactionLineID + '&GroupInventoryBy=' + this.WCSettings[0]["GroupInventoryBy"].replace(/,/g, '_') , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return Inventory.WebCartID = data; }, function (err) { return _this.logError(err); }, function () { return _this.getCartCount(_this.TrimmedUserID); });
                };
                InventoryDetailComponent.prototype.RemoveFromCollection = function (Inventory) {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=RemoveFromWebCart&WebCartID=' + Inventory.WebCartID , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return Inventory.WebCartID = 0; }, function (err) { return _this.logError(err); }, function () { return _this.getCartCount(_this.TrimmedUserID); });
                };
                InventoryDetailComponent.prototype.getCartCount = function (Uid) {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=getCartCount&Uid=' + Uid +'&q=' + new Date().getTime() , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.CartCount = data; }, function (err) { return _this.logError(err); }, function () { return console.log(document.getElementById('countId').innerHTML = _this.CartCount[0].Count); });
                };
				InventoryDetailComponent.prototype.lightGallerySS = function () {
					//console.log('SS'+ this.counter);
                    if (this.counter) {
						//console.log('DetailGallerySS');
                        jQuery(this.elementRef.nativeElement).find('#DetailGallerySS').lightGallery({
                            selector: '.GallerySS',
                            loop: false,
                            mode: 'lg-slide',
                            width: '1024px',
							thumbnail: false,
							hash: false,
							share: false,
							download: false,
							actualSize: true,
							scale:1
                        });
                    }
                };
				InventoryDetailComponent.prototype.getItemSlabsmithInventory = function (TrimmedUserID, id) {
					var _this = this;
                    document.getElementById('myNav').setAttribute("style", "display: none;");
                    this._http.get(this.systemUrl + '?act=getSlabSmithInventory&id=' + id + '&UserID=' + TrimmedUserID +'&q=' + new Date().getTime() , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.ItemSlabSmithInventory = data; }, function (err) { return _this.logError(err); }, function () { _this.getSlabsmithCart(this.TrimmedUserID); });
                };
				InventoryDetailComponent.prototype.getSlabsmithCart = function (Uid) {
                    var _this = this;
                    document.getElementById('myNav').setAttribute("style", "display: none;");
                    this._http.get(this.systemUrl + '?act=getSlabSmithCart&Uid=' + Uid +'&q=' + new Date().getTime() , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.CartList = data; }, function (err) { return _this.logError(err); }, function () { 
						return console.log('slabsmithcart') });
                };
				InventoryDetailComponent.prototype.AddToSlabsmithCollection = function (Inventory) {
					var _this = this;
					this._http.get(this.systemUrl + '?act=AddToSlabsmithWebCart&ItemID=' + this._routeParams.get('id') + '&ItemName=' + document.getElementById('headerId').innerHTML + '&UserID=' + this.TrimmedUserID + '&Width=' + Inventory.Width + '&Length=' + Inventory.Length + '&Qty=' + Inventory.Quantity+'&BarcodeID='+Inventory.InventoryID+'&FileName='+Inventory.SlabID , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return Inventory.WebCartID = data; }, function (err) { return _this.logError(err); }, function () { return _this.getCartCount(_this.TrimmedUserID); });
				};
                InventoryDetailComponent.prototype.EmailSingleImage = function (Item, i, FileServer, VirtualDirectoryName, IDOneLable, IDTwoLable, IDThreeLable, SerialPrefixLable) {
                    var _this = this;
                    var HomeLocation;
                    //var str = location.href,
                    //delimiter = '/',
                    //start = 4,
                    //tokens = str.split(delimiter).slice(start),
                    //result = tokens.join(delimiter);
                    //HomeLocation = location.href.split(result)[0]
                    // HomeLocation = location.href.split(location.href.split('/').slice(location.href.split('/').length - 2).join('/'))[0];
                    HomeLocation = location.href.split(location.href.split('/').slice(location.href.split('/').length - 2).join('/'))[0].replace(/[^a-zA-Z0-9\/.:]+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');

                    
                    document.getElementById('SendingMail1').innerHTML = "<img style='-webkit-user-select: none; margin-left:500px; position:relative; margin-top:-30px; width:25px' src='image/loading.gif'/>";
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
                                        this._http.get(this.systemUrl + '?act=emailSingleImage&TrimmedUserID=' + this.TrimmedUserID + '&HomeLocation=' + HomeLocation + '&EmailID=' + this.EmailID + '&IDOne=' + Item.IDOne + '&IDOneLable=' + IDOneLable + '&IDTwo=' + Item.IDTwo + '&IDTwoLable=' + IDTwoLable + '&IDThree=' + Item.IDThree + '&IDThreeLable=' + IDThreeLable.replace('#', '') + '&SerialPrefix=' + Item.SerialPrefix + '&SerialPrefixLable=' + SerialPrefixLable + '&ItemName=' + Item.ItemName + '&AvgWidth=' + Item.AverageWidth + '&AvgLength=' + Item.AverageLength + '&Category=' + Item.CategoryName + '&AvailableQty=' + Item.AvailableQty + '&UOM=' + Item.UOM + '&AvailableSlabs=' + Item.AvailableSlabs + '&Type=' + Item.ProductFormValue + '&FileServer=' + FileServer + '&VirtualDirectoryName=' + VirtualDirectoryName + '&FileName=' + Item.FileName + '&InvlocationID=' + Item.LocationID , options)
                                            .map(function (res) { return res.json(); })
                                            .subscribe(function (data) { return _this.MailData = data; }, function (err) { return _this.EmailError(err); }, function () { return _this.EmailSent(); });
                                    }
                                }
                                else {
                                    this._http.get(this.systemUrl + '?act=emailSingleImage&TrimmedUserID=' + this.TrimmedUserID + '&HomeLocation=' + HomeLocation + '&EmailID=' + this.EmailID + '&IDOne=' + Item.IDOne + '&IDOneLable=' + IDOneLable + '&IDTwo=' + Item.IDTwo + '&IDTwoLable=' + IDTwoLable + '&IDThree=' + Item.IDThree + '&IDThreeLable=' + IDThreeLable.replace('#', '') + '&SerialPrefix=' + Item.SerialPrefix + '&SerialPrefixLable=' + SerialPrefixLable + '&ItemName=' + Item.ItemName + '&AvgWidth=' + Item.AverageWidth + '&AvgLength=' + Item.AverageLength + '&Category=' + Item.CategoryName + '&AvailableQty=' + Item.AvailableQty + '&UOM=' + Item.UOM + '&AvailableSlabs=' + Item.AvailableSlabs + '&Type=' + Item.ProductFormValue + '&FileServer=' + FileServer + '&VirtualDirectoryName=' + VirtualDirectoryName + '&FileName=' + Item.FileName + '&InvlocationID=' + Item.LocationID , options)
                                        .map(function (res) { return res.json(); })
                                        .subscribe(function (data) { return _this.MailData = data; }, function (err) { return _this.EmailError(err); }, function () { return _this.EmailSent(); });
                                }
                            }
                        }
                    }
                };
                InventoryDetailComponent.prototype.EmailSent = function () {
                    alert("Email sent successfully");
                    document.getElementById('SendingMail1').innerHTML = "";
                };
                InventoryDetailComponent.prototype.EmailError = function (err) {
                    // alert("Some thing went wrong, Email was not sent!");
                    alert("The email was not sent. Please contact us for assistance.");
                    document.getElementById('SendingMail1').innerHTML = "";
                };
                InventoryDetailComponent.prototype.logError = function (err) {
                    console.error("There was an error:" + err);
                };
                InventoryDetailComponent.prototype.onLearnMoreClick = function (item) {
                    //console.log("this is stest")
                    var selectedItem =  item || this.ItemInventory[0];
                    if (selectedItem.WebCartID && selectedItem.WebCartID !== 0) {
                        this._router.navigate(['Collection']);
                        return;
                    }
                    var countElement = document.getElementById('countId');
                    if (!countElement) return;
                    const initialCount = countElement.innerText.trim();
                    //console.log('initialCount', initialCount);
                    var observer = new MutationObserver((mutationsList, observer) => {
                        const currentCount = countElement.innerText.trim();
                       // console.log('CurrentCount', currentCount);
                        if (currentCount !== initialCount && currentCount !== "0") {
                            observer.disconnect();
                            this._router.navigate(['Collection']);
                        }
                    });
                    observer.observe(countElement, {childList: true,characterData: true,subtree: true });
                    this.AddToCollection(selectedItem);
                };
                
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], InventoryDetailComponent.prototype, "ItemGallery", void 0);
                InventoryDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'InventoryDetail',
                        templateUrl: inventoryHtmlPage
                       // templateUrl: './app/InventoryDetail/InventoryDetail.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, http_1.Http, core_1.ElementRef, router_1.Location,router_1.Router])
                ], InventoryDetailComponent);
                return InventoryDetailComponent;
            }());
            exports_1("InventoryDetailComponent", InventoryDetailComponent);
        }
    }
});
//# sourceMappingURL=inventorydetail.component.js.map