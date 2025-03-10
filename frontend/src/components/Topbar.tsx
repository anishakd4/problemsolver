import { Link } from "react-router";

export const Topbar = () => {
  return (
    <div className="max-w-screen-lg w-full bg-black align-center px-5 pb-5 pt-8">
      <img
        src="/logo.jpeg"
        className="max-w-56"
        width="100"
        height="100"
        style={{ float: "left" }}
      />
      <div className="text-8xl text-white">Problem Solver</div>
      <NavBar />
    </div>
  );
};

const topbarItems = [
  {
    title: "About",
    route: "/about",
  },
  {
    title: "Activity",
    route: "/activity",
  },
  {
    title: "Problems",
    route: "/problems",
  },
  {
    title: "Leaderboard",
    route: "/leaderboar",
  },
];
function NavBar() {
  return (
    <div className="flex mt-4">
      {topbarItems.map((item) => (
        <NavbarItem route={item.route} title={item.title} key={item.route} />
      ))}
    </div>
  );
}

function NavbarItem({ title, route }: { title: string; route: string }) {
  return (
    <Link to={route}>
      <div className="mr-10 text-slate-500 text-lg cursor-pointer hover:text-white text-base font-light">
        {title}
      </div>
    </Link>
  );
}
