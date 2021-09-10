export default class Range {
    constructor(public readonly from: number,
                public readonly to: number) {
    }

    isNumberWithin(value: number) {
        return value >= this.from && value <= this.to;
    }
}