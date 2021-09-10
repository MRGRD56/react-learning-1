import React from 'react';
import "./ContentRoot.scss";
import SiteHeader from "../SiteHeader";

interface Props extends React.HTMLProps<HTMLDivElement> {

}

function ContentRoot({children, ...props}: Props) {
    return (
        <div {...props}>
            <SiteHeader/>
            <div className="container">
                {children}
            </div>
        </div>
    );
}

export default ContentRoot;