/**
 * Created by Administrator on 2017/5/25.
 */
/************初始化根字体样式***************/

(function ( doc, win ) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if ( !clientWidth ) return;
            if ( clientWidth >= 750 ) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * ( clientWidth / 750 ) + 'px';
            }
        };

    if ( !doc.addEventListener ) return;
    win.addEventListener( resizeEvt, recalc, false );
    doc.addEventListener( 'DOMContentLoaded', recalc, false );
    recalc()
})( document, window );
