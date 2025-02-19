$(function(){

  const _html = $('html');
  const _body = $('body');
  const _window = $(window);

  const wwSlim = 400;
  const wwMedium = 800;
  const wwNormal = 1008;  //此值以上是電腦
  const wwMaximum = 1200;

  const _webHeader = $('.webHeader');
  const _menu = _webHeader.find('.menu');
  const _sidebar = $('.sidebar');
  const _sidebarCtrl = $('.sidebarCtrl');

  var ww = _window.width();
  var wwNew = ww;
  var wh = _window.innerHeight();
  var hh = _webHeader.innerHeight();

  const _goTop = $('.goTop');
  const _goCenter = $('.goCenter');

  _html.removeClass('no-js');


  // --------------------------------------------------------------- //
  //  外掛套件 slick 參數設定

  // 首頁：大圖輪播 
  // --------------------------------------------------------------- //
  const _bigBanner = $('.bigBanner');
  _bigBanner.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    speed: 800,
    autoplay: true,
    arrows: true,
    fade: false,
    infinite: true,
    dots:true,
    prevArrow:'<button type="button" class="slick-prev" aria-label="上一張"></button>',
    nextArrow:'<button type="button" class="slick-next" aria-label="下一張"></button>'
  });

  // 計算大圖輪播張數
  var _bbLi = _bigBanner.find('.slick-dots').children('li');
  const bbCount = _bbLi.length;
  _bigBanner.find('.slick-dots').attr('data-total', bbCount);

  // 將 .slick-dots 中的 <button> 以 <span> 取代，以免取得焦點
  _bbLi.children('button').wrapInner('<span></span>');
  _bbLi.find('span').unwrap();
  // --------------------------------------------------------------- //



  // 首頁：照片集 Photo Gallery
  // --------------------------------------------------------------- //
  const _photoFlow = $('.gallery').find('.photoFlow');
  _photoFlow.slick({
    mobileFirst:true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    speed: 600,
    autoplay: true,
    arrows: true,
    fade: false,
    infinite: true,
    dots:true,
    prevArrow:'<button type="button" class="slick-prev" aria-label="上一張"></button>',
    nextArrow:'<button type="button" class="slick-next" aria-label="下一張"></button>',
    // responsive: [
    //   {
    //     breakpoint: 1008,
    //     settings:{
    //       fade: true
    //     }
    //   }
    // ]
  })
  _photoFlow.find('.slick-next').before(_photoFlow.find('.slick-prev'));

  // 計算照片集輪播張數
  var _photoFlowDot = _photoFlow.find('.slick-dots').children('li');
  const pfCount = _photoFlowDot.length;
  _photoFlow.find('.slick-dots').attr('data-total', pfCount);

  // 移除 dots buttons
  // 將 .slick-dots 中的 <button> 以 <span> 取代，以免取得焦點
  _photoFlowDot.children('button').wrapInner('<span></span>');
  _photoFlowDot.find('span').unwrap();  
  // --------------------------------------------------------------- //





  // 首頁：廣告小圖輪播
  // --------------------------------------------------------------- //
  const _adBanners = $('.adBanners').find('.slickBox');
  _adBanners.slick({
    mobileFirst: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    speed: 600,
    autoplay: true,
    arrows: true,
    fade: false,
    infinite: true,
    dots:false,
    prevArrow:'<button type="button" class="slick-prev" aria-label="上一張"></button>',
    nextArrow:'<button type="button" class="slick-next" aria-label="下一張"></button>',
    responsive: [
      {
        breakpoint: 700,
        settings:{
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1008,
        settings:{
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1200,
        settings:{
          slidesToShow: 5
        }
      }
    ]
  });
  // --------------------------------------------------------------- //



  // 施工相片
  $('.imgSlick').find('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow:'<button type="button" class="slick-prev" aria-label="上一張"></button>',
    nextArrow:'<button type="button" class="slick-next" aria-label="下一張"></button>',

    fade: true,
    asNavFor: '.imgSlick .slider-nav'
  });
  $('.imgSlick').find('.slider-nav').slick({
    variableWidth: true,
    slidesToShow: 3,  
    slidesToScroll: 1,
    asNavFor: '.imgSlick .slider-for',
    centerPadding: 0,
    dots: false,
    prevArrow:'<button type="button" class="slick-prev" aria-label="上一張"></button>',
    nextArrow:'<button type="button" class="slick-next" aria-label="下一張"></button>',

    centerMode: true,
    focusOnSelect: true
  });

  //  slick 參數設定：結束
  // --------------------------------------------------------------- //









  // 計算照片張數
  var _countPhoto = $('.imgSlick').filter('.count');
  _countPhoto.each(function(){
    let _this = $(this);
    _this.prepend('<div class="photoCount"><span class="current" title="目前位置"></span><span class="total" title="總張數"></span></div>');
    let _photoCount = _this.find('.photoCount');
    let _current = _photoCount.find('.current');
    let _total = _photoCount.find('.total');
    let _countThis = _this.find('.slider-for');

    _total.text(_countThis.find('.slick-slide').length);
    _current.text( _countThis.find('.slick-current').index()+1);

    _this.find('.slick-arrow').click( function(){
      _current.text( _countThis.find('.slick-current').index()+1);
    })
  })
  






  // 行動版側欄
  // --------------------------------------------------------------- //

  // 製作側欄選單遮罩
  _body.append('<div class="sidebarMask"></div>');
  const _sidebarMask = $('.sidebarMask');
  
  // 找出_menu中有次選單的li 
  _menu.find('li').has('ul').addClass('hasChild').children('a').attr('role', 'button').attr('aria-expanded', false);
  
  // 複製「主選單」到行動版側欄
  _menu.clone().appendTo(_sidebar);  
  // 複製右上連結項目到行動版側欄
  $('.topNav').clone().appendTo(_sidebar);

  const _sidebarMenu = _sidebar.find('.menu');
  var _sbHasChildA = _sidebarMenu.find('.hasChild>a');


  // 行動版側欄，顯示／隱藏
  // ---------------------------------------------------- //
  
  // 隱藏側欄 function
  function hideSidebar(){
    _sidebar.removeClass('reveal');
    _sidebarCtrl.removeClass('closeIt').attr('aria-expanded', false);
    _sidebarMenu.find('.closeIt').removeClass('closeIt').find('ul:visible').hide();
    _sidebarMask.fadeOut(500, function(){
      _sidebar.removeAttr('style');
      _body.removeClass('noScroll');
    });
  }
  
  // 點擊漢堡圖示
  _sidebarCtrl.on('click' , function(){
    if (_sidebar.hasClass('reveal')) {
      hideSidebar();

    } else {
      _sidebar.css('top', _webHeader.innerHeight()).show(10, 
        function(){ 
          _sidebar.addClass('reveal');
        } 
      );
      _sidebarCtrl.addClass('closeIt').attr('aria-expanded', true);
      _sidebarMask.fadeIn(500);
      _body.addClass('noScroll');
    }
  })

  _sidebarCtrl.on('keydown', function(e){
    if( e.code == 'Tab' && !e.shiftKey && _sidebar.is(':visible')) {
      e.preventDefault();
      _sidebarMenu.children('ul').children('li').first().children('a').trigger('focus');
    }
  })

  // 點擊遮罩，隱藏側欄
  _sidebarMask.on( 'click', hideSidebar );



  // 找側欄最後一個可取得焦點的元件
  const _sidebarLastFocusableEle = _sidebar.children().last().find('a').last();
  _sidebarLastFocusableEle.on('keydown', function(e){
    if ( e.code == 'Tab' && !e.shiftKey && $(this).is(':visible') && !$(this).hasClass('closeIt') ) {
      e.preventDefault();
      _sidebarCtrl.trigger('focus');
    }
  })

  // --------------------------------------------------------------- //



  // mobile 側欄「次選單」開合
  // --------------------------------------------------------------- //
  _sbHasChildA.on( 'click', function(e){
      e.preventDefault();

      let _this = $(this);
      let _subMenu = _this.next('ul');

      if (_subMenu.is(':hidden')) {
        _this.attr('aria-expanded', true);
        _this.parent().addClass('closeIt').siblings().removeClass('closeIt').find('ul:visible').slideUp().find('.closeIt').removeClass('closeIt');
        _subMenu.stop(true, false).slideDown();
      } else {
        _this.attr('aria-expanded', false).parent().removeClass('closeIt');
        _subMenu.find('.closeIt').removeClass('closeIt');
        _subMenu.stop(true, false).slideUp().find('ul:visible').stop(true, false).slideUp();
      }
    }
  )
  // --------------------------------------------------------------- //


  
  // 固定版頭 
  // --------------------------------------------------------------- //
  var fixHeadThreshold;
  var hh = _webHeader.innerHeight();
  ww >= wwNormal ? fixHeadThreshold =  hh :  fixHeadThreshold = 0;

  function fixHeader(){
    if (_window.scrollTop() > fixHeadThreshold ) {
      _webHeader.addClass('fixed')
      _body.offset( {top : hh})
    } 
    if(_window.scrollTop() <= 0 ) {
      _webHeader.removeClass('fixed');
      _body.offset( {top : 0})
    }
  }

  // 清除固定版頭時產生的 style 屬性
  function fxH_clearStyle() {
    _webHeader.removeAttr('style').removeClass('fixed');
    _body.removeAttr('style');
  }

  _window.on('scroll' ,  function(){
    fixHeader();

    // goTop 顯示、隱藏
    _window.scrollTop() > 300 ?  _goTop.addClass('show') : _goTop.removeClass('show');
  });
  _window.trigger('scroll');

  // --------------------------------------------------------------- //

















  

  // 寬版「主選單」
  // --------------------------------------------------------------- //
  var _topItem = _menu.children('ul').children('li'); // 第一層選單項
  var _hasChild = _menu.find('.hasChild');
  var _hasChildA = _hasChild.children('a');
  var liA = _menu.find('li>a');
  var _menuLastA = _topItem.last().find('a').last();
  var _menuFirstA = _topItem.first().children('a');

  // 滑鼠移入有次選單的 a
  _hasChildA.on('mouseenter focusin', function(){
    let _this = $(this);
    let _thisParentLi = _this.parent('li');
    let _thisSubMenu = _this.next('ul');

    _this.attr('aria-expanded', true);
    _thisParentLi.addClass('here'); // 為已展開的次選單上層li加樣式
    _thisSubMenu.stop(true, false).slideDown(300);

    // 判斷展開的次選單是否超過視窗右邊界
    if ( _thisSubMenu.offset().left + _thisSubMenu.outerWidth() > _window.width()) {
      if ( _thisParentLi.is(_topItem) ) {
        _thisSubMenu.css({ right:0, left: 'auto'});
      } else {
        _thisSubMenu.css({ right: _this.outerWidth(), left: 'auto'});
        _thisParentLi.addClass('turn'); // 讓箭頭轉向
      }
    }
  })

  // 滑鼠移出 li
  _hasChild.on( 'mouseleave blur', function(){
    $(this).removeClass('here turn').removeAttr('style').find('a').attr('aria-expanded', false).end().find('ul').removeAttr('style').find('li').removeClass('here turn');
  })

  // 滑鼠移入任何 a，包括沒有次選單的項目
  liA.on( 'mouseenter focusin', function() {
    $(this).parent('li').siblings().removeClass('here turn').find('a').attr('aria-expanded', false).end().find('ul').removeAttr('style').find('li').removeClass('here turn');
  })


  // 從最後一個 a 離開
  _menuLastA.on('keydown', function(e){
    if( e.code == 'Tab' && !e.shiftKey ) {
      hideAllSubMenu();
    }
  })
  // 從第一個 a 離開 _menuFirstA
  _menuFirstA.on('keydown', function(e){
    if( e.code == 'Tab' && e.shiftKey ) {
      hideAllSubMenu();
    }
  })

  function hideAllSubMenu() {
    _hasChild.removeClass('here turn').find('ul').removeAttr('style');
    _hasChildA.attr('aria-expanded', false);  
  }
  // --------------------------------------------------------------- //





  // 固定版頭 -----------------------------------------------------
  function fixHeader(){
    hh = _webHeader.innerHeight();
    if (_window.scrollTop() > hh ) {
      _webHeader.addClass('fixed').css('top', -1*hh);
      _body.offset( {top : hh})
    } 
    if(_window.scrollTop() == 0 ) {
      _webHeader.removeClass('fixed').css('top', 0);
      _body.offset( {top : 0})
    }
  }

  // 清除固定版頭時產生的 style 屬性
  function fxH_clearStyle() {
    _webHeader.removeAttr('style').removeClass('fixed');
    _body.removeAttr('style');
  }

  if (ww >= wwNormal) {
    _window.on('scroll.fixHeader' , fixHeader);
  } else {
    _window.off('.fixHeader');
    fxH_clearStyle();
  }


  let winResizeTimer0;
  _window.resize(function () {
    clearTimeout(winResizeTimer0);
    ww = _window.width();

    winResizeTimer = setTimeout(function () {
      if(ww >= wwNormal) {
        _sidebarMask.hide();
        _body.removeClass('noScroll');
        _sidebar.removeClass('reveal');
        _sidebarCtrl.removeClass('closeIt');

        // fix header on
        _window.on('scroll.fixHeader' , fixHeader);
      } else {
        _menu.hide().removeAttr('style');

        // fix header off
        _window.off('.fixHeader');
        fxH_clearStyle();
      }
    }, 200);
  });

  // --------------------------------------------------------------- //



  // 點擊 Go Top button 回到頁面頂端
  // --------------------------------------------------------------- //
  _goTop.on( 'click', function() {
    _html.stop(true,false).animate({scrollTop: 0}, 800, function(){
      _goCenter.trigger('focus');
    });
  });
  // --------------------------------------------------------------- //


  // 站內查詢區開合
  // --------------------------------------------------------------- //
  const _searchCtrl = $('.searchCtrl');
  const _search = $('.search');

  _searchCtrl.on( 'click', function(){
    _search.is(':visible') ? closeSearch() : openSearch();
  })

  // 按鍵盤 Alt+S 要開啟站內查詢區
  _body.on('keydown', function(e){
    if( e.code == 'KeyS' && e.altKey && _search.is(':hidden') ) {
      openSearch();
    }
  })

  // 在站內查詢區內按鍵盤 esc 要關閉站內查詢區
  _search.on('keydown', function(e){
    if( e.code == 'Escape' ) {
      closeSearch();
    }
  })

  // 焦點離開 _search 後隱藏 _search
  $('*').not(_searchCtrl).on( 'focus', function(){
    if( !$(this).parents().is(_search) && _search.is(':visible')){
      closeSearch();
    }
  })

  // 開啟站內查詢區 function
  function openSearch(){
    _search.slideDown(320, function(){
      _searchCtrl.addClass('closeIt').attr('aria-expanded', true);
      _search.find('input[type="text"]').trigger('focus');
    });
  }

  // 關閉站內查詢區 function
  function closeSearch(){
    _search.slideUp(320);
    _searchCtrl.removeClass('closeIt').attr('aria-expanded', false);
  }
  // --------------------------------------------------------------- //







  // fatfooter 開合 -----------------------------------------------------
  var _fatFootCtrl = $('.fatFootCtrl');
  var _footSiteTreeNav = $('.fatFooter').find('.siteTree');
  var _footSiteTree = $('.fatFooter').find('.siteTree>ul>li>ul');
  const text1 = _fatFootCtrl.text();
  const text2 = _fatFootCtrl.attr('data-altText');

  _fatFootCtrl.click(function(){
    if ( _footSiteTree.is(':visible')) {
      _footSiteTree.slideUp();
      _footSiteTreeNav.addClass('short');

      $(this).addClass('closed').text(text2);
    } else {
      _footSiteTree.slideDown();
      _footSiteTreeNav.removeClass('short');

      $(this).removeClass('closed').text(text1);
    }
  })




  // .flow1：寬版顯示３筆，平板顯示２筆，手機顯示１筆 ------------------------------
  
  // .flow2：寬版顯示兩筆完整，第三筆顯示局部 ------------------------------
  var _flow2 = $('.flow2');
  _flow2.each(function () {
    let _this = $(this);
    let _floxBox = _this.find('.flowBox');
    let _flowList = _floxBox.find('.flowList');
    let _flowItem = _flowList.children('li');
    let slideDistance = _flowItem.first().outerWidth(true);
    let slideCount = _flowItem.length;
    let _btnRight = _this.find('.diskBtn.next');
    let _btnLeft = _this.find('.diskBtn.prev');
    const speed = 600;
    const actClassName = 'active';
    let i = 0;
    let j;
    let _dots = '';

    // 產生 indicator
    _floxBox.append('<div class="flowNav"><ul></ul></div>');
    let _indicator = _this.find(".flowNav>ul");
    for (let n = 1; n <= slideCount; n++) {
      _dots = _dots + '<li>' + n +'</li>';
    }
    _indicator.append(_dots);
    let _indicatItem = _indicator.find('li');
    _indicatItem.eq(i).addClass(actClassName);

    // 依據可視的 slide 項目，決定 indicator 樣式
    indicatReady();
    function indicatReady() {
      _indicatItem.removeClass(actClassName);
      _indicatItem.eq(i).addClass(actClassName);
      if (ww < wwMedium ) {
        if ( slideCount > 1) {
          flownavShow();
        } else {
          flownavHide()
        }
      }
      if (ww >= wwNormal) {
        if (slideCount <= 2) {
          flownavHide();
        } else {
          flownavShow();
          _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
        }
      }
    }
    function flownavShow(){
      _indicator.add(_btnRight).add(_btnLeft).show();
    }
    function flownavHide(){
      _indicator.add(_btnRight).add(_btnLeft).hide();
    }


    function slideForward() {
      _flowList.stop(true, false).animate({ 
        'margin-left': -1 * slideDistance }, speed, function () {
          j = (i + 1) % slideCount;
          _flowItem.eq(i).appendTo(_flowList);
          _indicatItem.eq(i).removeClass(actClassName);
          _indicatItem.eq(j).addClass(actClassName);
          _flowList.css('margin-left', 0);

          // if (ww >= wwMedium) {
          //   _indicatItem.eq((j + 1) % slideCount).addClass(actClassName);
          // }
          if (ww >= wwNormal) {
            _indicatItem.eq((j + 1) % slideCount).addClass(actClassName);
            // _indicatItem.eq((j + 2) % slideCount).addClass(actClassName);
          }
          i = j;
        });
    }
    function slideBackward() {
      j = (i - 1) % slideCount;
      _flowItem.eq(j).prependTo(_flowList);
      _flowList.css('margin-left', -1 * slideDistance);

      _flowList.stop(true, false).animate({ 'margin-left': 0 }, speed, function () {
          _indicatItem.eq(j).addClass(actClassName);
          if (ww >= wwNormal) {
            // _indicatItem.eq(i).removeClass(actClassName);
            _indicatItem.eq((i + 1) % slideCount).removeClass(actClassName);
          // } else if (ww >= wwMedium) {
          //   _indicatItem.eq((i + 1) % slideCount).removeClass(actClassName);
          } else {
            _indicatItem.eq(i).removeClass(actClassName);
          }
          i = j;
        });
    }

    // 點擊向右箭頭
    _btnRight.click(function () { slideForward(); });

    // 點擊向左箭頭
    _btnLeft.click(function () { slideBackward(); });

    // touch and swipe 左右滑動
    _floxBox.swipe({
      swipeRight: function () {slideBackward();},
      swipeLeft: function () {slideForward();},
      threshold: 20,
    });

    // tab focus
    let tabCount = 0;
    _flowItem.children('a').focus(function (e) { 
      e.preventDefault();
      if ( tabCount > 0 && tabCount <= slideCount) {
        slideForward();
      }
      tabCount++
      if(tabCount > slideCount) {
        _btnLeft.focus();
        tabCount = 0;
      }
    });
    var winResizeTimer;
    _window.resize(function () {
      clearTimeout(winResizeTimer);
      winResizeTimer = setTimeout(function () {
        ww = _window.width();
        slideDistance = _flowItem.first().outerWidth(true);
        indicatReady();
      }, 200);
    });


  });

  
  
  // 點選左右箭頭滑動（非自動輪播） -----------------------------------------
  // .flow3：寬版顯示三筆，每筆等寬，第四筆顯示局部 -----------------------------------------
  var _flow3 = $('.flow3, .flow1');
  _flow3.each(function () {
    let _this = $(this);
    let _floxBox = _this.find('.flowBox');
    let _flowList = _floxBox.find('.flowList');
    let _flowItem = _flowList.children('li');
    let slideDistance = _flowItem.first().outerWidth(true);
    let slideCount = _flowItem.length;
    let _btnRight = _this.find('.diskBtn.next');
    let _btnLeft = _this.find('.diskBtn.prev');
    const speed = 600;
    const actClassName = 'active';
    let i = 0;
    let j;
    let _dots = '';

    // 產生 indicator
    _floxBox.append('<div class="flowNav"><ul></ul></div>');
    let _indicator = _this.find(".flowNav>ul");
    for (let n = 1; n <= slideCount; n++) {
      _dots = _dots + '<li>' + n +'</li>';
    }
    _indicator.append(_dots);
    let _indicatItem = _indicator.find('li');
    _indicatItem.eq(i).addClass(actClassName);

    // 依據可視的 slide 項目，決定 indicator 樣式
    indicatReady();
    function indicatReady() {
      _indicatItem.removeClass(actClassName);
      _indicatItem.eq(i).addClass(actClassName);
      if (ww < wwMedium) {
        if (slideCount > 1) {
          flownavShow();
        } else {
          flownavHide();
        }
      }
      if (ww >= wwMedium) {
        if (slideCount <= 2) {
          flownavHide();
        } else {
          flownavShow();
          _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
        }
      }
      if (ww >= wwNormal) {
        if (slideCount <= 3) {
          flownavHide();
        } else {
          flownavShow();
          _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
          _indicatItem.eq((i + 2) % slideCount).addClass(actClassName);
        }
      }
    }
    function flownavShow(){
      _indicator.add(_btnRight).add(_btnLeft).show();
    }
    function flownavHide(){
      _indicator.add(_btnRight).add(_btnLeft).hide();
    }

    function slideForward(){
      _flowList.stop(true, false).animate({'margin-left': -1 * slideDistance }, speed, function(){
        j = (i + 1) % slideCount;
        _flowItem.eq(i).appendTo(_flowList);
        _indicatItem.eq(i).removeClass(actClassName);
        _indicatItem.eq(j).addClass(actClassName);
        _flowList.css('margin-left', 0);
        if (ww >= wwMedium) {
          _indicatItem.eq((j + 1) % slideCount).addClass(actClassName);
        }
        if (ww >= wwNormal) {
          _indicatItem.eq((j + 1) % slideCount).addClass(actClassName);
          _indicatItem.eq((j + 2) % slideCount).addClass(actClassName);
        }
        i = j;
      });
    }
    function slideBackward() {
      j = (i - 1) % slideCount;
      _flowItem.eq(j).prependTo(_flowList);
      _flowList.css("margin-left", -1 * slideDistance);

      _flowList.stop(true, false).animate({ "margin-left": 0 }, speed, function () {
          _indicatItem.eq(j).addClass(actClassName);
          if (ww >= wwNormal) {
            _indicatItem.eq((i + 2) % slideCount).removeClass(actClassName);
          } else if (ww >= wwMedium) {
            _indicatItem.eq((i + 1) % slideCount).removeClass(actClassName);
          } else {
            _indicatItem.eq(i).removeClass(actClassName);
          }
          i = j;
        });
    }

    // 點擊向右箭頭
    _btnRight.click(function () { slideForward(); });

    // 點擊向左箭頭
    _btnLeft.click(function () { slideBackward(); });

    // touch and swipe 左右滑動
    _floxBox.swipe({
      swipeRight: function () {slideBackward();},
      swipeLeft: function () {slideForward();},
      threshold: 20,
    });

    // tab focus
    let tabCount = 0;
    _flowItem.children('a').focus(function (e) { 
      e.preventDefault();
      if ( tabCount > 0 && tabCount <= slideCount) {
        slideForward();
      }
      tabCount++
      if(tabCount > slideCount) {
        _btnLeft.focus();
        tabCount = 0;
      }
    });

    let winResizeTimer;
    _window.resize(function () {
      clearTimeout(winResizeTimer);
      winResizeTimer = setTimeout(function () {
        ww = _window.width();
        slideDistance = _flowItem.first().outerWidth(true);
        indicatReady();
      }, 200);
    });
  });


  

  // .photoflow：cp頁的照片 -----------------------------------------
  var _photoflow = $('.photoflow');
  var _cpBigPhoto = $('.lightbox.bigPhoto');
  
  _photoflow.each(function () {
    let _this = $(this);
    let _floxBox = _this.find('.flowBox');
    let _flowList = _floxBox.find('.flowList');
    let _flowItem = _flowList.children('li');
    let slideDistance = _flowItem.first().outerWidth(true);
    let slideCount = _flowItem.length;
    let _btnRight = _this.find('.diskBtn.next');
    let _btnLeft = _this.find('.diskBtn.prev');
    const speed = 400;
    const actClassName = 'active';
    let i = 0;
    let j;
    let _dots = '';

    

    // 產生 indicator 和 自訂屬性 data-index
    _floxBox.append('<div class="flowNav"><ul></ul></div>');
    let _indicator = _this.find(".flowNav>ul");
    for (let n = 0; n < slideCount; n++) {
      _dots = _dots + '<li></li>';
      _flowItem.eq(n).attr('data-index', n);
      _cpBigPhoto.find('.flowList>li').eq(n).attr('data-index', n);
    }
    _indicator.append(_dots);
    let _indicatItem = _indicator.find('li');
    _indicatItem.eq(i).addClass(actClassName);
    _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);

    // 依據可視的 slide 項目，決定 indicator 樣式
    indicatReady();
    function indicatReady() {
      _indicatItem.removeClass(actClassName);
      _indicatItem.eq(i).addClass(actClassName);
      _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
      if (ww < wwMedium) {
        if (slideCount > 2) {
          flownavShow();
        } else {
          flownavHide();
        }
      }
      if (ww >= wwMedium) {
        if (slideCount <= 3) {
          flownavHide();
        } else {
          flownavShow();
          _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
          _indicatItem.eq((i + 2) % slideCount).addClass(actClassName);
        }
      }
      if (ww >= wwNormal) {
        if (slideCount <= 4) {
          flownavHide();
        } else {
          flownavShow();
          _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
          _indicatItem.eq((i + 2) % slideCount).addClass(actClassName);
          _indicatItem.eq((i + 3) % slideCount).addClass(actClassName);
        }
      }
    }
    function flownavShow(){
      _indicator.add(_btnRight).add(_btnLeft).show();
    }
    function flownavHide(){
      _indicator.add(_btnRight).add(_btnLeft).hide();
    }

    function slideForward(){
      _flowList.stop(true, false).animate({'margin-left': -1 * slideDistance }, speed, function(){
        j = (i + 1) % slideCount;
        _flowItem.eq(i).appendTo(_flowList);
        _indicatItem.eq(i).removeClass(actClassName);
        _indicatItem.eq(j).addClass(actClassName);
        _indicatItem.eq((j + 1) % slideCount).addClass(actClassName);
        _flowList.css('margin-left', 0);
        if (ww >= wwMedium) {
          _indicatItem.eq((j + 2) % slideCount).addClass(actClassName);
        }
        if (ww >= wwNormal) {
          _indicatItem.eq((j + 3) % slideCount).addClass(actClassName);
        }
        i = j;
      });
    }
    function slideBackward() {
      j = (i - 1) % slideCount;
      _flowItem.eq(j).prependTo(_flowList);
      _flowList.css("margin-left", -1 * slideDistance);

      _flowList.stop(true, false).animate({ "margin-left": 0 }, speed, function () {
          _indicatItem.eq(j).addClass(actClassName);
          if (ww >= wwNormal) {
            _indicatItem.eq((i + 3) % slideCount).removeClass(actClassName);
          } else if (ww >= wwMedium) {
            _indicatItem.eq((i + 2) % slideCount).removeClass(actClassName);
          } else {
            _indicatItem.eq((i + 1) % slideCount).removeClass(actClassName);
            _indicatItem.eq(i).removeClass(actClassName);
          }
          i = j;
        });
    }

    // 點擊向右箭頭
    _btnRight.click(function () { slideForward(); });

    // 點擊向左箭頭
    _btnLeft.click(function () { slideBackward(); });

    // touch and swipe 左右滑動
    _floxBox.swipe({
      swipeRight: function () {slideBackward();},
      swipeLeft: function () {slideForward();},
      threshold: 20,
    });

    // tab focus
    let tabCount = 0;
    _flowItem.children('a').focus(function (e) { 
      e.preventDefault();
      if ( tabCount > 0 && tabCount <= slideCount) {
        slideForward();
      }
      tabCount++
      if(tabCount > slideCount) {
        _btnLeft.focus();
        tabCount = 0;
      }
    });

    let winResizeTimer;
    _window.resize(function () {
      clearTimeout(winResizeTimer);
      winResizeTimer = setTimeout(function () {
        ww = _window.width();
        slideDistance = _flowItem.first().outerWidth(true);
        indicatReady();
      }, 200);
    });


  });








  // 頁籤，March 2022 新做  ======================================================================
  var _tabset = $('.tabset');
  _tabset.each(function(){
    let _this = $(this);
    let _tabItems = _this.find('.tabItems');
    let _tabButton = _tabItems.find('button');
    let _tabContent = _this.find('.tabContent');
    let i = _tabButton.filter('.active').index();

    _tabContent.not(':last').append('<button class="skip"></button>')
    let _skip = _tabContent.find('.skip');
    
    _tabContent.eq(i).show();
    _tabButton.attr('tabindex' , '-1' ).eq(i).attr('tabindex' , '0' );

    _tabButton.on('click' , function(){
      i = $(this).index();
      $(this).addClass('active').attr('tabindex' , '0' ).siblings().removeClass('active').attr('tabindex' , '-1' );
      _tabContent.hide().eq(i).show();
      // 判斷 .tabContent 是否有 slick 元件
      if ( _tabContent.eq(i).find('.imgSlick').length > 0 ) {
        _tabContent.eq(i).find('.imgSlick').find('.slick-prev').trigger('click');
        setTimeout( function (){_tabContent.eq(i).find('.imgSlick').find('.slick-next').trigger('click');}, 600)
      }
    })

    _skip.on('focus', function(){
      _tabButton.eq( $(this).parent().index() ).focus();
    })

    _tabButton.on('focus', function(){
      $(this).trigger('click');
    })
  })


  // 數字累加效果，２０２３０４１２  ======================================================================
  var _numberCount = $('.roadData').find('.number');
  _numberCount.each(function() {
    let _this = $(this);
    let countTo = _this.text();
    _this.attr('data-count', countTo).text(0);

    $({ countNum: 0 }).animate({
      countNum: countTo
    }, {
      duration: 6000,
      easing: 'swing',
      step: function() {
        // _this.text(Math.floor(this.countNum));
        _this.text(Intl.NumberFormat().format(Math.floor(this.countNum)));
      },
      complete: function() {
        // _this.text(this.countNum);
        _this.text(Intl.NumberFormat().format(this.countNum));
      }
    });

  });

  
  // ======================================================================
  // rwd list Table
  // 把 th 的內容複製到對應的td的 title 屬性值
  _rwdTable = $('.rwdTable');
  _rwdTable.each( function(){
    let _this = $(this);
    let _th = _this.find('thead>tr>th');
    let count = _th.length;
    let _tr = _this.find('tbody').children('tr');

      _tr.each(function(){
        let _td = $(this).children('td');
        for ( let i = 0; i<count; i++ ) {
          _td.eq(i).attr('title', _th.eq(i).text());
        }
      })
  })



  // ======================================================================
  // ======================================================================




  // 燈箱 --- 
  var _showLightbox =  $('.showLightbox');
  var _lightbox = $('.lightbox');
  var _hideLightbox = _lightbox.find('.closeThis');
  var _lightboxNow;
  var _whichTrigger;
  const speed = 400;

  _lightbox.before('<div class="coverAll"></div>');
  var _cover = $('.coverAll');

  _lightbox.append('<button type="button" class="skip">回「關閉燈箱」</button>')
  var _skipLbx = _lightbox.find('.skip');

  _skipLbx.on('focus' , function(){ _hideLightbox.trigger('focus') });
  
  _showLightbox.click(function(){
    _whichTrigger = $(this);
    let boxID = _whichTrigger.attr('data-id');

    _lightboxNow = _lightbox.filter( function(){ return $(this).attr('data-id') === boxID} );
    _lightboxNow.stop(true, false).fadeIn(speed).addClass('show');
    _lightboxNow.prev(_cover).fadeIn(speed);
    _hideLightbox.focus();

    _body.addClass('noScroll');

  })

  _hideLightbox.click(function(){
    let _targetLbx = _lightbox;
    _targetLbx.stop(true, false).fadeOut(speed,
      function(){
        _targetLbx.removeClass('show');
      }
    );
    _targetLbx.prev(_cover).fadeOut(speed);
    _whichTrigger.focus();
    _body.removeClass('noScroll');
  })

  _cover.click(function(){
    let _targetLbx = _lightbox;
    $(this).fadeOut(speed);
    _targetLbx.fadeOut(speed,
      function(){
        _targetLbx.removeClass('show');
      }
    );
	_targetLbx.prev(_cover).fadeOut(speed);
    _body.removeClass('noScroll');
  })
})