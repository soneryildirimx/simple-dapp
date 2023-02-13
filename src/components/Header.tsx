import { ConnectButton } from "@rainbow-me/rainbowkit";
const Header = () => {
    return (
        <header className="p-10 flex justify-between items-center">
            <h3 className="text-lg">Simple Dapp</h3>
            <ConnectButton chainStatus={"full"} showBalance />
        </header>
    );
};

export default Header;
