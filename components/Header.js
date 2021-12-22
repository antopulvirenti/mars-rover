import Link from "next/link";
import Image from "next/image";
import cx from "classnames";
import { useState } from "react";

const Header = () => {
    const [linkActive, setLinkActive] = useState();
    const headerLinks = [
        { link: "Home", href: "/" },
        { link: "My favorite photos", href: "/favorite-photos" },
    ];
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-2 m-auto lg:col-span-1">
                <Image
                    src="/nasaLogo.svg"
                    alt="Nasa logo"
                    width={100}
                    height={100}
                />
            </div>
            <div className="flex items-center justify-center col-span-9 lg:col-span-10">
                {headerLinks.map(({ link, href }) => {
                    return (
                        <button
                            className={cx(
                                "first:pr-6 text-lg md:text-xl hover:underline hover:text-cyan-600",
                                { underline: link === linkActive }
                            )}
                            onClick={() => setLinkActive(link)}
                        >
                            <Link href={href}>{link}</Link>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Header;
