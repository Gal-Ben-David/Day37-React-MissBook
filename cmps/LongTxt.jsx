const { useState } = React

export function LongTxt({ txt, length = 100 }) {

    const [expandedText, setExpandedText] = useState(false)

    function onToggleReadMore() {
        setExpandedText(expandedText => !expandedText)
    }

    function handleClick(ev) {
        ev.preventDefault()
        onToggleReadMore()
    }

    const text = (expandedText) ? txt : txt.substring(0, length) + '...'

    return (
        <p>
            <span>{text}
                <a className="long-text" href="#" onClick={handleClick}>{!expandedText ? ' Read more' : ' Show less'}</a></span>
        </p>
    )

}