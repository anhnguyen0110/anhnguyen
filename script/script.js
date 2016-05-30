$(function () {

    var $sidescroll = (function () {

        var $rows = $('#custom-container > div.custom-row'),
            $rowsViewport, $rowsOutViewport,
            $links = $('#custom-links > a'),
            $win = $(window),
            winSize = {},
            anim = false,
            scollPageSpeed = 2000,
            scollPageEasing = 'easeInOutExpo',
            init = function () {

                getWinSize();
                initEvents();
                defineViewport();
                setViewportRows();
                $rowsViewport.find('a.custom-circle').addClass('custom-circle-deco');
                placeRows();

            },

            defineViewport = function () {
                $.extend($.expr[':'], {
                    inviewport: function (el) {
                        if ($(el).offset().top < winSize.height) {
                            return true;
                        }
                        return false;
                    }
                });
            },

            setViewportRows = function () {
                $rowsViewport = $rows.filter(':inviewport');
                $rowsOutViewport = $rows.not($rowsViewport)

            },

            getWinSize = function () {
                winSize.width = $win.width();
                winSize.height = $win.height();
            },

            initEvents = function () {
                $(window).on({
                    'resize.Scrolling': function (event) {

                        getWinSize();
                        setViewportRows();
                        $rows.find('a.custom-circle').removeClass('custom-circle-deco');
                        $rowsViewport.each(function () {

                            $(this).find('div.custom-left')
                                .css({
                                    left: '0%'
                                })
                                .end()
                                .find('div.custom-right')
                                .css({
                                    right: '0%'
                                })
                                .end()
                                .find('a.custom-circle')
                                .addClass('custom-circle-deco');

                        });

                    },
                    'scroll.Scrolling': function (event) {
                        if (anim) return false;
                        anim = true;
                        setTimeout(function () {

                            placeRows();
                            anim = false;

                        }, 10);

                    }
                });

            },

            placeRows = function () {
                var winscroll = $win.scrollTop(),
                    winCenter = winSize.height / 2 + winscroll;

                $rowsOutViewport.each(function (i) {

                    var $row = $(this),
                        $rowL = $row.find('div.custom-left'),
                        $rowR = $row.find('div.custom-right'),
                        rowT = $row.offset().top;

                    if (rowT > winSize.height + winscroll) {
                            $rowL.css({
                                left: '-50%'
                            });
                            $rowR.css({
                                right: '-50%'
                            });
                    }
                    else {
                        var rowH = $row.height(),
                            factor = (((rowT + rowH / 2) - winCenter) / (winSize.height / 2 + rowH / 2)),
                            val = Math.max(factor * 50, 0);
                        if (val <= 0) {
                            if (!$row.data('pointer')) {

                                $row.data('pointer', true);
                                $row.find('.custom-circle').addClass('custom-circle-deco');
                            }

                        } else {
                            if ($row.data('pointer')) {

                                $row.data('pointer', false);
                                $row.find('.custom-circle').removeClass('custom-circle-deco');
                            }
                        }
                            $rowL.css({
                                left: -val + '%'
                            });
                            $rowR.css({
                                right: -val + '%'
                            });
                    }

                });

            };

        return {
            init: init
        };

    })();

    $sidescroll.init();

});
