/*
 *
 *  * Copyright (c) 2004-2014, School Loop, Inc. All Rights Reserved.
 *
 */

var slLegacy = new Object();

slLegacy.tabSubmitOverride = function(event)
{
    var form = jQuery("#" + event.data.formID);
    form.data("context", event.data);
    form.submit(slLegacy.submitHandler);
}

slLegacy.submitHandler = function(event)
{
    var passthrough = jQuery(this).data("passThrough");
    if (passthrough == null)
    {
        event.preventDefault();
        var context = jQuery(this).data("context");
        var options = {};
        options["async"] = false;
        options["success"] = function(data)
        {
            jQuery("#" + context.refreshArea).replaceWith(data);
            jQuery("#" + context.formID).data("context", context);
            jQuery("#" + context.formID).submit(slLegacy.submitHandler);
        };
        jQuery("#ajax_scope", sl.getAjaxScope());
        jQuery(this).ajaxSubmit(options);
    }
}