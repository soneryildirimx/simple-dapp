import * as React from "react";
import { useDebounce } from "use-debounce";
import {
    usePrepareSendTransaction,
    useSendTransaction,
    useWaitForTransaction,
} from "wagmi";
import { utils } from "ethers";

export function SendTransaction() {
    const [to, setTo] = React.useState("");
    const [debouncedTo] = useDebounce(to, 500);

    const [amount, setAmount] = React.useState("");
    const [debouncedAmount] = useDebounce(amount, 500);

    const { config } = usePrepareSendTransaction({
        request: {
            to: debouncedTo,
            value: debouncedAmount
                ? utils.parseEther(debouncedAmount)
                : undefined,
        },
    });
    const { data, sendTransaction } = useSendTransaction(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                sendTransaction?.();
            }}
            className="max-w-lg w-full"
        >
            <input
                aria-label="Recipient"
                onChange={(e) => setTo(e.target.value)}
                placeholder="0xA0Cf…251e"
                value={to}
                type="text"
                disabled={isLoading}
                className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <input
                aria-label="Amount (ether)"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.05"
                value={amount}
                type="number"
                disabled={isLoading}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
                className="mt-4  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={isLoading || !sendTransaction || !to || !amount}
            >
                {isLoading ? "Sending..." : "Send"}
            </button>
            {isSuccess && (
                <div className="text-center py-4">
                    Successfully sent {amount} ether to {to}
                    <div>
                        <a
                            target={"_blank"}
                            className="underline underline-offset-4"
                            href={`https://etherscan.io/tx/${data?.hash}`}
                        >
                            Etherscan Link
                        </a>
                    </div>
                </div>
            )}
        </form>
    );
}
