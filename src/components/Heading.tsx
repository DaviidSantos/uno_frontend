import { FC } from "react";

interface HeadingProps {
  title: string;
  description?: string
}

const Heading: FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-1 pt-8 pb-4 border-b border-b-zinc-100">
      <h2 className="text-3xl font-black text-zinc-800 tracking-tighter">{title}</h2>
      {description && <p className="text-sm text-zinc-400">{description}</p>}
    </div>
  )
}

export default Heading;
