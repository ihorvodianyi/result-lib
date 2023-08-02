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

    private _value: TValue | undefined;
    public get value(): TValue | undefined {
        return this._value;
    }

    constructor(state: ResultState, value: TValue | undefined) {
        super(state);
        this._value = value;
    }

    public static ok<TValue>(value: TValue): TResultValue<TValue> {
        return new TResultValue<TValue>(ResultState.OK, value);
    }

    public static fail<TValue>(): TResultValue<TValue> {
        return new TResultValue<TValue>(ResultState.FAIL, undefined);
    }
}