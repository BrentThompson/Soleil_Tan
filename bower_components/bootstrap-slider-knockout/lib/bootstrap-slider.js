! function(a) {
    function b(b, d) {
        if (g[b]) {
            var e = c(this),
                f = g[b].apply(e, d);
            return "undefined" == typeof f ? a(this) : f
        }
        throw new Error("method '" + b + "()' does not exist for slider.")
    }

    function c(b) {
        var c = a(b).data("slider");
        if (c && c instanceof f) return c;
        throw new Error(e.callingContextNotSliderInstance)
    }

    function d(b) {
        var c = a(this);
        return c.each(function() {
            var c = a(this),
                d = c.data("slider"),
                e = "object" == typeof b && b;
            d && !e && (e = {}, a.each(a.fn.slider.defaults, function(a) {
                e[a] = d[a]
            })), c.data("slider", new f(this, a.extend({}, a.fn.slider.defaults, e)))
        }), c
    }
    var e = {
        formatInvalidInputErrorMsg: function(a) {
            return "Invalid input value '" + a + "' passed in"
        },
        callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
    }, f = function(b, c) {
            var d = this.element = a(b).hide(),
                e = a(b)[0].style.width,
                f = !1,
                g = this.element.parent();
            g.hasClass("slider") === !0 ? (f = !0, this.picker = g) : this.picker = a('<div class="slider"><div class="slider-track"><div class="slider-selection"></div><div class="slider-handle"></div><div class="slider-handle"></div></div><div id="tooltip" class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div><div id="tooltip_min" class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div><div id="tooltip_max" class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div></div>').insertBefore(this.element).append(this.element), this.id = this.element.data("slider-id") || c.id, this.id && (this.picker[0].id = this.id), ("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch) && (this.touchCapable = !0);
            var h = this.element.data("slider-tooltip") || c.tooltip;
            switch (this.tooltip = this.picker.find("#tooltip"), this.tooltipInner = this.tooltip.find("div.tooltip-inner"), this.tooltip_min = this.picker.find("#tooltip_min"), this.tooltipInner_min = this.tooltip_min.find("div.tooltip-inner"), this.tooltip_max = this.picker.find("#tooltip_max"), this.tooltipInner_max = this.tooltip_max.find("div.tooltip-inner"), f === !0 && (this.picker.removeClass("slider-horizontal"), this.picker.removeClass("slider-vertical"), this.tooltip.removeClass("hide"), this.tooltip_min.removeClass("hide"), this.tooltip_max.removeClass("hide")), this.orientation = this.element.data("slider-orientation") || c.orientation, this.orientation) {
                case "vertical":
                    this.picker.addClass("slider-vertical"), this.stylePos = "top", this.mousePos = "pageY", this.sizePos = "offsetHeight", this.tooltip.addClass("right")[0].style.left = "100%", this.tooltip_min.addClass("right")[0].style.left = "100%", this.tooltip_max.addClass("right")[0].style.left = "100%";
                    break;
                default:
                    this.picker.addClass("slider-horizontal").css("width", e), this.orientation = "horizontal", this.stylePos = "left", this.mousePos = "pageX", this.sizePos = "offsetWidth", this.tooltip.addClass("top")[0].style.top = -this.tooltip.outerHeight() - 14 + "px", this.tooltip_min.addClass("top")[0].style.top = -this.tooltip_min.outerHeight() - 14 + "px", this.tooltip_max.addClass("top")[0].style.top = -this.tooltip_max.outerHeight() - 14 + "px"
            }
            var i = this;
            a.each(["min", "max", "step", "value"], function(a, b) {
                i[b] = "undefined" != typeof d.data("slider-" + b) ? d.data("slider-" + b) : "undefined" != typeof c[b] ? c[b] : "undefined" != typeof d.prop(b) ? d.prop(b) : 0
            }), this.value instanceof Array ? f && !this.range ? this.value = this.value[0] : this.range = !0 : this.range && (this.value = [this.value, this.max]), this.selection = this.element.data("slider-selection") || c.selection, this.selectionEl = this.picker.find(".slider-selection"), "none" === this.selection && this.selectionEl.addClass("hide"), this.selectionElStyle = this.selectionEl[0].style, this.handle1 = this.picker.find(".slider-handle:first"), this.handle1Stype = this.handle1[0].style, this.handle2 = this.picker.find(".slider-handle:last"), this.handle2Stype = this.handle2[0].style, f === !0 && (this.handle1.removeClass("round triangle"), this.handle2.removeClass("round triangle hide"));
            var j = this.element.data("slider-handle") || c.handle;
            switch (j) {
                case "round":
                    this.handle1.addClass("round"), this.handle2.addClass("round");
                    break;
                case "triangle":
                    this.handle1.addClass("triangle"), this.handle2.addClass("triangle")
            }
            this.range ? (this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0])), this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]))) : (this.value = [Math.max(this.min, Math.min(this.max, this.value))], this.handle2.addClass("hide"), this.value[1] = "after" === this.selection ? this.max : this.min), this.diff = this.max - this.min, this.percentage = this.diff > 0 ? [100 * (this.value[0] - this.min) / this.diff, 100 * (this.value[1] - this.min) / this.diff, 100 * this.step / this.diff] : [0, 0, 100], this.offset = this.picker.offset(), this.size = this.picker[0][this.sizePos], this.formater = c.formater, this.tooltip_separator = c.tooltip_separator, this.tooltip_split = c.tooltip_split, this.reversed = this.element.data("slider-reversed") || c.reversed, this.layout(), this.layout(), this.handle1.on({
                keydown: a.proxy(this.keydown, this, 0)
            }), this.handle2.on({
                keydown: a.proxy(this.keydown, this, 1)
            }), this.touchCapable && this.picker.on({
                touchstart: a.proxy(this.mousedown, this)
            }), this.picker.on({
                mousedown: a.proxy(this.mousedown, this)
            }), "hide" === h ? (this.tooltip.addClass("hide"), this.tooltip_min.addClass("hide"), this.tooltip_max.addClass("hide")) : "always" === h ? (this.showTooltip(), this.alwaysShowTooltip = !0) : (this.picker.on({
                mouseenter: a.proxy(this.showTooltip, this),
                mouseleave: a.proxy(this.hideTooltip, this)
            }), this.handle1.on({
                focus: a.proxy(this.showTooltip, this),
                blur: a.proxy(this.hideTooltip, this)
            }), this.handle2.on({
                focus: a.proxy(this.showTooltip, this),
                blur: a.proxy(this.hideTooltip, this)
            })), this.enabled = c.enabled && (void 0 === this.element.data("slider-enabled") || this.element.data("slider-enabled") === !0), this.enabled ? this.enable() : this.disable()
        };
    f.prototype = {
        constructor: f,
        over: !1,
        inDrag: !1,
        showTooltip: function() {
            this.tooltip_split === !1 ? this.tooltip.addClass("in") : (this.tooltip_min.addClass("in"), this.tooltip_max.addClass("in")), this.over = !0
        },
        hideTooltip: function() {
            this.inDrag === !1 && this.alwaysShowTooltip !== !0 && (this.tooltip.removeClass("in"), this.tooltip_min.removeClass("in"), this.tooltip_max.removeClass("in")), this.over = !1
        },
        layout: function() {
            var a;
            if (a = this.reversed ? [100 - this.percentage[0], this.percentage[1]] : [this.percentage[0], this.percentage[1]], this.handle1Stype[this.stylePos] = a[0] + "%", this.handle2Stype[this.stylePos] = a[1] + "%", "vertical" === this.orientation) this.selectionElStyle.top = Math.min(a[0], a[1]) + "%", this.selectionElStyle.height = Math.abs(a[0] - a[1]) + "%";
            else {
                this.selectionElStyle.left = Math.min(a[0], a[1]) + "%", this.selectionElStyle.width = Math.abs(a[0] - a[1]) + "%";
                var b = this.tooltip_min[0].getBoundingClientRect(),
                    c = this.tooltip_max[0].getBoundingClientRect();
                b.right > c.left ? (this.tooltip_max.removeClass("top"), this.tooltip_max.addClass("bottom")[0].style.top = "18px") : (this.tooltip_max.removeClass("bottom"), this.tooltip_max.addClass("top")[0].style.top = "-30px")
            }
            this.range ? (this.tooltipInner.text(this.formater(this.value[0]) + this.tooltip_separator + this.formater(this.value[1])), this.tooltip[0].style[this.stylePos] = this.size * (a[0] + (a[1] - a[0]) / 2) / 100 - ("vertical" === this.orientation ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + "px", this.tooltipInner_min.text(this.formater(this.value[0])), this.tooltipInner_max.text(this.formater(this.value[1])), this.tooltip_min[0].style[this.stylePos] = this.size * (a[0] / 100) - ("vertical" === this.orientation ? this.tooltip_min.outerHeight() / 2 : this.tooltip_min.outerWidth() / 2) + "px", this.tooltip_max[0].style[this.stylePos] = this.size * (a[1] / 100) - ("vertical" === this.orientation ? this.tooltip_max.outerHeight() / 2 : this.tooltip_max.outerWidth() / 2) + "px") : (this.tooltipInner.text(this.formater(this.value[0])), this.tooltip[0].style[this.stylePos] = this.size * a[0] / 100 - ("vertical" === this.orientation ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + "px")
        },
        mousedown: function(b) {
            if (!this.isEnabled()) return !1;
            this.touchCapable && "touchstart" === b.type && (b = b.originalEvent), this.triggerFocusOnHandle(), this.offset = this.picker.offset(), this.size = this.picker[0][this.sizePos];
            var c = this.getPercentage(b);
            if (this.range) {
                var d = Math.abs(this.percentage[0] - c),
                    e = Math.abs(this.percentage[1] - c);
                this.dragged = e > d ? 0 : 1
            } else this.dragged = 0;
            this.percentage[this.dragged] = this.reversed ? 100 - c : c, this.layout(), this.touchCapable && a(document).on({
                touchmove: a.proxy(this.mousemove, this),
                touchend: a.proxy(this.mouseup, this)
            }), a(document).on({
                mousemove: a.proxy(this.mousemove, this),
                mouseup: a.proxy(this.mouseup, this)
            }), this.inDrag = !0;
            var f = this.calculateValue();
            return this.setValue(f), this.element.trigger({
                type: "slideStart",
                value: f
            }).data("value", f).prop("value", f), !0
        },
        triggerFocusOnHandle: function(a) {
            0 === a && this.handle1.focus(), 1 === a && this.handle2.focus()
        },
        keydown: function(a, b) {
            if (!this.isEnabled()) return !1;
            var c;
            switch (b.which) {
                case 37:
                case 40:
                    c = -1;
                    break;
                case 39:
                case 38:
                    c = 1
            }
            if (c) {
                var d = c * this.percentage[2],
                    e = this.percentage[a] + d;
                e > 100 ? e = 100 : 0 > e && (e = 0), this.dragged = a, this.adjustPercentageForRangeSliders(e), this.percentage[this.dragged] = e, this.layout();
                var f = this.calculateValue();
                return this.setValue(f), this.element.trigger({
                    type: "slideStop",
                    value: f
                }).data("value", f).prop("value", f), !1
            }
        },
        mousemove: function(a) {
            if (!this.isEnabled()) return !1;
            this.touchCapable && "touchmove" === a.type && (a = a.originalEvent);
            var b = this.getPercentage(a);
            this.adjustPercentageForRangeSliders(b), this.percentage[this.dragged] = this.reversed ? 100 - b : b, this.layout();
            var c = this.calculateValue();
            return this.setValue(c), !1
        },
        adjustPercentageForRangeSliders: function(a) {
            this.range && (0 === this.dragged && this.percentage[1] < a ? (this.percentage[0] = this.percentage[1], this.dragged = 1) : 1 === this.dragged && this.percentage[0] > a && (this.percentage[1] = this.percentage[0], this.dragged = 0))
        },
        mouseup: function() {
            if (!this.isEnabled()) return !1;
            this.touchCapable && a(document).off({
                touchmove: this.mousemove,
                touchend: this.mouseup
            }), a(document).off({
                mousemove: this.mousemove,
                mouseup: this.mouseup
            }), this.inDrag = !1, this.over === !1 && this.hideTooltip();
            var b = this.calculateValue();
            return this.layout(), this.element.data("value", b).prop("value", b).trigger({
                type: "slideStop",
                value: b
            }), !1
        },
        calculateValue: function() {
            var a;
            return this.range ? (a = [this.min, this.max], 0 !== this.percentage[0] && (a[0] = Math.max(this.min, this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step)), 100 !== this.percentage[1] && (a[1] = Math.min(this.max, this.min + Math.round(this.diff * this.percentage[1] / 100 / this.step) * this.step)), this.value = a) : (a = this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step, a < this.min ? a = this.min : a > this.max && (a = this.max), a = parseFloat(a), this.value = [a, this.value[1]]), a
        },
        getPercentage: function(a) {
            !this.touchCapable || "touchstart" !== a.type && "touchmove" !== a.type || (a = a.touches[0]);
            var b = 100 * (a[this.mousePos] - this.offset[this.stylePos]) / this.size;
            return b = Math.round(b / this.percentage[2]) * this.percentage[2], Math.max(0, Math.min(100, b))
        },
        getValue: function() {
            return this.range ? this.value : this.value[0]
        },
        setValue: function(a) {
            a || (a = 0), this.value = this.validateInputValue(a), this.range ? (this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0])), this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]))) : (this.value = [Math.max(this.min, Math.min(this.max, this.value))], this.handle2.addClass("hide"), this.value[1] = "after" === this.selection ? this.max : this.min), this.diff = this.max - this.min, this.percentage = this.diff > 0 ? [100 * (this.value[0] - this.min) / this.diff, 100 * (this.value[1] - this.min) / this.diff, 100 * this.step / this.diff] : [0, 0, 100], this.layout();
            var b = this.range ? this.value : this.value[0];
            this.element.trigger({
                type: "slide",
                value: b
            }).data("value", this.value).prop("value", this.value)
        },
        validateInputValue: function(b) {
            if ("number" == typeof b) return b;
            if (b instanceof Array) return a.each(b, function(a, b) {
                if ("number" != typeof b) throw new Error(e.formatInvalidInputErrorMsg(b))
            }), b;
            throw new Error(e.formatInvalidInputErrorMsg(b))
        },
        destroy: function() {
            this.handle1.off(), this.handle2.off(), this.element.off().show().insertBefore(this.picker), this.picker.off().remove(), a(this.element).removeData("slider")
        },
        disable: function() {
            this.enabled = !1, this.handle1.removeAttr("tabindex"), this.handle2.removeAttr("tabindex"), this.picker.addClass("slider-disabled"), this.element.trigger("slideDisabled")
        },
        enable: function() {
            this.enabled = !0, this.handle1.attr("tabindex", 0), this.handle2.attr("tabindex", 0), this.picker.removeClass("slider-disabled"), this.element.trigger("slideEnabled")
        },
        toggle: function() {
            this.enabled ? this.disable() : this.enable()
        },
        isEnabled: function() {
            return this.enabled
        },
        setAttribute: function(a, b) {
            this[a] = b
        },
        getAttribute: function(a) {
            return this[a]
        }
    };
    var g = {
        getValue: f.prototype.getValue,
        setValue: f.prototype.setValue,
        setAttribute: f.prototype.setAttribute,
        getAttribute: f.prototype.getAttribute,
        destroy: f.prototype.destroy,
        disable: f.prototype.disable,
        enable: f.prototype.enable,
        toggle: f.prototype.toggle,
        isEnabled: f.prototype.isEnabled
    };
    a.fn.slider = function(a) {
        if ("string" == typeof a && "refresh" !== a) {
            var c = Array.prototype.slice.call(arguments, 1);
            return b.call(this, a, c)
        }
        return d.call(this, a)
    }, a.fn.slider.defaults = {
        min: 0,
        max: 10,
        step: 1,
        orientation: "horizontal",
        value: 5,
        range: !1,
        selection: "before",
        tooltip: "show",
        tooltip_separator: ":",
        tooltip_split: !1,
        handle: "round",
        reversed: !1,
        enabled: !0,
        formater: function(a) {
            return a
        }
    }, a.fn.slider.Constructor = f
}(window.jQuery);