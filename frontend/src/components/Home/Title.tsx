import { Zap } from "lucide-react";

type Props = {
    title:string;
    discription:string;
}

export default function Title({title,discription}: Props) {
  return (<>
      <div className="flex items-center max-w-62 gap-2 text-sm text-green-800 bg-green-400/10 border border-green-200 rounded-full px-4 py-1">
            <Zap size={14}/>
            <span>Simple Process</span>
        </div>
        <div>
            <h2 className="text-center font-bold text-3xl leading-20">{title}</h2>
            <p className=" text-xl">{discription}</p>
        </div>
        </>
  )
}