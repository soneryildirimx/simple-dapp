import { ConnectButton } from "@rainbow-me/rainbowkit";
const Header = () => {
    return (
        <header className="p-10 flex justify-between items-center md:flex-row flex-col md:gap-0 gap-4">
            <h3 className="text-lg">Simple Dapp</h3>
            <ConnectButton chainStatus={"full"} />
        </header>
    );
};

export default Header;
