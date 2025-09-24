/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Address, Cell, Contract, ContractProvider, MessageRelaxed, Sender, SendMode, StateInit } from "@ton/core";
import { Maybe } from "../utils/maybe";
import { SendArgsSignable, SendArgsSigned } from "./signing/singer";
export type WalletV4BasicSendArgs = {
    seqno: number;
    messages: MessageRelaxed[];
    sendMode?: Maybe<SendMode>;
    timeout?: Maybe<number>;
};
export type WalletV4PluginArgs = {
    seqno: number;
    pluginAction: WalletV4PluginAction;
    sendMode?: Maybe<SendMode>;
    timeout?: Maybe<number>;
};
export type WalletV4PluginAction = {
    action: 'deployAndInstall';
    workchain: number;
    stateInit: StateInit;
    body: Cell;
    forwardAmount: bigint;
} | {
    action: 'install';
    address: Address;
    forwardAmount: bigint;
    queryId?: bigint;
} | {
    action: 'uninstall';
    address: Address;
    forwardAmount: bigint;
    queryId?: bigint;
};
export type Wallet4SendArgsSigned = WalletV4BasicSendArgs & SendArgsSigned;
export type Wallet4SendArgsSignable = WalletV4BasicSendArgs & SendArgsSignable;
export type Wallet4PluginArgsSigned = WalletV4PluginArgs & SendArgsSigned;
export type Wallet4PluginArgsSignable = WalletV4PluginArgs & SendArgsSignable;
export declare class WalletContractV4 implements Contract {
    static create(args: {
        workchain: number;
        publicKey: Buffer;
        walletId?: Maybe<number>;
    }): WalletContractV4;
    readonly workchain: number;
    readonly publicKey: Buffer;
    readonly address: Address;
    readonly walletId: number;
    readonly init: {
        data: Cell;
        code: Cell;
    };
    private constructor();
    /**
     * Get Wallet Balance
     */
    getBalance(provider: ContractProvider): Promise<bigint>;
    /**
     * Get Wallet Seqno
     */
    getSeqno(provider: ContractProvider): Promise<number>;
    getIsPluginInstalled(provider: ContractProvider, pluginAddress: Address): Promise<boolean>;
    getPluginList(provider: ContractProvider): Promise<Address[]>;
    /**
     * Send signed transfer
     */
    send(provider: ContractProvider, message: Cell): Promise<void>;
    /**
     * Sign and send transfer
     */
    sendTransfer(provider: ContractProvider, args: {
        seqno: number;
        secretKey: Buffer;
        messages: MessageRelaxed[];
        sendMode?: Maybe<SendMode>;
        timeout?: Maybe<number>;
    }): Promise<void>;
    /**
     * Create signed transfer
     */
    createTransfer<T extends Wallet4SendArgsSigned | Wallet4SendArgsSignable>(args: T): T extends Wallet4SendArgsSignable ? Promise<Cell> : Cell;
    sendPluginAction(provider: ContractProvider, args: Wallet4PluginArgsSigned): Promise<void>;
    createPluginAction<T extends Wallet4PluginArgsSigned | Wallet4PluginArgsSignable>(args: T): T extends Wallet4PluginArgsSignable ? Promise<Cell> : Cell;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
    sendPluginRequestFunds(provider: ContractProvider, sender: Sender, args: {
        forwardAmount: bigint;
        toncoinsToWithdraw: bigint;
        queryId?: bigint;
        sendMode?: SendMode;
    }): Promise<void>;
    createPluginRequestFundsMessage(args: {
        toncoinsToWithdraw: bigint;
        queryId?: bigint;
    }): Cell;
    sendPluginRemovePlugin(provider: ContractProvider, sender: Sender, amount: bigint, queryId?: bigint): Promise<void>;
    createPluginRemovePluginMessage(queryId?: bigint): Cell;
}
