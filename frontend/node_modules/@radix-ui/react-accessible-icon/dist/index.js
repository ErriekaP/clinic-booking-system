var $l7iZU$react = require("react");
var $l7iZU$radixuireactvisuallyhidden = require("@radix-ui/react-visually-hidden");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "AccessibleIcon", () => $7e03469ebd912a45$export$5aec92af04ace2d2);
$parcel$export(module.exports, "Root", () => $7e03469ebd912a45$export$be92b6f5f03c0fe9);


const $7e03469ebd912a45$var$NAME = 'AccessibleIcon';
const $7e03469ebd912a45$export$5aec92af04ace2d2 = ({ children: children , label: label  })=>{
    const child = $l7iZU$react.Children.only(children);
    return /*#__PURE__*/ $l7iZU$react.createElement($l7iZU$react.Fragment, null, /*#__PURE__*/ $l7iZU$react.cloneElement(child, {
        // accessibility
        'aria-hidden': 'true',
        focusable: 'false' // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
    }), /*#__PURE__*/ $l7iZU$react.createElement($l7iZU$radixuireactvisuallyhidden.Root, null, label));
};
/*#__PURE__*/ Object.assign($7e03469ebd912a45$export$5aec92af04ace2d2, {
    displayName: $7e03469ebd912a45$var$NAME
});
const $7e03469ebd912a45$export$be92b6f5f03c0fe9 = $7e03469ebd912a45$export$5aec92af04ace2d2;




//# sourceMappingURL=index.js.map
