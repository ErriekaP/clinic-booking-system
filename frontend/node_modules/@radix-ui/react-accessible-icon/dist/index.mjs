import {Children as $eOI90$Children, createElement as $eOI90$createElement, Fragment as $eOI90$Fragment, cloneElement as $eOI90$cloneElement} from "react";
import {Root as $eOI90$Root} from "@radix-ui/react-visually-hidden";



const $08b6689415b2f49a$var$NAME = 'AccessibleIcon';
const $08b6689415b2f49a$export$5aec92af04ace2d2 = ({ children: children , label: label  })=>{
    const child = $eOI90$Children.only(children);
    return /*#__PURE__*/ $eOI90$createElement($eOI90$Fragment, null, /*#__PURE__*/ $eOI90$cloneElement(child, {
        // accessibility
        'aria-hidden': 'true',
        focusable: 'false' // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
    }), /*#__PURE__*/ $eOI90$createElement($eOI90$Root, null, label));
};
/*#__PURE__*/ Object.assign($08b6689415b2f49a$export$5aec92af04ace2d2, {
    displayName: $08b6689415b2f49a$var$NAME
});
const $08b6689415b2f49a$export$be92b6f5f03c0fe9 = $08b6689415b2f49a$export$5aec92af04ace2d2;




export {$08b6689415b2f49a$export$5aec92af04ace2d2 as AccessibleIcon, $08b6689415b2f49a$export$be92b6f5f03c0fe9 as Root};
//# sourceMappingURL=index.mjs.map
