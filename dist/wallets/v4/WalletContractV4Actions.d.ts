import { Maybe } from "../../utils/maybe";
import { Address, Builder, Cell, MessageRelaxed, SendMode, StateInit } from "@ton/core";
import { SendArgsSignable, SendArgsSigned } from "../signing/singer";
export type WalletV4ExtendedSendArgs = {
    seqno: number;
    action: WalletV4ExtendedAction;
    timeout?: Maybe<number>;
};
export type WalletV4ExtendedAction = {
    type: 'sendMsg';
    messages: MessageRelaxed[];
    sendMode?: Maybe<SendMode>;
} | {
    type: 'addAndDeployPlugin';
    workchain: number;
    stateInit: StateInit;
    body: Cell;
    forwardAmount: bigint;
} | {
    type: 'addPlugin';
    address: Address;
    forwardAmount: bigint;
    queryId?: bigint;
} | {
    type: 'removePlugin';
    address: Address;
    forwardAmount: bigint;
    queryId?: bigint;
};
export type WalletV4ExtendedSendArgsSigned = WalletV4ExtendedSendArgs & SendArgsSigned;
export type WalletV4ExtendedSendArgsSignable = WalletV4ExtendedSendArgs & SendArgsSignable;
export declare function storeExtendedAction(action: WalletV4ExtendedAction): (builder: Builder) => void;
