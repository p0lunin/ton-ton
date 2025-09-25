/**
 * Copyright (c) Whales Corp.
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Address, Cell, Contract, ContractProvider, MessageRelaxed, Sender, SendMode } from "@ton/core";
import { Maybe } from "../../utils/maybe";
import { SendArgsSignable, SendArgsSigned } from "../signing/singer";
import { WalletV4ExtendedSendArgsSignable, WalletV4ExtendedSendArgsSigned } from "./WalletContractV4Actions";
export type WalletV4BasicSendArgs = {
    seqno: number;
    messages: MessageRelaxed[];
    sendMode?: Maybe<SendMode>;
    timeout?: Maybe<number>;
};
export type Wallet4SendArgsSigned = WalletV4BasicSendArgs & SendArgsSigned;
export type Wallet4SendArgsSignable = WalletV4BasicSendArgs & SendArgsSignable;
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
    getPluginsArray(provider: ContractProvider): Promise<Address[]>;
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
    createTransfer<T extends Wallet4SendArgsSigned | Wallet4SendArgsSignable>(args: T): T extends SendArgsSignable ? Promise<Cell> : Cell;
    sendExtendedAction<T extends WalletV4ExtendedSendArgsSigned>(provider: ContractProvider, args: T): Promise<void>;
    createRequest<T extends WalletV4ExtendedSendArgsSigned | WalletV4ExtendedSendArgsSignable>(args: T): T extends WalletV4ExtendedSendArgsSignable ? Promise<Cell> : Cell;
    /**
     * Create sender
     */
    sender(provider: ContractProvider, secretKey: Buffer): Sender;
    sendAddPlugin<T extends (WalletV4ExtendedSendArgsSigned | WalletV4ExtendedSendArgsSignable) & {
        action: {
            type: 'addPlugin';
        };
    }>(provider: ContractProvider, args: T): Promise<void>;
    sendRemovePlugin<T extends (WalletV4ExtendedSendArgsSigned | WalletV4ExtendedSendArgsSignable) & {
        action: {
            type: 'removePlugin';
        };
    }>(provider: ContractProvider, args: T): Promise<void>;
    sendAddAndDeployPlugin<T extends (WalletV4ExtendedSendArgsSigned | WalletV4ExtendedSendArgsSignable) & {
        action: {
            type: 'addAndDeployPlugin';
        };
    }>(provider: ContractProvider, args: T): Promise<void>;
    createAddPlugin<T extends (WalletV4ExtendedSendArgsSigned | WalletV4ExtendedSendArgsSignable) & {
        action: {
            type: 'addPlugin';
        };
    }>(args: T): T extends WalletV4ExtendedSendArgsSignable ? Promise<Cell> : Cell;
    createRemovePlugin<T extends (WalletV4ExtendedSendArgsSigned | WalletV4ExtendedSendArgsSignable) & {
        action: {
            type: 'removePlugin';
        };
    }>(args: T): T extends WalletV4ExtendedSendArgsSignable ? Promise<Cell> : Cell;
    createAddAndDeployPlugin<T extends (WalletV4ExtendedSendArgsSigned | WalletV4ExtendedSendArgsSignable) & {
        action: {
            type: 'addAndDeployPlugin';
        };
    }>(args: T): T extends WalletV4ExtendedSendArgsSignable ? Promise<Cell> : Cell;
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
