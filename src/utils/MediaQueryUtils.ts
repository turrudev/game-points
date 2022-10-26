import {CSSProperties} from "aphrodite/typings/css-properties";

export default class MediaQueryUtils {
    static ipadLandscape(styles: CSSProperties): CSSProperties {
        return {
            [`@media all and (device-width: 1024px) and (device-height: 768px) and (orientation:landscape)`]: {...styles},
        }
    }

    static ipadPortrait(styles: CSSProperties): CSSProperties {
        return {
            [`@media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait)`]: {...styles},
        }
    }
}