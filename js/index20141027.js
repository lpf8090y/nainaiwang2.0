///<reference path="http://pub.prcsteel.com/Js/jquery-1.7.2.min.js"  />

$(function () {
    $("#frmupload").attr("src", "Upload.aspx");
    /*登录*/
    if ($("#UserID").val() == "") {
        $.fn.gtxhLogin({
            callback: function (result) {
                Logined(result);
            }
        });
    }

    // 点击行跳转
    $(".tab_bodyMain tr").live("click", function (e) {
        var isStore = $(this).attr("store");
        if (isStore == "1") {
            window.open("http://market.prcsteel.com/brandlist.html#sortId="
            + $(this).attr("sortId") + "&nsortId=" + $(this).attr("nsortId") + "&storeId=" + $(this).attr("storeId"));
        }
        else {
            window.open("http://market.prcsteel.com/marketlist.html#companyName=" + encodeURI($(this).attr("company")) + "&sellerHostTel=" + $(this).attr("tel"));
        }
    });

    if ($(".row2_bidding table tbody tr").size() == 0) {
        $(".row_tit_auction").mouseover();
    }

    //钢材分类
    $(".search_left ul li").mouseover(function () {
        $(this).addClass("current").siblings().removeClass("current");
        $("#hot_kind").show();
        $("#hot_kind7").hide();
        $(".search_kind7").removeClass("current7");
        var sel = $(this).find("p").attr("sel");
        $("." + sel).show().siblings().hide();
        if (!$(this).hasClass("search_kindh")) {
            var selSortId = $(this).attr("sortid");
            var selSortName = $(this).attr("sortname");
            ClearData();
            $("#txt_nsort").attr("sortid", selSortId).attr("sortname", selSortName);
            $("#showLayer_nsortName,#showLayer_material,#showLayer_standard").hide();
            //$("#resourceMsg").text("请输入品名、规格、材质");
            GetNsortBySortId(selSortId, $("#showLayer_nsortName"));
        }

    });

    // 根据大类ID获取对应的品名
    function GetNsortBySortId(sortid, box) {
        $.post("ajax/IndexHandler.ashx", { Action: "nsortList", SortID: sortid }, function (re) {
            if (re) {
                $(box).empty();

                var total = $(re)[0].Total;
                var classInfo = $(re)[0].Data[0].classInfo;

                var tmp = "<div name='nsort' class='product-con'>";
                // 标签
                for (var i = 0; i < $(classInfo).size(); i++) {
                    tmp += "<dl>";
                    var class_tmp = $(classInfo)[i];
                    tmp += "<dt cid='" + class_tmp.classID + "'>" + class_tmp.className + "</dt>";

                    // 品名
                    tmp += "<dd>";
                    for (var j = 0; j < $(class_tmp.nsort).size(); j++) {
                        var nsort_tmp = class_tmp.nsort[j];
                        tmp += "<span><a href='javascript:' nsortid='" + nsort_tmp.nsortID + "'>" + nsort_tmp.nsortName + "</a></span>";
                    }
                    tmp += "</dd>";

                    tmp += "</dl>";
                }

                tmp += "</div>";

                $(box).append(tmp);
            }
            else {
                alert("抱歉，品名获取失败！");
            }
        });
    }

    // 根据品名，规格获取对应的材质
    function GetMaterialsBySortId(nsortid, box) {
        $.post("ajax/IndexHandler.ashx", { Action: "materialsList", NsortID: nsortid }, function (re) {
            if (re) {
                $(box).empty();

                var total = re.Total;
                if (total == 0) {
                    var tmp = "<span>抱歉，无对应的材质！</span>";
                    $(box).append(tmp);
                    return;
                }
                var jsonData = re.Data;

                for (var i = 0; i < total; i++) {
                    var tmp = "<li><a href='javascript:'>" + jsonData[i].material + "</a></li>";
                    $(box).append(tmp);
                }
            }
            else {
                alert("抱歉，材质获取失败！");
            }
        });
    }

    // 根据品名ID获取对应的规格
    function GetSpecBySortId(nsortid, material, box) {
        $.post("ajax/IndexHandler.ashx", { Action: "specList", NsortID: nsortid, material: material }, function (re) {
            if (re) {
                $(box).empty();

                var total = re.Total;
                if (total == 0) {
                    var tmp = "<span>抱歉，无对应的规格！</span>";
                    $(box).append(tmp);
                    return;
                }

                var arrjson = re.Data;
                var pageSize = 12;
                var pageSize2 = pageSize / 2;

                var sel_tab = "";   // spec选择tab
                var sel_content = "";   // spec选择内容

                sel_tab += "<div class='sort sort-standard' id='spec_tab' >";
                sel_tab += "<ul>";

                var areaCount = total % pageSize == 0 ? total / pageSize : parseInt((total / pageSize) + 1, 10); // 总tab数
                var allrow = total % pageSize2 == 0 ? total / pageSize2 : parseInt((total / pageSize2) + 1, 10); // 总行数
                var currentrow = 0; // 当前行数
                for (var j = 0; j < areaCount; j++) {
                    var boxid = "sepcbox" + j;
                    var hideCode = "";
                    var hover = "hover";
                    if (j > 0) {
                        hideCode = "style='display:none;'";
                        hover = "";
                    }
                    var startIndex = pageSize * j;
                    var endIndex = areaCount - j == 1 ? total - 1 : pageSize * (j + 1) - 1;
                    sel_tab += "<li id='sepc" + j + "' boxid='" + boxid + "' class='" + hover + "'><a href='javascript:'>" + arrjson[startIndex].spec + "~" + arrjson[endIndex].spec + "</a></li>";

                    sel_content += "<div class='product-con standard-con' id='" + boxid + "' " + hideCode + ">";

                    var count = endIndex - startIndex + 1; // 规格显示的数据数量，最多为 pageSize数量（12）
                    for (var i = 0; i < count; i++) {
                        if (i % pageSize2 == 0) {
                            currentrow++;
                            var eIndex = allrow - currentrow > 0 ? pageSize2 - 1 : total % pageSize2 - 1;   // 获取当前行最后一个的值
                            sel_content += "<dl>";
                            sel_content += "<dt select='false'>" + arrjson[startIndex + i].spec + "~" + arrjson[startIndex + i + eIndex].spec + "</dt>";
                            sel_content += "<dd>";
                        }

                        sel_content += "<span><a href='javascript:'>" + arrjson[startIndex + i].spec + "</a></span>";

                        // 如果i=6，12，就先结束上一个标签
                        if (i > 0 && i % pageSize2 == 5) {
                            sel_content += "</dd>";
                            sel_content += "</dl>";
                        }
                    }

                    sel_content += "</div>";
                }

                sel_tab += "</ul>";
                sel_tab += "<a class='close' href='javascript:;'></a>";
                sel_tab += "</div>";

                $(box).append(sel_tab);
                $(box).append(sel_content);

                // 清除，确定
                var opt_bar = "<div class='btn-bar'>";
                opt_bar += "<button type='button' id='btn_specClear' class='clear'>清除</button>";
                opt_bar += "<button type='button' id='btn_specDefine'>确认</button>";
                opt_bar += "</div>";

                $(box).append(opt_bar);
            }
            else {
                alert("抱歉，规格获取失败！");
            }
        });
    }

    // 清除数据
    function ClearData() {
        $("#txt_nsort").val("").attr("nsortid", "0");
        $("#txt_spec").val("");
        $("#txt_material").val("");
        $("#showLayer_nsortName,#showLayer_material,#showLayer_standard").hide();

        $("#txt_Buy_Sort").val("");
        $("#txt_Buy_Nsort").val("");
        $("#txt_Buy_Address").val("");
        $("#txt_Buy_Spec").val("");
        $("#txt_buy_Material").val("");
        $("#txt_Buy_Phone").val("");
        $("#fileUrl").val("");
        $("#pulldown_hnsort").empty();
        $("#txtbox_hnsort #buy_NsortList2").empty().append("<span>请先选择大类</span>");
    }

    // 默认加载板类
    GetNsortBySortId(2394, $("#showLayer_nsortName"));

    var isClick = false;
    $(document).click(function () {
        if (isClick == false) {
            $("#showLayer_nsortName,#showLayer_material,#showLayer_standard,.pulldown").hide();
        }
    });

    $("#showLayer_nsortName,#showLayer_material,#showLayer_standard,.pulldown").click(function (event) {
        isClick = true;
        var st = setTimeout(function () {
            isClick = false;
            clearTimeout(st);
        }, 100);
    });

    // 点击所有分类显示选择框
    $(".allClass").live("click", function (event) {
        var selId = $(this).attr("selId");
        $("#" + selId).click();

        event.stopPropagation();
    });

    // 通过键盘选择
    $("#txt_nsort,#txt_spec,#txt_material").keydown(function (event) {
        SelectOptions(event.keyCode, $(this), $(this).next());

        //return false;
        //event.stopPropagation();
    });

    var currentLine = -1;
    function SelectOptions(keyCode, setElement, selElement) {
        switch (keyCode) {
            case 13: //确定
                var currentVal = $(selElement).find(".current");
                $(currentVal).click();
                break;
            case 38: //向上键
                currentLine--;
                changeItem(selElement);
                break;
            case 40: //向下键
                currentLine++;
                changeItem(selElement);
                break;
            default:
                break;
        }
    }

    function changeItem(selElement) {
        if (currentLine < 0) {
            currentLine = 0;
        }
        var maxIndex = $(selElement).children("li").size();
        if (currentLine >= maxIndex) {
            currentLine = maxIndex - 1;
        }
        $(selElement).children("li").eq(currentLine).addClass("current").siblings().removeClass("current");
    }

    //-----------------品名---------------// 
    // 品名选择框 显示隐藏  
    $(".search_rightt #txt_nsort").click(function (event) {
        $(".pulldown,.caizhi-layer,.show-layer").hide();
        $("#showLayer_nsortName").show();

        event.stopPropagation();
    });
    $("#showLayer_nsortName .close").click(function () {
        $("#showLayer_nsortName").hide();
    });
    // 根据用户输入的品名获取相关的品名显示在下拉框中
    $(".search_rightt #txt_nsort").keyup(function (event) {
        if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13) {
            return;
        }
        else {
            currentLine = -1;
        }

        var searchNsort = $.trim($(this).val());
        if (searchNsort == "") {
            $("#txt_nsort").val("").click();
            ClearData();
            return;
        }

        var selSortId = $(this).attr("sortid");
        SearchNsort(selSortId, searchNsort, "txt_nsort", "pulldown_nsort");
        $("#showLayer_nsortName").hide();
        $("#pulldown_nsort").show();
    });

    // 获取品名选择框的值
    $("#showLayer_nsortName a").live("click", function () {
        SetNsortVal($(this));
        $("#showLayer_nsortName").hide();
    });
    // 获取品名下拉框 的值
    $("#pulldown_nsort li").live("click", function () {
        if ($(this).hasClass("allClass")) {
            $("#txt_nsort").click();
            return;
        }
        SetNsortVal($(this));
        $("#showLayer_nsortName").hide();
    });

    // 根据关键词搜索
    function SearchNsort(sortID, searchKey, triggerElement, triggerBox) {
        $.post("ajax/IndexHandler.ashx", { "Action": "searchNsort", SortID: sortID, searchKey: searchKey }, function (re) {
            if (re) {
                $("#" + triggerBox).empty();

                var json = re;
                if (json.ErrorCode == 0) {

                    var total = json.Total;
                    if (total == 0) {
                        $("#" + triggerBox).append("<li>没有找到相关品名</li>");
                    }
                    else {
                        var jsonData = $(json)[0].Data;
                        jsonData = eval('(' + jsonData + ')');

                        for (var i = 0; i < total; i++) {
                            var tmp = "<li nsortid='" + jsonData[i].NSortID + "'>" + ProcessStr(searchKey, jsonData[i].NSortName) + "</li>";
                            $("#" + triggerBox).append(tmp);
                        }
                    }
                }

                var selSortName = $("#" + triggerElement).attr("sortname");
                $("#" + triggerBox).append("<li class='allClass' selId='" + triggerElement + "'><b>" + selSortName + "</b> 所有分类</li>");
            }
        });
    }

    // 处理字符串，用户输入的改变样式
    function ProcessStr(input, str) {
        input = input.toUpperCase();
        var index = str.indexOf(input);
        if (index > -1) {
            var result = "";
            var tmp1 = str.substr(0, index);
            var tmp2 = "<span class='font_orange'>" + input + "</span>";
            var tmp3 = str.substr(index + input.length, str.length - input.length - index);
            result = tmp1 + tmp2 + tmp3;
            return result;
        }
        else {
            return str;
        }
    }

    // 设置品名值
    function SetNsortVal(clickElement) {
        var nsortid = $(clickElement).attr("nsortid");
        $("#txt_nsort").val($(clickElement).text()).attr("nsortid", nsortid);
        $(".pulldown").hide();

        $("#txt_spec").val("");
        $("#txt_material").val("");

        GetMaterialsBySortId(nsortid, $("#showLayer_material ul"));
        $("#showLayer_material").show();
        var material = $.trim($("#txt_spec").val());
        GetSpecBySortId(nsortid, material, $("#showLayer_standard"));
    }

    //-----------------规格---------------// 
    // 规格选择框 显示隐藏
    $(".search_rightt #txt_spec").click(function (event) {
        $(".pulldown,.caizhi-layer,.show-layer").hide();

        var nsortId = $("#txt_nsort").attr("nsortid");
        if (nsortId == "" || nsortId == "0") {
            $("#showLayer_nsortName").show();
        }
        else {
            $("#showLayer_standard").show();
        }
        event.stopPropagation();
    });

    // 隐藏规格浮层
    $("#showLayer_standard .close,#showLayer_material .close").live("click", function () {
        $("#showLayer_standard,#showLayer_material").hide();
    });

    // 切换规格选择tab
    $("#spec_tab li").live("click", function () {
        $(this).addClass("hover").siblings().removeClass("hover");
        var boxid = $(this).attr("boxid");
        $(".product-con").hide();
        $("#" + boxid).show();
    });

    // 选择规格
    $("#showLayer_standard dl span a").live("click", function () {
        $(this).toggleClass("select");
    });

    // 选择一排
    $("#showLayer_standard dl dt").live("click", function () {
        var spec_sel = $(this).attr("select");
        if (spec_sel == "true") {
            $(this).siblings().find("a").removeClass("select");
            spec_sel = "false";
        }
        else {
            $(this).siblings().find("a").addClass("select");
            spec_sel = "true";
        }
        $(this).attr("select", spec_sel);
    });

    // 清除选择规格
    $("#btn_specClear").live("click", function () {
        $("#showLayer_standard dl dd a").removeClass("select");
        SetSpecVal();
    });
    // 确认选择规格
    $("#btn_specDefine").live("click", function () {
        $("#showLayer_standard").hide();
        SetSpecVal();
    });

    //下拉框 显示隐藏
    $(".search_rightt #txt_spec").keyup(function () {
        if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13) {
            return;
        }
        else {
            currentLine = -1;
        }

        var selNsortId = $("#txt_nsort").attr("nsortid");
        var searchSpec = $.trim($(this).val());
        if (searchSpec == "") {
            $("#txt_spec").val("").click();
            GetMaterialsBySortId(selNsortId, $("#showLayer_material ul"));
            return;
        }

        var material = $.trim($("#txt_material").val());
        $.post("ajax/IndexHandler.ashx", { Action: "searchSpec", NsortID: selNsortId, searchKey: searchSpec, material: material }, function (re) {
            if (re) {
                $("#pulldown_spec").empty();

                var json = re;
                if (json.ErrorCode == 0) {
                    var total = json.Total;
                    if (total == 0) {
                        $("#pulldown_spec").append("<li>没有找到相关规格</li>");
                    }
                    else {
                        var jsonData = $(json)[0].Data;
                        jsonData = eval('(' + jsonData + ')');

                        for (var i = 0; i < total; i++) {
                            var tmp = "<li>" + ProcessStr(searchSpec, jsonData[i].spec) + "</li>";
                            $("#pulldown_spec").append(tmp);
                        }
                    }
                }
            }
        });

        $("#showLayer_standard").hide();
        $("#pulldown_spec").show();
    });
    //获取下拉框 的值
    $("#pulldown_spec li").live("click", function () {
        if ($(this).hasClass("allClass")) {
            $("#txt_spec").click();
            return;
        }
        var spec = $.trim($(this).text());
        if (spec != "没有找到相关规格") {
            $("#txt_spec").val(spec);
        }
        $(".pulldown").hide();
        $(".show-layer,.caizhi-layer").hide();
    });

    // 设置规格值
    function SetSpecVal() {
        var specVal = "";
        $("#showLayer_standard dl dd a[class='select']").each(function () {
            specVal += $.trim($(this).text()) + ",";
        });
        specVal = specVal.substring(0, specVal.length - 1);

        $("#txt_spec").val(specVal);
        $(".pulldown").hide();
        $(".show-layer,.caizhi-layer").hide();
    }

    //-----------------材质---------------// 
    //选择框 显示隐藏
    $(".search_rightt #txt_material").click(function (event) {
        $(".pulldown,.caizhi-layer,.show-layer").hide();

        var nsortId = $("#txt_nsort").attr("nsortid");
        if (nsortId == "" || nsortId == "0") {
            $("#showLayer_nsortName").show();
        }
        else {
            $("#showLayer_material").show();
        }

        event.stopPropagation();
    });
    // 选择材质
    $("#showLayer_material ul li a").live("click", function () {
        $(this).toggleClass("select");
    });
    // 清除选择材质
    $("#btn_materialClear").click(function () {
        $("#showLayer_material ul li a").removeClass("select");
        SetMaterialVal();
    });
    // 确认选择材质
    $("#btn_materialDefine").click(function () {
        SetMaterialVal();
        $("#showLayer_material").hide();

        if ($("#showLayer_material li a[class='select']").size() > 0) {
            $("#showLayer_standard").show();
        }
    });

    //下拉框 显示隐藏	
    $(".search_rightt #txt_material").keyup(function () {
        if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13) {
            return;
        }
        else {
            currentLine = -1;
        }

        var searchMaterial = $.trim($(this).val());
        if (searchMaterial == "") {
            $("#txt_material").val("").click();
            return;
        }

        var selNsortId = $("#txt_nsort").attr("nsortid");
        $.post("ajax/IndexHandler.ashx", { Action: "searchMaterials", NsortID: selNsortId, searchKey: searchMaterial }, function (re) {
            if (re) {
                $("#pulldown_material").empty();

                var json = re;
                if (json.ErrorCode == 0) {
                    var total = json.Total;
                    if (total == 0) {
                        $("#pulldown_material").append("<li>没有找到相关材质</li>");
                    }
                    else {
                        var jsonData = $(json)[0].Data;
                        jsonData = eval('(' + jsonData + ')');

                        for (var i = 0; i < total; i++) {
                            var tmp = "<li>" + ProcessStr(searchMaterial, jsonData[i].material) + "</li>";
                            $("#pulldown_material").append(tmp);
                        }
                    }
                }
            }
            else {
                alert("抱歉，材质获取失败！");
            }
        });

        $("#showLayer_material").hide();
        $("#pulldown_material").show();
    });

    //获取下拉框 的值
    $("#pulldown_material li").live("click", function () {
        if ($(this).hasClass("allClass")) {
            $("#txt_material").click();
            return;
        }

        var material = $.trim($(this).text());
        if (material != "没有找到相关材质") {
            $("#txt_material").val(material);
            if (material != "") {
                var nsortid = $("#txt_nsort").attr("nsortid");
                GetSpecBySortId(nsortid, material, $("#showLayer_standard"));
            }
            $("#txt_spec").val("");
            $("#showLayer_material").hide();
            $("#showLayer_standard").show();
        }
        $(".pulldown").hide();
    });

    // 设置材质值
    function SetMaterialVal() {
        var material = "";
        $("#showLayer_material li a[class='select']").each(function () {
            material += $.trim($(this).text()) + ",";
        });
        material = material.substring(0, material.length - 1);

        $("#txt_material").val(material);
        $("#txt_spec").val("");
        $(".pulldown").hide();

        if (material != "") {
            var nsortid = $("#txt_nsort").attr("nsortid");
            GetSpecBySortId(nsortid, material, $("#showLayer_standard"));
        }
    }

    //搜索
    $("#btn_search").click(function () {
        var sortid = $(".search_left ul .current").attr("sortid");
        var nsortid = $("#txt_nsort").attr("nsortid");
        var spec = $.trim($("#txt_spec").val());
        var material = $.trim($("#txt_material").val());
        if (sortid == "" || nsortid == "")
            return;

        var openUrl = "http://market.prcsteel.com/#sortId=" + sortid + "&nsortId=" + nsortid + "&spec1=" + spec + "&material=" + material;
        window.open(openUrl);
    });

    //------------------------帮我找--------------------//
    $(".search_left .search_kindh ").live('click', function () {
        $(".search_kind7").addClass("current7");
        $(".search_left ul li").removeClass("current");
        $("#hot_kind").hide();
        $("#hot_kind7").show();
    });
    $("#hot_kind7").mouseover(function () {
        $(".search_kind7").addClass("current7");
        $(".search_left ul li").removeClass("current");
        $("#hot_kind").hide();
        $("#hot_kind7").show();
    });
    //填写，上传
    $("#nav_kindH1").mouseover(function () {
        $(this).addClass("current").siblings().removeClass("current");
        $(".kind_fillin").show();
        $(".kind_up").hide();
    });
    $("#nav_kindH2").mouseover(function () {
        $(this).addClass("current").siblings().removeClass("current");
        $(".kind_fillin").hide();
        $(".kind_up").show();
    });
    $("#btn_submit").click(function () {
        $("#buy_phone_msg").text("").hide();

        var buy_Sort = $("#txt_Buy_Sort").attr("sortid");
        var buy_Nsort = $("#txt_Buy_Nsort").attr("nsortid");
        var buy_Address = $.trim($("#txt_Buy_Address").val());
        var buy_Spec = $.trim($("#txt_Buy_Spec").val());
        var buy_Material = $.trim($("#txt_buy_Material").val());
        var buy_role = $("input[name='rad_buy_role']:checked").val();
        var buy_Phone = $.trim($("#txt_Buy_Phone").val());
        if (buy_Phone == "") {
            $("#buy_phone_msg").text("请输入电话号码！").show();
            return;
        }
        var regMobile = new RegExp("(^1[3,5,7,8][0-9]{9}$)");
        var regPhone = /^[0-9]{3,4}-?[0-9]{7,8}$/;
        if (regMobile.test(buy_Phone) || regPhone.test(buy_Phone)) {
            $("#buy_phone_msg").text("");
        }
        else {
            $("#buy_phone_msg").text("请输入正确的联系电话！").show();
            return;
        }

        var buy_fileUrl = $("#fileUrl").val();
        $.post("ajax/IndexHandler.ashx",
        { Action: "stock", Sort: buy_Sort, Nsort: buy_Nsort, Address: buy_Address, Spec: buy_Spec, Material: buy_Material, Role: buy_role, Phone: buy_Phone, FileUrl: buy_fileUrl },
        function (re) {
            if (re == "ok") {
                alert("提交成功，我们会尽快与你联系，请保持电话畅通！");
                $("#txt_Buy_Sort").val("");
                $("#txt_Buy_Nsort").val("");
                $("#txt_Buy_Address").val("");
                $("#txt_Buy_Spec").val("");
                $("#txt_buy_Material").val("");
                $("#txt_Buy_Phone").val("");
                $("input[name='rad_buy_role']").eq(0).attr("checked", true);
                $(".up_ok,.up_error").hide();
            }
            else {
                alert("抱歉，提交失败！");
            }
        });
    });

    //----大类----//
    //选择框 显示隐藏
    $("#txt_Buy_Sort").click(function (event) {
        $("#showLayer_nsortName,#showLayer_material,#showLayer_standard").hide();
        $("#txtbox_class").show();
        $("#txt_Buy_Nsort").attr("sortname", $(this).val());

        event.stopPropagation();
    });
    $("#txtbox_class .txtbox_close").click(function () {
        $("#txtbox_class").hide();
    });
    //下拉框 显示隐藏	
    $("#txt_Buy_Nsort").keyup(function () {
        var searchNsort = $.trim($(this).val());
        if (searchNsort == "") {
            $("#txt_Buy_Nsort").val("").click();
            return;
        }

        var selSortId = $("#txt_Buy_Sort").attr("sortid");
        SearchNsort(selSortId, searchNsort, "txt_Buy_Nsort", "pulldown_hnsort");

        $("#txtbox_class").hide();
        $("#pulldown_class").show();
    });
    //获取选择框 的值
    $("#txtbox_class .txtbox_num a").click(function () {
        var selSortId = $(this).attr("sortId");
        $("#txt_Buy_Sort").val($(this).text()).attr("sortId", selSortId);
        $("#txtbox_class").hide();

        GetNsortBySortId(selSortId, $("#buy_NsortList"));
    });
    //获取下拉框 的值
    $("#pulldown_class li").click(function () {
        $("#txt_Buy_Sort").val($(this).text());
        $("#pulldown_class").hide();
    });
    //----品名----//
    //选择框 显示隐藏
    $("#txt_Buy_Nsort").click(function (event) {
        $("#showLayer_nsortName,#showLayer_material,#showLayer_standard").hide();
        $("#txtbox_hnsort").show();
        $("#pulldown_hnsort").hide();

        event.stopPropagation();
    });
    $("#txtbox_hnsort .txtbox_close").click(function () {
        $("#txtbox_hnsort").hide();
    });
    //下拉框 显示隐藏	
    $(".txt_hnsort").keydown(function () {
        $("#txtbox_hnsort").hide();
        $("#pulldown_hnsort").show();
    });
    //获取选择框 的值
    $("#txtbox_hnsort .txtbox_num a").live("click", function () {
        var selNsortId = $(this).attr("nsortid");
        $("#txt_Buy_Nsort").val($(this).text()).attr("nsortId", selNsortId);
        $("#txtbox_hnsort").hide();
    });
    //获取下拉狂 的值
    $("#pulldown_hnsort li").live("click", function () {
        $(".txt_hnsort").val($(this).text());
        $("#pulldown_hnsort").hide();

    });

    //左侧二维码
    $(".codeleft_close").click(function () {
        $(this).closest(".mainCode_left").hide(200);
    });

    //右侧二维码
    $(".online_div2").mouseover(function () {
        $(".right_code").show();
    });
    $(".online_div2").mouseleave(function () {
        $(".right_code").hide();
    });
    //在线客服链接
    $(".online_div1").click(function () {
        javascript: window.open('#', 'newwindow', 'height=520, width=778, top=100, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
    });

    //**最新成交 开始**// 
    if ($("#clinch_con div").size() > 6) {
        var onScroll = false;
        setInterval(function () {
            if (onScroll) return;
            var t = $("#clinch_con div:first");
            t.animate({ marginTop: '-17' }, function () {
                t.appendTo("#clinch_con").css("margin-top", "0");
                t = null;
            });
        }, 4000);
        $("#clinch_con div").hover(function () { onScroll = true; }, function () { onScroll = false; });
    }

    // 最新成交弹出层
    $("#clinch_con div").mouseover(function () {
        var X = $(this).offset().top;
        var Y = $("#clinch_con").offset().top;
        $("#clinch_con_tips").empty();
        $("#clinch_con_tips").append("<span class='bot'></span><span class='top'></span>");
        $("#clinch_con_tips").append("<table width='100%' border='0' cellspacing='0' cellpadding='0'>" + $(this).find("table").html() + "</table>");
        $("#clinch_con_tips").show();
        $("#clinch_con_tips").css({ top: X - Y + 100 }); //145
    });
    $("#clinch_con div").mouseleave(function () {
        $("#clinch_con_tips").hide();
    });

    //**最新成交 结束**// 

    //**研究中心选项卡 开始**//
    $(".row4_research #row4_menu1").mouseover(function () {
        $(".row4_research #row4_menu1").addClass("current");
        $(".row4_research #row4_menu2").removeClass("current");
        $(".row4_list2 .list2_menu2").hide();
        $(".row4_list2 .list2_menu1").show();
        $("#row4_more").attr("href", "http://news.prcsteel.com/tongjihuizong.html");
    });
    $(".row4_research #row4_menu2").mouseover(function () {
        $(".row4_research #row4_menu2").addClass("current");
        $(".row4_research #row4_menu1").removeClass("current");
        $(".row4_list2 .list2_menu1").hide();
        $(".row4_list2 .list2_menu2").show();
        $("#row4_more").attr("href", "http://news.prcsteel.com/gangchangtiaojia.html");
    });
    //**研究中心选项卡 结束**

    //**精彩活动 开始**//
    $("#row4_list3_cur").css("font-weight", "bolder");
    $("#row4_list3_cur").css("color", "#000000");
    $(".row4_list3_link").mouseover(function () {
        $(".row4_list3_img").hide();
        $(".links").css("font-weight", "lighter");
        $(".links").css("color", "#717171");
        $(this).next().show();
        $(this).find(".links").css("font-weight", "bolder");
        $(this).find(".links").css("color", "#000000");
    });
    //**精彩活动 结束**//

    //数据标题随着滚轴滚动
    $(window).scroll(function () {
        scoll();
    });

});


function Logined(result) {
    var src = "UnifyIdentityValidate.aspx?iv=" + result + "&action=iframe";
    $.get(src, function (data) {
        if (data != 'no' && data != '无效凭据') {
            var info = data.split('_');
            $("#UserID").attr("title", info[0]);
            $("#UserID").val(info[1]);
        }
    });
}

//用于iframe文件上传,获取上传文件的路径
function SetUrl(url) {
    if (url == "文件上传失败！" || url == "") {
        alert("抱歉，上传失败，请上传小于2M的Excel、Word和图片文件！");
        $(".up_error").show();
    }
    else {
        $(".up_ok").show();
        $("#fileUrl").val(url);
    }
    top.frames['frmupload'].location = "/Upload.aspx?furl=" + url;
}
//**左侧内容 右侧楼层 滚动 开始**//
function scoll() {
    var banner1 = $("#index_banner1").offset().top;
    var banner2 = $("#index_banner2").offset().top;
    var banner3 = $("#index_banner3").offset().top;
    var banner4 = $("#index_banner4").offset().top;
    var banner5 = $("#index_banner5").offset().top;
    var banner6 = $("#index_banner6").offset().top;

    var scoll_top = $(document).scrollTop();
    var dw = ($(document).width() - 1024) / 2 + 1024;
    var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;


    if (scoll_top > banner1 && scoll_top < banner2) {
        if (isIE6) { $(".mainRow2_right").css({ position: "absolute" }); }
        else { $(".mainRow2_right").css({ position: "fixed", top: 50, left: dw }); }
        $(".mainRow2_right_middle ul li a").removeClass("mainRow2_right_cur");
        $("#line1").addClass("mainRow2_right_cur");
    }
    else if (scoll_top < banner3 && scoll_top > banner2 || scoll_top == banner2) {
        if (isIE6) { $(".mainRow2_right").css({ position: "absolute" }); }
        else { $(".mainRow2_right").css({ position: "fixed", top: 50, left: dw }); }
        $(".mainRow2_right_middle ul li a").removeClass("mainRow2_right_cur");
        $("#line2").addClass("mainRow2_right_cur");
    }
    else if (scoll_top < banner4 && scoll_top > banner3 || scoll_top == banner3) {
        if (isIE6) { $(".mainRow2_right").css({ position: "absolute" }); }
        else { $(".mainRow2_right").css({ position: "fixed", top: 50, left: dw }); }
        $(".mainRow2_right_middle ul li a").removeClass("mainRow2_right_cur");
        $("#line3").addClass("mainRow2_right_cur");
    }
    else if (scoll_top < banner5 && scoll_top > banner4 || scoll_top == banner4) {
        if (isIE6) { $(".mainRow2_right").css({ position: "absolute" }); }
        else { $(".mainRow2_right").css({ position: "fixed", top: 50, left: dw }); }
        $(".mainRow2_right_middle ul li a").removeClass("mainRow2_right_cur");
        $("#line4").addClass("mainRow2_right_cur");
    }
    else if (scoll_top < banner6 && scoll_top > banner5 || scoll_top == banner5) {
        if (isIE6) { $(".mainRow2_right").css({ position: "absolute" }); }
        else { $(".mainRow2_right").css({ position: "fixed", top: 50, left: dw }); }
        $(".mainRow2_right_middle ul li a").removeClass("mainRow2_right_cur");
        $("#line5").addClass("mainRow2_right_cur");
    }
    else if (scoll_top > banner6 || scoll_top == banner6) {
        if (isIE6) { $(".mainRow2_right").css({ position: "absolute" }); }
        else { $(".mainRow2_right").css({ position: "fixed", top: 50, left: dw }); }
        $(".mainRow2_right_middle ul li a").removeClass("mainRow2_right_cur");
        $("#line6").addClass("mainRow2_right_cur");
    }
    else if (scoll_top < banner1) {
        $(".mainRow2_right").css({ position: "absolute", top: -400, left: 1014 });
        $(".mainRow2_right_middle ul li a").removeClass("mainRow2_right_cur");
        $("#line1").addClass("mainRow2_right_cur");
    }
    else {
        if (scoll_top == banner1) {
            $(".mainRow2_right").css({ position: "fixed", top: 50, left: dw });
            $(".mainRow2_right_middle ul li a").removeClass("mainRow2_right_cur");
            $("#line1").addClass("mainRow2_right_cur");
        }
    }
}
//**左侧内容 右侧楼层 滚动 结束**//
