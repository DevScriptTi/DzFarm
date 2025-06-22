"use client";
import { Menu } from "lucide-react";

export default function ToggleUpBar() {
    const toggleUpBar = () => {
        const upBar = document.getElementById("NavBarItemsToggled");
        if (upBar) {
            upBar.classList.toggle("hidden");
        }
    };
    return (
        <Menu onClick={toggleUpBar} className="lg:hidden text-on-surface dark:text-dark-on-surface" size={24} />
    );
}