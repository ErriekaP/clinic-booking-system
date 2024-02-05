import * as React from "react";
export interface AccessibleIconProps {
    children?: React.ReactNode;
    /**
     * The accessible label for the icon. This label will be visually hidden but announced to screen
     * reader users, similar to `alt` text for `img` tags.
     */
    label: string;
}
export const AccessibleIcon: React.FC<AccessibleIconProps>;
export const Root: React.FC<AccessibleIconProps>;

//# sourceMappingURL=index.d.ts.map
