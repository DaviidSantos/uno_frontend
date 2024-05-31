import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../../components/ui/navigation-menu";
import { navitems } from "../../lib/nav-items";

const Navbar = () => {
  return (
    <nav className="container max-w-screen-2xl flex items-center h-14 border-b border-b-zinc-100">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-3xl font-bold text-zinc-800 pb-1.5">uno.</span>
        </Link>
        <ul>
          <NavigationMenu>
            <NavigationMenuList>
              {
                navitems.map((navitem) => (
                  <NavigationMenuItem key={navitem.key} className="w-full">
                    <NavigationMenuTrigger className="text-zinc-600">{navitem.title}</NavigationMenuTrigger>

                    <NavigationMenuContent className="flex flex-col p-4 w-full">
                      <ul className="flex flex-col  w-[400px]">
                        {
                          navitem.navlinks.map((navlink) => (
                            <li key={navlink.key} className="[&:not(:last-child)]:border-b border-b-zinc-200">
                              <NavigationMenuLink asChild>
                                <Link to={navlink.href} className="text-sm font-medium text-zinc-800">
                                  <div className="hover:bg-zinc-100 rounded-md p-3">
                                    {navlink.title}

                                    <p className="text-xs text-zinc-600">{navlink.description}</p>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))
                        }
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))
              }
            </NavigationMenuList>
          </NavigationMenu>
        </ul>
      </div>
    </nav >
  )
}

export default Navbar;
