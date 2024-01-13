import { IconType } from "react-icons"

type StatusProps = {
    text: string
    icon: IconType
    bg: string
    color: string
}

function Status({ text, icon: Icon, bg, color }: StatusProps) {
  return (
    <div className={`${bg} ${color} px-1 rounded flex items-center gap-1`}>
        { text }
        <Icon  size={15}/>
    </div>
  )
}

export default Status