import { NavLink } from "react-router"
import s from "./Header.module.css"
import { PATH } from "@/common/routing"

const navItems = [
  { to: PATH.MAIN, label: "Main" },
  { to: PATH.PLAYLISTS, label: "Playlists" },
  { to: PATH.TRACK, label: "Track" },
  { to: PATH.PROFILE, label: "Profile" },
]

export const Header = () => {
  return (
    <header className={s.container}>
      <nav>
        <ul className={s.list}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink className={({ isActive }) => `link ${isActive ? s.activeLink : ""}`} to={item.to}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
