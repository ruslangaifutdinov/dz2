var myPopups = (function() {
    var init = function(){
        _setUpListeners();
    };
    var _setUpListeners = function() {   
        $('#js-add-project-open').on('click', _showModal);
    };
    var _showModal = function(e) {
        e.preventDefault(); 
        $('.add-project__popup').bPopup({
            closeClass : 'js-add-project-close',
            onClose: _clearAddProjectForm,
            positionStyle: 'fixed'          
        });
    };
    var _clearAddProjectForm = function() {
        var form = $('#add-project__form');
        form.find('input, textarea').trigger('hideTooltip')
                                    .removeClass('error');                   
        if (!Modernizr.input.placeholder) {
            form.find('input, textarea').val($(this).attr('placeholder'));
        } else {
           form.trigger('reset'); 
        }
    };
    return {
        init: init
    };
})();
if($('#add-project__form')[0]) {
    myPopups.init();
}



var myForms = (function() { 

    var init = function() {
        _setUpListeners();
           if (!Modernizr.input.placeholder) {
            $('input, textarea').placeholder({ customClass: 'my-placeholder' });
        };
    };

    var _setUpListeners = function() {   
        $('#authform, #contactform, #add-project__form').on('submit', _submitForm);
        $('.add-project__input--file').on('change', _addImage); 
        $('#contactform').on('reset', _clearContactForm);        
    };

    var _clearContactForm = function() {
        var form = $('#contactform');
        form.find('input, textarea').trigger('hideTooltip')
                                    .removeClass('error');
if (!Modernizr.input.placeholder) {
            form.find('input, textarea').not('input[type="submit"], input[type="reset"]').val($(this).attr('placeholder'));
            return false;
        } 
    }


    var _addImage = function() {
        var _this = $(this);
        var path = _this.val(); 
        var  regexp = /c:\\cache\\/gmi; 
        var cuttedPath = path.replace(regexp, '');  
        $('#js-fake-file-input').val(cuttedPath)
                                .trigger('hideTooltip')
                                .removeClass('error'); 
 };

    var _submitForm = function(e) {
        e.preventDefault(); 
        var form = $(this),
            url = 'error.txt',
            defferObject = _ajaxForm(form, url);
    };

    var _ajaxForm = function (form, url) {
        if (!validation.validateForm(form)) {
            return false;
        } else {
            console.log("Отправил прямиком на МАРС к Марку Уотни :))) ");
        }
    };

    return {
        init: init
    };

})();

if($('form')[0]) {
    myForms.init();
}


/* Валидация */

var validation = (function() { 

    var init = function(){
        _setUpListeners();
    };
    var _setUpListeners = function() {
        $('form').find('input, textarea').keyup(_removeTooltipsAndBorder);
        $('form').find('input, textarea').on('paste', _removeTooltipsAndBorder); 
    };

    var _createQtip = function (element, position) {

        if (position === 'right') {
            position = {
                my: 'left center',
                at: 'right center',
                effect: false               
            }
        } else {
            position = {
                my: 'right center',
                at: 'left center',
                adjust: {
                    method: 'shift none'
                },
                effect: false
            }
        }

         element.qtip({
            content: {
                text: function() {
                    return $(this).attr('qtip-content');
                }
            },
            show : {
                event: 'show',
                delay: 100
            },
            hide: {
                event: 'keydown paste change hideTooltip',
                delay: 0
            },
            position : position,
            style: {
                classes: 'qtip-red qtip-rounded',
                tip: {
                    height: 6,
                    width: 7
                }
            }
        }).trigger('show');

    };

    var _removeTooltipsAndBorder = function() {
        $(this).removeClass('error');
        $(this).trigger('hideTooltip');
        var authPassword = $(this).hasClass('authform__input--password');
        if(authPassword) {
            $('.authform__input--password').trigger('hideTooltip').removeClass('error');;
        }
    }

        var validateForm = function (form) {
        var elements = form.find('input, textarea').not('input[type="file"], input[type="submit"], input[type="checkbox"], input[type="reset"]');
        valid = true;

        $.each(elements, function (index, element) {
            //console.log(index, element);
            var element = $(element),
                value = element.val(),
                position = element.attr('qtip-position');

            if (value.length === 0) {
                _createQtip(element, position);
                element.addClass('error');
                valid = false;
            }   
        });

        return valid;
    }

    return {
        init: init,
        validateForm: validateForm
    };
})();

if($('form')[0]) {
    validation.init();
}