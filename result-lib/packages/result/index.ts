export enum ResultState {
    FAIL,
    OK
}

abstract class TResultBase {

    private _state: ResultState;

    protected constructor(state: ResultState) {
        this._state = state;
    }

    public isFailed(): boolean {
        return this._state == ResultState.FAIL;
    }
    public isSuccess(): boolean {
        return this._state == ResultState.OK;
    }
}

export class TResult extends TResultBase {

    public static ok(): TResult {
        return new TResult(ResultState.OK);
    }

    public static fail(): TResult {
        return new TResult(ResultState.FAIL);
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

    constructor(state: ResultState, value?: TValue) {
        super(state);
        this._value = value;
    }

    public static ok<TValue>(value: TValue): TResultValue<TValue> {
        return new TResultValue<TValue>(ResultState.OK, value);
    }

    public static fail<TValue>(): TResultValue<TValue> {
        return new TResultValue<TValue>(ResultState.FAIL);
    }
}