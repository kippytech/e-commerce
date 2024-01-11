type BackDropPropTypes = {
    onClick: () => void
}

function BackDrop({ onClick }: BackDropPropTypes) {
  return (
    <div onClick={onClick} className="z-20 bg-slate-200 opacity-50 w-screen h-screen fixed top-0 left-0">BackDrop</div>
  )
}

export default BackDrop