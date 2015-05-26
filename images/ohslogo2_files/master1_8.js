var methods = {
     show : function(options) {
            var defaults =   {
            "tourLoaded": "false",
            "links":"http://schoolloop.com"
            };

           options = jQuery.extend({}, defaults, options);
           links = options.links;
              if (links){
              links = links.replace(/^https?\:\/\//i, "");
                jQuery(document).on("click",".tour_start",function(){
                      if (options.tourLoaded == 'false') {
                                url =  "/misc/fetch?url=" + links;
                                jQuery("#tourGroup").load(url, function(){
                                    jQuery("#tourGroup a").each(function (){
                                            var url = jQuery(this).attr("href");
                                            var urlNoProtocol = url.replace(/^https?\:\/\//i, "");
                                            cleanedURL = "/misc/fetch?url=" + (urlNoProtocol);
                                            jQuery(this).attr("href",cleanedURL);
                                            jQuery(this).colorbox({rel:'tourGroup',
                                            innerWidth:"700px",
                                            innerHeight:"432px",
                                            current:"{current} of {total}"
                                            });
                                            });
                                  options.tourLoaded = 'true';
                                  jQuery("#tourGroup a:eq(0)").click();
                                });
                                             }
                      else {
                           jQuery("#tourGroup a:eq(0)").click();
                      }
                });
                }
                }
     };


    jQuery.fn.tourShow = function( method,options ) {
       if ( methods[method] ) {
         return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
       } else if ( typeof method === 'object' || ! method ) {
         return methods.init.apply( this, arguments );
       } else {
         jQuery.error( 'Method ' +  method + ' does not exist on jQuery.tourShow' );
       }

     };
// for Ajax accordions
//an element  "class=ajax_accordion"
//includes an element, e.g. <a>, that is the button class="ajax_accordion_button"
//that opens and closes an element, e.g. div, class="ajax_accordion_content"
// if  ajax_accordion_content is prepopulated it will just open and close; if it is empty it will load content from the href attribute of the button
//.accordion_block holds the clicker current class if accordion open


jQuery(document).on("click","a.ajax_accordion_button", function(e) {
        e.preventDefault();
        var thisClicker =   jQuery(this);
        var forCurrent = thisClicker.closest(".accordion_block");
        contentURL = thisClicker.closest("a").attr("href");
        var thisContainer = thisClicker.closest(".ajax_accordion").find(".ajax_accordion_content:first");
        if (thisContainer.length == 0) thisContainer = thisClicker.closest(".ajax_accordion").next(".ajax_accordion_content");// this allows content to be next sibling
        var thisContainerDown = (thisContainer.is(":visible"));
    if (thisContainerDown) {
            thisContainer.slideUp();
            thisClicker.removeClass("current");
            forCurrent.removeClass("current");
    }
    else
    {
        if (thisContainer.is(':not(:empty)') || (!contentURL)){
           thisContainer.fadeIn().slideDown();
           thisClicker.addClass("current");
           forCurrent.addClass("current");
        }
        else
        {
            jQuery.ajax({
             url: contentURL,
             success: function(returnedHTML) {
                thisContainer.html(returnedHTML);
                thisContainer.fadeIn().slideDown();
                thisClicker.addClass("current");
                forCurrent.addClass("current");
                }
             });
        }
    }
});

function cleanOpen(el) {
         var thisClicker =   jQuery(el);
         var forCurrent = thisClicker.closest(".accordion_block");
         contentURL = thisClicker.closest("a").attr("href");
         var thisContainer = thisClicker.closest(".ajax_accordion").find(".ajax_accordion_content:first");
         if (thisContainer.length == 0) thisContainer = thisClicker.closest(".ajax_accordion").next(".ajax_accordion_content");// this allows content to be next sibling
         var thisContainerDown = (thisContainer.is(":visible"));
     if (thisContainerDown) {
             thisContainer.slideUp();
             thisClicker.removeClass("current");
             forCurrent.removeClass("current");
     }
     else
     {
         if (thisContainer.is(':not(:empty)') || (!contentURL)){
            thisContainer.fadeIn().slideDown();
            thisClicker.addClass("current");
            forCurrent.addClass("current");
         }
         else
         {
             jQuery.ajax({
              url: contentURL,
              success: function(returnedHTML) {
                 thisContainer.html(returnedHTML);
                 thisContainer.fadeIn().slideDown();
                 thisClicker.addClass("current");
                 forCurrent.addClass("current");
                 }
              });

         }
     }


}

jQuery(document).on(
{
    mouseenter: function()
    {
    jQuery(this).closest(".accordion_block").addClass("accordion_block_hover");
    },
    mouseleave: function()
    {
    jQuery(this).closest(".accordion_block").removeClass("accordion_block_hover");
    }
}
, 'a.accordion_icon');

/* *** use class="jsAllAccordionHolder" in a containing div around shrink/expand all buttons and accordions  *** */

jQuery(document).on("click",".expand_all", function(){
          if (jQuery(this).closest(".jsAllAccordionHolder").length > 0) {
          context = ".jsAllAccordionHolder "
          }
          else
          {
          context = ""
          }
    jQuery( context + ".ajax_accordion_button, " + context + ".ajax_accordion_row").each(function(){
        var j_this = jQuery(this);
        if(!j_this.hasClass("current"))  {
        j_this.trigger("click");
        }
    })
})

jQuery(document).on("click",".shrink_all", function(){
         if (jQuery(this).closest(".jsAllAccordionHolder").length > 0) {
         context = " .jsAllAccordionHolder "
         }
         else
         {
         context = ""
         }
    jQuery( context + ".ajax_accordion_button, " + context + ".ajax_accordion_row").each(function(){
        var j_this = jQuery(this);
        if(j_this.hasClass("current"))  {
        j_this.trigger("click");
        }
    })
})

jQuery(document).on("click",".tlm_row, .section_row, .section_row_section,.accord_row", function(event){
        event.stopPropagation();
        var j_this = jQuery(event.target)
        if (j_this.attr("href")) return;
        if (j_this.attr("src")) j_this = jQuery(event.target).closest(".ajax_accordion");
        cleanOpen(j_this.find("a.ajax_accordion_button:first"))
})

/* *** New accordion code *** */

jQuery(document).on("click",'.ajax_accordion_row', function(e) {
console.log("jQuery(e.target)",jQuery(e.target));
    if (jQuery(e.target).hasClass("link_in_accordion")) {
        return;
    }
    isDropdownStyle = (jQuery(this).hasClass("jsCloseOthers"));
    isStayOpenStyle = (jQuery(this).hasClass("jsStayOpen"));

    if (isDropdownStyle) {
        closeOthers(jQuery(this));
    }
        e.preventDefault();
        var thisClicker =   jQuery(this);
        var forCurrent = thisClicker.closest(".accordion_block");
        contentURL = thisClicker.data("url");
        var thisContainer = thisClicker.closest(".ajax_accordion").find(".ajax_accordion_content:first");
        if (thisContainer.length == 0) thisContainer = thisClicker.closest(".ajax_accordion").next(".ajax_accordion_content");// this allows content to be next sibling
        var thisContainerDown = (thisContainer.is(":visible"));
        var isDefault =  (thisClicker.closest(".ajax_accordion").hasClass("default"));
    if (thisContainerDown) {
            if (isDefault){
            thisContainer.slideUp();
            }
            else if (isDropdownStyle){
                thisContainer.slideUp("fast");
            }
            else
            {
            thisContainer.hide();
            }
            thisClicker.removeClass("current");
            forCurrent.removeClass("current");
            thisClicker.attr("aria-expanded","false");
    }
    else
    {
        if (thisContainer.is(':not(:empty)') || (!contentURL)){
            if (isDefault){
               thisContainer.fadeIn().slideDown();
               }
               else if (isDropdownStyle){
               thisContainer.slideDown("fast");
               if (isStayOpenStyle){
                     jQuery("body:not(.jsStayOpen)").on("click",function(event){
                         if (jQuery(event.target).parents('.ajax_accordion_content').length || (jQuery(event.target).hasClass("jsStayOpen"))){
                             return;
                         }
                         else
                         {
                            thisContainer.hide();
                            thisClicker.removeClass("current");
                            forCurrent.removeClass("current");
                            thisClicker.attr("aria-expanded","false");
                            jQuery(this).off();
                         }
                     })
               }
               else
                {
                    jQuery(document).one("click",function(event){
                        if (jQuery(this).hasClass("jsCloseOthers") || jQuery(event.target).hasClass("link_in_accordion") ){
                            return;
                        }
                        thisContainer.hide();
                        thisClicker.removeClass("current");
                        forCurrent.removeClass("current");
                        thisClicker.attr("aria-expanded","false");
                    })
                }
               }
               else
               {
               thisContainer.show();
               }
               thisClicker.addClass("current");
               forCurrent.addClass("current");
               thisClicker.attr("aria-expanded","true");
        }
        else
        {
            jQuery.ajax({
             url: contentURL,
             success: function(returnedHTML) {
                thisContainer.html(returnedHTML);
                thisContainer.fadeIn().slideDown();
                thisClicker.addClass("current");
                forCurrent.addClass("current");
                thisClicker.attr("aria-expanded","true");
                }
             });
        }
    }
});

jQuery(document).keyup(function(e){
	switch(e.keyCode) {
		case 13:
            if (jQuery(e.target).hasClass("ajax_accordion_row")) {
                accordOpen(e.target);
            }
	}
});

function accordOpen(el) {
         var thisClicker =   jQuery(el);
         var forCurrent = thisClicker.closest(".accordion_block");
         contentURL = thisClicker.data("url");
         var thisContainer = thisClicker.closest(".ajax_accordion").find(".ajax_accordion_content:first");
         if (thisContainer.length == 0) {
            thisContainer = thisClicker.closest(".ajax_accordion").next(".ajax_accordion_content");// this allows content to be next sibling
         }
         var thisContainerDown = (thisContainer.is(":visible"));
     if (thisContainerDown) {
             thisContainer.slideUp();
             thisClicker.removeClass("current");
             forCurrent.removeClass("current");
     }
     else
     {
            if (thisContainer.is(':not(:empty)') || (!contentURL)){
                thisContainer.fadeIn().slideDown();
                thisClicker.addClass("current");
                forCurrent.addClass("current");
            }
            else
            {
            jQuery.ajax({
                url: contentURL,
                success: function(returnedHTML) {
                thisContainer.html(returnedHTML);
                thisContainer.fadeIn().slideDown();
                thisClicker.addClass("current");
                forCurrent.addClass("current");
            }
            });
            }
     }
}

function closeOthers(el){
    jQuery.each(jQuery(".jsCloseOthers"), function(){
            var thisClicker = jQuery(this);
            var thisContainer = thisClicker.closest(".ajax_accordion").find(".ajax_accordion_content:first");
            var thisContainerDown = (thisContainer.is(":visible"));
                 if (thisContainerDown) {
                    thisContainer.css("z-index","-1");
                    thisContainer.slideUp("fast",function(){
                        thisContainer.css("z-index","1");
                    });
                 }
    })
}

jQuery(document).on("mouseout",".ajax_accordion_row", function(e) {
   jQuery(".ajax_accordion_row").blur();
})
var calendarMethods = {
    init: function (options) {


        function cal_refresh(cal_url, showfilter) {
            jQuery('.cal_content_holder').fadeTo("fast", 1);
            if (showfilter) {
                jQuery(".jsFilterDropdown .cal_drop_content").show();
                clearTimeout(filterTimer["jsFilterDropdown"]);
            }
            jQuery("#cal_url").data('cal_url', cal_url);
            cal_buttons_checkbox();
            jQuery('a[rel^="cal_dropmenu1_"],.cal_drop_content').unbind("mouseenter mouseleave");
            jQuery(".ajax_accordion_row").unbind("click");
            hide_addEvents();
            jQuery('.ajax_accordion_button,.ajax_view,.ajax_cal').on('contextmenu', function () {
                return false;
            });
            refreshTooltips(".cal_content");
        }

        function cal_buttons_dropdowns() {
            jQuery(document).on({
                mouseenter: function (e) {
                                var rel = jQuery(this).closest("li").attr("class");
                                jQuery(this).closest("li").find(".cal_drop_content").slideDown();
                                clearTimeout(filterTimer[rel]);
                            },
                mouseleave: function (e) {
                                var rel = jQuery(this).closest("li").attr("class");
                                filterTimer[rel] = setTimeout(function () {
                                    jQuery("." + rel).find(".cal_drop_content").slideUp();
                                    }, 1000)
                                }
            }, 'a[rel^="cal_dropmenu1_"],.cal_drop_content');
        }


        function cal_buttons() {
            jQuery(document).on("click","a.ajax_cal,a.ajax_view", function (e) {
                e.preventDefault();
                var cal_cont_load = jQuery(this).closest(".cal_content_holder");
                cal_cont_load.fadeTo("fast", 0.5);
                different_cal(cal_cont_load, e.target);
            });
        }

        function cal_buttons_checkbox() {
            jQuery("#cal_a input[type=checkbox]").click(function (e) {
                e.preventDefault();
                jQuery(".jsFilterDropdown").trigger("mouseleave");
                jQuery('.cal_content_holder').fadeTo("fast", 0.5);
                var form = jQuery(this).closest("form");
                var cal_url = jQuery("#cal_url").data('cal_url');
                filtered_cal(form, cal_url);

            })
        }

        function different_cal(cal_cont_load, cal_url) {
            cal_cont_load.load(cal_url + ' .cal_content', function () {
                    cal_refresh(cal_url, false);
                }
            );

        }

        function filtered_cal(form, cal_url) {
            jQuery.ajax({
                type: "POST",
                url: "/calendar/setCalendarSettings?d=x&return_url=1432151888524",
                data: form.serialize(),
                complete: function () {
                    jQuery('.cal_content_holder').load(cal_url + ' .cal_content', function () {
                        cal_refresh(cal_url, true);
                                       var id = window.setTimeout(function() {}, 0);


                    })
                }
            })
        }

        function hide_addEvents() {
            if (!jQuery.trim(jQuery('.cal_dropmenu1_b').html()).length) {
                jQuery("#add_events").hide();/// this is for hiding add button when not relevant
            }
        }
        var filterTimer = [];
        var showfilter = "false";
        cal_buttons();
        hide_addEvents();
        cal_buttons_checkbox();
        cal_buttons_dropdowns();
    }
}

jQuery.fn.ajaxCalendar = function (method) {
    if (calendarMethods[method]) {
        return calendarMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
        return calendarMethods.init.apply(this, arguments);
    } else {
        jQuery.error('Method ' + method + ' does not exist on jQuery.ajaxCalendar');
    }
};

jQuery(document).ready(function () {
        jQuery("body").ajaxCalendar();
})
jQuery(document).on("click",".hide_show_replies", function (){

var thisContainer =  jQuery(this).closest("div.hide_show_butt_cont").siblings(".indent");
var thisContainerDown = (thisContainer.is(":visible"));

if (thisContainerDown){
        jQuery(this).closest("div").siblings(".indent").slideUp();
        jQuery(this).closest("div").find(".hide_show_replies:lt(2)").toggleClass("hidden");
    }
    else {
        jQuery(this).closest("div").siblings(".indent").slideDown();
        jQuery(this).closest("div").find(".hide_show_replies:lt(2)").toggleClass("hidden");
    }
})
function refreshTooltips (selector) {
        selector =  selector || '';
        jQuery(".jTip" ).each(function() {
                 jQuery(this).wijtooltip({
                    hideDelay:2300,
                    cssClass:"wijTooltip",
                    ajaxCallback: function () {
                        var item = this;
                        var contentURL = item.attr("hover_url");
                        jQuery.ajax({
                            url: contentURL,
                            success : function(data) {
                                item.wijtooltip("option", "content",data);
                            },
                            type: "GET"
                        });
                    },
                    shown: function(e, ui){
                    if (jQuery(this).data('left') == 'true') {
                        jQuery(this).wijtooltip ("hide");
                    }
                    }
                });

        jQuery(this).mouseenter(function(){
            jQuery(this).data('left',"false");
        }).mouseleave(function(){
            jQuery(this).data('left',"true");
        });
        })
}

function refresh_wijTip (selector) {
        jQuery(".wijTip" ).each(function() {
            jQuery(this).wijtooltip({})
            jQuery(".wijTip").wijtooltip("hide");
        })
}

jQuery(document).ready(function(){
        jQuery(".wijTip" ).each(function() {
             jQuery(this).wijtooltip({
             })
        })
        jQuery('.portal_tab,.ajax_accordion_button,.ajax_view,.ajax_cal').on('contextmenu',function(){
            return false;
        });
        refreshTooltips ();


        /*    *** NEW qTips *** */
        jQuery('.qtip2').qtip({ // Grab some elements to apply the tooltip to

        style: { classes: "qtip-light qtip-shadow"},
        content: {
        text: function(event, api) {
            jQuery.ajax({
                url: jQuery(this).data('url') // Use data-url attribute for the URL
            })
            .then(function(content) {
                api.set('content.text', content);
            }, function(xhr, status, error) {
                api.set('content.text', status + ': ' + error);
            });
                return 'Loading...'; // Set some initial text
        }
        }
        })

})
jQuery(document).on(
{
    mouseenter: function()
    {
    jQuery(this).find(".hide_icon").toggleClass("hidden");
    },
    mouseleave: function()
    {
    jQuery(this).find(".hide_icon").toggleClass("hidden");
    }
}
, '.news_for_delete');


jQuery(document).on("click",".hide_icon", function (){
      jQuery(this).closest(".news_for_delete").animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
        url = jQuery(this).data("url");
      jQuery.ajax({
       url: url,
       type: "post"
      }
      )
});


jQuery(document).on("click",".unhide_btn", function (){
jQuery(this).closest(".big_short_item").toggleClass("read_item",1000, "easeOutSine" );

        url = jQuery(this).data("url");
        jQuery.ajax({
        url: url,
        type:"post",
        success: function(response)
             {

             }
        }
        );

      jQuery(this).fadeOut(1000, function (){
                     jQuery(this).remove();
      });

})


jQuery(document).on("click",".icon_checked, .icon_unchecked", function (event){
    event.preventDefault();
    if (jQuery(this).data('canmark')) {
        url = jQuery(this).attr("href");
        jQuery.ajax({
            url: url,
            type: "post"
        })
        if (jQuery(this).parents(".big_checkbox").length == 1) {
            var selector = ".big_checkbox";
            jQuery(this).closest(".marked_group").find(".title_page").toggleClass("strikethrough");
        }
        else
        {
            var selector = ".ajax_accordion";
            jQuery(this).closest(selector).find(".item_title span").toggleClass("strikethrough");
        }
        jQuery(this).closest(selector).find(".active_checked").toggleClass("hidden");
    }
})
function consoleLog(message,a)
{

}
jQuery(document).ready(function(){
     jQuery(".alert_help").click(function(event){
        event.preventDefault();  // this is only required for older browsers
     })
     jQuery(".alert_help").colorbox({iframe:true,
         width:"800px",
         height:"90%",
         title: function(){
             return '<p style="text-align:center; font-weight:800; width:100%; border-top:1px solid #ccc"><a style="vertical-align:bottom; height:30px" href="' + jQuery(this).attr("helpPage") + '" target="_blank">' + jQuery(this).attr('linkText') + '</a></p>';}});
});
