class ResultBase {

    private _state: boolean;

    protected constructor(state: boolean) {
        this._state = state;
    }

    public isFailed(): boolean {
        return !this._state;
    }
    public isSuccess(): boolean {
        return this._state;
    }
}

export class Result extends ResultBase {

    public static ok(): Result {
        return new Result(true);
    }

    public static fail(): Result {
        return new Result(false);
    }
}

export class ResultValue<TValue> extends ResultBase {

    private _value?: TValue;
    public get value(): TValue {
        if (this.isFailed()) {
            throw new Error("Can't retrieve the value from a failed result.");
        }
        return this._value!;
    }

    constructor(state: boolean, value?: TValue) {
        super(state);
        this._value = value;
    }

    public static ok<TValue>(value: TValue): ResultValue<TValue> {
        return new ResultValue<TValue>(true, value);
    }

    public static fail<TValue>(): ResultValue<TValue> {
        return new ResultValue<TValue>(false);
    }
}