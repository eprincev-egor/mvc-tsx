import React from "react";

export class Highlight extends React.Component<{
    className: string;
    highlightClassName: string;
    text: string;
    highlightText: string;
}> {
    
    render() {
        if ( !this.props.highlightText ) {
            return <div className={this.props.className}>
                {this.props.text}
            </div>;
        }

        const lowerText = this.props.text.toLowerCase();
        const lowerHighlightPhrase = this.props.text;
        const startHighlight = lowerText.indexOf(lowerHighlightPhrase);
        const endHighlight =  startHighlight + lowerHighlightPhrase.length;

        if ( startHighlight === -1 ) {
            return <div className={this.props.className}>
                {this.props.text}
            </div>;
        }

        const beforeText = this.props.text.slice(0, startHighlight);
        const highlightedText = this.props.text.slice(
            startHighlight,
            endHighlight
        );
        const afterText = this.props.text.slice(endHighlight);

        return <div className={this.props.className}>
            {beforeText}
            <span className={this.props.highlightClassName}>{ highlightedText }</span>
            {afterText}
        </div>;
    }

}