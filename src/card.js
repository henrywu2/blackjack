import React from 'react';

const Card = props => {
    if (props.blank) return (
        <div className='card'>
            <span>/&nbsp;&nbsp;\/&nbsp;&nbsp;\/&nbsp;&nbsp;\/&nbsp;&nbsp;\<br></br></span>
            <span>\&nbsp;&nbsp;/\&nbsp;&nbsp;/\&nbsp;&nbsp;/\&nbsp;&nbsp;/<br></br></span>
            <span>&nbsp;\/&nbsp;&nbsp;\/&nbsp;&nbsp;\/&nbsp;&nbsp;\/<br></br></span>
            <span>&nbsp;/\&nbsp;&nbsp;/\&nbsp;&nbsp;/\&nbsp;&nbsp;/\<br></br></span>
            <span>/&nbsp;&nbsp;\/&nbsp;&nbsp;\/&nbsp;&nbsp;\/&nbsp;&nbsp;\<br></br></span>
            <span>\&nbsp;&nbsp;/\&nbsp;&nbsp;/\&nbsp;&nbsp;/\&nbsp;&nbsp;/<br></br></span>
            <span>&nbsp;\/&nbsp;&nbsp;\/&nbsp;&nbsp;\/&nbsp;&nbsp;\/<br></br></span>
            <span>&nbsp;/\&nbsp;&nbsp;/\&nbsp;&nbsp;/\&nbsp;&nbsp;/\<br></br></span>
            <span>/&nbsp;&nbsp;\/&nbsp;&nbsp;\/&nbsp;&nbsp;\/&nbsp;&nbsp;\<br></br></span>
            <span>\&nbsp;&nbsp;/\&nbsp;&nbsp;/\&nbsp;&nbsp;/\&nbsp;&nbsp;/<br></br></span>
        </div>
    );

    let display = [<span><br></br>&nbsp;&nbsp;{props.value}<br></br></span>];

    if (props.suit === 'Hearts') display.push(
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;_<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ \/ \<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;/<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;/<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\/<br></br><br></br></span>
    );
    else if (props.suit === 'Diamonds') display.push(
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/\<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;\<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;\<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;/<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;/<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\/<br></br></span>
    );
    else if (props.suit === 'Spades') display.push(
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/\<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.'&nbsp;&nbsp;'.<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;\_.__._/<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/\<br></br><br></br></span>
    );
    else if (props.suit === 'Clubs') display.push(
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_(&nbsp;&nbsp;)_<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;'-.::.-'<br></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/\<br></br><br></br></span>
    );

    if (props.value !== '10') display.push(<span>&nbsp;</span>);
    display.push(<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.value}&nbsp;&nbsp;<br></br>&nbsp;</span>);

    if (props.suit === 'Spades' || props.suit === 'Clubs') return <div className='card'>{display}</div>
    else return <div className='red card'>{display}</div>
}

export { Card };