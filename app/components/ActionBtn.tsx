import { IconType } from "react-icons"

type ActionBtnProps = {
    icon: IconType
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
}

const ActionBtn = ({ icon: Icon, onClick, disabled }: ActionBtnProps) => {
    return (
        <button className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400  ${disabled && 'opacity-50 cursor-not-allowed'}`} disabled={disabled} onClick={onClick}>
            <Icon size={18} />
        </button>
    )
}

export default ActionBtn