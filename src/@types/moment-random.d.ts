declare module "moment-random" {
    import {Moment, MomentInput} from "moment";

    /**
     * Generates a random moment.js object
     *
     * @param {MomentInput} end - END date
     * @param {MomentInput | undefined} start - START date
     * @returns {Moment} A random moment.js object
     */
    export default function momentRandom(end: MomentInput, start: MomentInput | undefined = undefined): Moment;
}
