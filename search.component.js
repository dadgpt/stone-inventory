System.register(['angular2/core', 'angular2/router', 'angular2/http'], function (exports_1, context_1) {
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
	var core_1, router_1, http_1;
	var SearchValues, SearchComponent;
	return {
		setters: [
			function (core_1_1) {
				core_1 = core_1_1;
			},
			function (router_1_1) {
				router_1 = router_1_1;
			},
			function (http_1_1) {
				http_1 = http_1_1;
			}],
		execute: function () {
			SearchValues = (function () {
				function SearchValues() {
					this.ItemName = "";
					this.Location = "";
					this.Type = "";
					this.Category = "";
					this.Thickness = "";
					this.Finish = "";
					this.Group = "";
					this.Color = "";
					this.PriceRange = "";
					this.Origin = "";
					this.Kind = "";
					this.SlabOptions = "";
					this.AvailableOptions = "";
					this.SaleOptions = "";
					this.AvgCurrentAvailableQty = "";
					this.AvgCurrentSlabLength = "";
					this.AvgCurrentSlabWidth = "";
					this.AvailableSlabs = "";
					this.FilterCrumbs = [];
				}
				return SearchValues;
			}());
			exports_1("SearchValues", SearchValues);
			SearchComponent = (function () {
				function SearchComponent(_routeParams1, _http, _location) {
					this._routeParams1 = _routeParams1;
					this._http = _http;
					this._location = _location;
					this.ActiveAlphabetCount = 0;
					this.UserID = DB.getItem("UserID");
					this.TrimmedUserID = this.UserID.slice(2, this.UserID.length);
					this.GlobalIndex = "";
					this.GlobalCategory = "";
					this.GlobalSubCategory = "";
					this.GlobalGroup = "";
					this.GlobalType = "";
					this.GlobalLocation = "";
					this.GlobalThickness = "";
					this.GlobalFinish = "";
					this.GlobalPriceRange = "";
					this.GlobalOrigin = "";
					this.GlobalKind = "";
					this.GlobalSlabOptions = "";
					this.GlobalAvailableOptions = "";
					this.GlobalSaleOptions = "";
					this.AvgCurrentAvailableQty = "";
					this.AvgCurrentSlabLength = "";
					this.AvgCurrentSlabWidth = "";
					this.AvailableSlabs = "";
					this.GlobalName = "";
					this.GlobalColor = "";
					this.InitialValue = 0;
					this.ClickCount = 0;
					this.CurrentPage = "1";
					this.fromReset = false;
					this.success = new core_1.EventEmitter();
					this.systemUrl = "";
				}
				SearchComponent.prototype.ngOnInit = function () {
					this.systemUrl = "https://" + Token + ".stoneprofits.com/api/fetchdataAngularProductionToyota.ashx";
					if (this._routeParams1.get('Category') != null)
						this.GlobalCategory = (this._routeParams1.get('Category').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('category') != null)
						this.GlobalCategory = (this._routeParams1.get('category').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('SubCategory') != null)
						this.GlobalSubCategory = (this._routeParams1.get('SubCategory').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('subcategory') != null)
						this.GlobalSubCategory = (this._routeParams1.get('subcategory').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('ProductGroup') != null)
						this.GlobalGroup = (this._routeParams1.get('ProductGroup').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('Type') != null)
						this.GlobalType = (this._routeParams1.get('Type').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('type') != null)
						this.GlobalType = (this._routeParams1.get('type').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('Location') != null)
						this.GlobalLocation = (this._routeParams1.get('Location').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('location') != null)
						this.GlobalLocation = (this._routeParams1.get('location').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('Thickness') != null)
						this.GlobalThickness = (this._routeParams1.get('Thickness').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('Finish') != null)
						this.GlobalFinish = (this._routeParams1.get('Finish').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('Color') != null)
						this.GlobalColor = (this._routeParams1.get('Color').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('Name') != null)
						this.GlobalName = (this._routeParams1.get('Name').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('IndexAlphabet') != null)
						this.GlobalIndex = (this._routeParams1.get('IndexAlphabet').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('PriceRange') != null)
						this.GlobalPriceRange = (this._routeParams1.get('PriceRange').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('Origin') != null)
						this.GlobalOrigin = (this._routeParams1.get('Origin').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('Kind') != null)
						this.GlobalKind = (this._routeParams1.get('Kind').replace(/-/g, ' ')).replace(/%20/g, ' ');
					if (this._routeParams1.get('SlabOptions') != null) {
						this.GlobalSlabOptions = this._routeParams1.get('SlabOptions').replace(/%20/g, ' ');
						if (this.GlobalSlabOptions === "remnant") {
							this.GlobalSlabOptions = "Remnant"
						}
						else if (this.GlobalSlabOptions == "full-slab") {
							this.GlobalSlabOptions = "Full Slab"
						}
					}
					if (this._routeParams1.get('SaleOptions') != null)
						this.GlobalSaleOptions = this._routeParams1.get('SaleOptions').replace(/%20/g, ' ');
					if (this._routeParams1.get('AvailableOptions') != null)
						this.GlobalAvailableOptions = this._routeParams1.get('AvailableOptions').replace(/%20/g, ' ');
					this.getSettings();
					this.getAllSearchDetails();
					this.SV = { ItemName: "", Location: "", Type: "", Category: "", Thickness: "", Finish: "", Group: "", Color: "", PriceRange: "", Origin: "", Kind: "", SubCategory: "", SlabOptions: "", SaleOptions: "", AvailableOptions: "", AvgCurrentAvailableQty: "", AvgCurrentSlabLength: "", AvgCurrentSlabWidth: "", AvailableSlabs: "" };
				};

				SearchComponent.prototype.bindValues = function (data, list) {
					data = data.toString();
					for (var i = 0; i < data.split(",").length; i++) {
						list.forEach((obj) => {
							if (obj.ID == data.split(',')[i]) {
								obj.Selected = true;
							}
						});
					}
				}
				var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization": SPSWebToken });
				var options = new http_1.RequestOptions({ headers: headers });

				SearchComponent.prototype.getAllSearchDetails = function () {
					var _this = this;
					this._http.get(this.systemUrl + '?act=getAllSearchDetails&WebconnectSettingID=' + WebconnectSettingID + '&q=' + new Date().getTime(), options)
						.map(function (res) { return res.json(); })
						.subscribe(function (data) { return _this.AllSearchDetails = data; }, function (err) { return _this.logError(err); }, function () {
							_this.TypesList = _this.AllSearchDetails.filter(function (_) { return _.SearchOption == 'Type'; }).map(function (_T) { _T.Type = _T.Value; _T.Selected = (_T.Value === _this.GlobalType); return _T });
							_this.ProductCategoriesList = _this.AllSearchDetails.filter(function (_) { return _.SearchOption == 'Category'; }).map(function (_T) { _T.Name = _T.Value; _T.Selected = (_T.Value === _this.GlobalCategory); return _T });
							_this.ProductSubCategoriesList = _this.AllSearchDetails.filter(function (_) { return _.SearchOption == 'SubCategory'; }).map(function (_T) { _T.Name = _T.Value; _T.Selected = (_T.Value === _this.GlobalSubCategory); return _T });
							_this.ProductGroupList = _this.AllSearchDetails.filter(function (_) { return _.SearchOption == 'ProductGroup'; }).map(function (_T) { _T.ProductGroup = _T.Value; _T.Selected = (_T.Value === _this.GlobalGroup); return _T });
							_this.ThicknessList = _this.AllSearchDetails.filter(function (_) { return _.SearchOption == 'Thickness'; }).map(function (_T) { _T.Thickness = _T.Value; _T.Selected = (_T.Value === _this.GlobalThickness); return _T });
							_this.FinishesList = _this.AllSearchDetails.filter(function (_) { return _.SearchOption == 'Finish'; }).map(function (_T) { _T.Finish = _T.Value; _T.Selected = (_T.Value === _this.GlobalFinish); return _T });
							_this.ProductColorsList = _this.AllSearchDetails.filter(function (_) { return _.SearchOption == 'Color'; }).map(function (_T) { _T.Name = _T.Value; _T.Selected = (_T.Value === _this.GlobalColor); return _T });
							_this.ProductPriceRangesList = _this.AllSearchDetails.filter(function (_) { return _.SearchOption == 'PriceRange'; }).map(function (_T) { _T.Name = _T.Value; _T.Selected = (_T.Value === _this.GlobalPriceRange); return _T });
							_this.OriginList = _this.AllSearchDetails.filter(function (_) { return _.SearchOption == 'Origin'; }).map(function (_T) { _T.Name = _T.Value; _T.Selected = (_T.Value === _this.GlobalOrigin); return _T });
							_this.KindList = _this.AllSearchDetails.filter(function (_) { return _.SearchOption == 'Kind'; }).map(function (_T) { _T.Name = _T.Value; _T.Selected = (_T.Value === _this.GlobalKind); return _T });

							_this.SlabOptionsList = [{ SortOrder: 10, Name: "Full Slab", Value: "Full Slab", Selected: ("Full Slab" === _this.GlobalSlabOptions) }, { SortOrder: 20, Name: "Remnant", Value: "Remnant", Selected: ("Remnant" === _this.GlobalSlabOptions) }]

							_this.SaleOptionsList = [{ SortOrder: 10, Name: "Sale Single Slab", Value: "Sale Single Slab", Selected: false }]

							_this.AvailableOptionsList = [{ SortOrder: 10, Value: "Available", Selected: false, "SearchOption": "AvailableOptions" }, { SortOrder: 10, Value: "Not Available", Selected: false, "SearchOption": "AvailableOptions" }]

							_this.Locations = _this.AllSearchDetails.filter(function (_) { return _.SearchOption == 'Location'; }).map(function (_T) { _T.Name = _T.Value; _T.Selected = (_T.Value == _this.GlobalLocation); return _T });
							if (_this.GlobalCategory) {
								var GlobalCategory = String(_this.GlobalCategory);
								_this.ProductCategoriesList.forEach((obj) => {
									if ((obj.Value).toLowerCase() == (GlobalCategory).toLowerCase())
										_this.GlobalCategory = obj.ID;
								});
							}
							if (_this.GlobalType) {
								var GlobalType = _this.GlobalType;
								_this.TypesList.forEach((obj) => {
									if ((obj.Value).toLowerCase() == (GlobalType).toLowerCase())
										_this.GlobalType = obj.ID;
								});
							}
							if (_this.GlobalLocation) {
								var GlobalLocation = _this.GlobalLocation;
								_this.Locations.forEach((obj) => {
									if (typeof GlobalLocation != "number") {
										if (((obj.Value).toLowerCase()).indexOf((GlobalLocation).toLowerCase()) != -1)
											_this.GlobalLocation = obj.ID;
									}
									//console.log(typeof GlobalLocation, "GlobalLocation")
								});
							}
							if (_this.GlobalSubCategory) {
								var GlobalSubCategory = _this.GlobalSubCategory;
								_this.ProductSubCategoriesList.forEach((obj) => {
									if ((obj.Value || '').toString().toLowerCase() === (GlobalSubCategory || '').toString().toLowerCase())

										_this.GlobalSubCategory = obj.ID;
								});
							}
							if (_this.GlobalGroup) {
								var GlobalGroup = _this.GlobalGroup;
								_this.ProductGroupList.forEach((obj) => {
									if ((obj.Value || '').toString().toLowerCase() === (GlobalGroup || '').toString().toLowerCase())
										_this.GlobalGroup = obj.ID;
								});
							}
							if (_this.GlobalOrigin) {
								var GlobalOrigin = _this.GlobalOrigin;
								_this.OriginList.forEach((obj) => {
									if ((obj.Value).toLowerCase() == (GlobalOrigin).toLowerCase())
										_this.GlobalOrigin = obj.ID;
								});
							}
							_this.onSubmit();
						});

				};

				SearchComponent.prototype.getSettings = function () {
					var _this = this;
					this._http.get(this.systemUrl + '?act=getSearchSettings&WebconnectSettingID=' + WebconnectSettingID + '&userID=' + _this.TrimmedUserID + '&q=' + new Date().getTime(), options)
						.map(function (res) { return res.json(); })
						.subscribe(function (data) {
							let placeholderParts = [];
							if (data[0].SearchbyItemIdentifiers == "on") {
								// Check for each identifier and dynamically add labels
								if (data[0].SearchbyItemIdentifiersValue.indexOf('IDOne') !== -1) {
									placeholderParts.push(data[0].IDOneSlabLabel);
								}
								if (data[0].SearchbyItemIdentifiersValue.indexOf('IDTwo') !== -1) {
									placeholderParts.push(data[0].IDTwoSlabLabel);
								}
								if (data[0].SearchbyItemIdentifiersValue.indexOf('IDThree') !== -1) {
									placeholderParts.push(data[0].IDThreeSlabLabel);
								}
								if (data[0].SearchbyItemIdentifiersValue.indexOf('Serial') !== -1) {
									placeholderParts.push(data[0].SerialPrefixLable);
								}
								if (data[0].SearchbyItemIdentifiersValue.indexOf('BarcodeID') !== -1) {
									placeholderParts.push("Barcode");
								}
								_this.InvSearchLabel = 'Search By ' + placeholderParts.join(' / ');
							}
							else {
								_this.InvSearchLabel = 'Search By Lot/Block/Bundle';
							}
							return _this.WCSettings = data;
						}, function (err) { return _this.logError(err); }, function () {
							document.getElementById('countId').innerHTML = _this.WCSettings[0]["CartCount"]; return
						});
				};
				SearchComponent.prototype.logError = function (err) {
					console.log(err);
				};
				SearchComponent.prototype.onSubmit = function () {
					this.fromReset = false;
					this.getItemGallery();
					if (typeof (document.getElementsByClassName("FilterTitle")[0]) !== 'undefined') {
						document.getElementsByClassName("FilterTitle")[0].className = "FilterTitle";
					}
				};
				SearchComponent.prototype.ngAfterContentChecked = function () {
					var userAgent, ieReg, ie;
					userAgent = window.navigator.userAgent;
					ieReg = /msie|Trident.*rv[ :]*11\./gi;
					ie = ieReg.test(userAgent);
					if (ie) {
						$(".ImgWrap").each(function () {
							var $container = $(this),
								imgUrl = $container.find("img").prop("src");
							if (imgUrl) {
								$container.css("backgroundImage", 'url(' + imgUrl + ')').addClass("ms-object-fit");
							}
						});
					}
				};
				SearchComponent.prototype.Reset = function () {
					this.fromReset = true;
					var All = "All";
					$('select[name=Location_Check]').val(All);
					$('select[name=Category_Check]').val(All);
					$('select[name=SubCategory_Check]').val(All);					
					$('select[name=ProductGroup_Check]').val(All);
					$('select[name=Thickness_Check]').val(All);
					$('select[name=Finish_Check]').val(All);
					$('select[name=Color_Check]').val(All);
					$('select[name=PriceRange_Check]').val(All);
					$('select[name=SlabOptions_Check]').val(All);
					$('select[name=SaleOptions_Check]').val(All);
					DB.setItem('CurrentPage', '1');
					DB.setItem('Category', '');
					DB.setItem('SubCategory', '');
					DB.setItem('Group', '');
					DB.setItem('Type', '');
					DB.setItem('Location', '');
					DB.setItem('Thickness', '');
					DB.setItem('Finish', '');
					DB.setItem('Color', '');
					DB.setItem('PriceRange', '');
					DB.setItem('Origin', '');
					DB.setItem('Kind', '');
					DB.setItem('SlabOptions', '')
					DB.setItem('SaleOptions', '')
					DB.setItem('AvailableOptions', '')
					DB.setItem('Name', '');
					DB.setItem('IndexAlphabet', '');
					DB.setItem('PerPage', '');
					DB.setItem('ItemIdentifiers', '');
					DB.setItem('AvgCurrentAvailableQty', '');
					DB.setItem('AvgCurrentSlabLength', '');
					DB.setItem('AvgCurrentSlabWidth', '');
					DB.setItem('AvailableSlabs', '');
					this.SV.Category = "";
					this.SV.SubCategory = "";
					this.SV.Group = "";
					this.SV.Type = "";
					this.SV.Location = "";
					this.SV.Thickness = "";
					this.SV.Finish = "";
					this.SV.Color = "";
					this.SV.PriceRange = "";
					this.SV.Origin = "";
					this.SV.Kind = "";
					this.SV.SlabOptions = "";
					this.SV.SaleOptions = "";
					this.SV.AvailableOptions = "";
					this.SV.ItemName = "";
					this.SV.ItemIdentifiers = "";
					this.SV.AvgCurrentAvailableQty = "";
					this.SV.AvgCurrentSlabLength = "";
					this.SV.AvgCurrentSlabWidth = "";
					this.SV.AvailableSlabs = "";
					this.Type = "All";
					if (this.IndexAlphabet) {
						this.addIndexAlphabet(this.IndexAlphabet);
					}
					DB.setItem('CurrentPage', '1');
					document.getElementById('hiddenGoToPage').innerHTML = "1";
					document.getElementById('hiddenCurrentPage').innerHTML = "1";
					document.getElementById("CurrentPage").innerHTML = "1";
					this.getItemGallery();
				};
				SearchComponent.prototype.getItemGallery = function () {
					var _this = this;
					if (typeof _this.WCSettings == "undefined") {
						_this.getAllSearchDetails();
					}
					else {
						if (this.InitialValue == 0) {
							if (this.WCSettings[0]["SearchType"] == "Top") {
								document.getElementById('HiddenItemsPerPage').innerHTML = "36";
							}
							if (this.WCSettings[0]["SearchType"] != "Top") {
								document.getElementById('HiddenItemsPerPage').innerHTML = "36";
							}
						}
						this.InitialValue += 1;
						document.getElementById('hiddenTimeAtSubmit').innerHTML = (new Date()).toString();
						if (DB.getItem('CurrentPage') && DB.getItem('CurrentPage') >= "1") {
							document.getElementById('hiddenGoToPage').innerHTML = DB.getItem('CurrentPage');
							this.CurrentPage = DB.getItem('CurrentPage');
						}
						document.getElementById('myNav').setAttribute("style", "display: display;");
						this.perPage = document.getElementById('HiddenItemsPerPage').innerHTML;
						var TypeLinq = "";
						var CategoryLinq = "";
						var SubCategoryLinq = "";
						var ThicknessLinq = "";
						var FinishLinq = "";
						var ColorLinq = "";
						var LocationLinq = "";
						var PriceRangeLinq = "";
						var OriginLinq = "";
						var KindLinq = "";
						var SlabOptionsLinq = "";
						var SaleOptionsLinq = "";
						var AvailableOptionsLinq = "";
						var GroupLinq = "";
						var AvgCurrentAvailableQtyLinq = "";
						var AvgCurrentSlabLengthLinq = "";
						var AvgCurrentSlabWidthLinq = "";
						this.FilterCrumbs = [];
						if (this.WCSettings[0]["SearchbyProductCategory"] == 'on') {
							if (this.WCSettings[0]["SearchbyProductCategoryControl"] !== 'Dropdown') {
								if (this.ProductCategoriesList !== '' && typeof (this.ProductCategoriesList) !== 'undefined') {
									if (this.fromReset)
										this.ProductCategoriesList.filter(function (_) { return _.Selected; }).forEach(function (t) { return t.Selected = false; });
									else
										$('input[name=Category_Check]:checked').each(function () { CategoryLinq = CategoryLinq + ',' + '' + $(this).val() + ''; });
								}
								if (this.InitialValue != 1 && !this.fromReset)
									this.SV.Category = CategoryLinq.substring(1);
								if (this.InitialValue == 1) {
									if (DB.getItem('Category'))
										this.SV.Category = DB.getItem('Category');
									if (this.GlobalCategory && this.SV.Category == '') {
										this.SV.Category = this.GlobalCategory;
										DB.setItem('Category', this.SV.Category);
									}
								}

							}
							else {
								if (this.GlobalCategory && this.InitialValue == 1)
									this.SV.Category = this.GlobalCategory;
								else {
									if (this.InitialValue == 1 && DB.getItem('Category'))
										this.SV.Category = DB.getItem('Category');
									else if ($('select[name=Category_Check] option:selected').val() != 'All' && typeof $('select[name=Category_Check] option:selected').val() != 'undefined')
										this.SV.Category = $('select[name=Category_Check] option:selected').val();
									else
										this.SV.Category = "";
								}
							}
						}
						if (this.SV.Category != '' && this.SV.Category != 'All') {
							this.FilterCategories = (this.SV.Category).toString().split(',');
							this.FilterCategories.forEach((obj) => {
								_this.FilterGallery = this.ProductCategoriesList.filter(function (_) { return _.ID == obj; });
								for (let item of _this.FilterGallery) { this.FilterCrumbs.push(item); }
							});
							if (_this.FilterCrumbs.length > 0)
								$('.FilterCrumbs').show().css("visibility", "visible");
						}
						if (this.WCSettings[0]["SearchbyProductSubCategory"] == 'on') {
							if (this.WCSettings[0]["SearchbyProductSubCategoryControl"] !== 'Dropdown') {
								if (this.ProductSubCategoriesList !== '' && typeof (this.ProductSubCategoriesList) !== 'undefined') {
									if (this.fromReset)
										this.ProductSubCategoriesList.filter(function (_) { return _.Selected; }).forEach(function (t) { return t.Selected = false; });
									else
										$('input[name=SubCategory_Check]:checked').each(function () { SubCategoryLinq = SubCategoryLinq + ',' + '' + $(this).val() + ''; });
								}
								if (this.InitialValue != 1 && !this.fromReset)
									this.SV.SubCategory = SubCategoryLinq.substring(1);
								if (this.InitialValue == 1) {
									if (DB.getItem('SubCategory'))
										this.SV.SubCategory = DB.getItem('SubCategory');
									if (this.GlobalSubCategory && this.SV.SubCategory == '') {
										this.SV.SubCategory = this.GlobalSubCategory;
										DB.setItem('SubCategory', this.SV.SubCategory);
									}
								}
							}
							else {
								if (this.GlobalSubCategory && this.InitialValue == 1)
									this.SV.SubCategory = this.GlobalSubCategory;
								else {
									if (this.InitialValue == 1 && DB.getItem('SubCategory'))
										this.SV.SubCategory = DB.getItem('SubCategory');
									else if ($('select[name=SubCategory_Check] option:selected').val() != 'All' && typeof $('select[name=SubCategory_Check] option:selected').val() != 'undefined')
										this.SV.SubCategory = $('select[name=SubCategory_Check] option:selected').val();
									else
										this.SV.SubCategory = "";
								}
							}
						}
						if (this.SV.SubCategory != '' && this.SV.SubCategory != 'All') {
							this.FilterSubCategories = (this.SV.SubCategory).toString().split(',');
							this.FilterSubCategories.forEach((obj) => {
								_this.FilterGallery = this.ProductSubCategoriesList.filter(function (_) { return _.ID == obj; });
								for (let item of _this.FilterGallery) { this.FilterCrumbs.push(item); }
							});
							if (_this.FilterCrumbs.length > 0)
								$('.FilterCrumbs').show().css("visibility", "visible");
						}
						if (this.WCSettings[0]["SearchbyProductGroup"] == 'on') {
							if (this.WCSettings[0]["SearchbyProductGroupControl"] !== 'Dropdown') {
								if (this.WCSettings[0]["SearchbyProductGroup"] == 'on' && this.ProductGroupList !== '' && typeof (this.ProductGroupList) !== 'undefined') {
									if (this.fromReset)
										this.ProductGroupList.filter(function (_) { return _.Selected; }).forEach(function (t) { return t.Selected = false; });
									else
										$('input[name=ProductGroup_Check]:checked').each(function () { GroupLinq = GroupLinq + ',' + '' + $(this).val() + ''; });
								}
								if (this.InitialValue != 1 && !this.fromReset)
									this.SV.Group = GroupLinq.substring(1);
								if (this.InitialValue == 1) {
									if (DB.getItem('Group'))
										this.SV.Group = DB.getItem('Group');
									if (this.GlobalGroup && this.SV.Group == '') {
										this.SV.Group = this.GlobalGroup;
										DB.setItem('Group', this.SV.Group);
									}
								}

							}
							else {
								if (this.GlobalGroup && this.InitialValue == 1)
									this.SV.Group = this.GlobalGroup;
								else {
									if (this.InitialValue == 1 && DB.getItem('Group'))
										this.SV.Group = DB.getItem('Group');
									else if ($('select[name=ProductGroup_Check] option:selected').val() != 'All' && typeof $('select[name=ProductGroup_Check] option:selected').val() != 'undefined')
										this.SV.Group = $('select[name=ProductGroup_Check] option:selected').val();
									else
										this.SV.Group = "";
								}
							}
						}
						if (this.SV.Group != '' && this.SV.Group != 'All') {
							this.FilterGroups = (this.SV.Group).toString().split(',');
							this.FilterGroups.forEach((obj) => {
								_this.FilterGallery = this.ProductGroupList.filter(function (_) { return _.ID == obj; });
								for (let item of _this.FilterGallery) { this.FilterCrumbs.push(item); }
							});
							if (_this.FilterCrumbs.length > 0)
								$('.FilterCrumbs').show().css("visibility", "visible");
						}
						if (this.WCSettings[0]["SearchbyProductType"] == 'on') {
							if (this.WCSettings[0]["SearchbyProductTypeControl"] !== 'Dropdown') {
								if (this.TypesList !== '' && typeof (this.TypesList) !== 'undefined') {
									if (this.fromReset)
										this.TypesList.filter(function (_) { return _.Selected; }).forEach(function (t) { return t.Selected = false; });
									else
										$('input[name=Type_Check]:checked').each(function () { TypeLinq = TypeLinq + ',' + '' + $(this).val() + ''; });
								}
								if (this.InitialValue != 1 && !this.fromReset)
									this.SV.Type = TypeLinq.substring(1);
								if (this.InitialValue == 1) {
									if (DB.getItem('Type'))
										this.SV.Type = DB.getItem('Type');
									if (this.GlobalType && this.SV.Type == '') {
										this.SV.Type = this.GlobalType;
										DB.setItem('Type', this.SV.Type);
									}
								}
							}
							else {
								if (this.GlobalType && this.InitialValue == 1)
									this.SV.Type = this.GlobalType;
								else {
									if (this.InitialValue == 1 && DB.getItem('Type'))
										this.SV.Type = DB.getItem('Type');
									else if ($('select[name=Type_Check] option:selected').val() != 'All' && typeof $('select[name=Type_Check] option:selected').val() != 'undefined')
										this.SV.Type = $('select[name=Type_Check] option:selected').val();
									else
										this.SV.Type = "";
								}
							}
						}
						if (this.SV.Type != '' && this.SV.Type != 'All') {
							this.FilterTypes = (this.SV.Type).toString().split(',');
							this.FilterTypes.forEach((obj) => {
								_this.FilterGallery = this.TypesList.filter(function (_) { return _.ID == obj; });
								for (let item of _this.FilterGallery) { this.FilterCrumbs.push(item); }
							});
							if (_this.FilterCrumbs.length > 0)
								$('.FilterCrumbs').show().css("visibility", "visible");
						}
						if (this.WCSettings[0]["SearchbyLocation"] == 'on') {
							if (this.WCSettings[0]["SearchbyLocationControl"] !== 'Dropdown') {
								if (this.Locations !== '' && typeof (this.Locations) !== 'undefined') {
									if (this.fromReset)
										this.Locations.filter(function (_) { return _.Selected; }).forEach(function (t) { return t.Selected = false; });
									else
										$('input[name=Location_Check]:checked').each(function () { LocationLinq = LocationLinq + ',' + '' + $(this).val() + ''; });
								}
								if (this.InitialValue != 1 && !this.fromReset)
									this.SV.Location = LocationLinq.substring(1);
								if (this.InitialValue == 1) {
									if (DB.getItem('Location'))
										this.SV.Location = DB.getItem('Location');
									if (this.GlobalLocation && this.SV.Location == '') {
										this.SV.Location = this.GlobalLocation;
										DB.setItem('Location', this.SV.Location);
									}
								}

							}
							else {
								if (this.GlobalLocation && this.InitialValue == 1)
									this.SV.Location = this.GlobalLocation;
								else {
									if (this.InitialValue == 1 && DB.getItem('Location'))
										this.SV.Location = DB.getItem('Location');
									else if ($('select[name=Location_Check] option:selected').val() != 'All' && typeof $('select[name=Location_Check] option:selected').val() != 'undefined')
										this.SV.Location = $('select[name=Location_Check] option:selected').val();
									else
										this.SV.Location = "";
								}
							}
						}
						if (this.SV.Location != '' && this.SV.Location != 'All') {
							this.FilterLocations = (this.SV.Location).toString().split(',');
							this.FilterLocations.forEach((obj) => {
								_this.FilterGallery = this.Locations.filter(function (_) { return _.ID == obj; });
								for (let item of _this.FilterGallery) { this.FilterCrumbs.push(item); }
							});
							if (_this.FilterCrumbs.length > 0)
								$('.FilterCrumbs').show().css("visibility", "visible");
						}
						if (this.WCSettings[0]["SearchbyThickness"] == 'on') {
							if (this.WCSettings[0]["SearchbyThicknessControl"] !== 'Dropdown') {
								if (this.ThicknessList !== '' && typeof (this.ThicknessList) !== 'undefined') {
									if (this.fromReset)
										this.ThicknessList.filter(function (_) { return _.Selected; }).forEach(function (t) { return t.Selected = false; });
									else
										$('input[name=Thickness_Check]:checked').each(function () { ThicknessLinq = ThicknessLinq + ',' + '' + $(this).val() + ''; });
								}
								if (this.InitialValue != 1 && !this.fromReset)
									this.SV.Thickness = ThicknessLinq.substring(1);
								if (this.InitialValue == 1) {
									if (DB.getItem('Thickness'))
										this.SV.Thickness = DB.getItem('Thickness');
									if (this.GlobalThickness && this.SV.Thickness == '') {
										this.SV.Thickness = this.GlobalThickness;
										DB.setItem('Thickness', this.SV.Thickness);
									}
								}

							}
							else {
								if (this.GlobalThickness && this.InitialValue == 1)
									this.SV.Thickness = this.GlobalThickness;
								else {
									if (this.InitialValue == 1 && DB.getItem('Thickness'))
										this.SV.Thickness = DB.getItem('Thickness');
									else if ($('select[name=Thickness_Check] option:selected').val() != 'All' && typeof $('select[name=Thickness_Check] option:selected').val() != 'undefined')
										this.SV.Thickness = $('select[name=Thickness_Check] option:selected').val();
									else
										this.SV.Thickness = "";
								}
							}
						}
						if (this.SV.Thickness != '' && this.SV.Thickness != 'All') {
							this.FilterThickness = (this.SV.Thickness).toString().split(',');
							this.FilterThickness.forEach((obj) => {
								_this.FilterGallery = this.ThicknessList.filter(function (_) { return _.ID == obj; });
								for (let item of _this.FilterGallery) { this.FilterCrumbs.push(item); }
							});
							if (_this.FilterCrumbs.length > 0)
								$('.FilterCrumbs').show().css("visibility", "visible");
						}
						if (this.WCSettings[0]["SearchbyFinishes"] == 'on') {
							if (this.WCSettings[0]["SearchbyFinishesControl"] !== 'Dropdown') {
								if (this.FinishesList !== '' && typeof (this.FinishesList) !== 'undefined') {
									if (this.fromReset)
										this.FinishesList.filter(function (_) { return _.Selected; }).forEach(function (t) { return t.Selected = false; });
									else
										$('input[name=Finish_Check]:checked').each(function () { FinishLinq = FinishLinq + ',' + '' + $(this).val() + ''; });
								}
								if (this.InitialValue != 1 && !this.fromReset)
									this.SV.Finish = FinishLinq.substring(1);
								if (this.InitialValue == 1) {
									if (DB.getItem('Finish'))
										this.SV.Finish = DB.getItem('Finish');
									if (this.GlobalFinish && this.SV.Finish == '') {
										this.SV.Finish = this.GlobalFinish;
										DB.setItem('Finish', this.SV.Finish);
									}
								}

							}
							else {
								if (this.GlobalFinish && this.InitialValue == 1)
									this.SV.Finish = this.GlobalFinish;
								else {
									if (this.InitialValue == 1 && DB.getItem('Finish'))
										this.SV.Finish = DB.getItem('Finish');
									else if ($('select[name=Finish_Check] option:selected').val() != 'All' && typeof $('select[name=Finish_Check] option:selected').val() != 'undefined')
										this.SV.Finish = $('select[name=Finish_Check] option:selected').val();
									else
										this.SV.Finish = "";
								}
							}
						}
						if (this.SV.Finish != '' && this.SV.Finish != 'All') {
							this.FilterFinish = (this.SV.Finish).toString().split(',');
							this.FilterFinish.forEach((obj) => {
								_this.FilterGallery = this.FinishesList.filter(function (_) { return _.ID == obj; });
								for (let item of _this.FilterGallery) { this.FilterCrumbs.push(item); }
							});
							if (_this.FilterCrumbs.length > 0)
								$('.FilterCrumbs').show().css("visibility", "visible");
						}
						if (this.WCSettings[0]["SearchbyProductColorCodes"] == 'on') {
							if (this.WCSettings[0]["SearchbyProductColorCodesControl"] !== 'Dropdown') {
								if (this.ProductColorsList !== '' && typeof (this.ProductColorsList) !== 'undefined') {
									if (this.fromReset)
										this.ProductColorsList.filter(function (_) { return _.Selected; }).forEach(function (t) { return t.Selected = false; });
									else
										$('input[name=Color_Check]:checked').each(function () { ColorLinq = ColorLinq + ',' + '' + $(this).val() + ''; });
								}
								if (this.InitialValue != 1 && !this.fromReset)
									this.SV.Color = ColorLinq.substring(1);
								if (this.InitialValue == 1) {
									if (DB.getItem('Color'))
										this.SV.Color = DB.getItem('Color');
									if (this.GlobalColor && this.SV.Color == '') {
										this.SV.Color = this.GlobalColor;
										DB.setItem('Color', this.SV.Color);
									}
								}

							}
							else {
								if (this.GlobalColor && this.InitialValue == 1)
									this.SV.Color = this.GlobalColor;
								else {
									if (this.InitialValue == 1 && DB.getItem('Color'))
										this.SV.Color = DB.getItem('Color');
									else if ($('select[name=Color_Check] option:selected').val() != 'All' && typeof $('select[name=Color_Check] option:selected').val() != 'undefined')
										this.SV.Color = $('select[name=Color_Check] option:selected').val();
									else
										this.SV.Color = "";
								}
							}
						}
						if (this.SV.Color != '' && this.SV.Color != 'All') {
							this.FilterColors = (this.SV.Color).toString().split(',');
							this.FilterColors.forEach((obj) => {
								_this.FilterGallery = this.ProductColorsList.filter(function (_) { return _.ID == obj; });
								for (let item of _this.FilterGallery) { this.FilterCrumbs.push(item); }
							});
							if (_this.FilterCrumbs.length > 0)
								$('.FilterCrumbs').show().css("visibility", "visible");
						}
						if (this.WCSettings[0]["SearchByPriceRange"] == 'on') {
							if (this.WCSettings[0]["SearchByPriceRangeControl"] !== 'Dropdown') {
								if (this.ProductPriceRangesList !== '' && typeof (this.ProductPriceRangesList) !== 'undefined') {
									if (this.fromReset)
										this.ProductPriceRangesList.filter(function (_) { return _.Selected; }).forEach(function (t) { return t.Selected = false; });
									else
										$('input[name=PriceRange_Check]:checked').each(function () { PriceRangeLinq = PriceRangeLinq + ',' + '' + $(this).val() + ''; });
								}
								if (this.InitialValue != 1 && !this.fromReset)
									this.SV.PriceRange = PriceRangeLinq.substring(1);
								if (this.InitialValue == 1) {
									if (DB.getItem('PriceRange'))
										this.SV.PriceRange = DB.getItem('PriceRange');
									if (this.GlobalPriceRange && this.SV.PriceRange == '') {
										this.SV.PriceRange = this.GlobalPriceRange;
										DB.setItem('PriceRange', this.SV.PriceRange);
									}
								}

							}
							else {
								if (this.GlobalPriceRange && this.InitialValue == 1)
									this.SV.PriceRange = this.GlobalPriceRange;
								else {
									if (this.InitialValue == 1 && DB.getItem('PriceRange'))
										this.SV.PriceRange = DB.getItem('PriceRange');
									else if ($('select[name=PriceRange_Check] option:selected').val() != 'All' && typeof $('select[name=PriceRange_Check] option:selected').val() != 'undefined')
										this.SV.PriceRange = $('select[name=PriceRange_Check] option:selected').val();
									else
										this.SV.PriceRange = "";
								}
							}
						}
						if (this.SV.PriceRange != '' && this.SV.PriceRange != 'All') {
							this.FilterPriceRanges = (this.SV.PriceRange).toString().split(',');
							this.FilterPriceRanges.forEach((obj) => {
								_this.FilterGallery = this.ProductPriceRangesList.filter(function (_) { return _.ID == obj; });
								for (let item of _this.FilterGallery) { this.FilterCrumbs.push(item); }
							});
							if (_this.FilterCrumbs.length > 0)
								$('.FilterCrumbs').show().css("visibility", "visible");
						}
						if (this.WCSettings[0]["SearchByOrigin"] == 'on') {
							if (this.WCSettings[0]["SearchByOriginControl"] !== 'Dropdown') {
								if (this.OriginList !== '' && typeof (this.OriginList) !== 'undefined') {
									if (this.fromReset)
										this.OriginList.filter(function (_) { return _.Selected; }).forEach(function (t) { return t.Selected = false; });
									else
										$('input[name=Origin_Check]:checked').each(function () { OriginLinq = OriginLinq + ',' + '' + $(this).val() + ''; });
								}
								if (this.InitialValue != 1 && !this.fromReset)
									this.SV.Origin = OriginLinq.substring(1);
								if (this.InitialValue == 1) {
									if (DB.getItem('Origin'))
										this.SV.Origin = DB.getItem('Origin');
									if (this.GlobalOrigin && this.SV.Origin == '') {
										this.SV.Origin = this.GlobalOrigin;
										DB.setItem('Origin', this.SV.Origin);
									}
								}

							}
							else {
								if (this.GlobalOrigin && this.InitialValue == 1)
									this.SV.Origin = this.GlobalOrigin;
								else {
									if (this.InitialValue == 1 && DB.getItem('Origin'))
										this.SV.Origin = DB.getItem('Origin');
									else if ($('select[name=Origin_Check] option:selected').val() != 'All' && typeof $('select[name=Origin_Check] option:selected').val() != 'undefined')
										this.SV.Origin = $('select[name=Origin_Check] option:selected').val();
									else
										this.SV.Origin = "";
								}
							}
						}
						if (this.SV.Origin != '' && this.SV.Origin != 'All') {
							this.FilterOrigins = (this.SV.Origin).toString().split(',');
							this.FilterOrigins.forEach((obj) => {
								_this.FilterGallery = this.OriginList.filter(function (_) { return _.ID == obj; });
								for (let item of _this.FilterGallery) { this.FilterCrumbs.push(item); }
							});
							if (_this.FilterCrumbs.length > 0)
								$('.FilterCrumbs').show().css("visibility", "visible");
						}
						if (this.WCSettings[0]["SearchByKind"] == 'on') {
							if (this.WCSettings[0]["SearchByKindControl"] !== 'Dropdown') {
								if (this.KindList !== '' && typeof (this.KindList) !== 'undefined') {
									if (this.fromReset)
										this.KindList.filter(function (_) { return _.Selected; }).forEach(function (t) { return t.Selected = false; });
									else
										$('input[name=Kind_Check]:checked').each(function () { KindLinq = KindLinq + ',' + '' + $(this).val() + ''; });
								}
								if (this.InitialValue != 1 && !this.fromReset)
									this.SV.Kind = KindLinq.substring(1);
								if (this.InitialValue == 1) {
									if (DB.getItem('Kind'))
										this.SV.Kind = DB.getItem('Kind');
									if (this.GlobalKind && this.SV.Kind == '') {
										this.SV.Kind = this.GlobalKind;
										DB.setItem('Kind', this.SV.Kind);
									}
								}

							}
							else {
								if (this.GlobalKind && this.InitialValue == 1)
									this.SV.Kind = this.GlobalKind;
								else {
									if (this.InitialValue == 1 && DB.getItem('Kind'))
										this.SV.Kind = DB.getItem('Kind');
									else if ($('select[name=Kind_Check] option:selected').val() != 'All' && typeof $('select[name=Kind_Check] option:selected').val() != 'undefined')
										this.SV.Kind = $('select[name=Kind_Check] option:selected').val();
									else
										this.SV.Kind = "";
								}
							}
						}
						if (this.SV.Kind != '' && this.SV.Kind != 'All') {
							this.FilterKinds = (this.SV.Kind).toString().split(',');
							this.FilterKinds.forEach((obj) => {
								_this.FilterGallery = this.KindList.filter(function (_) { return _.ID == obj; });
								for (let item of _this.FilterGallery) { this.FilterCrumbs.push(item); }
							});
							if (_this.FilterCrumbs.length > 0)
								$('.FilterCrumbs').show().css("visibility", "visible");
						}

						if (this.WCSettings[0]["SearchbySlabOption"] == 'on') {
							if (this.WCSettings[0]["SearchbySlabOptionControl"] !== 'Dropdown') {
								if (this.SlabOptionsList !== '' && typeof (this.SlabOptionsList) !== 'undefined') {
									if (this.fromReset)
										this.SlabOptionsList.filter(function (_) { return _.Selected; }).forEach(function (t) { return t.Selected = false; });
									else
										$('input[name=SlabOptions_Check]:checked').each(function () { SlabOptionsLinq = SlabOptionsLinq + ',' + '' + $(this).val() + ''; });
								}
								if (this.InitialValue != 1 && !this.fromReset)
									this.SV.SlabOptions = SlabOptionsLinq.substring(1);
								if (this.InitialValue == 1) {
									if (DB.getItem('SlabOptions'))
										this.SV.SlabOptions = DB.getItem('SlabOptions');
									if (this.GlobalSlabOptions && this.SV.SlabOptions == '') {
										this.SV.SlabOptions = this.GlobalSlabOptions;
										DB.setItem('SlabOptions', this.SV.SlabOptions);
									}
								}

							}
							else {
								if (this.GlobalSlabOptions && this.InitialValue == 1)
									this.SV.SlabOptions = this.GlobalSlabOptions;

								else {
									if (this.InitialValue == 1 && DB.getItem('SlabOptions'))
										this.SV.SlabOptions = DB.getItem('SlabOptions');
									else if ($('select[name=SlabOptions_Check] option:selected').val() != 'All' && typeof $('select[name=SlabOptions_Check] option:selected').val() != 'undefined')
										this.SV.SlabOptions = $('select[name=SlabOptions_Check] option:selected').val();
									else
										this.SV.SlabOptions = "";
								}
							}

						}
						if (this.SV.SlabOptions != '' && this.SV.SlabOptions != 'All') {
							this.FilterSlabOptionss = (this.SV.SlabOptions).toString().split(',');
							this.FilterSlabOptionss.forEach((obj) => {
								_this.FilterGallery = this.SlabOptionsList.filter(function (_) { return _.ID == obj; });
								for (let item of _this.FilterGallery) { this.FilterCrumbs.push(item); }
							});
							if (_this.FilterCrumbs.length > 0)
								$('.FilterCrumbs').show().css("visibility", "visible");
						}

						//Sale Filter
						if (this.WCSettings[0]["SearchbySaleOption"] == 'on') {
							if (this.WCSettings[0]["SearchbySaleOptionControl"] !== 'Dropdown') {
								if (this.SaleOptionsList !== '' && typeof (this.SaleOptionsList) !== 'undefined') {
									if (this.fromReset)
										this.SaleOptionsList.filter(function (_) { return _.Selected; }).forEach(function (t) { return t.Selected = false; });
									else
										$('input[name=SaleOptions_Check]:checked').each(function () { SaleOptionsLinq = SaleOptionsLinq + ',' + '' + $(this).val() + ''; });
								}
								if (this.InitialValue != 1 && !this.fromReset)
									this.SV.SaleOptions = SaleOptionsLinq.substring(1);
								if (this.InitialValue == 1) {
									if (DB.getItem('SaleOptions'))
										this.SV.SaleOptions = DB.getItem('SaleOptions');
									if (this.GlobalSaleOptions && this.SV.SaleOptions == '') {
										this.SV.SaleOptions = this.GlobalSaleOptions;
										DB.setItem('SaleOptions', this.SV.SaleOptions);
									}
								}

							}
							else {
								if (this.GlobalSaleOptions && this.InitialValue == 1)
									this.SV.SaleOptions = this.GlobalSaleOptions;

								else {
									if (this.InitialValue == 1 && DB.getItem('SaleOptions'))
										this.SV.SaleOptions = DB.getItem('SaleOptions');
									else if ($('select[name=SaleOptions_Check] option:selected').val() != 'All' && typeof $('select[name=SaleOptions_Check] option:selected').val() != 'undefined')
										this.SV.SaleOptions = $('select[name=SaleOptions_Check] option:selected').val();
									else
										this.SV.SaleOptions = "";
								}
							}

						}
						if (this.SV.SaleOptions != '' && this.SV.SaleOptions != 'All') {
							this.FilterSaleOptionss = (this.SV.SaleOptions).toString().split(',');
							this.FilterSaleOptionss.forEach((obj) => {
								_this.FilterGallery = this.SaleOptionsList.filter(function (_) { return _.Value == obj; });
								for (let item of _this.FilterGallery) { this.FilterCrumbs.push(item); }
							});
							if (_this.FilterCrumbs.length > 0)
								$('.FilterCrumbs').show().css("visibility", "visible");
						}

						//Available 
						if (this.WCSettings[0]["SearchbyAvailableOption"] == 'on') {
							if (this.WCSettings[0]["SearchbyAvailableOptionControl"] !== 'Dropdown') {
								if (this.AvailableOptionsList !== '' && typeof (this.AvailableOptionsList) !== 'undefined') {
									if (this.fromReset)
										this.AvailableOptionsList.filter(function (_) { return _.Selected; }).forEach(function (t) { return t.Selected = false; });
									else
										$('input[name=AvailableOptions_Check]:checked').each(function () { AvailableOptionsLinq = AvailableOptionsLinq + ',' + '' + $(this).val() + ''; });
								}
								if (this.InitialValue != 1 && !this.fromReset)
									this.SV.AvailableOptions = AvailableOptionsLinq.substring(1);
								if (this.InitialValue == 1) {
									if (DB.getItem('AvailableOptions'))
										this.SV.AvailableOptions = DB.getItem('AvailableOptions');
									if (this.GlobalAvailableOptions && this.SV.AvailableOptions == '') {
										this.SV.AvailableOptions = this.GlobalAvailableOptions;
										DB.setItem('AvailableOptions', this.SV.AvailableOptions);
									}
								}

							}
							else {
								if (this.GlobalAvailableOptions && this.InitialValue == 1)
									this.SV.AvailableOptions = this.GlobalAvailableOptions;

								else {
									if (this.InitialValue == 1 && DB.getItem('AvailableOptions'))
										this.SV.AvailableOptions = DB.getItem('AvailableOptions');
									else if ($('select[name=AvailableOptions_Check] option:selected').val() != 'All' && typeof $('select[name=AvailableOptions_Check] option:selected').val() != 'undefined')
										this.SV.AvailableOptions = $('select[name=AvailableOptions_Check] option:selected').val();
									else
										this.SV.AvailableOptions = "";
								}
							}

						}
						if (this.SV.AvailableOptions != '' && this.SV.AvailableOptions != 'All') {
							this.FilterAvailableOptionss = (this.SV.AvailableOptions).toString().split(',');
							this.FilterAvailableOptionss.forEach((obj) => {
								_this.FilterGallery = this.AvailableOptionsList.filter(function (_) { return _.Value == obj; });
								for (let item of _this.FilterGallery) { this.FilterCrumbs.push(item); }
							});
							if (_this.FilterCrumbs.length > 0)
								$('.FilterCrumbs').show().css("visibility", "visible");
						}
                        // Restore the new numeric filters on initial load/back nav
                        if (this.InitialValue == 1) {
                            const q1 = DB.getItem('AvgCurrentAvailableQty');
                            const q2 = DB.getItem('AvgCurrentSlabLength');
                            const q3 = DB.getItem('AvgCurrentSlabWidth');
                            const q4 = DB.getItem('AvailableSlabs');

                            if (q1 !== null && q1 !== '') this.SV.AvgCurrentAvailableQty = q1;
                            if (q2 !== null && q2 !== '') this.SV.AvgCurrentSlabLength  = q2;
                            if (q3 !== null && q3 !== '') this.SV.AvgCurrentSlabWidth   = q3;
                            if (q4 !== null && q4 !== '') this.SV.AvailableSlabs        = q4;

                            // Optional: update DOM inputs if they are plain HTML fields
                            try {
                                if (typeof $ !== 'undefined') {
                                    if (q1) $('#AvgCurrentAvailableQty').val(q1);
                                    if (q2) $('#AvgCurrentSlabLength').val(q2);
                                    if (q3) $('#AvgCurrentSlabWidth').val(q3);
                                    if (q4) $('#AvailableSlabs').val(q4);
                                }
                            } catch (_) {}
                        }
						if (this.GlobalName && this.InitialValue == 1) {
							this.SV.ItemName = this.GlobalName;
							DB.setItem('CurrentPage', null);
							document.getElementById('hiddenGoToPage').innerHTML = "1";
						}
						else {
							if (this.InitialValue == 1 && DB.getItem('Name'))
								this.SV.ItemName = DB.getItem('Name');
							else
								DB.setItem('Name', this.SV.ItemName);
						}
						if (this.InitialValue == 1 && DB.getItem('ItemIdentifiers'))
							this.SV.ItemIdentifiers = DB.getItem('ItemIdentifiers');
						else if (this.SV.ItemIdentifiers != '' && typeof this.SV.ItemIdentifiers != 'undefined')
							DB.setItem('ItemIdentifiers', this.SV.ItemIdentifiers);
						else {
							DB.setItem('ItemIdentifiers', '');
							this.SV.ItemIdentifiers = '';
						}
						if ((this.CurrentPage === DB.getItem('CurrentPage') || this.CurrentPage === "1") && DB.getItem('CurrentPage')) {
							document.getElementById("hiddenCurrentPage").innerHTML = DB.getItem('CurrentPage');
						}
						if ((new Date(document.getElementById('hiddenTimeAtSubmit').innerHTML) - new Date(document.getElementById('hiddenTimeAtNonSubmit').innerHTML) > 3000)) {
							DB.setItem('CurrentPage', '1');
							document.getElementById('hiddenGoToPage').innerHTML = "1";
							document.getElementById('hiddenCurrentPage').innerHTML = "1";
							document.getElementById("CurrentPage").innerHTML = "1";
						}
						if (this.InitialValue > 1) {
							if (!document.getElementById('hiddenTimeAtNonSubmit').innerHTML) {
								DB.setItem('CurrentPage', '1');
								document.getElementById('hiddenGoToPage').innerHTML = "1";
								document.getElementById('hiddenCurrentPage').innerHTML = "1";
								document.getElementById("CurrentPage").innerHTML = "1";
							}
						}
						document.getElementById("SelectedLocation").innerHTML = this.SV.Location;
						document.getElementById("SelectedSlabOption").innerHTML = this.SV.SlabOptions;
						//console.log(JSON.stringify(this.SV));                    
						var body = JSON.stringify(this.SV);
						var results;
						this.CountOfProducts = parseInt(document.getElementById("hiddenCount").innerHTML);
						this.PageCount = Math.floor(this.CountOfProducts / parseInt(this.perPage)) + 1;
						if (((this.PageCount - 1) * parseInt(this.perPage)) >= this.CountOfProducts)
							this.PageCount = this.PageCount - 1;
						if ((this.perPage === DB.getItem('PerPage') || this.perPage === "36" || this.perPage === "20") && DB.getItem('PerPage'))
							this.perPage = DB.getItem('PerPage');
						document.getElementById("hiddenNumberOfPages").innerHTML = this.PageCount.toString();
						if (parseInt(document.getElementById('hiddenGoToPage').innerHTML) > parseInt(document.getElementById('hiddenNumberOfPages').innerHTML))
							this.HideItems = (((parseInt(document.getElementById('hiddenGoToPage').innerHTML) - 2) * parseInt(this.perPage))).toString();
						else
							this.HideItems = (((parseInt(document.getElementById('hiddenGoToPage').innerHTML) - 1) * parseInt(this.perPage))).toString();
						if (parseInt(this.HideItems) < 0)
							this.HideItems = '0';
						this.ActiveAlphabetCount = $('.AlphaSort').find(document.getElementsByClassName("active")).length;
						this.IndexAlphabet = "";
						if (this.ActiveAlphabetCount > 0) {
							for (var i_1 = 0; i_1 < this.ActiveAlphabetCount; i_1++) {
								this.IndexAlphabet += "" + $('.AlphaSort').find(document.getElementsByClassName("active"))[i_1].id + "";
							}
						}
						if (this.GlobalIndex && this.InitialValue == 1)
							this.IndexAlphabet = this.GlobalIndex;
						else {
							if ((this.IndexAlphabet === DB.getItem('IndexAlphabet') || this.IndexAlphabet === "") && DB.getItem('IndexAlphabet')) {
								this.IndexAlphabet = DB.getItem('IndexAlphabet');
								document.getElementById(this.IndexAlphabet).className = "active";
							}
						}
						if (DB.getItem('load') == 'postBack' && this.InitialValue == 1 && sessionStorage.getItem('Gallery') != null) {
							this.FullGallery = JSON.parse(LZString.decompressFromUTF16(sessionStorage.getItem('Gallery')));
							this.TotalFullGallery = JSON.parse(LZString.decompressFromUTF16(sessionStorage.getItem('Gallery')));
						}
						else
							this.FullGallery = this.TotalFullGallery;
						if (DB.getItem('load') == '' || typeof this.FilterCrumbs == 'undefined' || this.FilterCrumbs.length == 0)
							$('.FilterCrumbs').hide().css("visibility", "hidden");
						else
							$('.FilterCrumbs').show();
						if (this.FullGallery != 'undefined' && typeof this.FullGallery != 'undefined' && this.FullGallery.length > 0)
							this.showdata(this.TotalFullGallery);
						else {
							/*if(DB.getItem('load') == 'postBack' && this.ShowGallery != 'null'){
								this.ShowGallery = JSON.parse(DB.getItem('Gallery'));
								this.showdata(this.ShowGallery)
							}else{*/
							var showLocation = '';
							if (this.WCSettings[0]["ShowLocationinGallery"] == 'on')
								showLocation = 'on';
							if (this.WCSettings[0]["GalleryListType"] != 'ListInventoryLots') {
								this._http.post(this.systemUrl + '?act=getItemGallery&WebconnectSettingID=' + WebconnectSettingID + '&InventoryGroupBy=' + (this.WCSettings[0]["GroupInventoryBy"] ? this.WCSettings[0]["GroupInventoryBy"].replace(/,/g, '_') : 'IDONE_') + '&SearchbyItemIdentifiers=' + this.WCSettings[0]["SearchbyItemIdentifiers"] + '&ShowFeatureProductOnTop=' + this.WCSettings[0]["ShowFeatureProductsOnTop"] + '&OnHold=' + this.WCSettings[0]["IncludeInventoryOnHold"] + '&OnSO=' + this.WCSettings[0]["IncludeInventoryOnSO"] + '&Intransit=' + this.WCSettings[0]["IncludeInventoryOnTransfer"] + '&showNotInStock=' + this.WCSettings[0]["IncludeProductsNotinStock"] + '&SearchbyFinish=on&SearchbySKU=' + this.WCSettings[0]["SearchbySKU"] + '&Alphabet=' + this.IndexAlphabet + '&q=' + new Date().getTime(), body, options)
									.map(function (res) {
										if (Token == 'kbr') {
											return res.json().filter(function (_) { return _.Kind != 'Non Stock'; });
										}
										else if (webname == 'americanquartz') {
											return res.json().filter(function (_) { return _.CategoryID == 19; });
										}
										else if (webname == 'asmisurfaces') {
											return res.json().filter(function (_) { return _.TypeID == 1; });
										}
										else { return res.json(); }
									})
									.subscribe(function (data) {
										data = data.sort(function (a, b) {
											if (a.FeatureProduct === 'on' && b.FeatureProduct !== 'on') return -1;
											if (a.FeatureProduct !== 'on' && b.FeatureProduct === 'on') return 1;
											return a.ItemName.localeCompare(b.ItemName);
										});
										return _this.showdata(data);
									}, function (err) { return _this.logError(err); }, function () { return document.getElementById("loadingID").innerHTML = ""; });
							}
							else {
								this._http.post(this.systemUrl + '?act=getInventoryGallery&WebconnectSettingID=' + WebconnectSettingID + '&InventoryGroupBy=' + this.WCSettings[0]["GroupInventoryBy"].replace(/,/g, '_') + '&TrimmedUserID=' + this.TrimmedUserID + '&OnHold=' + this.WCSettings[0]["IncludeInventoryOnHold"] + '&OnSO=' + this.WCSettings[0]["IncludeInventoryOnSO"] + '&Intransit=' + this.WCSettings[0]["IncludeInventoryOnTransfer"] + '&showNotInStock=' + this.WCSettings[0]["IncludeProductsNotinStock"] + '&Alphabet=' + this.IndexAlphabet + '&showLocation=' + showLocation + '&q=' + new Date().getTime(), body, options)
									.map(function (res) {
										if (Token == 'emgeestone') {
											return res.json().filter(function (_) { return _.AvailableSlabs > 1; }).filter(function (_) { return _.Filename != ''; });
										}
										else {
											return res.json();
										}
									})
									.subscribe(function (data) { return _this.showdata(data); }, function (err) { return _this.logError(err); }, function () { return document.getElementById("loadingID").innerHTML = ""; });
							}
						}
						jQuery(window).trigger('scroll');
					}
				};

				SearchComponent.prototype.showdata = function (datar) {
					DB.setItem('Category', this.SV.Category);
					DB.setItem('SubCategory', this.SV.SubCategory);
					DB.setItem('Thickness', this.SV.Thickness);
					DB.setItem('Finish', this.SV.Finish);
					DB.setItem('Color', this.SV.Color);
					DB.setItem('Location', this.SV.Location);
					DB.setItem('Type', this.SV.Type);
					DB.setItem('PriceRange', this.SV.PriceRange);
					DB.setItem('Origin', this.SV.Origin);
					DB.setItem('Kind', this.SV.Kind);
					DB.setItem('SlabOptions', this.SV.SlabOptions)
					DB.setItem('SaleOptions', this.SV.SaleOptions)
					DB.setItem('AvgCurrentAvailableQty', this.SV.AvgCurrentAvailableQty)
					DB.setItem('AvgCurrentSlabLength', this.SV.AvgCurrentSlabLength)
					DB.setItem('AvgCurrentSlabWidth', this.SV.AvgCurrentSlabWidth)
					DB.setItem('AvailableSlabs', this.SV.AvailableSlabs)
					DB.setItem('AvailableOptions', this.SV.AvailableOptions)
					DB.setItem('Group', this.SV.Group);
					DB.setItem('Name', this.SV.ItemName);
					DB.setItem('IndexAlphabet', this.IndexAlphabet);
					DB.setItem('PageNum', this.PageNum);
					DB.setItem('PerPage', this.perPage);
					DB.setItem('CurrentPage', this.CurrentPage);
					this.uniqueGallery = [];
					this.elements = [];
					this.ShowGallery = [];

					if ((this.FullGallery == 'undefined' || typeof this.FullGallery == 'undefined') && (DB.getItem('load') != 'postBack' || LZString.decompressFromUTF16(DB.getItem('Gallery')) == null)) {
						this.TotalFullGallery = datar;
						DB.setItem('Gallery', LZString.compressToUTF16(JSON.stringify(datar)));
						sessionStorage.setItem('Gallery', LZString.compressToUTF16(JSON.stringify(datar)));
						DB.setItem('load', "postBack")
					}
					this.FullGallery = datar;
					if (this.FullGallery != 'undefined' && typeof this.FullGallery != 'undefined' && this.FullGallery.length > 0) {
						var _this = this;
						if (this.SV.ItemName != '') {
							_this.ShowGallery = this.FullGallery.filter(function (_) {
								return (
									(_.ItemName.toLowerCase()).indexOf(_this.SV.ItemName.toLowerCase()) !== -1 ||
									(typeof _.AlternateName !== 'undefined' && _.AlternateName !== null ?
										(_.AlternateName.toLowerCase()).indexOf(_this.SV.ItemName.toLowerCase()) !== -1 :
										false)
								);
							});


							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
							else
								this.FullGallery = [];

						}
						if (this.SV.ItemIdentifiers != '') {

							var GroupInventoryBy = this.WCSettings[0]["GroupInventoryBy"].replace(/,/g, '_')
							//console.log(this.WCSettings[0]["GroupInventoryBy"].replace(/,/g, '_'), GroupInventoryBy.includes('IDOne'), GroupInventoryBy.includes('IDTwo'))
							if (GroupInventoryBy.includes('IDOne')) {
								_this.ShowGallery = this.FullGallery.filter(function (_) { return (_.IDOne.toLowerCase()).indexOf(_this.SV.ItemIdentifiers.toLowerCase()) != -1; });
							}
							else if (GroupInventoryBy.includes('IDTwo')) {
								_this.ShowGallery = this.FullGallery.filter(function (_) { return (_.IDTwo.toLowerCase()).indexOf(_this.SV.ItemIdentifiers.toLowerCase()) != -1; });
							}
							else if (GroupInventoryBy.includes('IDThree')) {
								_this.ShowGallery = this.FullGallery.filter(function (_) { return (_.IDThree.toLowerCase()).indexOf(_this.SV.ItemIdentifiers.toLowerCase()) != -1; });
							}
							else {
								_this.ShowGallery = this.FullGallery.filter(function (_) { return (_.IDOne.toLowerCase()).indexOf(_this.SV.ItemIdentifiers.toLowerCase()) != -1; });
							}
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}
						if (this.SV.Location != '' && this.SV.Location != 'All') {
							_this.ShowGallery = [];
							this.Location = (this.SV.Location).toString().split(',');
							this.Location.forEach((obj) => {
								if (Token == 'agmimports') {
									_this.Gallery = this.FullGallery.filter(function (_) { return _.LocationID.includes(obj); });
								}
								else {
									_this.Gallery = this.FullGallery.filter(function (_) { return _.LocationID == obj; });
								}
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}
						if (this.SV.Type != '' && this.SV.Type != 'All') {
							_this.ShowGallery = [];
							this.Types = (this.SV.Type).toString().split(',');
							this.Types.forEach((obj) => {
								_this.Gallery = this.FullGallery.filter(function (_) { return _.TypeID == obj; });
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}
						if (this.SV.Category != '' && this.SV.Category != 'All') {
							_this.ShowGallery = [];
							this.Categories = (this.SV.Category).toString().split(',');
							this.Categories.forEach((obj) => {
								_this.Gallery = this.FullGallery.filter(function (_) { return _.CategoryID == obj; });
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}
						if (this.SV.SubCategory != '' && this.SV.SubCategory != 'All') {
							_this.ShowGallery = [];
							this.SubCategories = (this.SV.SubCategory).toString().split(',');
							this.SubCategories.forEach((obj) => {
								_this.Gallery = this.FullGallery.filter(function (_) { return _.SubCategoryID == obj; });
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}
						if (this.SV.Group != '' && this.SV.Group != 'All') {
							_this.ShowGallery = [];
							this.Groups = (this.SV.Group).toString().split(',');
							this.Groups.forEach((obj) => {
								_this.Gallery = this.FullGallery.filter(function (_) { return _.GroupID == obj; });
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}
						if (this.SV.Thickness != '' && this.SV.Thickness != 'All') {
							_this.ShowGallery = [];
							this.Thicknesses = (this.SV.Thickness).toString().split(',');
							this.Thicknesses.forEach((obj) => {
								_this.Gallery = this.FullGallery.filter(function (_) { return _.ThicknessID == obj; });
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}
						if (this.SV.Color != '' && this.SV.Color != 'All') {
							_this.ShowGallery = [];
							this.Colors = (this.SV.Color).toString().split(',');
							this.Colors.forEach((obj) => {
								_this.Gallery = this.FullGallery.filter(function (_) { return _.ColorID == obj; });
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
							else
								this.FullGallery = [];
						}
						if (this.SV.PriceRange != '' && this.SV.PriceRange != 'All') {
							_this.ShowGallery = [];
							this.PriceRanges = (this.SV.PriceRange).toString().split(',');
							this.PriceRanges.forEach((obj) => {
								_this.Gallery = this.FullGallery.filter(function (_) { return _.PriceRangeID == obj; });
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}
						if (this.SV.Origin != '' && this.SV.Origin != 'All') {
							_this.ShowGallery = [];
							this.Origins = (this.SV.Origin).toString().split(',');
							this.Origins.forEach((obj) => {
								_this.Gallery = this.FullGallery.filter(function (_) { return _.OriginID == obj; });
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}

						if (this.SV.Kind != '' && this.SV.Kind != 'All') {
							_this.ShowGallery = [];
							this.Kinds = (this.SV.Kind).toString().split(',');
							this.Kinds.forEach((obj) => {
								_this.Gallery = this.FullGallery.filter(function (_) { return _.Kind == obj; });
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}
						if (this.SV.SlabOptions != '' && this.SV.SlabOptions != 'All') {
							_this.ShowGallery = [];
							this.SlabOptionss = (this.SV.SlabOptions).toString().split(',');
							this.SlabOptionss.forEach((obj) => {
								_this.Gallery = this.FullGallery.filter(function (_) { return _.SlabOptions == obj; });
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}
						if (this.SV.SaleOptions != '' && this.SV.SaleOptions != 'All') {
							_this.ShowGallery = [];
							this.SaleOptionss = (this.SV.SaleOptions).toString().split(',');
							this.SaleOptionss.forEach((obj) => {
								_this.Gallery = this.FullGallery.filter(function (_) { return _.SaleOptions == obj; });
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}
						if (this.SV.AvailableOptions != '' && this.SV.AvailableOptions != 'All') {
							_this.ShowGallery = [];
							this.AvailableOptionss = (this.SV.AvailableOptions).toString().split(',');
							this.AvailableOptionss.forEach((obj) => {
								_this.Gallery = this.FullGallery.filter(function (_) { return _.AvailableOptions == obj; });
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}
						if (
							this.SV.AvgCurrentSlabLength != null && this.SV.AvgCurrentSlabLength !== '' ||
							this.SV.AvgCurrentSlabWidth != null && this.SV.AvgCurrentSlabWidth !== ''
						) {
							_this.ShowGallery = [];

							const lengthValues = this.SV.AvgCurrentSlabLength
								? this.SV.AvgCurrentSlabLength.toString().split(',').map(Number)
								: [];

							const widthValues = this.SV.AvgCurrentSlabWidth
								? this.SV.AvgCurrentSlabWidth.toString().split(',').map(Number)
								: [];

							this.FullGallery.forEach(item => {
								const length = item.AvgCurrentSlabLength;
								const width = item.AvgCurrentSlabWidth;

								let matchesLength = true;
								let matchesWidth = true;

								// ✔️ Match all lengths >= entered value(s)
								if (lengthValues.length > 0) {
									matchesLength = lengthValues.some(val => length >= val);
								}

								// ✔️ Match all widths >= entered value(s)
								if (widthValues.length > 0) {
									matchesWidth = widthValues.some(val => width >= val);
								}

								// Push if matches all provided filters
								if (matchesLength && matchesWidth) {
									_this.ShowGallery.push(item);
								}
							});

							if (_this.ShowGallery.length > 0) {
								this.FullGallery = _this.ShowGallery;
							}

							//console.log(this.FullGallery, "Filtered Full Gallery (Length/Width ≥ value)");
						}


						if (this.SV.AvgCurrentAvailableQty != null && this.SV.AvgCurrentAvailableQty > 0) {
							_this.ShowGallery = [];
							this.AvgCurrentAvailableQty = (this.SV.AvgCurrentAvailableQty).toString().split(',').map(Number);

							this.AvgCurrentAvailableQty.forEach((targetQty) => {
								_this.Gallery = this.FullGallery.filter(function (_) {
									return _.AvgCurrentAvailableQty >= targetQty;
								});

								for (let item of _this.Gallery) {
									_this.ShowGallery.push(item);
								}
							});

							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;

							console.log(this.FullGallery, "Filtered Full Gallery by AvgCurrentAvailableQty ±5");
						}

						// if (this.SV.AvailableSlabs != '' && this.SV.AvailableSlabs != 'All') {
						if (this.SV.AvailableSlabs != null && this.SV.AvailableSlabs > 0) {
							_this.ShowGallery = [];
							this.AvailableSlabs = (this.SV.AvailableSlabs).toString().split(',');
							this.AvailableSlabs.forEach((obj) => {
								_this.Gallery = this.FullGallery.filter(function (_) { return _.AvailableSlabs >= obj; });
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
							//console.log(this.FullGallery, "AvailableSlabs Full Gallery");

						}
						if (this.SV.Finish != '' && this.SV.Finish != 'All') {
							_this.ShowGallery = [];
							this.Finishes = (this.SV.Finish).toString().split(',');
							this.Finishes.forEach((obj) => {
								_this.Gallery = this.FullGallery.filter(function (_) { return (_.Finish == obj || _.FinishID == obj); });
								for (let item of _this.Gallery) { this.ShowGallery.push(item); }
							});
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}
						if (this.IndexAlphabet != '') {
							_this.ShowGallery = this.FullGallery.filter(function (_) { return (_.ItemName).charAt(0).toLowerCase() == _this.IndexAlphabet; });
							if (_this.ShowGallery.length > 0)
								this.FullGallery = _this.ShowGallery;
						}
						//|| this.SV.PriceRange || this.SV.Thickness || this.SV.Finish || this.SV.Color || this.SV.Origin || this.SV.Group ||
						if (this.ShowGallery.length > 0 || this.SV.ItemName || this.IndexAlphabet || (this.SV.Location != '' && this.SV.Location != 'All') || (this.SV.Type != '' && this.SV.Type != 'All') || (this.SV.Category != '' && this.SV.Category != 'All') || (this.SV.SubCategory != '' && this.SV.SubCategory != 'All') || (this.SV.PriceRange != '' && this.SV.PriceRange != 'All') || (this.SV.Thickness != '' && this.SV.Thickness != 'All') || (this.SV.Finish != '' && this.SV.Finish != 'All') || (this.SV.Color != '' && this.SV.Color != 'All') || (this.SV.Origin != '' && this.SV.Origin != 'All') || (this.SV.Kind != '' && this.SV.Kind != 'All') || (this.SV.Group != '' && this.SV.Group != 'All') || (this.SV.SlabOptions != '' && this.SV.SlabOptions != 'All') || (this.SV.SaleOptions != '' && this.SV.SaleOptions != 'All') || (this.SV.AvailableOptions != '' && this.SV.AvailableOptions != 'All'))
							datar = this.ShowGallery;
						else
							datar = this.TotalFullGallery;
					}
					if (this.WCSettings[0]["GalleryListType"] != 'ListInventoryLots') {
						datar.filter(item => {
							if (this.elements.indexOf(item.ItemID) == -1) {
								this.elements.push(item.ItemID);
								this.uniqueGallery.push(item);
							}
						});
						datar = this.uniqueGallery;
					}
					if (datar == "") {
						document.getElementById('myNav').setAttribute("style", "display: none;");
						document.getElementById('hiddenCount').innerHTML = "0";
					}
					else
						document.getElementById('hiddenCount').innerHTML = datar.length;
					if (this.WCSettings[0]["SearchbyLocationControl"] !== 'Dropdown' && this.SV.Location != '' && this.SV.Location != 'All') {
						this.bindValues(this.SV.Location, this.Locations);
					}
					if (this.WCSettings[0]["SearchbyProductTypeControl"] !== 'Dropdown' && this.SV.Type != '' && this.SV.Type != 'All') {
						this.bindValues(this.SV.Type, this.TypesList);
					}
					if (this.WCSettings[0]["SearchbyProductCategoryControl"] !== 'Dropdown' && this.SV.Category != '' && this.SV.Category != 'All') {
						this.bindValues(this.SV.Category, this.ProductCategoriesList);
					}
					if (this.WCSettings[0]["SearchbyThicknessControl"] !== 'Dropdown' && this.SV.Thickness != '' && this.SV.Thickness != 'All') {
						this.bindValues(this.SV.Thickness, this.ThicknessList);
					}
					if (this.WCSettings[0]["SearchbyProductSubCategoryControl"] !== 'Dropdown' && this.SV.SubCategory != '' && this.SV.SubCategory != 'All') {
						this.bindValues(this.SV.SubCategory, this.ProductSubCategoriesList);
					}
					if (this.WCSettings[0]["SearchByPriceRangeControl"] !== 'Dropdown' && this.SV.PriceRange != '' && this.SV.PriceRange != 'All') {
						this.bindValues(this.SV.PriceRange, this.ProductPriceRangesList);
					}
					if (this.WCSettings[0]["SearchByOriginControl"] !== 'Dropdown' && this.SV.Origin != '' && this.SV.Origin != 'All') {
						this.bindValues(this.SV.Origin, this.OriginList);
					}
					if (this.WCSettings[0]["SearchByKindControl"] !== 'Dropdown' && this.SV.Kind != '' && this.SV.Kind != 'All') {
						this.bindValues(this.SV.Kind, this.KindList);
					}
					if (this.WCSettings[0]["SearchbySlabOptionControl"] !== 'Dropdown' && this.SV.SlabOptions != '' && this.SV.SlabOptions != 'All') {
						this.bindValues(this.SV.SlabOptions, this.SlabOptionsList);
					}
					if (this.WCSettings[0]["SearchbySaleOptionControl"] !== 'Dropdown' && this.SV.SaleOptions != '' && this.SV.SaleOptions != 'All') {
						this.bindValues(this.SV.SaleOptions, this.SaleOptionsList);
					}
					if (this.WCSettings[0]["SearchbyAvailableOptionControl"] !== 'Dropdown' && this.SV.AvailableOptions != '' && this.SV.AvailableOptions != 'All') {
						this.bindValues(this.SV.AvailableOptions, this.AvailableOptionsList);
					}
					if (this.WCSettings[0]["SearchbyProductGroupControl"] !== 'Dropdown' && this.SV.Group != '' && this.SV.Group != 'All') {
						this.bindValues(this.SV.Group, this.ProductGroupList);
					}
					if (this.WCSettings[0]["SearchbyProductColorCodesControl"] !== 'Dropdown' && this.SV.Color != '' && this.SV.Color != 'All') {
						this.bindValues(this.SV.Color, this.ProductColorsList);
					}
					if (this.WCSettings[0]["SearchbyFinishesControl"] !== 'Dropdown' && this.SV.Finish != '' && this.SV.Finish != 'All') {
						this.bindValues(this.SV.Finish, this.FinishesList);
					}
					if (this.SV.Location == '') {
						this.SV.Location = 'All';
						setTimeout(function () { _this.hideSearchOptions('Location', this.InitialValue) }, 700);
					}
					if (this.SV.Type == '') {
						this.SV.Type = 'All';
						setTimeout(function () { _this.hideSearchOptions('Type', this.InitialValue) }, 700);
					}
					if (this.SV.Category == '') {
						this.SV.Category = 'All';
						setTimeout(function () { _this.hideSearchOptions('Category', this.InitialValue) }, 700);
					}
					if (this.SV.SubCategory == '') {
						this.SV.SubCategory = 'All';
						setTimeout(function () { _this.hideSearchOptions('SubCategory', this.InitialValue) }, 700);
					}
					if (this.SV.Color == '') {
						this.SV.Color = 'All';
						setTimeout(function () { _this.hideSearchOptions('Color', this.InitialValue) }, 700);
					}
					if (this.SV.Group == '') {
						this.SV.Group = 'All';
						setTimeout(function () { _this.hideSearchOptions('ProductGroup', this.InitialValue) }, 700);
					}
					if (this.SV.Finish == '') {
						this.SV.Finish = 'All';
						setTimeout(function () { _this.hideSearchOptions('Finish', this.InitialValue) }, 700);
					}
					if (this.SV.Origin == '') {
						this.SV.Origin = 'All';
						setTimeout(function () { _this.hideSearchOptions('Origin', this.InitialValue) }, 700);
					}
					if (this.SV.Kind == '') {
						this.SV.Kind = 'All';
						setTimeout(function () { _this.hideSearchOptions('Kind', this.InitialValue) }, 700);
					}
					if (this.SV.SlabOptions == '') {
						this.SV.SlabOptions = 'All';
						setTimeout(function () { _this.hideSearchOptions('SlabOptions', this.InitialValue) }, 700);
					}
					if (this.SV.SaleOptions == '') {
						this.SV.SaleOptions = 'All';
						setTimeout(function () { _this.hideSearchOptions('SaleOptions', this.InitialValue) }, 700);
					}
					if (this.SV.AvailableOptions == '') {
						this.SV.AvailableOptions = 'All';
						setTimeout(function () { _this.hideSearchOptions('AvailableOptions', this.InitialValue) }, 700);
					}
					if (this.SV.Thickness == '') {
						this.SV.Thickness = 'All';
						setTimeout(function () { _this.hideSearchOptions('Thickness', this.InitialValue) }, 700);
					}

					if (this.SV.PriceRange == '') {
						this.SV.PriceRange = 'All';
						setTimeout(function () { _this.hideSearchOptions('PriceRange', this.InitialValue) }, 700);
					}

					this.CountOfProducts = parseInt(document.getElementById("hiddenCount").innerHTML);
					this.PageCount = Math.floor(this.CountOfProducts / parseInt(this.perPage)) + 1;
					if (((this.PageCount - 1) * parseInt(this.perPage)) >= this.CountOfProducts) {
						this.PageCount = this.PageCount - 1;
					}

					document.getElementById("hiddenNumberOfPages").innerHTML = this.PageCount.toString();
					if (parseInt(document.getElementById('hiddenGoToPage').innerHTML) > parseInt(document.getElementById('hiddenNumberOfPages').innerHTML)) {
						this.HideItems = (((parseInt(document.getElementById('hiddenGoToPage').innerHTML) - 2) * parseInt(this.perPage)) + 1).toString();
					}
					else {
						this.HideItems = (((parseInt(document.getElementById('hiddenGoToPage').innerHTML) - 1) * parseInt(this.perPage)) + 1).toString();
					}
					datar = datar.slice((this.CurrentPage - 1) * this.perPage, this.perPage * this.CurrentPage)
					this.success.next({ results: datar });
					$('.horizontalDiv:eq(1)').after('<div class="clearfix visible-sm-block"></div>');
					$('.horizontalDiv:eq(3)').after('<div class="clearfix visible-lg-block visible-md-block"></div>');
					$('.horizontalDiv:eq(5)').after('<div class="clearfix visible-sm-block"></div>');
					$('.horizontalDiv:eq(7)').after('<div class="clearfix visible-lg-block visible-md-block"></div>');
					$('.horizontalDiv:eq(9)').after('<div class="clearfix visible-sm-block"></div>');
					$('.horizontalDiv:eq(11)').after('<div class="clearfix visible-lg-block visible-md-block"></div>');
					document.getElementById('myNav').setAttribute("style", "display:none;");
				};

				SearchComponent.prototype.addIndexAlphabet = function (alphabet) {
					if (document.getElementById(alphabet).className != "active") {
						this.IndexAlphabet = alphabet;
						var x = $('.AlphaSort').find(document.getElementsByClassName("active"));
						var i = void 0;
						var classLength = $('.AlphaSort').find(document.getElementsByClassName("active")).length;
						for (i = 0; i < classLength; i++) {
							document.getElementById(x[i].id).className = "";
						}
						document.getElementById(alphabet).className = "active";
					}
					else {
						document.getElementById(alphabet).className = "";
						DB.setItem('IndexAlphabet', "");
					}
				};

				SearchComponent.prototype.toggleSearchOptions = function (option) {
					const selector = '.' + option + 'SPSCheckBox';
					const icon = $('#' + option + 'Img');

					$(selector).slideToggle(300, function () {
						// Toggle classes based on visibility after animation completes
						if ($(this).is(':visible')) {
							icon.removeClass('icon-plusthin').addClass('icon-minusthin');
						} else {
							icon.removeClass('icon-minusthin').addClass('icon-plusthin');
						}
					});
				};


				SearchComponent.prototype.updateRangeSliderBackground = function (event) {
					var input = event.target;
					var min = +input.min;
					var max = +input.max;
					var value = +input.value;
					var percent = ((value - min) / (max - min)) * 100;

					input.style.background = "linear-gradient(to right, var(--btn-bgcolor-hvr)" + percent + "%,  #ddd " + percent + "%)";
				};
				SearchComponent.prototype.blockDecimal = function (event) {
					if (event.key === '.' || event.key === ',' || event.key.toLowerCase() === 'e') {
						event.preventDefault();
					}
				};


				SearchComponent.prototype.hideSearchOptions = function (option, initialLoad) {
					//if(initialLoad == 1 || 1==1)
					//{
					$('.' + option + 'SPSCheckBox').hide(500);
					$('#' + option + 'Img').removeClass('icon-minusthin');
					$('#' + option + 'Img').addClass('icon-plusthin');
					//}
				};
				SearchComponent.prototype.showGo = function (value, obj) {
					if (value != '')
						$('.' + obj).css('display', 'inline-block');
					else
						$('.' + obj).css('display', 'none');
				};
				SearchComponent.prototype.checkBoxChange = function (num) {
					this.perPage = num;
				};
				SearchComponent.prototype.topSearch = function () {
					this.ClickCount += 1;
					if (this.ClickCount % 2 == 1) {
						if (this.WCSettings[0]["SearchType"] == "Top") {
							document.getElementsByClassName("FilterTitle")[0].className += " CloseFilter";
							document.getElementsByClassName("SPSHorizontalForm")[0].setAttribute("style", "display: block;");
						}
						if (this.WCSettings[0]["SearchType"] != "Top") {
							document.getElementsByClassName("FilterTitle")[0].className += " CloseFilter";
							document.getElementsByClassName("SPSVerticalForm")[0].setAttribute("style", "display: block;");
						}
					}
					if (this.ClickCount % 2 == 0) {
						if (this.WCSettings[0]["SearchType"] == "Top") {
							document.getElementsByClassName("FilterTitle")[0].className = "FilterTitle";
							document.getElementsByClassName("SPSHorizontalForm")[0].setAttribute("style", "display: none;");
						}
						if (this.WCSettings[0]["SearchType"] != "Top") {
							document.getElementsByClassName("FilterTitle")[0].className = "FilterTitle";
							document.getElementsByClassName("SPSVerticalForm")[0].setAttribute("style", "display: none;");
						}
					}
				};
				SearchComponent.prototype.ClearFilter = function (ID, Option) {
					$('#' + Option + 'Check' + ID).prop('checked', false);
					$('select[name=' + Option + '_Check').val('');
				}
				SearchComponent.prototype.CategoryChange = function (CategoryValue) {
					var _this = this;
					var SelectedCategories = '';
					if (this.WCSettings[0]["SearchbyProductCategoryControl"] != 'CheckBox') {
						//CategoryValue = "'"+ CategoryValue +"'"
						//var SelectedCategories = CategoryValue;
						//this.ProductCategoriesList.filter(function (_) { return _.Selected; }).forEach(function (p) { SelectedCategories = SelectedCategories + "," + "'" + p.Name + "'"; });
						$('input[name=Category_Check]:checked').each(function () { SelectedCategories += ',' + $(this).val(); });
						this._http.get(this.systemUrl + '?act=getProductSubCategoriesList&ParentCategory=' + CategoryValue + '&q=' + new Date().getTime(), options)
							.map(function (res) { return res.json(); })
							.subscribe(function (data) { return _this.ProductSubCategoriesList = data }, function (err) { return _this.logError(err); }, function () { });
					}
					else {
						var count = 0;
						/*if($(CategoryValue).is(':checked')){
							var Category = "'"+ CategoryValue.value +"'"
							SelectedCategories = Category;
							this.ProductCategoriesList.filter(function (_) { return _.Selected; }).forEach(function (p) { SelectedCategories = SelectedCategories + "," + "'" + p.Name + "'"; });
						}
						else
						{
							this.ProductCategoriesList.filter(function (_) { return _.Selected; }).forEach(function (p) { SelectedCategories = SelectedCategories + "," + "'" + p.Name + "'"; });
						}*/
						if ($('input[name="Category_Check"]:checked').length != 0) {
							$('input[name="Category_Check"]:checked').each(function () {
								if (count == 0)
									SelectedCategories = "'" + this.value + "'";
								else
									SelectedCategories += ",'" + this.value + "'";
								count = count + 1;
							});
						}
						else
							SelectedCategories = "''";

						this._http.get(this.systemUrl + '?act=getProductSubCategoriesList&ParentCategory=' + SelectedCategories + '&q=' + new Date().getTime(), options)
							.map(function (res) { return res.json(); })
							.subscribe(function (data) { return _this.ProductSubCategoriesList = data }, function (err) { return _this.logError(err); }, function () { });
					}

				};

				__decorate([
					core_1.Output(),
					__metadata('design:type', core_1.EventEmitter)
				], SearchComponent.prototype, "success", void 0);
				SearchComponent = __decorate([
					core_1.Component({
						selector: 'SearchSection',
						templateUrl: searchHtmlPage
					}),
					__metadata('design:paramtypes', [router_1.RouteParams, http_1.Http, router_1.Location])
				], SearchComponent);
				return SearchComponent;
			}());
			exports_1("SearchComponent", SearchComponent);
		}
	}
});


