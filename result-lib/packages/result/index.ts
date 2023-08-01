abstract class TResultBase {

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

export class TResult extends TResultBase {

    public static ok(): TResult {
        return new TResult(true);
    }

    public static fail(): TResult {
        return new TResult(false);
    }
}

export class TResultValue<TValue> extends TResultBase {

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

    public static ok<TValue>(value: TValue): TResultValue<TValue> {
        return new TResultValue<TValue>(true, value);
    }

    public static fail<TValue>(): TResultValue<TValue> {
        return new TResultValue<TValue>(false);
    }
}